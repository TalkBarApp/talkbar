---
title: Examples
description: Practical TalkBar MCP and CLI walkthroughs with real requests and responses, from asking about last week's sessions to bookmarking a live recording.
navigation:
  icon: i-heroicons-light-bulb
---

These walkthroughs show what happens when you ask an assistant to work with TalkBar: which tool it calls, with which arguments, and what comes back. Ids, times and text are made up, and long answers are shortened, but every request and response has the shape TalkBar really uses.

::callout{icon="i-heroicons-light-bulb" color="primary"}
You don't have to write these requests yourself. Your AI app writes them from your question. They are here so you know what an assistant can do and how to check its work.
::

## Ask about last week's sessions

**Setup:** turn on MCP and connect Claude Desktop, as in [Set up MCP](/mcp/setup). Reading is on by default, so nothing else is needed.

Then ask Claude: "What did I discuss in my TalkBar sessions last week?"

The assistant lists the sessions that started in that week with `talkbar_read`. Times are in milliseconds since 1970 (UTC); `startedBeforeMs` is exclusive.

```json [talkbar_read]
{
  "tool": "sessions.list",
  "args": { "startedAfterMs": 1792368000000, "startedBeforeMs": 1792972800000, "limit": 20 }
}
```

```json [Response]
{
  "items": [
    {
      "sessionId": "0b7e4d1a-93c2-4f5e-8a61-2f9d3c7b5e08",
      "title": "Weekly sync",
      "status": "complete",
      "startedAtMs": 1792747800000,
      "endedAtMs": 1792749940000,
      "projectId": "project-p8d3k2m1q9w7e5r4t6y0u2i1",
      "seriesId": null,
      "participantCount": 4,
      "pinned": false,
      "source": "live",
      "private": false
    },
    {
      "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10",
      "title": "Pricing review with Acme",
      "status": "complete",
      "startedAtMs": 1792594800000,
      "endedAtMs": 1792597632000,
      "projectId": "project-p8d3k2m1q9w7e5r4t6y0u2i1",
      "seriesId": null,
      "participantCount": 3,
      "pinned": true,
      "source": "live",
      "private": false
    }
  ],
  "nextCursor": null,
  "hasMore": false,
  "totalCount": 2
}
```

Newest sessions come first. To read the summaries, the assistant batches one `sessions.get` per session in a single call:

```json [talkbar_read]
{
  "calls": [
    { "tool": "sessions.get", "args": { "sessionId": "0b7e4d1a-93c2-4f5e-8a61-2f9d3c7b5e08" } },
    { "tool": "sessions.get", "args": { "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10" } }
  ]
}
```

The answer is `{"results": [...]}`, one entry per session, each with the full final summary, its sections, action items and decisions. Claude then writes you a recap.

## Find a session and read its transcript in pages

Ask: "Find my pricing review with Acme and show me what Dana said about the discount."

First the assistant searches, to get the session's id:

```json [talkbar_find]
{ "query": "pricing review Acme", "kinds": ["session"], "limit": 3 }
```

The first match has `"kind": "session"` and `"id": "6f1c2a9e-…"`. Then it reads the transcript. A transcript comes in pages of whole turns, 20,000 characters each by default. `speaker` keeps one person's turns (any part of the name, ignoring case):

```json [talkbar_read]
{
  "tool": "sessions.transcript",
  "args": { "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10", "speaker": "Dana", "maxChars": 4000 }
}
```

```json [Response]
{
  "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10",
  "title": "Pricing review with Acme",
  "startedAtMs": 1792594800000,
  "private": false,
  "truncated": true,
  "excludedFromAiSpeakers": [],
  "nextCursor": null,
  "totalTurns": 38,
  "turnOffset": 0,
  "nextTurnOffset": 14,
  "transcript": "[02:15] Dana Lee: We can go to twelve percent if the contract is two years.\n[02:41] Dana Lee: That's the most I can do this quarter.\n…"
}
```

`truncated: true` means there is more. The assistant passes `nextTurnOffset` back as `turnOffset` for the next page, and stops when `nextTurnOffset` is `null`:

```json [talkbar_read]
{
  "tool": "sessions.transcript",
  "args": { "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10", "speaker": "Dana", "maxChars": 4000, "turnOffset": 14 }
}
```

With `"format": "json"`, the transcript comes back as `turns` instead, each with `turnId`, `startMs` and `endMs` (milliseconds from the session start), `speaker` and `text`. Use that form when you want to bookmark a turn or tie an action item to it.

The same read from a terminal:

```powershell
talkbar-cli tools call sessions.transcript --args-file .\read.json
```

## Create a note and an action item

**Setup:** in **Settings → MCP Access**, open the **Notes** row and switch on **Create note**, then open **Action items** and switch on **Create action item** (`action_items.create`). Leave the other writes off if you don't need them.

Ask: "Write up the follow-ups from the Acme pricing review as a note on that session, and give me an action item to send the revised quote by Tuesday."

The assistant sends both writes in one `talkbar_change` batch:

```json [talkbar_change]
{
  "calls": [
    {
      "tool": "notes.create",
      "args": {
        "title": "Acme pricing follow-ups",
        "markdown": "## Follow-ups\n\n- Revised quote at 12% for a two-year term\n- Confirm the start date with legal",
        "sessionIds": ["6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10"]
      }
    },
    {
      "tool": "action_items.create",
      "args": {
        "title": "Send the revised quote to Acme",
        "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10",
        "itemType": "task",
        "dueAtMs": 1793725200000,
        "assignees": ["Alex Kim"]
      }
    }
  ],
  "stopOnError": true
}
```

```json [Response]
{
  "results": [
    {
      "tool": "notes.create",
      "ok": true,
      "result": {
        "noteId": "note-k2v9w8x7c6b5n4m3l2j1h0g9",
        "title": "Acme pricing follow-ups",
        "pinned": false,
        "sessionId": null,
        "updatedAt": 1793369525000,
        "projectId": null,
        "sessionIds": ["6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10"]
      }
    },
    {
      "tool": "action_items.create",
      "ok": true,
      "result": {
        "itemId": "outcome-x4c8v2b6n1m9q3w7e5r0t2y8",
        "itemType": "task",
        "title": "Send the revised quote to Acme",
        "status": "open",
        "dueAtMs": 1793725200000,
        "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10",
        "sessionTitle": "Pricing review with Acme",
        "projectId": "project-p8d3k2m1q9w7e5r4t6y0u2i1",
        "assignees": [{ "name": "Alex Kim", "contactId": null }],
        "origin": "manual",
        "sources": [],
        "sessionStatus": "complete"
      }
    }
  ]
}
```

The action item response is shortened. A note filed under a session shows on that session's page; `sessionId` stays `null` because it is not the session's own note. The action item takes the session's project unless you give another. If TalkBar is open, both show up right away.

## Add a bookmark to a live recording

**Setup:** switch on **Add marker** (`markers.create`) under **Markers**. Recording itself always stays in the app.

While you record, ask: "Bookmark the moment Sam mentioned the budget freeze."

First the assistant finds the session that is recording now:

```json [talkbar_read]
{ "tool": "sessions.recording" }
```

```json [Response]
{
  "recording": {
    "sessionId": "c3a9f2e7-1d84-4b6a-9e05-7f2b8d1c6a34",
    "title": "Budget planning",
    "startedAtMs": 1793368800000,
    "elapsedMs": 725000,
    "revision": "…",
    "appRunning": true,
    "stale": false
  }
}
```

`recording` is `null` when nothing is recording. `stale: true` would mean TalkBar is not running, so the session only looks like it is recording.

Then it reads the transcript so far as JSON. A read with `cursor: "0:"` returns turns in the order they changed, plus a `nextCursor` to fetch only what is new next time:

```json [talkbar_read]
{
  "tool": "sessions.transcript",
  "args": { "sessionId": "c3a9f2e7-1d84-4b6a-9e05-7f2b8d1c6a34", "format": "json", "cursor": "0:" }
}
```

```json [Response]
{
  "sessionId": "c3a9f2e7-1d84-4b6a-9e05-7f2b8d1c6a34",
  "title": "Budget planning",
  "startedAtMs": 1793368800000,
  "private": false,
  "truncated": false,
  "excludedFromAiSpeakers": [],
  "nextCursor": "1793369523871:turn-42",
  "recording": true,
  "turns": [
    {
      "turnId": "turn-42",
      "chunkId": "chunk-17",
      "provisional": true,
      "startMs": 641000,
      "endMs": 652500,
      "speaker": "Sam Ortiz",
      "isUser": false,
      "excludedFromAi": false,
      "text": "Heads up, finance just told us there's a budget freeze until January.",
      "translatedText": null
    }
  ]
}
```

It adds the bookmark at that turn, with a short note:

```json [talkbar_change]
{
  "tool": "markers.create",
  "args": {
    "sessionId": "c3a9f2e7-1d84-4b6a-9e05-7f2b8d1c6a34",
    "turnId": "turn-42",
    "body": "Budget freeze until January"
  }
}
```

```json [Response]
{
  "markerId": "…",
  "sessionId": "c3a9f2e7-1d84-4b6a-9e05-7f2b8d1c6a34",
  "kind": "bookmark",
  "body": "Budget freeze until January",
  "quote": null,
  "atMs": 641000,
  "turnId": "turn-42",
  "chunkId": null,
  "pointId": null,
  "color": "",
  "updatedAt": 1793369525000,
  "sessionStatus": "recording"
}
```

The bookmark appears on the recording screen right away. Instead of `turnId`, an assistant can place a bookmark with `chunkId`, `pointId` (a timeline point from `sessions.timeline`), `atMs` (a moment from the session start) or `quote` (the words it is about).

## Export a session

**Setup:** add an export destination in the app first, for example a folder in your Obsidian vault; see [Exports](/sharing/exports). Export operations are on by default once MCP is on.

Ask: "Export the Acme pricing review to my Obsidian vault."

The assistant looks up your destinations:

```json [talkbar_read]
{ "tool": "exports.config" }
```

```json [Response]
{
  "destinations": [
    {
      "destinationId": "5d2e7a10-8c3b-4f69-b1e4-0a9c6d3f2b87",
      "workspaceId": "…",
      "name": "Obsidian vault",
      "format": "obsidian",
      "location": "C:/Users/you/Documents/Vault/Meetings",
      "enabled": true,
      "layout": "flat",
      "credentialRef": null
    }
  ],
  "rules": []
}
```

Then it queues the export, choosing what to include:

```json [talkbar_change]
{
  "tool": "exports.enqueue",
  "args": {
    "sessionIds": ["6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10"],
    "destinationIds": ["5d2e7a10-8c3b-4f69-b1e4-0a9c6d3f2b87"],
    "selection": { "summary": true, "transcript": true, "metadata": true, "notes": true, "audio": "none" }
  }
}
```

The answer is the new export batch, with its `batchId`, a `status` and one entry in `deliveries` per session and destination. `exports.enqueue` only queues the work. The TalkBar app delivers queued exports while it runs. To deliver now, the assistant can call `exports.run` with the `batchId`, then check with `exports.status`:

```json [talkbar_change]
{ "tool": "exports.run", "args": { "batchId": "…" } }
```

A delivered entry has `"status": "exported"` and its `location`. A session that is still recording cannot be queued; that call answers `session_recording`.

From a terminal, `talkbar-cli exports run --workspace WORKSPACE_ID --batch BATCH_ID --wait` keeps delivering until the batch is done. See [talkbar-cli exports](/mcp/cli#exports).

## Delete safely

**Setup:** switch on **Move note to Trash** (`notes.trash`) under **Notes**. Keep **Allow deletes without confirmation** off.

Ask: "Trash the old Acme draft note."

The assistant finds the note with `talkbar_find`, then calls `talkbar_delete`:

```json [talkbar_delete]
{ "tool": "notes.trash", "args": { "noteId": "note-a1s2d3f4g5h6j7k8l9z0x1c2" } }
```

Before anything runs, your AI app shows TalkBar's question:

```text
An assistant wants TalkBar to run:
- notes.trash {"noteId":"note-a1s2d3f4g5h6j7k8l9z0x1c2"}
Confirm to run it, or decline to run nothing.
```

::screenshot{src="/screenshots/mcp/delete-confirmation-prompt.png" alt="An MCP client that supports confirmation requests showing TalkBar's question: the text 'An assistant wants TalkBar to run:' with the notes.trash line and note id, a confirm field, and the client's accept and decline controls" caption="Confirming a delete in your AI app"}
::

If you decline, or don't answer within 5 minutes, nothing runs and the assistant gets:

```json
{ "error": { "code": "declined", "message": "The user did not confirm, so nothing ran" } }
```

If you confirm, the note moves to the Trash:

```json
{ "noteId": "note-a1s2d3f4g5h6j7k8l9z0x1c2", "trashed": true }
```

Changed your mind? `notes.restore` brings it back. It runs through `talkbar_change`, so it needs no confirmation, but you have to switch on **Restore note**:

```json [talkbar_change]
{ "tool": "notes.restore", "args": { "noteId": "note-a1s2d3f4g5h6j7k8l9z0x1c2" } }
```

```json [Response]
{ "noteId": "note-a1s2d3f4g5h6j7k8l9z0x1c2", "restored": true }
```

`notes.trash.list` lists what is in the notes Trash. Nothing an assistant does deletes a note for good; emptying the Trash stays in the app.

If your AI app cannot show questions from a server, the delete is refused with `confirmation_unavailable` instead, and nothing runs. See [Apps that cannot ask](/mcp/access-and-permissions#apps-that-cannot-ask).

## Related

- [Set up MCP](/mcp/setup)
- [The five MCP tools](/mcp/tools)
- [Access and permissions](/mcp/access-and-permissions)
- [Errors and limits](/mcp/errors-and-limits)
- [talkbar-cli](/mcp/cli)
- [Operations reference](/mcp/operations)
