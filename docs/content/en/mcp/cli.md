---
title: talkbar-cli
description: Run TalkBar operations from a terminal or script with talkbar-cli, the same program that serves MCP. Commands, options, input, output and exit codes.
navigation:
  icon: i-heroicons-command-line
---

`talkbar-cli` is the command-line program that ships with TalkBar. It runs the same operations an AI assistant can run over MCP, from a terminal, a script or an AI agent that can run commands. It also starts the MCP server and runs exports in the background.

## Before you start

- `talkbar-cli` ships with TalkBar. **Settings → MCP Access → Executable path** shows where. Use **Add to PATH** there to run it by name from any terminal. See [Where talkbar-cli is installed](/mcp/setup#where-talkbar-cli-is-installed).
- It opens your TalkBar data folder, or the folder in `TALKBAR_DATA_ROOT` when that is set. Find the actual path in **Settings → MCP Access → Data root**. The app can be open or closed.
- It does what you type, as you. The MCP Access switches do not apply to it, but administrator rules and plan limits do. See [What the command line ignores](/mcp/access-and-permissions#what-the-command-line-ignores).

```shell
talkbar-cli --version
talkbar-cli --help
talkbar-cli tools --help
```

Examples use a POSIX shell on macOS or PowerShell on Windows. If a shell handles JSON quotes differently, use `--args-file`.

## Commands

| Command | What it does |
| --- | --- |
| `tools list [--compact]` | Lists the operations. |
| `tools info <id>` | Shows one operation: what it does, its default MCP switch and its arguments. |
| `tools call <id> [--args <json> \| --args - \| --args-file <path>]` | Runs one operation and prints its result as JSON. |
| `tools batch [--file <path>] [--stop-on-error]` | Runs many operations in one process and prints their results as one JSON array. |
| `search <words>…` | Searches the workspace, as the app's search does. |
| `serve [--transport stdio]` | Starts the MCP server. Your AI app runs this for you. |
| `exports run`, `exports worker`, `exports notion connect` | Delivers queued exports and connects Notion. See [Exports](#exports). |

`talkbar-cli call …` (without `tools`) is a usage error that suggests `talkbar-cli tools call`.

## Global options

These work before or after the command:

| Option | What it does | Default |
| --- | --- | --- |
| `--output json` | Prints JSON instead of a table for `tools list`, `tools info` and `search`, and prints errors as JSON on standard output. `tools call` and `tools batch` always print JSON. | `table` |
| `--db <path>` | Opens this TalkBar database file instead of the data folder. The file must already exist and be a TalkBar database; a wrong path is refused, never created. | The data folder's database |
| `-v`, `--verbose` | Prints TalkBar's internal events on standard error as JSON lines. A command that raises none prints nothing extra. | Off |

## List and inspect operations

```shell
talkbar-cli tools list
talkbar-cli tools list --compact
talkbar-cli tools info notes.create
talkbar-cli --output json tools info notes.create
```

- `tools list` prints a table of id, kind (`read` or `mutation`), category and description, then a total. With `--output json`, each operation comes with its title, description, category, kind, default MCP switch and full input schema.
- `tools list --compact` prints one line per operation: id, kind (`read` or `change`) and summary, separated by tabs. It is the cheapest index for scripts and AI agents.
- `tools info <id>` prints the operation's description, whether it is on by default in MCP, a usage line, and the arguments it accepts as a JSON Schema. Arguments are camelCase JSON.

The list holds every operation an administrator has not blocked. For each operation's arguments and results, see the [operations reference](/mcp/operations).

## Run one operation

Pass the arguments as a JSON object:

```shell
talkbar-cli tools call sessions.list --args '{"limit":5}'
talkbar-cli tools call notes.get --args '{"noteId":"note-k2v9w8x7c6b5n4m3l2j1h0g9"}'
```

`workspaceId` is optional, as in MCP: without it, the workspace open in the app is used.

### Arguments from standard input or a file

Long text, such as a note body, is easier to pass through standard input or a file than on the command line:

| Form | Reads the arguments from |
| --- | --- |
| `--args '<json>'` | The command line. Default `{}`. |
| `--args -` | Standard input |
| `--args-file <path>` | A file. `--args-file -` also means standard input. |

::platform-tabs
#windows
```powershell
Get-Content note.json -Raw | talkbar-cli tools call notes.create --args -
```
#macos
```shell
cat note.json | talkbar-cli tools call notes.create --args -
```
::

```shell
talkbar-cli tools call notes.create --args-file note.json
```

```json [note.json]
{
  "title": "Weekly sync follow-ups",
  "markdown": "## Follow-ups\n\n- Send the revised quote to Dana\n- Book the next sync"
}
```

Files and piped text saved with a UTF-8 byte order mark, as Windows PowerShell 5 writes them, are read correctly.

::callout{icon="i-heroicons-light-bulb" color="primary"}
PowerShell and `cmd` treat quotes in JSON differently. If `--args '{...}'` gives "Invalid JSON arguments", put the JSON in a file and use `--args-file`.
::

## Run a batch

`tools batch` runs many operations in one process, in order. It is faster than one command per operation, and the open app refreshes once for all of them.

```shell
'[{"tool":"notes.list","args":{"limit":3}},{"tool":"sessions.list","args":{"limit":5}}]' | talkbar-cli tools batch
talkbar-cli tools batch --file calls.json --stop-on-error
```

- Input is a JSON array of `{"tool", "args"}`, or the MCP form `{"calls": [...], "stopOnError": true}`. It comes from `--file`, or from standard input when `--file` is left out or is `-`.
- There is no 20-operation cap, as there is in MCP. `[]` prints `[]`.
- `--stop-on-error` (or `"stopOnError": true`) stops at the first failed operation.
- The output is always one JSON array, one entry per operation that ran:

```json
[
  { "tool": "notes.list", "ok": true, "result": { "items": [], "nextCursor": null, "hasMore": false, "totalCount": 0 } },
  { "tool": "sessions.get", "ok": false, "error": { "code": "not_found", "message": "Session not found in workspace" } }
]
```

The command exits with 1 when any operation failed, after printing every result. Standard error then says how many failed, for example `1 of 2 operations failed`.

## Search

`search` is the app's universal search from the terminal, transcript snippets included:

```shell
talkbar-cli search pricing review
talkbar-cli search "renewal date" --kinds session,note --limit 10
talkbar-cli search budget --match any --output json
```

| Option | What it does | Default |
| --- | --- | --- |
| `--workspace <id>` | Searches this workspace | The workspace open in the app |
| `--project <id>` | Only items in this project | All projects |
| `--kinds <list>` | Comma-separated: `session`, `note`, `chat`, `action_item`, `document`, `memory`, `person`, `company`, `project`, `series` | All kinds |
| `--limit <n>` | Most results, 1 to 100 | 20 |
| `--match all\|any` | `all`: every word must match. `any`: reads the words as a natural-language request. | `all` |
| `--include-archived` | Also finds archived series, people, companies and knowledge cards | Off |

The table output groups matches by kind, each with its title, a snippet and its app link. `--output json` prints the same object as [`talkbar_find`](/mcp/tools#talkbar_find).

::callout{icon="i-heroicons-light-bulb" color="primary"}
`search` requires every word by default, like the search box in the app. `talkbar_find` over MCP defaults to `any`.
::

## Serve MCP

```shell
talkbar-cli serve --transport stdio
```

Starts the MCP server on standard input and output. `stdio` is the only transport and the default. Your AI app runs this command itself, with `TALKBAR_DATA_ROOT` set; see [Set up MCP](/mcp/setup). Unlike the other commands, `serve` follows every switch in **Settings → MCP Access**. `--output` has no effect on it.

## Exports

The `exports` command delivers queued exports, the same work the app does while it runs. Set up destinations in the app first; see [Exports](/sharing/exports).

```shell
talkbar-cli exports run --workspace WORKSPACE_ID --batch BATCH_ID --wait
talkbar-cli exports worker
talkbar-cli exports worker --drain
```

| Command | What it does |
| --- | --- |
| `exports run --workspace <id> --batch <id>` | Runs one pass of the export batch you name, then prints the batch's status as JSON. |
| `… --wait` | Keeps going while any delivery in the batch is scheduled or exporting. |
| `… --timeout <seconds>` | With `--wait`, gives up after this many seconds and exits with 1. Default 600. |
| `exports worker` | Runs automatic and other due exports until you stop it with `Ctrl+C`. |
| `exports worker --drain` | Runs the exports due now, then exits. |
| `exports notion connect --workspace <id> --destination <id>` | Reads a Notion token from standard input and saves it, encrypted, for that Notion destination. |

`exports` commands need `--workspace` (find it with `tools call workspace.list`). `exports notion connect` refuses to read the token from the keyboard, so it is never shown on screen; pipe it from your password manager instead:

::platform-tabs
#windows
```powershell
Get-Secret -Name TalkBarNotionToken -AsPlainText | talkbar-cli exports notion connect --workspace WORKSPACE_ID --destination DESTINATION_ID
```
#macos
Pipe your password manager’s token output to `talkbar-cli exports notion connect --workspace WORKSPACE_ID --destination DESTINATION_ID`.
::

To queue an export in the first place, use `tools call exports.enqueue`. See [Export a session](/mcp/examples#export-a-session).

## Output and errors

- **Standard output holds only results.** Results are JSON: pretty-printed at a terminal, compact when piped to another program or an AI agent.
- **Errors go to standard error** as a line starting with `Error:`. For a wrong argument, it also suggests `tools info <id>`; for an unknown operation, `tools list`.
- **With `--output json`**, a failed command also prints the error on standard output, in the same shape MCP uses:

```json
{"error":{"code":"not_found","message":"Note not found in workspace"}}
```

`tools call` prints the operation's own code (`not_found`, `invalid_arguments`, `plan_limit` and so on); other failures, such as a wrong `--db` path or an administrator rule, print `"code": "failed"`. `tools batch` prints only its results array. Read standard output on its own; don't merge standard error into it (`2>&1`).

### Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Done |
| `1` | Refused or failed. For `tools batch`, at least one operation failed. |
| `2` | Usage error: an unknown command or option, or a missing argument |

## For AI agents with a shell

An agent that can run commands, such as Claude Code or Codex, can use `talkbar-cli` instead of MCP. It costs no tool definitions, and one command can run many operations.

- Get the index with `talkbar-cli tools list --compact`, and one operation's arguments with `talkbar-cli tools info <id>`.
- Batch instead of looping: one `tools batch` replaces many `tools call` runs, and each run of `talkbar-cli` takes time to start.
- Send long text through `--args -` or `--args-file`.
- Branch on `--output json` error codes, not on the wording of messages.
- Remember that the command line ignores the MCP Access switches. Give the agent this route only if you are comfortable with it running any operation you could run yourself.

## The app refreshes itself

After a successful write, `talkbar-cli` (and the MCP server) tells the running TalkBar app what changed, over a private local channel. The app refreshes the screens and the tray menu that show those items. When the app is closed, nothing is sent and nothing slows down.

## Related

- [MCP overview](/mcp/overview)
- [Access and permissions](/mcp/access-and-permissions)
- [Errors and limits](/mcp/errors-and-limits)
- [Examples](/mcp/examples)
- [Operations reference](/mcp/operations)
