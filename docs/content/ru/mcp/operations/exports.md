---
title: Экспорт
description: Операции MCP и CLI для настройки мест экспорта и правил автоэкспорта, а также для предпросмотра, постановки в очередь, запуска, отмены, повтора экспорта сессий и разрешения конфликтов.
navigation:
  icon: i-heroicons-arrow-up-tray
---

Операции экспорта отправляют содержимое сессий (итоги, транскрипт, заметки, задачи, закладки и аудио) в файлы, хранилище Obsidian или Notion. Все они по умолчанию включены в разделе «Доступ по MCP». Каждая операция также принимает необязательный `workspaceId`. Общие правила описаны в разделе [Как читать этот справочник](/mcp/operations#как-читать-этот-справочник).

| Операция | Тип | Инструмент | По умолчанию | Группа |
| --- | --- | --- | --- | --- |
| [`exports.config`](#exportsconfig) | Чтение | `talkbar_read` | Вкл. | `exports` |
| [`exports.sessions`](#exportssessions) | Чтение | `talkbar_read` | Вкл. | `exports` |
| [`exports.preview`](#exportspreview) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`exports.enqueue`](#exportsenqueue) | Изменение | `talkbar_change` | Вкл. | `exports` |
| [`exports.run`](#exportsrun) | Изменение | `talkbar_change` | Вкл. | `exports` |
| [`exports.status`](#exportsstatus) | Чтение | `talkbar_read` | Вкл. | `exports` |
| [`exports.runs`](#exportsruns) | Чтение | `talkbar_read` | Вкл. | `exports` |
| [`exports.history`](#exportshistory) | Чтение | `talkbar_read` | Вкл. | `exports` |
| [`exports.cancel`](#exportscancel) | Изменение | `talkbar_change` | Вкл. | `exports` |
| [`exports.retry`](#exportsretry) | Изменение | `talkbar_change` | Вкл. | `exports` |
| [`exports.resolve`](#exportsresolve) | Изменение | `talkbar_change` | Вкл. | `exports` |
| [`exports.destination.save`](#exportsdestinationsave) | Изменение | `talkbar_change` | Вкл. | `exports` |
| [`exports.destination.delete`](#exportsdestinationdelete) | Изменение | `talkbar_delete` | Вкл. | `exports` |
| [`exports.rule.save`](#exportsrulesave) | Изменение | `talkbar_change` | Вкл. | `exports` |
| [`exports.rule.delete`](#exportsruledelete) | Изменение | `talkbar_delete` | Вкл. | `exports` |

## Как выполняется экспорт

1. Настройте место экспорта через `exports.destination.save` (или в приложении).
2. Проверьте, что будет записано, через `exports.preview`.
3. Поставьте пакет в очередь через `exports.enqueue`, затем вызывайте `exports.run`, пока не останется отправок со статусом `scheduled`. Ход выполнения можно проверить через `exports.status`.
4. Если отправка требует внимания, потому что место экспорта было изменено вне TalkBar, разрешите конфликт через `exports.resolve` или попробуйте ещё раз через `exports.retry`.

Отправка может иметь статус `scheduled`, `waitingForSummary`, `waitingForAudio`, `exporting`, `exported`, `partiallyExported`, `needsAttention` или `cancelled`; статус пакета определяется статусами его отправок.

## `exports.config`

Читает места экспорта и правила автоэкспорта рабочего пространства.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы:** только `workspaceId`.

**Возвращает:** `{destinations, rules}`. У мест экспорта есть `destinationId`, `name`, `format`, `location`, `enabled`, `layout` и `credentialRef`; у правил — те же поля, что принимает `exports.rule.save`.

```json
{"tool": "exports.config", "args": {}}
```

## `exports.sessions`

Постранично выводит идентификаторы сессий, которые можно экспортировать (завершённых и не находящихся в корзине), при необходимости — в пределах проекта или серии.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="projectId" type="string"}
  Только сессии этого проекта.
  ::
  ::field{name="seriesId" type="string"}
  Только сессии этой серии.
  ::
  ::field{name="after" type="string"}
  Последний идентификатор сессии из предыдущей страницы.
  ::
  ::field{name="limit" type="integer"}
  Сколько вернуть: от 1 до 100. По умолчанию `100`.
  ::
::

**Возвращает:** массив идентификаторов сессий, упорядоченный по идентификатору. Чтобы получить следующую страницу, передайте последний из них в `after`; пустой массив означает конец списка.

## `exports.preview`

Показывает, что войдёт в экспорт и готова ли каждая сессия, ничего не экспортируя.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="sessionIds" type="string[]" required}
  Сессии для экспорта, от 1 до 100.
  ::
  ::field{name="destinationIds" type="string[]" required}
  Места экспорта для предпросмотра, от 1 до 10. Каждое должно существовать и быть включено.
  ::
  ::field{name="selection" type="object"}
  Что взять из каждой сессии. Неизвестные ключи отклоняются.

  - `summary` (по умолчанию `true`), `transcript` (по умолчанию `true`), `metadata` (по умолчанию `true`), `notes`, `outcomes` (задачи), `markers` (у каждого по умолчанию `false`).
  - `audio`: `none` (по умолчанию), `original`, `mp4`, `mp3` или `wav`.
  - `summarySectionKeys`: только эти разделы итогов. Пустое значение означает итоги целиком.
  - `turnIds`: только эти реплики транскрипта (до 10 000).
  - `ranges`: только реплики транскрипта внутри этих интервалов времени, `[{startMs, endMs}]` в мс от начала сессии (до 100).
  ::
::

**Возвращает:** `{sessions, destinations, outputs}`. Для каждой сессии показаны выбранное содержимое, `ready` и, если сессия не готова, `waitReason` (`sessionNotFinished`, `summaryMissing`, `summaryStale` или `audioPending`). Для каждого результата указаны `location`, `files` и `archiveEntries`, которые будут записаны.

- Возвращает текст выбранных итогов и транскрипта, поэтому относится к группе политики `content`.

```json
{"tool": "exports.preview", "args": {"sessionIds": ["ses_123"], "destinationIds": ["dest_vault"], "selection": {"summary": true, "transcript": false, "outcomes": true}}}
```

## `exports.enqueue`

Ставит сессии в очередь на экспорт в одно или несколько мест одним пакетом.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="sessionIds" type="string[]" required}
  Сессии для экспорта, от 1 до 100.
  ::
  ::field{name="destinationIds" type="string[]" required}
  Места экспорта, от 1 до 10. Каждое должно существовать и быть включено.
  ::
  ::field{name="selection" type="object"}
  Что взять из сессий, как в `exports.preview`.
  ::
::

**Возвращает:** пакет: `{batchId, workspaceId, status, automatic, createdAtMs, deliveries}`. У каждой отправки есть `deliveryId`, `sessionId`, `sessionTitle`, `destinationId`, `status`, `location`, `error`, `conflict` и `updatedAtMs`.

- Сессия, запись которой ещё идёт, отклоняется с кодом `session_recording`: поставьте её в очередь после остановки записи.
- Постановка в очередь сама по себе ничего не отправляет. Запустите пакет через `exports.run` или отмените через `exports.cancel`.

```json
{"tool": "exports.enqueue", "args": {"sessionIds": ["ses_123", "ses_124"], "destinationIds": ["dest_vault"]}}
```

## `exports.run`

Сразу выполняет небольшую часть одного пакета: каждый вызов отправляет не больше одной сессии в одно место экспорта. Фоновый обработчик операция никогда не запускает.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="batchId" type="string" required}
  Пакет экспорта из `exports.enqueue` или `exports.history`.
  ::
::

**Возвращает:** пакет после запуска (`{batchId, workspaceId, status, automatic, createdAtMs, deliveries}`. У каждой отправки есть `deliveryId`, `sessionId`, `sessionTitle`, `destinationId`, `status`, `location`, `error`, `conflict` и `updatedAtMs`).

- Вызывайте операцию снова, пока в пакете есть отправки в статусе `scheduled`.
- Одновременно выполняется только один экспорт: на второй вызов во время выполнения приходит ответ `busy` с `retryAfterMs: 5000`.
- Записывает файлы или страницы Notion в место экспорта.

```json
{"tool": "exports.run", "args": {"batchId": "batch_5"}}
```

## `exports.status`

Читает статус отправок одного пакета экспорта.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="batchId" type="string" required}
  Пакет экспорта из `exports.enqueue` или `exports.history`.
  ::
::

**Возвращает:** пакет: `{batchId, workspaceId, status, automatic, createdAtMs, deliveries}`. У каждой отправки есть `deliveryId`, `sessionId`, `sessionTitle`, `destinationId`, `status`, `location`, `error`, `conflict` и `updatedAtMs`.

## `exports.runs`

Выводит попытки отправки одного пакета экспорта.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="batchId" type="string" required}
  Пакет экспорта из `exports.enqueue` или `exports.history`.
  ::
::

**Возвращает:** массив попыток: `[{runId, deliveryId, status, startedAtMs, finishedAtMs, error}]`.

## `exports.history`

Выводит недавние пакеты экспорта, начиная с новых.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="limit" type="integer"}
  Сколько вернуть: от 1 до 100. По умолчанию `30`.
  ::
::

**Возвращает:** массив пакетов в том виде, в каком их возвращает `exports.status`.

## `exports.cancel`

Отменяет пакет экспорта. Завершённые отправки остаются экспортированными.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="batchId" type="string" required}
  Пакет экспорта из `exports.enqueue` или `exports.history`.
  ::
::

**Возвращает:** пакет в его текущем состоянии.

- Все отправки, кроме тех, что в статусе `exported`, получают статус `cancelled` — в том числе частично экспортированные и требующие внимания.

## `exports.retry`

Повторяет пакет экспорта: частично экспортированные отправки и отправки, требующие внимания (кроме конфликтов), снова ставятся в очередь.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="batchId" type="string" required}
  Пакет экспорта из `exports.enqueue` или `exports.history`.
  ::
::

**Возвращает:** пакет в его текущем состоянии.

- Конфликты вместо этого разрешаются через `exports.resolve`. Завершённый пакет не меняется.

## `exports.resolve`

Разрешает конфликт экспорта, когда файл или страница в месте экспорта были изменены вне TalkBar.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="deliveryId" type="string" required}
  Отправка, требующая внимания, из пакета.
  ::
  ::field{name="action" type="string" required}
  `keepExternal` оставляет внешнюю версию, `saveCopy` записывает версию TalkBar как новую копию, `replace` перезаписывает внешнюю версию.
  ::
::

**Возвращает:** пакет в его текущем состоянии.

- Разрешить можно только отправку, требующую внимания.

```json
{"tool": "exports.resolve", "args": {"deliveryId": "dlv_9", "action": "saveCopy"}}
```

## `exports.destination.save`

Создаёт или изменяет место экспорта: папку с файлами, хранилище Obsidian, папку для импорта в Notion или подключённую страницу Notion.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="destinationId" type="string" required}
  Идентификатор, который вы выбираете сами. Сохранение с существующим идентификатором изменяет это место экспорта.
  ::
  ::field{name="name" type="string" required}
  Название места экспорта. Не может быть пустым.
  ::
  ::field{name="format" type="string" required}
  Что записывать:

  - `txt`, `markdown`, `html`, `json`, `srt`, `vtt`, `zip`: файлы в папке.
  - `obsidian`: Markdown со свойствами для хранилища Obsidian.
  - `notionMarkdown`: файлы Markdown для импорта в Notion.
  - `notion`: страницы, создаваемые в подключённом рабочем пространстве Notion.
  ::
  ::field{name="location" type="string" required}
  Для `notion` — родительская страница (идентификатор или URL страницы). Для остальных форматов — абсолютный путь к папке.
  ::
  ::field{name="enabled" type="boolean" required}
  Можно ли использовать это место экспорта.
  ::
  ::field{name="layout" type="string"}
  Как файлы раскладываются по папке: `flat` (по умолчанию), `project`, `series` или `projectSeries`.
  ::
  ::field{name="credentialRef" type="string | null"}
  Для подключённого места экспорта Notion — сохранённое подключение: ровно `export:<workspaceId>:<destinationId>` или `null`. Notion подключается в приложении; ассистент не может сохранить токен.
  ::
::

**Возвращает:** место экспорта в сохранённом виде.

- Сохранение заменяет место экспорта целиком: если не указать `credentialRef` для подключённого места Notion, оно будет отключено.
- Правила администратора могут ограничивать, какие папки и места экспорта можно использовать.

```json
{"tool": "exports.destination.save", "args": {"destinationId": "dest_vault", "name": "Obsidian vault", "format": "obsidian", "location": "C:\\Users\\me\\Documents\\Vault\\Meetings", "enabled": true, "layout": "project"}}
```

## `exports.destination.delete`

Удаляет место экспорта, у которого нет активных отправок. Уже экспортированные файлы и страницы сохраняются.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="destinationId" type="string" required}
  Место экспорта из `exports.config`.
  ::
::

**Возвращает:** `{deleted: true, switchedOffRules}`. Собственное правило (`override`), у которого не осталось мест экспорта, переводится в `disabled` и попадает в `switchedOffRules`.

- Пока отправка в это место запланирована, ожидает или выполняется, запрос отклоняется с кодом `failed`.
- Также удаляет сохранённое подключение к Notion для этого места экспорта.
- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## `exports.rule.save`

Настраивает автоэкспорт для рабочего пространства, проекта или серии.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="ruleId" type="string" required}
  Идентификатор, который вы выбираете сами. Повторное сохранение с тем же идентификатором изменяет правило.
  ::
  ::field{name="scopeKind" type="string" required}
  `workspace`, `project` или `series`.
  ::
  ::field{name="scopeId" type="string" required}
  Идентификатор рабочего пространства, проекта или серии. Для `workspace` — идентификатор самого рабочего пространства.
  ::
  ::field{name="mode" type="string" required}
  `inherit` (использовать правило уровнем выше; недопустимо для рабочего пространства), `override` (использовать это правило) или `disabled` (без автоэкспорта здесь).
  ::
  ::field{name="destinationIds" type="string[]" required}
  Места, в которые нужно экспортировать.
  ::
  ::field{name="selection" type="object" required}
  Что взять из сессий, как в `exports.preview`.
  ::
  ::field{name="timing" type="object" required}
  Когда экспортировать. Один из вариантов:

  - `{"kind": "ready"}`: как только сессия готова.
  - `{"kind": "delay", "delayMs": …}`: с задержкой после готовности, не больше 31 дня (2 678 400 000 мс).
  - `{"kind": "daily", "hour": …, "minute": …, "timezone": "…"}`: раз в день в это время, в часовом поясе IANA.
  ::
  ::field{name="reexportSummary" type="boolean" required}
  Экспортировать снова при изменении итогов.
  ::
  ::field{name="reexportTranscript" type="boolean" required}
  Экспортировать снова при изменении транскрипта.
  ::
  ::field{name="enabledAtMs" type="integer" required}
  Обязательное поле, но время TalkBar устанавливает сам: текущее или более раннее, если правило `override` остаётся `override`.
  ::
::

**Возвращает:** правило в сохранённом виде.

- Одно правило на область: другой `ruleId` для области, у которой уже есть правило, отклоняется с кодом `failed` с указанием существующего правила.

```json
{"tool": "exports.rule.save", "args": {"ruleId": "rule_proj456", "scopeKind": "project", "scopeId": "proj_456", "mode": "override", "destinationIds": ["dest_vault"], "selection": {"summary": true, "transcript": true}, "timing": {"kind": "ready"}, "reexportSummary": true, "reexportTranscript": false, "enabledAtMs": 0}}
```

## `exports.rule.delete`

Удаляет правило автоэкспорта. Экспорты в очереди и уже доставленные сохраняются.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Вкл.** · группа политики `exports`

**Аргументы**

::field-group
  ::field{name="ruleId" type="string" required}
  Правило автоэкспорта из `exports.config`.
  ::
::

**Возвращает:** `{deleted: true}`.

- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## См. также

- [Справочник операций](/mcp/operations)
- [Экспорт в приложении](/sharing/exports)
- [Настройки экспорта и отправки](/settings/export-and-share)
- [Планировщик](/mcp/operations/scheduler)
