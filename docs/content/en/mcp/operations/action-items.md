---
title: Action items
description: MCP and CLI operations to list, read, create, update, complete and remove action items, follow-ups, questions and decisions.
navigation:
  icon: i-heroicons-check-circle
---

Action item operations work with the four kinds of item TalkBar tracks: tasks, follow-ups, questions and decisions. An item belongs to a session, a project or General, and can point at the moment in a session it came from. Every operation also takes an optional `workspaceId`. See [How to read this reference](/mcp/operations#how-to-read-this-reference) for the conventions.

| Operation | Kind | Tool | On | Group |
| --- | --- | --- | --- | --- |
| [`action_items.list`](#action_itemslist) | Read | `talkbar_read` | On | `content` |
| [`action_items.get`](#action_itemsget) | Read | `talkbar_read` | On | `content` |
| [`action_items.create`](#action_itemscreate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`action_items.update`](#action_itemsupdate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`action_items.set_status`](#action_itemsset_status) | Write | `talkbar_change` | Off | `contentChanges` |
| [`action_items.remove`](#action_itemsremove) | Write | `talkbar_delete` | Off | `contentChanges` |

## Statuses by type

| Type | Statuses |
| --- | --- |
| `task` | `open`, `done` |
| `follow_up` | `open`, `done` |
| `question` | `open`, `answered` |
| `decision` | `active`, `superseded` |

## `action_items.list`

Lists action items: tasks, follow-ups, questions and decisions. Filter by session, project, series, General, type, status, assignee or text.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="sessionId" type="string"}
  Only the items of this session. With it, `projectId`, `seriesId`, `generalOnly` and `includeStopped` are ignored.
  ::
  ::field{name="projectId" type="string"}
  Only items of this project.
  ::
  ::field{name="seriesId" type="string"}
  Only items of this series.
  ::
  ::field{name="generalOnly" type="boolean"}
  Only items in General (not tied to a project). Cannot be combined with `projectId` or `seriesId`.
  ::
  ::field{name="itemTypes" type="string[]"}
  Only these types: `task`, `follow_up`, `question`, `decision`.
  ::
  ::field{name="statuses" type="string[]"}
  Only these statuses: `open`, `done`, `answered`, `active`, `superseded`.
  ::
  ::field{name="contactIds" type="string[]"}
  Only items assigned to these people.
  ::
  ::field{name="text" type="string"}
  Text to find in titles and details.
  ::
  ::field{name="includeStopped" type="boolean"}
  Also list carried-over items that were stopped.
  ::
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 200. Default `50`.
  ::
::

**Returns:** `{items: [{itemId, itemType, label, title, status, dueAtMs, sessionId, sessionTitle, projectId, assignees, anchor, updatedAt}]}`. `anchor` (`{turnId, pointId, atMs}` or `null`) is the moment an item is tied to.

- Resolved items (done, answered, superseded) sort last. Type and status values outside the lists above match nothing.

```json
{"tool": "action_items.list", "args": {"projectId": "proj_456", "statuses": ["open"]}}
```

## `action_items.get`

Reads one action item with its details, assignees, status and sources.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="itemId" type="string" required}
  The action item, from `action_items.list`.
  ::
::

**Returns:** `{itemId, itemType, labelId, label, title, details, status, dueAtMs, answer, sessionId, sessionTitle, projectId, assignees: [{name, contactId}], origin, sources, resolvedAtMs, createdAt, updatedAt}`. `sources` lists the quotes and moments the item comes from.

## `action_items.create`

Adds an action item to a session, a project or General. Works while the session records, and shows live.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="title" type="string" required}
  What needs doing. Must not be empty.
  ::
  ::field{name="sessionId" type="string"}
  Add it to this session. Without `projectId`, it takes the session's project.
  ::
  ::field{name="projectId" type="string"}
  Add it to this project. With neither `sessionId` nor `projectId`, it goes to General.
  ::
  ::field{name="itemType" type="string"}
  One of `task`, `follow_up`, `question`, `decision`. Default `task`.
  ::
  ::field{name="labelId" type="string"}
  A label (such as Idea or Blocker) for the item, by id; `action_items.get` shows an item's `labelId`. Each label belongs to one item type.
  ::
  ::field{name="details" type="string"}
  More detail.
  ::
  ::field{name="status" type="string"}
  One of `open`, `done`, `answered`, `active`, `superseded`, as allowed for the type. Default `open` (`active` for a decision).
  ::
  ::field{name="dueAtMs" type="integer | null"}
  Due date in epoch ms (tasks and follow-ups only). `null` for none.
  ::
  ::field{name="answer" type="string"}
  The answer (questions only).
  ::
  ::field{name="assignees" type="(string | object)[]"}
  Who it is for: names, or `{name, contactId}` objects with a non-empty `name`.
  ::
  ::field{name="turnId" type="string"}
  A transcript turn (`sessions.transcript` with `format: "json"`). Ties the item to a moment in its session. Needs `sessionId`.
  ::
  ::field{name="chunkId" type="string"}
  A live transcript chunk (`sessions.transcript` with `format: "json"`). Ties the item to a moment in its session. Needs `sessionId`.
  ::
  ::field{name="pointId" type="string"}
  A timeline point (`sessions.timeline`). Cannot be combined with `turnId` or `chunkId`. Ties the item to a moment in its session. Needs `sessionId`.
  ::
  ::field{name="atMs" type="integer"}
  A moment in ms from the session start. With a turn, chunk or point it must fall inside it; while recording it cannot be later than now. Ties the item to a moment in its session. Needs `sessionId`.
  ::
  ::field{name="quote" type="string"}
  The words the item is about. On its own, it finds the one turn holding those words. Ties the item to a moment in its session. Needs `sessionId`.
  ::
::

**Returns:** The item, as `action_items.get` returns it; in a session, also `sessionStatus` (and a `warning` when the session was interrupted or TalkBar is not running).

- An id the session does not have is refused with `invalid_arguments`.
- A due date on a question or decision, or an answer on anything but a question, is refused.
- The item keeps its moment as well as the ids, so the app still places it after the transcript is enhanced.

```json
{"tool": "action_items.create", "args": {"sessionId": "ses_123", "title": "Send revised quote", "itemType": "follow_up", "assignees": ["Dana Lee"], "quote": "send you a revised quote"}}
```

## `action_items.update`

Changes an action item's title, details, type, label, status, due date, answer or assignees.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="itemId" type="string" required}
  The action item, from `action_items.list`.
  ::
  ::field{name="title" type="string"}
  The new title. Must not be empty.
  ::
  ::field{name="details" type="string | null"}
  More detail. `null` clears it.
  ::
  ::field{name="itemType" type="string"}
  One of `task`, `follow_up`, `question`, `decision`.
  ::
  ::field{name="labelId" type="string"}
  A label (such as Idea or Blocker) for the item, by id; `action_items.get` shows an item's `labelId`. Each label belongs to one item type.
  ::
  ::field{name="status" type="string"}
  One of `open`, `done`, `answered`, `active`, `superseded`, as allowed for the type.
  ::
  ::field{name="dueAtMs" type="integer | null"}
  Due date in epoch ms. `null` clears it.
  ::
  ::field{name="answer" type="string | null"}
  The answer (questions only). `null` clears it.
  ::
  ::field{name="assignees" type="(string | object)[]"}
  Replaces the assignees: names, or `{name, contactId}` objects.
  ::
::

**Returns:** The item, as `action_items.get` returns it.

- Give at least one field.

## `action_items.set_status`

Completes or reopens an action item, with an optional answer.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="itemId" type="string" required}
  The action item, from `action_items.list`.
  ::
  ::field{name="status" type="string" required}
  The new status. Tasks and follow-ups: `open` or `done`. Questions: `open` or `answered`. Decisions: `active` or `superseded`.
  ::
  ::field{name="answer" type="string"}
  An answer to record (questions).
  ::
::

**Returns:** The item, as `action_items.get` returns it.

- A status the type does not allow is refused with `invalid_arguments`, listing the allowed ones.

```json
{"tool": "action_items.set_status", "args": {"itemId": "ai_42", "status": "done"}}
```

## `action_items.remove`

Removes an action item from its board, as the app does: an item you added is deleted, an item from a summary is dismissed.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="itemId" type="string" required}
  The action item, from `action_items.list`.
  ::
::

**Returns:** `{removed: true, itemId, sessionId, projectId}`, plus `sessionStatus` for a session item.

- There is no Trash for action items: a second remove is `not_found`.
- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## Related

- [Operations reference](/mcp/operations)
- [Sessions](/mcp/operations/sessions)
- [Action items in the app](/knowledge/action-items)
