---
title: Примеры
description: Практические сценарии работы с TalkBar через MCP и CLI с настоящими запросами и ответами — от вопроса о сессиях прошлой недели до закладки во время записи.
navigation:
  icon: i-heroicons-light-bulb
---

Эти сценарии показывают, что происходит, когда вы просите ассистента поработать с TalkBar: какой инструмент он вызывает, с какими аргументами и что получает в ответ. Идентификаторы, время и текст вымышлены, а длинные ответы сокращены, но каждый запрос и ответ имеет ту же структуру, что и в настоящем TalkBar.

::callout{icon="i-heroicons-light-bulb" color="primary"}
Писать эти запросы самим не нужно. Ваше ИИ-приложение составляет их по вашему вопросу. Они приведены здесь, чтобы вы знали, что может ассистент, и могли проверить его работу.
::

## Спросить о сессиях прошлой недели

**Подготовка:** включите MCP и подключите Claude Desktop, как описано в разделе [Настройка MCP](/mcp/setup). Чтение включено по умолчанию, так что больше ничего не нужно.

Затем спросите Claude: «О чём я говорил на сессиях TalkBar на прошлой неделе?»

Ассистент получает список сессий, начавшихся на той неделе, с помощью `talkbar_read`. Время указывается в миллисекундах с 1970 года (UTC); граница `startedBeforeMs` не включается.

```json [talkbar_read]
{
  "tool": "sessions.list",
  "args": { "startedAfterMs": 1792368000000, "startedBeforeMs": 1792972800000, "limit": 20 }
}
```

```json [Ответ]
{
  "items": [
    {
      "sessionId": "0b7e4d1a-93c2-4f5e-8a61-2f9d3c7b5e08",
      "title": "Weekly sync",
      "status": "complete",
      "startedAtMs": 1792747800000,
      "endedAtMs": 1792749940000,
      "projectId": "project-p8d3k2m1q9w7e5r4t6y0u2i1",
      "seriesId": null,
      "participantCount": 4,
      "pinned": false,
      "source": "live",
      "private": false
    },
    {
      "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10",
      "title": "Pricing review with Acme",
      "status": "complete",
      "startedAtMs": 1792594800000,
      "endedAtMs": 1792597632000,
      "projectId": "project-p8d3k2m1q9w7e5r4t6y0u2i1",
      "seriesId": null,
      "participantCount": 3,
      "pinned": true,
      "source": "live",
      "private": false
    }
  ],
  "nextCursor": null,
  "hasMore": false,
  "totalCount": 2
}
```

Самые новые сессии идут первыми. Чтобы прочитать итоги, ассистент объединяет в один вызов по одному `sessions.get` на сессию:

```json [talkbar_read]
{
  "calls": [
    { "tool": "sessions.get", "args": { "sessionId": "0b7e4d1a-93c2-4f5e-8a61-2f9d3c7b5e08" } },
    { "tool": "sessions.get", "args": { "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10" } }
  ]
}
```

Ответ имеет вид `{"results": [...]}`, по одной записи на сессию, и в каждой — полные итоги, их разделы, задачи и решения. После этого Claude пишет вам краткий обзор.

## Найти сессию и прочитать транскрипт по частям

Спросите: «Найди мою встречу с Acme о ценах и покажи, что Дана говорила о скидке».

Сначала ассистент выполняет поиск, чтобы получить идентификатор сессии:

```json [talkbar_find]
{ "query": "pricing review Acme", "kinds": ["session"], "limit": 3 }
```

У первого совпадения `"kind": "session"` и `"id": "6f1c2a9e-…"`. Затем ассистент читает транскрипт. Транскрипт выдаётся страницами из целых реплик, по умолчанию по 20 000 символов. `speaker` оставляет реплики одного человека (любая часть имени, без учёта регистра):

```json [talkbar_read]
{
  "tool": "sessions.transcript",
  "args": { "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10", "speaker": "Dana", "maxChars": 4000 }
}
```

```json [Ответ]
{
  "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10",
  "title": "Pricing review with Acme",
  "startedAtMs": 1792594800000,
  "private": false,
  "truncated": true,
  "excludedFromAiSpeakers": [],
  "nextCursor": null,
  "totalTurns": 38,
  "turnOffset": 0,
  "nextTurnOffset": 14,
  "transcript": "[02:15] Dana Lee: We can go to twelve percent if the contract is two years.\n[02:41] Dana Lee: That's the most I can do this quarter.\n…"
}
```

`truncated: true` означает, что есть продолжение. Ассистент передаёт `nextTurnOffset` обратно как `turnOffset` для следующей страницы и останавливается, когда `nextTurnOffset` равен `null`:

```json [talkbar_read]
{
  "tool": "sessions.transcript",
  "args": { "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10", "speaker": "Dana", "maxChars": 4000, "turnOffset": 14 }
}
```

С `"format": "json"` транскрипт возвращается в виде массива `turns`, где у каждой реплики есть `turnId`, `startMs` и `endMs` (миллисекунды от начала сессии), `speaker` и `text`. Используйте эту форму, если хотите поставить закладку на реплику или привязать к ней задачу.

То же чтение из терминала:

```shell
talkbar-cli tools call sessions.transcript --args-file read.json
```

## Создать заметку и задачу

**Подготовка:** в разделе **Настройки → Доступ по MCP** откройте строку **Заметки** и включите **Создать заметку**, затем откройте **Задачи** и включите **Создать задачу** (`action_items.create`). Остальные изменения, если они не нужны, оставьте выключенными.

Спросите: «Оформи договорённости со встречи с Acme о ценах заметкой к этой сессии и поставь мне задачу отправить обновлённое коммерческое предложение до вторника».

Ассистент отправляет оба изменения одним пакетом `talkbar_change`:

```json [talkbar_change]
{
  "calls": [
    {
      "tool": "notes.create",
      "args": {
        "title": "Acme pricing follow-ups",
        "markdown": "## Follow-ups\n\n- Revised quote at 12% for a two-year term\n- Confirm the start date with legal",
        "sessionIds": ["6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10"]
      }
    },
    {
      "tool": "action_items.create",
      "args": {
        "title": "Send the revised quote to Acme",
        "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10",
        "itemType": "task",
        "dueAtMs": 1793725200000,
        "assignees": ["Alex Kim"]
      }
    }
  ],
  "stopOnError": true
}
```

```json [Ответ]
{
  "results": [
    {
      "tool": "notes.create",
      "ok": true,
      "result": {
        "noteId": "note-k2v9w8x7c6b5n4m3l2j1h0g9",
        "title": "Acme pricing follow-ups",
        "pinned": false,
        "sessionId": null,
        "updatedAt": 1793369525000,
        "projectId": null,
        "sessionIds": ["6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10"]
      }
    },
    {
      "tool": "action_items.create",
      "ok": true,
      "result": {
        "itemId": "outcome-x4c8v2b6n1m9q3w7e5r0t2y8",
        "itemType": "task",
        "title": "Send the revised quote to Acme",
        "status": "open",
        "dueAtMs": 1793725200000,
        "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10",
        "sessionTitle": "Pricing review with Acme",
        "projectId": "project-p8d3k2m1q9w7e5r4t6y0u2i1",
        "assignees": [{ "name": "Alex Kim", "contactId": null }],
        "origin": "manual",
        "sources": [],
        "sessionStatus": "complete"
      }
    }
  ]
}
```

Ответ для задачи сокращён. Заметка, привязанная к сессии, показывается на странице этой сессии; `sessionId` остаётся `null`, потому что это не собственная заметка сессии. Задача получает проект сессии, если вы не укажете другой. Если TalkBar открыт, обе записи сразу появятся в нём.

## Добавить закладку во время записи

**Подготовка:** включите **Добавить закладку** (`markers.create`) в строке **Закладки**. Сама запись всегда управляется только из приложения.

Во время записи попросите: «Поставь закладку на момент, когда Сэм упомянул заморозку бюджета».

Сначала ассистент находит сессию, которая записывается сейчас:

```json [talkbar_read]
{ "tool": "sessions.recording" }
```

```json [Ответ]
{
  "recording": {
    "sessionId": "c3a9f2e7-1d84-4b6a-9e05-7f2b8d1c6a34",
    "title": "Budget planning",
    "startedAtMs": 1793368800000,
    "elapsedMs": 725000,
    "revision": "…",
    "appRunning": true,
    "stale": false
  }
}
```

Если ничего не записывается, `recording` равен `null`. `stale: true` означало бы, что TalkBar не запущен и сессия лишь выглядит записывающейся.

Затем ассистент читает уже записанную часть транскрипта в JSON. Чтение с `cursor: "0:"` возвращает реплики в порядке их изменения и `nextCursor`, чтобы в следующий раз получить только новое:

```json [talkbar_read]
{
  "tool": "sessions.transcript",
  "args": { "sessionId": "c3a9f2e7-1d84-4b6a-9e05-7f2b8d1c6a34", "format": "json", "cursor": "0:" }
}
```

```json [Ответ]
{
  "sessionId": "c3a9f2e7-1d84-4b6a-9e05-7f2b8d1c6a34",
  "title": "Budget planning",
  "startedAtMs": 1793368800000,
  "private": false,
  "truncated": false,
  "excludedFromAiSpeakers": [],
  "nextCursor": "1793369523871:turn-42",
  "recording": true,
  "turns": [
    {
      "turnId": "turn-42",
      "chunkId": "chunk-17",
      "provisional": true,
      "startMs": 641000,
      "endMs": 652500,
      "speaker": "Sam Ortiz",
      "isUser": false,
      "excludedFromAi": false,
      "text": "Heads up, finance just told us there's a budget freeze until January.",
      "translatedText": null
    }
  ]
}
```

Ассистент добавляет закладку на эту реплику с короткой пометкой:

```json [talkbar_change]
{
  "tool": "markers.create",
  "args": {
    "sessionId": "c3a9f2e7-1d84-4b6a-9e05-7f2b8d1c6a34",
    "turnId": "turn-42",
    "body": "Budget freeze until January"
  }
}
```

```json [Ответ]
{
  "markerId": "…",
  "sessionId": "c3a9f2e7-1d84-4b6a-9e05-7f2b8d1c6a34",
  "kind": "bookmark",
  "body": "Budget freeze until January",
  "quote": null,
  "atMs": 641000,
  "turnId": "turn-42",
  "chunkId": null,
  "pointId": null,
  "color": "",
  "updatedAt": 1793369525000,
  "sessionStatus": "recording"
}
```

Закладка сразу появляется на экране записи. Вместо `turnId` ассистент может указать место закладки через `chunkId`, `pointId` (точку хронологии из `sessions.timeline`), `atMs` (момент от начала сессии) или `quote` (слова, к которым она относится).

## Экспортировать сессию

**Подготовка:** сначала добавьте место экспорта в приложении, например папку в вашем хранилище Obsidian; см. [Экспорт](/sharing/exports). Операции экспорта включены по умолчанию, как только включён MCP.

Попросите: «Экспортируй встречу с Acme о ценах в моё хранилище Obsidian».

Ассистент получает список мест экспорта:

```json [talkbar_read]
{ "tool": "exports.config" }
```

```json [Ответ]
{
  "destinations": [
    {
      "destinationId": "5d2e7a10-8c3b-4f69-b1e4-0a9c6d3f2b87",
      "workspaceId": "…",
      "name": "Obsidian vault",
      "format": "obsidian",
      "location": "PATH_TO_VAULT/Meetings",
      "enabled": true,
      "layout": "flat",
      "credentialRef": null
    }
  ],
  "rules": []
}
```

Затем ставит экспорт в очередь, выбирая, что в него включить:

```json [talkbar_change]
{
  "tool": "exports.enqueue",
  "args": {
    "sessionIds": ["6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10"],
    "destinationIds": ["5d2e7a10-8c3b-4f69-b1e4-0a9c6d3f2b87"],
    "selection": { "summary": true, "transcript": true, "metadata": true, "notes": true, "audio": "none" }
  }
}
```

В ответ приходит новый пакет экспорта с `batchId`, `status` и записью в `deliveries` для каждой пары «сессия — место экспорта». `exports.enqueue` только ставит работу в очередь. Экспорт из очереди доставляет приложение TalkBar, пока оно запущено. Чтобы доставить сразу, ассистент может вызвать `exports.run` с `batchId`, а затем проверить результат с помощью `exports.status`:

```json [talkbar_change]
{ "tool": "exports.run", "args": { "batchId": "…" } }
```

У доставленной записи `"status": "exported"` и её `location`. Сессию, которая ещё записывается, поставить в очередь нельзя: такой вызов отвечает `session_recording`.

В терминале `talkbar-cli exports run --workspace WORKSPACE_ID --batch BATCH_ID --wait` продолжает доставку, пока пакет не будет выполнен. См. [Экспорт в talkbar-cli](/mcp/cli#экспорт).

## Безопасное удаление

**Подготовка:** включите **Переместить заметку в корзину** (`notes.trash`) в строке **Заметки**. Оставьте **Разрешить удаление без подтверждения** выключенным.

Попросите: «Перемести старый черновик заметки про Acme в корзину».

Ассистент находит заметку с помощью `talkbar_find`, затем вызывает `talkbar_delete`:

```json [talkbar_delete]
{ "tool": "notes.trash", "args": { "noteId": "note-a1s2d3f4g5h6j7k8l9z0x1c2" } }
```

Прежде чем что-либо выполнится, ваше ИИ-приложение покажет вопрос TalkBar:

```text
An assistant wants TalkBar to run:
- notes.trash {"noteId":"note-a1s2d3f4g5h6j7k8l9z0x1c2"}
Confirm to run it, or decline to run nothing.
```

::screenshot{src="/screenshots/mcp/delete-confirmation-prompt.png" alt="MCP-клиент, поддерживающий запросы подтверждения, показывает вопрос TalkBar: текст «An assistant wants TalkBar to run:» со строкой notes.trash и идентификатором заметки, поле подтверждения и элементы клиента для подтверждения и отказа" caption="Подтверждение удаления в ИИ-приложении"}
::

Если вы откажетесь или не ответите в течение 5 минут, ничего не выполнится, а ассистент получит:

```json
{ "error": { "code": "declined", "message": "The user did not confirm, so nothing ran" } }
```

Если подтвердите, заметка переместится в корзину:

```json
{ "noteId": "note-a1s2d3f4g5h6j7k8l9z0x1c2", "trashed": true }
```

Передумали? `notes.restore` вернёт заметку. Эта операция выполняется через `talkbar_change`, поэтому подтверждения не требует, но её нужно включить — **Восстановить заметку**:

```json [talkbar_change]
{ "tool": "notes.restore", "args": { "noteId": "note-a1s2d3f4g5h6j7k8l9z0x1c2" } }
```

```json [Ответ]
{ "noteId": "note-a1s2d3f4g5h6j7k8l9z0x1c2", "restored": true }
```

`notes.trash.list` выводит содержимое корзины заметок. Никакие действия ассистента не удаляют заметку навсегда; очистка корзины остаётся в приложении.

Если ваше ИИ-приложение не умеет показывать вопросы от сервера, удаление вместо этого отклоняется с кодом `confirmation_unavailable`, и ничего не выполняется. См. [Приложения, которые не умеют спрашивать](/mcp/access-and-permissions#приложения-которые-не-умеют-спрашивать).

## См. также

- [Настройка MCP](/mcp/setup)
- [Пять инструментов MCP](/mcp/tools)
- [Доступ и разрешения](/mcp/access-and-permissions)
- [Ошибки и ограничения](/mcp/errors-and-limits)
- [talkbar-cli](/mcp/cli)
- [Справочник операций](/mcp/operations)
