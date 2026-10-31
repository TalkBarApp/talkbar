export type Language = 'en' | 'es' | 'ru' | 'uk';

export const LANGUAGES: Language[] = ['en'];

export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  ru: 'Русский',
  uk: 'Українська',
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  ru: '🇷🇺',
  uk: '🇺🇦',
};

export type AppLanguageOption = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  locale?: Language;
};

export const APP_LANGUAGE_OPTIONS: readonly AppLanguageOption[] = [
  { code: 'en',    name: 'English',               nativeName: 'English',  flag: '🇺🇸', locale: 'en' },
  { code: 'es',    name: 'Spanish',               nativeName: 'Español',  flag: '🇪🇸' },
  { code: 'de',    name: 'German',                nativeName: 'Deutsch',  flag: '🇩🇪' },
  { code: 'fr',    name: 'French',                nativeName: 'Français', flag: '🇫🇷' },
  { code: 'it',    name: 'Italian',               nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ru',    name: 'Russian',               nativeName: 'Русский',  flag: '🇷🇺' },
  { code: 'tr',    name: 'Turkish',               nativeName: 'Türkçe',   flag: '🇹🇷' },
  { code: 'pl',    name: 'Polish',                nativeName: 'Polski',   flag: '🇵🇱' },
  { code: 'uk',    name: 'Ukrainian',             nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'zh-CN', name: 'Simplified Chinese',    nativeName: '简体中文',  flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Traditional Chinese',   nativeName: '繁體中文',  flag: '🇹🇼' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)',   nativeName: 'Português', flag: '🇧🇷' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ja',    name: 'Japanese',              nativeName: '日本語',   flag: '🇯🇵' },
  { code: 'ko',    name: 'Korean',                nativeName: '한국어',   flag: '🇰🇷' },
];

export type Translations = Record<string, string>;
