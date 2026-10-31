---
title: Calendar and series
description: MCP and CLI operations to list, schedule, prepare, move, snooze, skip and cancel planned meetings, and to manage session series and their schedules.
navigation:
  icon: i-heroicons-calendar-days
---

Calendar operations work with planned meetings (occurrences), the same ones the app's calendar and Prepare page show. Series operations manage session series and their schedules. Most of these operations are on by default in MCP Access. Assistants can plan and prepare meetings, but recording always starts in the app. Every operation also takes an optional `workspaceId`. See [How to read this reference](/mcp/operations#how-to-read-this-reference) for the conventions.

| Operation | Kind | Tool | On | Group |
| --- | --- | --- | --- | --- |
| [`calendar.upcoming`](#calendarupcoming) | Read | `talkbar_read` | On | `metadata` |
| [`calendar.get`](#calendarget) | Read | `talkbar_read` | On | `metadata` |
| [`calendar.prep`](#calendarprep) | Read | `talkbar_read` | On | `content` |
| [`calendar.actionable`](#calendaractionable) | Read | `talkbar_read` | On | `metadata` |
| [`calendar.schedule`](#calendarschedule) | Write | `talkbar_change` | On | `scheduling` |
| [`calendar.prepare`](#calendarprepare) | Write | `talkbar_change` | On | `scheduling` |
| [`calendar.prep.edit`](#calendarprepedit) | Write | `talkbar_change` | On | `scheduling` |
| [`calendar.move`](#calendarmove) | Write | `talkbar_change` | On | `scheduling` |
| [`calendar.snooze`](#calendarsnooze) | Write | `talkbar_change` | On | `scheduling` |
| [`calendar.cancel`](#calendarcancel) | Write | `talkbar_delete` | On | `scheduling` |
| [`calendar.skip`](#calendarskip) | Write | `talkbar_delete` | On | `scheduling` |
| [`calendar.start`](#calendarstart) | Write | `talkbar_change` | On | `scheduling` |
| [`calendar.tick`](#calendartick) | Write | `talkbar_change` | Off | `scheduling` |
| [`series.list`](#serieslist) | Read | `talkbar_read` | On | `metadata` |
| [`series.get`](#seriesget) | Read | `talkbar_read` | On | `metadata` |
| [`series.kinds.list`](#serieskindslist) | Read | `talkbar_read` | On | `metadata` |
| [`series.schedule.get`](#seriesscheduleget) | Read | `talkbar_read` | On | `metadata` |
| [`series.create`](#seriescreate) | Write | `talkbar_change` | On | `scheduling` |
| [`series.update`](#seriesupdate) | Write | `talkbar_change` | On | `scheduling` |
| [`series.archive`](#seriesarchive) | Write | `talkbar_delete` | On | `scheduling` |
| [`series.sessions.assign`](#seriessessionsassign) | Write | `talkbar_change` | On | `scheduling` |
| [`series.schedule.set`](#seriesscheduleset) | Write | `talkbar_change` | On | `scheduling` |

## Meeting statuses

A meeting is `planned`, `started`, `completed`, `missed`, `skipped`, `cancelled` or `unscheduled`. Times are epoch milliseconds.

## `calendar.upcoming`

Lists standalone and series meetings in a time window, soonest first, in pages.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments**

::field-group
  ::field{name="startAtMs" type="integer" required}
  Window start, epoch ms. Meetings that overlap the window are listed.
  ::
  ::field{name="endAtMs" type="integer" required}
  Window end, epoch ms. Must not be before `startAtMs`.
  ::
  ::field{name="includeArchived" type="boolean"}
  Also list the planned meetings of archived series, which the app's calendar hides. Default `false`.
  ::
  ::field{name="statuses" type="string[]"}
  Which meetings to list. Values: `planned`, `started`, `completed`, `missed`, `skipped`, `cancelled`. Empty or left out: planned, started, completed and missed.
  ::
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 500. Default `100`.
  ::
  ::field{name="offset" type="integer"}
  `nextOffset` from the previous page.
  ::
::

**Returns:** `{occurrences, nextOffset}`. Rows are meetings as `calendar.get` returns them, except that `prepared: true/false` replaces the setup itself (read it with `calendar.get` or `calendar.prep`).

```json
{"tool": "calendar.upcoming", "args": {"startAtMs": 1761955200000, "endAtMs": 1762560000000}}
```

## `calendar.get`

Reads one planned meeting.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments**

::field-group
  ::field{name="occurrenceId" type="string" required}
  The planned meeting, from `calendar.upcoming`.
  ::
::

**Returns:** The meeting (occurrence): `occurrenceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (the saved start setup, as a JSON string), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false for a meeting prepared without a planned time), `sessionTitle` (the linked session's name, once it has one), `quiet` (muted in the app: shown on the calendar, but never reminded or started automatically), `createdAt`, `updatedAt`.

```json
{"tool": "calendar.get", "args": {"occurrenceId": "occ_1"}}
```

## `calendar.prep`

Reads what the app's Prepare page shows for a meeting: prep notes, the cards and documents it starts with, the action items it brings in, and the series' previous session.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="occurrenceId" type="string" required}
  The planned meeting, from `calendar.upcoming`.
  ::
::

**Returns:** `occurrenceId`, `title`, `status`, `plannedStartAtMs`, `durationMinutes`, `seriesId`, `sessionId`, `prepared`, `preparable`, `projectId`, `sessionTemplateId`, `notes` (`[{noteId, title, preview, updatedAt}]`), `cards` (`[{memoryId, title, type, status}]`), `documents`, `actionItems` (`{carried, carriedOverflow, added, skipped, suggested}`) and `previousSession` (`{sessionId, title, startedAtMs, private}` or `null`).

- Read a prep note with `notes.get` and the previous session's summary with `sessions.get`. Prep notes are written in the app.

```json
{"tool": "calendar.prep", "args": {"occurrenceId": "occ_1"}}
```

## `calendar.actionable`

Lists meeting reminders waiting for Start, Snooze or Skip.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments:** none besides `workspaceId`.

**Returns:** An array of reminders: `[{jobId, occurrenceId, offsetMinutes, remindAtMs, status, snoozedUntilMs, createdAt, updatedAt}]`, soonest first. Read the meeting with `calendar.get`.

## `calendar.schedule`

Schedules a standalone or series meeting. It never starts recording.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="occurrenceId" type="string" required}
  An id you choose for the new meeting. Must be new.
  ::
  ::field{name="plannedStartAtMs" type="integer" required}
  Start time, epoch ms. A past time is accepted, so a meeting can be logged after it happened.
  ::
  ::field{name="durationMinutes" type="integer" required}
  Length in minutes. At least 1.
  ::
  ::field{name="timezone" type="string" required}
  IANA time zone, for example `America/New_York`.
  ::
  ::field{name="seriesId" type="string"}
  Add the meeting to this series. It must be an active (not archived) series.
  ::
  ::field{name="title" type="string"}
  The meeting title. 1 to 200 characters.
  ::
  ::field{name="reminderOffsetsMinutes" type="integer[]"}
  Minutes before the start to remind you. Up to 6 values, each from 0 to 10,080; duplicates are removed. Default `[10]`.
  ::
  ::field{name="startMode" type="string"}
  `prompt` (ask before starting) or `automatic` (start after a countdown, in the app). Default `prompt`.
  ::
  ::field{name="autoStartCountdownSeconds" type="integer"}
  Seconds of countdown before an automatic start. From 5 to 300. Default `60`.
  ::
  ::field{name="preparedSetup" type="object"}
  The start setup the app's meeting prep saves. Fields left out keep the app's defaults. Unknown fields are refused.

  - `source`: `mic`, `system` or `both`; `micDeviceId`.
  - `sessionTemplateId`, `projectId`, `topicIds`, `memoryIds` (knowledge cards), `documentIds`.
  - `summariesEnabled`, `summaryLanguage` (`auto` or a summary language code), `summaryLength` (`short`, `standard` or `detailed`), `summaryModel` (`{providerId, modelId}`).
  - `participants`: `[{name, contactId}]`; each needs a `name`.
  - `memoryMode`: `normal`, `session_only`, `manual_only` or `sensitive`. `speakerMode`: `solo`, `duo`, `small` or `large`. `privateSession`.
  - `origin`: `{name, url}`.
  - `actionItemIds`, `skippedActionItemIds`: read-only; the meeting keeps the lists it has (change them with `calendar.prep.edit`).

  Templates, projects, people, cards and documents must be in the workspace, and cards must be approved.
  ::
::

**Returns:** The meeting (occurrence): `occurrenceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (the saved start setup, as a JSON string), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false for a meeting prepared without a planned time), `sessionTitle` (the linked session's name, once it has one), `quiet` (muted in the app: shown on the calendar, but never reminded or started automatically), `createdAt`, `updatedAt`. Its status is `planned`.

- Creates reminders as the app does. A duplicate `occurrenceId` is refused with `failed`.

```json
{"tool": "calendar.schedule", "args": {"occurrenceId": "occ_weekly_sync_1107", "plannedStartAtMs": 1762531200000, "durationMinutes": 30, "timezone": "America/New_York", "title": "Weekly sync"}}
```

## `calendar.prepare`

Changes a meeting's title, start setup, reminders or start mode. Fields left out keep their values.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="occurrenceId" type="string" required}
  The planned meeting, from `calendar.upcoming`.
  ::
  ::field{name="title" type="string | null"}
  The new title, 1 to 200 characters, or `null` to clear it.
  ::
  ::field{name="reminderOffsetsMinutes" type="integer[]"}
  Minutes before the start to remind you. Up to 6 values, each from 0 to 10,080.
  ::
  ::field{name="startMode" type="string"}
  `prompt` or `automatic`.
  ::
  ::field{name="autoStartCountdownSeconds" type="integer"}
  Seconds of countdown before an automatic start. From 5 to 300.
  ::
  ::field{name="preparedSetup" type="object"}
  The start setup, as for `calendar.schedule`. When given, it replaces the stored setup as a whole: read it with `calendar.get`, change it, and send it all back. `null` clears it.
  ::
::

**Returns:** The meeting (occurrence): `occurrenceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (the saved start setup, as a JSON string), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false for a meeting prepared without a planned time), `sessionTitle` (the linked session's name, once it has one), `quiet` (muted in the app: shown on the calendar, but never reminded or started automatically), `createdAt`, `updatedAt`.

- Works on planned, missed and unscheduled meetings; others are refused with `failed`. Preparing a missed meeting makes it planned again.
- A meeting whose start has passed always gets `prompt`.

```json
{"tool": "calendar.prepare", "args": {"occurrenceId": "occ_1", "title": "Northwind kickoff", "reminderOffsetsMinutes": [15, 5]}}
```

## `calendar.prep.edit`

Adds or removes the knowledge cards, documents and action items from other meetings that a meeting starts with, or skips a carried-over action item, as the app's Prepare page does. Every edit applies, or none does.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="occurrenceId" type="string" required}
  The planned meeting, from `calendar.upcoming`.
  ::
  ::field{name="edits" type="object[]" required}
  The changes, 1 to 50. Each is `{kind, id, add}`:

  - `kind`: `memory` (a knowledge card), `document`, `actionItem` (a task, follow-up or question from another meeting) or `skippedActionItem` (a carried-over item to leave out of this meeting).
  - `id`: the item's id.
  - `add`: `true` adds (or skips); `false` removes (or brings a skipped item back).
  ::
::

**Returns:** The meeting's prep: `occurrenceId`, `prepared`, `preparable`, `sessionId`, `projectId`, `memoryIds`, `documentIds`, `maxMemoryCount`, `maxDocumentCount`, `sessionTemplateId`, `hasContent`, `draftCount` and `actionItemCount`. `calendar.prep` shows the lists in full.

- A wrong id or kind, skipping an item that is not carried over, or an item both added and skipped is refused with `invalid_arguments`, and nothing changes.
- A meeting that started, was cancelled or was skipped is refused with `failed`.

```json
{"tool": "calendar.prep.edit", "args": {"occurrenceId": "occ_1", "edits": [{"kind": "memory", "id": "mem_321", "add": true}, {"kind": "document", "id": "doc_8", "add": true}]}}
```

## `calendar.move`

Reschedules one meeting and updates its reminders and automatic start. Other meetings of the series are unchanged.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="occurrenceId" type="string" required}
  The planned meeting, from `calendar.upcoming`.
  ::
  ::field{name="plannedStartAtMs" type="integer" required}
  The new start time, epoch ms. Must be in the future.
  ::
::

**Returns:** The meeting (occurrence): `occurrenceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (the saved start setup, as a JSON string), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false for a meeting prepared without a planned time), `sessionTitle` (the linked session's name, once it has one), `quiet` (muted in the app: shown on the calendar, but never reminded or started automatically), `createdAt`, `updatedAt`. Its status is `planned`.

- Works on planned, missed and unscheduled meetings.

```json
{"tool": "calendar.move", "args": {"occurrenceId": "occ_1", "plannedStartAtMs": 1762617600000}}
```

## `calendar.snooze`

Snoozes a planned meeting's reminder and cancels any automatic start countdown. The meeting stays planned.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="occurrenceId" type="string" required}
  The planned meeting, from `calendar.upcoming`.
  ::
  ::field{name="snoozedUntilMs" type="integer" required}
  When to remind you again, epoch ms. Must be in the future.
  ::
::

**Returns:** The meeting (occurrence): `occurrenceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (the saved start setup, as a JSON string), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false for a meeting prepared without a planned time), `sessionTitle` (the linked session's name, once it has one), `quiet` (muted in the app: shown on the calendar, but never reminded or started automatically), `createdAt`, `updatedAt`.

- Only a planned meeting can be snoozed.
- Snoozing sets the meeting's start mode to `prompt`.

## `calendar.cancel`

Cancels one planned meeting, with its reminders and automatic start. It does not archive the series.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="occurrenceId" type="string" required}
  The planned meeting, from `calendar.upcoming`.
  ::
::

**Returns:** The meeting (occurrence): `occurrenceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (the saved start setup, as a JSON string), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false for a meeting prepared without a planned time), `sessionTitle` (the linked session's name, once it has one), `quiet` (muted in the app: shown on the calendar, but never reminded or started automatically), `createdAt`, `updatedAt`. Its status is `cancelled`.

- Only a planned meeting can be cancelled; otherwise `failed` names its current status.
- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## `calendar.skip`

Skips one planned meeting and cancels its reminders and countdown. The series and its other meetings are unchanged.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="occurrenceId" type="string" required}
  The planned meeting, from `calendar.upcoming`.
  ::
::

**Returns:** The meeting (occurrence): `occurrenceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (the saved start setup, as a JSON string), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false for a meeting prepared without a planned time), `sessionTitle` (the linked session's name, once it has one), `quiet` (muted in the app: shown on the calendar, but never reminded or started automatically), `createdAt`, `updatedAt`. Its status is `skipped`.

- Only a planned meeting can be skipped; otherwise `failed` names its current status.
- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## `calendar.start`

Checks whether a meeting can start here. MCP and the CLI never record, so this changes nothing and only explains why the meeting cannot start.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="occurrenceId" type="string" required}
  The planned meeting, from `calendar.upcoming`.
  ::
::

**Returns:** `{intent: null, unavailableReason}`. `unavailableReason` is `captureHostUnavailable` for a planned meeting and `notPlanned` otherwise.

- It does not check whether the app could start the meeting now. Start recording in the app.

## `calendar.tick`

Runs one pass of the meeting scheduler: creates upcoming meetings from series schedules, prepares their reminders, and marks meetings that passed unrecorded as missed. It delivers no notifications and records nothing.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="horizonEndMs" type="integer" required}
  Create meetings up to this time, epoch ms. Must not be before `nowMs`.
  ::
  ::field{name="nowMs" type="integer" required}
  The time to run the pass for, epoch ms.
  ::
  ::field{name="limit" type="integer"}
  Most due items to handle in this pass. From 1 to 100. Default `32`.
  ::
::

**Returns:** An array of automatic-start countdowns that are due: `[{kind, intent, occurrence}]`.

- The app runs this itself; it is off by default in MCP Access and rarely needed by an assistant.

## `series.list`

Lists session series with counts.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments**

::field-group
  ::field{name="includeArchived" type="boolean"}
  Also list archived series.
  ::
::

**Returns:** An array of series (as `series.get` returns them) with `sessionCount`, `lastSessionStartedAtMs`, `nextPlannedAtMs`, `projectName`, `customKind` and `schedule` (`{enabled, scheduleKind, rrule, localDate, localTime, timezone, durationMinutes}` or `null`).

```json
{"tool": "series.list", "args": {}}
```

## `series.get`

Reads one session series.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments**

::field-group
  ::field{name="seriesId" type="string" required}
  The series, from `series.list`.
  ::
::

**Returns:** The series: `seriesId`, `workspaceId`, `name`, `kind`, `customKindId`, `description`, `projectId`, `anchorContactId`, `templateId`, `startTemplateJson`, `archivedAtMs`, `createdAt`, `updatedAt`.

## `series.kinds.list`

Lists the built-in series types with their suggested templates, the workspace's own series types, and the icons a type may use.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments:** none besides `workspaceId`.

**Returns:** `{builtin: [{key, suggestedTemplateId}], custom: [{kindId, name, icon, createdAt, updatedAt}], icons}`.

## `series.schedule.get`

Reads a series' schedule, if it has one.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments**

::field-group
  ::field{name="seriesId" type="string" required}
  The series, from `series.list`.
  ::
::

**Returns:** The schedule or `null`: `scheduleId`, `seriesId`, `enabled`, `scheduleKind`, `timezone`, `localDate`, `localTime`, `durationMinutes`, `title`, `rrule`, `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `effectiveFromOriginalStartMs` (set when the schedule applies from a given meeting on), `createdAt`, `updatedAt`.

## `series.create`

Creates a session series, optionally linked to a project, a person and a template.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="seriesId" type="string" required}
  An id you choose for the new series. Must be new.
  ::
  ::field{name="name" type="string" required}
  The series name. 1 to 120 characters.
  ::
  ::field{name="kind" type="string" required}
  The series type: `oneOnOne`, `standup`, `teamMeeting`, `inPersonMeeting`, `clientMeeting`, `phoneCall`, `interview`, `hiringInterview`, `userResearch`, `salesCall`, `customerCheckIn`, `investorCall`, `legalConsultation`, `boardMeeting`, `leadershipSync`, `coaching`, `mentoring`, `workshop`, `training`, `brainstorm`, `retro`, `presentation`, `presentationPractice`, `productLaunch`, `lecture`, `class`, `course`, `educationalTalk`, `tutorial`, `webinar`, `panelDiscussion`, `podcast`, `videoWatching`, `voiceJournal`, `speakingPractice` or `custom`.
  ::
  ::field{name="customKindId" type="string"}
  With `kind: "custom"`, one of the workspace's own series types (`series.kinds.list`).
  ::
  ::field{name="description" type="string"}
  A description.
  ::
  ::field{name="projectId" type="string"}
  The project the series belongs to.
  ::
  ::field{name="anchorContactId" type="string"}
  The main person the series is with.
  ::
  ::field{name="templateId" type="string"}
  The template its sessions start with.
  ::
::

**Returns:** The series: `seriesId`, `workspaceId`, `name`, `kind`, `customKindId`, `description`, `projectId`, `anchorContactId`, `templateId`, `startTemplateJson`, `archivedAtMs`, `createdAt`, `updatedAt`.

- Sessions stay independent until you assign them with `series.sessions.assign`. A duplicate `seriesId` is refused with `failed`.

```json
{"tool": "series.create", "args": {"seriesId": "ser_dana_1on1", "name": "1:1 with Dana", "kind": "oneOnOne", "anchorContactId": "ct_77"}}
```

## `series.update`

Changes a series' details. Nullable fields take `null` to clear them.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="seriesId" type="string" required}
  The series, from `series.list`.
  ::
  ::field{name="name" type="string"}
  The new name. 1 to 120 characters.
  ::
  ::field{name="kind" type="string"}
  The series type, as for `series.create`.
  ::
  ::field{name="customKindId" type="string | null"}
  One of the workspace's own series types, for `kind: "custom"`. `null` clears it.
  ::
  ::field{name="description" type="string | null"}
  A description. `null` clears it.
  ::
  ::field{name="projectId" type="string | null"}
  The project the series belongs to. `null` clears it.
  ::
  ::field{name="anchorContactId" type="string | null"}
  The main person the series is with. `null` clears it.
  ::
  ::field{name="templateId" type="string | null"}
  The template its sessions start with. `null` clears it.
  ::
::

**Returns:** The series: `seriesId`, `workspaceId`, `name`, `kind`, `customKindId`, `description`, `projectId`, `anchorContactId`, `templateId`, `startTemplateJson`, `archivedAtMs`, `createdAt`, `updatedAt`.

- Give at least one field. Member sessions are not changed.

## `series.archive`

Archives or restores a series. Its sessions and history are kept.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="seriesId" type="string" required}
  The series, from `series.list`.
  ::
  ::field{name="archived" type="boolean" required}
  `true` archives, `false` restores.
  ::
::

**Returns:** The series: `seriesId`, `workspaceId`, `name`, `kind`, `customKindId`, `description`, `projectId`, `anchorContactId`, `templateId`, `startTemplateJson`, `archivedAtMs`, `createdAt`, `updatedAt`.

- Archiving hides the series' planned meetings (from the app calendar, and from `calendar.upcoming` unless `includeArchived` is set) and stops their reminders and automatic starts. It does not mark them missed.
- Restoring brings future meetings back and marks the ones whose time passed while archived as `skipped`.
- Archiving an archived series keeps its first archive date.
- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## `series.sessions.assign`

Moves sessions into a series, or out of their series.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="sessionIds" type="string[]" required}
  The sessions to move. At least one. A session named twice counts once.
  ::
  ::field{name="seriesId" type="string | null" required}
  The series, or `null` to take the sessions out of their series. Required.
  ::
::

**Returns:** `{changed}`: how many sessions changed.

- An archived series cannot take new sessions (`failed`). Unknown sessions and sessions in the Trash are `not_found`, each one named.
- Only series membership changes; session content, projects and files are untouched.

```json
{"tool": "series.sessions.assign", "args": {"sessionIds": ["ses_123", "ses_124"], "seriesId": "ser_dana_1on1"}}
```

## `series.schedule.set`

Creates or replaces a series' one-time or recurring schedule, and creates its upcoming meetings.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `scheduling`

**Arguments**

::field-group
  ::field{name="seriesId" type="string" required}
  The series, from `series.list`.
  ::
  ::field{name="scheduleKind" type="string" required}
  `one_time` or `recurring`.
  ::
  ::field{name="timezone" type="string" required}
  IANA time zone, for example `Europe/London`.
  ::
  ::field{name="localDate" type="string" required}
  The first (or only) date, as `YYYY-MM-DD`.
  ::
  ::field{name="localTime" type="string" required}
  The start time, as `HH:MM`.
  ::
  ::field{name="durationMinutes" type="integer" required}
  Length in minutes. At least 1.
  ::
  ::field{name="scheduleId" type="string"}
  A series keeps one schedule. Leave this out (an id is made the first time) or pass the existing schedule's id; a different id is refused.
  ::
  ::field{name="title" type="string"}
  A title for the meetings. May be empty.
  ::
  ::field{name="rrule" type="string"}
  The recurrence rule, required for `recurring` and not allowed for `one_time`. Supports `FREQ` `DAILY`, `WEEKLY` or `MONTHLY` with `INTERVAL`, `BYDAY`, `BYMONTHDAY`, `COUNT` and `UNTIL`, for example `FREQ=WEEKLY;BYDAY=TU`.
  ::
  ::field{name="reminderOffsetsMinutes" type="integer[]"}
  Minutes before the start to remind you. Up to 6 values, each from 0 to 10,080; duplicates are removed. Default `[10]`.
  ::
  ::field{name="startMode" type="string"}
  `prompt` (ask before starting) or `automatic` (start after a countdown, in the app). Default `prompt`.
  ::
  ::field{name="autoStartCountdownSeconds" type="integer"}
  Seconds of countdown before an automatic start. From 5 to 300. Default `60`.
  ::
  ::field{name="effectiveFromOccurrenceId" type="string"}
  Change the schedule from this meeting on ("this and following"); earlier meetings keep the old schedule.
  ::
  ::field{name="horizonEndMs" type="integer"}
  Create meetings up to this time, epoch ms. Default: 90 days from now.
  ::
::

**Returns:** The schedule, as `series.schedule.get` returns it, including its `scheduleId`.

- An archived series is refused with `failed`.

```json
{"tool": "series.schedule.set", "args": {"seriesId": "ser_dana_1on1", "scheduleKind": "recurring", "timezone": "America/New_York", "localDate": "2026-11-03", "localTime": "10:00", "durationMinutes": 30, "rrule": "FREQ=WEEKLY;BYDAY=TU"}}
```

## Related

- [Operations reference](/mcp/operations)
- [Scheduler](/mcp/operations/scheduler)
- [Scheduling and preparing in the app](/sessions/scheduling-and-preparing)
- [Series in the app](/sessions/series)
