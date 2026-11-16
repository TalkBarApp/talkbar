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

// Live license portal for each language. Preview builds link here too,
// because the preview portals are not for customers.
export const LICENSE_PORTAL_URLS: Record<Language, string> = {
  en: 'https://license.talkbar.app',
  es: 'https://license.talkbar.app',
  ru: 'https://license.talkbar.ru',
  uk: 'https://license.talkbar.app',
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

// The English and Russian sites of the current stage. Both builds render the same
// pages at the same paths, so a page's counterpart is its path on the other site.
// Preview builds point at the previews, which stay noindex.
export const LANGUAGE_SITES = IS_PREVIEW_BUILD
  ? { en: 'https://preview.talkbar.app', ru: 'https://preview.talkbar.ru' }
  : { en: 'https://www.talkbar.app', ru: 'https://www.talkbar.ru' };

export interface HreflangLink {
  hreflang: string;
  href: string;
}

// hreflang alternates for a page. A page with a counterpart lists en, ru and
// x-default (English); a page without one lists only itself.
export function getHreflangLinks(canonical: string, translated: boolean): HreflangLink[] {
  const locale = CURRENT_CONFIG.defaultLocale;
  if (!translated) {
    const self = [{ hreflang: locale, href: canonical }];
    return locale === 'en' ? [...self, { hreflang: 'x-default', href: canonical }] : self;
  }
  const { pathname } = new URL(canonical);
  const en = new URL(pathname, LANGUAGE_SITES.en).href;
  const ru = new URL(pathname, LANGUAGE_SITES.ru).href;
  return [
    { hreflang: 'en', href: locale === 'en' ? canonical : en },
    { hreflang: 'ru', href: locale === 'ru' ? canonical : ru },
    { hreflang: 'x-default', href: locale === 'en' ? canonical : en },
  ];
}

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
