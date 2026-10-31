// One codebase, one site per language. DOCS_LOCALE picks the content folder
// (content/<locale>), the site URL and the interface strings at build time.

export type DocsLocale = 'en' | 'ru'

export interface DocsLocaleConfig {
  code: DocsLocale
  label: string
  siteUrl: string
  websiteUrl: string
  siteName: string
  description: string
  strings: Record<string, string>
}

export const docsLocales: Record<DocsLocale, DocsLocaleConfig> = {
  en: {
    code: 'en',
    label: 'English',
    siteUrl: 'https://doc.talkbar.app',
    websiteUrl: 'https://www.talkbar.app',
    siteName: 'TalkBar Documentation',
    description:
      'Documentation for TalkBar, the private AI note taker for Windows: capture meetings and calls, dictate voice notes, and keep every conversation as searchable local memory.',
    strings: {
      docsTitle: 'TalkBar Docs',
      mcpTitle: 'TalkBar MCP',
      searchPlaceholder: 'Search documentation...',
      searchButton: 'Search...',
      onThisPage: 'On this page',
      helpToImprove: 'Help to improve',
      editPage: 'Edit this page',
      reportIssue: 'Report an issue',
      footerTagline: 'is a private AI note taker for meetings, calls and voice notes.',
      loadingNavigation: 'Loading navigation...',
      noNavigation: 'No navigation items.',
      pageNotFound: 'Page not found',
      backToTop: 'Back to top',
      sidebarTitle: 'Documentation topics',
      collapseSidebar: 'Hide sidebar',
      expandSidebar: 'Show sidebar',
      screenshotPending: 'Screenshot coming soon',
      download: 'Download',
      switchToWarm: 'Switch to orange color theme',
      switchToBlue: 'Switch to blue color theme',
    },
  },
  ru: {
    code: 'ru',
    label: 'Русский',
    siteUrl: 'https://doc.talkbar.ru',
    websiteUrl: 'https://www.talkbar.ru',
    siteName: 'Документация TalkBar',
    description:
      'Документация TalkBar — приватного ИИ-помощника для заметок в Windows: записывайте встречи и звонки, диктуйте голосовые заметки и храните каждый разговор как локальную память с поиском.',
    strings: {
      docsTitle: 'TalkBar Docs',
      mcpTitle: 'TalkBar MCP',
      searchPlaceholder: 'Поиск по документации…',
      searchButton: 'Поиск…',
      onThisPage: 'На этой странице',
      helpToImprove: 'Помогите улучшить',
      editPage: 'Изменить страницу',
      reportIssue: 'Сообщить о проблеме',
      footerTagline: '— приватный ИИ-помощник для заметок на встречах, звонках и в голосовых заметках.',
      loadingNavigation: 'Загрузка навигации…',
      noNavigation: 'Нет разделов.',
      pageNotFound: 'Страница не найдена',
      backToTop: 'Наверх',
      sidebarTitle: 'Разделы документации',
      collapseSidebar: 'Скрыть меню',
      expandSidebar: 'Показать меню',
      screenshotPending: 'Снимок экрана появится позже',
      download: 'Скачать',
      switchToWarm: 'Включить оранжевую гамму',
      switchToBlue: 'Включить синюю цветовую тему',
    },
  },
}

export const resolveDocsLocale = (value: string | undefined): DocsLocale =>
  value === 'ru' ? 'ru' : 'en'
