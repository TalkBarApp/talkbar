---
title: Topics and markers
description: MCP and CLI operations for topics that label sessions and notes, session keywords, and markers on moments in a session.
navigation:
  icon: i-heroicons-tag
---

Topics label sessions and notes; keywords are the words TalkBar (or you) attach to a session; markers flag a moment in a session with an optional note. Every operation also takes an optional `workspaceId`. See [How to read this reference](/mcp/operations#how-to-read-this-reference) for the conventions.

| Operation | Kind | Tool | On | Group |
| --- | --- | --- | --- | --- |
| [`topics.list`](#topicslist) | Read | `talkbar_read` | On | `content` |
| [`topics.create`](#topicscreate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`topics.rename`](#topicsrename) | Write | `talkbar_change` | Off | `contentChanges` |
| [`topics.delete`](#topicsdelete) | Write | `talkbar_delete` | Off | `contentChanges` |
| [`topics.assign`](#topicsassign) | Write | `talkbar_change` | Off | `contentChanges` |
| [`topics.unassign`](#topicsunassign) | Write | `talkbar_change` | Off | `contentChanges` |
| [`sessions.keywords.get`](#sessionskeywordsget) | Read | `talkbar_read` | On | `content` |
| [`markers.list`](#markerslist) | Read | `talkbar_read` | On | `content` |
| [`markers.create`](#markerscreate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`markers.update`](#markersupdate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`markers.delete`](#markersdelete) | Write | `talkbar_delete` | Off | `contentChanges` |

## `topics.list`

Lists the topics used to label sessions and notes.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments:** none besides `workspaceId`.

**Returns:** `{topics: [{topicId, name, color}]}`, sorted by name.

```json
{"tool": "topics.list", "args": {}}
```

## `topics.create`

Adds a topic.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="name" type="string" required}
  The topic name. 1 to 80 characters.
  ::
  ::field{name="color" type="string"}
  One of `slate`, `sky`, `stone`, `teal`, `indigo`, `green`, `yellow`, `blue`, `purple`, `rose`, `lime`, `emerald`, `amber`, `cyan`, `fuchsia`, `pink`, or a `#RGB` / `#RRGGBB` hex color. Without it, the color is chosen from the name, so the same name always gets the same color.
  ::
::

**Returns:** `{topicId, name, color}`.

- A name that already exists is refused with `failed`. An unsupported color is refused with `failed` ("Unsupported topic color").

```json
{"tool": "topics.create", "args": {"name": "Hiring", "color": "teal"}}
```

## `topics.rename`

Changes a topic's name or color.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="topicId" type="string" required}
  The topic, from `topics.list`.
  ::
  ::field{name="name" type="string"}
  The new name. 1 to 80 characters.
  ::
  ::field{name="color" type="string"}
  The new color, as for `topics.create`.
  ::
::

**Returns:** `{topicId, name, color}`.

- Give `name`, `color` or both.

## `topics.delete`

Deletes a topic and removes it from every session and note.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="topicId" type="string" required}
  The topic, from `topics.list`.
  ::
::

**Returns:** `{topicId, deleted: true}`.

- Topics have no Trash: this deletes the topic as the app does.
- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## `topics.assign`

Adds a topic to one session or note.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="topicId" type="string" required}
  The topic, from `topics.list`.
  ::
  ::field{name="sessionId" type="string"}
  The session to label. Give this or `noteId`, not both.
  ::
  ::field{name="noteId" type="string"}
  The note to label. Give this or `sessionId`, not both.
  ::
::

**Returns:** `{sessionId, noteId, topics}`: the item's topics after the change.

```json
{"tool": "topics.assign", "args": {"topicId": "top_9", "sessionId": "ses_123"}}
```

## `topics.unassign`

Removes a topic from one session or note.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="topicId" type="string" required}
  The topic, from `topics.list`.
  ::
  ::field{name="sessionId" type="string"}
  The session. Give this or `noteId`, not both.
  ::
  ::field{name="noteId" type="string"}
  The note. Give this or `sessionId`, not both.
  ::
::

**Returns:** `{sessionId, noteId, topics}`: the item's topics after the change.

## `sessions.keywords.get`

Reads a session's keywords.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
::

**Returns:** `{sessionId, keywords: [string]}`, plus `pending: true` while the session records.

- TalkBar writes its AI keywords with the final summary, after recording stops; until then only keywords you added are listed.

```json
{"tool": "sessions.keywords.get", "args": {"sessionId": "ses_123"}}
```

## `markers.list`

Lists a session's markers: note, time, color and the words quoted at that moment.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
::

**Returns:** `{sessionId, markers}`. Each marker is `{markerId, sessionId, kind, body, quote, atMs, turnId, chunkId, pointId, color, updatedAt}`.

```json
{"tool": "markers.list", "args": {"sessionId": "ses_123"}}
```

## `markers.create`

Adds a marker to a session, also while it is recording: at a transcript turn or chunk, a timeline point, a moment or quoted words, with an optional note and color. It shows on the session right away.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="sessionId" type="string" required}
  The session to use. For a session that is recording now, get its id from `sessions.recording`.
  ::
  ::field{name="turnId" type="string"}
  A transcript turn (`sessions.transcript` with `format: "json"`). Give at least one of `turnId`, `chunkId`, `pointId`, `atMs` or `quote`.
  ::
  ::field{name="chunkId" type="string"}
  A live transcript chunk (`sessions.transcript` with `format: "json"`). The marker goes at the chunk's first turn. Give at least one of `turnId`, `chunkId`, `pointId`, `atMs` or `quote`.
  ::
  ::field{name="pointId" type="string"}
  A timeline point (`sessions.timeline`). Cannot be combined with `turnId` or `chunkId`. Give at least one of `turnId`, `chunkId`, `pointId`, `atMs` or `quote`.
  ::
  ::field{name="atMs" type="integer"}
  A moment, in ms from the session start. With a turn, chunk or point it must fall inside it; while recording it cannot be later than now. Give at least one of `turnId`, `chunkId`, `pointId`, `atMs` or `quote`.
  ::
  ::field{name="quote" type="string"}
  The words the marker is about. On its own, it finds the turn holding those words; when several turns hold them, add `turnId` or `atMs` to pick one. Give at least one of `turnId`, `chunkId`, `pointId`, `atMs` or `quote`.
  ::
  ::field{name="body" type="string"}
  The marker's note. Up to 2,000 characters.
  ::
  ::field{name="color" type="string"}
  The marker color. 1 to 40 characters; default `amber`.
  ::
::

**Returns:** The marker (`{markerId, sessionId, kind, body, quote, atMs, turnId, chunkId, pointId, color, updatedAt}`) plus `sessionStatus` (and a `warning` when the session was interrupted, or is recording while TalkBar is not running).

- An id the session does not have, or an `atMs` outside the place named, is refused with `invalid_arguments`.
- The marker keeps its moment as well as the ids, so the app still places it after the transcript is enhanced.

```json
{"tool": "markers.create", "args": {"sessionId": "ses_123", "quote": "we can ship in March", "body": "Ship date commitment", "color": "rose"}}
```

## `markers.update`

Changes a marker's note or color.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="markerId" type="string" required}
  The marker, from `markers.list`.
  ::
  ::field{name="body" type="string"}
  The new note.
  ::
  ::field{name="color" type="string"}
  The new color.
  ::
::

**Returns:** The marker plus `sessionStatus` (and a `warning` when the session was interrupted, or is recording while TalkBar is not running).

- Give `body`, `color` or both.

## `markers.delete`

Deletes a marker.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="markerId" type="string" required}
  The marker, from `markers.list`.
  ::
  ::field{name="sessionId" type="string"}
  Optional check: the marker's own session. If it names another session, nothing is deleted and the answer is `not_found`.
  ::
::

**Returns:** `{markerId, sessionId, deleted: true}` plus `sessionStatus` (and a `warning` when the session was interrupted, or is recording while TalkBar is not running). `sessionId` is the marker's own session.

- Markers have no Trash: this deletes as the app does.
- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## Related

- [Operations reference](/mcp/operations)
- [Sessions](/mcp/operations/sessions)
- [Topics and keywords in the app](/knowledge/topics-and-keywords)
