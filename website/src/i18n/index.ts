import en from './en';
import es from './es';
import ru from './ru';
import uk from './uk';
import type { Language, Translations } from './types';

const translations: Record<Language, Translations> = { en, es, ru, uk };

export function getTranslations(lang: Language): Translations {
  return translations[lang] ?? translations.en;
}

export function t(lang: Language, key: string): string {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

export function getLangFromUrl(url: URL): Language {
  const segments = url.pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first === 'es' || first === 'ru' || first === 'uk') return first;
  return 'en';
}

export { type Language, type Translations, LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_NAMES, LANGUAGE_FLAGS, APP_LANGUAGE_OPTIONS } from './types';
