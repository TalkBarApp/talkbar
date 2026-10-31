---
title: Knowledge
description: MCP and CLI operations for knowledge cards and the suggestions knowledge scans propose, to list, read, create, update, pin, file, archive and review them.
navigation:
  icon: i-heroicons-light-bulb
---

Knowledge operations work with knowledge cards (called memory cards in the app, and `memoryId` in arguments) and with the suggestions knowledge scans propose. To manage the cards of one session, see the `sessions.cards.*` operations on [Sessions](/mcp/operations/sessions). Every operation also takes an optional `workspaceId`. See [How to read this reference](/mcp/operations#how-to-read-this-reference) for the conventions.

| Operation | Kind | Tool | On | Group |
| --- | --- | --- | --- | --- |
| [`knowledge.list`](#knowledgelist) | Read | `talkbar_read` | On | `content` |
| [`knowledge.get`](#knowledgeget) | Read | `talkbar_read` | On | `content` |
| [`knowledge.create`](#knowledgecreate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`knowledge.update`](#knowledgeupdate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`knowledge.pin`](#knowledgepin) | Write | `talkbar_change` | Off | `contentChanges` |
| [`knowledge.assign`](#knowledgeassign) | Write | `talkbar_change` | Off | `contentChanges` |
| [`knowledge.approve`](#knowledgeapprove) | Write | `talkbar_change` | Off | `contentChanges` |
| [`knowledge.confirm`](#knowledgeconfirm) | Write | `talkbar_change` | Off | `contentChanges` |
| [`knowledge.mark_outdated`](#knowledgemark_outdated) | Write | `talkbar_change` | Off | `contentChanges` |
| [`knowledge.archive`](#knowledgearchive) | Write | `talkbar_delete` | Off | `contentChanges` |
| [`knowledge.restore`](#knowledgerestore) | Write | `talkbar_change` | Off | `contentChanges` |
| [`knowledge.suggestions.list`](#knowledgesuggestionslist) | Read | `talkbar_read` | On | `content` |
| [`knowledge.suggestions.approve`](#knowledgesuggestionsapprove) | Write | `talkbar_change` | Off | `contentChanges` |
| [`knowledge.suggestions.dismiss`](#knowledgesuggestionsdismiss) | Write | `talkbar_change` | Off | `contentChanges` |
| [`knowledge.suggestions.snooze`](#knowledgesuggestionssnooze) | Write | `talkbar_change` | Off | `contentChanges` |
| [`knowledge.suggestions.reopen`](#knowledgesuggestionsreopen) | Write | `talkbar_change` | Off | `contentChanges` |

## Card statuses

A card is `approved`, `outdated` or `archived`. Only approved cards are used when TalkBar draws on your knowledge, and only approved cards stay pinned.

| From | Operation | To |
| --- | --- | --- |
| approved | `knowledge.mark_outdated` | outdated |
| approved or outdated | `knowledge.archive` | archived |
| outdated or archived | `knowledge.approve` or `knowledge.restore` | approved |

Any other change is refused with `failed`. Asking for the status a card already has changes nothing.

## `knowledge.list`

Lists knowledge cards. Filter by status, type, project, General, pinned, session or text.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="statuses" type="string[]"}
  Only cards with these statuses: `approved`, `outdated`, `archived`. Default: approved cards only.
  ::
  ::field{name="types" type="string[]"}
  Only cards of these types: `fact`, `preference`, `decision`, `commitment`, `risk`, `open_question`, `relationship_context`, `instruction`, `key_moment`, `contract_term`, `pricing_detail`, `technical_detail`.
  ::
  ::field{name="projectId" type="string"}
  Only cards filed under this project.
  ::
  ::field{name="generalOnly" type="boolean"}
  Only cards not filed under a project.
  ::
  ::field{name="pinnedOnly" type="boolean"}
  Only pinned cards.
  ::
  ::field{name="query" type="string"}
  Text to find in the cards.
  ::
  ::field{name="sessionId" type="string"}
  Only the cards brought into this session, in the session's order (as `sessions.live_cards` shows them).
  ::
  ::field{name="offset" type="integer"}
  `nextOffset` from the previous page. At least 0.
  ::
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 200. Default `50`.
  ::
::

**Returns:** `{cards: [{memoryId, title, type, status, pinned, projectId, sessionOnly, updatedAt}], total, nextOffset}`. `sessionOnly: true` means the card stays in its session.

```json
{"tool": "knowledge.list", "args": {"projectId": "proj_456", "types": ["decision", "commitment"]}}
```

## `knowledge.get`

Reads one knowledge card with its text, metadata and sources, quotes included.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="memoryId" type="string" required}
  The knowledge card, from `knowledge.list`.
  ::
::

**Returns:** The card: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`, plus `sources: [{sourceType, sourceId, atMs, quote, locator, status}]`.

```json
{"tool": "knowledge.get", "args": {"memoryId": "mem_321"}}
```

## `knowledge.create`

Adds a knowledge card. Cards you add are approved right away.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="title" type="string" required}
  The card title. Must not be empty.
  ::
  ::field{name="body" type="string"}
  The card text.
  ::
  ::field{name="type" type="string"}
  One of `fact`, `preference`, `decision`, `commitment`, `risk`, `open_question`, `relationship_context`, `instruction`, `key_moment`, `contract_term`, `pricing_detail`, `technical_detail`. Default `fact`.
  ::
  ::field{name="projectId" type="string"}
  File the card under this project. Without it, the card goes to General.
  ::
  ::field{name="pinned" type="boolean"}
  Pin the card.
  ::
::

**Returns:** The card: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

```json
{"tool": "knowledge.create", "args": {"title": "Prefers email over calls", "type": "preference", "projectId": "proj_456"}}
```

## `knowledge.update`

Changes a knowledge card's title, body or type.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="memoryId" type="string" required}
  The knowledge card, from `knowledge.list`.
  ::
  ::field{name="title" type="string"}
  The new title. Must not be empty.
  ::
  ::field{name="body" type="string"}
  The new text.
  ::
  ::field{name="type" type="string"}
  One of `fact`, `preference`, `decision`, `commitment`, `risk`, `open_question`, `relationship_context`, `instruction`, `key_moment`, `contract_term`, `pricing_detail`, `technical_detail`.
  ::
::

**Returns:** The card: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

- Give at least one field.

## `knowledge.pin`

Pins or unpins a knowledge card.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="memoryId" type="string" required}
  The knowledge card, from `knowledge.list`.
  ::
  ::field{name="pinned" type="boolean" required}
  `true` pins, `false` unpins. The pin belongs to the card: it shows pinned in every session and list that holds it.
  ::
::

**Returns:** `{memoryId, pinned}`.

- A card that leaves the approved status (outdated or archived) is unpinned, and approving or restoring it later does not pin it again.

## `knowledge.assign`

Files knowledge cards under a project, or takes them out of their project.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="memoryIds" type="string[]" required}
  The cards to file. Must not be empty.
  ::
  ::field{name="projectId" type="string | null" required}
  The project, or `null` to take the cards out of their project. Required.
  ::
::

**Returns:** `{memoryIds, projectId, changed}`.

```json
{"tool": "knowledge.assign", "args": {"memoryIds": ["mem_321", "mem_322"], "projectId": "proj_456"}}
```

## `knowledge.approve`

Sets a knowledge card back to approved. Approving a card that is already approved changes nothing.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="memoryId" type="string" required}
  The knowledge card, from `knowledge.list`.
  ::
::

**Returns:** The card: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

- Cards have no "waiting for review" status: what knowledge scans propose are suggestions. Approve those with `knowledge.suggestions.approve`.

## `knowledge.confirm`

Confirms a knowledge card is still true. It records the time in `lastConfirmedAtMs` and leaves the status unchanged.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="memoryId" type="string" required}
  The knowledge card, from `knowledge.list`.
  ::
::

**Returns:** The card: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

## `knowledge.mark_outdated`

Marks a knowledge card as no longer true.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="memoryId" type="string" required}
  The knowledge card, from `knowledge.list`.
  ::
::

**Returns:** The card: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

- An outdated card is unpinned. Approve or restore it to bring it back.

## `knowledge.archive`

Archives a knowledge card. It can be restored.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="memoryId" type="string" required}
  The knowledge card, from `knowledge.list`.
  ::
::

**Returns:** The card: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

- Archiving unpins the card.
- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## `knowledge.restore`

Brings an archived (or outdated) knowledge card back as approved.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="memoryId" type="string" required}
  The knowledge card, from `knowledge.list`.
  ::
::

**Returns:** The card: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

## `knowledge.suggestions.list`

Lists the cards, people and companies that knowledge scans propose, with the quotes they come from.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="status" type="string"}
  One of `pending`, `approving`, `approved`, `dismissed`. Default `pending`.
  ::
  ::field{name="kind" type="string"}
  Only suggestions for a `memory` (knowledge card), `contact` (person) or `organization` (company).
  ::
  ::field{name="projectId" type="string"}
  Only suggestions for this project.
  ::
  ::field{name="query" type="string"}
  Text to find in the suggestions.
  ::
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 100. Default `50`.
  ::
  ::field{name="cursor" type="string"}
  `nextCursor` from the previous page.
  ::
::

**Returns:** `{suggestions, hasMore, nextCursor}`. Each suggestion has `suggestionId`, `kind`, `action`, `status`, `proposal`, `evidence`, `targetId`, `confidence`, `projectId`, `sessionId`, `documentId`, `snoozedUntilMs`, `appliedCardId` and `createdAt`.

```json
{"tool": "knowledge.suggestions.list", "args": {"kind": "memory", "limit": 20}}
```

## `knowledge.suggestions.approve`

Accepts a suggestion.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="suggestionId" type="string" required}
  The suggestion, from `knowledge.suggestions.list`.
  ::
  ::field{name="approveWithoutSource" type="boolean"}
  When the session or document the suggestion came from is no longer available, approve it anyway, no longer linked to its source. Without it, such a suggestion is refused.
  ::
::

**Returns:** The suggestion as it now stands.

```json
{"tool": "knowledge.suggestions.approve", "args": {"suggestionId": "sug_55"}}
```

## `knowledge.suggestions.dismiss`

Rejects a suggestion. Undo with `knowledge.suggestions.reopen`.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="suggestionId" type="string" required}
  The suggestion, from `knowledge.suggestions.list`.
  ::
::

**Returns:** The suggestion as it now stands.

## `knowledge.suggestions.snooze`

Hides a suggestion until a later time. Undo with `knowledge.suggestions.reopen`.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="suggestionId" type="string" required}
  The suggestion, from `knowledge.suggestions.list`.
  ::
  ::field{name="untilMs" type="integer" required}
  When to show it again, in epoch ms. Must be in the future.
  ::
::

**Returns:** The suggestion as it now stands.

## `knowledge.suggestions.reopen`

Puts a dismissed or snoozed suggestion back for review.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="suggestionId" type="string" required}
  The suggestion, from `knowledge.suggestions.list`.
  ::
::

**Returns:** The suggestion as it now stands.

## Related

- [Operations reference](/mcp/operations)
- [Sessions](/mcp/operations/sessions) (session cards)
- [Knowledge cards in the app](/knowledge/knowledge-cards)
- [Review and scans](/knowledge/review-and-scans)
