---
title: Workspace and profile
description: MCP and CLI operations for workspaces, workspace search and statistics, your profile and your plan.
navigation:
  icon: i-heroicons-building-office
---

These operations tell an assistant which workspace it is working in, search it, count what it holds, and read your profile and plan. Every operation here except `workspace.list` also takes an optional `workspaceId`; without it, the workspace open in the app is used. See [How to read this reference](/mcp/operations#how-to-read-this-reference) for the conventions.

| Operation | Kind | Tool | On | Group |
| --- | --- | --- | --- | --- |
| [`workspace.list`](#workspacelist) | Read | `talkbar_read` | On | `metadata` |
| [`workspace.search`](#workspacesearch) | Read | `talkbar_read` | On | `content` |
| [`workspace.stats`](#workspacestats) | Read | `talkbar_read` | On | `metadata` |
| [`workspace.rename`](#workspacerename) | Write | `talkbar_change` | Off | `contentChanges` |
| [`profile.get`](#profileget) | Read | `talkbar_read` | On | `content` |
| [`profile.update`](#profileupdate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`plan.get`](#planget) | Read | `talkbar_read` | On | `metadata` |

## `workspace.list`

Lists your workspaces and marks the one open in the app. Operations called without `workspaceId` use that open workspace.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments:** none.

**Returns:** `{workspaces: [{workspaceId, name, active}]}`. `active: true` marks the workspace open in the app.

- A good first call: it tells an assistant which workspace every other call will use by default.

```json
{"tool": "workspace.list", "args": {}}
```

## `workspace.search`

Searches a workspace by name and text across sessions, notes, documents, chats, action items, projects, series, people, companies and knowledge cards, best matches first. The [`talkbar_find`](/mcp/tools#talkbar_find) tool runs this same search.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="query" type="string" required}
  What to look for. Must not be empty. Matching ignores case and accents.
  ::
  ::field{name="projectId" type="string"}
  Search only within this project.
  ::
  ::field{name="kinds" type="string[]"}
  Which kinds of item to search. Empty or left out means every kind. Values: `session`, `note`, `document`, `chat`, `action_item`, `project`, `series`, `person`, `company`, `memory` (a knowledge card).
  ::
  ::field{name="limit" type="integer"}
  Most matches to return. From 1 to 100. Default `20`.
  ::
  ::field{name="match" type="string"}
  `any` (default) takes a natural-language request and matches items holding any remaining word; `all` requires every word.
  ::
  ::field{name="includeArchived" type="boolean"}
  Also match archived series, people, companies and knowledge cards; they come back marked `archived`. Default `false`. Items in the Trash are never searched.
  ::
::

**Returns:** `{matches, contentSearch}`. Each match has `kind`, `id`, `title`, `snippet`, `href` (an app link), `score`, `projectId`, `matchedIn`, `atMs` (a session's start, otherwise the last update), `detail`, `context`, `itemCount`, `archived` and, for a match inside indexed transcript or document text, `content`. `contentSearch` says whether indexed content was searched: `on`, `keywordOnly` (no embedding model installed), `off` or `failed` (name and text matches are still returned).

- Snippets can include transcript text.
- It searches item names and their own text (final session summaries, note bodies, chat messages, action item details, card bodies), plus indexed content when available.

```json
{"tool": "workspace.search", "args": {"query": "pricing decision for Northwind", "kinds": ["session", "note"], "limit": 10}}
```

## `workspace.stats`

Counts sessions by status, notes, documents, projects and approved knowledge cards in a workspace. No content text is returned.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments**

::field-group
  ::field{name="projectId" type="string"}
  Count only this project. Applies to sessions, notes, documents and knowledge cards; the project count ignores it.
  ::
  ::field{name="startedAfterMs" type="integer"}
  Count only sessions that started at or after this time (epoch ms, inclusive). Applies to sessions only.
  ::
  ::field{name="startedBeforeMs" type="integer"}
  Count only sessions that started before this time (epoch ms, exclusive). Applies to sessions only.
  ::
::

**Returns:** `{sessions: {total, byStatus, firstStartedAtMs, lastStartedAtMs}, notes: {total}, documents: {total}, projects: {total}, knowledge: {approvedTotal}}`.

```json
{"tool": "workspace.stats", "args": {"startedAfterMs": 1761955200000}}
```

## `workspace.rename`

Renames a workspace: the open one, or the one `workspaceId` names.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="name" type="string" required}
  The new name. Must not be empty; surrounding spaces are trimmed.
  ::
::

**Returns:** `{workspaceId, name}`.

- Creating, switching and trashing workspaces stay in the app.

```json
{"tool": "workspace.rename", "args": {"name": "Client work"}}
```

## `profile.get`

Reads your name, email and job title from the profile the workspace uses.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments:** none besides `workspaceId`.

**Returns:** `{profileId, workspaceId, name, email, jobTitle, isDefault}`.

```json
{"tool": "profile.get", "args": {}}
```

## `profile.update`

Changes your name, email or job title in the profile the workspace uses.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="name" type="string | null"}
  Your name. `null` or an empty string clears it.
  ::
  ::field{name="email" type="string | null"}
  Your email. It must have text before and after a single `@` and no spaces. `null` or an empty string clears it.
  ::
  ::field{name="jobTitle" type="string | null"}
  Your job title. `null` or an empty string clears it.
  ::
::

**Returns:** The profile, as `profile.get` returns it.

- Give at least one field. Fields you leave out stay as they are; your avatar is kept.
- The profile shows in the app and on pages you share.

```json
{"tool": "profile.update", "args": {"jobTitle": "Head of Product"}}
```

## `plan.get`

Reads your TalkBar plan: its limits and how much of each this workspace and data folder use, the license state, and the plans above yours with what each adds.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `metadata`

**Arguments:** none besides `workspaceId`.

**Returns:** `plan` (`{id, name}`, the plan in effect), `licensedPlan`, `previewTrialActive`, `previewTrialExpiresAt`, `environment`, `license` (`plan`, `status`, `paid`, `updatesUntil`, `onlineServicesUntil`, `renewalOpen`), `limits`, `features`, `upgrades` (`[{id, name, adds, limits}]`, empty on the top plan) and `upgradeUrl` (`null` when there is no plan above).

- `limits` holds `projects` and `sessions` (per workspace), `workspaces`, `profiles` and `shareLinks` (per data folder) and `devices` (per license), each as `{max, used, per}`; `max: null` means unlimited. Other limits, such as `recordingMinutes`, have no `used`.
- During an active Preview trial, `plan` is the trial plan and `licensedPlan` keeps the plan of your license.
- Never returns a license key, email, holder name or payment details, and cannot change the plan. When a write is refused with `plan_limit`, this is where an assistant sees why. See [Errors and limits](/mcp/errors-and-limits).

```json
{"tool": "plan.get", "args": {}}
```

## Related

- [Operations reference](/mcp/operations)
- [The five MCP tools](/mcp/tools)
- [Errors and limits](/mcp/errors-and-limits)
- [Plans and license](/data/plans-and-license)
