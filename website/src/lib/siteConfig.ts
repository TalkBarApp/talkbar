// Centralised, env-driven config for the preview-launch modals.
//
// All values are injected at build time via `define` in astro.config.mjs
// (reading from process.env), so they are available in both server-rendered
// Astro frontmatter and client React islands.
//
// Note: Astro populates server-side `import.meta.env` from the real environment
// as STRINGS, which can shadow our boolean `define` when a variable is set. So
// booleans are parsed here with `isOn`, which accepts both the boolean default
// (when unset) and the string value ("1"/"true") that Astro injects when set.
//
// Configure via environment variables (e.g. in a .env file or CI):
//   PREVIEW_MODAL_ON_DOWNLOAD  1|true / 0|false — download buttons open the
//                                                 early-access modal instead of
//                                                 downloading. Default: on.
//   EARLY_ACCESS_SUBSCRIBE_URL <url>            — POST endpoint for the email signup.
//   CONTACT_FORM_URL           <url>            — POST endpoint for the contact form.
//   PRODUCT_UPDATES_SUBSCRIBE_URL <url>         — POST endpoint for later standalone
//                                                 product-update signups.
//   CONTACT_EMAIL              <email>          — address used for mailto fallbacks.
import { resolveSubmissionEndpoints } from "./submissionEndpoints.js";

// True for boolean `true` (define default) or the strings "1"/"true" that Astro
// injects when the env var is explicitly set. Everything else (incl. "0"/"false") is off.
const isOn = (value: unknown) => value === true || value === "1" || value === "true";
const isDev = (value: unknown) => value === true || value === "true";

const submissionEndpoints = resolveSubmissionEndpoints({
  buildDomain: import.meta.env.BUILD_DOMAIN,
  isDev: isDev(import.meta.env.DEV),
  earlyAccessSubscribeUrl: import.meta.env.EARLY_ACCESS_SUBSCRIBE_URL || "",
  contactFormUrl: import.meta.env.CONTACT_FORM_URL || "",
  productUpdatesSubscribeUrl: import.meta.env.PRODUCT_UPDATES_SUBSCRIBE_URL || "",
});

export const SITE_CONFIG = {
  previewModalOnDownload: isOn(import.meta.env.PREVIEW_MODAL_ON_DOWNLOAD),
  earlyAccessSubscribeUrl: submissionEndpoints.earlyAccessSubscribeUrl,
  contactFormUrl: submissionEndpoints.contactFormUrl,
  productUpdatesSubscribeUrl: submissionEndpoints.productUpdatesSubscribeUrl,
  contactEmail: import.meta.env.CONTACT_EMAIL || "contact@talkbar.app",
};

export type SiteConfig = typeof SITE_CONFIG;
