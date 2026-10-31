import { useRuntimeConfig } from '#imports'

/** Interface strings and site facts for the language this site was built for. */
export const useDocsStrings = () => {
  const config = useRuntimeConfig().public as Record<string, unknown>
  const strings = (config.docsStrings || {}) as Record<string, string>
  return {
    locale: (config.docsLocale as string) || 'en',
    siteName: (config.docsSiteName as string) || 'TalkBar Documentation',
    description: (config.docsDescription as string) || '',
    siteUrl: (config.docsSiteUrl as string) || 'https://doc.talkbar.app',
    websiteUrl: (config.docsWebsiteUrl as string) || 'https://www.talkbar.app',
    repoUrl: (config.docsRepoUrl as string) || 'https://github.com/TalkBarApp/talkbar',
    t: (key: string) => strings[key] ?? key,
  }
}

/** True for pages of the MCP & CLI area, which has its own home and navigation. */
export const isMcpPath = (path: string) => path === '/mcp' || path.startsWith('/mcp/')
