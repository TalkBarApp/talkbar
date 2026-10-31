# TalkBar Website

English-only Astro website for TalkBar, a private conversation intelligence app for Mac and Windows. The public site covers the homepage plus deep Use Case and Industry pages, sharing one layout, navbar, footer, metadata, brand styling, and download flow.

The Use Case and Industry pages are linked from the navbar dropdowns, the homepage, and the footer. The production and English preview sites are English-only; a fully translated **Russian preview** is built as its own build domain and served at the root of `preview.talkbar.ru` (see [Russian preview](#russian-preview-previewtalkbarru)).

## Domains

| Domain | Purpose | Language |
|---|---|---|
| `www.talkbar.app` | Production public site | English |
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
| `npm run build:preview` | Build the preview site for `preview.talkbar.app` into `dist-preview/` |
| `npm run deploy:preview` | Build and deploy `dist-preview/` to the `talkbar-preview` Cloudflare Pages project |
| `npm run dev:preview:ru` | Start the dev server with the Russian (`preview-ru`) build domain on port 4322, alongside the English dev server (`--ignore-lock`; not tracked by `astro dev stop`) |
| `npm run dev:ru` | Shorthand for `dev:preview:ru` |
| `npm run build:preview:ru` | Build the Russian preview site for `preview.talkbar.ru` into `dist-preview-ru/` |
| `npm run deploy:preview:ru` | Build and deploy `dist-preview-ru/` to the `talkbar-preview-ru` Cloudflare Pages project |
| `npm run preview` | Preview the built site locally |
| `npm run lint` | Run ESLint |
| `npm run check` | Run Astro type checking |
| `npm run image:trim-border` | Trim image borders with `tools/trim-image-border.mjs` |

## Build Outputs

| Command | Output | Domain |
|---|---|---|
| `npm run build` | `dist-prod/` | `www.talkbar.app` |
| `npm run build:preview` | `dist-preview/` | `preview.talkbar.app` |
| `npm run build:preview:ru` | `dist-preview-ru/` | `preview.talkbar.ru` |

The output directory is set by `outDir: ./dist-${buildDomain}` in `astro.config.mjs`. `BUILD_DOMAIN=preview` selects the English preview domain, `BUILD_DOMAIN=preview-ru` the Russian preview domain, and `BUILD_DOMAIN=prod-ru` is reserved for a future live Russian domain; all other builds use the production (`prod`) domain.

## Russian preview (`preview.talkbar.ru`)

The Russian site is a third build domain, `preview-ru`, configured in `astro.config.mjs`
and `src/i18n/domains.ts`. It sets `defaultLocale: 'ru'`, so every page renders Russian at
the **root** of `preview.talkbar.ru` (no `/ru/` prefix) — the same components, driven by the
translated string data:

- UI copy lives in `src/i18n/ru.ts` (a full translation of `en.ts`).
- Deep Use Case / Industry page content lives in `src/i18n/ru-use-cases.ts`, registered for
  the `ru` locale in `src/i18n/use-cases.ts`.

Like every non-production build, `preview-ru` is de-indexed by all three layers (`noindex`
meta, `X-Robots-Tag` header, locked-down `robots.txt`) because `buildDomain !== "prod"`.

Deploy it to its own Cloudflare Pages project (`talkbar-preview-ru`) with
`npm run deploy:preview:ru`, and attach the `preview.talkbar.ru` custom domain to that
project only. Set `NODE_VERSION=22` and `BUILD_DOMAIN=preview-ru` in the project's
environment variables, exactly as the English preview project does with `BUILD_DOMAIN=preview`.

## Deployment

The site is hosted on **Cloudflare Pages**. Production (`www.talkbar.app`) and preview
(`preview.talkbar.app`) are **two separate Pages projects** connected to this GitHub
repo — same code, different build command and domain. Keeping them separate is what
makes the preview build (with its `noindex` rules and early-access modals) stay off the
production domain.

| | Production | Preview |
|---|---|---|
| Pages project | `talkbar-app` (example name) | `talkbar-preview` |
| Production branch | `main` | `main` |
| Build command | `npm run build` | `npm run build:preview` |
| Build output directory | `dist-prod` | `dist-preview` |
| Custom domain | `www.talkbar.app` (+ apex `talkbar.app`) | `preview.talkbar.app` |
| `BUILD_DOMAIN` | `prod` (default) | `preview` |
| Indexed by search engines | Yes | No (`noindex` meta + `X-Robots-Tag` header + disallow `robots.txt`) |

> **Keep the output directory in sync.** The build output dir is derived from the build
> token: `outDir: ./dist-${buildDomain}`. If you ever rename the token (e.g. the
> production token was `app` → `dist-app` before it became `prod` → `dist-prod`), you
> **must** update each Pages project's **Build output directory** setting in the Cloudflare
> dashboard to match in the same change — otherwise the next push to `main` builds into a
> folder the project isn't serving from, and the deploy ships stale/empty output.

### One-time setup (per project)

1. **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git** and
   select this repository.
2. Set the **build command** and **build output directory** from the table above
   (the only difference between the two projects).
3. Add **environment variables** (Settings → Variables and Secrets), applied to both
   the Production and Preview environments:

   | Variable | Production | Preview | Notes |
   |---|---|---|---|
   | `NODE_VERSION` | `22` | `22` | **Required** — Cloudflare's default Node is too old for Astro 6. |
   | `BUILD_DOMAIN` | `prod` | `preview` | Explicit is safest. Preview's build command also sets it. |
   | `PREVIEW_MODAL_ON_DOWNLOAD` | `true` (modal) or `false` (real download) | `true` | Independent of build type — set per environment as you like. |
   | `EARLY_ACCESS_SUBSCRIBE_URL` | optional override | optional override | Defaults to the matching license-server `/api/early-access` in builds. |
   | `CONTACT_FORM_URL` | optional override | optional override | Defaults to the matching license-server `/api/contact` in builds. |
   | `PRODUCT_UPDATES_SUBSCRIBE_URL` | optional override | optional override | Reserved for the later standalone product-updates signup. |

   See [Environment Variables](#environment-variables) for the full list. Anything not
   set falls back to the defaults baked into `astro.config.mjs`.
4. **Add the custom domain**: project → Custom domains → add the domain from the table.
   Since `talkbar.app` is a zone on the same Cloudflare account, the proxied CNAME is
   created automatically. Attach `www.talkbar.app` (and apex `talkbar.app`) only to the
   production project, and `preview.talkbar.app` only to the preview project — never the
   reverse.

After setup, every push to `main` rebuilds and redeploys both projects automatically.
Each project also keeps a `<project>.pages.dev` URL that can't be removed; on the
preview project it's harmless because the build is `noindex`.

> **Node / `cross-env` note:** `build:preview` uses `cross-env`, a devDependency.
> Cloudflare Pages installs devDependencies by default, so this works. If a build ever
> fails with `cross-env: not found`, set the preview build command to `npm run build`
> and rely on the `BUILD_DOMAIN=preview` env var instead — `astro.config.mjs` reads it
> and still outputs to `dist-preview`.

### Optional: limit preview deployments

Branches other than `main` create throwaway `*.pages.dev` preview deployments. To
suppress them, set **Settings → Builds & deployments → Configure Preview deployments**
to **None** (or restrict to specific branches).

### Manual deploy (fallback)

Git integration is the normal path, but you can also deploy preview directly with
Wrangler without pushing:

```bash
npm run deploy:preview   # builds dist-preview/ and pushes to the talkbar-preview project
```

This requires Wrangler auth (`npx wrangler login`) and targets the project named
`talkbar-preview`. There is no production equivalent script — production deploys via Git.

## Environment Variables

All variables are read at **build time** and injected through the `define` block in
`astro.config.mjs`, so they resolve in both server-rendered Astro frontmatter and
client React islands. Copy `env.sample` to `.env` to configure locally. Booleans use
`1` or `true` for on, `0` or `false` for off (unset → the default below).

| Variable | Purpose | Default |
|---|---|---|
| `BUILD_DOMAIN` | Set to `preview` for English preview, `preview-ru` for Russian preview, or reserved `prod-ru` for future Russian production; anything else builds English production | `prod` |
| `DOWNLOAD_LINK_WINDOWS` | Windows installer URL used by download buttons | `https://cdn.talkbar.app/TalkBar_x64-setup.exe` |
| `DOWNLOAD_LINK_MAC` | Optional Mac download URL | empty |
| `PREVIEW_MODAL_ON_DOWNLOAD` | `1`/`true` → download buttons open the early-access modal; `0`/`false` → real download | `true` |
| `EARLY_ACCESS_SUBSCRIBE_URL` | Optional override for early-access signup endpoint | Matching license server in builds, empty in dev |
| `CONTACT_FORM_URL` | Optional override for contact form endpoint | Matching license server in builds, empty in dev |
| `PRODUCT_UPDATES_SUBSCRIBE_URL` | Optional override for later standalone product-updates signup endpoint | Matching license server in builds, empty in dev |
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

While there is no public `.exe`, the site can capture interest instead of serving a
broken download. Two modals are provided by a single React island,
`src/components/SiteModals.tsx`, mounted once in `src/layouts/BaseLayout.astro`:

- **Get early access** — opened by every download CTA (Hero, final CTA, navbar,
  mobile sticky button, footer download, sticky download bar, and use-case pages).
  Collects an email. Also links to the contact modal.
- **Contact us** — opened by the footer **Contact** link. Collects name, email, and
  message.

### How the wiring works

- Every download CTA carries a `data-download-link` attribute; the footer Contact link
  carries `data-contact-link`. A single delegated click listener in
  `BaseLayout.astro` (configured via `define:vars`) intercepts these clicks and
  dispatches `talkbar:open-early-access` / `talkbar:open-contact` window events, which
  the island listens for. A `window.__talkbarPendingModal` buffer covers clicks that
  land before the island hydrates.
- When `PREVIEW_MODAL_ON_DOWNLOAD=off`, the listener does **not** intercept download
  clicks; instead it rewrites every `data-download-link` href to the platform download
  (Windows/Mac), restoring normal download behaviour. The island is only mounted when
  at least one modal is enabled.

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

The active public build emits English-only `hreflang` tags:

- `hreflang="en"` -> `https://www.talkbar.app/`
- `hreflang="x-default"` -> `https://www.talkbar.app/`

### Keeping non-production builds out of search

Only the `prod` build (`www.talkbar.app`) is meant to be indexed. **Every other build**
— `preview`, and any future `dev`/`staging`/`preview2` deploy, on any hostname — is
de-indexed by three independent layers, all keyed off `BUILD_DOMAIN` (i.e. `buildDomain !== "prod"`):

1. **`<meta name="robots" content="noindex, nofollow">`** — `src/layouts/BaseLayout.astro`
   adds it on every page of non-prod builds. This is the most reliable de-index signal,
   because the crawler must fetch the page to honour it.
2. **`X-Robots-Tag: noindex, nofollow` HTTP header** — an `astro:build:done` hook in
   `astro.config.mjs` writes a Cloudflare Pages [`_headers`](https://developers.cloudflare.com/pages/configuration/headers/)
   file (`/*` → the header) into the output dir for non-prod builds only. It covers every
   response, including non-HTML assets and redirects, and can't be undercut by `robots.txt`.
   The `prod` build never emits this file.
3. **Locked-down `robots.txt`** — `src/pages/robots.txt.ts` serves `Disallow: /` (plus
   explicit AI-crawler blocks) for non-prod builds, and `Allow: /` + sitemap for `prod`.

> **Heads-up — Cloudflare "Managed robots.txt":** if enabled on a Pages project, Cloudflare
> *prepends* its own `User-agent: * / Allow: / Content-Signal: search=yes` block above the
> app's `robots.txt`, producing conflicting groups (many crawlers resolve the tie toward
> `Allow`) and signalling `search=yes`. Disable it on non-prod projects in the dashboard.
> The `noindex` meta + `X-Robots-Tag` header keep the build de-indexed regardless, but the
> mixed `robots.txt` is misleading. To verify the live state:
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
