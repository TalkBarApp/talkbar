// One codebase, one site per language. DOCS_LOCALE picks the content folder
// (content/<locale>), the site URL and the interface strings at build time.

export type DocsLocale = 'en' | 'ru'

export interface DocsLocaleConfig {
  code: DocsLocale
  label: string
  siteUrl: string
  /** www site for this language: production, and the preview used by dev builds */
  websiteUrl: { production: string; preview: string }
  /** License portal for this language (pricing, contact): production, and the preview used by dev builds */
  licenseUrl: { production: string; preview: string }
  siteName: string
  description: string
  strings: Record<string, string>
}

export const docsLocales: Record<DocsLocale, DocsLocaleConfig> = {
  en: {
    code: 'en',
    label: 'English',
    siteUrl: 'https://docs.talkbar.app',
    websiteUrl: { production: 'https://www.talkbar.app', preview: 'https://preview.talkbar.app' },
    licenseUrl: { production: 'https://license.talkbar.app', preview: 'https://license.preview.talkbar.app' },
    siteName: 'TalkBar Documentation',
    description:
      'Documentation for TalkBar, the private AI note taker for Windows and macOS: capture meetings and calls, dictate voice notes, and keep every conversation as searchable local memory.',
    strings: {
      docsTitle: 'TalkBar Docs',
      mcpTitle: 'TalkBar MCP',
      searchPlaceholder: 'Search documentation...',
      searchButton: 'Search...',
      onThisPage: 'On this page',
      helpToImprove: 'Help to improve',
      editPage: 'Edit this page',
      reportIssue: 'Report an issue',
      useWithAi: 'Use with AI',
      viewMarkdown: 'View as Markdown',
      openInChatGpt: 'Open in ChatGPT',
      openInClaude: 'Open in Claude',
      aiPrompt: 'Read this TalkBar documentation page and help me with it: {url}',
      footerTagline: 'Private AI note taker for meetings, calls and voice notes.',
      footerProduct: 'Product',
      footerPrivacy: 'Privacy',
      footerPricing: 'Pricing',
      footerContact: 'Contact us',
      footerNavigation: 'TalkBar website',
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
    siteUrl: 'https://docs.talkbar.ru',
    websiteUrl: { production: 'https://www.talkbar.ru', preview: 'https://preview.talkbar.ru' },
    licenseUrl: { production: 'https://license.talkbar.ru', preview: 'https://license.preview.talkbar.ru' },
    siteName: 'Документация TalkBar',
    description:
      'Документация TalkBar — приватного ИИ-помощника для заметок для Windows и macOS: записывайте встречи и звонки, диктуйте голосовые заметки и храните каждый разговор как локальную память с поиском.',
    strings: {
      docsTitle: 'TalkBar Docs',
      mcpTitle: 'TalkBar MCP',
      searchPlaceholder: 'Поиск по документации…',
      searchButton: 'Поиск…',
      onThisPage: 'На этой странице',
      helpToImprove: 'Помогите улучшить',
      editPage: 'Изменить страницу',
      reportIssue: 'Сообщить о проблеме',
      useWithAi: 'Работа с ИИ',
      viewMarkdown: 'Открыть в Markdown',
      openInChatGpt: 'Открыть в ChatGPT',
      openInClaude: 'Открыть в Claude',
      aiPrompt: 'Прочитай эту страницу документации TalkBar и помоги мне с ней: {url}',
      footerTagline: 'Приватный ИИ-помощник для заметок на встречах, звонках и в голосовых заметках.',
      footerProduct: 'Продукт',
      footerPrivacy: 'Приватность',
      footerPricing: 'Тарифы',
      footerContact: 'Связаться с нами',
      footerNavigation: 'Сайт TalkBar',
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
