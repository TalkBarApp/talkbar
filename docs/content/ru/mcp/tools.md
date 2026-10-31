---
title: Пять инструментов MCP
description: Как работают talkbar_find, talkbar_read, talkbar_change, talkbar_delete и talkbar_tools — их аргументы, пакеты, аннотации, постраничное чтение и формат сообщений.
navigation:
  icon: i-heroicons-squares-2x2
---

MCP-сервер TalkBar не публикует отдельный инструмент для каждой операции. Он публикует не больше пяти инструментов, через которые проходят все операции, поэтому ассистент платит за одни и те же несколько определений инструментов, сколько бы операций ни предлагал TalkBar. Эта страница для тех, кто создаёт или настраивает агентов; аргументы каждой операции описаны в [справочнике операций](/mcp/operations).

## Что видит клиент

Когда приложение подключается, сервер представляется как `talkbar` (заголовок «TalkBar») и отправляет такие инструкции:

```text
TalkBar holds the user's meetings: sessions with summaries and transcripts, notes, projects, action items, knowledge cards, people and schedules. Find ids with talkbar_find, then read with talkbar_read and change with talkbar_change; trash, archive and delete go through talkbar_delete, which the user confirms. Batch with {"calls":[...]}: calls run in order and continue past errors unless stopOnError is true. workspaceId is optional (default: the workspace open in the app). Notes are Markdown. The live session: sessions.recording. Recording, settings and emptying the Trash stay in the app. The user turns operations on in TalkBar Settings > MCP Access; item changes start off.
```

Затем `tools/list` возвращает только те инструменты, которым есть что выполнять:

| Инструмент | Есть в списке, когда |
| --- | --- |
| `talkbar_find` | Включено чтение `workspace.search` |
| `talkbar_read` | Включено хотя бы одно чтение |
| `talkbar_change` | Включено хотя бы одно изменение, которое ничего не убирает |
| `talkbar_delete` | Включена хотя бы одна операция перемещения в корзину, архивации или удаления |
| `talkbar_tools` | Включено хоть что-нибудь |

Если MCP в TalkBar выключен или все операции выключены либо заблокированы, список пуст.

### Аннотации

У каждого инструмента есть аннотации MCP, по которым ваше приложение может решить, какие вызовы одобрять автоматически:

| Инструмент | `readOnlyHint` | `destructiveHint` | `idempotentHint` | `openWorldHint` |
| --- | --- | --- | --- | --- |
| `talkbar_find` | true | false | true | false |
| `talkbar_read` | true | false | true | false |
| `talkbar_change` | false | false | false | false |
| `talkbar_delete` | false | true | false | false |
| `talkbar_tools` | true | false | true | false |

`talkbar_delete` не идемпотентен, потому что в его пакете могут быть и другие изменения.

## Вызов операции

`talkbar_read`, `talkbar_change` и `talkbar_delete` принимают одинаковые аргументы. Укажите одну операцию в `tool`, а её аргументы — в `args`:

```json
{
  "tool": "notes.get",
  "args": { "noteId": "note-k2v9w8x7c6b5n4m3l2j1h0g9" }
}
```

Или выполните до 20 операций по порядку с помощью `calls`:

```json
{
  "calls": [
    { "tool": "sessions.list", "args": { "limit": 5 } },
    { "tool": "notes.list" }
  ],
  "stopOnError": false
}
```

::field-group
  ::field{name="tool" type="string"}
  Идентификатор операции, например `sessions.get`. Используется вместе с `args`, но не с `calls`.
  ::
  ::field{name="args" type="object"}
  Аргументы операции. Если аргументов нет, не передавайте его или передайте `null`.
  ::
  ::field{name="calls" type="array"}
  От 1 до 20 объектов вида `{"tool", "args"}`, выполняемых по порядку.
  ::
  ::field{name="stopOnError" type="boolean"}
  Вместе с `calls`: остановиться на первой неудачной операции. По умолчанию `false`, то есть следующие вызовы всё равно выполняются.
  ::
::

Каждая операция принимает необязательный `workspaceId`. Без него TalkBar использует пространство, открытое в приложении.

## `talkbar_find`

Универсальный поиск — тот же, что в приложении, включая фрагменты транскриптов. Обычно это первый шаг, чтобы превратить название или фразу в идентификаторы.

::field-group
  ::field{name="query" type="string" required}
  Что искать. Не может быть пустым.
  ::
  ::field{name="kinds" type="string[]"}
  Ограничить поиск некоторыми видами: `session`, `note`, `document`, `chat`, `action_item`, `project`, `series`, `person`, `company`, `memory` (карточки знаний).
  ::
  ::field{name="match" type="string"}
  `any` (по умолчанию) воспринимает запрос как просьбу на естественном языке. `all` требует совпадения каждого слова.
  ::
  ::field{name="projectId" type="string"}
  Только элементы из этого проекта.
  ::
  ::field{name="limit" type="integer"}
  От 1 до 100 результатов. По умолчанию 20.
  ::
  ::field{name="includeArchived" type="boolean"}
  Искать также архивированные серии, людей, компании и карточки знаний. Элементы в корзине не находятся никогда.
  ::
  ::field{name="workspaceId" type="string"}
  Пространство для поиска. По умолчанию — открытое в приложении.
  ::
::

```json [Запрос]
{ "query": "pricing review", "kinds": ["session", "note"], "limit": 5 }
```

```json [Ответ]
{
  "matches": [
    {
      "kind": "session",
      "id": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10",
      "title": "Pricing review with Acme",
      "snippet": "…agreed to keep the pricing review on Thursdays…",
      "href": "/sessions/6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10",
      "score": 14.2,
      "projectId": "project-p8d3k2m1q9w7e5r4t6y0u2i1",
      "matchedIn": "title",
      "atMs": 1792594800000,
      "detail": null,
      "context": null,
      "itemCount": null,
      "archived": false,
      "content": null
    }
  ],
  "contentSearch": "on"
}
```

Лучшие совпадения идут первыми. `score` равен 10 или больше для совпадения в названии или тексте и меньше 10 для совпадения только в проиндексированном содержимом; такое совпадение содержит `content` с полями фрагмента `sourceType`, `sourceId`, `locator` и `tMs` (момент в транскрипте). `matchedIn` принимает значения `title`, `body` или `content`. `contentSearch` сообщает, выполнялся ли поиск по содержимому (`on`), выполнялся только по ключевым словам (`keywordOnly`), был недоступен (`off`) или завершился ошибкой (`failed`); совпадения в названиях и тексте возвращаются в любом случае.

## `talkbar_read`

Выполняет операции чтения. В его описании перечислены все включённые операции чтения, сгруппированные по областям, с обязательными аргументами, например `notes.list|get(noteId)|trash.list; sessions.get(sessionId)|transcript(sessionId)|…`, поэтому ассистент может сделать первое чтение, ничего не выясняя заранее.

```json
{ "tool": "sessions.transcript", "args": { "sessionId": "6f1c2a9e-4b7d-4c1e-9a53-0d2e8b7f4c10" } }
```

Изменения он не выполняет: пакет, в котором есть изменение, отклоняется целиком, а в сообщении указан нужный инструмент.

## `talkbar_change`

Выполняет изменения, которые ничего не убирают: создание, изменение, распределение по проектам, закрепление, восстановление. В его описании операции не перечислены; их идентификаторы и аргументы ассистент получает из [`talkbar_tools`](#talkbar_tools).

```json
{
  "tool": "notes.create",
  "args": { "title": "Follow-ups", "markdown": "- Send the revised quote\n- Book the next call" }
}
```

Он не выполняет чтение и операции `talkbar_delete`. Пакет, в котором есть одна из них, отклоняется целиком с сообщением «Nothing in this call ran». Так одобрение `talkbar_change` в приложении никогда не одобрит удаление.

## `talkbar_delete`

Выполняет операции, которые перемещают элементы в корзину, архивируют или удаляют их: `notes.trash`, `projects.trash`, `sessions.trash`, `chats.trash`, `knowledge.archive`, `contacts.archive`, `organizations.archive`, `series.archive`, `action_items.remove`, `topics.delete`, `markers.delete`, `exports.destination.delete`, `exports.rule.delete`, `calendar.cancel` и `calendar.skip`.

```json
{ "tool": "notes.trash", "args": { "noteId": "note-k2v9w8x7c6b5n4m3l2j1h0g9" } }
```

- Перед выполнением TalkBar просит пользователя подтвердить вызов, если клиент поддерживает запросы к пользователю по MCP (`elicitation`, режим формы). Клиенту, который не умеет спрашивать, TalkBar отказывает с кодом `confirmation_unavailable`, если пользователь не включил **Разрешить удаление без подтверждения**. См. [Подтверждение удаления](/mcp/access-and-permissions#подтверждение-удаления).
- В пакете, отправленном сюда, могут быть и другие изменения, например `notes.create`, а за ним `notes.trash`. Чтение отклоняется.
- Если все вызовы пакета в любом случае будут отклонены, ответ приходит без вопроса, с ошибкой каждого вызова.

## `talkbar_tools`

Указатель операций. Вызовите его без аргументов, чтобы увидеть все операции, которые можно выполнить сейчас, сгруппированные по инструменту, который их выполняет:

```json [Ответ]
{
  "talkbar_read": {
    "notes.list": "Page document notes in an owned workspace, most recently updated first, optionally scoped to a project or a title/body search.",
    "notes.get": "Read one note's title, Markdown body (paged with maxChars and offset) and links."
  },
  "talkbar_change": {
    "notes.create": "Create a note from Markdown, optionally filed under a project and sessions."
  },
  "talkbar_delete": {
    "notes.trash": "Move a note to the Trash; it can be restored."
  },
  "off": "Turned off; the user can turn them on in TalkBar Settings > MCP Access: notes.update|append|move|pin; projects.create|update"
}
```

Пример сокращён. В `off` перечислены выключенные вами операции, чтобы ассистент мог попросить вас включить нужную. Операции, заблокированные администратором, не перечисляются.

Вызовите его с `{"tool": "<id>"}`, чтобы получить аргументы одной операции:

```json [Запрос]
{ "tool": "notes.append" }
```

```json [Ответ]
{
  "tool": "notes.append",
  "kind": "change",
  "runWith": "talkbar_change",
  "summary": "Add Markdown to the end of a note.",
  "args": {
    "type": "object",
    "properties": {
      "workspaceId": { "type": "string" },
      "noteId": { "type": "string" },
      "markdown": { "type": "string", "minLength": 1 }
    },
    "required": ["noteId", "markdown"],
    "additionalProperties": false
  }
}
```

`kind` — это `read` или `change`; `runWith` называет инструмент, которому нужно отправить операцию. `args` — JSON Schema операции; неизвестные аргументы отклоняются, поэтому схема закрыта с помощью `"additionalProperties": false`. На неизвестный идентификатор приходит `not_found` (с подсказкой «did you mean», если есть похожий), на выключенный — `turned_off`, на заблокированный — `failed`.

## Пакеты

Пакет `{"calls": [...]}` выполняет свои операции одну за другой, по порядку, в одном вызове:

- От 1 до 20 операций. Передавайте либо `tool` (с `args`), либо `calls`, но не оба сразу.
- Каждая известная операция в пакете должна относиться к инструменту, которому вы его отправили. Если хотя бы одна не относится, весь пакет отклоняется и ничего из него не выполняется.
- Неудачная операция не останавливает пакет, если `stopOnError` не равен `true`.
- Неизвестная операция завершается ошибкой `not_found` сама по себе; остальные всё равно выполняются.
- Открытое приложение TalkBar обновляется один раз для всего пакета.

В ответе по одной записи на каждую выполненную операцию:

```json
{
  "results": [
    { "tool": "sessions.list", "ok": true, "result": { "items": [], "nextCursor": null, "hasMore": false, "totalCount": 0 } },
    { "tool": "notes.get", "ok": false, "error": { "code": "not_found", "message": "Note not found in workspace" } }
  ]
}
```

Запись, которую вообще не удалось прочитать (нет `tool` или `args` не является объектом), содержит `ok: false` и ошибку, но не содержит `tool`.

Чтобы одна операция зависела от другой (создать заметку, затем отнести её к проекту), поместите обе в один пакет или дождитесь ответа на первую, прежде чем отправлять второй вызов.

## Результаты и ошибки

Успешный вызов возвращает один текстовый элемент с результатом в виде компактного JSON.

Отклонённая или неудачная операция — это тоже обычный результат инструмента. В нём есть `isError: true` и объект:

```json
{ "error": { "code": "turned_off", "message": "notes.create is turned off in TalkBar. Ask the user to turn it on in TalkBar Settings > MCP Access." } }
```

Коды: `invalid_arguments`, `not_found`, `turned_off`, `failed`, `declined`, `confirmation_unavailable`, `busy`, `conflict`, `session_recording`, `limit_reached` и `plan_limit`. Записи пакета содержат такой же объект. Что означает каждый код, см. в разделе [Ошибки и ограничения](/mcp/errors-and-limits).

Если аргументы неверны, сообщение заканчивается ссылкой на схему операции, например `Arguments: talkbar_tools {"tool":"notes.get"}`. Пять инструментов также отклоняют ключи, которых не принимают, называя их.

Ошибкой протокола (JSON-RPC `-32602`) считается только имя инструмента, отличное от этих пяти, а также вызов, отменённый вашим клиентом (см. [Формат сообщений](#формат-сообщений)).

## Изменения списка инструментов

TalkBar отправляет `notifications/tools/list_changed`, когда переключатель в разделе **Доступ по MCP** меняет определения этих пяти инструментов. Проверка выполняется в начале каждого вызова инструмента, без периодического опроса, поэтому уведомление приходит с вашим следующим вызовом. Определения меняются, когда:

- вы включаете или выключаете операцию чтения (потому что `talkbar_read` перечисляет операции чтения);
- вы включаете или выключаете `workspace.search` (`talkbar_find` появляется или исчезает);
- вы включаете первую или выключаете последнюю операцию, которую выполняет `talkbar_change` или `talkbar_delete` (инструмент появляется или исчезает).

Другие переключатели изменений, а также **Разрешить удаление без подтверждения** не меняют пять инструментов, и об их изменении уведомление не отправляется. Выключенное изменение видно в поле `off` в `talkbar_tools` и при вызове отвечает `turned_off`.

Если MCP был выключен, когда приложение подключалось, сервер вообще не предложил инструментов. Включив MCP, заново подключите TalkBar в своём приложении.

## Постраничное чтение

Каждый список сообщает, как получить следующую страницу. Передайте полученное значение обратно в соответствующем аргументе:

| В ответе есть | Передайте обратно как | Операции |
| --- | --- | --- |
| `nextCursor` | `cursor` | `sessions.list`, `notes.list`, `chats.list`, `knowledge.suggestions.list` |
| `nextOffset` | `offset` | `projects.list`, `knowledge.list`, `contacts.sessions`, `calendar.upcoming`, `notes.get`, `documents.read` |
| `nextTurnOffset` | `turnOffset` | `sessions.transcript` |
| `nextBeforeSequence` | `beforeSequence` | `chats.get` |
| идентификатор последней сессии | `after` | `exports.sessions` |

- Курсор должен быть получен от TalkBar. Если следующего значения нет или оно равно `null`, это последняя страница.
- Размер страницы зависит от операции. Диапазон `limit` указан в схеме каждой операции; значение вне диапазона отклоняется, а не подгоняется.
- `notes.get`, `documents.read` и `sessions.transcript` разбивают длинный текст на страницы с помощью `maxChars` — от 1 000 до 200 000 символов (по умолчанию 20 000). Смещение за пределами конца отклоняется.
- Страницы `sessions.transcript` содержат только целые реплики. См. [Чтение транскрипта по частям](/mcp/examples#найти-сессию-и-прочитать-транскрипт-по-частям).

## Формат сообщений

Для тех, кто пишет собственный MCP-клиент:

- **Транспорт:** стандартный ввод и вывод, одно сообщение JSON-RPC 2.0 на строку, до 8 МБ на сообщение.
- **Начало:** сначала отправьте `initialize`. Любой другой запрос до него получает `-32601` («Send initialize first»); уведомления до него отбрасываются. Повторный `initialize` получает `-32600`.
- **Некорректный ввод:** строка, которая не является JSON, получает `-32700` с `"id": null`. Массив JSON (пакет JSON-RPC) получает один ответ `-32600`: в MCP нет пакетов, поэтому отправляйте одно сообщение на строку или используйте `{"calls": [...]}`. Сообщение, которое не является объектом, не содержит `"jsonrpc": "2.0"` или имеет идентификатор, отличный от строки или целого числа, получает `-32600`.
- **Вызовы инструментов:** `tools/call` требует `{"name": "<tool>"}`, а `arguments` должен быть объектом (или отсутствовать). Иначе ответом будет `-32602`.
- **Порядок:** одновременно выполняется до четырёх вызовов инструментов от одного клиента, поэтому ответы могут приходить не в том порядке, что запросы. Сопоставляйте их по `id`.
- **Отмена:** когда клиент отменяет вызов инструмента, сервер отвечает ошибкой JSON-RPC (`-32603`, «Request cancelled by the client»), а не результатом инструмента. Запрос, отменённый до начала операции, не выполняется, а в пакете не выполняются операции, которые ещё не начались.
- **Ресурсы и промпты:** не предоставляются. Списки ресурсов пусты.

## См. также

- [Справочник операций](/mcp/operations)
- [Доступ и разрешения](/mcp/access-and-permissions)
- [Ошибки и ограничения](/mcp/errors-and-limits)
- [Примеры](/mcp/examples)
- [talkbar-cli](/mcp/cli)
