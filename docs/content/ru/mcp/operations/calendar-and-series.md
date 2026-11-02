---
title: Календарь и серии
description: Операции MCP и CLI для запланированных встреч — просмотр, планирование, подготовка, перенос, пропуск и отмена, — а также для серий сессий.
navigation:
  icon: i-heroicons-calendar-days
---

Операции с календарём работают с запланированными встречами (в API — `occurrence`), теми же, что показывают календарь приложения и страница подготовки к встрече. Операции с сериями управляют сериями сессий и их расписаниями. Большинство этих операций по умолчанию включены в разделе «Доступ по MCP». Ассистенты могут планировать и готовить встречи, но запись всегда начинается в приложении. Каждая операция также принимает необязательный `workspaceId`. Общие правила описаны в разделе [Как читать этот справочник](/mcp/operations#как-читать-этот-справочник).

| Операция | Тип | Инструмент | По умолчанию | Группа |
| --- | --- | --- | --- | --- |
| [`calendar.upcoming`](#calendarupcoming) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`calendar.get`](#calendarget) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`calendar.prep`](#calendarprep) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`calendar.actionable`](#calendaractionable) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`calendar.schedule`](#calendarschedule) | Изменение | `talkbar_change` | Вкл. | `scheduling` |
| [`calendar.prepare`](#calendarprepare) | Изменение | `talkbar_change` | Вкл. | `scheduling` |
| [`calendar.prep.edit`](#calendarprepedit) | Изменение | `talkbar_change` | Вкл. | `scheduling` |
| [`calendar.move`](#calendarmove) | Изменение | `talkbar_change` | Вкл. | `scheduling` |
| [`calendar.snooze`](#calendarsnooze) | Изменение | `talkbar_change` | Вкл. | `scheduling` |
| [`calendar.cancel`](#calendarcancel) | Изменение | `talkbar_delete` | Вкл. | `scheduling` |
| [`calendar.skip`](#calendarskip) | Изменение | `talkbar_delete` | Вкл. | `scheduling` |
| [`calendar.start`](#calendarstart) | Изменение | `talkbar_change` | Вкл. | `scheduling` |
| [`calendar.tick`](#calendartick) | Изменение | `talkbar_change` | Выкл. | `scheduling` |
| [`series.list`](#serieslist) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`series.get`](#seriesget) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`series.kinds.list`](#serieskindslist) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`series.schedule.get`](#seriesscheduleget) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`series.create`](#seriescreate) | Изменение | `talkbar_change` | Вкл. | `scheduling` |
| [`series.update`](#seriesupdate) | Изменение | `talkbar_change` | Вкл. | `scheduling` |
| [`series.archive`](#seriesarchive) | Изменение | `talkbar_delete` | Вкл. | `scheduling` |
| [`series.sessions.assign`](#seriessessionsassign) | Изменение | `talkbar_change` | Вкл. | `scheduling` |
| [`series.schedule.set`](#seriesscheduleset) | Изменение | `talkbar_change` | Вкл. | `scheduling` |

## Статусы встреч

Встреча может иметь статус `planned`, `started`, `completed`, `missed`, `skipped`, `cancelled` или `unscheduled`. Время указывается в миллисекундах эпохи Unix.

## Встречи из подключённых календарей

Встречи, импортированные из календаря, подключённого в разделе [Настройки → Календари](/settings/calendar-sync), здесь считаются обычными встречами. `calendar.upcoming` показывает их, и операции на этой странице с ними работают.

Ни одна операция не добавляет, не изменяет, не синхронизирует и не удаляет подключённый календарь. Это остаётся в приложении, а синхронизация идёт только пока приложение открыто.

У каждой встречи есть дополнительные поля. У встречи, созданной в TalkBar, они равны `null`:

| Поле | Что содержит |
| --- | --- |
| `sourceId` | Подключённый календарь, из которого пришла встреча. |
| `externalUid` | Идентификатор события в этом календаре. |
| `joinUrl` | Ссылка на встречу, найденная в событии. |
| `location`, `description` | Место и описание события. |
| `syncState` | `synced`, `local_override` или `remote_removed`. |

- `calendar.move` или новое название через `calendar.prepare` переводят встречу в `local_override`: при следующей синхронизации она сохранит ваше время и название.
- Встреча, событие которой удалено или отменено, получает `remote_removed` и статус `cancelled`. `calendar.upcoming` показывает её, только если в `statuses` указан `cancelled`.
- `quiet` равен `true` у встречи, для которой вы отключили напоминания. См. [Встречи без напоминаний](/settings/calendar-sync#встречи-без-напоминаний).

## `calendar.upcoming`

Постранично выводит отдельные встречи и встречи серий в заданном интервале времени, начиная с ближайших.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы**

::field-group
  ::field{name="startAtMs" type="integer" required}
  Начало интервала, мс эпохи Unix. Выводятся встречи, которые пересекаются с интервалом.
  ::
  ::field{name="endAtMs" type="integer" required}
  Конец интервала, мс эпохи Unix. Не может быть раньше `startAtMs`.
  ::
  ::field{name="includeArchived" type="boolean"}
  Показывать и запланированные встречи серий из архива, которые календарь приложения скрывает. По умолчанию `false`.
  ::
  ::field{name="statuses" type="string[]"}
  Какие встречи выводить. Значения: `planned`, `started`, `completed`, `missed`, `skipped`, `cancelled`. Если поле пустое или не указано — запланированные, начатые, завершённые и несостоявшиеся.
  ::
  ::field{name="limit" type="integer"}
  Сколько вернуть: от 1 до 500. По умолчанию `100`.
  ::
  ::field{name="offset" type="integer"}
  `nextOffset` из предыдущей страницы.
  ::
::

**Возвращает:** `{occurrences, nextOffset}`. Строки — это встречи в том виде, в каком их возвращает `calendar.get`, только вместо самих настроек запуска указано `prepared: true/false` (прочитать настройки можно через `calendar.get` или `calendar.prep`).

```json
{"tool": "calendar.upcoming", "args": {"startAtMs": 1761955200000, "endAtMs": 1762560000000}}
```

## `calendar.get`

Читает одну запланированную встречу.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы**

::field-group
  ::field{name="occurrenceId" type="string" required}
  Запланированная встреча из `calendar.upcoming`.
  ::
::

**Возвращает:** встречу: `occurrenceId`, `workspaceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (сохранённые настройки запуска в виде строки JSON), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false для встречи, подготовленной без запланированного времени), `sessionTitle` (название связанной сессии, когда оно появится), `sourceId`, `externalUid`, `joinUrl`, `location`, `description`, `syncState` (см. [Встречи из подключённых календарей](#встречи-из-подключённых-календарей)), `quiet` (в приложении выбрано «Не напоминать»: встреча видна в календаре, но не напоминает о себе и не начинается автоматически), `createdAt`, `updatedAt`.

```json
{"tool": "calendar.get", "args": {"occurrenceId": "occ_1"}}
```

## `calendar.prep`

Читает то, что показывает для встречи страница подготовки в приложении: заметки к встрече, карточки и документы, с которыми она начнётся, задачи, которые она забирает с других встреч, и предыдущую сессию серии.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="occurrenceId" type="string" required}
  Запланированная встреча из `calendar.upcoming`.
  ::
::

**Возвращает:** `occurrenceId`, `title`, `status`, `plannedStartAtMs`, `durationMinutes`, `seriesId`, `sessionId`, `prepared`, `preparable`, `projectId`, `sessionTemplateId`, `notes` (`[{noteId, title, preview, updatedAt}]`), `cards` (`[{memoryId, title, type, status}]`), `documents`, `actionItems` (`{carried, carriedOverflow, added, skipped, suggested}`) и `previousSession` (`{sessionId, title, startedAtMs, private}` или `null`).

- Заметку к встрече можно прочитать через `notes.get`, а итоги предыдущей сессии — через `sessions.get`. Заметки к встрече пишутся в приложении.

```json
{"tool": "calendar.prep", "args": {"occurrenceId": "occ_1"}}
```

## `calendar.actionable`

Выводит напоминания о встречах, которые ждут действия «Начать», «Отложить» или «Пропустить».

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы:** только `workspaceId`.

**Возвращает:** массив напоминаний `[{jobId, occurrenceId, offsetMinutes, remindAtMs, status, snoozedUntilMs, createdAt, updatedAt}]`, начиная с ближайших. Саму встречу можно прочитать через `calendar.get`.

## `calendar.schedule`

Планирует отдельную встречу или встречу серии. Запись при этом никогда не начинается.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="occurrenceId" type="string" required}
  Идентификатор новой встречи, который вы выбираете сами. Должен быть новым.
  ::
  ::field{name="plannedStartAtMs" type="integer" required}
  Время начала, мс эпохи Unix. Прошедшее время допускается, чтобы встречу можно было внести уже после того, как она состоялась.
  ::
  ::field{name="durationMinutes" type="integer" required}
  Длительность в минутах, не меньше 1.
  ::
  ::field{name="timezone" type="string" required}
  Часовой пояс IANA, например `America/New_York`.
  ::
  ::field{name="seriesId" type="string"}
  Добавить встречу в эту серию. Серия должна быть активной (не в архиве).
  ::
  ::field{name="title" type="string"}
  Название встречи, от 1 до 200 символов.
  ::
  ::field{name="reminderOffsetsMinutes" type="integer[]"}
  За сколько минут до начала напомнить. До 6 значений, каждое от 0 до 10 080; повторы убираются. По умолчанию `[10]`.
  ::
  ::field{name="startMode" type="string"}
  `prompt` (спросить перед началом) или `automatic` (начать после обратного отсчёта в приложении). По умолчанию `prompt`.
  ::
  ::field{name="autoStartCountdownSeconds" type="integer"}
  Длительность обратного отсчёта перед автоматическим началом, в секундах: от 5 до 300. По умолчанию `60`.
  ::
  ::field{name="preparedSetup" type="object"}
  Настройки запуска, которые сохраняет подготовка к встрече в приложении. Для неуказанных полей остаются значения приложения по умолчанию. Неизвестные поля отклоняются.

  - `source`: `mic`, `system` или `both`; `micDeviceId`.
  - `sessionTemplateId`, `projectId`, `topicIds`, `memoryIds` (карточки знаний), `documentIds`.
  - `summariesEnabled`, `summaryLanguage` (`auto` или код языка итогов), `summaryLength` (`short`, `standard` или `detailed`), `summaryModel` (`{providerId, modelId}`).
  - `participants`: `[{name, contactId}]`; у каждого участника должно быть `name`.
  - `memoryMode`: `normal`, `session_only`, `manual_only` или `sensitive`. `speakerMode`: `solo`, `duo`, `small` или `large`. `privateSession`.
  - `origin`: `{name, url}`.
  - `actionItemIds`, `skippedActionItemIds`: только для чтения; встреча сохраняет свои списки (изменить их можно через `calendar.prep.edit`).

  Шаблоны, проекты, люди, карточки и документы должны быть в этом рабочем пространстве, а карточки — одобрены.
  ::
::

**Возвращает:** встречу: `occurrenceId`, `workspaceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (сохранённые настройки запуска в виде строки JSON), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false для встречи, подготовленной без запланированного времени), `sessionTitle` (название связанной сессии, когда оно появится), `sourceId`, `externalUid`, `joinUrl`, `location`, `description`, `syncState` (см. [Встречи из подключённых календарей](#встречи-из-подключённых-календарей)), `quiet` (в приложении выбрано «Не напоминать»: встреча видна в календаре, но не напоминает о себе и не начинается автоматически), `createdAt`, `updatedAt`. Её статус — `planned`.

- Создаёт напоминания так же, как приложение. Повторяющийся `occurrenceId` отклоняется с кодом `failed`.

```json
{"tool": "calendar.schedule", "args": {"occurrenceId": "occ_weekly_sync_1107", "plannedStartAtMs": 1762531200000, "durationMinutes": 30, "timezone": "America/New_York", "title": "Weekly sync"}}
```

## `calendar.prepare`

Изменяет название, настройки запуска, напоминания или режим запуска встречи. Неуказанные поля сохраняют свои значения.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="occurrenceId" type="string" required}
  Запланированная встреча из `calendar.upcoming`.
  ::
  ::field{name="title" type="string | null"}
  Новое название от 1 до 200 символов или `null`, чтобы очистить его.
  ::
  ::field{name="reminderOffsetsMinutes" type="integer[]"}
  За сколько минут до начала напомнить. До 6 значений, каждое от 0 до 10 080.
  ::
  ::field{name="startMode" type="string"}
  `prompt` или `automatic`.
  ::
  ::field{name="autoStartCountdownSeconds" type="integer"}
  Длительность обратного отсчёта перед автоматическим началом, в секундах: от 5 до 300.
  ::
  ::field{name="preparedSetup" type="object"}
  Настройки запуска, как в `calendar.schedule`. Если поле указано, оно целиком заменяет сохранённые настройки: прочитайте их через `calendar.get`, измените и отправьте обратно полностью. `null` очищает их.
  ::
::

**Возвращает:** встречу: `occurrenceId`, `workspaceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (сохранённые настройки запуска в виде строки JSON), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false для встречи, подготовленной без запланированного времени), `sessionTitle` (название связанной сессии, когда оно появится), `sourceId`, `externalUid`, `joinUrl`, `location`, `description`, `syncState` (см. [Встречи из подключённых календарей](#встречи-из-подключённых-календарей)), `quiet` (в приложении выбрано «Не напоминать»: встреча видна в календаре, но не напоминает о себе и не начинается автоматически), `createdAt`, `updatedAt`.

- Работает с запланированными, несостоявшимися и незапланированными встречами; для остальных запрос отклоняется с кодом `failed`. Подготовка несостоявшейся встречи снова делает её запланированной.
- Встреча, время начала которой прошло, всегда получает режим `prompt`.

```json
{"tool": "calendar.prepare", "args": {"occurrenceId": "occ_1", "title": "Northwind kickoff", "reminderOffsetsMinutes": [15, 5]}}
```

## `calendar.prep.edit`

Добавляет или убирает карточки знаний, документы и задачи с других встреч, с которыми начнётся встреча, или пропускает перенесённую задачу — так же, как страница подготовки в приложении. Применяются либо все изменения, либо ни одного.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="occurrenceId" type="string" required}
  Запланированная встреча из `calendar.upcoming`.
  ::
  ::field{name="edits" type="object[]" required}
  Изменения, от 1 до 50. Каждое имеет вид `{kind, id, add}`:

  - `kind`: `memory` (карточка знаний), `document`, `actionItem` (задача, напоминание или вопрос с другой встречи) или `skippedActionItem` (перенесённая задача, которую не нужно брать на эту встречу).
  - `id`: идентификатор элемента.
  - `add`: `true` добавляет (или пропускает); `false` убирает (или возвращает пропущенный элемент).
  ::
::

**Возвращает:** подготовку к встрече: `occurrenceId`, `prepared`, `preparable`, `sessionId`, `projectId`, `memoryIds`, `documentIds`, `maxMemoryCount`, `maxDocumentCount`, `sessionTemplateId`, `hasContent`, `draftCount` и `actionItemCount`. Полные списки показывает `calendar.prep`.

- Неверный идентификатор или тип, пропуск элемента, который не был перенесён, или элемент, который одновременно добавлен и пропущен, отклоняются с кодом `invalid_arguments`, и ничего не меняется.
- Для встречи, которая уже началась, была отменена или пропущена, запрос отклоняется с кодом `failed`.

```json
{"tool": "calendar.prep.edit", "args": {"occurrenceId": "occ_1", "edits": [{"kind": "memory", "id": "mem_321", "add": true}, {"kind": "document", "id": "doc_8", "add": true}]}}
```

## `calendar.move`

Переносит одну встречу и обновляет её напоминания и автоматическое начало. Остальные встречи серии не меняются.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="occurrenceId" type="string" required}
  Запланированная встреча из `calendar.upcoming`.
  ::
  ::field{name="plannedStartAtMs" type="integer" required}
  Новое время начала, мс эпохи Unix. Должно быть в будущем.
  ::
::

**Возвращает:** встречу: `occurrenceId`, `workspaceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (сохранённые настройки запуска в виде строки JSON), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false для встречи, подготовленной без запланированного времени), `sessionTitle` (название связанной сессии, когда оно появится), `sourceId`, `externalUid`, `joinUrl`, `location`, `description`, `syncState` (см. [Встречи из подключённых календарей](#встречи-из-подключённых-календарей)), `quiet` (в приложении выбрано «Не напоминать»: встреча видна в календаре, но не напоминает о себе и не начинается автоматически), `createdAt`, `updatedAt`. Её статус — `planned`.

- Работает с запланированными, несостоявшимися и незапланированными встречами.

```json
{"tool": "calendar.move", "args": {"occurrenceId": "occ_1", "plannedStartAtMs": 1762617600000}}
```

## `calendar.snooze`

Откладывает напоминание о запланированной встрече и отменяет обратный отсчёт автоматического начала, если он идёт. Встреча остаётся запланированной.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="occurrenceId" type="string" required}
  Запланированная встреча из `calendar.upcoming`.
  ::
  ::field{name="snoozedUntilMs" type="integer" required}
  Когда напомнить снова, мс эпохи Unix. Должно быть в будущем.
  ::
::

**Возвращает:** встречу: `occurrenceId`, `workspaceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (сохранённые настройки запуска в виде строки JSON), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false для встречи, подготовленной без запланированного времени), `sessionTitle` (название связанной сессии, когда оно появится), `sourceId`, `externalUid`, `joinUrl`, `location`, `description`, `syncState` (см. [Встречи из подключённых календарей](#встречи-из-подключённых-календарей)), `quiet` (в приложении выбрано «Не напоминать»: встреча видна в календаре, но не напоминает о себе и не начинается автоматически), `createdAt`, `updatedAt`.

- Отложить можно только запланированную встречу.
- После откладывания режим запуска встречи становится `prompt`.

## `calendar.cancel`

Отменяет одну запланированную встречу вместе с её напоминаниями и автоматическим началом. Серия в архив не перемещается.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="occurrenceId" type="string" required}
  Запланированная встреча из `calendar.upcoming`.
  ::
::

**Возвращает:** встречу: `occurrenceId`, `workspaceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (сохранённые настройки запуска в виде строки JSON), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false для встречи, подготовленной без запланированного времени), `sessionTitle` (название связанной сессии, когда оно появится), `sourceId`, `externalUid`, `joinUrl`, `location`, `description`, `syncState` (см. [Встречи из подключённых календарей](#встречи-из-подключённых-календарей)), `quiet` (в приложении выбрано «Не напоминать»: встреча видна в календаре, но не напоминает о себе и не начинается автоматически), `createdAt`, `updatedAt`. Её статус — `cancelled`.

- Отменить можно только запланированную встречу; иначе ответ `failed` называет её текущий статус.
- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## `calendar.skip`

Пропускает одну запланированную встречу и отменяет её напоминания и обратный отсчёт. Серия и другие её встречи не меняются.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="occurrenceId" type="string" required}
  Запланированная встреча из `calendar.upcoming`.
  ::
::

**Возвращает:** встречу: `occurrenceId`, `workspaceId`, `seriesId`, `scheduleId`, `plannedStartAtMs`, `originalStartAtMs`, `durationMinutes`, `timezone`, `status`, `sessionId`, `title`, `preparedSetupJson` (сохранённые настройки запуска в виде строки JSON), `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `moved`, `wasScheduled` (false для встречи, подготовленной без запланированного времени), `sessionTitle` (название связанной сессии, когда оно появится), `sourceId`, `externalUid`, `joinUrl`, `location`, `description`, `syncState` (см. [Встречи из подключённых календарей](#встречи-из-подключённых-календарей)), `quiet` (в приложении выбрано «Не напоминать»: встреча видна в календаре, но не напоминает о себе и не начинается автоматически), `createdAt`, `updatedAt`. Её статус — `skipped`.

- Пропустить можно только запланированную встречу; иначе ответ `failed` называет её текущий статус.
- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## `calendar.start`

Проверяет, можно ли начать встречу отсюда. MCP и CLI никогда не ведут запись, поэтому операция ничего не меняет и только объясняет, почему встречу начать нельзя.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="occurrenceId" type="string" required}
  Запланированная встреча из `calendar.upcoming`.
  ::
::

**Возвращает:** `{intent: null, unavailableReason}`. `unavailableReason` — `captureHostUnavailable` для запланированной встречи и `notPlanned` для остальных.

- Операция не проверяет, может ли приложение начать встречу прямо сейчас. Начинайте запись в приложении.

## `calendar.tick`

Выполняет один проход планировщика встреч: создаёт предстоящие встречи по расписаниям серий, готовит для них напоминания и отмечает как несостоявшиеся прошедшие встречи без записи. Уведомлений не отправляет и ничего не записывает.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="horizonEndMs" type="integer" required}
  Создавать встречи до этого момента, мс эпохи Unix. Не может быть раньше `nowMs`.
  ::
  ::field{name="nowMs" type="integer" required}
  Момент, для которого выполняется проход, мс эпохи Unix.
  ::
  ::field{name="limit" type="integer"}
  Наибольшее число подошедших по времени элементов за один проход: от 1 до 100. По умолчанию `32`.
  ::
::

**Возвращает:** массив обратных отсчётов автоматического начала, время которых подошло: `[{kind, intent, occurrence}]`.

- Приложение выполняет эту операцию само; в разделе «Доступ по MCP» она по умолчанию выключена, и ассистенту она редко нужна.

## `series.list`

Выводит серии сессий со счётчиками.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы**

::field-group
  ::field{name="includeArchived" type="boolean"}
  Показывать и серии из архива.
  ::
::

**Возвращает:** массив серий (в том виде, в каком их возвращает `series.get`) с полями `sessionCount`, `lastSessionStartedAtMs`, `nextPlannedAtMs`, `projectName`, `customKind` и `schedule` (`{enabled, scheduleKind, rrule, localDate, localTime, timezone, durationMinutes}` или `null`).

```json
{"tool": "series.list", "args": {}}
```

## `series.get`

Читает одну серию сессий.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы**

::field-group
  ::field{name="seriesId" type="string" required}
  Серия из `series.list`.
  ::
::

**Возвращает:** серию: `seriesId`, `workspaceId`, `name`, `kind`, `customKindId`, `description`, `projectId`, `anchorContactId`, `templateId`, `startTemplateJson`, `archivedAtMs`, `createdAt`, `updatedAt`.

## `series.kinds.list`

Выводит встроенные типы серий с рекомендуемыми шаблонами, собственные типы серий рабочего пространства и значки, которые может использовать тип.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы:** только `workspaceId`.

**Возвращает:** `{builtin: [{key, suggestedTemplateId}], custom: [{kindId, name, icon, createdAt, updatedAt}], icons}`.

## `series.schedule.get`

Читает расписание серии, если оно есть.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы**

::field-group
  ::field{name="seriesId" type="string" required}
  Серия из `series.list`.
  ::
::

**Возвращает:** расписание или `null`: `scheduleId`, `seriesId`, `enabled`, `scheduleKind`, `timezone`, `localDate`, `localTime`, `durationMinutes`, `title`, `rrule`, `reminderOffsetsMinutes`, `startMode`, `autoStartCountdownSeconds`, `effectiveFromOriginalStartMs` (заполняется, если расписание действует начиная с определённой встречи), `createdAt`, `updatedAt`.

## `series.create`

Создаёт серию сессий, которую можно связать с проектом, человеком и шаблоном.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="seriesId" type="string" required}
  Идентификатор новой серии, который вы выбираете сами. Должен быть новым.
  ::
  ::field{name="name" type="string" required}
  Название серии, от 1 до 120 символов.
  ::
  ::field{name="kind" type="string" required}
  Тип серии: `oneOnOne`, `standup`, `teamMeeting`, `inPersonMeeting`, `clientMeeting`, `phoneCall`, `interview`, `hiringInterview`, `userResearch`, `salesCall`, `customerCheckIn`, `investorCall`, `legalConsultation`, `boardMeeting`, `leadershipSync`, `coaching`, `mentoring`, `workshop`, `training`, `brainstorm`, `retro`, `presentation`, `presentationPractice`, `productLaunch`, `lecture`, `class`, `course`, `educationalTalk`, `tutorial`, `webinar`, `panelDiscussion`, `podcast`, `videoWatching`, `voiceJournal`, `speakingPractice` или `custom`.
  ::
  ::field{name="customKindId" type="string"}
  При `kind: "custom"` — один из собственных типов серий рабочего пространства (`series.kinds.list`).
  ::
  ::field{name="description" type="string"}
  Описание.
  ::
  ::field{name="projectId" type="string"}
  Проект, к которому относится серия.
  ::
  ::field{name="anchorContactId" type="string"}
  Главный человек, с которым проходит серия.
  ::
  ::field{name="templateId" type="string"}
  Шаблон, с которым начинаются её сессии.
  ::
::

**Возвращает:** серию: `seriesId`, `workspaceId`, `name`, `kind`, `customKindId`, `description`, `projectId`, `anchorContactId`, `templateId`, `startTemplateJson`, `archivedAtMs`, `createdAt`, `updatedAt`.

- Сессии остаются отдельными, пока вы не добавите их в серию через `series.sessions.assign`. Повторяющийся `seriesId` отклоняется с кодом `failed`.

```json
{"tool": "series.create", "args": {"seriesId": "ser_dana_1on1", "name": "1:1 with Dana", "kind": "oneOnOne", "anchorContactId": "ct_77"}}
```

## `series.update`

Изменяет данные серии. Поля, допускающие `null`, очищаются значением `null`.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="seriesId" type="string" required}
  Серия из `series.list`.
  ::
  ::field{name="name" type="string"}
  Новое название, от 1 до 120 символов.
  ::
  ::field{name="kind" type="string"}
  Тип серии, как в `series.create`.
  ::
  ::field{name="customKindId" type="string | null"}
  Один из собственных типов серий рабочего пространства, для `kind: "custom"`. `null` очищает его.
  ::
  ::field{name="description" type="string | null"}
  Описание. `null` очищает его.
  ::
  ::field{name="projectId" type="string | null"}
  Проект, к которому относится серия. `null` очищает его.
  ::
  ::field{name="anchorContactId" type="string | null"}
  Главный человек, с которым проходит серия. `null` очищает его.
  ::
  ::field{name="templateId" type="string | null"}
  Шаблон, с которым начинаются её сессии. `null` очищает его.
  ::
::

**Возвращает:** серию: `seriesId`, `workspaceId`, `name`, `kind`, `customKindId`, `description`, `projectId`, `anchorContactId`, `templateId`, `startTemplateJson`, `archivedAtMs`, `createdAt`, `updatedAt`.

- Укажите хотя бы одно поле. Сессии серии не меняются.

## `series.archive`

Перемещает серию в архив или восстанавливает её. Её сессии и история сохраняются.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="seriesId" type="string" required}
  Серия из `series.list`.
  ::
  ::field{name="archived" type="boolean" required}
  `true` перемещает в архив, `false` восстанавливает.
  ::
::

**Возвращает:** серию: `seriesId`, `workspaceId`, `name`, `kind`, `customKindId`, `description`, `projectId`, `anchorContactId`, `templateId`, `startTemplateJson`, `archivedAtMs`, `createdAt`, `updatedAt`.

- Архивация скрывает запланированные встречи серии (из календаря приложения, а также из `calendar.upcoming`, если не задан `includeArchived`) и останавливает их напоминания и автоматическое начало. Несостоявшимися они не отмечаются.
- Восстановление возвращает будущие встречи, а те, время которых прошло, пока серия была в архиве, получают статус `skipped`.
- Если серия уже в архиве, повторная архивация сохраняет дату первой.
- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## `series.sessions.assign`

Добавляет сессии в серию или убирает их из серии.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="sessionIds" type="string[]" required}
  Сессии, которые нужно переместить, хотя бы одна. Сессия, указанная дважды, учитывается один раз.
  ::
  ::field{name="seriesId" type="string | null" required}
  Серия или `null`, чтобы убрать сессии из их серии. Обязательное поле.
  ::
::

**Возвращает:** `{changed}` — сколько сессий изменилось.

- В серию из архива нельзя добавлять сессии (`failed`). Неизвестные сессии и сессии в корзине возвращают `not_found`, каждая названа отдельно.
- Меняется только принадлежность к серии; содержимое сессий, проекты и файлы не затрагиваются.

```json
{"tool": "series.sessions.assign", "args": {"sessionIds": ["ses_123", "ses_124"], "seriesId": "ser_dana_1on1"}}
```

## `series.schedule.set`

Создаёт или заменяет разовое или повторяющееся расписание серии и создаёт её предстоящие встречи.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduling`

**Аргументы**

::field-group
  ::field{name="seriesId" type="string" required}
  Серия из `series.list`.
  ::
  ::field{name="scheduleKind" type="string" required}
  `one_time` или `recurring`.
  ::
  ::field{name="timezone" type="string" required}
  Часовой пояс IANA, например `Europe/London`.
  ::
  ::field{name="localDate" type="string" required}
  Первая (или единственная) дата в формате `YYYY-MM-DD`.
  ::
  ::field{name="localTime" type="string" required}
  Время начала в формате `HH:MM`.
  ::
  ::field{name="durationMinutes" type="integer" required}
  Длительность в минутах, не меньше 1.
  ::
  ::field{name="scheduleId" type="string"}
  У серии одно расписание. Не указывайте это поле (идентификатор создаётся при первом сохранении) или передайте идентификатор существующего расписания; другой идентификатор отклоняется.
  ::
  ::field{name="title" type="string"}
  Название для встреч. Может быть пустым.
  ::
  ::field{name="rrule" type="string"}
  Правило повторения: обязательно для `recurring` и недопустимо для `one_time`. Поддерживаются `FREQ` со значениями `DAILY`, `WEEKLY` или `MONTHLY`, а также `INTERVAL`, `BYDAY`, `BYMONTHDAY`, `COUNT` и `UNTIL`, например `FREQ=WEEKLY;BYDAY=TU`.
  ::
  ::field{name="reminderOffsetsMinutes" type="integer[]"}
  За сколько минут до начала напомнить. До 6 значений, каждое от 0 до 10 080; повторы убираются. По умолчанию `[10]`.
  ::
  ::field{name="startMode" type="string"}
  `prompt` (спросить перед началом) или `automatic` (начать после обратного отсчёта в приложении). По умолчанию `prompt`.
  ::
  ::field{name="autoStartCountdownSeconds" type="integer"}
  Длительность обратного отсчёта перед автоматическим началом, в секундах: от 5 до 300. По умолчанию `60`.
  ::
  ::field{name="effectiveFromOccurrenceId" type="string"}
  Изменить расписание начиная с этой встречи («Этой и следующим»); более ранние встречи сохраняют прежнее расписание.
  ::
  ::field{name="horizonEndMs" type="integer"}
  Создавать встречи до этого момента, мс эпохи Unix. По умолчанию — 90 дней от текущего момента.
  ::
::

**Возвращает:** расписание в том виде, в каком его возвращает `series.schedule.get`, включая его `scheduleId`.

- Для серии в архиве запрос отклоняется с кодом `failed`.

```json
{"tool": "series.schedule.set", "args": {"seriesId": "ser_dana_1on1", "scheduleKind": "recurring", "timezone": "America/New_York", "localDate": "2026-11-03", "localTime": "10:00", "durationMinutes": 30, "rrule": "FREQ=WEEKLY;BYDAY=TU"}}
```

## См. также

- [Справочник операций](/mcp/operations)
- [Планировщик](/mcp/operations/scheduler)
- [Планирование и подготовка в приложении](/sessions/scheduling-and-preparing)
- [Серии в приложении](/sessions/series)
