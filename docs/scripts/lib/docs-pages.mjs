import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import matter from 'gray-matter'
import { parse } from 'yaml'

// Last commit date of each content file, read once from git. Empty when git or
// its history is unavailable; pages then fall back to an `updated` front matter value.
// Uncommitted edits keep the date of the last commit until they are committed.
let commitDates
function lastCommitDates() {
  if (commitDates) return commitDates
  commitDates = new Map()
  try {
    const log = execFileSync('git', ['log', '--format=%x00%cI', '--name-only', '--', 'content'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim()
    let date = ''
    for (const line of log.split('\n')) {
      if (line.startsWith('\0')) date = line.slice(1)
      else if (line && date) {
        const file = resolve(root, line)
        if (!commitDates.has(file)) commitDates.set(file, date)
      }
    }
  } catch {}
  return commitDates
}

const isoDate = value => {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

// Shared by discovery generation, prerendering and build verification.
export function readDocsPages(locale) {
  const base = resolve('content', locale)
  const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)])
  return walk(base).sort().flatMap(file => {
    const name = relative(base, file).replaceAll('\\', '/')
    if (name.split('/').some(part => /^[_.-]/.test(part))) return []
    if (!name.endsWith('.md') && !/(^|\/)index\.ya?ml$/.test(name)) return []
    const raw = readFileSync(file, 'utf8')
    const { data, content } = name.endsWith('.md') ? matter(raw) : { data: parse(raw), content: '' }
    if (data.draft || data.partial || data._draft || data._partial || data.robots === false || data.sitemap === false) return []
    const path = '/' + name.replace(/\.(md|ya?ml)$/, '').replace(/(^|\/)index$/, '').replace(/\/$/, '')
    const lastModified = isoDate(lastCommitDates().get(file)) || isoDate(data.updated)
    return [{ path, data, content, lastModified }]
  })
}

/** Markdown copy of a page: /mcp/setup -> /mcp/setup.md, / -> /index.md */
export const markdownPath = path => `${path === '/' ? '/index' : path}.md`
