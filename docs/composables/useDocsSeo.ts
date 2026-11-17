import { computed, useHead, useRoute, useRuntimeConfig, useSeoMeta, useDocsStrings } from '#imports'
import type { Ref } from 'vue'

interface BodyNode { type?: string; tag?: string; value?: string; children?: BodyNode[] }
interface DocsPage { title?: string; description?: string; body?: BodyNode | null }

const nodeText = (node: BodyNode | undefined): string =>
  node?.type === 'text' ? node.value || '' : (node?.children || []).map(nodeText).join('')

/** Questions (### headings) and the content under each, for FAQ structured data. */
const faqEntries = (body: BodyNode | null | undefined) => {
  const entries: { question: string; answer: string[] }[] = []
  for (const node of body?.children || []) {
    if (node.tag === 'h3') entries.push({ question: nodeText(node).trim(), answer: [] })
    else if (node.tag && /^h[1-2]$/.test(node.tag)) entries.push({ question: '', answer: [] })
    else if (node.type === 'element' && entries.length) {
      const text = nodeText(node).replace(/\s+/g, ' ').trim()
      if (text) entries[entries.length - 1].answer.push(text)
    }
  }
  return entries.filter(entry => entry.question && entry.answer.length)
}

/** Page metadata is derived from the same content readers see. */
export const useDocsSeo = (page: Ref<DocsPage | null | undefined>) => {
  const route = useRoute()
  const { locale, siteName, siteUrl } = useDocsStrings()
  const config = useRuntimeConfig().public
  const websiteUrl = (config.docsWebsiteCanonicalUrl as string) || 'https://www.talkbar.app'
  const pageDates = (config.docsPageDates || {}) as Record<string, string>
  const path = computed(() => route.path.replace(/\/+$/, '') || '/')
  const url = computed(() => `${siteUrl}${path.value}`)
  const isLanding = computed(() => path.value === '/' || path.value === '/mcp')
  const alternates = computed(() => (config.docsAlternatePaths as string[]).includes(path.value))
  const title = computed(() => page.value?.title || siteName)
  const markdownUrl = computed(() => `${path.value === '/' ? '/index' : path.value}.md`)
  const dateModified = computed(() => pageDates[path.value])
  const image = `${siteUrl}/og/talkbar-og.png`
  const imageAlt = locale === 'ru'
    ? 'Окно TalkBar с итогами встречи, участниками и хронологией разговора'
    : 'TalkBar window showing a meeting summary, speakers and the conversation timeline'

  useSeoMeta({
    ogType: () => isLanding.value ? 'website' : 'article',
    ogUrl: () => url.value,
    ogLocale: locale === 'ru' ? 'ru_RU' : 'en_US',
    ogLocaleAlternate: () => alternates.value ? (locale === 'ru' ? ['en_US'] : ['ru_RU']) : [],
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    ogImageAlt: imageAlt,
    articleModifiedTime: () => isLanding.value ? undefined : dateModified.value,
    twitterCard: 'summary_large_image',
    twitterTitle: () => title.value,
    twitterDescription: () => page.value?.description,
    twitterImage: image,
    twitterImageAlt: imageAlt,
  })

  const organization = {
    '@type': 'Organization', '@id': `${websiteUrl}/#organization`,
    name: 'TalkBar', url: `${websiteUrl}/`,
    logo: `${siteUrl}/web-app-manifest-512x512.png`,
    sameAs: ['https://github.com/TalkBarApp/talkbar'],
  }
  const application = {
    '@type': 'SoftwareApplication', '@id': `${websiteUrl}/#software`,
    name: 'TalkBar', url: `${websiteUrl}/`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'AI meeting notes',
    operatingSystem: 'Windows, macOS',
    publisher: { '@id': organization['@id'] },
  }

  useHead(() => {
    const faq = path.value === '/help/faq' ? faqEntries(page.value?.body) : []
    const pageNode = {
      '@type': isLanding.value ? 'CollectionPage' : faq.length ? ['WebPage', 'FAQPage'] : 'WebPage',
      '@id': `${url.value}#page`, url: url.value, name: title.value,
      description: page.value?.description,
      inLanguage: locale, isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': application['@id'] },
      ...(dateModified.value ? { dateModified: dateModified.value } : {}),
      ...(path.value !== '/' ? { breadcrumb: { '@id': `${url.value}#breadcrumb` } } : {}),
      ...(isLanding.value ? {} : { mainEntity: { '@id': `${url.value}#article` } }),
      ...(faq.length ? {
        mainEntity: faq.map(({ question, answer }) => ({
          '@type': 'Question', name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer.join('\n\n') },
        })),
      } : {}),
    }
    const article = isLanding.value ? [] : [{
      '@type': 'TechArticle', '@id': `${url.value}#article`,
      headline: title.value, description: page.value?.description,
      url: url.value, inLanguage: locale, image,
      mainEntityOfPage: { '@id': `${url.value}#page` },
      about: { '@id': application['@id'] },
      author: { '@id': organization['@id'] }, publisher: { '@id': organization['@id'] },
      ...(dateModified.value ? { dateModified: dateModified.value } : {}),
    }]
    return {
      link: [
        { rel: 'canonical', href: url.value },
        { rel: 'alternate', type: 'text/plain', href: path.value === '/mcp' || path.value.startsWith('/mcp/') ? '/mcp/llms.txt' : '/llms.txt', title: 'LLM documentation index' },
        ...(alternates.value ? [
          { rel: 'alternate', hreflang: 'en', href: `https://docs.talkbar.app${path.value}` },
          { rel: 'alternate', hreflang: 'ru', href: `https://docs.talkbar.ru${path.value}` },
          { rel: 'alternate', hreflang: 'x-default', href: `https://docs.talkbar.app${path.value}` },
        ] : []),
        { rel: 'alternate', type: 'text/markdown', href: markdownUrl.value, title: title.value },
      ],
      script: [{
        key: 'docs-page-schema',
        type: 'application/ld+json',
        // Escape '<' so authored content cannot terminate a script element.
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite', '@id': `${siteUrl}/#website`,
              url: `${siteUrl}/`, name: siteName, inLanguage: locale,
              publisher: { '@id': organization['@id'] },
            },
            organization,
            application,
            pageNode,
            ...article,
            ...(path.value === '/' ? [] : [{
              '@type': 'BreadcrumbList', '@id': `${url.value}#breadcrumb`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: siteName, item: `${siteUrl}/` },
                ...(path.value.startsWith('/mcp/') ? [{ '@type': 'ListItem', position: 2, name: 'TalkBar MCP & CLI', item: `${siteUrl}/mcp` }] : []),
                { '@type': 'ListItem', position: path.value.startsWith('/mcp/') ? 3 : 2, name: title.value, item: url.value },
              ],
            }]),
          ],
        }).replace(/</g, '\\u003c'),
      }],
    }
  })
}
