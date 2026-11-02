---
title: Access and permissions
description: Choose which TalkBar operations an AI assistant may run, how deletes are confirmed, and how administrator rules and the CLI fit in.
navigation:
  icon: i-heroicons-lock-closed
---

You decide what a connected AI assistant may do, one operation at a time, in **Settings → MCP Access**. Reading is on by default, changes to your content are off, and anything that trashes, archives or deletes is confirmed with you when your AI app can ask. Apps that cannot ask are refused, unless you turn on **Allow deletes without confirmation**.

## The MCP switch

The switch at the top right of **MCP Access** turns MCP on or off for every connected app. It is off when you install TalkBar.

- **Off:** a connected app sees no TalkBar tools, and every operation answers that it is turned off. The permission switches below are greyed out.
- **On:** a connected app sees the [TalkBar tools](/mcp/tools) and can run the operations you switched on.

## Read and Write switches

The **Permissions** card has one row per kind of data: **Sessions**, **Notes**, **Projects**, **Action items**, **Knowledge**, **People**, **Topics**, **Markers**, **Chats**, **Documents**, **Calendar**, **Session Series**, **Scheduler**, **Exports**, **Workspace** and **Profile**.

Each row has two switches:

| Switch | What it allows | Default |
| --- | --- | --- |
| **Read** | Listing, searching and reading that kind of data. Reading never changes anything. | On |
| **Write** | Creating, changing, trashing, archiving and restoring that kind of data. Nothing is deleted permanently. | Off, except Calendar, Session Series, Scheduler and Exports |

Next to each row switch, a count such as `3/7` shows how many of its operations are on. The switch shows as on only when all of them are; switching a partly-on row turns them all on. Operations your organization blocked are left out of both the count and the switch; a row whose operations are all blocked shows a locked switch. The **Read** and **Write** badges in the card header count how many operations are on in total.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
A **Write** switch covers every change for that kind of data, including moving items to the Trash. TalkBar still asks you before each trash, archive or delete (see [Confirming deletes](#confirming-deletes)), but turn on only what you need.
::

### Single operations

Open a row (click its name) to see each operation with its own switch, a short description and its id, such as `notes.create`. Switch single operations on or off here when a whole row is more than you want, for example to let an assistant add notes but not trash them.

Operations that start work or remove something carry a **Confirmation advised** badge. The badge is a hint for you and for AI apps; the confirmation TalkBar enforces is the one for deletes described below.

::screenshot{src="/screenshots/mcp/permissions-notes-expanded.png" alt="The Permissions card on Settings → MCP Access with the Notes row expanded: under Read, List Notes, Get Note and List trashed notes switched on; under Write, Create note and Append to note switched on and Move note to Trash switched off, showing its Confirmation advised badge" caption="Choosing single operations for notes"}
::

### Writes that are on by default

These write operations are on as soon as you turn MCP on. They plan meetings and move exports and background jobs along, rather than change your sessions, notes or knowledge:

| Area | Operations on by default |
| --- | --- |
| Calendar | `calendar.schedule`, `calendar.prepare`, `calendar.prep.edit`, `calendar.move`, `calendar.snooze`, `calendar.start`, `calendar.skip`, `calendar.cancel` |
| Session Series | `series.create`, `series.update`, `series.sessions.assign`, `series.schedule.set`, `series.archive` |
| Scheduler | `scheduler.job.cancel`, `scheduler.job.retry` |
| Exports | `exports.destination.save`, `exports.destination.delete`, `exports.rule.save`, `exports.rule.delete`, `exports.enqueue`, `exports.run`, `exports.cancel`, `exports.retry`, `exports.resolve` |

`calendar.skip`, `calendar.cancel`, `series.archive`, `exports.destination.delete` and `exports.rule.delete` run through `talkbar_delete`, like every delete, so they are confirmed with you (or refused for apps that cannot ask). `calendar.start` never records: recording only starts in the app.

### Quick buttons

| Button | What it does |
| --- | --- |
| **Reset to Default** | Puts every operation back to its default. Shown only when something differs from the defaults. |
| **Enable All** | Turns on every operation, after a warning. |
| **Disable All** | Turns off every operation, after a warning. Connected apps can then read and change nothing. |

## Which tool runs what

TalkBar keeps reads, changes and deletes in separate MCP tools, so your AI app can treat them differently, for example run reads freely but ask you before changes:

| Tool | Runs | Listed when |
| --- | --- | --- |
| `talkbar_read` | Read operations | At least one read is on |
| `talkbar_change` | Writes that remove nothing | At least one of them is on |
| `talkbar_delete` | Trash, archive and delete operations | At least one of them is on |

The operations that only `talkbar_delete` runs are: `notes.trash`, `projects.trash`, `sessions.trash`, `chats.trash`, `knowledge.archive`, `contacts.archive`, `organizations.archive`, `series.archive`, `action_items.remove`, `topics.delete`, `markers.delete`, `exports.destination.delete`, `exports.rule.delete`, `calendar.cancel` and `calendar.skip`.

Restoring something from the Trash, unarchiving and other changes go through `talkbar_change`. See [The five MCP tools](/mcp/tools) for how each tool is called.

## When a change takes effect

TalkBar checks your switches on every call, so a change in **MCP Access** applies to the next call without restarting anything.

- A switched-off operation answers with `turned_off` and the message "… is turned off in TalkBar. Ask the user to turn it on in TalkBar Settings > MCP Access." A good assistant then asks you.
- `talkbar_tools` lists switched-off operations under `off`, so the assistant can tell you which switch to turn on instead of assuming the operation does not exist.
- When a switch changes the tool list itself (for example, the first write turned on adds `talkbar_change`), TalkBar tells the app at its next call so it can refresh its tools. See [Tool list changes](/mcp/tools#tool-list-changes).

## Confirming deletes

Before a `talkbar_delete` call runs, TalkBar asks you to confirm it through your AI app, using MCP's way for a server to ask the user a question (called elicitation, in its form mode). This works only in apps that support it; for apps that cannot ask, see [Apps that cannot ask](#apps-that-cannot-ask). The question lists each operation and its ids:

```text
An assistant wants TalkBar to run:
- notes.trash {"noteId":"note-k2v9w8x7c6b5n4m3l2j1h0g9"}
Confirm to run it, or decline to run nothing.
```

| Your answer | What happens |
| --- | --- |
| Confirm | The call runs. |
| Decline, cancel, or no answer within 5 minutes | Nothing runs. The assistant gets `declined`. |

A few details:

- A call that would be refused anyway (an unknown or switched-off operation, a missing or wrong argument) is refused at once, without a question.
- A batch is asked about as a whole, with every operation in it listed. Other writes may share the batch.
- The question is in English.
- The command line never asks. It runs only what you typed yourself.

### Apps that cannot ask

Some AI apps cannot show a question from a server. For those, TalkBar refuses every `talkbar_delete` call with `confirmation_unavailable`, and nothing runs, unless you turn on **Allow deletes without confirmation** in the **Server Settings** card.

| Setting | What it does | Default |
| --- | --- | --- |
| **Allow deletes without confirmation** | Lets AI apps that cannot ask you first move items to the Trash, archive or delete them. An app that can ask is still always asked. | Off |

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
With this setting on, an app that cannot ask runs every delete you switched on without checking with you. Turn on only the delete operations you are comfortable with, and remember that trashed items can be restored in the app.
::

## Audit logging

**Audit logging** in **Server Settings** (off by default) makes the MCP server write a line for every tool call to its error output (stderr), with the operation and its arguments, and another when the call succeeds. Your AI app usually keeps that output in its MCP logs. Use it for debugging or to review what an assistant did. Export calls are logged without their arguments. The command line does not write audit lines.

## Administrator rules

If your organization manages TalkBar on this computer, an administrator can limit MCP and the command line with the rules under **AI assistants and command line** on the [Admin policy](/settings/admin-policy) page. You see it on **MCP Access**:

| Rule | What you see | Effect |
| --- | --- | --- |
| **MCP server** set to **Deny** | The MCP switch is locked, with "Your organization turned off the MCP server." | `talkbar-cli serve` refuses to start. The command line's other commands still work. |
| **Command-line tool** set to **Deny** | The MCP switch is locked, with "Your organization turned off the command-line tool." | Every `talkbar-cli` command is refused, including the MCP server. Only `--help` and `--version` work. |
| **Allowed MCP tools** set to **Only these** | "Your organization limits which tools AI assistants can use." Blocked operations show a lock and **Blocked by your organization**. | Blocked operations stay off whatever your switches say, for MCP and the command line alike. `talkbar-cli search` needs **Meeting content**; `talkbar-cli exports run` and `exports worker` need **Exports**. |

**Allowed MCP tools** allows operations in groups. With no group selected, nothing can run:

| Group | Covers |
| --- | --- |
| Lists and counts | `workspace.list`, `workspace.stats`, `sessions.list`, `sessions.stats`, `sessions.recording`, `projects.list`, `plan.get`, and calendar and series reads |
| Meeting content | Every other read, including search, transcripts, `exports.preview` and `calendar.prep` |
| Exports | Export operations, except `exports.preview` |
| Scheduling changes | Calendar and series writes |
| Background jobs | `scheduler.*` operations |
| Changes to items | Every other write: sessions, notes, projects, action items, knowledge, people, topics, markers, chats, documents, workspace and profile |

A blocked operation is left out of the tool list and of `talkbar_tools`. If an assistant calls it anyway, it gets `failed` with a message saying the setting is managed by your organization.

The export rules apply on top of these groups, to MCP and the command line alike. They refuse with `failed` even when **Exports** is allowed:

| Rule | What it refuses |
| --- | --- |
| **Session exports** | **Deny** refuses queuing and delivering exports. **Local folders only** refuses Notion destinations. |
| **Allowed export folders** | Saving, queuing or delivering to a folder outside the list. |
| **Automatic exports** | **Deny** refuses `exports.rule.save` for a rule that exports, and stops automatic deliveries. |
| **Prevent changes to export settings** | Saving or deleting destinations and rules. Exports to the existing destinations keep working. |

TalkBar picks up a rule change within about 30 seconds, so a running MCP server or export worker follows it without a restart. An export in progress stops before its next step.

## What the command line ignores

`talkbar-cli tools call`, `tools batch` and `search` run what you type, as you. They:

- **Ignore** the MCP switch, every Read and Write switch, and **Allow deletes without confirmation**. The command line never asks for confirmation.
- **Keep** the administrator rules, your plan limits and every ownership check: a command reaches only your own workspaces in that data folder, and nothing is deleted permanently.

`talkbar-cli serve` is the MCP server, so it follows every switch on this page. See [talkbar-cli](/mcp/cli).

## Related

- [MCP overview](/mcp/overview)
- [Set up MCP](/mcp/setup)
- [The five MCP tools](/mcp/tools)
- [Errors and limits](/mcp/errors-and-limits)
- [MCP Access settings](/settings/mcp-access)
- [Admin policy](/settings/admin-policy)
- [Operations reference](/mcp/operations)
