// https://nuxt.com/docs/api/configuration/nuxt-config
import { existsSync, readdirSync } from "fs";
import { join, relative, resolve, sep } from "path";
import { docsLocales, resolveDocsLocale } from "./docs.locales";

const locale = resolveDocsLocale(process.env.DOCS_LOCALE);
const localeConfig = docsLocales[locale];
const isProduction = process.env.NUXT_SITE_ENV === "production";

// Screenshots that exist; the ::screenshot component shows a placeholder for the rest.
const screenshotsDir = resolve(__dirname, "public/screenshots");
const listScreenshots = (dir: string): string[] =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) return listScreenshots(full);
        return /\.(png|jpe?g|webp|gif|avif)$/i.test(entry.name)
          ? ["/" + relative(resolve(__dirname, "public"), full).split(sep).join("/")]
          : [];
      })
    : [];

const config = {
  ssr: true, // Enable SSR for better performance and SEO
  compatibilityDate: "2023-10-01",
  css: ["./assets/css/main.css"],
  extends: ["@matterlabs/docs-nuxt-template"],
  site: {
    name: localeConfig.siteName,
    url: localeConfig.siteUrl,
    indexable: isProduction,
    defaultLocale: locale,
  },
  devServer: {
    port: locale === "ru" ? 8001 : 8000,
  },
  ignorePrefix: "-",
  devtools: {
    enabled: false,
  },
  app: {
    baseURL: "/",
    pageTransition: false,
    layoutTransition: false,
    head: {
      htmlAttrs: { lang: locale },
      link: [{ rel: "manifest", href: "/site.webmanifest" }],
    },
  },
  runtimeConfig: {
    public: {
      app: "talkbar-docs",
      docsLocale: locale,
      docsStrings: localeConfig.strings,
      docsSiteName: localeConfig.siteName,
      docsDescription: localeConfig.description,
      docsSiteUrl: localeConfig.siteUrl,
      docsWebsiteUrl: localeConfig.websiteUrl,
      docsRepoUrl: "https://github.com/TalkBarApp/talkbar",
      docsScreenshots: listScreenshots(screenshotsDir),
    },
  },
  content: {
    sources: {
      // Each build reads only its own language folder, so routes are identical
      // on doc.talkbar.app and doc.talkbar.ru.
      content: {
        driver: "fs",
        base: resolve(__dirname, `./content/${locale}`),
        include: ["**/*.yaml", "**/*.yml", "**/*.md"],
      },
    },
    documentDriven: {
      injectPage: false, // turn off injectPage because we are using our own [...slug].vue
    },
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
      langs: ["json", "bash", "powershell", "shell", "toml", "yaml", "md", "js", "ts"],
    },
    markdown: {
      anchorLinks: false, // Disable anchor links to avoid clutter in search
    },
  },
  experimental: {
    viewTransition: true,
    defaults: {
      nuxtLink: {
        trailingSlash: "remove",
      },
    },
  },
  icon: {
    clientBundle: {
      // scan all components in the project and include icons
      scan: true,
      // include all custom collections in the client bundle
      includeCustomCollections: true,
      // guard for uncompressed bundle size, will fail the build if exceeds
      sizeLimitKb: 256,
      // Explicitly include icons that might be missed by the scanner
      icons: [
        "heroicons:clipboard-document",
        "heroicons:hashtag-20-solid",
        "heroicons:sun-20-solid",
        "heroicons:moon-20-solid",
        "heroicons:document-text",
        "heroicons:arrow-left-20-solid",
        "heroicons:magnifying-glass",
        "heroicons:x-mark-20-solid",
        "heroicons:check-20-solid",
        "heroicons:arrow-up-right-20-solid",
        "heroicons:photo",
      ],
    },
  },
  modules: ["@nuxt/fonts"],
  // Faces of www.talkbar.app, self-hosted at build time. English: Hanken Grotesk
  // (text) and Urbanist (headings); Russian: Onest; code: JetBrains Mono.
  fonts: {
    families:
      locale === "ru"
        ? [
            { name: "Onest", provider: "google" },
            { name: "JetBrains Mono", provider: "google" },
          ]
        : [
            { name: "Hanken Grotesk", provider: "google" },
            { name: "Urbanist", provider: "google" },
            { name: "Onest", provider: "google" },
            { name: "JetBrains Mono", provider: "google" },
          ],
    defaults: {
      weights: [300, 400, 500, 600, 700],
      subsets: locale === "ru" ? ["cyrillic", "cyrillic-ext", "latin", "latin-ext"] : ["latin", "latin-ext"],
    },
  },
  ogImage: {
    enabled: false,
  },
  // Disable Algolia since we're using static search
  algolia: false,
  nitro: {
    experimental: {
      wasm: false,
    },
    preset: "cloudflare-pages-static",
    prerender: {
      crawlLinks: true,
      autoSubfolderIndex: false,
    },
  },
};

export default config;
