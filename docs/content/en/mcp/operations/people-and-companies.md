---
title: People and companies
description: MCP and CLI operations to list, read, create, update and archive people and companies, and to find the sessions a person spoke in.
navigation:
  icon: i-heroicons-users
---

People operations (`contacts.*`) and company operations (`organizations.*`) work with the people and companies TalkBar knows. In `talkbar_find`, these are the `person` and `company` kinds. To name or link a speaker in a session, see the `sessions.speakers.*` operations on [Sessions](/mcp/operations/sessions). Every operation also takes an optional `workspaceId`. See [How to read this reference](/mcp/operations#how-to-read-this-reference) for the conventions.

| Operation | Kind | Tool | On | Group |
| --- | --- | --- | --- | --- |
| [`contacts.list`](#contactslist) | Read | `talkbar_read` | On | `content` |
| [`contacts.get`](#contactsget) | Read | `talkbar_read` | On | `content` |
| [`contacts.sessions`](#contactssessions) | Read | `talkbar_read` | On | `content` |
| [`contacts.create`](#contactscreate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`contacts.update`](#contactsupdate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`contacts.archive`](#contactsarchive) | Write | `talkbar_delete` | Off | `contentChanges` |
| [`contacts.unarchive`](#contactsunarchive) | Write | `talkbar_change` | Off | `contentChanges` |
| [`organizations.list`](#organizationslist) | Read | `talkbar_read` | On | `content` |
| [`organizations.get`](#organizationsget) | Read | `talkbar_read` | On | `content` |
| [`organizations.create`](#organizationscreate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`organizations.update`](#organizationsupdate) | Write | `talkbar_change` | Off | `contentChanges` |
| [`organizations.archive`](#organizationsarchive) | Write | `talkbar_delete` | Off | `contentChanges` |
| [`organizations.unarchive`](#organizationsunarchive) | Write | `talkbar_change` | Off | `contentChanges` |

## `contacts.list`

Lists the people in a workspace, with how many sessions each spoke in and when the latest started.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="projectId" type="string"}
  Only people of this project.
  ::
  ::field{name="query" type="string"}
  Text to find in names and emails.
  ::
  ::field{name="includeArchived" type="boolean"}
  Also list archived people. Default `false`.
  ::
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 500. Default `100`.
  ::
::

**Returns:** `{contacts: [{contactId, name, email, role, organizationId, archived, sessionCount, lastMetAtMs}]}`.

- `sessionCount` and `lastMetAtMs` count the sessions `contacts.sessions` lists (the person spoke; sessions in the Trash left out). A person never heard has `0` and `null`.

```json
{"tool": "contacts.list", "args": {"query": "dana"}}
```

## `contacts.get`

Reads one person's details.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="contactId" type="string" required}
  The person, from `contacts.list`.
  ::
::

**Returns:** `{contactId, name, email, phone, role, organizationId, relationshipTag, sentiment, notes, confirmed, lastContactAtMs, archived, createdAt, updatedAt}`.

## `contacts.sessions`

Lists the sessions a person spoke in, newest first, with the name they had in each, their talk time and their share of all talk.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="contactId" type="string" required}
  The person, from `contacts.list`.
  ::
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 200. Default `100`.
  ::
  ::field{name="offset" type="integer"}
  `nextOffset` from the previous page.
  ::
::

**Returns:** `{contactId, sessions: [{sessionId, title, startedAtMs, endedAtMs, speaker, talkTimeMs, share, excludedFromAi, private}], hasMore, nextOffset}`. `share` is 0 to 1 of everyone's talk time.

- Pass `speaker` as the `speaker` filter of `sessions.transcript` to read what the person said.

```json
{"tool": "contacts.sessions", "args": {"contactId": "ct_77", "limit": 10}}
```

## `contacts.create`

Adds a person.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="name" type="string" required}
  The person's name. Must not be empty.
  ::
  ::field{name="email" type="string"}
  Email address. It must have text before and after a single `@` and no spaces; the domain is not checked.
  ::
  ::field{name="phone" type="string"}
  Phone number.
  ::
  ::field{name="role" type="string"}
  Role or job title.
  ::
  ::field{name="relationshipTag" type="string"}
  A short tag for how you know them.
  ::
  ::field{name="notes" type="string"}
  Plain-text notes.
  ::
::

**Returns:** The person, as `contacts.get` returns it.

```json
{"tool": "contacts.create", "args": {"name": "Dana Lee", "email": "dana@example.com", "role": "CFO"}}
```

## `contacts.update`

Changes a person's name, email, phone, role, relationship tag or notes.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="contactId" type="string" required}
  The person, from `contacts.list`.
  ::
  ::field{name="name" type="string"}
  The new name. Must not be empty.
  ::
  ::field{name="email" type="string | null"}
  Email address, with the same check as `contacts.create`. `null` or an empty string clears it.
  ::
  ::field{name="phone" type="string | null"}
  Phone number. `null` clears it.
  ::
  ::field{name="role" type="string | null"}
  Role or job title. `null` clears it.
  ::
  ::field{name="relationshipTag" type="string | null"}
  A short tag for how you know them. `null` clears it.
  ::
  ::field{name="notes" type="string | null"}
  Plain-text notes; they replace any formatted notes. `null` clears them.
  ::
::

**Returns:** The person, as `contacts.get` returns it.

- Give at least one field.

## `contacts.archive`

Archives a person. Their history stays, and they stay editable.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="contactId" type="string" required}
  The person, from `contacts.list`.
  ::
::

**Returns:** The person's list row (`contactId`, `name`, `email`, `role`, `organizationId`, `archived`).

- Undo with `contacts.unarchive`.
- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## `contacts.unarchive`

Brings an archived person back.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="contactId" type="string" required}
  The person, from `contacts.list`.
  ::
::

**Returns:** The person's list row, as `contacts.archive` returns it.

## `organizations.list`

Lists the companies in a workspace.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="projectId" type="string"}
  Only companies of this project.
  ::
  ::field{name="query" type="string"}
  Text to find in names and websites.
  ::
  ::field{name="includeArchived" type="boolean"}
  Also list archived companies. Default `false`.
  ::
  ::field{name="limit" type="integer"}
  How many to return. From 1 to 500. Default `100`.
  ::
::

**Returns:** `{organizations: [{organizationId, name, relationship, website, pinned, archived}]}`.

## `organizations.get`

Reads one company's details, archived companies included.

**Read** · runs with [`talkbar_read`](/mcp/tools#talkbar_read) · MCP switch **On** by default · policy group `content`

**Arguments**

::field-group
  ::field{name="organizationId" type="string" required}
  The company, from `organizations.list`.
  ::
::

**Returns:** The list row plus `notes`, `createdAt` and `updatedAt`.

## `organizations.create`

Adds a company.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="name" type="string" required}
  The company name. Must not be empty.
  ::
  ::field{name="relationship" type="string"}
  One of `client`, `vendor`, `partner`, `prospect`, `internal`, `investor`, `advisor`, `candidate_company`, `other`. Default `other`.
  ::
  ::field{name="website" type="string"}
  Free text, as in the app (`northwind.example` is fine). Blank means none. `javascript:`, `vbscript:` and `data:` links are refused.
  ::
  ::field{name="notes" type="string"}
  Plain-text notes.
  ::
::

**Returns:** The company, as `organizations.get` returns it.

```json
{"tool": "organizations.create", "args": {"name": "Northwind", "relationship": "client", "website": "northwind.example"}}
```

## `organizations.update`

Changes a company's name, relationship, website or notes.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="organizationId" type="string" required}
  The company, from `organizations.list`.
  ::
  ::field{name="name" type="string"}
  The new name. Must not be empty.
  ::
  ::field{name="relationship" type="string"}
  One of `client`, `vendor`, `partner`, `prospect`, `internal`, `investor`, `advisor`, `candidate_company`, `other`.
  ::
  ::field{name="website" type="string | null"}
  Same rules as `organizations.create`. `null` clears it.
  ::
  ::field{name="notes" type="string | null"}
  Plain-text notes. `null` clears them.
  ::
::

**Returns:** The company, as `organizations.get` returns it.

- Give at least one field.

## `organizations.archive`

Archives a company. Its history stays.

**Write** · runs with [`talkbar_delete`](/mcp/tools#talkbar_delete) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="organizationId" type="string" required}
  The company, from `organizations.list`.
  ::
::

**Returns:** The company's list row.

- Undo with `organizations.unarchive`.
- Runs with `talkbar_delete`: [confirmed with you](/mcp/access-and-permissions#confirming-deletes) when your AI app can ask; apps that cannot ask are refused unless **Allow deletes without confirmation** is on.

## `organizations.unarchive`

Brings an archived company back.

**Write** · runs with [`talkbar_change`](/mcp/tools#talkbar_change) · MCP switch **Off** by default · policy group `contentChanges`

**Arguments**

::field-group
  ::field{name="organizationId" type="string" required}
  The company, from `organizations.list`.
  ::
::

**Returns:** The company's list row.

## Related

- [Operations reference](/mcp/operations)
- [Sessions](/mcp/operations/sessions)
- [People and companies in the app](/knowledge/people-and-companies)
