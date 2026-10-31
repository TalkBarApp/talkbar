---
title: Scheduler
description: MCP and CLI operations to inspect TalkBar's scheduled jobs and to cancel or retry one.
navigation:
  icon: i-heroicons-clock
---

TalkBar runs timed work, such as meeting reminders, automatic starts and exports, as scheduled jobs. These operations let an assistant see that queue for a workspace, and cancel or retry a single job. They are all on by default in MCP Access. Every operation also takes an optional `workspaceId`. See [How to read this reference](/mcp/operations#how-to-read-this-reference) for the conventions.

| Operation | Kind | Tool | On | Group |
| --- | --- | --- | --- | --- |
| [`scheduler.status`](#schedulerstatus) | Read | `talkbar_read` | On | `scheduler` |
| [`scheduler.jobs.list`](#schedulerjobslist) | Read | `talkbar_read` | On | `scheduler` |
| [`scheduler.job.get`](#schedulerjobget) | Read | `talkbar_read` | On | `scheduler` |
| [`scheduler.job.cancel`](#schedulerjobcancel) | Write | `talkbar_change` | On | `scheduler` |
| [`scheduler.job.retry`](#schedulerjobretry) | Write | `talkbar_change` | On | `scheduler` |

## Job statuses

A job is `pending`, `leased`, `running`, `succeeded`, `skipped`, `failed` or `cancelled`.

## `scheduler.status`

Reads how many scheduled jobs a workspace has in each state, and when the next one is due.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `scheduler`

**Arguments:** none besides `workspaceId`.

**Returns:** `{pending, leased, running, succeeded, skipped, failed, cancelled, nextDueAtMs}`.

```json
{"tool": "scheduler.status", "args": {}}
```

## `scheduler.jobs.list`

Lists a workspace's recent scheduled jobs, newest first.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `scheduler`

**Arguments**

::field-group
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 500. Default `100`.
  ::
::

**Returns:** An array of jobs. The job: `jobId`, `jobKind`, `scopeType`, `scopeId`, `targetType`, `targetId`, `queueName`, `priority`, `runAtMs`, `status`, `attemptCount`, `maxAttempts`, `lastError`, `createdAtMs`, `updatedAtMs`, `startedAtMs`, `completedAtMs`, `cancelledAtMs` and a few routing fields.

## `scheduler.job.get`

Reads one scheduled job and its run history.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `scheduler`

**Arguments**

::field-group
  ::field{name="jobId" type="string" required}
  The scheduled job, from `scheduler.jobs.list`.
  ::
  ::field{name="runLimit" type="integer"}
  Most runs to return. From 1 to 500. Default `50`.
  ::
::

**Returns:** `{job, runs}`. Each run has `runId`, `jobId`, `attemptNumber`, `status`, `startedAtMs`, `finishedAtMs`, `error` and `outputJson`.

```json
{"tool": "scheduler.job.get", "args": {"jobId": "job_31"}}
```

## `scheduler.job.cancel`

Cancels one pending, leased or running job.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `scheduler`

**Arguments**

::field-group
  ::field{name="jobId" type="string" required}
  The scheduled job, from `scheduler.jobs.list`.
  ::
::

**Returns:** The job as it now stands.

- A job that already finished is refused with `failed`. Cancelling a job does not delete the meeting, reminder or export that created it.

## `scheduler.job.retry`

Puts one failed job back in the queue.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **On** by default · policy group `scheduler`

**Arguments**

::field-group
  ::field{name="jobId" type="string" required}
  The scheduled job, from `scheduler.jobs.list`.
  ::
  ::field{name="runAtMs" type="integer"}
  When to run it, epoch ms. Default: now. A past time means now.
  ::
::

**Returns:** The job as it now stands, `pending`, with its last error cleared.

- Only a failed job can be retried; anything else is refused with `failed`.

## Related

- [Operations reference](/mcp/operations)
- [Calendar and series](/mcp/operations/calendar-and-series)
- [Exports](/mcp/operations/exports)
