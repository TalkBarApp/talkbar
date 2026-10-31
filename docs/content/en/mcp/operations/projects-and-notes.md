---
title: Projects and notes
description: MCP and CLI operations to list, read, create, update, file, pin, trash and restore projects and notes.
navigation:
  icon: i-heroicons-folder
---

Project operations read and manage the projects that group your sessions, notes and cards. Note operations read and write notes as Markdown, including a session's own note. Every operation also takes an optional `workspaceId`. See [How to read this reference](/mcp/operations#how-to-read-this-reference) for the conventions.

| Operation | Kind | Tool | On | Group |
| --- | --- | --- | --- | --- |
| [`projects.list`](#projectslist) | Read | `talkbar_read` | On | `metadata` |
| [`projects.get`](#projectsget) | Read | `talkbar_read` | On | `content` |
| [`projects.trash.list`](#projectstrashlist) | Read | `talkbar_read` | On | `content` |
| [`projects.create`](#projectscreate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`projects.update`](#projectsupdate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`projects.pin`](#projectspin) | Write | `talkbar_change` | Off | `contentChanges` |
| [`projects.trash`](#projectstrash) | Write | `talkbar_delete` | Off | `contentChanges` |
| [`projects.restore`](#projectsrestore) | Write | `talkbar_change` | Off | `contentChanges` |
| [`notes.list`](#noteslist) | Read | `talkbar_read` | On | `content` |
| [`notes.get`](#notesget) | Read | `talkbar_read` | On | `content` |
| [`notes.trash.list`](#notestrashlist) | Read | `talkbar_read` | On | `content` |
| [`notes.create`](#notescreate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`notes.update`](#notesupdate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`notes.append`](#notesappend) | Write | `talkbar_change` | Off | `contentChanges` |
| [`notes.move`](#notesmove) | Write | `talkbar_change` | Off | `contentChanges` |
| [`notes.pin`](#notespin) | Write | `talkbar_change` | Off | `contentChanges` |
| [`notes.trash`](#notestrash) | Write | `talkbar_delete` | Off | `contentChanges` |
| [`notes.restore`](#notesrestore) | Write | `talkbar_change` | Off | `contentChanges` |

## `projects.list`

Pages the projects in a workspace with session, note and document counts and the latest session start time.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments**

::field-group
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 100. Default `100`.
  ::
  ::field{name="offset" type="integer"}
  `nextOffset` from the previous page. Default `0`.
  ::
::

**Returns:** `{items: [{projectId, name, description, sessionCount, noteCount, documentCount, lastSessionAtMs}], totalCount, nextOffset}`.

```json
{"tool": "projects.list", "args": {}}
```

## `projects.get`

Reads one project overview with its latest sessions (up to 20) and notes (up to 10).

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="projectId" type="string" required}
  A project, from `projects.list`.
  ::
::

**Returns:** The `projects.list` fields plus `sessions` (rows as in `sessions.list`) and `notes` (`{noteId, title, snippet, updatedAt}`).

- A project in the Trash is `not_found`.

```json
{"tool": "projects.get", "args": {"projectId": "proj_456"}}
```

## `projects.trash.list`

Lists the projects in the Trash.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 200. Default `50`.
  ::
::

**Returns:** `{projects: [{projectId, name, trashedAt}]}`.

## `projects.create`

Creates a project, within your plan's project limit.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="name" type="string" required}
  The project name. Must not be empty.
  ::
  ::field{name="description" type="string"}
  A plain-text description.
  ::
  ::field{name="kind" type="string"}
  The kind of project. One of `client`, `engagement`, `recurring`, `internal`, `personal`, `research`, `product`, `sales`, `hiring`, `education`, `event`, `support`. Default `client`.
  ::
  ::field{name="color" type="string"}
  The project color.
  ::
::

**Returns:** The project: `{projectId, name, status, kind, pinned, updatedAt}`.

- At your plan's project limit the call is refused with `plan_limit` (`limit: "projects"`), counted in the workspace the call acts on. `plan.get` shows the limit.

```json
{"tool": "projects.create", "args": {"name": "Northwind onboarding", "kind": "client"}}
```

## `projects.update`

Renames a project or changes its description, kind or color.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="projectId" type="string" required}
  A project, from `projects.list`.
  ::
  ::field{name="name" type="string"}
  The new name. Must not be empty.
  ::
  ::field{name="description" type="string | null"}
  A plain-text description; it replaces any formatted description. `null` clears it.
  ::
  ::field{name="kind" type="string"}
  One of `client`, `engagement`, `recurring`, `internal`, `personal`, `research`, `product`, `sales`, `hiring`, `education`, `event`, `support`.
  ::
  ::field{name="color" type="string | null"}
  The project color. `null` clears it.
  ::
::

**Returns:** The project, as `projects.create` returns it.

- Give at least one field.

## `projects.pin`

Pins or unpins a project.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="projectId" type="string" required}
  A project, from `projects.list`.
  ::
  ::field{name="pinned" type="boolean" required}
  `true` pins, `false` unpins.
  ::
::

**Returns:** `{projectId, pinned}`.

## `projects.trash`

Moves a project to the Trash. It can be restored.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="projectId" type="string" required}
  A project, from `projects.list`.
  ::
::

**Returns:** `{projectId, trashed: true}`. Trashing a project already in the Trash succeeds and keeps the first trash date.

- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## `projects.restore`

Brings a project back from the Trash, within your plan's project limit.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="projectId" type="string" required}
  A project, from `projects.list`.
  ::
::

**Returns:** The project, as `projects.create` returns it. Restoring a project that is not in the Trash changes nothing.

- At the project limit it is refused with `plan_limit` (`limit: "projects"`).

## `notes.list`

Pages the notes in a workspace, most recently updated first, optionally limited to a project, topic, session or a title and body search.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="projectId" type="string"}
  Only notes filed under this project.
  ::
  ::field{name="search" type="string"}
  Text to find in note titles and bodies.
  ::
  ::field{name="topicId" type="string"}
  Only notes assigned this topic (from `topics.list`).
  ::
  ::field{name="sessionId" type="string"}
  Only the notes on this session: its own note, the notes added to its page and the notes filed under it.
  ::
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 100. Default `40`.
  ::
  ::field{name="cursor" type="string"}
  The `nextCursor` from the previous page. Must not be empty.
  ::
::

**Returns:** `{items, nextCursor, hasMore, totalCount}`. Each item has `noteId`, `title`, `snippet`, `pinned`, `createdAt`, `updatedAt`, `sessionId`, `sessions`, `topics` and `projects`; a search adds `matchSnippet`.

- In each row, `sessionId` is set only on a session's own note; `sessions` lists the sessions a note is filed under.

```json
{"tool": "notes.list", "args": {"search": "onboarding", "limit": 10}}
```

## `notes.get`

Reads one note: its title, Markdown body (in pages) and links.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="noteId" type="string" required}
  The note, from `notes.list` or `sessions.notes`.
  ::
  ::field{name="maxChars" type="integer"}
  Page size in characters. From 1,000 to 200,000. Default `20000`.
  ::
  ::field{name="offset" type="integer"}
  `nextOffset` from the previous read. An offset past the end is refused.
  ::
::

**Returns:** `{noteId, workspaceId, title, markdown, truncated, nextOffset, pinned, createdAt, updatedAt, links}`. `updatedAt` is what `notes.update` takes as `expectedUpdatedAt`.

- A note in the Trash is `not_found`.

```json
{"tool": "notes.get", "args": {"noteId": "note_789"}}
```

## `notes.trash.list`

Lists the notes in the Trash.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 200. Default `50`.
  ::
::

**Returns:** `{notes: [{noteId, title, trashedAt}]}`.

## `notes.create`

Creates a note from Markdown, optionally filed under a project and sessions.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="title" type="string"}
  The note title. May be empty, as in the app.
  ::
  ::field{name="markdown" type="string"}
  The note body, in Markdown. (The argument is `markdown`; `body`, `content` or `text` are refused.)
  ::
  ::field{name="projectId" type="string"}
  File the note under this project.
  ::
  ::field{name="sessionIds" type="string[]"}
  File the note under these sessions. A session named twice is filed once.
  ::
  ::field{name="pinned" type="boolean"}
  Pin the note.
  ::
::

**Returns:** `{noteId, title, pinned, sessionId, updatedAt, projectId, sessionIds}`. `projectId` and `sessionIds` say where the note is filed.

- The project and sessions must exist and not be in the Trash.

```json
{"tool": "notes.create", "args": {"title": "Follow-up plan", "markdown": "## Next steps\n- Send the proposal by Friday", "projectId": "proj_456"}}
```

## `notes.update`

Renames a note and/or replaces its body with Markdown.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="noteId" type="string" required}
  The note, from `notes.list` or `sessions.notes`.
  ::
  ::field{name="title" type="string"}
  The new title. An empty title clears it.
  ::
  ::field{name="markdown" type="string"}
  The new body, in Markdown. Replaces the whole body.
  ::
  ::field{name="force" type="boolean"}
  Replace a body that holds content Markdown cannot represent, such as embedded cards. Without it, such a note is refused.
  ::
  ::field{name="expectedUpdatedAt" type="integer"}
  The note's `updatedAt` your edit started from. If the note changed since, in TalkBar or through another call, the edit is refused with `conflict` and nothing is written.
  ::
::

**Returns:** `{noteId, title, pinned, sessionId, updatedAt}`; on a session's own note, also `sessionStatus` (and a `warning` when the session was interrupted or TalkBar is not running).

- Give a title, markdown or both. A title-only edit keeps the body and its embedded links.
- A `conflict` answer carries the note's current `updatedAt`: read the note again, merge, and retry.
- A note in the Trash is refused: restore it first.

```json
{"tool": "notes.update", "args": {"noteId": "note_789", "markdown": "# Plan\nUpdated after the call.", "expectedUpdatedAt": 1761990000000}}
```

## `notes.append`

Adds Markdown to the end of a note. No conflict check is needed, since it adds to what is there.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="noteId" type="string" required}
  The note, from `notes.list` or `sessions.notes`.
  ::
  ::field{name="markdown" type="string" required}
  The Markdown to add. Must not be empty.
  ::
::

**Returns:** As `notes.update`, including `sessionStatus` on a session's own note.

- To write into a live session's note, find its `noteId` with `sessions.notes` (`role: "session"`).

```json
{"tool": "notes.append", "args": {"noteId": "note_789", "markdown": "- Dana will send the contract draft."}}
```

## `notes.move`

Sets a note's project and/or the sessions it is filed under. Other links stay.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="noteId" type="string" required}
  The note, from `notes.list` or `sessions.notes`.
  ::
  ::field{name="projectId" type="string | null"}
  The project, or `null` to take the note out of its project.
  ::
  ::field{name="sessionIds" type="string[]"}
  The sessions to file it under. Replaces the note's current session list.
  ::
::

**Returns:** `{noteId, projectId, sessionIds}`: where the note is filed now.

- Give `projectId`, `sessionIds` or both.

## `notes.pin`

Pins or unpins a note.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="noteId" type="string" required}
  The note, from `notes.list` or `sessions.notes`.
  ::
  ::field{name="pinned" type="boolean" required}
  `true` pins, `false` unpins.
  ::
::

**Returns:** `{noteId, pinned}`.

## `notes.trash`

Moves a note to the Trash. It can be restored.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="noteId" type="string" required}
  The note, from `notes.list` or `sessions.notes`.
  ::
::

**Returns:** `{noteId, trashed: true}`. Trashing a note already in the Trash succeeds.

- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## `notes.restore`

Brings a note back from the Trash.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="noteId" type="string" required}
  The note, from `notes.list` or `sessions.notes`.
  ::
::

**Returns:** `{noteId, restored: true}`. Restoring a note that is not in the Trash returns the same answer.

## Related

- [Operations reference](/mcp/operations)
- [Sessions](/mcp/operations/sessions)
- [Topics and markers](/mcp/operations/topics-and-markers)
- [Projects in the app](/knowledge/projects)
- [Notes in the app](/chats-and-notes/notes)
