# TalkBar Website

Astro website for TalkBar, a private conversation intelligence app for Windows (x64 and Arm64) and Macs with Apple silicon. The public site covers the homepage plus deep Use Case and Industry pages, sharing one layout, navbar, footer, metadata, brand styling, and download flow.

The Use Case and Industry pages are linked from the navbar dropdowns, the homepage, and the footer. The English sites (`www.talkbar.app`, `preview.talkbar.app`) and the fully translated Russian sites (`www.talkbar.ru`, `preview.talkbar.ru`) are separate builds of the same pages at the same paths (see [Russian site](#russian-site-wwwtalkbarru-and-previewtalkbarru)).

## Domains

| Domain | Purpose | Language |
|---|---|---|
| `www.talkbar.app` | Production public site | English |
| `www.talkbar.ru` | Russian production site (served through an nginx proxy) | Russian |
| `preview.talkbar.app` | Preview build with noindex robots rules | English |
| `preview.talkbar.ru` | Russian preview build with noindex robots rules | Russian |

## Tech Stack

- [Astro](https://astro.build) v6 - static site generation
- [React](https://react.dev) - interactive islands for navbar/theme controls
- [Tailwind CSS](https://tailwindcss.com) - styling
- [astro-icon](https://github.com/natemoo-re/astro-icon) - build-time Lucide SVG icons
- [Vitest](https://vitest.dev) - regression tests

## Development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:4321/`. The Russian dev server (`npm run dev:preview:ru`) runs at `http://localhost:4322/`, so both can run at the same time, started in any order. Both use `--ignore-lock` because Astro's dev-server lock is per-project and would otherwise refuse the second server; as a result neither is tracked by `astro dev stop` — stop them with Ctrl+C in their terminals.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Astro dev server on port 4321 (`--ignore-lock`, so it can run alongside the Russian dev server) |
| `npm test` | Run the Vitest regression suite |
| `npm run build` | Build the production site for `www.talkbar.app` into `dist-prod/` |
| `npm run build:ru` | Build the Russian production site for `www.talkbar.ru` into `dist-prod-ru/` |
| `npm run deploy:prod` / `npm run deploy:prod:ru` | Manual fallback: build and deploy `dist-prod/` / `dist-prod-ru/` to `talkbar-www` / `ru-talkbar-www` (branch `main`) |
| `npm run build:preview` | Build the preview site for `preview.talkbar.app` into `dist-preview/` |
| `npm run deploy:preview` | Build and deploy `dist-preview/` to the `talkbar-www-preview` Cloudflare Pages project (branch `preview`) |
| `npm run dev:preview:ru` | Start the dev server with the Russian (`preview-ru`) build domain on port 4322, alongside the English dev server (`--ignore-lock`; not tracked by `astro dev stop`) |
| `npm run dev:ru` | Shorthand for `dev:preview:ru` |
| `npm run build:preview:ru` | Build the Russian preview site for `preview.talkbar.ru` into `dist-preview-ru/` |
| `npm run deploy:preview:ru` | Build and deploy `dist-preview-ru/` to the `ru-talkbar-www-preview` Cloudflare Pages project (branch `preview`) |
| `npm run preview` | Preview the built site locally |
| `npm run lint` | Run ESLint |
| `npm run check` | Run Astro type checking |
| `npm run image:trim-border` | Trim image borders with `tools/trim-image-border.mjs` |

## Build Outputs

| Command | Output | Domain |
|---|---|---|
| `npm run build` | `dist-prod/` | `www.talkbar.app` |
| `npm run build:ru` | `dist-prod-ru/` | `www.talkbar.ru` |
| `npm run build:preview` | `dist-preview/` | `preview.talkbar.app` |
| `npm run build:preview:ru` | `dist-preview-ru/` | `preview.talkbar.ru` |

The output directory is set by `outDir: ./dist-${buildDomain}` in `astro.config.mjs`. `BUILD_DOMAIN=preview` selects the English preview domain, `BUILD_DOMAIN=preview-ru` the Russian preview domain and `BUILD_DOMAIN=prod-ru` the Russian production domain; all other builds use the English production (`prod`) domain.

## Russian site (`www.talkbar.ru` and `preview.talkbar.ru`)

The Russian sites are two build domains, `prod-ru` and `preview-ru`, configured in
`astro.config.mjs` and `src/i18n/domains.ts`. They set `defaultLocale: 'ru'`, so every page
renders Russian at the **root** of its domain (no `/ru/` prefix): the same components, driven
by the translated string data:

- UI copy lives in `src/i18n/ru.ts` (a full translation of `en.ts`).
- Deep Use Case / Industry page content lives in `src/i18n/ru-use-cases.ts`, registered for
  the `ru` locale in `src/i18n/use-cases.ts`.

Like every preview build, `preview-ru` is de-indexed by a `noindex` meta tag and an
`X-Robots-Tag` header (see [Keeping preview builds out of search](#keeping-preview-builds-out-of-search)).
`prod-ru` is indexed.

### hreflang

Both languages render the same pages at the same paths, so every indexable page lists its
counterpart: `hreflang="en"` on the English site, `hreflang="ru"` on the Russian site, and
`hreflang="x-default"` on the English site. Production builds point at `www.talkbar.app` /
`www.talkbar.ru`; preview builds point at `preview.talkbar.app` / `preview.talkbar.ru`
(`getHreflangLinks` in `src/i18n/domains.ts`). A page that exists in only one language passes
`translated={false}` to its layout and then lists only itself. Canonicals always point at the
page itself.

## Deployment

The site is hosted on **Cloudflare Pages** as **four projects** connected to this GitHub repo,
all with root directory `website`: same code, different build command and domain. Keeping
them separate is what keeps the preview builds (with their `noindex` rules) off the production
domains.

| Pages project | Domain | Branch | Build command | Output directory | Indexed |
|---|---|---|---|---|---|
| `talkbar-www` | `www.talkbar.app` | `main` | `npm run build` | `dist-prod` | Yes |
| `ru-talkbar-www` | `www.talkbar.ru` (through an nginx proxy) | `main` | `npx cross-env BUILD_DOMAIN=prod-ru astro build` | `dist-prod-ru` | Yes |
| `talkbar-www-preview` | `preview.talkbar.app` | `preview` | `npm run build:preview` | `dist-preview` | No |
| `ru-talkbar-www-preview` | `preview.talkbar.ru` | `preview` | `npm run build:preview:ru` | `dist-preview-ru` | No |

Preview builds are de-indexed by a `noindex` meta tag and an `X-Robots-Tag` header; their
`robots.txt` lets search crawlers in so they can see both. `npm run build:ru` runs the same command as the `ru-talkbar-www`
build.

> **Keep the output directory in sync.** The build output dir is derived from the build
> token: `outDir: ./dist-${buildDomain}`. If you ever rename the token (e.g. the
> production token was `app` → `dist-app` before it became `prod` → `dist-prod`), you
> **must** update each Pages project's **Build output directory** setting in the Cloudflare
> dashboard to match in the same change — otherwise the next push builds into a
> folder the project isn't serving from, and the deploy ships stale/empty output.

### One-time setup (per project)

1. **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git** and
   select this repository. Set the root directory to `website` and the production branch
   from the table above.
2. Set the **build command** and **build output directory** from the table above.
3. Add **environment variables** (Settings → Variables and Secrets), applied to both
   the Production and Preview environments:

   | Variable | Value | Notes |
   |---|---|---|
   | `NODE_VERSION` | `22` | **Required**: Cloudflare's default Node is too old for Astro. |
   | `BUILD_DOMAIN` | `prod`, `prod-ru`, `preview` or `preview-ru` | Explicit is safest; the build commands also set it (except `prod`, the default). |
   | `PREVIEW_MODAL_ON_DOWNLOAD` | leave unset (real download) | Optional. `true` brings back the early-access modal on download buttons. |
   | `EARLY_ACCESS_SUBSCRIBE_URL` | optional override | Defaults to the matching license-server `/api/early-access` in builds. |
   | `CONTACT_FORM_URL` | optional override | Defaults to the matching license-server `/api/contact` in builds. |
   | `PRODUCT_UPDATES_SUBSCRIBE_URL` | optional override | Defaults to the matching license-server `/api/subscriptions/product-updates`, kept for a later standalone signup; no page uses it today. |

   See [Environment Variables](#environment-variables) for the full list. Anything not
   set falls back to the defaults baked into `astro.config.mjs`.
4. **Add the custom domain**: project → Custom domains → add the domain from the table.
   Attach each domain only to its own project, never to another one. `www.talkbar.ru` is
   served through an nginx proxy in front of `ru-talkbar-www`.

After setup, every push to `main` rebuilds both production projects, and every push to
`preview` rebuilds both preview projects. Each project also keeps a `<project>.pages.dev` URL
that can't be removed; on the preview projects it's harmless because the build is `noindex`.

> **Node / `cross-env` note:** the build scripts use `cross-env`, a devDependency.
> Cloudflare Pages installs devDependencies by default, so this works. If a build ever
> fails with `cross-env: not found`, set the build command to `npm run build` and rely on
> the `BUILD_DOMAIN` env var instead: `astro.config.mjs` reads it and still outputs to
> `dist-${BUILD_DOMAIN}`.

### Optional: limit preview deployments

Branches other than a project's production branch create throwaway `*.pages.dev` preview deployments. To
suppress them, set **Settings → Builds & deployments → Configure Preview deployments**
to **None** (or restrict to specific branches).

### Manual deploy (fallback)

Git integration is the normal path, but you can also build and upload directly with
Wrangler without pushing:

```bash
npm run deploy:preview      # dist-preview/    -> talkbar-www-preview (branch preview)
npm run deploy:preview:ru   # dist-preview-ru/ -> ru-talkbar-www-preview (branch preview)
npm run deploy:prod         # dist-prod/       -> talkbar-www (branch main)
npm run deploy:prod:ru      # dist-prod-ru/    -> ru-talkbar-www (branch main)
```

This requires Wrangler auth (`npx wrangler login`). The production scripts publish to the
live sites; prefer pushing to `main`.

## Environment Variables

All variables are read at **build time** and injected through the `define` block in
`astro.config.mjs`, so they resolve in both server-rendered Astro frontmatter and
client React islands. Copy `env.sample` to `.env` to configure locally. Booleans use
`1` or `true` for on, `0` or `false` for off (unset → the default below).

| Variable | Purpose | Default |
|---|---|---|
| `BUILD_DOMAIN` | Set to `preview` for English preview, `preview-ru` for Russian preview, or `prod-ru` for Russian production; anything else builds English production | `prod` |
| `DOWNLOAD_HOST` | Updater that serves the installer links (`/get/windows/x64`, `/get/windows/arm`, `/get/mac`) | `https://updater.talkbar.app` |
| `PREVIEW_MODAL_ON_DOWNLOAD` | `1`/`true` → download buttons open the early-access modal; `0`/`false` → download buttons download TalkBar (see Downloads) | `false` |
| `EARLY_ACCESS_SUBSCRIBE_URL` | Optional override for early-access signup endpoint | Matching license server in builds, empty in dev |
| `CONTACT_FORM_URL` | Optional override for contact form endpoint | Matching license server in builds, empty in dev |
| `PRODUCT_UPDATES_SUBSCRIBE_URL` | Optional override for the product-updates signup endpoint, kept for a later standalone signup (no page uses it today) | Matching license server in builds, empty in dev |
| `CONTACT_EMAIL` | Address used for footer Support/Contact `mailto:` fallbacks | `contact@talkbar.app` |

Download buttons are wired through `data-download-link` and `src/lib/download.ts`.
The modal settings are centralised in `src/lib/siteConfig.ts`.

Submission endpoint defaults are derived from `BUILD_DOMAIN`:

| Build domain | Default license-server origin |
|---|---|
| `prod` | `https://license.talkbar.app` |
| `preview` | `https://license.preview.talkbar.app` |
| `preview-ru` | `https://license.preview.talkbar.ru` |
| `prod-ru` | `https://license.talkbar.ru` |

`.ru` builds reject `*.talkbar.app` submission endpoints during config resolution,
and English `.app` builds reject `*.talkbar.ru` endpoints. Local custom endpoints
such as `http://localhost:8787` remain valid for development.

## Preview-Launch Modals

The modals are provided by a single React island, `src/components/SiteModals.tsx`,
mounted once in `src/layouts/BaseLayout.astro`:

- **Download** — the download dialog (see Downloads).
- **Get early access** — opened by every download CTA (Hero, final CTA, navbar,
  mobile sticky button, footer download, sticky download bar, and use-case pages)
  only in builds with `PREVIEW_MODAL_ON_DOWNLOAD=true`. Collects an email. Also
  links to the contact modal.
- **Contact us** — opened by the footer **Contact** link. Collects name, email, and
  message.

### How the wiring works

- Every download CTA carries a `data-download-link` attribute; the footer Contact link
  carries `data-contact-link`. A single delegated click listener in
  `BaseLayout.astro` (configured via `define:vars`) intercepts these clicks and
  dispatches `talkbar:open-early-access` / `talkbar:open-contact` window events, which
  the island listens for. A `window.__talkbarPendingModal` buffer covers clicks that
  land before the island hydrates.
- By default (`PREVIEW_MODAL_ON_DOWNLOAD` unset or off), the listener does **not**
  intercept download clicks; the download script (`src/lib/downloadFlow.ts`) handles
  them, as described under Downloads.

## Downloads

By default every `data-download-link` button works the same, and the visitor stays on
the website:

- **Windows** (detected from the User-Agent; Chromium also reports Arm through a client
  hint): the click starts the download from `<DOWNLOAD_HOST>/get/windows/x64` or
  `/get/windows/arm` (the native Arm64 build), and the download dialog thanks the
  visitor, with every file listed in case the download did not start.
- **Mac**: the click starts the Apple silicon download from `<DOWNLOAD_HOST>/get/mac`,
  with the same thanks. Safari and Firefox report every Mac as Intel, so a Mac is taken
  to have Apple silicon unless Chromium reports an Intel processor (an Intel build of
  Chromium under Rosetta reports one too); an Intel Mac opens the dialog, which says the Mac version needs Apple silicon and macOS 13.4 or later.
- **Anything else** (phones, Linux, 32-bit Windows, unknown): the dialog lists every
  file to choose from.
- `?download` in the address opens the dialog on load.

The buttons show the Windows logo, or the Apple logo once a Mac is detected
(`data-download-os` on `<html>`). Each button's own `href` is the download page
(`https://download.talkbar.app`, or `https://download.talkbar.ru` on the Russian
sites), used without JavaScript, so no system is handed another system's file. Browsers
do not report when a download finishes, so the thanks appear as soon as it starts.
The `/get` links pin first installs to the updater's `FIRST_INSTALL_VERSION`.

### Form submission

In local dev, blank endpoints validate input and show a success state **without
sending anything** (placeholder mode). Production and preview builds derive real
license-server endpoints automatically unless an endpoint env var overrides them.

#### API reference

The TalkBar license server Bruno collection is the API contract source of truth:
`packages/talkbar-license-server/bruno`. The website sends unauthenticated JSON to
the public subscription/contact endpoints documented there.

**Conventions (apply to both endpoints)**

- Method: `POST`. Request header: `Content-Type: application/json`. Body: UTF-8 JSON.
- The client sends **no** auth header, cookies, or CSRF token, and does not read the
  response body. Success is determined purely by status code.
- Success: **any `2xx`** (e.g. `200` or `204`) → the modal shows its success state.
- Failure: **any non-`2xx`** or a network/CORS error → the modal shows an inline
  error and re-enables the form for retry.
- All string fields are already `.trim()`-ed by the client before sending. The client
  validates email format and that the contact message is non-empty, but **re-validate
  server-side** — never trust the client.
- CORS: if the endpoint origin differs from the site origin, it must answer the
  `OPTIONS` preflight and send `Access-Control-Allow-Origin` (and
  `Access-Control-Allow-Headers: Content-Type`). Same-origin endpoints (e.g. a
  Cloudflare Pages Function under `/api/...` on the same domain) need none.

---

**1. Early-access subscribe** — `EARLY_ACCESS_SUBSCRIBE_URL`

```
POST {EARLY_ACCESS_SUBSCRIBE_URL}
Content-Type: application/json
```

Request body:

| Field | Type | Required | Notes |
|---|---|---|---|
| `email` | string | yes | Trimmed. Client-validated against `^[^\s@]+@[^\s@]+\.[^\s@]+$`. |
| `source` | string | no | Current page hostname, e.g. `www.talkbar.app` or `preview.talkbar.ru`. |
| `locale` | string | no | Current build language, e.g. `en` or `ru`. |
| `referrer` | string | no | Current page URL, max 500 chars. |

```jsonc
// Request
{
  "email": "user@example.com",
  "source": "preview.talkbar.ru",
  "locale": "ru",
  "referrer": "https://preview.talkbar.ru/"
}
```

| Response | Meaning | Client behaviour |
|---|---|---|
| `2xx` (body ignored) | Subscribed | Shows "You're on the list!" success state |
| `4xx` / `5xx` / network error | Failed | Shows inline error, re-enables form |

---

**2. Contact form** — `CONTACT_FORM_URL`

```
POST {CONTACT_FORM_URL}
Content-Type: application/json
```

Request body:

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | no | Trimmed. May be an empty string (name field is optional in the UI). |
| `email` | string | yes | Trimmed. Client-validated against `^[^\s@]+@[^\s@]+\.[^\s@]+$`. |
| `subject` | string | yes | Sent as `Website contact form`. |
| `message` | string | yes | Trimmed. Client requires ≥ 2 characters. |
| `category` | string | yes | Sent as `question`. |
| `source` | string | yes | Current page hostname. |
| `appLanguage` | string | yes | Current build language, e.g. `en` or `ru`. |
| `subscribeUpdates` | boolean | yes | Visible checkbox, checked by default. |

```jsonc
// Request
{
  "name": "Jane Doe",
  "email": "user@example.com",
  "subject": "Website contact form",
  "message": "Hi there",
  "category": "question",
  "source": "www.talkbar.app",
  "appLanguage": "en",
  "subscribeUpdates": true
}
```

| Response | Meaning | Client behaviour |
|---|---|---|
| `2xx` (body ignored) | Received | Shows "Message sent!" success state |
| `4xx` / `5xx` / network error | Failed | Shows inline error, re-enables form |

---

**3. Product-updates subscribe (later)** — `PRODUCT_UPDATES_SUBSCRIBE_URL`

The configured/default endpoint is:

```
POST {LICENSE_SERVER_ORIGIN}/api/subscriptions/product-updates
Content-Type: application/json
```

It uses the same body shape as early access: `email`, optional `name`, `source`,
`locale`, and `referrer`. The current homepage does not expose a standalone
product-updates signup; the contact form sends `subscribeUpdates` instead.

#### License-server smoke checks

The matching license-server origin is selected automatically for each build. Use
the derived URL (or an explicit env override) when smoke testing. A `2xx` is what
the client needs:

```bash
# Early-access subscribe
curl -i -X POST "$EARLY_ACCESS_SUBSCRIBE_URL" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","source":"www.talkbar.app","locale":"en","referrer":"https://www.talkbar.app/"}'

# Contact form
curl -i -X POST "$CONTACT_FORM_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"user@example.com","subject":"Website contact form","message":"Hi there","category":"question","source":"www.talkbar.app","appLanguage":"en","subscribeUpdates":true}'

# Later standalone product-updates signup
curl -i -X POST "$PRODUCT_UPDATES_SUBSCRIBE_URL" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","source":"www.talkbar.app","locale":"en","referrer":"https://www.talkbar.app/"}'
```

Copy keys for both modals live in `src/i18n/en.ts` under the `earlyAccess.*`,
`contact.*`, and `modal.*` prefixes.

## Branding

- Product name: `TalkBar`
- Default theme: blue `#054df6`
- Alternate theme: warm (orange) palette via the header color toggle
- Header logos:
  - `design/TalkBar-logo-text-final-warm.svg`
  - `design/TalkBar-logo-text-final-warm-dark.svg`
  - `design/TalkBar-logo-text-final.svg`
  - `design/TalkBar-logo-text-final-dark.svg`
- Footer is always dark and uses dark logo assets only.

The homepage exposes a light/dark theme toggle and a warm/blue color theme toggle. Keep the color toggle as a regular icon-size button with a borderless circular swatch.

## Homepage Structure

The homepage composition lives in `src/components/HomePage.astro` and currently uses these sections, in order:

- `Navbar.tsx` — fixed header with Use Cases / Industries dropdowns and theme toggles
- `Hero.astro` — light hero with eyebrow, serif headline, CTAs, highlight chips, and a dashboard mockup
- `TrustStrip.astro` — mono stat row
- `Workflows.astro` — before / during / after lifecycle cards
- `LiveDemo.astro` — Live Context Cards bento ("signature experience")
- `FeaturesGrid.astro` — capability map (Capture & prepare / Remember & act / Run it your way)
- `UseCases.astro` — combined use cases & industries cards (link to deep pages)
- `PrivacyCompare.astro` — dark band with the comparison table
- `HowItWorks.astro` — ruled-column setup steps
- `FAQ.astro` — accordion with FAQ schema
- `CTASection.astro` — dark final download CTA
- `Footer.astro` — dark footer

Primary English copy lives in `src/i18n/en.ts`. The deep Use Case / Industry pages compose shared `src/components/use-case/*` sections from content in `src/i18n/use-cases.ts`.

## Project Structure

```text
src/
  components/        Homepage sections and shared UI
  i18n/              English-first translation data and domain config
  layouts/           Base HTML shell and use-case layout
  lib/               Download-link helpers and env-driven site config (siteConfig.ts)
  pages/             Astro routes and generated robots.txt
  styles/            Tailwind and global brand styles
design/              TalkBar logo source assets
tools/               Local image utilities
```

## SEO

Every indexable page lists its counterpart on the other language's site (see
[hreflang](#hreflang)), for example on `www.talkbar.ru/b2b-sales/`:

- `hreflang="en"` -> `https://www.talkbar.app/b2b-sales/`
- `hreflang="ru"` -> `https://www.talkbar.ru/b2b-sales/`
- `hreflang="x-default"` -> `https://www.talkbar.app/b2b-sales/`

Each production build's `robots.txt` allows crawling and names its own sitemap
(`https://www.talkbar.app/sitemap-index.xml` or `https://www.talkbar.ru/sitemap-index.xml`).

### Keeping preview builds out of search

Only the production builds, `prod` (`www.talkbar.app`) and `prod-ru` (`www.talkbar.ru`), are
meant to be indexed. The preview builds, `preview` and `preview-ru`, are de-indexed by two
layers keyed off `BUILD_DOMAIN`:

1. **`<meta name="robots" content="noindex, nofollow">`**: `src/layouts/BaseLayout.astro`
   adds it on every page of the preview builds.
2. **`X-Robots-Tag: noindex, nofollow` HTTP header**: an `astro:build:done` hook in
   `astro.config.mjs` writes a Cloudflare Pages [`_headers`](https://developers.cloudflare.com/pages/configuration/headers/)
   file (`/*` → the header) into the output dir of the preview builds only. It covers every
   response, including non-HTML assets. The production builds never emit this file.

The preview `robots.txt` (`src/pages/robots.txt.ts`) **allows** search crawlers on purpose:
a crawler that may not fetch a page never sees its `noindex`, so a blocked URL that is linked
from elsewhere can still be listed ([Google's guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing)).
It still blocks AI crawlers and lists no sitemap.

An unrecognised `BUILD_DOMAIN` falls back to `prod`, so any other non-production deploy
must build with `preview` or `preview-ru`.

> **Cloudflare "Managed robots.txt":** if enabled on a Pages project, Cloudflare prepends
> its own `User-agent: *` group (`Allow: /`, `Content-Signal`). That agrees with this site's
> rules, which already let search crawlers in. After enabling it, check that search crawling is
> still allowed and that the previews still send `noindex`. To verify the live state:
> `curl -s https://preview.talkbar.app/robots.txt` and
> `curl -sI https://preview.talkbar.app/ | grep -i x-robots-tag`.

## Verification

Run these before handing off homepage or branding changes:

```bash
npm test
npm run check
npm run build
```

For visual changes, also review the local homepage in light/dark and warm/blue themes at desktop and mobile widths.
