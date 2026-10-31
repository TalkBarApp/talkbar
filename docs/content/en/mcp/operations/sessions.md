---
title: Sessions
description: MCP and CLI operations to list, read, file, pin, trash and restore sessions, read transcripts and timelines, name speakers and manage session cards.
navigation:
  icon: i-heroicons-microphone
---

Session operations read what the session page shows (summary, transcript, timeline, figures, notes, documents and cards) and make the changes you can make there: rename, file under a project, pin, name speakers, add cards, trash and restore. Every operation also takes an optional `workspaceId`. See [How to read this reference](/mcp/operations#how-to-read-this-reference) for the conventions.

| Operation | Kind | Tool | On | Group |
| --- | --- | --- | --- | --- |
| [`sessions.list`](#sessionslist) | Read | `talkbar_read` | On | `metadata` |
| [`sessions.get`](#sessionsget) | Read | `talkbar_read` | On | `content` |
| [`sessions.recording`](#sessionsrecording) | Read | `talkbar_read` | On | `metadata` |
| [`sessions.stats`](#sessionsstats) | Read | `talkbar_read` | On | `metadata` |
| [`sessions.transcript`](#sessionstranscript) | Read | `talkbar_read` | On | `content` |
| [`sessions.timeline`](#sessionstimeline) | Read | `talkbar_read` | On | `content` |
| [`sessions.notes`](#sessionsnotes) | Read | `talkbar_read` | On | `content` |
| [`sessions.documents`](#sessionsdocuments) | Read | `talkbar_read` | On | `content` |
| [`sessions.live_cards`](#sessionslive_cards) | Read | `talkbar_read` | On | `content` |
| [`sessions.trash.list`](#sessionstrashlist) | Read | `talkbar_read` | On | `content` |
| [`sessions.rename`](#sessionsrename) | Write | `talkbar_change` | Off | `contentChanges` |
| [`sessions.move`](#sessionsmove) | Write | `talkbar_change` | Off | `contentChanges` |
| [`sessions.pin`](#sessionspin) | Write | `talkbar_change` | Off | `contentChanges` |
| [`sessions.speakers.rename`](#sessionsspeakersrename) | Write | `talkbar_change` | Off | `contentChanges` |
| [`sessions.speakers.link`](#sessionsspeakerslink) | Write | `talkbar_change` | Off | `contentChanges` |
| [`sessions.speakers.unlink`](#sessionsspeakersunlink) | Write | `talkbar_change` | Off | `contentChanges` |
| [`sessions.cards.add`](#sessionscardsadd) | Write | `talkbar_change` | Off | `contentChanges` |
| [`sessions.cards.attach`](#sessionscardsattach) | Write | `talkbar_change` | Off | `contentChanges` |
| [`sessions.cards.detach`](#sessionscardsdetach) | Write | `talkbar_change` | Off | `contentChanges` |
| [`sessions.trash`](#sessionstrash) | Write | `talkbar_delete` | Off | `contentChanges` |
| [`sessions.restore`](#sessionsrestore) | Write | `talkbar_change` | Off | `contentChanges` |

## Working with the live session

An assistant can work with the session you are recording, and what it adds shows on the recording screen right away:

1. Call `sessions.recording` to find it, and check `stale`.
2. Read with `sessions.transcript` using `cursor: "0:"` and `format: "json"`, then keep passing the returned `nextCursor`. `sessions.timeline` gives the points written so far, and `sessions.stats` gives provisional speakers.
3. Add markers (`markers.create`), action items (`action_items.create`) and knowledge cards (`sessions.cards.add`, `sessions.cards.attach`), or append to the session's note (`notes.append`).

While recording, the transcript, timeline points and speakers are read-only for assistants (speaker edits answer `session_recording`). Recording itself is controlled only in the app, and the summary and AI keywords come after recording stops.

## `sessions.list`

Pages session metadata in a workspace, newest start first, with filters for project, series, status, start time, topic and title.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments**

::field-group
  ::field{name="projectId" type="string"}
  Only sessions filed under this project.
  ::
  ::field{name="seriesId" type="string"}
  Only sessions in this series (from `series.list`).
  ::
  ::field{name="status" type="string"}
  Only sessions in this state. `recording` answers whether a session is recording now. One of `recording`, `open`, `interrupted`, `complete`.
  ::
  ::field{name="startedAfterMs" type="integer"}
  Only sessions that started at or after this time (epoch ms, inclusive).
  ::
  ::field{name="startedBeforeMs" type="integer"}
  Only sessions that started before this time (epoch ms, exclusive).
  ::
  ::field{name="search" type="string"}
  Case-insensitive match on part of the session title.
  ::
  ::field{name="topicId" type="string"}
  Only sessions assigned this topic (from `topics.list`).
  ::
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 100. Default `40`.
  ::
  ::field{name="cursor" type="string"}
  The `nextCursor` from the previous page. Must not be empty.
  ::
::

**Returns:** `{items, nextCursor, hasMore, totalCount}`. Each item has `sessionId`, `title`, `status`, `startedAtMs`, `endedAtMs`, `projectId`, `seriesId`, `participantCount`, `pinned`, `source` and `private`.

- Lists sessions that are not in the Trash; use `sessions.trash.list` for those.
- Pass `nextCursor` back as `cursor` for the next page.

```json
{"tool": "sessions.list", "args": {"projectId": "proj_123", "status": "complete", "limit": 20}}
```

## `sessions.get`

Reads one session: its metadata, final summary text and sections, action items and decisions.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
::

**Returns:** The `sessions.list` fields plus `speakerCount`, `workspaceId`, `sessionType`, `createdAt`, `updatedAt`, `revision`, `summary` (`{text, sections, generatedBy}`, where `generatedBy` names the model and provider and says whether the summary was edited), `actionItems` and `decisions`.

- `participantCount` counts everyone on the session, including people who never spoke; `speakerCount` counts those who talked.
- `revision` changes whenever anything on the session page changes, so an assistant can poll it cheaply and re-read only when it moves.
- While the session records: `recording: true`, `summaryPending: true` and `summary: null`. The summary is written after recording stops.
- Use `sessions.transcript` for the transcript. A session in the Trash is `not_found`.

```json
{"tool": "sessions.get", "args": {"sessionId": "ses_123"}}
```

## `sessions.recording`

Returns the session recording right now, or `null` when nothing is recording. Call it first when working with a live session, then use its `sessionId`.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments:** none besides `workspaceId`.

**Returns:** `{recording: null}` or `{recording: {sessionId, title, startedAtMs, elapsedMs, revision, appRunning, stale}}`.

- `elapsedMs` is wall-clock time since the start, pauses included (only the app knows about pauses).
- `appRunning` says whether TalkBar is running for this data folder (`null` when it cannot tell). `stale: true` means TalkBar is not running, so the session only looks like it is recording until TalkBar next starts and marks it interrupted.
- Never guess "the newest session" for the live one: use this operation.

```json
{"tool": "sessions.recording", "args": {}}
```

## `sessions.stats`

Reads a session's figures: how long it recorded, its breaks, turns, characters, each speaker's talk time, and which model wrote its summary for every saved length. No transcript or summary text.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
::

**Returns:** `sessionId`, `status`, `sessionType`, `private`, `startedAtMs`, `endedAtMs`, `elapsedMs`, `recordedMs`, `recordingRuns`, `breaks`, `turns`, `transcriptChars`, `speakerCount`, `talkTimeMs`, `speakers` and `summary`. Each speaker has `speakerId`, `contactId` (the linked person, else `null`), `name`, `isUser`, `excludedFromAi`, `talkTimeMs` and `share`. `summary` describes the selected length and model, and lists every saved length.

- `speakerId` is what the `sessions.speakers.*` writes take.
- While the session records, speakers come from the live transcript: `speakerId: null`, plus `turns` and `provisional: true`.

```json
{"tool": "sessions.stats", "args": {"sessionId": "ses_123"}}
```

## `sessions.transcript`

Reads a session's transcript as the session page shows it, with speaker names and times, in pages of whole turns.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
  ::field{name="speaker" type="string"}
  Only turns whose speaker name contains this text (case-insensitive). Use the `speaker` value `contacts.sessions` returns to read one person's turns.
  ::
  ::field{name="turnOffset" type="integer"}
  The turn to start at: `nextTurnOffset` from the previous page. Cannot be combined with `cursor`.
  ::
  ::field{name="maxChars" type="integer"}
  Page size in characters. From 1,000 to 200,000. Default `20000`.
  ::
  ::field{name="format" type="string"}
  `text` (default) returns `[mm:ss] Name: text` lines; `json` returns turn objects with ids.
  ::
  ::field{name="cursor" type="string"}
  Follow a transcript as it changes. Start with `"0:"`, then pass each answer's `nextCursor` to get only the turns added or changed since.
  ::
::

**Returns:** `sessionId`, `title`, `startedAtMs`, `private`, `truncated`, `excludedFromAiSpeakers`, then `transcript` (text) or `turns` (json). Paged reads add `totalTurns`, `turnOffset` and `nextTurnOffset`; cursor reads add `nextCursor` instead. Json turns carry `turnId`, `chunkId`, `startMs`, `endMs`, `speaker`, `isUser`, `excludedFromAi`, `text` and `translatedText`.

- Pages hold whole turns. A `turnOffset` past the end is refused.
- `turnId` and `chunkId` are what `markers.create` and `action_items.create` take to point at a moment.
- While the session records, turns can be `provisional: true` and the answer carries `recording: true`.
- Speakers excluded from AI are marked, not hidden. Removed turns are not reported by a cursor read; when `revision` changes, read again in full.

```json
{"tool": "sessions.transcript", "args": {"sessionId": "ses_123", "format": "json", "maxChars": 50000}}
```

## `sessions.timeline`

Reads a session's timeline with times, as the session page shows it.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
::

**Returns:** `{sessionId, title, private, points: [{pointId, at, atMs, text, translatedText, edited}]}`. `at` is `mm:ss` (`h:mm:ss` past an hour, `--:--` when a point has no time).

- `pointId` is what `markers.create` and `action_items.create` take to point at a timeline entry.

```json
{"tool": "sessions.timeline", "args": {"sessionId": "ses_123"}}
```

## `sessions.notes`

Lists the session's own note and the notes added to it. Read one in full with `notes.get`.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
::

**Returns:** `{sessionId, private, notes: [{noteId, title, role, preview, updatedAt}]}`. `role` is `session` for the session's own note and `added` for notes added to it; `preview` is the first 160 characters.

```json
{"tool": "sessions.notes", "args": {"sessionId": "ses_123"}}
```

## `sessions.documents`

Lists the documents added to a session. Read one with `documents.read`.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
::

**Returns:** `{sessionId, private, documents: [{documentId, title, fileType, status, pinned, projectId, updatedAt}]}`.

## `sessions.live_cards`

Lists the knowledge cards and earlier action items brought into a session, and the moments the conversation came back to each.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
::

**Returns:** `{sessionId, private, cards, broughtInActionItems, capturedActionItems}`. Cards have `memoryId`, `title`, `body`, `type`, `status` and `cameUp`. `cameUp` is `null` or `{count, first, last, moments: [{at, atMs, heard, matchedTerms}]}`, where `heard` is the words heard at that moment. Action items use the `action_items.get` shape; brought-in items also carry `statusWhenBroughtIn` and `cameUp`.

## `sessions.trash.list`

Lists the sessions in the Trash.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 200. Default `50`.
  ::
::

**Returns:** `{sessions: [{sessionId, title, trashedAt}]}`.

## `sessions.rename`

Changes a session's title. Works while the session records.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
  ::field{name="title" type="string" required}
  The new title. Must not be empty; surrounding spaces are trimmed.
  ::
::

**Returns:** `{sessionId, title}` plus `sessionStatus` (and a `warning` when the session was interrupted, or is recording while TalkBar is not running).

```json
{"tool": "sessions.rename", "args": {"sessionId": "ses_123", "title": "Q4 roadmap review"}}
```

## `sessions.move`

Files a session under a project, or takes it out of its project.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
  ::field{name="projectId" type="string | null" required}
  The project to file it under, or `null` to take it out of its project. Required: send `null` explicitly to remove.
  ::
  ::field{name="moveKnowledge" type="boolean"}
  Move the session's knowledge cards along with it. Default `true`.
  ::
::

**Returns:** `{sessionId, projectId, previousProjectId}` plus `sessionStatus` (and a `warning` when the session was interrupted, or is recording while TalkBar is not running).

- The target project must exist and not be in the Trash.

```json
{"tool": "sessions.move", "args": {"sessionId": "ses_123", "projectId": "proj_456"}}
```

## `sessions.pin`

Pins or unpins a session.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
  ::field{name="pinned" type="boolean" required}
  `true` pins, `false` unpins.
  ::
::

**Returns:** `{sessionId, pinned}` plus `sessionStatus` (and a `warning` when the session was interrupted, or is recording while TalkBar is not running). Reads show the state as `pinned`, and `revision` changes.

## `sessions.speakers.rename`

Names a speaker in a session that is not recording, as the speaker menu in the app does. The speaker is linked to the person with that name, who is created if there is none.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session. Find ids with `sessions.list` or `talkbar_find`; the live session's id comes from `sessions.recording`.
  ::
  ::field{name="speakerId" type="string" required}
  `speakerId` from `sessions.stats`.
  ::
  ::field{name="name" type="string" required}
  The speaker's name. 1 to 40 characters after trimming.
  ::
::

**Returns:** `{sessionId, speakerId, name, contactId}`.

- A person TalkBar created for this speaker alone (not yet confirmed, linked to nothing else) is renamed instead of creating another.
- When several people have the name, the call fails and lists them, so you can link one with `sessions.speakers.link`.
- A name another speaker in the session already has is refused: combine the two speakers in the app instead.
- A recording session is refused with `session_recording`; an unknown speaker is `not_found`. What was said and voice data are not changed.

```json
{"tool": "sessions.speakers.rename", "args": {"sessionId": "ses_123", "speakerId": "spk_2", "name": "Dana Lee"}}
```

## `sessions.speakers.link`

Links a speaker in a session that is not recording to a person already in TalkBar. The speaker takes the person's name.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session. Find ids with `sessions.list` or `talkbar_find`; the live session's id comes from `sessions.recording`.
  ::
  ::field{name="speakerId" type="string" required}
  `speakerId` from `sessions.stats`.
  ::
  ::field{name="contactId" type="string" required}
  A person from `contacts.list`.
  ::
::

**Returns:** `{sessionId, speakerId, name, contactId}`.

- Never creates a person: an unknown or archived person is `not_found`.
- A recording session is refused with `session_recording`.

## `sessions.speakers.unlink`

Removes a speaker's name and person link in a session that is not recording, as **Remove name** does in the app. The speaker goes back to Speaker 1, Speaker 2 and so on, numbered by when they first speak.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session. Find ids with `sessions.list` or `talkbar_find`; the live session's id comes from `sessions.recording`.
  ::
  ::field{name="speakerId" type="string" required}
  `speakerId` from `sessions.stats`.
  ::
::

**Returns:** `{sessionId, speakerId, name, contactId}`.

- A recording session is refused with `session_recording`.

## `sessions.cards.add`

Creates a knowledge card in a session, also while it is recording. The card shows on the recording screen right away.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
  ::field{name="title" type="string" required}
  The card title. Must not be empty.
  ::
  ::field{name="body" type="string"}
  The card text.
  ::
  ::field{name="type" type="string"}
  The card type. One of `fact`, `preference`, `decision`, `commitment`, `risk`, `open_question`, `relationship_context`, `instruction`, `key_moment`, `contract_term`, `pricing_detail`, `technical_detail`. Default `fact`.
  ::
  ::field{name="sessionOnly" type="boolean"}
  Keep the card in this session only. Otherwise it is filed the way the app files a card added during a session: under the session's project when it has one (unless the session's memory setting keeps cards in the session), else in this session only.
  ::
::

**Returns:** The card (`memoryId`, `title`, `type`, `status`, `pinned`, `projectId`, `sessionOnly`, `updatedAt`) with `sessionId` and `sessionStatus` (and a `warning` when the session was interrupted, or is recording while TalkBar is not running).

- A session holds up to 24 cards; adding a 25th is refused with `limit_reached`.

```json
{"tool": "sessions.cards.add", "args": {"sessionId": "ses_123", "title": "Budget capped at $40k", "type": "decision"}}
```

## `sessions.cards.attach`

Brings an existing knowledge card into a session, also while it is recording.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
  ::field{name="memoryId" type="string" required}
  The card, from `knowledge.list`.
  ::
::

**Returns:** `{memoryId, sessionId, attached: true, alreadyAttached}` plus `sessionStatus` (and a `warning` when the session was interrupted, or is recording while TalkBar is not running).

- A session holds up to 24 cards (`limit_reached` past that). A card from another workspace is `not_found`.

## `sessions.cards.detach`

Takes a knowledge card out of a session. The card itself is kept, so this runs through `talkbar_change`.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
  ::field{name="memoryId" type="string" required}
  The card, from `sessions.live_cards` or `knowledge.list`.
  ::
::

**Returns:** `{memoryId, sessionId, attached: false}` plus `sessionStatus` (and a `warning` when the session was interrupted, or is recording while TalkBar is not running).

## `sessions.trash`

Moves a finished session to the Trash. It can be restored.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session. Find ids with `sessions.list` or `talkbar_find`; the live session's id comes from `sessions.recording`.
  ::
::

**Returns:** `{sessionId, trashed: true}`.

- A session that is still recording is refused with `session_recording`.
- Trashing a session already in the Trash succeeds and keeps the first trash date.
- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

```json
{"tool": "sessions.trash", "args": {"sessionId": "ses_123"}}
```

## `sessions.restore`

Brings a session back from the Trash.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session. Find ids with `sessions.list` or `talkbar_find`; the live session's id comes from `sessions.recording`.
  ::
::

**Returns:** `{sessionId, restored: true}`. Restoring a session that is not in the Trash returns the same answer.

- Counts against your plan's session limit: at the limit it is refused with `plan_limit` (`limit: "sessions"`). `plan.get` shows the limit.

## Related

- [Operations reference](/mcp/operations)
- [Topics and markers](/mcp/operations/topics-and-markers) (session keywords and markers)
- [Action items](/mcp/operations/action-items)
- [Knowledge](/mcp/operations/knowledge)
- [Session details in the app](/sessions/session-details)
