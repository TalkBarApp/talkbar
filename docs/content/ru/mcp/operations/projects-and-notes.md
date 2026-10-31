---
title: Проекты и заметки
description: Операции MCP и CLI, чтобы показывать, читать, создавать, изменять, распределять, закреплять, перемещать в корзину и восстанавливать проекты и заметки.
navigation:
  icon: i-heroicons-folder
---

Операции с проектами читают проекты, объединяющие ваши сессии, заметки и карточки, и управляют ими. Операции с заметками читают и записывают заметки в формате Markdown, включая собственную заметку сессии. Каждая операция также принимает необязательный `workspaceId`. Общие правила описаны в разделе [Как читать этот справочник](/mcp/operations#как-читать-этот-справочник).

| Операция | Тип | Инструмент | По умолчанию | Группа |
| --- | --- | --- | --- | --- |
| [`projects.list`](#projectslist) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`projects.get`](#projectsget) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`projects.trash.list`](#projectstrashlist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`projects.create`](#projectscreate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`projects.update`](#projectsupdate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`projects.pin`](#projectspin) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`projects.trash`](#projectstrash) | Изменение | `talkbar_delete` | Выкл. | `contentChanges` |
| [`projects.restore`](#projectsrestore) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`notes.list`](#noteslist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`notes.get`](#notesget) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`notes.trash.list`](#notestrashlist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`notes.create`](#notescreate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`notes.update`](#notesupdate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`notes.append`](#notesappend) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`notes.move`](#notesmove) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`notes.pin`](#notespin) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`notes.trash`](#notestrash) | Изменение | `talkbar_delete` | Выкл. | `contentChanges` |
| [`notes.restore`](#notesrestore) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |

## `projects.list`

Постранично показывает проекты рабочего пространства с количеством сессий, заметок и документов и временем начала последней сессии.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы**

::field-group
  ::field{name="limit" type="integer"}
  Сколько вернуть. От 1 до 100. По умолчанию `100`.
  ::
  ::field{name="offset" type="integer"}
  `nextOffset` из предыдущей страницы. По умолчанию `0`.
  ::
::

**Возвращает:** `{items: [{projectId, name, description, sessionCount, noteCount, documentCount, lastSessionAtMs}], totalCount, nextOffset}`.

```json
{"tool": "projects.list", "args": {}}
```

## `projects.get`

Читает обзор одного проекта с последними сессиями (до 20) и заметками (до 10).

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="projectId" type="string" required}
  Проект из `projects.list`.
  ::
::

**Возвращает:** поля `projects.list`, а также `sessions` (строки как в `sessions.list`) и `notes` (`{noteId, title, snippet, updatedAt}`).

- Для проекта в корзине возвращается `not_found`.

```json
{"tool": "projects.get", "args": {"projectId": "proj_456"}}
```

## `projects.trash.list`

Показывает проекты в корзине.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="limit" type="integer"}
  Сколько вернуть. От 1 до 200. По умолчанию `50`.
  ::
::

**Возвращает:** `{projects: [{projectId, name, trashedAt}]}`.

## `projects.create`

Создаёт проект в пределах лимита проектов вашего тарифа.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="name" type="string" required}
  Название проекта. Не может быть пустым.
  ::
  ::field{name="description" type="string"}
  Описание обычным текстом.
  ::
  ::field{name="kind" type="string"}
  Вид проекта. Одно из значений: `client`, `engagement`, `recurring`, `internal`, `personal`, `research`, `product`, `sales`, `hiring`, `education`, `event`, `support`. По умолчанию `client`.
  ::
  ::field{name="color" type="string"}
  Цвет проекта.
  ::
::

**Возвращает:** проект: `{projectId, name, status, kind, pinned, updatedAt}`.

- При достижении лимита проектов вашего тарифа вызов отклоняется с `plan_limit` (`limit: "projects"`); проекты считаются в рабочем пространстве, с которым работает вызов. Лимит показывает `plan.get`.

```json
{"tool": "projects.create", "args": {"name": "Northwind onboarding", "kind": "client"}}
```

## `projects.update`

Переименовывает проект или меняет его описание, вид или цвет.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="projectId" type="string" required}
  Проект из `projects.list`.
  ::
  ::field{name="name" type="string"}
  Новое название. Не может быть пустым.
  ::
  ::field{name="description" type="string | null"}
  Описание обычным текстом; заменяет описание с форматированием, если оно было. `null` очищает его.
  ::
  ::field{name="kind" type="string"}
  Одно из значений: `client`, `engagement`, `recurring`, `internal`, `personal`, `research`, `product`, `sales`, `hiring`, `education`, `event`, `support`.
  ::
  ::field{name="color" type="string | null"}
  Цвет проекта. `null` очищает его.
  ::
::

**Возвращает:** проект в том же виде, что и `projects.create`.

- Укажите хотя бы одно поле.

## `projects.pin`

Закрепляет или открепляет проект.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="projectId" type="string" required}
  Проект из `projects.list`.
  ::
  ::field{name="pinned" type="boolean" required}
  `true` закрепляет, `false` открепляет.
  ::
::

**Возвращает:** `{projectId, pinned}`.

## `projects.trash`

Перемещает проект в корзину. Его можно восстановить.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="projectId" type="string" required}
  Проект из `projects.list`.
  ::
::

**Возвращает:** `{projectId, trashed: true}`. Перемещение в корзину проекта, который уже там, проходит успешно, а дата первого перемещения сохраняется.

- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## `projects.restore`

Возвращает проект из корзины в пределах лимита проектов вашего тарифа.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="projectId" type="string" required}
  Проект из `projects.list`.
  ::
::

**Возвращает:** проект в том же виде, что и `projects.create`. Восстановление проекта, которого нет в корзине, ничего не меняет.

- При достижении лимита проектов отклоняется с `plan_limit` (`limit: "projects"`).

## `notes.list`

Постранично показывает заметки рабочего пространства, начиная с недавно изменённых; можно ограничить проектом, темой, сессией или поиском по названию и тексту.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="projectId" type="string"}
  Только заметки, относящиеся к этому проекту.
  ::
  ::field{name="search" type="string"}
  Текст для поиска в названиях и тексте заметок.
  ::
  ::field{name="topicId" type="string"}
  Только заметки с этой темой (из `topics.list`).
  ::
  ::field{name="sessionId" type="string"}
  Только заметки этой сессии: её собственная заметка, заметки, добавленные на её страницу, и заметки, относящиеся к ней.
  ::
  ::field{name="limit" type="integer"}
  Сколько вернуть. От 1 до 100. По умолчанию `40`.
  ::
  ::field{name="cursor" type="string"}
  Значение `nextCursor` с предыдущей страницы. Не может быть пустым.
  ::
::

**Возвращает:** `{items, nextCursor, hasMore, totalCount}`. У каждого элемента есть `noteId`, `title`, `snippet`, `pinned`, `createdAt`, `updatedAt`, `sessionId`, `sessions`, `topics` и `projects`; при поиске добавляется `matchSnippet`.

- В каждой строке `sessionId` заполнено только у собственной заметки сессии; `sessions` перечисляет сессии, к которым относится заметка.

```json
{"tool": "notes.list", "args": {"search": "onboarding", "limit": 10}}
```

## `notes.get`

Читает одну заметку: её название, текст в формате Markdown (постранично) и ссылки.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="noteId" type="string" required}
  Заметка из `notes.list` или `sessions.notes`.
  ::
  ::field{name="maxChars" type="integer"}
  Размер страницы в символах. От 1 000 до 200 000. По умолчанию `20000`.
  ::
  ::field{name="offset" type="integer"}
  `nextOffset` из предыдущего чтения. Смещение за пределами конца отклоняется.
  ::
::

**Возвращает:** `{noteId, workspaceId, title, markdown, truncated, nextOffset, pinned, createdAt, updatedAt, links}`. `updatedAt` — это значение, которое `notes.update` принимает как `expectedUpdatedAt`.

- Для заметки в корзине возвращается `not_found`.

```json
{"tool": "notes.get", "args": {"noteId": "note_789"}}
```

## `notes.trash.list`

Показывает заметки в корзине.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="limit" type="integer"}
  Сколько вернуть. От 1 до 200. По умолчанию `50`.
  ::
::

**Возвращает:** `{notes: [{noteId, title, trashedAt}]}`.

## `notes.create`

Создаёт заметку из Markdown; её можно сразу отнести к проекту и сессиям.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="title" type="string"}
  Название заметки. Может быть пустым, как в приложении.
  ::
  ::field{name="markdown" type="string"}
  Текст заметки в формате Markdown. (Аргумент называется `markdown`; `body`, `content` и `text` отклоняются.)
  ::
  ::field{name="projectId" type="string"}
  Отнести заметку к этому проекту.
  ::
  ::field{name="sessionIds" type="string[]"}
  Отнести заметку к этим сессиям. Сессия, указанная дважды, учитывается один раз.
  ::
  ::field{name="pinned" type="boolean"}
  Закрепить заметку.
  ::
::

**Возвращает:** `{noteId, title, pinned, sessionId, updatedAt, projectId, sessionIds}`. `projectId` и `sessionIds` показывают, к чему относится заметка.

- Проект и сессии должны существовать и не находиться в корзине.

```json
{"tool": "notes.create", "args": {"title": "Follow-up plan", "markdown": "## Next steps\n- Send the proposal by Friday", "projectId": "proj_456"}}
```

## `notes.update`

Переименовывает заметку и/или заменяет её текст на Markdown.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="noteId" type="string" required}
  Заметка из `notes.list` или `sessions.notes`.
  ::
  ::field{name="title" type="string"}
  Новое название. Пустое название очищает его.
  ::
  ::field{name="markdown" type="string"}
  Новый текст в формате Markdown. Заменяет весь текст заметки.
  ::
  ::field{name="force" type="boolean"}
  Заменить текст, содержащий то, что нельзя передать в Markdown, например встроенные карточки. Без этого аргумента такая заметка отклоняется.
  ::
  ::field{name="expectedUpdatedAt" type="integer"}
  `updatedAt` заметки, от которого вы начали правку. Если с тех пор заметка изменилась — в TalkBar или через другой вызов, — правка отклоняется с `conflict` и ничего не записывается.
  ::
::

**Возвращает:** `{noteId, title, pinned, sessionId, updatedAt}`; для собственной заметки сессии — также `sessionStatus` (и `warning`, если сессия была прервана или TalkBar не запущен).

- Укажите название, markdown или оба. Если меняется только название, текст и встроенные в него ссылки сохраняются.
- Ответ `conflict` содержит текущее значение `updatedAt` заметки: перечитайте заметку, объедините изменения и повторите попытку.
- Заметка в корзине отклоняется: сначала восстановите её.

```json
{"tool": "notes.update", "args": {"noteId": "note_789", "markdown": "# Plan\nUpdated after the call.", "expectedUpdatedAt": 1761990000000}}
```

## `notes.append`

Добавляет Markdown в конец заметки. Проверка на конфликт не нужна, так как текст только дописывается к имеющемуся.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="noteId" type="string" required}
  Заметка из `notes.list` или `sessions.notes`.
  ::
  ::field{name="markdown" type="string" required}
  Добавляемый текст в формате Markdown. Не может быть пустым.
  ::
::

**Возвращает:** то же, что `notes.update`, включая `sessionStatus` для собственной заметки сессии.

- Чтобы писать в заметку текущей сессии, найдите её `noteId` через `sessions.notes` (`role: "session"`).

```json
{"tool": "notes.append", "args": {"noteId": "note_789", "markdown": "- Dana will send the contract draft."}}
```

## `notes.move`

Задаёт проект заметки и/или сессии, к которым она относится. Остальные связи сохраняются.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="noteId" type="string" required}
  Заметка из `notes.list` или `sessions.notes`.
  ::
  ::field{name="projectId" type="string | null"}
  Проект или `null`, чтобы убрать заметку из проекта.
  ::
  ::field{name="sessionIds" type="string[]"}
  Сессии, к которым отнести заметку. Заменяет текущий список сессий заметки.
  ::
::

**Возвращает:** `{noteId, projectId, sessionIds}` — к чему заметка относится теперь.

- Укажите `projectId`, `sessionIds` или оба.

## `notes.pin`

Закрепляет или открепляет заметку.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="noteId" type="string" required}
  Заметка из `notes.list` или `sessions.notes`.
  ::
  ::field{name="pinned" type="boolean" required}
  `true` закрепляет, `false` открепляет.
  ::
::

**Возвращает:** `{noteId, pinned}`.

## `notes.trash`

Перемещает заметку в корзину. Её можно восстановить.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="noteId" type="string" required}
  Заметка из `notes.list` или `sessions.notes`.
  ::
::

**Возвращает:** `{noteId, trashed: true}`. Перемещение в корзину заметки, которая уже там, проходит успешно.

- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## `notes.restore`

Возвращает заметку из корзины.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="noteId" type="string" required}
  Заметка из `notes.list` или `sessions.notes`.
  ::
::

**Возвращает:** `{noteId, restored: true}`. Для заметки, которой нет в корзине, возвращается тот же ответ.

## См. также

- [Справочник операций](/mcp/operations)
- [Сессии](/mcp/operations/sessions)
- [Темы и закладки](/mcp/operations/topics-and-markers)
- [Проекты в приложении](/knowledge/projects)
- [Заметки в приложении](/chats-and-notes/notes)
