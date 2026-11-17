# TalkBar 0.3.4 release review: handoff

Review date: 2026-11-17. Range reviewed: tag `v0.3.1` (`116dfcd`) to `main` at `a4f54bf`.
Branch: `claude/0.3.4-release-review-jhzfca`.

This document lists every issue found in this repository during the 0.3.4 pre-release
review, what was fixed, what is still open, and what was not reviewed at all.

## Status

| Area | Status |
| --- | --- |
| Website (`website/`) changes since `v0.3.1` | Reviewed. 1 P1 (fixed on this branch), 1 P2, 8 P3 |
| Docs (`docs/`) changes since `v0.3.1` | Reviewed. 3 P2, 8 P3 |
| Readiness of website, docs and README for Windows x64, Windows Arm64 and Apple silicon | Reviewed. Not ready; lists below |
| App code: built-in AI on Windows x64, Windows Arm64 and Apple silicon | **Not reviewed** |
| App code: external AI providers and CLI tools | **Not reviewed** |
| App code: custom AI writing style | **Not reviewed** |

This repository holds only the docs site, the website and the release downloads. The
app source is in a different repository that was not available to the review, so the
three app-code rows are still to do. See [Not reviewed](#not-reviewed-the-app-code).

Severity used here:

- **P1**: broken for users or blocks a release.
- **P2**: wrong behavior or wrong information in a case that matters.
- **P3**: minor or latent.

Each finding says how it was checked: **Run** means it was reproduced by running a
command, a build or a browser; **Read** means it was found by reading the code only.

## Fixed on this branch

### W1. P1: every website build failed (fixed)

- **Cause:** commit `a4f54bf` added `website/src/pages/robots.test.ts`. Astro builds every
  file in `src/pages` as a route, so it rendered `/robots.test`, the Vitest hooks in the
  file threw, and the build exited with an error.
- **Effect:** `npm run build`, `build:ru`, `build:preview` and `build:preview:ru` all
  failed, so no website deploy from `main` at `a4f54bf` could succeed. The live sites
  stayed on the previous deploy. `npm test` and `npm run check` both passed, so only the
  build step showed it.
- **Fix:** the test moved to `website/src/robots.test.ts` and imports the endpoint from
  `./pages/robots.txt`.
- **Checked (Run):** with the fix, the 112 website tests pass and all four builds succeed
  with 15 HTML pages each and no `/robots.test` output.
- **Still needed:** this fix has to reach `main`. Until it does, website builds from
  `main` keep failing.

## Open issues: website

### P2

**W2. The download dialog does not hold or return keyboard focus.** (Run)
`website/src/components/Modal.tsx:32-50, 63`

- Open the download dialog with Enter on a download button and press Tab three times:
  focus leaves the dialog and moves through the page behind the backdrop, while the
  dialog still says `aria-modal="true"`.
- Press Escape: focus lands on `<body>`, not on the button that opened the dialog, so
  the next Tab starts from the top of the page.
- The gap existed at `v0.3.1` for the early-access and contact dialogs. It matters more
  now because this dialog opens on every download click, and the new `inert` on close
  drops focus to `<body>`.

### P3

**W3. `npm run lint` fails.** (Run)
`website/src/components/ScreenshotGallery.tsx:287-288`: two errors,
`react-hooks/immutability` and `react-hooks/set-state-in-effect`. The `v0.3.1` tree
lints clean. The gallery itself works in a browser. This becomes P2 if lint gates a
deploy.

**W4. A fast click on Windows on Arm downloads the x64 link.** (Run)
`website/src/lib/downloadFlow.ts:55-64, 73`: the processor is known only after an
asynchronous browser hint, and a click before it answers uses the x64 link. The same
happens with Ctrl-click or middle-click (the static link is x64) and in Firefox on Arm,
which reports x64. Harmless only while both links serve the same file.

**W5. Without JavaScript, a Mac visitor downloads the Windows installer.** (Run)
`website/src/lib/download.ts:28`: the fallback link on every download button is the
Windows x64 file. Also true at `v0.3.1`.

**W6. `BUILD_DOMAIN` set only in `.env` produces a mixed build.** (Run)
`website/astro.config.mjs:8-15` reads `process.env` before `.env` is loaded, while
`website/src/i18n/domains.ts:5-13` reads it after. With `BUILD_DOMAIN="preview-ru"` in
`.env` and a plain `astro build`, the pages are Russian with the noindex meta, but the
canonical and hreflang links point at `https://www.talkbar.app/`, there is no
`_headers` file, and the output goes to `dist-prod`. The npm scripts and Cloudflare
settings use real environment variables and are not affected. Same code at `v0.3.1`.

**W7. Structured data says the app runs on macOS.** (Read)
`website/src/layouts/BaseLayout.astro:68` has `operatingSystem: 'Windows, macOS'` on
every indexable page, while the same pages say Mac is not available. Resolves itself
when the Mac copy is updated for 0.3.4.

**W8. The gallery tabs have no tab panel.** (Run)
`website/src/components/ScreenshotGallery.tsx:548-562`: `role="tablist"` and
`role="tab"` are set, but there is no `role="tabpanel"` and no `aria-controls`. Arrow,
Home and End keys work.

**W9. React hydration error on every page when the system theme is dark.** (Run)
`website/src/components/ThemeToggle.tsx:12-19`. Not from this range (the file is
unchanged since `v0.3.1`), and nothing visibly breaks.

**W10. In tabbed mode, a screenshot in no category is silently dropped.** (Read)
`website/src/components/ScreenshotStrip.astro:57-62` with
`ScreenshotGallery.tsx:107-111`. Latent: all 44 gallery screenshots are in exactly one
category today. `PRIVACY_GALLERY_SHOTS` in `website/src/lib/screenshots.ts` is exported
but unused.

### Checked and found correct

- With W1 fixed, all four builds produce correct canonical, hreflang, robots and noindex
  output: production pages are indexable with reciprocal `en`/`ru`/`x-default` links;
  preview pages carry `noindex, nofollow` in both the meta tag and the `_headers` file.
- The pending-dialog handoff between the inline script and the React island, double
  opens, `?download`, modifier and middle clicks, the Mac form endpoint, Russian and dark
  screenshot fallbacks, and the deploy script names and branches.
- Ten keys exist in `en.ts` but not in `ru.ts` (`followup.item.scan`,
  `followup.item.scanDetail`, `faq.scan.*`, `faq.projectGlobal.*`, `faq.notes.*`,
  `faq.templates.*`). No component uses them and none was added in this range.

## Open issues: docs

The docs build and `npm run check:content` pass for both languages (79 pages each).
A crawl of the built sites found no missing pages, anchors or images, and English and
Russian match in structure, tables and numbers across all content files.

### P2

**D1. The English docs send every download click to the Russian domain.** (Run)

- `docs/components/HeaderComponent.vue:36, 82`: header button and mobile menu item.
- `docs/public/_redirects:5`: `/download` redirects to `https://download.talkbar.ru`.
- `docs/content/en/getting-started/install-and-update.md:8, 14, 20`.

The repository's own rule forbids this: `docs/scripts/check-seo.mjs` asserts that the
English site links only to `.app` hosts, and 97 built English files break it. Commit
`6339276` put the `.ru` URL in the English page on purpose, so decide one of two things:
give the English site its own download URL, or add an exception for `download.` to the
check.

**D2. The install page contradicts itself about Mac, in both languages.** (Read)

- `docs/content/en/getting-started/install-and-update.md:8`: "Windows is available now.
  Mac (soon)."
- Same file, lines 19-23, macOS tab: "Download the macOS file for your Mac."
- `docs/content/en/help/faq.md:100`: "Mac (soon). TalkBar runs on Windows today." This
  answer is also emitted as FAQ structured data.

The Russian pages say the same at the same lines.

**D3. `npm run check:seo` fails for both languages.** (Run)
`/sharing/exports` has 50,069 bytes of inline CSS against the 50,000 limit in
`docs/scripts/check-seo.mjs:42`. The check stops there, which hides D1. Whether this
predates `v0.3.1` was not established. `/ai/cli-tools` (49,440) and
`/sharing/notifications` (49,406) are close to the limit.

### P3

**D4. Zooming a screenshot that has not loaded opens an empty overlay.** (Run)
`docs/components/content/Screenshot.vue:68-78`: with `naturalWidth` 0 the code falls
back to the image's layout size, whose height is 0. Reached by keyboard (Tab, Enter) or
on a slow or failed image.

**D5. On phones the zoom is no larger than the inline image.** (Run)
At 390 px wide the zoomed image is about the size it has on the page.
`Screenshot.vue:108` closes the zoom on any `touchmove`, so pinch-zoom dismisses it, and
the old link to the full-size image is gone.

**D6. The page scrolls behind the open zoom with the keyboard.** (Run)
PageDown and End scroll the page with the dialog open; only wheel, touchmove and resize
close it (`Screenshot.vue:107-109`).

**D7. Structured data carries a value that is not an operating system.** (Read)
`docs/composables/useDocsSeo.ts:72`: `operatingSystem: 'Windows, Mac (soon)'`, in
English on both sites.

**D8. Three Russian alt texts describe an older screenshot.** (Read)
The English alt texts were updated; these were not:

- `docs/content/ru/knowledge/projects.md:22`
- `docs/content/ru/sessions/series.md:44`
- `docs/content/ru/sessions/overview.md:29`

**D9. A Russian label was renamed in body text but not everywhere.** (Read)
Body text now says «Данные и копии». These still say «Данные и резервные копии»:
`docs/content/ru/settings/data-and-backup.md:2` (title),
`docs/content/ru/navigation-talkbar.yaml:183`, and link texts in
`ru/settings/account-and-workspaces.md:85`, `ru/settings/general.md:236`,
`ru/settings/private-local-ai.md:95` and `ru/data/backup-and-restore.md:122`. May be
intended as a descriptive page title.

**D10. Raw HTML and tab markers leak into generated text.** (Run)
The `<a href … target="_blank">` tags in `install-and-update.md:8, 14, 20` appear as
literal tags in the search index and in the Markdown and `llms-full.txt` copies. Site
search shows literal `#macos` lines in results.

**D11. English-only description with "Mac (soon)".** (Read)
`docs/app.config.ts:11`. It reaches only the JavaScript bundle, not the built HTML.

## Not ready for three platforms

0.3.4 is planned to support Windows x64, Windows Arm64 and Apple silicon. The website,
docs and README still describe a Windows-only product with x64 under emulation on Arm.

### Website: behavior that needs a decision

| Where | What it does today |
| --- | --- |
| `website/src/lib/download.ts:20-25` | Only two links exist, `/get/windows/x64` and `/get/windows/arm`. There is no Mac link. The comment says Windows on Arm gets the x64 installer under emulation until an Arm64 build is published. |
| `website/src/lib/download.ts:83` | The processor hint is requested only for Windows, so a Mac's processor is never known. Safari reports every Mac as Intel. |
| `website/src/lib/download.ts:101-104` | A direct download is returned only for Windows. |
| `website/src/lib/downloadFlow.ts:9-11, 42-44` | Every Mac visitor gets the "coming soon" dialog. |
| `website/src/components/SiteModals.tsx:378-395` | macOS row with a "Coming soon" badge and a "Tell me when it's ready" button. |
| `website/src/components/SiteModals.tsx:438-509` | The whole Mac "coming soon" view with the notify form. |
| `website/src/layouts/BaseLayout.astro:68-69` | `downloadUrl` in structured data is the Windows x64 link. |

### Website: copy

English, `website/src/i18n/en.ts` (the Russian file `ru.ts` has the same strings at
149, 153, 581, 616-617, 621, 629, 668, 671, 673-682, 902 and 1196-1198):

| Line | Text |
| --- | --- |
| 5 | Page title: "TalkBar: Private AI Note Taker for Windows, No Meeting Bot" |
| 135, 611, 927 | "Download for Windows" (hero, final call to action, sticky bar) |
| 138, 612, 624 | "Available for Windows · Mac version in progress" |
| 578 | FAQ: "A private AI note taker for Windows. …" (also in FAQ structured data) |
| 664 | "Windows 10 and 11 (64-bit)" |
| 667 | "For Windows 11 on Arm. Installs the x64 version, which runs under emulation." |
| 669-678 | "Coming soon", "Tell me when it's ready", "TalkBar for Mac is coming soon" and the rest of the Mac notify dialog |
| 1027 | Structured data description: "Private AI note taker for Windows. …" |
| 1066-1067 | "Is TalkBar available for Mac?" / "Not yet. TalkBar runs on Windows now; a Mac version is in progress." |

Use-case pages: `website/src/i18n/use-cases.ts:6, 234, 236` and
`website/src/i18n/ru-use-cases.ts:13, 241, 243`.

Website documentation: `website/README.md` (the download section says "Mac: no download
yet") and `website/env.sample:15-16, 22-24`.

Tests that pin the current wording or behavior and will fail when it changes:
`website/src/components/SiteModals.test.tsx`, `src/lib/downloadFlow.test.ts`,
`src/lib/download.test.ts`, `src/components/Hero.test.ts`,
`src/components/HomepageSections.test.ts`, `src/russianCoverage.test.ts` and
`src/russianPreview.test.ts`.

### Docs: statements that Mac is coming soon

Russian files mirror the English lines.

| Where | Text |
| --- | --- |
| `docs/content/en/getting-started/install-and-update.md:8` | "Windows is available now. Mac (soon)." |
| `docs/content/en/getting-started/introduction.md:3` | Description: "…for Windows and Mac (soon)…" |
| `docs/content/en/getting-started/introduction.md:48` | "64-bit Windows (x64, and Arm on Windows 11). Mac (soon)." |
| `docs/content/en/help/faq.md:98-100` | "Is there a Mac version?" / "Mac (soon). TalkBar runs on Windows today." |
| `docs/content/en/index.yaml:2` | Home page description |
| `docs/docs.locales.ts:28, 72` | Site descriptions, English and Russian |
| `docs/app.config.ts:11` | Description |
| `docs/composables/useDocsSeo.ts:72` | `operatingSystem: 'Windows, Mac (soon)'` |
| `docs/scripts/generate-discovery.mjs:23-24` | `llms.txt` introduction, both languages |
| `README.md:8, 15, 20, 37, 126` | Tagline, platform badge, download link, description, install section |

### Docs: hardware and install wording

- `introduction.md:48` limits Arm to Windows 11 and names no Mac hardware. Nothing in the
  install pages says Apple silicon only; the only Apple silicon mentions are in
  `ai/speed-up-ai.md`.
- `install-and-update.md:15` names the installers "Windows (Intel or AMD)" and "Windows
  on ARM". These must match the labels on the download page.
- `install-and-update.md:19-23`: the macOS steps give no file type, no
  drag-to-Applications step and no first-open step.
- `install-and-update.md:106-107`: uninstall on macOS is "the usual macOS app removal
  method".
- Microphone permission is covered only as "system privacy settings"
  (`getting-started/first-session.md:13`, `help/troubleshooting.md:40, 74`). Nothing
  covers macOS permission for system-audio capture or for dictation typing into other
  apps.

### Docs: Mac readers get no default shortcuts

Nine pages have a placeholder macOS panel at lines 11-12: "Use the shortcut TalkBar
shows in the app or in Settings." The Windows panel says the shortcuts below are the
defaults, and the tables below list only `Ctrl+…` keys.

- `getting-started/getting-around.md` (also lines 115, 147-151, 163-168)
- `help/troubleshooting.md` (also line 41)
- `knowledge/documents.md` (also line 68)
- `sessions/recording.md` (also line 157)
- `sessions/starting-a-session.md` (also line 125)
- `settings/general.md` (also lines 60, 189)
- `settings/voice.md` (also lines 31, 103-104, 115)
- `voice/dictation.md` (also lines 20, 26, 29, 50, 71-73)
- `voice/recording-and-transcription.md` (also line 46)

Also confirm that "Hide to Tray" is the label on macOS
(`getting-started/getting-around.md:53`, `settings/overview.md:51`,
`settings/general.md:186`).

### Docs: features with no page

- No page or section describes a custom AI writing style. The closest documented
  settings are **Custom AI Instructions** (up to 300 characters, added to every AI
  request; `settings/ai-providers.md`, `ai/how-talkbar-uses-ai.md:93`) and the template
  setting of the same name (up to 1,000 characters).
- `ai/local-models.md` and `settings/private-local-ai.md` describe Built-in AI in one
  way for all systems (**Auto (GPU when available)** or **CPU only**). Nothing describes
  Windows Arm64 or Apple silicon differences.

## Not reviewed: the app code

The request was to review all app changes since 0.3.1, with these points in focus. None
of them could be checked from this repository:

1. Built-in AI on each of the three platforms (Windows x64, Windows Arm64, Apple
   silicon), which each run the built-in models in a different way: model loading,
   acceleration and fallback to CPU, memory limits, time limits and the local request
   queue, cancellation, and behavior when a model is missing or a download fails.
2. External AI providers (cloud providers with an API key, Ollama) and CLI tools:
   request building, errors, time limits, and Private AI Mode blocking every non-local
   path.
3. Custom AI writing style: that it is applied on all three paths (built-in AI, external
   AI, CLI tools) and for every AI feature, how it combines with Custom AI Instructions,
   Response Language and per-template instructions, and what happens with an empty or
   over-long style.
4. Regressions against 0.3.1 to 0.3.3 in any of the above.

To run that review, the app repository has to be available to the reviewer with every
commit since 0.3.1 pushed.

## Not verified

- What `https://updater.talkbar.app/get/windows/arm` serves (a native Arm64 build or the
  x64 installer) and whether a Mac download path exists. The review environment could
  not reach that host.
- Whether `download.talkbar.ru` and a `download.talkbar.app` equivalent resolve, and in
  which language. Same reason.
- Whether D3 (the inline CSS limit) predates `v0.3.1`.

## How to re-run the checks

From the repository root, after `npm run setup`:

```bash
npm run check                         # docs content check; website tests, lint and type check
npm --prefix website run build        # English production site
npm --prefix website run build:ru     # Russian production site
npm --prefix website run build:preview
npm --prefix website run build:preview:ru
npm run build:docs                    # English docs
npm run build:docs:ru                 # Russian docs
npm --prefix docs run check:seo -- en # after the English docs build
npm --prefix docs run check:seo -- ru # after the Russian docs build
```

Expected today on this branch: the website tests, type check and all four website builds
pass; `npm run check` stops at the lint errors in W3; both docs builds pass; `check:seo`
fails on D3 for both languages.

## Suggested order

1. Get the W1 fix onto `main` so website deploys work again.
2. Run the app-code review.
3. Decide the per-language download URL (D1), then make `check:seo` pass (D3).
4. Update the platform copy in the website, docs and README in one pass, together with
   the download flow for Mac and Windows Arm64 and the tests that pin the old wording.
5. Fix W2 (dialog focus) and W3 (lint).
6. Take the P3 items as time allows.
