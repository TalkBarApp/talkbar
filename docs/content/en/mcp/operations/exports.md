---
title: Exports
description: MCP and CLI operations to configure export destinations and automatic export rules, and to preview, queue, run, cancel, retry and resolve session exports.
navigation:
  icon: i-heroicons-arrow-up-tray
---

Export operations send session content (summary, transcript, notes, action items, markers and audio) to files, an Obsidian vault or Notion. All of them are on by default in MCP Access. Every operation also takes an optional `workspaceId`. See [How to read this reference](/mcp/operations#how-to-read-this-reference) for the conventions.

| Operation | Kind | Tool | On | Group |
| --- | --- | --- | --- | --- |
| [`exports.config`](#exportsconfig) | Read | `talkbar_read` | On | `exports` |
| [`exports.sessions`](#exportssessions) | Read | `talkbar_read` | On | `exports` |
| [`exports.preview`](#exportspreview) | Read | `talkbar_read` | On | `content` |
| [`exports.enqueue`](#exportsenqueue) | Write | `talkbar_change` | On | `exports` |
| [`exports.run`](#exportsrun) | Write | `talkbar_change` | On | `exports` |
| [`exports.status`](#exportsstatus) | Read | `talkbar_read` | On | `exports` |
| [`exports.runs`](#exportsruns) | Read | `talkbar_read` | On | `exports` |
| [`exports.history`](#exportshistory) | Read | `talkbar_read` | On | `exports` |
| [`exports.cancel`](#exportscancel) | Write | `talkbar_change` | On | `exports` |
| [`exports.retry`](#exportsretry) | Write | `talkbar_change` | On | `exports` |
| [`exports.resolve`](#exportsresolve) | Write | `talkbar_change` | On | `exports` |
| [`exports.destination.save`](#exportsdestinationsave) | Write | `talkbar_change` | On | `exports` |
| [`exports.destination.delete`](#exportsdestinationdelete) | Write | `talkbar_delete` | On | `exports` |
| [`exports.rule.save`](#exportsrulesave) | Write | `talkbar_change` | On | `exports` |
| [`exports.rule.delete`](#exportsruledelete) | Write | `talkbar_delete` | On | `exports` |

## How an export runs

1. Set up a destination with `exports.destination.save` (or in the app).
2. Check what will be written with `exports.preview`.
3. Queue a batch with `exports.enqueue`, then call `exports.run` until no delivery is left `scheduled`. Check progress with `exports.status`.
4. If a delivery needs attention because the destination was changed outside TalkBar, settle it with `exports.resolve`, or try again with `exports.retry`.

A delivery is `scheduled`, `waitingForSummary`, `waitingForAudio`, `exporting`, `exported`, `partiallyExported`, `needsAttention` or `cancelled`; a batch takes its status from its deliveries.

## `exports.config`

Reads the workspace's export destinations and automatic export rules.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `exports`

**Arguments:** none besides `workspaceId`.

**Returns:** `{destinations, rules}`. Destinations have `destinationId`, `name`, `format`, `location`, `enabled`, `layout` and `credentialRef`; rules have the fields `exports.rule.save` takes.

```json
{"tool": "exports.config", "args": {}}
```

## `exports.sessions`

Pages the ids of the sessions that can be exported (complete and not in the Trash), optionally within a project or series.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="projectId" type="string"}
  Only sessions of this project.
  ::
  ::field{name="seriesId" type="string"}
  Only sessions of this series.
  ::
  ::field{name="after" type="string"}
  The last session id of the previous page.
  ::
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 100. Default `100`.
  ::
::

**Returns:** An array of session ids, in id order. Pass the last one as `after` for the next page; an empty array means the end.

## `exports.preview`

Shows what an export would contain and whether each session is ready, without exporting anything.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="sessionIds" type="string[]" required}
  The sessions to export. 1 to 100.
  ::
  ::field{name="destinationIds" type="string[]" required}
  The destinations to preview. 1 to 10. Each must exist and be enabled.
  ::
  ::field{name="selection" type="object"}
  What to include from each session. Unknown keys are refused.

  - `summary` (default `true`), `transcript` (default `true`), `metadata` (default `true`), `notes`, `outcomes` (action items), `markers` (each default `false`).
  - `audio`: `none` (default), `original`, `mp4`, `mp3` or `wav`.
  - `summarySectionKeys`: only these summary sections. Empty means the whole summary.
  - `turnIds`: only these transcript turns (up to 10,000).
  - `ranges`: only transcript turns inside these time ranges, `[{startMs, endMs}]` in ms from the session start (up to 100).
  ::
::

**Returns:** `{sessions, destinations, outputs}`. Each session shows the selected content, `ready` and, when it is not ready, `waitReason` (`sessionNotFinished`, `summaryMissing`, `summaryStale` or `audioPending`). Each output names the `location`, `files` and `archiveEntries` it would write.

- Returns the selected summary and transcript text, so its policy group is `content`.

```json
{"tool": "exports.preview", "args": {"sessionIds": ["ses_123"], "destinationIds": ["dest_vault"], "selection": {"summary": true, "transcript": false, "outcomes": true}}}
```

## `exports.enqueue`

Queues sessions for export to one or more destinations, as a batch.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="sessionIds" type="string[]" required}
  The sessions to export. 1 to 100.
  ::
  ::field{name="destinationIds" type="string[]" required}
  The destinations. 1 to 10. Each must exist and be enabled.
  ::
  ::field{name="selection" type="object"}
  What to include, as for `exports.preview`.
  ::
::

**Returns:** The batch: `{batchId, workspaceId, status, automatic, createdAtMs, deliveries}`. Each delivery has `deliveryId`, `sessionId`, `sessionTitle`, `destinationId`, `status`, `location`, `error`, `conflict` and `updatedAtMs`.

- A session that is still recording is refused with `session_recording`: queue it after it stops.
- Queuing does not deliver anything by itself. Run it with `exports.run`, or cancel it with `exports.cancel`.

```json
{"tool": "exports.enqueue", "args": {"sessionIds": ["ses_123", "ses_124"], "destinationIds": ["dest_vault"]}}
```

## `exports.run`

Runs a small part of one batch now: each call delivers at most one session to one destination. It never starts a background worker.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="batchId" type="string" required}
  The export batch, from `exports.enqueue` or `exports.history`.
  ::
::

**Returns:** The batch after the run (`{batchId, workspaceId, status, automatic, createdAtMs, deliveries}`. Each delivery has `deliveryId`, `sessionId`, `sessionTitle`, `destinationId`, `status`, `location`, `error`, `conflict` and `updatedAtMs`).

- Call it again while the batch still has scheduled deliveries.
- One export run at a time: a second call while one is running is answered `busy` with `retryAfterMs: 5000`.
- Writes files or Notion pages to the destination.

```json
{"tool": "exports.run", "args": {"batchId": "batch_5"}}
```

## `exports.status`

Reads the delivery status of one export batch.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="batchId" type="string" required}
  The export batch, from `exports.enqueue` or `exports.history`.
  ::
::

**Returns:** The batch: `{batchId, workspaceId, status, automatic, createdAtMs, deliveries}`. Each delivery has `deliveryId`, `sessionId`, `sessionTitle`, `destinationId`, `status`, `location`, `error`, `conflict` and `updatedAtMs`.

## `exports.runs`

Lists the delivery attempts of one export batch.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="batchId" type="string" required}
  The export batch, from `exports.enqueue` or `exports.history`.
  ::
::

**Returns:** An array of attempts: `[{runId, deliveryId, status, startedAtMs, finishedAtMs, error}]`.

## `exports.history`

Lists recent export batches, newest first.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 100. Default `30`.
  ::
::

**Returns:** An array of batches, as `exports.status` returns them.

## `exports.cancel`

Cancels an export batch. Deliveries that finished stay exported.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="batchId" type="string" required}
  The export batch, from `exports.enqueue` or `exports.history`.
  ::
::

**Returns:** The batch as it now stands.

- Every delivery that is not `exported` becomes `cancelled`, including partly exported ones and ones that need attention.

## `exports.retry`

Retries an export batch: partly exported deliveries and deliveries that need attention (other than conflicts) are queued again.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="batchId" type="string" required}
  The export batch, from `exports.enqueue` or `exports.history`.
  ::
::

**Returns:** The batch as it now stands.

- Conflicts are settled with `exports.resolve` instead. A finished batch is unchanged.

## `exports.resolve`

Settles an export conflict, where the file or page at the destination was changed outside TalkBar.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="deliveryId" type="string" required}
  The delivery that needs attention, from the batch.
  ::
  ::field{name="action" type="string" required}
  `keepExternal` keeps the outside version, `saveCopy` writes TalkBar's version as a new copy, `replace` overwrites the outside version.
  ::
::

**Returns:** The batch as it now stands.

- Only a delivery that needs attention can be resolved.

```json
{"tool": "exports.resolve", "args": {"deliveryId": "dlv_9", "action": "saveCopy"}}
```

## `exports.destination.save`

Creates or updates an export destination: a folder of files, an Obsidian vault, a folder for Notion import, or a connected Notion page.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="destinationId" type="string" required}
  An id you choose. Saving with an existing id updates that destination.
  ::
  ::field{name="name" type="string" required}
  The destination name. Must not be empty.
  ::
  ::field{name="format" type="string" required}
  What to write:

  - `txt`, `markdown`, `html`, `json`, `srt`, `vtt`, `zip`: files in a folder.
  - `obsidian`: Markdown with properties, for an Obsidian vault.
  - `notionMarkdown`: Markdown files for Notion's import.
  - `notion`: pages created in a connected Notion workspace.
  ::
  ::field{name="location" type="string" required}
  For `notion`, the parent page (an id or a page URL). For every other format, an absolute folder path.
  ::
  ::field{name="enabled" type="boolean" required}
  Whether the destination can be used.
  ::
  ::field{name="layout" type="string"}
  How files are arranged in the folder: `flat` (default), `project`, `series` or `projectSeries`.
  ::
  ::field{name="credentialRef" type="string | null"}
  For a connected Notion destination, the stored connection: exactly `export:<workspaceId>:<destinationId>`, or `null`. Connecting Notion happens in the app; an assistant cannot store a token.
  ::
::

**Returns:** The destination as saved.

- Saving replaces the whole destination: leaving `credentialRef` out of a connected Notion destination disconnects it.
- Administrator rules can limit which folders or destinations may be used.

```json
{"tool": "exports.destination.save", "args": {"destinationId": "dest_vault", "name": "Obsidian vault", "format": "obsidian", "location": "C:\\Users\\me\\Documents\\Vault\\Meetings", "enabled": true, "layout": "project"}}
```

## `exports.destination.delete`

Removes a destination that has no active deliveries. Files and pages already exported are kept.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="destinationId" type="string" required}
  The export destination, from `exports.config`.
  ::
::

**Returns:** `{deleted: true, switchedOffRules}`. A rule of its own (`override`) left with no destination is switched to `disabled` and listed in `switchedOffRules`.

- Refused with `failed` while a delivery to it is scheduled, waiting or exporting.
- Also removes any stored Notion connection for the destination.
- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## `exports.rule.save`

Sets automatic export for the workspace, a project or a series.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="ruleId" type="string" required}
  An id you choose. Saving again with the same id updates the rule.
  ::
  ::field{name="scopeKind" type="string" required}
  `workspace`, `project` or `series`.
  ::
  ::field{name="scopeId" type="string" required}
  The workspace, project or series id. For `workspace`, the workspace id itself.
  ::
  ::field{name="mode" type="string" required}
  `inherit` (use the rule above; not allowed for the workspace), `override` (use this rule) or `disabled` (no automatic export here).
  ::
  ::field{name="destinationIds" type="string[]" required}
  The destinations to export to.
  ::
  ::field{name="selection" type="object" required}
  What to include, as for `exports.preview`.
  ::
  ::field{name="timing" type="object" required}
  When to export. One of:

  - `{"kind": "ready"}`: as soon as a session is ready.
  - `{"kind": "delay", "delayMs": …}`: a delay after it is ready, up to 31 days (2,678,400,000 ms).
  - `{"kind": "daily", "hour": …, "minute": …, "timezone": "…"}`: once a day at that time, in an IANA time zone.
  ::
  ::field{name="reexportSummary" type="boolean" required}
  Export again when the summary changes.
  ::
  ::field{name="reexportTranscript" type="boolean" required}
  Export again when the transcript changes.
  ::
  ::field{name="enabledAtMs" type="integer" required}
  Required, but TalkBar sets the time itself: now, or the earlier time when an `override` rule stays `override`.
  ::
::

**Returns:** The rule as saved.

- One rule per scope: another `ruleId` for a scope that already has a rule is refused with `failed`, naming the existing rule.

```json
{"tool": "exports.rule.save", "args": {"ruleId": "rule_proj456", "scopeKind": "project", "scopeId": "proj_456", "mode": "override", "destinationIds": ["dest_vault"], "selection": {"summary": true, "transcript": true}, "timing": {"kind": "ready"}, "reexportSummary": true, "reexportTranscript": false, "enabledAtMs": 0}}
```

## `exports.rule.delete`

Removes an automatic export rule. Queued and delivered exports are kept.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **On** by default · policy group `exports`

**Arguments**

::field-group
  ::field{name="ruleId" type="string" required}
  The automatic export rule, from `exports.config`.
  ::
::

**Returns:** `{deleted: true}`.

- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## Related

- [Operations reference](/mcp/operations)
- [Exports in the app](/sharing/exports)
- [Export and share settings](/settings/export-and-share)
- [Scheduler](/mcp/operations/scheduler)
