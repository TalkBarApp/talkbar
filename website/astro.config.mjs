import { writeFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { resolveSubmissionEndpoints } from "./src/lib/submissionEndpoints.js";

const buildDomain =
  process.env.BUILD_DOMAIN === "preview"
      ? "preview"
      : process.env.BUILD_DOMAIN === "preview-ru"
        ? "preview-ru"
        : process.env.BUILD_DOMAIN === "prod-ru"
          ? "prod-ru"
          : "prod";
const isDev = process.argv.some((a) => a === "dev");

const configs = {
  prod: {
    site: "https://www.talkbar.app",
    defaultLocale: "en",
    locales: ["en"],
  },
  preview: {
    site: "https://preview.talkbar.app",
    defaultLocale: "en",
    locales: ["en"],
  },
  // Russian preview, served at the root of preview.talkbar.ru.
  "preview-ru": {
    site: "https://preview.talkbar.ru",
    defaultLocale: "ru",
    locales: ["ru"],
  },
  // Reserved future Russian production build.
  "prod-ru": {
    site: "https://www.talkbar.ru",
    defaultLocale: "ru",
    locales: ["ru"],
  },
};

const config = configs[buildDomain];
const ALL_LOCALES = ["en", "ru"];

// Every build EXCEPT the production `prod` build emits a Cloudflare Pages
// `_headers` file that sends `X-Robots-Tag: noindex, nofollow` on every
// response. This is the unambiguous de-index guarantee for any non-production
// deployment — preview, preview2, dev, staging, whatever the hostname — and it
// cannot be undercut by conflicting robots.txt rules. Only `prod` is indexable.
const isProductionBuild = buildDomain === "prod" || buildDomain === "prod-ru";
const noindexHeaders = {
  name: "noindex-headers",
  hooks: {
    "astro:build:done": ({ dir }) => {
      writeFileSync(new URL("_headers", dir), "/*\n  X-Robots-Tag: noindex, nofollow\n");
    },
  },
};

// Truthy: "1" or "true". Falsy: "0" or "false" (or anything else). Unset → fallback.
const parseBool = (value, fallback) =>
  value === undefined || value === "" ? fallback : /^(1|true)$/i.test(value);

// Preview-launch modal config. Defaults to on (no .exe yet); set
// PREVIEW_MODAL_ON_DOWNLOAD=off once the real download is ready.
const previewModalOnDownload = parseBool(process.env.PREVIEW_MODAL_ON_DOWNLOAD, true);
const submissionEndpoints = resolveSubmissionEndpoints({
  buildDomain,
  isDev,
  earlyAccessSubscribeUrl: process.env.EARLY_ACCESS_SUBSCRIBE_URL || "",
  contactFormUrl: process.env.CONTACT_FORM_URL || "",
  productUpdatesSubscribeUrl: process.env.PRODUCT_UPDATES_SUBSCRIBE_URL || "",
});
const contactEmail = process.env.CONTACT_EMAIL || "contact@talkbar.app";

export default defineConfig({
  site: config.site,
  outDir: `./dist-${buildDomain}`,
  integrations: [
    react(),
    icon({
      include: {
        lucide: ["*"],
      },
    }),
    sitemap({
      i18n: {
        defaultLocale: config.defaultLocale,
        locales: Object.fromEntries(config.locales.map((l) => [l, l])),
      },
    }),
    ...(isProductionBuild ? [] : [noindexHeaders]),
  ],
  i18n: {
    locales: isDev ? ALL_LOCALES : config.locales,
    defaultLocale: config.defaultLocale,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    resolve: {
      alias: {
        "@": "./src",
      },
    },
    define: {
      "import.meta.env.BUILD_DOMAIN": JSON.stringify(buildDomain),
      "import.meta.env.DOWNLOAD_LINK_WINDOWS": JSON.stringify(
        process.env.DOWNLOAD_LINK_WINDOWS || "https://cdn.talkbar.app/TalkBar_x64-setup.exe"
      ),
      "import.meta.env.DOWNLOAD_LINK_MAC": JSON.stringify(
        process.env.DOWNLOAD_LINK_MAC || ""
      ),
      "import.meta.env.PREVIEW_MODAL_ON_DOWNLOAD": JSON.stringify(previewModalOnDownload),
      "import.meta.env.EARLY_ACCESS_SUBSCRIBE_URL": JSON.stringify(
        submissionEndpoints.earlyAccessSubscribeUrl
      ),
      "import.meta.env.CONTACT_FORM_URL": JSON.stringify(submissionEndpoints.contactFormUrl),
      "import.meta.env.PRODUCT_UPDATES_SUBSCRIBE_URL": JSON.stringify(
        submissionEndpoints.productUpdatesSubscribeUrl
      ),
      "import.meta.env.CONTACT_EMAIL": JSON.stringify(contactEmail),
    },
  },
});
