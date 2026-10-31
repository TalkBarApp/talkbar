# Agent Instructions

## Project Identity

This repository is the TalkBar website. Treat the active public site as an English-only TalkBar homepage draft for `www.talkbar.app` and `preview.talkbar.app`.

## Branding Rules

- Use `TalkBar` as the product name in visible homepage, layout, metadata, README, and root project guidance.
- Use `#054df6` as the default blue theme color.
- Keep the blue theme as the default; the warm (orange) palette is the alternate theme behind the color toggle.
- Use approved logo assets from `design/`.
- Header logo supports warm/blue and light/dark variants.
- Footer is always dark and uses only dark logo assets.

## Content Scope

- Keep public homepage content in English until final English copy is approved.
- Do not re-enable visible language switchers for the homepage draft.
- Do not promote old deep use-case pages from the homepage navbar or footer.
- Root documentation should describe TalkBar. Legacy product research may remain in old deep docs only when it is not exposed by the current homepage or build configuration.

## Implementation Notes

- Prefer changing translation data and section arrays before large component rewrites.
- Keep download buttons wired through `data-download-link` and `src/lib/download.ts`.
- Preserve the Windows icon and hover zoom treatment on download buttons unless explicitly changed.
- Product screenshots come from the registry in `src/lib/screenshots.ts`, rendered with `src/components/ui/Screenshot.astro` (sections) or `ScreenshotStrip.astro` (slideshow). Every screenshot opens full-screen through `react-medium-image-zoom`.
- Stand-in screenshots live in `src/assets/screenshots/temporary/` and are marked `temp: true`, which shows a `Temp · <id>` label on the page. To replace one, point its import at the final file and set `temp: false`.
- Keep graph/dashboard screenshots where possible until replacement assets are approved.

## Verification

Before handing off branding or homepage changes, run:

```bash
npm test
npm run check
npm run build
```

For visual changes, inspect the homepage in light/dark and warm/blue themes at desktop and mobile widths.
