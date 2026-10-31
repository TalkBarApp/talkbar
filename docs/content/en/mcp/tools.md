---
title: The five MCP tools
description: How talkbar_find, talkbar_read, talkbar_change, talkbar_delete and talkbar_tools work, with their arguments, batches, annotations, paging and wire format.
navigation:
  icon: i-heroicons-squares-2x2
---

TalkBar's MCP server does not list one tool per operation. It lists at most five tools that sit in front of every operation, so an assistant pays for the same few tool definitions however many operations TalkBar offers. This page is for people building or tuning agents; for each operation's own arguments, see the [operations reference](/mcp/operations).

## What a client sees

When an app connects, the server introduces itself as `talkbar` (title "TalkBar") and sends these instructions:

```text
TalkBar holds the user's meetings: sessions with summaries and transcripts, notes, projects, action items, knowledge cards, people and schedules. Find ids with talkbar_find, then read with talkbar_read and change with talkbar_change; trash, archive and delete go through talkbar_delete, which the user confirms. Batch with {"calls":[...]}: calls run in order and continue past errors unless stopOnError is true. workspaceId is optional (default: the workspace open in the app). Notes are Markdown. The live session: sessions.recording. Recording, settings and emptying the Trash stay in the app. The user turns operations on in TalkBar Settings > MCP Access; item changes start off.
```

`tools/list` then returns only the tools that have something to run:

| Tool | Listed when |
| --- | --- |
| `talkbar_find` | The `workspace.search` read is on |
| `talkbar_read` | At least one read is on |
| `talkbar_change` | At least one write that removes nothing is on |
| `talkbar_delete` | At least one trash, archive or delete operation is on |
| `talkbar_tools` | Anything at all is on |

With MCP off in TalkBar, or every operation off or blocked, the list is empty.

### Annotations

Every tool carries MCP annotations, so your app can decide which calls to approve automatically:

| Tool | `readOnlyHint` | `destructiveHint` | `idempotentHint` | `openWorldHint` |
| --- | --- | --- | --- | --- |
| `talkbar_find` | true | false | true | false |
| `talkbar_read` | true | false | true | false |
| `talkbar_change` | false | false | false | false |
| `talkbar_delete` | false | true | false | false |
| `talkbar_tools` | true | false | true | false |

`talkbar_delete` is not idempotent because one of its batches may also hold other writes.

## Calling an operation

`talkbar_read`, `talkbar_change` and `talkbar_delete` take the same arguments. Name one operation with `tool` and its arguments with `args`:

```json
{
  "tool": "notes.get",
  "args": { "noteId": "note-k2v9w8x7c6b5n4m3l2j1h0g9" }
}
```

Or run up to 20 operations in order with `calls`:

```json
{
  "calls": [
    { "tool": "sessions.list", "args": { "limit": 5 } },
    { "tool": "notes.list" }
  ],
  "stopOnError": false
}
```

::field-group
  ::field{name="tool" type="string"}
  The operation id, such as `sessions.get`. Use with `args`, not with `calls`.
  ::
  ::field{name="args" type="object"}
  The operation's arguments. Leave it out, or send `null`, for none.
  ::
  ::field{name="calls" type="array"}
  1 to 20 objects of `{"tool", "args"}`, run in order.
  ::
  ::field{name="stopOnError" type="boolean"}
  With `calls`: stop at the first failed operation. Default `false`, so later calls still run.
  ::
::

Every operation takes an optional `workspaceId`. Without it, TalkBar uses the workspace open in the app.

## `talkbar_find`

The universal search, the same one the app's search uses, transcript snippets included. It is usually the first step, to turn a name or a phrase into ids.

::field-group
  ::field{name="query" type="string" required}
  What to look for. Must not be empty.
  ::
  ::field{name="kinds" type="string[]"}
  Limit the search to some kinds: `session`, `note`, `document`, `chat`, `action_item`, `project`, `series`, `person`, `company`, `memory` (knowledge cards).
  ::
  ::field{name="match" type="string"}
  `any` (default) reads the query as a natural-language request. `all` requires every word.
  ::
  ::field{name="projectId" type="string"}
  Only items in this project.
  ::
  ::field{name="limit" type="integer"}
  1 to 100 results. Default 20.
  ::
  ::field{name="includeArchived" type="boolean"}
  Also find archived series, people, companies and knowledge cards. Trashed items are never found.
  ::
  ::field{name="workspaceId" type="string"}
  The workspace to search. Default: the one open in the app.
  ::
::

```json [Request]
{ "query": "pricing review", "kinds": ["session", "note"], "limit": 5 }
```

```json [Response]
{
  "matches": [
    {
      "kind": "session",
      "id": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10",
      "title": "Pricing review with Acme",
      "snippet": "…agreed to keep the pricing review on Thursdays…",
      "href": "/sessions/6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10",
      "score": 14.2,
      "projectId": "project-p8d3k2m1q9w7e5r4t6y0u2i1",
      "matchedIn": "title",
      "atMs": 1792594800000,
      "detail": null,
      "context": null,
      "itemCount": null,
      "archived": false,
      "content": null
    }
  ],
  "contentSearch": "on"
}
```

Best matches come first. `score` is 10 or more for a match in a name or text, and below 10 for a match only in indexed content; such a match carries `content` with the passage's `sourceType`, `sourceId`, `locator` and `tMs` (the moment in the transcript). `matchedIn` is `title`, `body` or `content`. `contentSearch` says whether content search ran (`on`), ran on keywords only (`keywordOnly`), was not available (`off`) or failed (`failed`); name and text matches come back either way.

## `talkbar_read`

Runs read operations. Its description lists every read that is on, grouped by area with its required arguments, for example `notes.list|get(noteId)|trash.list; sessions.get(sessionId)|transcript(sessionId)|…`, so an assistant can make its first read without looking anything up.

```json
{ "tool": "sessions.transcript", "args": { "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10" } }
```

It refuses writes: a batch that holds a write is refused as a whole, and the message names the tool to use.

## `talkbar_change`

Runs writes that remove nothing: creating, changing, filing, pinning, restoring. Its description lists no operations; an assistant gets their ids and arguments from [`talkbar_tools`](#talkbar_tools).

```json
{
  "tool": "notes.create",
  "args": { "title": "Follow-ups", "markdown": "- Send the revised quote\n- Book the next call" }
}
```

It refuses reads and the operations of `talkbar_delete`. A batch holding one of them is refused as a whole, with "Nothing in this call ran". This keeps an app's approval of `talkbar_change` from ever approving a delete.

## `talkbar_delete`

Runs the operations that move items to the Trash, archive or delete them: `notes.trash`, `projects.trash`, `sessions.trash`, `chats.trash`, `knowledge.archive`, `contacts.archive`, `organizations.archive`, `series.archive`, `action_items.remove`, `topics.delete`, `markers.delete`, `exports.destination.delete`, `exports.rule.delete`, `calendar.cancel` and `calendar.skip`.

```json
{ "tool": "notes.trash", "args": { "noteId": "note-k2v9w8x7c6b5n4m3l2j1h0g9" } }
```

- Before it runs, TalkBar asks the user to confirm when the client supports MCP elicitation (form mode). A client that cannot ask is refused with `confirmation_unavailable`, unless the user turned on **Allow deletes without confirmation**. See [Confirming deletes](/mcp/access-and-permissions#confirming-deletes).
- A batch sent here may also hold other writes, for example a `notes.create` followed by a `notes.trash`. Reads are refused.
- A batch whose calls would all be refused anyway is answered without a question, with each call's own error.

## `talkbar_tools`

The operation index. Call it with no arguments to see every operation you can run now, grouped by the tool that runs it:

```json [Response]
{
  "talkbar_read": {
    "notes.list": "Page document notes in an owned workspace, most recently updated first, optionally scoped to a project or a title/body search.",
    "notes.get": "Read one note's title, Markdown body (paged with maxChars and offset) and links."
  },
  "talkbar_change": {
    "notes.create": "Create a note from Markdown, optionally filed under a project and sessions."
  },
  "talkbar_delete": {
    "notes.trash": "Move a note to the Trash; it can be restored."
  },
  "off": "Turned off; the user can turn them on in TalkBar Settings > MCP Access: notes.update|append|move|pin; projects.create|update"
}
```

The example is shortened. `off` lists operations you switched off, so the assistant can ask you to turn one on. Operations an administrator blocked are not listed.

Call it with `{"tool": "<id>"}` to get one operation's arguments:

```json [Request]
{ "tool": "notes.append" }
```

```json [Response]
{
  "tool": "notes.append",
  "kind": "change",
  "runWith": "talkbar_change",
  "summary": "Add Markdown to the end of a note.",
  "args": {
    "type": "object",
    "properties": {
      "workspaceId": { "type": "string" },
      "noteId": { "type": "string" },
      "markdown": { "type": "string", "minLength": 1 }
    },
    "required": ["noteId", "markdown"],
    "additionalProperties": false
  }
}
```

`kind` is `read` or `change`; `runWith` names the tool to send it to. `args` is the operation's JSON Schema; unknown arguments are refused, so it is closed with `"additionalProperties": false`. An unknown id answers `not_found` (with a "did you mean" hint when one is close), a switched-off one `turned_off`, and a blocked one `failed`.

## Batches

A `{"calls": [...]}` batch runs its operations one after another, in order, in one call:

- 1 to 20 operations. Send either `tool` (with `args`) or `calls`, never both.
- Every known operation in the batch must belong to the tool you sent it to. If one does not, the whole batch is refused and nothing in it runs.
- An operation that fails does not stop the batch unless `stopOnError` is `true`.
- An unknown operation fails on its own with `not_found`; the rest still run.
- The open TalkBar app refreshes once for the whole batch.

The answer has one entry per operation that ran:

```json
{
  "results": [
    { "tool": "sessions.list", "ok": true, "result": { "items": [], "nextCursor": null, "hasMore": false, "totalCount": 0 } },
    { "tool": "notes.get", "ok": false, "error": { "code": "not_found", "message": "Note not found in workspace" } }
  ]
}
```

An entry that could not be read at all (no `tool`, or `args` that is not an object) has `ok: false` and an error, but no `tool`.

To make one operation depend on another (create a note, then file it), put both in one batch or wait for the first answer before sending the second call.

## Results and errors

A successful call returns one text item holding the result as compact JSON.

An operation that is refused or fails is still a normal tool result. It has `isError: true` and holds:

```json
{ "error": { "code": "turned_off", "message": "notes.create is turned off in TalkBar. Ask the user to turn it on in TalkBar Settings > MCP Access." } }
```

Codes are `invalid_arguments`, `not_found`, `turned_off`, `failed`, `declined`, `confirmation_unavailable`, `busy`, `conflict`, `session_recording`, `limit_reached` and `plan_limit`. Batch entries carry the same object. See [Errors and limits](/mcp/errors-and-limits) for what each means.

When the arguments are wrong, the message ends with a pointer to the operation's schema, such as `Arguments: talkbar_tools {"tool":"notes.get"}`. The five tools also refuse keys they do not take, by name.

Only a tool name other than these five is a protocol error (JSON-RPC `-32602`), and so is a call your client cancels (see [Wire format](#wire-format)).

## Tool list changes

TalkBar announces `notifications/tools/list_changed` when a switch in **MCP Access** changes the definitions of these five tools. It checks at the start of each tool call and does not poll, so the notice arrives with your next call. The definitions change when:

- you turn a read on or off (because `talkbar_read` lists the reads),
- you turn `workspace.search` on or off (`talkbar_find` appears or goes),
- you turn on the first, or turn off the last, operation behind `talkbar_change` or `talkbar_delete` (the tool appears or goes).

Other write switches, and **Allow deletes without confirmation**, leave the five tools as they are and are not announced. A switched-off write shows under `off` in `talkbar_tools` and answers `turned_off` when called.

If MCP was off when your app connected, the server did not offer tools at all. Reconnect TalkBar in your app after you turn MCP on.

## Paging

Each list says how to get the next page. Pass the value back in the matching argument:

| The answer holds | Send it back as | Operations |
| --- | --- | --- |
| `nextCursor` | `cursor` | `sessions.list`, `notes.list`, `chats.list`, `knowledge.suggestions.list` |
| `nextOffset` | `offset` | `projects.list`, `knowledge.list`, `contacts.sessions`, `calendar.upcoming`, `notes.get`, `documents.read` |
| `nextTurnOffset` | `turnOffset` | `sessions.transcript` |
| `nextBeforeSequence` | `beforeSequence` | `chats.get` |
| the last session id | `after` | `exports.sessions` |

- A cursor must be one TalkBar returned. A missing or `null` next value means you have the last page.
- Page sizes differ by operation. Each operation's schema gives its `limit` range; a value outside it is refused, never clamped.
- `notes.get`, `documents.read` and `sessions.transcript` page long text with `maxChars`, from 1,000 to 200,000 characters (20,000 by default). An offset past the end is refused.
- `sessions.transcript` pages hold whole turns. See [Read a transcript in pages](/mcp/examples#find-a-session-and-read-its-transcript-in-pages).

## Wire format

For people writing their own MCP client:

- **Transport:** standard input and output, one JSON-RPC 2.0 message per line, up to 8 MB per message.
- **Start:** send `initialize` first. Any other request before it gets `-32601` ("Send initialize first"); notifications before it are dropped. A second `initialize` gets `-32600`.
- **Malformed input:** a line that is not JSON gets `-32700` with `"id": null`. A JSON array (a JSON-RPC batch) gets one `-32600` reply: MCP has no batches, so send one message per line, or use `{"calls": [...]}`. A message that is not an object, lacks `"jsonrpc": "2.0"`, or has an id that is not a string or an integer gets `-32600`.
- **Tool calls:** `tools/call` needs `{"name": "<tool>"}`, and `arguments` must be an object (or left out). Otherwise it gets `-32602`.
- **Order:** up to four tool calls from one client run at the same time, so answers can come back in a different order than the requests. Match them by `id`.
- **Cancelling:** when your client cancels a tool call, the server answers it with a JSON-RPC error (`-32603`, "Request cancelled by the client"), not a tool result. A request cancelled before its operation starts never runs, and in a batch, operations that had not started yet do not run.
- **Resources and prompts:** none are offered. The resource lists are empty.

## Related

- [Operations reference](/mcp/operations)
- [Access and permissions](/mcp/access-and-permissions)
- [Errors and limits](/mcp/errors-and-limits)
- [Examples](/mcp/examples)
- [talkbar-cli](/mcp/cli)
