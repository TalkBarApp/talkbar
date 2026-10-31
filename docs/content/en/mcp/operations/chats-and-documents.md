---
title: Chats and documents
description: MCP and CLI operations to list and read Ask TalkBar chats and documents, read document text, and rename, pin, file, trash and restore them.
navigation:
  icon: i-heroicons-chat-bubble-left-right
---

Chat operations read and organize your Ask TalkBar chats; an assistant cannot send a message in one. Document operations list documents, read their extracted text and rename, pin or file them. Every operation also takes an optional `workspaceId`. See [How to read this reference](/mcp/operations#how-to-read-this-reference) for the conventions.

| Operation | Kind | Tool | On | Group |
| --- | --- | --- | --- | --- |
| [`chats.list`](#chatslist) | Read | `talkbar_read` | On | `content` |
| [`chats.get`](#chatsget) | Read | `talkbar_read` | On | `content` |
| [`chats.trash.list`](#chatstrashlist) | Read | `talkbar_read` | On | `content` |
| [`chats.update`](#chatsupdate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`chats.trash`](#chatstrash) | Write | `talkbar_delete` | Off | `contentChanges` |
| [`chats.restore`](#chatsrestore) | Write | `talkbar_change` | Off | `contentChanges` |
| [`documents.list`](#documentslist) | Read | `talkbar_read` | On | `content` |
| [`documents.get`](#documentsget) | Read | `talkbar_read` | On | `content` |
| [`documents.read`](#documentsread) | Read | `talkbar_read` | On | `content` |
| [`documents.update`](#documentsupdate) | Write | `talkbar_change` | Off | `contentChanges` |

## `chats.list`

Pages the AI chats (Ask TalkBar) in a workspace: pinned chats first, then by most recent activity. Messages are not returned.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="projectId" type="string"}
  Only chats filed under this project.
  ::
  ::field{name="search" type="string"}
  Words to find in the chat title or its messages. Every word must appear; case and accents are ignored.
  ::
  ::field{name="view" type="string"}
  `active` (default), `pinned` or `trash`.
  ::
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 100. Default `40`.
  ::
  ::field{name="cursor" type="string"}
  The `nextCursor` from the previous page. Must not be empty.
  ::
::

**Returns:** `{items, nextCursor, totalCount}`. Each item has `chatId`, `title`, `snippet`, `groundingMode`, `projectId`, `pinned`, `createdAt`, `updatedAt`, `lastMessageAtMs`, `trashedAtMs` and `currentTurnStatus`.

```json
{"tool": "chats.list", "args": {"search": "pricing"}}
```

## `chats.get`

Reads one chat and its most recent messages: your questions and the answers, with cited sources and skill names.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="chatId" type="string" required}
  The chat, from `chats.list`.
  ::
  ::field{name="limit" type="integer"}
  How many of the most recent messages to return. From 1 to 200. Default `20`.
  ::
  ::field{name="beforeSequence" type="integer"}
  `nextBeforeSequence` from the previous call, to page older messages.
  ::
::

**Returns:** The chat (as in `chats.list`, plus `workspaceId` and `replyLanguage`), `messages`, `hasMoreMessages` and `nextBeforeSequence`. Each message has `messageId`, `role`, `content`, `createdAt`, `sources` (`[{n, label, sourceType, sourceId, sessionId, documentId, atMs, locator, snippet, href}]`) and `skill`.

- A chat in the Trash can still be read; its `trashedAtMs` is set.

```json
{"tool": "chats.get", "args": {"chatId": "chat_12", "limit": 50}}
```

## `chats.trash.list`

Lists the chats in the Trash.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 200. Default `50`.
  ::
::

**Returns:** `{chats: [{chatId, title, trashedAt}]}`.

## `chats.update`

Renames a chat, pins it, or files it under a project.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="chatId" type="string" required}
  The chat, from `chats.list`.
  ::
  ::field{name="title" type="string"}
  The new title. May be empty, as in the app.
  ::
  ::field{name="pinned" type="boolean"}
  `true` pins, `false` unpins.
  ::
  ::field{name="projectId" type="string | null"}
  The project, or `null` to take the chat out of its project.
  ::
::

**Returns:** `{chatId, title, pinned, projectId}`.

- Give at least one field. A chat in the Trash is refused: restore it first.

## `chats.trash`

Moves a chat to the Trash. It can be restored.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="chatId" type="string" required}
  The chat, from `chats.list`.
  ::
::

**Returns:** `{chatId, trashed: true}`. Trashing a chat already in the Trash succeeds.

- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## `chats.restore`

Brings a chat back from the Trash.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="chatId" type="string" required}
  The chat, from `chats.list`.
  ::
::

**Returns:** `{chatId, title, pinned, projectId}`. Restoring a chat that is not in the Trash returns the same answer.

## `documents.list`

Lists the documents in a workspace.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="projectId" type="string"}
  Only documents filed under this project.
  ::
  ::field{name="query" type="string"}
  Case-insensitive match on the document title.
  ::
  ::field{name="sessionId" type="string"}
  Only the documents added to this session (as `sessions.documents` lists them).
  ::
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 200. Default `50`.
  ::
::

**Returns:** `{documents: [{documentId, title, fileType, status, pinned, projectId, updatedAt}]}`.

```json
{"tool": "documents.list", "args": {"projectId": "proj_456"}}
```

## `documents.get`

Reads one document's details and a short preview.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="documentId" type="string" required}
  The document, from `documents.list` or `sessions.documents`.
  ::
::

**Returns:** The list row plus `sizeBytes`, `sourceKind`, `indexProgress`, `preview` and `createdAt`.

## `documents.read`

Reads a document's extracted text in pages.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="documentId" type="string" required}
  The document, from `documents.list` or `sessions.documents`.
  ::
  ::field{name="offset" type="integer"}
  `nextOffset` from the previous page, in characters. An offset past the end is refused.
  ::
  ::field{name="maxChars" type="integer"}
  Page size in characters. From 1,000 to 200,000. Default `20000`.
  ::
::

**Returns:** `{documentId, title, status, totalChars, offset, nextOffset, truncated, text}`.

- Fails with a clear message when the document has no extracted text yet, or is no longer available.

```json
{"tool": "documents.read", "args": {"documentId": "doc_8", "maxChars": 40000}}
```

## `documents.update`

Renames a document, pins it, or files it under a project.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="documentId" type="string" required}
  The document, from `documents.list` or `sessions.documents`.
  ::
  ::field{name="title" type="string"}
  The new title. Must not be empty.
  ::
  ::field{name="pinned" type="boolean"}
  `true` pins, `false` unpins.
  ::
  ::field{name="projectId" type="string | null"}
  The project, or `null` to take the document out of its project. The project must not be in the Trash.
  ::
::

**Returns:** The document's list row.

- Give at least one field. Adding, removing and re-indexing documents stay in the app.

## Related

- [Operations reference](/mcp/operations)
- [Ask TalkBar](/chats-and-notes/ask-talkbar)
- [Documents in the app](/knowledge/documents)
