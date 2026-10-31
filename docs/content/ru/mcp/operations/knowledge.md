---
title: База знаний
description: Операции MCP и CLI для карточек знаний и предложений, найденных при извлечении знаний, — чтобы показывать, читать, создавать, изменять, закреплять, распределять по проектам, архивировать и проверять их.
navigation:
  icon: i-heroicons-light-bulb
---

Операции базы знаний работают с карточками знаний (в аргументах они обозначаются как `memoryId`) и с предложениями, которые находит извлечение знаний. Чтобы управлять карточками одной сессии, используйте операции `sessions.cards.*` на странице [Сессии](/mcp/operations/sessions). Каждая операция также принимает необязательный `workspaceId`. Общие правила описаны в разделе [Как читать этот справочник](/mcp/operations#как-читать-этот-справочник).

| Операция | Тип | Инструмент | По умолчанию | Группа |
| --- | --- | --- | --- | --- |
| [`knowledge.list`](#knowledgelist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`knowledge.get`](#knowledgeget) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`knowledge.create`](#knowledgecreate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`knowledge.update`](#knowledgeupdate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`knowledge.pin`](#knowledgepin) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`knowledge.assign`](#knowledgeassign) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`knowledge.approve`](#knowledgeapprove) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`knowledge.confirm`](#knowledgeconfirm) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`knowledge.mark_outdated`](#knowledgemark_outdated) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`knowledge.archive`](#knowledgearchive) | Изменение | `talkbar_delete` | Выкл. | `contentChanges` |
| [`knowledge.restore`](#knowledgerestore) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`knowledge.suggestions.list`](#knowledgesuggestionslist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`knowledge.suggestions.approve`](#knowledgesuggestionsapprove) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`knowledge.suggestions.dismiss`](#knowledgesuggestionsdismiss) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`knowledge.suggestions.snooze`](#knowledgesuggestionssnooze) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`knowledge.suggestions.reopen`](#knowledgesuggestionsreopen) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |

## Статусы карточек

Карточка может быть в статусе `approved` (одобрена), `outdated` (устарела) или `archived` (в архиве). Когда TalkBar опирается на вашу базу знаний, используются только одобренные карточки, и закреплёнными остаются тоже только одобренные.

| Из статуса | Операция | В статус |
| --- | --- | --- |
| одобрена | `knowledge.mark_outdated` | устарела |
| одобрена или устарела | `knowledge.archive` | в архиве |
| устарела или в архиве | `knowledge.approve` или `knowledge.restore` | одобрена |

Любой другой переход отклоняется с `failed`. Запрос статуса, который у карточки уже есть, ничего не меняет.

## `knowledge.list`

Показывает карточки знаний. Можно фильтровать по статусу, типу, проекту, разделу «Общее», закреплению, сессии или тексту.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="statuses" type="string[]"}
  Только карточки с этими статусами: `approved`, `outdated`, `archived`. По умолчанию — только одобренные карточки.
  ::
  ::field{name="types" type="string[]"}
  Только карточки этих типов: `fact`, `preference`, `decision`, `commitment`, `risk`, `open_question`, `relationship_context`, `instruction`, `key_moment`, `contract_term`, `pricing_detail`, `technical_detail`.
  ::
  ::field{name="projectId" type="string"}
  Только карточки, относящиеся к этому проекту.
  ::
  ::field{name="generalOnly" type="boolean"}
  Только карточки, не относящиеся ни к одному проекту.
  ::
  ::field{name="pinnedOnly" type="boolean"}
  Только закреплённые карточки.
  ::
  ::field{name="query" type="string"}
  Текст для поиска в карточках.
  ::
  ::field{name="sessionId" type="string"}
  Только карточки, взятые в эту сессию, в порядке сессии (так, как их показывает `sessions.live_cards`).
  ::
  ::field{name="offset" type="integer"}
  `nextOffset` из предыдущей страницы. Не меньше 0.
  ::
  ::field{name="limit" type="integer"}
  Сколько вернуть. От 1 до 200. По умолчанию `50`.
  ::
::

**Возвращает:** `{cards: [{memoryId, title, type, status, pinned, projectId, sessionOnly, updatedAt}], total, nextOffset}`. `sessionOnly: true` означает, что карточка остаётся только в своей сессии.

```json
{"tool": "knowledge.list", "args": {"projectId": "proj_456", "types": ["decision", "commitment"]}}
```

## `knowledge.get`

Читает одну карточку знаний с текстом, данными и источниками, включая цитаты.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="memoryId" type="string" required}
  Карточка знаний из `knowledge.list`.
  ::
::

**Возвращает:** карточку: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`, а также `sources: [{sourceType, sourceId, atMs, quote, locator, status}]`.

```json
{"tool": "knowledge.get", "args": {"memoryId": "mem_321"}}
```

## `knowledge.create`

Добавляет карточку знаний. Добавленные вами карточки сразу становятся одобренными.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="title" type="string" required}
  Заголовок карточки. Не может быть пустым.
  ::
  ::field{name="body" type="string"}
  Текст карточки.
  ::
  ::field{name="type" type="string"}
  Одно из значений: `fact`, `preference`, `decision`, `commitment`, `risk`, `open_question`, `relationship_context`, `instruction`, `key_moment`, `contract_term`, `pricing_detail`, `technical_detail`. По умолчанию `fact`.
  ::
  ::field{name="projectId" type="string"}
  Отнести карточку к этому проекту. Без него карточка попадает в раздел «Общее».
  ::
  ::field{name="pinned" type="boolean"}
  Закрепить карточку.
  ::
::

**Возвращает:** карточку: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

```json
{"tool": "knowledge.create", "args": {"title": "Prefers email over calls", "type": "preference", "projectId": "proj_456"}}
```

## `knowledge.update`

Меняет заголовок, текст или тип карточки знаний.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="memoryId" type="string" required}
  Карточка знаний из `knowledge.list`.
  ::
  ::field{name="title" type="string"}
  Новый заголовок. Не может быть пустым.
  ::
  ::field{name="body" type="string"}
  Новый текст.
  ::
  ::field{name="type" type="string"}
  Одно из значений: `fact`, `preference`, `decision`, `commitment`, `risk`, `open_question`, `relationship_context`, `instruction`, `key_moment`, `contract_term`, `pricing_detail`, `technical_detail`.
  ::
::

**Возвращает:** карточку: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

- Укажите хотя бы одно поле.

## `knowledge.pin`

Закрепляет или открепляет карточку знаний.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="memoryId" type="string" required}
  Карточка знаний из `knowledge.list`.
  ::
  ::field{name="pinned" type="boolean" required}
  `true` закрепляет, `false` открепляет. Закрепление относится к самой карточке: она показывается закреплённой во всех сессиях и списках, где она есть.
  ::
::

**Возвращает:** `{memoryId, pinned}`.

- Карточка, которая перестаёт быть одобренной (устаревает или попадает в архив), открепляется, и последующее одобрение или восстановление не закрепляет её снова.

## `knowledge.assign`

Относит карточки знаний к проекту или убирает их из проекта.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="memoryIds" type="string[]" required}
  Карточки, которые нужно отнести к проекту. Не может быть пустым.
  ::
  ::field{name="projectId" type="string | null" required}
  Проект или `null`, чтобы убрать карточки из проекта. Обязательный аргумент.
  ::
::

**Возвращает:** `{memoryIds, projectId, changed}`.

```json
{"tool": "knowledge.assign", "args": {"memoryIds": ["mem_321", "mem_322"], "projectId": "proj_456"}}
```

## `knowledge.approve`

Возвращает карточку знаний в статус одобренной. Одобрение уже одобренной карточки ничего не меняет.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="memoryId" type="string" required}
  Карточка знаний из `knowledge.list`.
  ::
::

**Возвращает:** карточку: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

- У карточек нет статуса «ожидает проверки»: то, что находит извлечение знаний, — это предложения. Их одобряют через `knowledge.suggestions.approve`.

## `knowledge.confirm`

Подтверждает, что карточка знаний всё ещё актуальна. Записывает время в `lastConfirmedAtMs` и не меняет статус.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="memoryId" type="string" required}
  Карточка знаний из `knowledge.list`.
  ::
::

**Возвращает:** карточку: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

## `knowledge.mark_outdated`

Отмечает карточку знаний как устаревшую.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="memoryId" type="string" required}
  Карточка знаний из `knowledge.list`.
  ::
::

**Возвращает:** карточку: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

- Устаревшая карточка открепляется. Чтобы вернуть её, одобрите или восстановите её.

## `knowledge.archive`

Отправляет карточку знаний в архив. Её можно восстановить.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="memoryId" type="string" required}
  Карточка знаний из `knowledge.list`.
  ::
::

**Возвращает:** карточку: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

- При архивации карточка открепляется.
- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## `knowledge.restore`

Возвращает карточку знаний из архива (или устаревшую карточку) в статус одобренной.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="memoryId" type="string" required}
  Карточка знаний из `knowledge.list`.
  ::
::

**Возвращает:** карточку: `{memoryId, title, body, type, status, pinned, priority, confidence, projectId, contactId, organizationId, sessionId, sessionOnly, createdBy, lastConfirmedAtMs, createdAt, updatedAt}`.

## `knowledge.suggestions.list`

Показывает карточки, людей и компании, которые предлагает извлечение знаний, вместе с цитатами, из которых они взяты.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="status" type="string"}
  Одно из значений: `pending`, `approving`, `approved`, `dismissed`. По умолчанию `pending`.
  ::
  ::field{name="kind" type="string"}
  Только предложения для `memory` (карточки знаний), `contact` (человека) или `organization` (компании).
  ::
  ::field{name="projectId" type="string"}
  Только предложения для этого проекта.
  ::
  ::field{name="query" type="string"}
  Текст для поиска в предложениях.
  ::
  ::field{name="limit" type="integer"}
  Сколько вернуть. От 1 до 100. По умолчанию `50`.
  ::
  ::field{name="cursor" type="string"}
  `nextCursor` из предыдущей страницы.
  ::
::

**Возвращает:** `{suggestions, hasMore, nextCursor}`. У каждого предложения есть `suggestionId`, `kind`, `action`, `status`, `proposal`, `evidence`, `targetId`, `confidence`, `projectId`, `sessionId`, `documentId`, `snoozedUntilMs`, `appliedCardId` и `createdAt`.

```json
{"tool": "knowledge.suggestions.list", "args": {"kind": "memory", "limit": 20}}
```

## `knowledge.suggestions.approve`

Принимает предложение.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="suggestionId" type="string" required}
  Предложение из `knowledge.suggestions.list`.
  ::
  ::field{name="approveWithoutSource" type="boolean"}
  Если сессия или документ, из которых взято предложение, больше недоступны, всё равно одобрить его, уже без связи с источником. Без этого аргумента такое предложение отклоняется.
  ::
::

**Возвращает:** предложение в его текущем состоянии.

```json
{"tool": "knowledge.suggestions.approve", "args": {"suggestionId": "sug_55"}}
```

## `knowledge.suggestions.dismiss`

Отклоняет предложение. Отменить можно через `knowledge.suggestions.reopen`.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="suggestionId" type="string" required}
  Предложение из `knowledge.suggestions.list`.
  ::
::

**Возвращает:** предложение в его текущем состоянии.

## `knowledge.suggestions.snooze`

Скрывает предложение до указанного времени. Отменить можно через `knowledge.suggestions.reopen`.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="suggestionId" type="string" required}
  Предложение из `knowledge.suggestions.list`.
  ::
  ::field{name="untilMs" type="integer" required}
  Когда показать его снова, как время Unix в мс. Должно быть в будущем.
  ::
::

**Возвращает:** предложение в его текущем состоянии.

## `knowledge.suggestions.reopen`

Возвращает отклонённое или отложенное предложение на проверку.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="suggestionId" type="string" required}
  Предложение из `knowledge.suggestions.list`.
  ::
::

**Возвращает:** предложение в его текущем состоянии.

## См. также

- [Справочник операций](/mcp/operations)
- [Сессии](/mcp/operations/sessions) (карточки сессии)
- [Карточки знаний в приложении](/knowledge/knowledge-cards)
- [Проверка и извлечение](/knowledge/review-and-scans)
