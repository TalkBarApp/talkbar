---
title: Планировщик
description: Операции MCP и CLI для просмотра фоновых заданий TalkBar, а также для отмены или повторного запуска отдельного задания.
navigation:
  icon: i-heroicons-clock
---

Работу по времени — например, напоминания о встречах, автоматическое начало записи, синхронизацию календарей и экспорт — TalkBar выполняет как фоновые задания. Эти операции позволяют ассистенту видеть очередь заданий рабочего пространства, а также отменить или повторить отдельное задание. Все они по умолчанию включены в разделе «Доступ по MCP». Каждая операция также принимает необязательный `workspaceId`. Общие правила описаны в разделе [Как читать этот справочник](/mcp/operations#как-читать-этот-справочник).

| Операция | Тип | Инструмент | По умолчанию | Группа |
| --- | --- | --- | --- | --- |
| [`scheduler.status`](#schedulerstatus) | Чтение | `talkbar_read` | Вкл. | `scheduler` |
| [`scheduler.jobs.list`](#schedulerjobslist) | Чтение | `talkbar_read` | Вкл. | `scheduler` |
| [`scheduler.job.get`](#schedulerjobget) | Чтение | `talkbar_read` | Вкл. | `scheduler` |
| [`scheduler.job.cancel`](#schedulerjobcancel) | Изменение | `talkbar_change` | Вкл. | `scheduler` |
| [`scheduler.job.retry`](#schedulerjobretry) | Изменение | `talkbar_change` | Вкл. | `scheduler` |

## Статусы заданий

Задание может иметь статус `pending`, `leased`, `running`, `succeeded`, `skipped`, `failed` или `cancelled`.

## `scheduler.status`

Показывает, сколько фоновых заданий рабочего пространства находится в каждом статусе и когда подойдёт время следующего.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduler`

**Аргументы:** только `workspaceId`.

**Возвращает:** `{pending, leased, running, succeeded, skipped, failed, cancelled, nextDueAtMs}`.

```json
{"tool": "scheduler.status", "args": {}}
```

## `scheduler.jobs.list`

Выводит недавние фоновые задания рабочего пространства, начиная с новых.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduler`

**Аргументы**

::field-group
  ::field{name="limit" type="integer"}
  Сколько вернуть: от 1 до 500. По умолчанию `100`.
  ::
::

**Возвращает:** массив заданий. Задание: `jobId`, `jobKind`, `scopeType`, `scopeId`, `targetType`, `targetId`, `queueName`, `priority`, `runAtMs`, `status`, `attemptCount`, `maxAttempts`, `lastError`, `createdAtMs`, `updatedAtMs`, `startedAtMs`, `completedAtMs`, `cancelledAtMs` и несколько служебных полей маршрутизации.

## `scheduler.job.get`

Читает одно фоновое задание и историю его запусков.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduler`

**Аргументы**

::field-group
  ::field{name="jobId" type="string" required}
  Фоновое задание из `scheduler.jobs.list`.
  ::
  ::field{name="runLimit" type="integer"}
  Наибольшее число запусков в ответе: от 1 до 500. По умолчанию `50`.
  ::
::

**Возвращает:** `{job, runs}`. У каждого запуска есть `runId`, `jobId`, `attemptNumber`, `status`, `startedAtMs`, `finishedAtMs`, `error` и `outputJson`.

```json
{"tool": "scheduler.job.get", "args": {"jobId": "job_31"}}
```

## `scheduler.job.cancel`

Отменяет одно задание со статусом `pending`, `leased` или `running`.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduler`

**Аргументы**

::field-group
  ::field{name="jobId" type="string" required}
  Фоновое задание из `scheduler.jobs.list`.
  ::
::

**Возвращает:** задание в его текущем состоянии.

- Для уже завершённого задания запрос отклоняется с кодом `failed`. Отмена задания не удаляет встречу, напоминание или экспорт, которые его создали.

## `scheduler.job.retry`

Возвращает одно задание с ошибкой в очередь.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Вкл.** · группа политики `scheduler`

**Аргументы**

::field-group
  ::field{name="jobId" type="string" required}
  Фоновое задание из `scheduler.jobs.list`.
  ::
  ::field{name="runAtMs" type="integer"}
  Когда запустить, мс эпохи Unix. По умолчанию — сейчас. Прошедшее время означает «сейчас».
  ::
::

**Возвращает:** задание в его текущем состоянии — со статусом `pending` и очищенной последней ошибкой.

- Повторить можно только задание со статусом `failed`; для остальных запрос отклоняется с кодом `failed`.

## См. также

- [Справочник операций](/mcp/operations)
- [Календарь и серии](/mcp/operations/calendar-and-series)
- [Экспорт](/mcp/operations/exports)
