import type { Language } from './types';

export type BuildDomain = 'prod' | 'preview' | 'preview-ru' | 'prod-ru';

export const BUILD_DOMAIN: BuildDomain = (
  process.env.BUILD_DOMAIN === 'preview'
    ? 'preview'
    : process.env.BUILD_DOMAIN === 'preview-ru'
      ? 'preview-ru'
      : process.env.BUILD_DOMAIN === 'prod-ru'
        ? 'prod-ru'
        : 'prod'
) as BuildDomain;

// Only production builds are meant to be indexed. Every preview build
// (English `preview`, Russian `preview-ru`, and any future non-prod deploy) is
// treated as a preview build and de-indexed.
export const IS_PREVIEW_BUILD = BUILD_DOMAIN === 'preview' || BUILD_DOMAIN === 'preview-ru';

export const LOCALE_DOMAINS: Record<Language, string> = {
  en: BUILD_DOMAIN === 'preview' ? 'https://preview.talkbar.app' : 'https://www.talkbar.app',
  es: 'https://www.talkbar.app',
  ru: BUILD_DOMAIN === 'preview-ru'
    ? 'https://preview.talkbar.ru'
    : BUILD_DOMAIN === 'prod-ru'
      ? 'https://www.talkbar.ru'
      : 'https://www.talkbar.app',
  uk: 'https://www.talkbar.app',
};

// Pricing on the live license portal for each language. Preview builds link here too,
// because the preview portals are not for customers.
export const LICENSE_PRICING_URLS: Record<Language, string> = {
  en: 'https://license.talkbar.app/pricing',
  es: 'https://license.talkbar.app/pricing',
  ru: 'https://license.talkbar.ru/pricing',
  uk: 'https://license.talkbar.app/pricing',
};

export const BUILD_CONFIG: Record<BuildDomain, {
  site: string;
  defaultLocale: Language;
  locales: Language[];
  languages: Language[];
}> = {
  prod: {
    site: 'https://www.talkbar.app',
    defaultLocale: 'en',
    locales: ['en'],
    languages: ['en'],
  },
  preview: {
    site: 'https://preview.talkbar.app',
    defaultLocale: 'en',
    locales: ['en'],
    languages: ['en'],
  },
  'preview-ru': {
    site: 'https://preview.talkbar.ru',
    defaultLocale: 'ru',
    locales: ['ru'],
    languages: ['ru'],
  },
  'prod-ru': {
    site: 'https://www.talkbar.ru',
    defaultLocale: 'ru',
    locales: ['ru'],
    languages: ['ru'],
  },
};

export const CURRENT_CONFIG = BUILD_CONFIG[BUILD_DOMAIN];

// The English site that matches the current build stage: the English preview
// (`preview.talkbar.app`) for any non-production build, and production
// (`www.talkbar.app`) for the live build.
export const ENGLISH_SITE_URL = IS_PREVIEW_BUILD
  ? 'https://preview.talkbar.app'
  : 'https://www.talkbar.app';

// Cross-link out to the English site, shown only on non-English builds (the
// Russian `preview-ru` site). Empty string on English builds — English never
// links back to Russian.
export const ENGLISH_CROSS_LINK = CURRENT_CONFIG.defaultLocale === 'en' ? '' : ENGLISH_SITE_URL;

export function getLocaleUrl(locale: Language): string {
  const domain = LOCALE_DOMAINS[locale];
  // The build's default locale is served at the domain root; any other locale
  // lives under a /{locale}/ prefix.
  return locale === CURRENT_CONFIG.defaultLocale ? `${domain}/` : `${domain}/${locale}/`;
}

export function getLanguageLinks(): Record<Language, string> {
  return {
    en: getLocaleUrl('en'),
    es: getLocaleUrl('es'),
    ru: getLocaleUrl('ru'),
    uk: getLocaleUrl('uk'),
  };
}
