// https://nuxt.com/docs/api/configuration/nuxt-config
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { join, relative, resolve, sep } from "path";
import type { Nuxt } from "nuxt/schema";
import { docsLocales, resolveDocsLocale } from "./docs.locales";

import { readDocsPages } from "./scripts/lib/docs-pages.mjs";

const locale = resolveDocsLocale(process.env.DOCS_LOCALE);
const localeConfig = docsLocales[locale];
const pages = readDocsPages(locale);
const translatedPaths = new Set(readDocsPages(locale === "en" ? "ru" : "en").map(page => page.path));
const alternatePaths = pages.filter(page => translatedPaths.has(page.path)).map(page => page.path);
const isProduction = process.env.NUXT_SITE_ENV === "production" &&
  (process.env.CF_PAGES !== "1" || process.env.CF_PAGES_BRANCH === (process.env.DOCS_PRODUCTION_BRANCH || "main"));
const pageDates = Object.fromEntries(pages.flatMap(({ path, lastModified }) => lastModified ? [[path, lastModified]] : []));

// AI crawlers named explicitly in robots.txt, so the policy stays clear even when a
// host or CDN adds its own defaults. All of them may read the published docs.
const aiCrawlers = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended",
];

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

// In dev, Nuxt writes the app manifest (.nuxt/manifest/meta/dev.json) only after the
// first Nitro build. A browser tab that reconnects before that logs "Failed to resolve
// import #app-manifest", so write a placeholder first, as Nuxt does for production builds.
const devAppManifest = (_options: unknown, nuxt: Nuxt) => {
  if (!nuxt.options.dev) return;
  // Keep llms.txt and the Markdown copies in .discovery/ in step with content edits.
  nuxt.hook("builder:watch", (_event, path) => {
    if (!relative(nuxt.options.rootDir, resolve(nuxt.options.rootDir, path)).startsWith(`content${sep}${locale}${sep}`)) return;
    try {
      execFileSync(process.execPath, ["scripts/generate-discovery.mjs"], { cwd: nuxt.options.rootDir, env: { ...process.env, DOCS_LOCALE: locale }, stdio: "ignore" });
    } catch (error) {
      console.warn("[docs] Could not regenerate discovery files:", error);
    }
  });
  nuxt.hook("build:before", () => {
    const buildId = nuxt.options.runtimeConfig.app.buildId || nuxt.options.buildId;
    const metaDir = join(nuxt.options.buildDir, "manifest/meta");
    const file = join(metaDir, `${buildId}.json`);
    if (existsSync(file)) return;
    mkdirSync(metaDir, { recursive: true });
    writeFileSync(file, JSON.stringify({ id: buildId, timestamp: Date.now(), prerendered: [] }));
  });
};

// The template layer ships zkSync assets, KaTeX and Algolia styles, and its own
// favicons and head tags. None of them belong on the TalkBar docs, so drop them.
const templateDir = "docs-nuxt-template";
const templateHeadLinks = new Set(["apple-touch-icon", "icon", "mask-icon", "shortcut icon"]);
const removeTemplateAssets = (_options: unknown, nuxt: Nuxt) => {
  nuxt.options.css = nuxt.options.css.filter(entry => {
    const file = typeof entry === "string" ? entry : (entry as { src?: string }).src || "";
    return !(file.includes(templateDir) && /(katex|algolia-search)[^/]*\.css$/.test(file));
  });
  const head = nuxt.options.app.head;
  head.link = (head.link || []).filter(link =>
    !(templateHeadLinks.has(String(link.rel)) && ["/favicon-32x32.png", "/favicon-16x16.png", "/safari-pinned-tab.svg"].includes(String(link.href)))
    && !(link.rel === "apple-touch-icon" && link.sizes === "120x120")
    && !(link.rel === "shortcut icon"));
  head.meta = (head.meta || []).filter(meta =>
    meta.name !== "msapplication-TileColor" && !(meta.name === "theme-color" && meta.content === "#F2F2F2"));
  nuxt.hook("nitro:config", (nitroConfig) => {
    nitroConfig.publicAssets = (nitroConfig.publicAssets || []).filter(asset => !asset.dir?.includes(`${templateDir}${sep}public`) && !asset.dir?.includes(`${templateDir}/public`));
  });
};

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
      // Favicons of www.talkbar.app, with the dark set for dark system themes. Declared
      // here rather than in app.vue so nuxt-seo-utils does not add a second icon set.
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg", media: "(prefers-color-scheme: light)" },
        { rel: "icon", type: "image/svg+xml", href: "/dark/favicon.svg", media: "(prefers-color-scheme: dark)" },
        { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
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
      docsAlternatePaths: alternatePaths,
      docsPageDates: pageDates,
      // Canonical www site for structured data, independent of preview builds
      docsWebsiteCanonicalUrl: localeConfig.websiteUrl.production,
      // Dev and preview builds show a placeholder where a screenshot is missing
      docsShowScreenshotPlaceholders: !isProduction,
      // Production builds link to the live sites; dev builds to the preview sites
      docsWebsiteUrl: isProduction ? localeConfig.websiteUrl.production : localeConfig.websiteUrl.preview,
      docsLicenseUrl: isProduction ? localeConfig.licenseUrl.production : localeConfig.licenseUrl.preview,
      docsRepoUrl: "https://github.com/TalkBarApp/talkbar",
      docsScreenshots: listScreenshots(screenshotsDir),
      // Replaces the template's zkSync site links (unused by TalkBar components).
      urls: { docs: localeConfig.siteUrl, code: localeConfig.siteUrl, sdk: localeConfig.siteUrl },
    },
  },
  content: {
    sources: {
      // Each build reads only its own language folder, so routes are identical
      // on docs.talkbar.app and docs.talkbar.ru.
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
        "simple-icons:openai",
        "simple-icons:claude",
      ],
    },
  },
  modules: ["@nuxt/fonts", devAppManifest, removeTemplateAssets],
  // Ship styles as one cacheable stylesheet instead of inlining them into every page.
  features: {
    inlineStyles: false,
  },
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
  sitemap: {
    // Theme logos under /_nuxt/ are not content images.
    discoverImages: false,
    urls: pages.map(({ path, lastModified }) => ({
      loc: path,
      ...(lastModified ? { lastmod: lastModified } : {}),
      alternatives: alternatePaths.includes(path)
        ? Object.values(docsLocales).map(({ code, siteUrl }) => ({ hreflang: code, href: `${siteUrl}${path}` }))
        : [],
    })),
  },
  robots: {
    groups: [{ userAgent: aiCrawlers, allow: ["/"] }],
  },
  routeRules: {
    // Markdown copies are for assistants; the HTML page stays the search result.
    // One rule for all copies: Cloudflare Pages allows at most 100 _headers rules.
    "/*.md": { headers: { "X-Robots-Tag": "noindex" } },
    "/llms.txt": { headers: { "Content-Type": "text/plain; charset=utf-8" } },
    "/llms-full.txt": { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  },
  // The prerender server does not serve static files, so the link checker cannot
  // probe the generated discovery files; they are copied into dist/ as is.
  linkChecker: {
    excludeLinks: [/\/llms(-full)?\.txt$/, /\.md$/],
  },
  colorMode: {
    storageKey: "talkbar-docs-color-mode",
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
    // Generated by npm run discovery:generate: llms.txt, llms-full.txt and <page>.md copies
    publicAssets: [{ dir: resolve(__dirname, ".discovery"), baseURL: "/" }],
    prerender: {
      crawlLinks: true,
      routes: pages.map(page => page.path),
      autoSubfolderIndex: false,
    },
  },
};

export default config;
