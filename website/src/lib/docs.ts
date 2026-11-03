import type { Language } from "../i18n/types";

// Documentation site for each language. Preview builds link here too, because
// only these sites are published for readers.
const DOCS_URLS: Record<Language, string> = {
  en: "https://docs.talkbar.app",
  es: "https://docs.talkbar.app",
  ru: "https://docs.talkbar.ru",
  uk: "https://docs.talkbar.app",
};

export function docsUrl(lang: Language, path = ""): string {
  return `${DOCS_URLS[lang] ?? DOCS_URLS.en}${path}`;
}
