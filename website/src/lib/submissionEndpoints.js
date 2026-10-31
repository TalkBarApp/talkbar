export const LICENSE_SERVER_ORIGINS = {
  prod: "https://license.talkbar.app",
  preview: "https://license.preview.talkbar.app",
  "preview-ru": "https://license.preview.talkbar.ru",
  "prod-ru": "https://license.talkbar.ru",
};

const EMPTY_ENDPOINTS = {
  earlyAccessSubscribeUrl: "",
  contactFormUrl: "",
  productUpdatesSubscribeUrl: "",
};

const SUBMISSION_PATHS = {
  earlyAccessSubscribeUrl: "/api/early-access",
  contactFormUrl: "/api/contact",
  productUpdatesSubscribeUrl: "/api/subscriptions/product-updates",
};

const ENDPOINT_ENV_NAMES = {
  earlyAccessSubscribeUrl: "EARLY_ACCESS_SUBSCRIBE_URL",
  contactFormUrl: "CONTACT_FORM_URL",
  productUpdatesSubscribeUrl: "PRODUCT_UPDATES_SUBSCRIBE_URL",
};

export function normalizeBuildDomain(buildDomain) {
  return buildDomain === "preview" || buildDomain === "preview-ru" || buildDomain === "prod-ru"
    ? buildDomain
    : "prod";
}

export function getDefaultSubmissionEndpoints({ buildDomain = "prod", isDev = false } = {}) {
  if (isDev) return { ...EMPTY_ENDPOINTS };

  const origin = LICENSE_SERVER_ORIGINS[normalizeBuildDomain(buildDomain)];
  return Object.fromEntries(
    Object.entries(SUBMISSION_PATHS).map(([key, path]) => [key, `${origin}${path}`]),
  );
}

export function resolveSubmissionEndpoints({
  buildDomain = "prod",
  isDev = false,
  earlyAccessSubscribeUrl = "",
  contactFormUrl = "",
  productUpdatesSubscribeUrl = "",
} = {}) {
  const normalizedBuildDomain = normalizeBuildDomain(buildDomain);
  const defaults = getDefaultSubmissionEndpoints({
    buildDomain: normalizedBuildDomain,
    isDev,
  });
  const endpoints = {
    earlyAccessSubscribeUrl: cleanUrl(earlyAccessSubscribeUrl) || defaults.earlyAccessSubscribeUrl,
    contactFormUrl: cleanUrl(contactFormUrl) || defaults.contactFormUrl,
    productUpdatesSubscribeUrl:
      cleanUrl(productUpdatesSubscribeUrl) || defaults.productUpdatesSubscribeUrl,
  };

  Object.entries(endpoints).forEach(([key, value]) => {
    assertEndpointDomain({
      buildDomain: normalizedBuildDomain,
      envName: ENDPOINT_ENV_NAMES[key],
      url: value,
    });
  });

  return endpoints;
}

function cleanUrl(value) {
  return typeof value === "string" ? value.trim() : "";
}

function assertEndpointDomain({ buildDomain, envName, url }) {
  if (!url) return;

  let host;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    throw new Error(`${envName} must be an absolute URL, got "${url}"`);
  }

  const family = hostFamily(host);
  if (!family) return;

  const expectedFamily = buildDomain.endsWith("-ru") ? "ru" : "app";
  if (family !== expectedFamily) {
    throw new Error(
      `${envName} for ${buildDomain} builds must use talkbar.${expectedFamily} license server endpoints, got ${url}`,
    );
  }
}

function hostFamily(host) {
  if (/(^|\.)talkbar\.ru$/i.test(host)) return "ru";
  if (/(^|\.)talkbar\.app$/i.test(host)) return "app";
  return null;
}
