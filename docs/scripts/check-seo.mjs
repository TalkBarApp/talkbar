#!/usr/bin/env node
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { readDocsPages, markdownPath } from './lib/docs-pages.mjs'

const locale = process.argv[2] || 'en'
assert(['en', 'ru'].includes(locale), 'Usage: npm run check:seo -- en|ru [--preview]')
const preview = process.argv.includes('--preview')
const origin = locale === 'ru' ? 'https://docs.talkbar.ru' : 'https://docs.talkbar.app'
const read = path => readFileSync(`dist/${path}`, 'utf8')
const pages = readDocsPages(locale)
const otherPaths = new Set(readDocsPages(locale === 'en' ? 'ru' : 'en').map(page => page.path))
const decode = text => text?.replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&')
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'g'))].map(([raw]) =>
  Object.fromEntries([...raw.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])))
const sitemap = read('sitemap.xml')
const llms = read('llms.txt')
const llmsFull = read('llms-full.txt')
const titles = new Set()
const descriptions = new Set()
for (const { path, data } of pages) {
  const html = read(path === '/' ? 'index.html' : `${path.slice(1)}.html`)
  const meta = tags(html, 'meta')
  const links = tags(html, 'link')
  const icons = links.filter(link => /(^|\s)(icon|apple-touch-icon|mask-icon)$/.test(link.rel)).map(link => `${link.rel} ${link.href} ${link.media || ''}`)
  assert.equal(new Set(icons).size, icons.length, `${path}: duplicate icon links`)
  assert.equal(icons.filter(icon => icon.startsWith('apple-touch-icon')).length, 1, `${path}: one apple-touch-icon`)
  assert(!icons.some(icon => icon.startsWith('icon /favicon.svg ') && !icon.includes('prefers-color-scheme')), `${path}: SVG favicons follow the color scheme`)
  const canonical = links.filter(link => link.rel === 'canonical')
  assert.equal(canonical.length, 1, `${path}: one canonical`)
  assert.equal(canonical[0].href, `${origin}${path}`, `${path}: canonical URL`)
  assert.equal(meta.find(tag => tag.property === 'og:url')?.content, `${origin}${path}`, `${path}: OG URL`)
  assert.equal(decode(meta.find(tag => tag.name === 'description')?.content), data.description, `${path}: description`)
  assert(meta.find(tag => tag.property === 'og:image')?.content.startsWith(origin), `${path}: branded image`)
  assert.equal(meta.find(tag => tag.name === 'twitter:card')?.content, 'summary_large_image', `${path}: large image card`)
  assert.equal(meta.find(tag => tag.property === 'og:image:width')?.content, '1200', `${path}: 1200px social image`)
  const landing = path === '/' || path === '/mcp'
  assert.equal(meta.find(tag => tag.property === 'og:type')?.content, landing ? 'website' : 'article', `${path}: og:type`)
  assert(data.description.length <= 160, `${path}: description is ${data.description.length} characters (max 160)`)
  const inlineCss = [...html.matchAll(/<style\b[^>]*>(.*?)<\/style>/gs)].reduce((size, [, css]) => size + css.length, 0)
  assert(inlineCss < 50_000, `${path}: ${inlineCss} bytes of inline CSS (max 50 KB)`)
  if (!preview) assert(!html.includes('data-screenshot-placeholder'), `${path}: no screenshot placeholders in production`)
  const robots = meta.find(tag => tag.name === 'robots')?.content || ''
  assert(preview ? robots.includes('noindex') : !robots.includes('noindex'), `${path}: indexing policy`)
  assert.equal(tags(html, 'html')[0]?.lang, locale, `${path}: language`)
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: one visible H1`)
  const title = /<title>(.*?)<\/title>/.exec(html)?.[1]
  assert(title && !titles.has(title), `${path}: unique title`)
  titles.add(title)
  assert(data.description && !descriptions.has(data.description), `${path}: unique description`)
  descriptions.add(data.description)
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(([, text]) => {
    const schema = JSON.parse(text)
    return schema['@graph'] || [schema]
  })
  assert(schemas.some(node => node.url === `${origin}${path}` && node.inLanguage === locale), `${path}: page schema`)
  assert(schemas.some(node => node['@type'] === 'SoftwareApplication') && schemas.some(node => node['@type'] === 'Organization'), `${path}: app and publisher schema`)
  if (!landing) assert(schemas.some(node => node['@type'] === 'TechArticle' && node.dateModified), `${path}: article schema with dateModified`)
  if (path === '/help/faq') {
    const faq = schemas.find(node => [].concat(node['@type']).includes('FAQPage'))
    assert(faq?.mainEntity?.length >= 5 && faq.mainEntity.every(q => q.name && q.acceptedAnswer?.text), `${path}: FAQ schema`)
  }
  if (otherPaths.has(path)) {
    for (const [lang, host] of [['en', 'https://docs.talkbar.app'], ['ru', 'https://docs.talkbar.ru']]) {
      assert(links.some(link => link.hreflang === lang && link.href === `${host}${path}`), `${path}: ${lang} alternate`)
    }
    assert(links.some(link => link.hreflang === 'x-default' && link.href === `https://docs.talkbar.app${path}`), `${path}: x-default alternate`)
  }
  const entry = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].find(([, text]) => text.includes(`<loc>${origin}${path}</loc>`))?.[1]
  assert(entry, `${path}: sitemap entry`)
  assert(/<lastmod>[^<]+<\/lastmod>/.test(entry), `${path}: sitemap lastmod`)
  if (otherPaths.has(path)) assert(entry.includes('hreflang="en"') && entry.includes('hreflang="ru"'), `${path}: sitemap alternates`)
  assert(llms.includes(`](${origin}${path})`), `${path}: llms index`)
  assert(llmsFull.includes(`Canonical URL: ${origin}${path}\n`), `${path}: llms-full.txt`)
  assert(read(markdownPath(path).slice(1)).includes(`Canonical URL: ${origin}${path}`), `${path}: Markdown export`)
  assert(links.some(link => link.type === 'text/markdown' && link.href === markdownPath(path)), `${path}: Markdown discovery`)
}
assert(read('404.html').includes('noindex'), '404 must not be indexed')
const robotsTxt = read('robots.txt')
assert(robotsTxt.includes(preview ? 'Disallow: /' : `Sitemap: ${origin}/sitemap.xml`), 'robots policy')
if (!preview) {
  for (const bot of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Google-Extended']) {
    assert(new RegExp(`^User-agent: ${bot}$`, 'm').test(robotsTxt), `robots.txt names ${bot}`)
  }
  assert(/^Content-Signal: search=yes, ai-input=yes, ai-train=yes$/m.test(robotsTxt), 'robots.txt Content-Signal')
  assert(!/^Disallow: \/$/m.test(robotsTxt), 'production robots.txt must not block the site')
}
const headers = read('_headers')
assert(/^\/\*\.md\n\s+X-Robots-Tag: noindex$/m.test(headers), 'Markdown copies have a noindex header')
const headerRules = headers.split('\n').filter(line => line.startsWith('/')).length
assert(headerRules <= 100, `_headers has ${headerRules} rules; Cloudflare Pages allows 100`)
assert(!sitemap.includes('<image:image>'), 'Sitemap lists no theme images')
// Nothing from the zkSync template layer may ship.
for (const file of ['social-card.png', 'logos', 'katex.min.css', 'algolia-search.css', 'safari-pinned-tab.svg', 'favicon-16x16.png', 'favicon-32x32.png', 'fonts']) {
  assert(!existsSync(`dist/${file}`), `template leftover dist/${file}`)
}
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)])
for (const file of walk('dist').filter(file => /\.(html|css|txt|md|xml|json)$/.test(file))) {
  const text = readFileSync(file, 'utf8')
  assert(!/zksync|matterlabs|katex/i.test(text), `${file}: template branding or KaTeX`)
  // Website and license portal links stay on this language's domain (docs.* hreflang links may cross)
  for (const [, host] of text.matchAll(/https:\/\/((?:[\w-]+\.)*talkbar\.(?:app|ru))/g)) {
    if (host.startsWith('docs.')) continue
    assert(host.endsWith(locale === 'ru' ? '.ru' : '.app'), `${file}: links to ${host} from the ${locale} site`)
    if (!preview) assert(!/(^|\.)preview\./.test(host), `${file}: links to the preview site ${host}`)
  }
}
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url)
assert.equal(locations.length, pages.length, 'Sitemap contains only documentation pages')
assert.equal(new Set(locations).size, pages.length, 'No duplicate sitemap entries')
console.log(`SEO checks passed for ${pages.length} ${locale} pages (${preview ? 'preview' : 'production'}).`)

// Landing pages keep their visible sections in the Markdown copy.
const mcpLanding = read(markdownPath('/mcp').slice(1))
for (const guide of ['overview', 'setup', 'access-and-permissions', 'tools', 'operations', 'cli', 'errors-and-limits', 'examples']) {
  assert(mcpLanding.includes(`](${origin}/mcp/${guide})`), `/mcp Markdown copy links to /mcp/${guide}`)
}
const mcpIndex = read('mcp/llms.txt')
const mcpFull = read('mcp/llms-full.txt')
for (const { path, content } of pages.filter(page => page.path.startsWith('/mcp/'))) {
  assert(mcpIndex.includes(`${origin}${markdownPath(path)}`), `${path}: MCP learning index`)
  assert(mcpFull.includes(`Canonical URL: ${origin}${path}`), `${path}: full MCP reference`)
  const markdown = read(markdownPath(path).slice(1))
  for (const [, name] of content.matchAll(/::field\{name="([^"]+)"/g)) {
    assert(markdown.includes(`**${name}**`), `${path}: preserve field ${name}`)
  }
  for (const [, code] of content.matchAll(/^[ \t]*```[^\n]*\n(.*?)^[ \t]*```/gms)) {
    assert(markdown.includes(code), `${path}: preserve code examples`)
  }
}
console.log('MCP learning index, complete reference, field names and code examples verified.')
