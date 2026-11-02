---
title: Errors and limits
description: Every error code TalkBar MCP and talkbar-cli return, what to do about each, plus plan limits, concurrency, argument rules and safe retries.
navigation:
  icon: i-heroicons-exclamation-triangle
---

When an operation is refused or fails, TalkBar answers with a short code and a sentence that says what to change. Assistants and scripts should branch on the code; the sentence is for people. This page lists every code and the rules behind them.

## Error shape

Over MCP, a refused or failed operation is a normal tool result with `isError: true`. In a batch, it is the entry's `error`. With `talkbar-cli --output json`, it is printed on standard output. The shape is the same everywhere:

```json
{
  "error": {
    "code": "invalid_arguments",
    "message": "notes.create does not take `content`. Note text goes in markdown. It takes: markdown, pinned, projectId, sessionIds, title, workspaceId. Arguments: talkbar_tools {\"tool\":\"notes.create\"}"
  }
}
```

Some codes add fields, listed below. Only a call to a tool name other than the [five MCP tools](/mcp/tools), or a call your client cancels, gets a JSON-RPC protocol error instead.

## Error codes

| Code | What it means | What to do |
| --- | --- | --- |
| `invalid_arguments` | The request itself is wrong: an unknown argument, a wrong type, a value out of range or not in the allowed list, a missing required argument, an empty id. | Change the request. The message names the argument; `talkbar_tools {"tool": "<id>"}` or `talkbar-cli tools info <id>` shows what the operation takes. |
| `not_found` | The id is unknown, belongs to another workspace, or the item is in the Trash. Also an unknown operation name. | Find the right id with `talkbar_find` or a list. For an item in the Trash, the message says "… is in the Trash; restore it first". |
| `turned_off` | You switched the operation off in **Settings → MCP Access**, or MCP is off. MCP only. | Ask the user to turn it on. Repeating the call will not help. |
| `failed` | The request is well formed, but the item's current state refuses it (for example "A topic with this name already exists"), an administrator rule blocks it, or something went wrong inside TalkBar. | Read the message. Change the item's state or the request; don't repeat the same call unchanged. |
| `declined` | The user did not confirm a `talkbar_delete` call, or did not answer within 5 minutes. Nothing ran. | Don't retry on your own. Ask the user what they want. |
| `confirmation_unavailable` | A `talkbar_delete` call came from a client that cannot ask the user, and **Allow deletes without confirmation** is off. Nothing ran. | Use a client that supports MCP elicitation, or ask the user to change the setting. |
| `busy` | Another write got to the database first, or an export run is already in progress. Carries `"retryable": true` and `retryAfterMs`. | Wait `retryAfterMs`, then send the same call again. If it created something, check first that it is not already there. |
| `conflict` | `notes.update` was sent with an `expectedUpdatedAt` the note no longer has: someone changed it since you read it. Carries the note's current `updatedAt`. | Read the note again with `notes.get` and make your edit on what it holds now. |
| `session_recording` | The session is still recording. Answers `sessions.trash`, the speaker edits (`sessions.speakers.rename`, `.link`, `.unlink`) and `exports.enqueue`. | Try again after the recording stops, when `sessions.recording` no longer returns it. |
| `limit_reached` | A fixed limit of the item, not of your plan. Carries `limit` and `max`. Today: a session holds at most 24 knowledge cards (`"limit": "sessionCards"`). | Make room first, for example take a card out with `sessions.cards.detach`. |
| `plan_limit` | Your TalkBar plan does not allow it. Carries `limit`, and for counted limits `max`, `used` and `plan`. | Free up room or upgrade in the app. Retrying will not help. See [Plan limits](#plan-limits). |

### `invalid_arguments` or `failed`?

- `invalid_arguments` means change the request: a bad value, an unknown type or color, an empty name.
- `failed` means the request was fine, but the current state of the item refuses it: "A topic with this name already exists", "A series with this id already exists; use another id or change the existing one", "Archived series cannot take new sessions".
- An [administrator rule](/mcp/access-and-permissions#administrator-rules) also answers `failed`. Its message starts with `ADMIN_POLICY_LOCKED:` and ends "This setting is managed by your organization." Asking again will not help; only the administrator can change it.

### `busy` and retrying

```json
{
  "error": {
    "code": "busy",
    "message": "TalkBar's database was busy with another write. Try the same call again; if it created something, check first that it is not already there.",
    "retryable": true,
    "retryAfterMs": 1000
  }
}
```

`retryAfterMs` is 1,000 ms when the database was busy, and 5,000 ms when an export run is already in progress.

## Plan limits

Most of what an assistant does is not limited by plan. These operations are, because they add to a count your plan caps:

| Operation | `limit` | Counts |
| --- | --- | --- |
| `projects.create`, `projects.restore` | `projects` | Projects in the workspace the call acts on |
| `sessions.restore` | `sessions` | Stored sessions in that workspace |

At the limit, the call is refused:

```json
{
  "error": {
    "code": "plan_limit",
    "limit": "projects",
    "max": 1,
    "used": 1,
    "plan": "free",
    "message": "Project limit reached (1 of 1 on Free): your plan includes 1 project, and this workspace already has 1. Move a project to Trash or upgrade the plan in TalkBar, then try again; plan.get lists the plans above Free."
  }
}
```

- The plan comes from the license activated in the app. An assistant cannot change it.
- `plan.get` reports the plan, each limit with what is used, and the plans above it.
- On Business, the highest plan, the message ends "Move a project to Trash, then try again."

See [Plans and license](/data/plans-and-license) for what each plan includes.

## Concurrency

- **Writes run one at a time** inside one MCP server or `talkbar-cli` process, so parallel calls from one assistant never collide. Reads run in parallel.
- **Other processes:** when another program is writing (the app while it records, or a second MCP server), a write waits up to 5 seconds for it before answering `busy`.
- **Exports:** `exports.run` runs outside that queue, because a delivery can take a long time and must not hold up `exports.cancel`. Only one export run at a time per server; a second answers `busy`.
- **Up to four calls at once:** one MCP connection runs at most four tool calls at the same time. Answers can arrive in a different order than the requests.
- **Cancelled requests:** when your client cancels a call, it gets a JSON-RPC error (`-32603`, "Request cancelled by the client") rather than an error code from this page. A request cancelled before it starts never runs, and a write that was still waiting for its turn is dropped. If you switch an operation off while a write waits, it answers `turned_off`.

One long-running MCP session is faster than starting `talkbar-cli` for every call. From the command line, prefer [`tools batch`](/mcp/cli#run-a-batch).

## Argument rules

TalkBar checks arguments strictly, so a mistake is named rather than silently ignored:

- **Unknown arguments are refused by name**, with the list the operation takes. Note text sent as `content`, `text` or `body` gets the hint "Note text goes in markdown." Unknown keys inside a nested object the schema describes are refused too.
- **Wrong values are refused before any lookup.** A wrong type, a value outside the allowed list or range, or a bad array item is `invalid_arguments` before TalkBar looks up any id. So an unknown id with a wrong value names the value; a right value with an unknown id is `not_found`.
- **Missing required arguments** are named next (`noteId is required`), also before any lookup.
- **Exact values.** Allowed values must match exactly: `"Note"` or `" any "` is refused where `note` or `any` is expected.
- **Ranges are not clamped.** A `limit`, `maxChars` or `offset` outside the range in the schema is refused.
- **Ids must not be empty.** An argument ending in `Id` must not be `""` when given; use `null` to clear an optional one. A list ending in `Ids` must not hold an empty id.
- **No control characters** in any argument, except tabs and line breaks.
- **`args` is an object.** Leave it out or send `null` for no arguments; an array, number or string is refused as "arguments must be an object".
- **Names that must not be empty** are checked after trimming spaces, so `"   "` counts as empty. Notes, chat titles and the profile name may be empty, as in the app.
- **Times in the past** are accepted where the app accepts them, for example logging a meeting after it happened.
- **The five MCP tools** refuse keys they do not take. `talkbar_read`, `talkbar_change` and `talkbar_delete` take `tool` (with `args`) or `calls`, not both, and `stopOnError` must be `true` or `false`.

## Repeating changes safely

Sending the same change twice is safe. It succeeds again and reports the current state:

- Trashing what is already in the Trash, or restoring what is already live.
- Archiving what is archived, or unarchiving what is not.
- Pinning what is pinned.

The first trash or archive date is kept. An unknown id is still `not_found`.

The exception is `action_items.remove`: it removes the item for good (an item you added is deleted, an item from a summary is dismissed), so a second remove is `not_found`.

Creating is not repeatable: two `notes.create` calls make two notes. After a `busy` answer to a create, check before you send it again.

## Things that are never available

Whatever you switch on, an assistant cannot record or control a live session, edit a transcript, generate a summary, run TalkBar's AI features, change settings, connect or sync calendars, delete anything permanently, empty a Trash, or add or re-index documents. There is no error code for these: the operations do not exist.

## Related

- [The five MCP tools](/mcp/tools)
- [Access and permissions](/mcp/access-and-permissions)
- [Admin policy](/settings/admin-policy)
- [talkbar-cli](/mcp/cli)
- [Operations reference](/mcp/operations)
