#!/usr/bin/env node
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { basename, dirname, extname, join, resolve } from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

// One index per site: DOCS_LOCALE picks content/<locale> (default en)
const LOCALE = process.env.DOCS_LOCALE === 'ru' ? 'ru' : 'en'
const CONTENT_DIR = resolve(process.cwd(), 'content', LOCALE)
const OUTPUT_DIR = resolve(process.cwd(), 'public') // Output directory
const OUTPUT_FILE = resolve(OUTPUT_DIR, 'search-index.json')

// Helper to generate a slug for IDs (basic version)
function slugify(text) {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

function transformTokensToBodyAST(tokens) {
  const body = { type: 'root', children: [] }

  // Helper function to process inline tokens (like those within paragraphs or headings)
  function processInlineTokens(inlineTokensArray) {
    if (!inlineTokensArray || inlineTokensArray.length === 0) return []

    const children = []
    for (const token of inlineTokensArray) {
      switch (token.type) {
        case 'text':
          // If text token itself has sub-tokens (marked can do this for complex inlines)
          if (token.tokens && token.tokens.length > 0) {
            children.push(...processInlineTokens(token.tokens))
          } else {
            children.push({ type: 'text', value: token.text || token.raw || '' })
          }
          break
        case 'html': // Treat inline HTML as text
          if (token.tokens && token.tokens.length > 0) {
            // If marked lexed HTML into tokens
            children.push(...processInlineTokens(token.tokens))
          } else {
            children.push({ type: 'text', value: token.raw || token.text || '' })
          }
          break
        case 'codespan':
          children.push({
            type: 'element',
            tag: 'code', // Inline code
            props: {
              /* className: ['inline-code'] // Optional */
            },
            children: [{ type: 'text', value: token.text }]
          })
          break
        case 'strong':
          children.push({
            type: 'element',
            tag: 'strong',
            props: {},
            children: processInlineTokens(
              token.tokens || [{ type: 'text', text: token.text }]
            )
          })
          break
        case 'em':
          children.push({
            type: 'element',
            tag: 'em',
            props: {},
            children: processInlineTokens(
              token.tokens || [{ type: 'text', text: token.text }]
            )
          })
          break
        case 'link':
          children.push({
            type: 'element',
            tag: 'a',
            props: { href: token.href, title: token.title || undefined }, // Use undefined if null
            children: processInlineTokens(
              token.tokens || [{ type: 'text', text: token.text }]
            )
          })
          break
        case 'del': // Strikethrough
          children.push({
            type: 'element',
            tag: 'del',
            props: {},
            children: processInlineTokens(
              token.tokens || [{ type: 'text', text: token.text }]
            )
          })
          break
        case 'br':
          children.push({ type: 'element', tag: 'br', props: {}, children: [] })
          break
        case 'image':
          children.push({
            type: 'element',
            tag: 'img',
            props: { src: token.href, alt: token.text, title: token.title || undefined },
            children: [] // Images are typically self-closing in AST representation
          })
          break
        default:
          console.warn(
            `[AST] Unhandled inline token type: ${token.type}`,
            JSON.stringify(token).substring(0, 100)
          )
          if (token.text || token.raw) {
            children.push({ type: 'text', value: token.text || token.raw })
          }
      }
    }
    return children
  }

  // Main loop for block-level tokens
  for (const token of tokens) {
    switch (token.type) {
      case 'heading':
        body.children.push({
          type: 'element',
          tag: `h${token.depth}`,
          props: { id: slugify(token.text) },
          children: processInlineTokens(
            token.tokens || [{ type: 'text', text: token.text }]
          )
        })
        break
      case 'paragraph':
        body.children.push({
          type: 'element',
          tag: 'p',
          props: {},
          children: processInlineTokens(
            token.tokens || [{ type: 'text', text: token.text }]
          )
        })
        break
      case 'list': {
        const listItems = token.items.map(item => {
          // item.tokens contains block-level tokens for each list item.
          // We need to recursively call a block processor for these tokens.
          // For simplicity here, if item.tasks is true (task list), we add checkbox data.
          const listItemChildren = transformTokensToBodyAST(item.tokens) // Process children as blocks

          const liProps = {}
          if (item.task) {
            // GFM Task List Item
            liProps['data-task-item'] = true
            liProps['data-checked'] = item.checked
            // Optionally, prepend a visual checkbox or a text representation if needed for your AST
            // For now, properties indicate it's a task item.
          }

          return {
            type: 'element',
            tag: 'li',
            props: liProps,
            children: listItemChildren.children // unwrapping from the recursive call's root
          }
        })
        body.children.push({
          type: 'element',
          tag: token.ordered ? 'ol' : 'ul',
          props: token.start && token.ordered ? { start: token.start } : {},
          children: listItems
        })
        break
      }
      case 'code': // Fenced code block
        body.children.push({
          type: 'element',
          tag: 'pre',
          props: {},
          children: [
            {
              type: 'element',
              tag: 'code',
              props: token.lang
                ? { className: [`language-${token.lang.split(/\s+/)[0]}`] }
                : {}, // Handle lang with possible meta string
              children: [{ type: 'text', value: token.text }]
            }
          ]
        })
        break
      case 'blockquote':
        body.children.push({
          type: 'element',
          tag: 'blockquote',
          props: {},
          children: transformTokensToBodyAST(
            token.tokens || [{ type: 'text', text: token.text }]
          ).children // unwrap
        })
        break
      case 'hr':
        body.children.push({ type: 'element', tag: 'hr', props: {}, children: [] })
        break
      case 'html': // Block-level HTML
        body.children.push({
          type: 'element',
          tag: 'div', // Wrap raw HTML, or parse if a simple known tag.
          props: { 'data-comment': 'Raw HTML block' }, // Or use a specific type like 'html_block'
          children: [{ type: 'text', value: token.text }]
        })
        break
      case 'table': {
        const tableHeader = token.header.map(cell => ({
          type: 'element',
          tag: 'th',
          props: {}, // Alignments: token.align for column can be used here if needed
          children: processInlineTokens(
            cell.tokens || [{ type: 'text', text: cell.text }]
          )
        }))
        const tableBodyRows = token.rows.map(row => {
          const rowCells = row.map(cell => ({
            type: 'element',
            tag: 'td',
            props: {}, // Alignments: token.align[i]
            children: processInlineTokens(
              cell.tokens || [{ type: 'text', text: cell.text }]
            )
          }))
          return { type: 'element', tag: 'tr', props: {}, children: rowCells }
        })
        body.children.push({
          type: 'element',
          tag: 'table',
          props: {},
          children: [
            {
              type: 'element',
              tag: 'thead',
              props: {},
              children: [{ type: 'element', tag: 'tr', props: {}, children: tableHeader }]
            },
            { type: 'element', tag: 'tbody', props: {}, children: tableBodyRows }
          ]
        })
        break
      }
      case 'space':
        break
      case 'text': // Loose text at block level
        if (token.text && token.text.trim()) {
          body.children.push({
            type: 'element',
            tag: 'p',
            props: {}, // Wrap loose text in a paragraph
            children: processInlineTokens(
              token.tokens || [{ type: 'text', text: token.text }]
            )
          })
        }
        break
      default:
        console.warn(
          `[AST] Unhandled block token type: ${token.type}`,
          JSON.stringify(token).substring(0, 100)
        )
        if (token.raw) {
          body.children.push({ type: 'text', value: token.raw })
        }
    }
  }
  return body
}

function generateTocFromTokens(tokens, maxDepth = 3) {
  const headingsData = []

  tokens.forEach(token => {
    if (token.type === 'heading' && token.depth <= maxDepth) {
      headingsData.push({
        id: slugify(token.text),
        depth: token.depth,
        text: token.text
      })
    }
  })

  const tocRoots = []
  const stack = [] // stack of { node: tocNode (with children array), depth: number }

  for (const heading of headingsData) {
    const newNode = { ...heading, children: [] } // Each TOC node has id, depth, text, children

    while (stack.length > 0 && stack[stack.length - 1].depth >= newNode.depth) {
      stack.pop()
    }

    if (stack.length === 0) {
      tocRoots.push(newNode)
    } else {
      stack[stack.length - 1].node.children.push(newNode)
    }
    stack.push({ node: newNode, depth: newNode.depth })
  }

  let overallDepth = 0
  if (tocRoots.length > 0) {
    const allDepthsInToc = []
    function collectDepths(nodes) {
      nodes.forEach(n => {
        allDepthsInToc.push(n.depth)
        if (n.children && n.children.length > 0) collectDepths(n.children)
      })
    }
    collectDepths(tocRoots)
    if (allDepthsInToc.length > 0) overallDepth = Math.max(...allDepthsInToc)
  }

  return {
    title: '', // Can be set from frontmatter if desired
    searchDepth: maxDepth,
    depth: overallDepth,
    links: tocRoots
  }
}

function extractDescriptionFromAst(bodyAst, maxLength = 200) {
  if (!bodyAst || !bodyAst.children) return ''
  let text = ''
  let textLength = 0

  function traverse(nodes) {
    for (const node of nodes) {
      if (textLength >= maxLength) break
      if (node.type === 'text' && node.value) {
        const remainingLength = maxLength - textLength
        const valueToAdd = node.value.substring(0, remainingLength)
        text +=
          valueToAdd +
          (valueToAdd.length === remainingLength && node.value.length > remainingLength
            ? ''
            : ' ')
        textLength += valueToAdd.length
      }
      if (node.children && textLength < maxLength) {
        traverse(node.children)
      }
    }
  }
  traverse(bodyAst.children)
  const trimmedText = text.trim()
  if (trimmedText.length === 0) return ''
  return (
    trimmedText.substring(0, maxLength) +
    (textLength >= maxLength || text.length > trimmedText.length ? '...' : '')
  )
}

function processMarkdownFile(filePath, contentDir) {
  try {
    const fileContent = readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)

    const relativePathWithExt = filePath
      .substring(
        contentDir.length +
          (contentDir.endsWith('/') || contentDir.endsWith('\\') ? 0 : 1)
      )
      .replace(/\\/g, '/')
    const fileDirname = dirname(relativePathWithExt)
    const actualFileDir = fileDirname === '.' ? '' : fileDirname
    const fileNameWithExt = basename(filePath)
    const fileExtension = extname(fileNameWithExt).substring(1).toLowerCase()
    const fileStem = basename(fileNameWithExt, `.${fileExtension}`)
    const urlPath = (`/${actualFileDir ? actualFileDir + '/' : ''}${fileStem === 'index' ? '' : fileStem}`
      .replace(/\/+/g, '/')
      .replace(/^\/\//, '/')
      .replace(/(.)\/$/, '$1'))

    // MDC block markers (::callout, ::screenshot{...}, ::) are layout, not text
    const tokens = marked.lexer(content.replace(/^\s*::.*$/gm, ''))
    const bodyAST = transformTokensToBodyAST(tokens)
    const toc = generateTocFromTokens(
      tokens,
      frontmatter.tocSearchDepth || frontmatter.tocDepth || 3
    )

    const title =
      frontmatter.title ||
      fileStem
        .replace(/-/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ') ||
      'Untitled'
    const description = frontmatter.description || extractDescriptionFromAst(bodyAST)

    return {
      _path: urlPath,
      _dir: actualFileDir,
      _draft: frontmatter.draft || false,
      _partial: frontmatter.partial || false,
      _locale: frontmatter.locale || '',
      title: title,
      description: description,
      body: bodyAST,
      toc: toc,
      _type: 'markdown',
      _id: `content:${relativePathWithExt.replace(/\//g, ':')}`,
      _source: frontmatter.source || 'filesystem',
      _file: relativePathWithExt,
      _stem: fileStem,
      _extension: fileExtension
    }
  } catch (error) {
    console.warn(`⚠️ Warning: Failed to process file ${filePath}:`, error.message)
    console.error(error.stack)
    return null
  }
}

function getAllMarkdownFiles(dir) {
  const files = []
  try {
    const items = readdirSync(dir, { withFileTypes: true })
    for (const item of items) {
      const fullPath = join(dir, item.name)
      if (item.isDirectory()) {
        files.push(...getAllMarkdownFiles(fullPath))
      } else if (extname(item.name).toLowerCase() === '.md') {
        files.push(fullPath)
      }
    }
  } catch (error) {
    console.warn(`⚠️ Warning: Could not read directory ${dir}:`, error.message)
  }
  return files
}

// Replace the existing generateSearchIndex function with this one:

function generateSearchIndex() {
  console.log('🔍 Generating static search index...')
  try {
    mkdirSync(OUTPUT_DIR, { recursive: true }) // Ensure output directory exists
    const allFoundFiles = getAllMarkdownFiles(CONTENT_DIR);
    const uniqueMarkdownFiles = [...new Set(allFoundFiles)];

    if (allFoundFiles.length !== uniqueMarkdownFiles.length) {
      console.warn(
        `⚠️ Warning: Duplicate file paths were found and removed. Original count: ${allFoundFiles.length}, Unique count: ${uniqueMarkdownFiles.length}`
      );
    }
    const markdownFiles = uniqueMarkdownFiles;

    console.log(`📁 Found ${markdownFiles.length} unique markdown files in ${CONTENT_DIR}`)

    const searchItems = []
    let processedCount = 0
    const failedFiles = []

    for (const filePath of markdownFiles) {
      console.log(`  ⏳ Processing: ${filePath.replace(CONTENT_DIR, '')}`) // Log file being processed
      const item = processMarkdownFile(filePath, CONTENT_DIR)
      if (item) {
        searchItems.push(item)
        processedCount++
      } else {
        failedFiles.push(filePath.replace(CONTENT_DIR, ''))
      }
    }

    writeFileSync(OUTPUT_FILE, JSON.stringify(searchItems, null, 2), 'utf-8')

    console.log(`\n✅ Generated search index with ${processedCount} files.`)
    console.log(`📄 Index saved to: ${OUTPUT_FILE}`)
    console.log(
      `📊 Total size of the index file: ${(Buffer.byteLength(JSON.stringify(searchItems), 'utf8') / 1024).toFixed(2)} KB`
    )

    if (processedCount > 0) {
      console.log('\n📚 Files successfully processed and included in the index:')
      searchItems.forEach((item, index) => {
        // item._file contains the relative path from the CONTENT_DIR
        // item._path is the generated URL-like path
        console.log(
          `  ${index + 1}. Source File: "${item._file}" (Indexed as Path: "${item._path}")`
        )
      })
    } else {
      console.log('\n📚 No files were successfully processed for the index.')
    }

    if (failedFiles.length > 0) {
      console.warn(`\n⚠️ ${failedFiles.length} file(s) could not be processed:`)
      failedFiles.forEach(filePath => {
        console.warn(`  - ${filePath}`)
      })
    }
  } catch (error) {
    console.error('❌ Failed to generate search index:', error)
    process.exit(1)
  }
}

generateSearchIndex()

export { generateSearchIndex }
