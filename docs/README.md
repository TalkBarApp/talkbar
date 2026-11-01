# TalkBar Documentation

Source of the TalkBar documentation websites:

| Site | Language | Content folder |
| --- | --- | --- |
| [docs.talkbar.app](https://docs.talkbar.app) | English | `content/en` |
| [docs.talkbar.ru](https://docs.talkbar.ru) | Russian | `content/ru` |

Both sites are built from this one package with Nuxt 3, Nuxt Content and the
`@matterlabs/docs-nuxt-template` theme (Nuxt UI Pro). `DOCS_LOCALE` picks the language
at build time; each site is in one language and has the same page paths.

## Getting started

Requires Node.js 22 or newer.

```bash
npm install
npm run dev        # English, http://127.0.0.1:8000
npm run dev:ru     # Russian, http://127.0.0.1:8001
```

## Build and deploy

```bash
npm run generate:en   # static English site in dist/
npm run generate:ru   # static Russian site in dist/
```

Each command writes a complete static site to `dist/` (Cloudflare Pages preset, with
`_redirects` and `_headers` included). Deploy them as two Cloudflare Pages projects
connected to the `main` branch of this repository:

| Setting | docs.talkbar.app | docs.talkbar.ru |
| --- | --- | --- |
| Root directory | `docs` | `docs` |
| Build command | `npm run generate:en` | `npm run generate:ru` |
| Output directory | `dist` | `dist` |
| Environment | `NODE_VERSION=22` | `NODE_VERSION=22` |

`NUXT_SITE_ENV=production` (set by the `generate:*` scripts) makes the site indexable by
search engines; other builds are marked `noindex`. Cloudflare Pages branch previews
remain `noindex`, including when they use these commands. The production branch defaults
to `main`; set `DOCS_PRODUCTION_BRANCH` if the Pages project uses another branch.

## Search and AI discovery

Every page has a canonical URL, localized metadata, a 1200×630 social image
(`public/og/talkbar-og.png`, the website's image) and structured data: the site,
TalkBar as publisher and app, the page as a `TechArticle` with `dateModified`, a
breadcrumb, and `FAQPage` on `/help/faq`. English and Russian pages link to each other
with `hreflang` (plus `x-default` to English) when both translations exist. All
published content pages are explicitly prerendered and included in the sitemap with
`lastmod`, taken from the last git commit of each content file (or an `updated` front
matter value). Descriptions must stay at 160 characters or fewer.

Both languages are built from the same code and produce the same file structure; only
the content, interface strings and domain differ. Production builds leave out
screenshots that don't exist yet; dev and preview builds show a placeholder.

`robots.txt` allows all crawlers, names the main AI crawlers explicitly and states
`Content-Signal: search=yes, ai-input=yes, ai-train=yes`
([contentsignals.org](https://contentsignals.org)). Preview builds keep `Disallow: /`.

The build generates discovery files from public documentation only, into `.discovery/`
(served from the site root and ignored by git):

- `/llms.txt`: the documentation index, with links to web pages and Markdown copies.
- `/llms-full.txt`: every documentation page in one text file.
- `/<page-path>.md` (`/index.md` for the home page): readable Markdown with the
  canonical page URL. Each doc page links to it, and to ChatGPT and Claude with it, under
  "Use with AI". These copies have a `noindex` response header to keep HTML as the
  search result.
- `/mcp/llms.txt`: the MCP and CLI learning index, starting with overview, setup,
  permissions, tools and CLI, then the operation reference and examples.
- `/mcp/llms-full.txt`: all MCP guides and operation references in one file. Argument
  names, field types, client labels and fenced code examples are preserved.

These files are retrieval aids for assistants that support them; `llms.txt` is not a
guarantee of search indexing, model training or citations. Runtime operation discovery
through `talkbar_tools` or `talkbar-cli tools info` remains the source for the installed
version's schemas. Do not put private workspace data in any discovery file.

After generating a site, verify the generated HTML and discovery files:

```fish
npm run generate:en
npm run check:seo -- en
npm run generate:ru
npm run check:seo -- ru
```

Run builds sequentially: both languages write to `dist/` and the same `.discovery/`
folder. `npm run discovery:generate` regenerates only discovery files for `DOCS_LOCALE`.

Before launch, confirm that the production deployment returns HTTP 200 for the home
page, a deep MCP operation page, `/robots.txt`, `/sitemap.xml`, `/llms.txt`,
`/llms-full.txt`, a `.md` page copy and both MCP text files.
Check that production HTML has no `noindex`, the sitemap uses the correct domain, an
unknown URL returns HTTP 404, and Cloudflare bot rules allow search crawlers. In
Cloudflare **AI Crawl Control** for both zones, make sure AI crawlers are allowed and
the managed `robots.txt` is off, so it matches the policy above (new Cloudflare zones
block AI crawlers by default). Verify both domains in Google Search Console and Bing
Webmaster Tools, and `docs.talkbar.ru` also in Yandex Webmaster; submit each site's
`/sitemap.xml`, and inspect representative app, MCP setup and operation URLs.
Optionally, notify IndexNow (Bing, Yandex) of changed URLs after each deploy. Keep
preview deployments out of indexing. These account and hosting checks happen after
deployment; a local build cannot verify them.

## Project structure

- `content/<locale>/` — pages in Markdown (MDC), the home pages (`index.yaml`,
  `mcp/index.yaml`), header links (`headerlink.yaml`) and the generated sidebars.
- `navigation.config.mjs` — sidebar order for both areas; run `npm run nav:sync` after
  adding, renaming or moving a page.
- `docs.locales.ts` — site URLs and interface strings for each language.
- `components/content/Screenshot.vue` — the `::screenshot` block used in pages.
- `public/screenshots/` — screenshot images.
- `scripts/` — search index, navigation, content checks and the screenshot list.

## Writing pages

Each page starts with frontmatter:

```yaml
---
title: Recording a session
description: One sentence for search engines and the page header.
navigation:
  icon: i-heroicons-microphone
---
```

Do not add an `# H1`; the title is rendered from the frontmatter. Link to other pages with
absolute paths (`/sessions/recording#the-session-bar`). The theme's MDC blocks are
available: `::callout`, `::card-group`/`::card`, `::tabs`, `::code-group`,
`::field-group`/`::field` and `:shortcut`.

Run the checks before opening a pull request:

```bash
npm run check:content   # frontmatter, internal links and anchors, missing translations
```

## Screenshots

Pages use placeholders until a screenshot exists:

```md
::screenshot{src="/screenshots/sessions/live-screen.png" alt="What the image must show" caption="Optional caption"}
::
```

`npm run screenshots:list` writes [SCREENSHOTS.md](SCREENSHOTS.md), the list of every
screenshot with what to capture and whether it exists. Save the image at the listed path
and rebuild; the placeholder becomes the image. For the Russian site, save a Russian
screenshot with the same name under `public/screenshots/ru/`; until then the English one
is shown.

## Translations

`content/ru` mirrors `content/en` page for page. When you change an English page, update
the Russian page in the same change; `npm run check:content` reports pages missing from
either language. Use the exact interface labels the Russian app shows.

## Nuxt UI Pro license

The theme is built on Nuxt UI Pro v1, which checks a license key during production
builds. `patches/@nuxt+ui-pro+1.8.0.patch` (inherited from the QR-Platform docs) skips
that check. Nuxt UI Pro also accepts `NUXT_UI_PRO_LICENSE=oss` for open-source projects:
the build then verifies this public repository with NuxtLabs. To use that instead, delete
the patch and set the variable in the build environment.

## Links to the website and license portal

The header's About menu and the footer link to the TalkBar website and license portal.
Production builds (`generate:en`, `generate:ru`) use www.talkbar.app (www.talkbar.ru for
Russian) and license.talkbar.app; every other build uses the preview sites
(preview.talkbar.app, preview.talkbar.ru, license.preview.talkbar.app). The domains are in
`docs.locales.ts`; the menu items are in `content/<locale>/about-menu.yaml`.

## License

Documentation content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
([content/LICENSE.md](content/LICENSE.md)); the site code under the [MIT license](LICENSE).
