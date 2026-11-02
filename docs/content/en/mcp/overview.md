---
title: MCP and CLI overview
description: What TalkBar's MCP server and talkbar-cli let an AI assistant do with your sessions, notes and knowledge, and what always stays in the app.
navigation:
  icon: i-heroicons-information-circle
---

TalkBar can share your workspace with AI assistants such as Claude, ChatGPT and Codex through MCP (Model Context Protocol). An assistant can search your sessions, read summaries and transcripts, and, if you allow it, add notes, action items and bookmarks. Everything runs on your computer, and you choose what each assistant may do in **Settings → MCP Access**.

## Two ways in

TalkBar ships one small program, `talkbar-cli`, installed next to the app. It gives you two ways to reach the same set of operations:

| Way in | Who uses it | How it works |
| --- | --- | --- |
| **MCP server** | AI apps that speak MCP. **MCP Access** has ready-made setups for ChatGPT, Claude Desktop, Claude Code, Codex, agy CLI, Grok CLI and OpenCode; other clients, such as Cursor, use **Generic JSON**. | The AI app starts `talkbar-cli serve --transport stdio` and talks to it over standard input and output. It obeys every switch in **Settings → MCP Access**. |
| **Command line** | You, your scripts, and AI agents that can run commands | You run `talkbar-cli tools call`, `tools batch` or `search` in a terminal. It ignores the MCP Access switches, because it only does what you type. |

Both use the same data, the same ownership checks and the same [administrator rules](/settings/admin-policy). Both work while the TalkBar app is open or closed. When the app is open, it refreshes the screens that show anything an assistant or script changed.

## What an assistant can do

An assistant works with what TalkBar holds: sessions with their summaries and transcripts, notes, projects, action items, knowledge cards, people and companies, topics, bookmarks, chats, documents, planned meetings, session series and exports.

| Kind of work | Examples | Default |
| --- | --- | --- |
| **Read** | Search everything, list last week's sessions, read a summary or a full transcript, read a note, list open action items | On (once MCP is on) |
| **Write** | Create a note, add an action item or bookmark (also during a live recording), rename a session, file it under a project, approve a knowledge card, name a speaker or link a speaker to a person, rename a workspace, update your profile's name, email or job title | Off, except calendar, series, scheduler and export operations |
| **Delete** | Move a note, session, project or chat to the Trash; archive a card, person, company or series; remove an action item, topic or bookmark | Off for your content. An AI app that can ask you is always asked to confirm; other apps are refused unless you allow deletes without confirmation. |

Speaker changes work only after a session stops recording: an assistant can give a speaker a name, link the speaker to a person already in TalkBar, or remove the name. These change speaker names and person links only; what was said and the voice data stay as they are.

Nothing an assistant does deletes a trashable item for good. Trashed items can be restored in the app, and archived items stay editable. Action items, topics and bookmarks have no Trash: removing one removes it, as it does in the app.

For every operation, see the [operations reference](/mcp/operations).

## What always stays in the app

Some things an assistant can never do, whatever you switch on:

- Start, pause or stop a recording, or control a live session.
- Edit a transcript.
- Generate or regenerate a summary, or run any of TalkBar's AI features.
- Change settings, including the MCP Access switches.
- Delete anything permanently, or empty the Trash.
- Add documents or re-index them.
- Create, switch or trash workspaces (renaming one is allowed).
- Connect, sync or remove calendars in [Calendar sync](/settings/calendar-sync). An assistant can still read and prepare the meetings they import.

An assistant can still work alongside a live recording: it can read the transcript as it grows and add bookmarks, action items and knowledge cards that show up on the recording screen right away.

## Privacy

- **Local only.** The MCP server is a program on your computer, started by your AI app. It talks to that app over standard input and output and opens no network port. Your data is read from the TalkBar data folder on this computer.
- **Off until you turn it on.** MCP is off when you install TalkBar. While it is off, a connected AI app sees no TalkBar tools.
- **What the assistant receives.** An assistant gets what TalkBar shows you, transcripts included. Sessions you marked as Private AI come back with `"private": true`, and speakers you excluded from AI are marked `excludedFromAi`; they are marked, not hidden. Whatever the assistant reads goes to that AI app and its model provider, under their privacy terms. If that matters for a session, keep the read switches off, or don't connect a cloud AI app.
- **You decide.** Each operation has its own switch. Deletes are confirmed with you when your AI app supports it, and refused otherwise unless you turn on **Allow deletes without confirmation**. See [Access and permissions](/mcp/access-and-permissions).

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Private AI Mode keeps TalkBar's own AI on your computer. It does not stop an MCP client from reading a session. The assistant's model runs wherever that AI app runs it.
::

## The five tools at a glance

An MCP client does not see one tool per operation. It sees at most five tools, so connecting TalkBar costs the assistant very little context:

| Tool | What it does |
| --- | --- |
| [`talkbar_find`](/mcp/tools#talkbar_find) | Searches the workspace by name and content. Usually the first step, to get ids. |
| [`talkbar_read`](/mcp/tools#talkbar_read) | Runs read operations, one or a batch of up to 20. |
| [`talkbar_change`](/mcp/tools#talkbar_change) | Runs operations that create or change data. |
| [`talkbar_delete`](/mcp/tools#talkbar_delete) | Runs operations that trash, archive or delete. You confirm each call. |
| [`talkbar_tools`](/mcp/tools#talkbar_tools) | Lists the operations you switched on, or one operation's arguments. |

When it connects, TalkBar also gives the assistant a few lines of instructions: find ids first, then read or change, batch with `{"calls": [...]}`, and ask you to turn operations on in **Settings → MCP Access**. Most assistants need no other prompt.

## Workspaces

Every operation works in one workspace. Without a `workspaceId`, TalkBar uses the workspace open in the app at that moment, so if you switch workspaces in the app, the assistant follows. The `workspace.list` operation lists your workspaces and marks the open one. An assistant can rename a workspace (if you allow it), but creating, switching and trashing workspaces stay in the app.

## Related

- [Set up MCP](/mcp/setup)
- [Access and permissions](/mcp/access-and-permissions)
- [The five MCP tools](/mcp/tools)
- [talkbar-cli](/mcp/cli)
- [Examples](/mcp/examples)
- [Operations reference](/mcp/operations)
