---
title: Задачи
description: Операции MCP и CLI, чтобы показывать, читать, создавать, изменять, завершать и убирать задачи, напоминания, вопросы и решения.
navigation:
  icon: i-heroicons-check-circle
---

Операции с задачами работают с четырьмя видами элементов, которые отслеживает TalkBar: задачами, напоминаниями, вопросами и решениями. Элемент относится к сессии, проекту или разделу «Общее» и может указывать на момент сессии, из которого он появился. Каждая операция также принимает необязательный `workspaceId`. Общие правила описаны в разделе [Как читать этот справочник](/mcp/operations#как-читать-этот-справочник).

| Операция | Тип | Инструмент | По умолчанию | Группа |
| --- | --- | --- | --- | --- |
| [`action_items.list`](#action_itemslist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`action_items.get`](#action_itemsget) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`action_items.create`](#action_itemscreate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`action_items.update`](#action_itemsupdate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`action_items.set_status`](#action_itemsset_status) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`action_items.remove`](#action_itemsremove) | Изменение | `talkbar_delete` | Выкл. | `contentChanges` |

## Статусы по типам

| Тип | Статусы |
| --- | --- |
| `task` | `open`, `done` |
| `follow_up` | `open`, `done` |
| `question` | `open`, `answered` |
| `decision` | `active`, `superseded` |

## `action_items.list`

Показывает задачи: собственно задачи, напоминания, вопросы и решения. Можно фильтровать по сессии, проекту, серии, разделу «Общее», типу, статусу, исполнителю или тексту.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string"}
  Только элементы этой сессии. Если он указан, `projectId`, `seriesId`, `generalOnly` и `includeStopped` игнорируются.
  ::
  ::field{name="projectId" type="string"}
  Только элементы этого проекта.
  ::
  ::field{name="seriesId" type="string"}
  Только элементы этой серии.
  ::
  ::field{name="generalOnly" type="boolean"}
  Только элементы раздела «Общее» (не привязанные к проекту). Нельзя сочетать с `projectId` или `seriesId`.
  ::
  ::field{name="itemTypes" type="string[]"}
  Только эти типы: `task`, `follow_up`, `question`, `decision`.
  ::
  ::field{name="statuses" type="string[]"}
  Только эти статусы: `open`, `done`, `answered`, `active`, `superseded`.
  ::
  ::field{name="contactIds" type="string[]"}
  Только элементы, назначенные этим людям.
  ::
  ::field{name="text" type="string"}
  Текст для поиска в названиях и подробностях.
  ::
  ::field{name="includeStopped" type="boolean"}
  Показывать также перенесённые элементы, перенос которых остановлен.
  ::
  ::field{name="limit" type="integer"}
  Сколько вернуть. От 1 до 200. По умолчанию `50`.
  ::
::

**Возвращает:** `{items: [{itemId, itemType, label, title, status, dueAtMs, sessionId, sessionTitle, projectId, assignees, anchor, updatedAt}]}`. `anchor` (`{turnId, pointId, atMs}` или `null`) — момент, к которому привязан элемент.

- Завершённые элементы (выполненные, получившие ответ, заменённые) идут в конце. Значения типа и статуса, не входящие в списки выше, ничему не соответствуют.

```json
{"tool": "action_items.list", "args": {"projectId": "proj_456", "statuses": ["open"]}}
```

## `action_items.get`

Читает одну задачу с подробностями, исполнителями, статусом и источниками.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="itemId" type="string" required}
  Задача из `action_items.list`.
  ::
::

**Возвращает:** `{itemId, itemType, labelId, label, title, details, status, dueAtMs, answer, sessionId, sessionTitle, projectId, assignees: [{name, contactId}], origin, sources, resolvedAtMs, createdAt, updatedAt}`. `sources` перечисляет цитаты и моменты, из которых появился элемент.

## `action_items.create`

Добавляет задачу в сессию, проект или раздел «Общее». Работает и во время записи, задача появляется сразу.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="title" type="string" required}
  Что нужно сделать. Не может быть пустым.
  ::
  ::field{name="sessionId" type="string"}
  Добавить в эту сессию. Без `projectId` элемент получает проект сессии.
  ::
  ::field{name="projectId" type="string"}
  Добавить в этот проект. Если не указан ни `sessionId`, ни `projectId`, элемент попадает в раздел «Общее».
  ::
  ::field{name="itemType" type="string"}
  Одно из значений: `task`, `follow_up`, `question`, `decision`. По умолчанию `task`.
  ::
  ::field{name="labelId" type="string"}
  Идентификатор метки элемента (например, «Идея» или «Препятствие»); `labelId` элемента показывает `action_items.get`. Каждая метка относится к одному типу элементов.
  ::
  ::field{name="details" type="string"}
  Подробности.
  ::
  ::field{name="status" type="string"}
  Одно из значений `open`, `done`, `answered`, `active`, `superseded`, допустимых для этого типа. По умолчанию `open` (`active` для решения).
  ::
  ::field{name="dueAtMs" type="integer | null"}
  Срок как время Unix в мс (только для задач и напоминаний). `null` — без срока.
  ::
  ::field{name="answer" type="string"}
  Ответ (только для вопросов).
  ::
  ::field{name="assignees" type="(string | object)[]"}
  Для кого элемент: имена или объекты `{name, contactId}` с непустым `name`.
  ::
  ::field{name="turnId" type="string"}
  Реплика транскрипта (`sessions.transcript` с `format: "json"`). Привязывает элемент к моменту его сессии. Требует `sessionId`.
  ::
  ::field{name="chunkId" type="string"}
  Фрагмент текущего транскрипта (`sessions.transcript` с `format: "json"`). Привязывает элемент к моменту его сессии. Требует `sessionId`.
  ::
  ::field{name="pointId" type="string"}
  Пункт хронологии (`sessions.timeline`). Нельзя сочетать с `turnId` или `chunkId`. Привязывает элемент к моменту его сессии. Требует `sessionId`.
  ::
  ::field{name="atMs" type="integer"}
  Момент в мс от начала сессии. Вместе с репликой, фрагментом или пунктом он должен попадать внутрь них; во время записи он не может быть позже текущего момента. Привязывает элемент к моменту его сессии. Требует `sessionId`.
  ::
  ::field{name="quote" type="string"}
  Слова, к которым относится элемент. Если указан только он, находится та единственная реплика, в которой есть эти слова. Привязывает элемент к моменту его сессии. Требует `sessionId`.
  ::
::

**Возвращает:** элемент в том же виде, что и `action_items.get`; для сессии — также `sessionStatus` (и `warning`, если сессия была прервана или TalkBar не запущен).

- Идентификатор, которого нет в сессии, отклоняется с `invalid_arguments`.
- Срок у вопроса или решения, а также ответ у чего-либо, кроме вопроса, отклоняются.
- Элемент сохраняет и момент, и идентификаторы, поэтому приложение правильно размещает его и после улучшения транскрипта.

```json
{"tool": "action_items.create", "args": {"sessionId": "ses_123", "title": "Send revised quote", "itemType": "follow_up", "assignees": ["Dana Lee"], "quote": "send you a revised quote"}}
```

## `action_items.update`

Меняет название, подробности, тип, метку, статус, срок, ответ или исполнителей задачи.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="itemId" type="string" required}
  Задача из `action_items.list`.
  ::
  ::field{name="title" type="string"}
  Новое название. Не может быть пустым.
  ::
  ::field{name="details" type="string | null"}
  Подробности. `null` очищает их.
  ::
  ::field{name="itemType" type="string"}
  Одно из значений: `task`, `follow_up`, `question`, `decision`.
  ::
  ::field{name="labelId" type="string"}
  Идентификатор метки элемента (например, «Идея» или «Препятствие»); `labelId` элемента показывает `action_items.get`. Каждая метка относится к одному типу элементов.
  ::
  ::field{name="status" type="string"}
  Одно из значений `open`, `done`, `answered`, `active`, `superseded`, допустимых для этого типа.
  ::
  ::field{name="dueAtMs" type="integer | null"}
  Срок как время Unix в мс. `null` очищает его.
  ::
  ::field{name="answer" type="string | null"}
  Ответ (только для вопросов). `null` очищает его.
  ::
  ::field{name="assignees" type="(string | object)[]"}
  Заменяет исполнителей: имена или объекты `{name, contactId}`.
  ::
::

**Возвращает:** элемент в том же виде, что и `action_items.get`.

- Укажите хотя бы одно поле.

## `action_items.set_status`

Завершает задачу или снова открывает её, при желании с ответом.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="itemId" type="string" required}
  Задача из `action_items.list`.
  ::
  ::field{name="status" type="string" required}
  Новый статус. Задачи и напоминания: `open` или `done`. Вопросы: `open` или `answered`. Решения: `active` или `superseded`.
  ::
  ::field{name="answer" type="string"}
  Ответ, который нужно сохранить (для вопросов).
  ::
::

**Возвращает:** элемент в том же виде, что и `action_items.get`.

- Статус, недопустимый для этого типа, отклоняется с `invalid_arguments` и списком допустимых статусов.

```json
{"tool": "action_items.set_status", "args": {"itemId": "ai_42", "status": "done"}}
```

## `action_items.remove`

Убирает задачу с её доски так же, как приложение: задача, добавленная вами, удаляется, а задача из итогов скрывается.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="itemId" type="string" required}
  Задача из `action_items.list`.
  ::
::

**Возвращает:** `{removed: true, itemId, sessionId, projectId}`, а также `sessionStatus` для задачи сессии.

- У задач нет корзины: повторный вызов возвращает `not_found`.
- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## См. также

- [Справочник операций](/mcp/operations)
- [Сессии](/mcp/operations/sessions)
- [Задачи в приложении](/knowledge/action-items)
