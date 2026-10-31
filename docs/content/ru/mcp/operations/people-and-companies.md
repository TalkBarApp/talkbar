---
title: Люди и компании
description: Операции MCP и CLI для просмотра, чтения, создания, изменения и архивации людей и компаний, а также для поиска сессий, в которых говорил человек.
navigation:
  icon: i-heroicons-users
---

Операции с людьми (`contacts.*`) и компаниями (`organizations.*`) работают с людьми и компаниями, которые известны TalkBar. В `talkbar_find` это типы `person` и `company`. Чтобы назвать участника сессии или связать его с человеком, используйте операции `sessions.speakers.*` на странице [Сессии](/mcp/operations/sessions). Каждая операция также принимает необязательный `workspaceId`. Общие правила описаны в разделе [Как читать этот справочник](/mcp/operations#как-читать-этот-справочник).

| Операция | Тип | Инструмент | По умолчанию | Группа |
| --- | --- | --- | --- | --- |
| [`contacts.list`](#contactslist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`contacts.get`](#contactsget) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`contacts.sessions`](#contactssessions) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`contacts.create`](#contactscreate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`contacts.update`](#contactsupdate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`contacts.archive`](#contactsarchive) | Изменение | `talkbar_delete` | Выкл. | `contentChanges` |
| [`contacts.unarchive`](#contactsunarchive) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`organizations.list`](#organizationslist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`organizations.get`](#organizationsget) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`organizations.create`](#organizationscreate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`organizations.update`](#organizationsupdate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`organizations.archive`](#organizationsarchive) | Изменение | `talkbar_delete` | Выкл. | `contentChanges` |
| [`organizations.unarchive`](#organizationsunarchive) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |

## `contacts.list`

Выводит людей рабочего пространства: в скольких сессиях говорил каждый и когда началась последняя из них.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="projectId" type="string"}
  Только люди этого проекта.
  ::
  ::field{name="query" type="string"}
  Текст для поиска в именах и email.
  ::
  ::field{name="includeArchived" type="boolean"}
  Показывать и людей из архива. По умолчанию `false`.
  ::
  ::field{name="limit" type="integer"}
  Сколько вернуть: от 1 до 500. По умолчанию `100`.
  ::
::

**Возвращает:** `{contacts: [{contactId, name, email, role, organizationId, archived, sessionCount, lastMetAtMs}]}`.

- `sessionCount` и `lastMetAtMs` считаются по тем же сессиям, что выводит `contacts.sessions` (человек говорил в них; сессии в корзине не учитываются). У человека, которого ни разу не было слышно, это `0` и `null`.

```json
{"tool": "contacts.list", "args": {"query": "dana"}}
```

## `contacts.get`

Читает данные одного человека.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="contactId" type="string" required}
  Человек из `contacts.list`.
  ::
::

**Возвращает:** `{contactId, name, email, phone, role, organizationId, relationshipTag, sentiment, notes, confirmed, lastContactAtMs, archived, createdAt, updatedAt}`.

## `contacts.sessions`

Выводит сессии, в которых говорил человек, начиная с новых: с именем, под которым он был в каждой из них, его временем разговора и долей в общем времени разговора.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="contactId" type="string" required}
  Человек из `contacts.list`.
  ::
  ::field{name="limit" type="integer"}
  Сколько вернуть: от 1 до 200. По умолчанию `100`.
  ::
  ::field{name="offset" type="integer"}
  `nextOffset` из предыдущей страницы.
  ::
::

**Возвращает:** `{contactId, sessions: [{sessionId, title, startedAtMs, endedAtMs, speaker, talkTimeMs, share, excludedFromAi, private}], hasMore, nextOffset}`. `share` — доля от общего времени разговора всех участников, от 0 до 1.

- Чтобы прочитать, что сказал человек, передайте `speaker` в фильтр `speaker` операции `sessions.transcript`.

```json
{"tool": "contacts.sessions", "args": {"contactId": "ct_77", "limit": 10}}
```

## `contacts.create`

Добавляет человека.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="name" type="string" required}
  Имя человека. Не может быть пустым.
  ::
  ::field{name="email" type="string"}
  Email. В нём должен быть ровно один символ `@` с текстом до и после него и не должно быть пробелов; домен не проверяется.
  ::
  ::field{name="phone" type="string"}
  Номер телефона.
  ::
  ::field{name="role" type="string"}
  Роль или должность.
  ::
  ::field{name="relationshipTag" type="string"}
  Короткая метка о том, откуда вы знакомы.
  ::
  ::field{name="notes" type="string"}
  Заметки обычным текстом.
  ::
::

**Возвращает:** человека в том виде, в каком его возвращает `contacts.get`.

```json
{"tool": "contacts.create", "args": {"name": "Dana Lee", "email": "dana@example.com", "role": "CFO"}}
```

## `contacts.update`

Изменяет имя, email, телефон, роль, метку отношений или заметки человека.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="contactId" type="string" required}
  Человек из `contacts.list`.
  ::
  ::field{name="name" type="string"}
  Новое имя. Не может быть пустым.
  ::
  ::field{name="email" type="string | null"}
  Email, с той же проверкой, что и в `contacts.create`. `null` или пустая строка очищают его.
  ::
  ::field{name="phone" type="string | null"}
  Номер телефона. `null` очищает его.
  ::
  ::field{name="role" type="string | null"}
  Роль или должность. `null` очищает её.
  ::
  ::field{name="relationshipTag" type="string | null"}
  Короткая метка о том, откуда вы знакомы. `null` очищает её.
  ::
  ::field{name="notes" type="string | null"}
  Заметки обычным текстом; они заменяют заметки с форматированием. `null` очищает их.
  ::
::

**Возвращает:** человека в том виде, в каком его возвращает `contacts.get`.

- Укажите хотя бы одно поле.

## `contacts.archive`

Перемещает человека в архив. Его история сохраняется, и его по-прежнему можно изменять.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="contactId" type="string" required}
  Человек из `contacts.list`.
  ::
::

**Возвращает:** строку человека из списка (`contactId`, `name`, `email`, `role`, `organizationId`, `archived`).

- Отменяется операцией `contacts.unarchive`.
- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## `contacts.unarchive`

Возвращает человека из архива.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="contactId" type="string" required}
  Человек из `contacts.list`.
  ::
::

**Возвращает:** строку человека из списка, как `contacts.archive`.

## `organizations.list`

Выводит компании рабочего пространства.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="projectId" type="string"}
  Только компании этого проекта.
  ::
  ::field{name="query" type="string"}
  Текст для поиска в названиях и адресах сайтов.
  ::
  ::field{name="includeArchived" type="boolean"}
  Показывать и компании из архива. По умолчанию `false`.
  ::
  ::field{name="limit" type="integer"}
  Сколько вернуть: от 1 до 500. По умолчанию `100`.
  ::
::

**Возвращает:** `{organizations: [{organizationId, name, relationship, website, pinned, archived}]}`.

## `organizations.get`

Читает данные одной компании, в том числе из архива.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="organizationId" type="string" required}
  Компания из `organizations.list`.
  ::
::

**Возвращает:** строку из списка, а также `notes`, `createdAt` и `updatedAt`.

## `organizations.create`

Добавляет компанию.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="name" type="string" required}
  Название компании. Не может быть пустым.
  ::
  ::field{name="relationship" type="string"}
  Одно из значений: `client`, `vendor`, `partner`, `prospect`, `internal`, `investor`, `advisor`, `candidate_company`, `other`. По умолчанию `other`.
  ::
  ::field{name="website" type="string"}
  Произвольный текст, как в приложении (`northwind.example` подойдёт). Пустое значение означает, что сайта нет. Ссылки `javascript:`, `vbscript:` и `data:` отклоняются.
  ::
  ::field{name="notes" type="string"}
  Заметки обычным текстом.
  ::
::

**Возвращает:** компанию в том виде, в каком её возвращает `organizations.get`.

```json
{"tool": "organizations.create", "args": {"name": "Northwind", "relationship": "client", "website": "northwind.example"}}
```

## `organizations.update`

Изменяет название, отношения, сайт или заметки компании.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="organizationId" type="string" required}
  Компания из `organizations.list`.
  ::
  ::field{name="name" type="string"}
  Новое название. Не может быть пустым.
  ::
  ::field{name="relationship" type="string"}
  Одно из значений: `client`, `vendor`, `partner`, `prospect`, `internal`, `investor`, `advisor`, `candidate_company`, `other`.
  ::
  ::field{name="website" type="string | null"}
  Те же правила, что и в `organizations.create`. `null` очищает его.
  ::
  ::field{name="notes" type="string | null"}
  Заметки обычным текстом. `null` очищает их.
  ::
::

**Возвращает:** компанию в том виде, в каком её возвращает `organizations.get`.

- Укажите хотя бы одно поле.

## `organizations.archive`

Перемещает компанию в архив. Её история сохраняется.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="organizationId" type="string" required}
  Компания из `organizations.list`.
  ::
::

**Возвращает:** строку компании из списка.

- Отменяется операцией `organizations.unarchive`.
- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## `organizations.unarchive`

Возвращает компанию из архива.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="organizationId" type="string" required}
  Компания из `organizations.list`.
  ::
::

**Возвращает:** строку компании из списка.

## См. также

- [Справочник операций](/mcp/operations)
- [Сессии](/mcp/operations/sessions)
- [Люди и компании в приложении](/knowledge/people-and-companies)
