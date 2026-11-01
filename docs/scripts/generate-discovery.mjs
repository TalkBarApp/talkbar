import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { readDocsPages, markdownPath } from './lib/docs-pages.mjs'

const locale = process.env.DOCS_LOCALE === 'ru' ? 'ru' : 'en'
const origin = locale === 'ru' ? 'https://docs.talkbar.ru' : 'https://docs.talkbar.app'
const pages = readDocsPages(locale)
// Everything this script writes lives in .discovery/, which Nitro serves from the
// site root. It is replaced on every run, so switching languages leaves nothing stale.
const output = resolve('.discovery')
rmSync(output, { recursive: true, force: true })
mkdirSync(output, { recursive: true })
const mcpOrder = ['/mcp/overview', '/mcp/setup', '/mcp/access-and-permissions', '/mcp/tools', '/mcp/cli', '/mcp/operations', '/mcp/examples', '/mcp/errors-and-limits']
const mcpPages = pages.filter(page => page.path.startsWith('/mcp/')).sort((a, b) => {
  const rank = path => mcpOrder.includes(path) ? mcpOrder.indexOf(path) : mcpOrder.length
  return rank(a.path) - rank(b.path) || a.path.localeCompare(b.path)
})
const exportsByPath = new Map()
const index = [
  '# TalkBar Documentation',
  '',
  locale === 'ru'
    ? '> Документация TalkBar: приватный ИИ-помощник для заметок в Windows и macOS, локальная транскрибация, встречи, MCP и CLI.'
    : '> Official documentation for TalkBar, the private AI note taker for Windows and macOS: local transcription, meetings, voice notes, MCP and CLI.',
  '',
  `Language: ${locale}. Each entry links to the canonical page and its Markdown version.`,
  '',
  `- [Complete documentation](${origin}/llms-full.txt): Every page in one text file.`,
  '',
  '## MCP and CLI: start here',
  '',
  `- [MCP learning index](${origin}/mcp/llms.txt): Read the setup, permissions, tools, CLI, operation reference and examples in order.`,
  `- [Complete MCP and CLI reference](${origin}/mcp/llms-full.txt): All MCP documentation in one text file, including operation arguments and code examples.`,
  '',
  '## Documentation',
  '',
]
// YAML landing pages: retain their visible text and navigation links.
const isStringList = value => Array.isArray(value) && value.every(item => typeof item === 'string')
function landingText(value) {
  if (!value || typeof value !== 'object') return ''
  if (Array.isArray(value)) return value.map(landingText).filter(Boolean).join('\n\n')
  return [
    value.title ? `## ${value.title}` : '',
    value.description || '',
    value.introductionTitle || '',
    value.introductionSubtitle || '',
    value.to ? `[${value.label || value.cta || value.title || value.to}](${new URL(value.to, origin)})` : '',
    // A features list of plain strings is a bullet list; any other features value
    // (such as the MCP home's "Explore" section) is a section like the rest.
    ...(isStringList(value.features) ? value.features.map(text => `- ${text}`) : []),
    ...Object.entries(value).filter(([key, child]) => key !== 'navigation' && !(key === 'features' && isStringList(child)) && child && typeof child === 'object').map(([, child]) => landingText(child)),
  ].filter(Boolean).join('\n\n')
}
for (const { path, data, content } of pages) {
  const markdown = markdownPath(path)
  const target = resolve(output, markdown.slice(1))
  mkdirSync(dirname(target), { recursive: true })
  // MDC layout directives are not prose; preserve fenced code verbatim.
  let inCode = false
  let fence = ''
  const body = content.split('\n').map(line => {
    const match = /^\s*(`{3,}|~{3,})/.exec(line)
    if (match) {
      if (!inCode) { inCode = true; fence = match[1] }
      else if (match[1][0] === fence[0] && match[1].length >= fence.length) inCode = false
      return line
    }
    if (inCode) return line
    if (/^\s*#windows\s*$/.test(line)) return '### Windows\n'
    if (/^\s*#macos\s*$/.test(line)) return '### macOS\n'
    if (!/^\s*::/.test(line)) return line
    // Field names/types and tab labels carry API semantics, not just layout.
    const attr = key => new RegExp(`${key}="([^"]*)"`).exec(line)?.[1]
    if (/^\s*::field\{/.test(line)) {
      return `**${attr('name') || ''}** (${attr('type') || 'value'}${/\brequired(?:[ }]|$)/.test(line) ? ', required' : ''})\n`
    }
    if (attr('label')) return `### ${attr('label')}\n`
    if (attr('title')) return `### ${attr('to') ? `[${attr('title')}](${new URL(attr('to'), origin)})` : attr('title')}\n`
    return ''
  }).join('\n')
  const text = `# ${data.title}\n\n${data.description}\n\nCanonical URL: ${origin}${path}\n\n${body || landingText({ ...data, title: undefined, description: undefined, ...(data.hero?.title === data.title ? { hero: { ...data.hero, title: undefined } } : {}) })}\n`
  writeFileSync(target, text)
  exportsByPath.set(path, text)
  index.push(`- [${data.title}](${origin}${path}): ${data.description} [Markdown](${origin}${markdown})`)
}
writeFileSync(resolve(output, 'llms.txt'), index.join('\n') + '\n')
const fullHeader = [
  '# TalkBar Documentation (complete)', '',
  index[2], '',
  `Language: ${locale}. Every documentation page in one file, separated by ---. Page index: ${origin}/llms.txt`, '',
].join('\n')
writeFileSync(resolve(output, 'llms-full.txt'), fullHeader + '\n---\n\n' + pages.map(({ path }) => exportsByPath.get(path)).join('\n---\n\n'))
console.log(`Generated llms.txt, llms-full.txt and ${pages.length} Markdown pages (${locale}).`)

const mcpIndex = [
  '# TalkBar MCP & CLI documentation', '',
  '> Official learning reference for AI assistants using TalkBar through its local MCP server or talkbar-cli.', '',
  `Language: ${locale}. Read setup and permissions before calling tools. For current operation schemas, use the discovery commands documented in the tools and CLI guides.`, '',
  `- [Full reference in one request](${origin}/mcp/llms-full.txt)`, '',
  '## Recommended reading order', '',
  ...mcpPages.map(({ path, data }) => `- [${data.title}](${origin}${markdownPath(path)}): ${data.description} [Web page](${origin}${path})`),
].join('\n') + '\n'
mkdirSync(resolve(output, 'mcp'), { recursive: true })
writeFileSync(resolve(output, 'mcp/llms.txt'), mcpIndex)
writeFileSync(resolve(output, 'mcp/llms-full.txt'), mcpIndex + '\n---\n\n' + mcpPages.map(({ path }) => exportsByPath.get(path)).join('\n---\n\n'))
