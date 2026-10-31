---
title: Темы и закладки
description: Операции MCP и CLI для тем, которыми помечаются сессии и заметки, для ключевых слов сессии и для закладок на моментах сессии.
navigation:
  icon: i-heroicons-tag
---

Темы помечают сессии и заметки; ключевые слова — это слова, которые TalkBar (или вы) привязывает к сессии; закладки отмечают момент сессии и могут содержать заметку. Каждая операция также принимает необязательный `workspaceId`. Общие правила описаны в разделе [Как читать этот справочник](/mcp/operations#как-читать-этот-справочник).

| Операция | Тип | Инструмент | По умолчанию | Группа |
| --- | --- | --- | --- | --- |
| [`topics.list`](#topicslist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`topics.create`](#topicscreate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`topics.rename`](#topicsrename) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`topics.delete`](#topicsdelete) | Изменение | `talkbar_delete` | Выкл. | `contentChanges` |
| [`topics.assign`](#topicsassign) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`topics.unassign`](#topicsunassign) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`sessions.keywords.get`](#sessionskeywordsget) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`markers.list`](#markerslist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`markers.create`](#markerscreate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`markers.update`](#markersupdate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`markers.delete`](#markersdelete) | Изменение | `talkbar_delete` | Выкл. | `contentChanges` |

## `topics.list`

Выводит темы, которыми помечаются сессии и заметки.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы:** только `workspaceId`.

**Возвращает:** `{topics: [{topicId, name, color}]}`, по алфавиту названий.

```json
{"tool": "topics.list", "args": {}}
```

## `topics.create`

Добавляет тему.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="name" type="string" required}
  Название темы, от 1 до 80 символов.
  ::
  ::field{name="color" type="string"}
  Одно из значений: `slate`, `sky`, `stone`, `teal`, `indigo`, `green`, `yellow`, `blue`, `purple`, `rose`, `lime`, `emerald`, `amber`, `cyan`, `fuchsia`, `pink` — или цвет в шестнадцатеричном виде `#RGB` / `#RRGGBB`. Если цвет не указан, он выбирается по названию, поэтому одно и то же название всегда получает один и тот же цвет.
  ::
::

**Возвращает:** `{topicId, name, color}`.

- Уже существующее название отклоняется с кодом `failed`. Неподдерживаемый цвет отклоняется с кодом `failed` («Unsupported topic color»).

```json
{"tool": "topics.create", "args": {"name": "Hiring", "color": "teal"}}
```

## `topics.rename`

Изменяет название или цвет темы.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="topicId" type="string" required}
  Тема из `topics.list`.
  ::
  ::field{name="name" type="string"}
  Новое название, от 1 до 80 символов.
  ::
  ::field{name="color" type="string"}
  Новый цвет, как в `topics.create`.
  ::
::

**Возвращает:** `{topicId, name, color}`.

- Укажите `name`, `color` или оба.

## `topics.delete`

Удаляет тему и снимает её со всех сессий и заметок.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="topicId" type="string" required}
  Тема из `topics.list`.
  ::
::

**Возвращает:** `{topicId, deleted: true}`.

- У тем нет корзины: тема удаляется так же, как в приложении.
- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## `topics.assign`

Добавляет тему одной сессии или заметке.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="topicId" type="string" required}
  Тема из `topics.list`.
  ::
  ::field{name="sessionId" type="string"}
  Сессия, которую нужно пометить. Укажите это поле или `noteId`, но не оба.
  ::
  ::field{name="noteId" type="string"}
  Заметка, которую нужно пометить. Укажите это поле или `sessionId`, но не оба.
  ::
::

**Возвращает:** `{sessionId, noteId, topics}` — темы элемента после изменения.

```json
{"tool": "topics.assign", "args": {"topicId": "top_9", "sessionId": "ses_123"}}
```

## `topics.unassign`

Снимает тему с одной сессии или заметки.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="topicId" type="string" required}
  Тема из `topics.list`.
  ::
  ::field{name="sessionId" type="string"}
  Сессия. Укажите это поле или `noteId`, но не оба.
  ::
  ::field{name="noteId" type="string"}
  Заметка. Укажите это поле или `sessionId`, но не оба.
  ::
::

**Возвращает:** `{sessionId, noteId, topics}` — темы элемента после изменения.

## `sessions.keywords.get`

Читает ключевые слова сессии.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
::

**Возвращает:** `{sessionId, keywords: [string]}`, а пока идёт запись сессии — ещё и `pending: true`.

- TalkBar записывает свои ключевые слова от ИИ вместе с итогами, после остановки записи; до этого выводятся только ключевые слова, добавленные вами.

```json
{"tool": "sessions.keywords.get", "args": {"sessionId": "ses_123"}}
```

## `markers.list`

Выводит закладки сессии: заметку, время, цвет и слова, прозвучавшие в этот момент.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
::

**Возвращает:** `{sessionId, markers}`. Каждая закладка — `{markerId, sessionId, kind, body, quote, atMs, turnId, chunkId, pointId, color, updatedAt}`.

```json
{"tool": "markers.list", "args": {"sessionId": "ses_123"}}
```

## `markers.create`

Добавляет закладку в сессию, в том числе во время записи: на реплику или фрагмент транскрипта, точку хронологии, момент или цитату, с необязательной заметкой и цветом. Закладка сразу появляется в сессии.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
  ::field{name="turnId" type="string"}
  Реплика транскрипта (`sessions.transcript` с `format: "json"`). Укажите хотя бы одно из полей `turnId`, `chunkId`, `pointId`, `atMs` или `quote`.
  ::
  ::field{name="chunkId" type="string"}
  Фрагмент транскрипта, записанного в реальном времени (`sessions.transcript` с `format: "json"`). Закладка ставится на первую реплику фрагмента. Укажите хотя бы одно из полей `turnId`, `chunkId`, `pointId`, `atMs` или `quote`.
  ::
  ::field{name="pointId" type="string"}
  Точка хронологии (`sessions.timeline`). Нельзя сочетать с `turnId` или `chunkId`. Укажите хотя бы одно из полей `turnId`, `chunkId`, `pointId`, `atMs` или `quote`.
  ::
  ::field{name="atMs" type="integer"}
  Момент в мс от начала сессии. Вместе с репликой, фрагментом или точкой он должен попадать внутрь них; во время записи он не может быть позже текущего момента. Укажите хотя бы одно из полей `turnId`, `chunkId`, `pointId`, `atMs` или `quote`.
  ::
  ::field{name="quote" type="string"}
  Слова, к которым относится закладка. Само по себе это поле находит реплику с этими словами; если таких реплик несколько, добавьте `turnId` или `atMs`, чтобы выбрать одну. Укажите хотя бы одно из полей `turnId`, `chunkId`, `pointId`, `atMs` или `quote`.
  ::
  ::field{name="body" type="string"}
  Заметка к закладке, до 2 000 символов.
  ::
  ::field{name="color" type="string"}
  Цвет закладки, от 1 до 40 символов; по умолчанию `amber`.
  ::
::

**Возвращает:** закладку (`{markerId, sessionId, kind, body, quote, atMs, turnId, chunkId, pointId, color, updatedAt}`) и `sessionStatus` (а также `warning`, если сессия была прервана или идёт её запись, когда TalkBar не запущен).

- Идентификатор, которого нет в сессии, или `atMs` за пределами указанного места отклоняются с кодом `invalid_arguments`.
- Закладка хранит не только идентификаторы, но и свой момент, поэтому приложение правильно размещает её и после улучшения транскрипта.

```json
{"tool": "markers.create", "args": {"sessionId": "ses_123", "quote": "we can ship in March", "body": "Ship date commitment", "color": "rose"}}
```

## `markers.update`

Изменяет заметку или цвет закладки.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="markerId" type="string" required}
  Закладка из `markers.list`.
  ::
  ::field{name="body" type="string"}
  Новая заметка.
  ::
  ::field{name="color" type="string"}
  Новый цвет.
  ::
::

**Возвращает:** закладку и `sessionStatus` (а также `warning`, если сессия была прервана или идёт её запись, когда TalkBar не запущен).

- Укажите `body`, `color` или оба.

## `markers.delete`

Удаляет закладку.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="markerId" type="string" required}
  Закладка из `markers.list`.
  ::
  ::field{name="sessionId" type="string"}
  Необязательная проверка: сессия, которой принадлежит закладка. Если указана другая сессия, ничего не удаляется и возвращается `not_found`.
  ::
::

**Возвращает:** `{markerId, sessionId, deleted: true}` и `sessionStatus` (а также `warning`, если сессия была прервана или идёт её запись, когда TalkBar не запущен). `sessionId` — сессия, которой принадлежит закладка.

- У закладок нет корзины: закладка удаляется так же, как в приложении.
- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## См. также

- [Справочник операций](/mcp/operations)
- [Сессии](/mcp/operations/sessions)
- [Темы и ключевые слова в приложении](/knowledge/topics-and-keywords)
