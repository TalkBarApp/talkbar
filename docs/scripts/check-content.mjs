#!/usr/bin/env node
// Checks every page of one or more locales: frontmatter, internal links and their
// #anchors, screenshot placeholders, and that each locale has the same pages.
// Usage: node scripts/check-content.mjs [en|ru ...]   (exit code 1 on problems)
import { existsSync, readdirSync, readFileSync } from 'fs'
import { join, relative, resolve } from 'path'
import GithubSlugger from 'github-slugger'
import matter from 'gray-matter'

const root = resolve(process.cwd(), 'content')
const locales = process.argv.slice(2).length ? process.argv.slice(2) : ['en', 'ru'].filter(l => existsSync(join(root, l)))

const walk = dir =>
  readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]
  )

const routeOf = (base, file) =>
  '/' +
  relative(base, file)
    .replace(/\\/g, '/')
    .replace(/\.(md|ya?ml)$/, '')
    .replace(/(^|\/)index$/, '')

// Same ids @nuxtjs/mdc gives headings (github-slugger, then dash clean-up).
const headingIds = body => {
  const slugger = new GithubSlugger()
  const ids = new Set()
  for (const line of body.split('\n')) {
    const match = /^(#{2,6})\s+(.+?)\s*$/.exec(line)
    if (!match) continue
    // Drop link targets and emphasis markers, but keep underscores inside words and code
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/\*+/g, '')
      .replace(/(^|\s)_+([^_]+?)_+(?=\s|$)/g, '$1$2')
      .replace(/`/g, '')
    ids.add(slugger.slug(text).replace(/-+/g, '-').replace(/^-|-$/g, '').replace(/^(\d)/, '_$1'))
  }
  return ids
}

let problems = 0
const report = (file, message) => {
  problems++
  console.log(`  ✖ ${file}: ${message}`)
}

const pagesByLocale = {}

for (const locale of locales) {
  const base = join(root, locale)
  const files = walk(base)
  const pages = new Map()
  for (const file of files) {
    if (file.endsWith('.md')) {
      const { data, content } = matter(readFileSync(file, 'utf8'))
      pages.set(routeOf(base, file), { file, data, content, ids: headingIds(content) })
    } else if (/(^|\/)index\.ya?ml$/.test(file)) {
      pages.set(routeOf(base, file), { file, data: {}, content: '', ids: new Set() })
    }
  }
  pagesByLocale[locale] = pages
  console.log(`\n${locale}: ${pages.size} pages`)

  for (const [route, page] of pages) {
    if (!page.file.endsWith('.md')) continue
    const rel = relative(root, page.file)
    if (!page.data.title) report(rel, 'missing title')
    if (!page.data.description) report(rel, 'missing description')
    if (/^#\s/m.test(page.content)) report(rel, 'has an H1 (the title is rendered from frontmatter)')

    const links = [
      ...page.content.matchAll(/\]\((\/[^)\s]*)\)/g),
      ...page.content.matchAll(/\bto="(\/[^"]*)"/g),
    ].map(m => m[1])
    for (const link of links) {
      const [pathPart, anchor] = link.split('#')
      const target = pathPart.replace(/\/$/, '') || '/'
      if (target.startsWith('/screenshots/')) continue
      const targetPage = target === '' ? pages.get(route) : pages.get(target)
      if (!targetPage) {
        report(rel, `broken link ${link}`)
      } else if (anchor && !targetPage.ids.has(anchor)) {
        report(rel, `unknown anchor ${link}`)
      }
    }
    for (const m of page.content.matchAll(/\]\(#([^)\s]+)\)/g)) {
      if (!page.ids.has(m[1])) report(rel, `unknown anchor #${m[1]}`)
    }
    for (const m of page.content.matchAll(/::screenshot\{([^}]*)\}/g)) {
      if (!/src="\/screenshots\/[^"]+\.(png|jpe?g|webp)"/.test(m[1])) report(rel, `screenshot without a valid src: ${m[0]}`)
      if (!/alt="[^"]+"/.test(m[1])) report(rel, `screenshot without alt: ${m[0]}`)
    }
  }
}

if (locales.length > 1) {
  const [first, ...rest] = locales
  for (const other of rest) {
    for (const route of pagesByLocale[first].keys()) {
      if (!pagesByLocale[other].has(route)) report(other, `missing translation of ${route}`)
    }
    for (const route of pagesByLocale[other].keys()) {
      if (!pagesByLocale[first].has(route)) report(other, `page ${route} does not exist in ${first}`)
    }
  }
}

console.log(problems ? `\n${problems} problem(s) found` : '\nNo problems found')
process.exit(problems ? 1 : 0)
