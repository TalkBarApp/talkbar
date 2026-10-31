---
title: Operations reference
description: Every operation an assistant can run through TalkBar MCP or the TalkBar CLI, with arguments, defaults, permissions and results.
navigation:
  icon: i-heroicons-queue-list
---

TalkBar offers 144 operations (57 reads and 87 writes) to AI assistants through MCP and to scripts through the TalkBar CLI. This reference documents each one: what it does, which MCP tool runs it, whether it is on by default, its arguments and what it returns.

## Operations by category

| Category | Read | Write | Total |
| --- | ---: | ---: | ---: |
| [Workspace and profile](/mcp/operations/workspace-and-profile) | 5 | 2 | 7 |
| [Sessions](/mcp/operations/sessions) | 10 | 11 | 21 |
| [Projects and notes](/mcp/operations/projects-and-notes) | 6 | 12 | 18 |
| [Action items](/mcp/operations/action-items) | 2 | 4 | 6 |
| [Knowledge](/mcp/operations/knowledge) | 3 | 13 | 16 |
| [People and companies](/mcp/operations/people-and-companies) | 5 | 8 | 13 |
| [Topics and markers](/mcp/operations/topics-and-markers) | 3 | 8 | 11 |
| [Chats and documents](/mcp/operations/chats-and-documents) | 6 | 4 | 10 |
| [Calendar and series](/mcp/operations/calendar-and-series) | 8 | 14 | 22 |
| [Scheduler](/mcp/operations/scheduler) | 3 | 2 | 5 |
| [Exports](/mcp/operations/exports) | 6 | 9 | 15 |
| **All** | **57** | **87** | **144** |

## How to read this reference

Each operation has its own section, headed by its name (for example `sessions.get`), with a line like this:

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

| Label | Meaning |
| --- | --- |
| **Kind** | **Read** operations only read. **Write** operations change something. |
| **Runs with** | The MCP tool that runs it. Reads run with [`talkbar_read`](/mcp/tools#talkbar_read). Writes run with [`talkbar_change`](/mcp/tools#talkbar_change), except the 15 that move items to the Trash, archive or delete them, or call off a planned meeting: those run only with [`talkbar_delete`](/mcp/tools#talkbar_delete). They are [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused, unless you turn on **Allow deletes without confirmation**. |
| **MCP switch** | Whether the operation is on when you first set up MCP. You turn each one on or off in **Settings → MCP Access**. 81 operations start on and 63 start off: reads start on; changes to your items start off, while most calendar, series, scheduler and export operations start on. A switched-off operation answers `turned_off`. The CLI ignores these switches. |
| **Policy group** | The group an administrator's policy can allow or block. If your organization manages TalkBar, a blocked group is refused for MCP and the CLI alike. See [Access and permissions](/mcp/access-and-permissions). |

### Policy groups

| Group | What it covers | Operations |
| --- | --- | --- |
| `metadata` | Names, counts, lists and schedules, with no meeting text: workspaces, plan, session lists and figures, the recording session, project lists, and calendar and series reads. | 14 |
| `content` | Reads that return meeting text: summaries, transcripts, notes, chats, cards, people, search snippets, meeting prep and export previews. | 35 |
| `contentChanges` | Every change to sessions, projects, notes, action items, knowledge, people, topics, markers, chats, documents, your profile and workspace names. | 62 |
| `scheduling` | Changes to planned meetings and session series. | 14 |
| `scheduler` | Reading and managing scheduled jobs. | 5 |
| `exports` | Export settings, batches and deliveries (except `exports.preview`, which is `content`). | 14 |

### Arguments

Each argument is listed with its type, and required ones are marked. Ranges, allowed values and defaults come from the operation's schema; you can also get the full schema of any operation from [`talkbar_tools`](/mcp/tools#talkbar_tools) with `{"tool": "<operation>"}`.

- **`workspaceId` is optional everywhere** and is left out of the argument lists. Without it, the workspace open in the app is used. `workspace.list` takes no arguments at all and lists the workspaces you can name.
- An argument an operation does not take is refused by name, never ignored. A value outside the allowed range is refused, never clamped.
- Time fields ending in `Ms` are epoch milliseconds (or, where noted, milliseconds from the session start). Transcript and timeline text show times as `mm:ss` or `h:mm:ss`.
- Where an argument accepts `null`, `null` clears the value, while leaving the argument out keeps it.

See [Errors and limits](/mcp/errors-and-limits) for error codes, paging and plan limits.

## Calling an operation

Through MCP, send the operation and its arguments to the tool that runs it:

```json
{"tool": "sessions.get", "args": {"sessionId": "ses_123"}}
```

From the command line, the same call is:

```bash
talkbar-cli tools call sessions.get --args '{"sessionId":"ses_123"}'
```

Run up to 20 operations in order with `{"calls": [...]}`. Calls continue past an error unless you add `"stopOnError": true` (the default is `false`). The ids in the examples on these pages are placeholders. Find real ones with [`talkbar_find`](/mcp/tools#talkbar_find) or a list operation. See [The five MCP tools](/mcp/tools) and [CLI](/mcp/cli) for the details.

## What assistants cannot do

No operation records or controls recording, edits a transcript, generates a summary, changes your app settings (export destinations and rules are the exception, through the `exports.*` operations), empties the Trash, permanently deletes an item that has a Trash, or adds documents. Those stay in the app.

## Related

- [MCP overview](/mcp/overview)
- [The five MCP tools](/mcp/tools)
- [Access and permissions](/mcp/access-and-permissions)
- [Errors and limits](/mcp/errors-and-limits)
- [Examples](/mcp/examples)
