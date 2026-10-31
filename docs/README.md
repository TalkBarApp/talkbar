# TalkBar Documentation

Source of the TalkBar documentation websites:

| Site | Language | Content folder |
| --- | --- | --- |
| [doc.talkbar.app](https://doc.talkbar.app) | English | `content/en` |
| [doc.talkbar.ru](https://doc.talkbar.ru) | Russian | `content/ru` |

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

Each command writes a complete static site to `dist/` (Cloudflare Pages preset). Deploy
them as two projects, for example two Cloudflare Pages projects connected to this
repository:

| Setting | doc.talkbar.app | doc.talkbar.ru |
| --- | --- | --- |
| Root directory | `docs` | `docs` |
| Build command | `npm run generate:en && cp public/_redirects dist/_redirects` | `npm run generate:ru && cp public/_redirects dist/_redirects` |
| Output directory | `dist` | `dist` |
| Environment | `NODE_VERSION=22` | `NODE_VERSION=22` |

`NUXT_SITE_ENV=production` (set by the `generate:*` scripts) makes the site indexable by
search engines; other builds are marked `noindex`.

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

## License

Documentation content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/);
the site code under the MIT license.
