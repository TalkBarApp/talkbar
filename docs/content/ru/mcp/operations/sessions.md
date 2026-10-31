---
title: Сессии
description: Операции MCP и CLI, чтобы показывать, читать, относить к проектам, закреплять, перемещать в корзину и восстанавливать сессии, читать транскрипты и хронологию, называть участников и управлять карточками сессии.
navigation:
  icon: i-heroicons-microphone
---

Операции с сессиями читают то, что показывает страница сессии (итоги, транскрипт, хронологию, показатели, заметки, документы и карточки), и вносят те же изменения, что доступны там: переименование, привязку к проекту, закрепление, имена участников, добавление карточек, перемещение в корзину и восстановление. Каждая операция также принимает необязательный `workspaceId`. Общие правила описаны в разделе [Как читать этот справочник](/mcp/operations#как-читать-этот-справочник).

| Операция | Тип | Инструмент | По умолчанию | Группа |
| --- | --- | --- | --- | --- |
| [`sessions.list`](#sessionslist) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`sessions.get`](#sessionsget) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`sessions.recording`](#sessionsrecording) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`sessions.stats`](#sessionsstats) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`sessions.transcript`](#sessionstranscript) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`sessions.timeline`](#sessionstimeline) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`sessions.notes`](#sessionsnotes) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`sessions.documents`](#sessionsdocuments) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`sessions.live_cards`](#sessionslive_cards) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`sessions.trash.list`](#sessionstrashlist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`sessions.rename`](#sessionsrename) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`sessions.move`](#sessionsmove) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`sessions.pin`](#sessionspin) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`sessions.speakers.rename`](#sessionsspeakersrename) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`sessions.speakers.link`](#sessionsspeakerslink) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`sessions.speakers.unlink`](#sessionsspeakersunlink) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`sessions.cards.add`](#sessionscardsadd) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`sessions.cards.attach`](#sessionscardsattach) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`sessions.cards.detach`](#sessionscardsdetach) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`sessions.trash`](#sessionstrash) | Изменение | `talkbar_delete` | Выкл. | `contentChanges` |
| [`sessions.restore`](#sessionsrestore) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |

## Работа с текущей сессией

Ассистент может работать с сессией, которую вы сейчас записываете, и всё, что он добавляет, сразу появляется на экране записи:

1. Вызовите `sessions.recording`, чтобы найти её, и проверьте `stale`.
2. Читайте её через `sessions.transcript` с `cursor: "0:"` и `format: "json"`, затем каждый раз передавайте полученный `nextCursor`. `sessions.timeline` возвращает уже записанные пункты хронологии, а `sessions.stats` — предварительный список участников.
3. Добавляйте закладки (`markers.create`), задачи (`action_items.create`) и карточки знаний (`sessions.cards.add`, `sessions.cards.attach`) или дописывайте заметку сессии (`notes.append`).

Во время записи транскрипт, пункты хронологии и участники доступны ассистентам только для чтения (изменения участников отвечают `session_recording`). Запись управляется только в приложении, а итоги и ключевые слова от ИИ появляются после её остановки.

## `sessions.list`

Постранично показывает данные о сессиях рабочего пространства, начиная с самых новых, с фильтрами по проекту, серии, статусу, времени начала, теме и названию.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы**

::field-group
  ::field{name="projectId" type="string"}
  Только сессии, относящиеся к этому проекту.
  ::
  ::field{name="seriesId" type="string"}
  Только сессии этой серии (из `series.list`).
  ::
  ::field{name="status" type="string"}
  Только сессии в этом состоянии. `recording` показывает, идёт ли сейчас запись какой-либо сессии. Одно из значений: `recording`, `open`, `interrupted`, `complete`.
  ::
  ::field{name="startedAfterMs" type="integer"}
  Только сессии, начатые в это время или позже (время Unix в мс, включительно).
  ::
  ::field{name="startedBeforeMs" type="integer"}
  Только сессии, начатые раньше этого времени (время Unix в мс, не включительно).
  ::
  ::field{name="search" type="string"}
  Поиск по части названия сессии без учёта регистра.
  ::
  ::field{name="topicId" type="string"}
  Только сессии с этой темой (из `topics.list`).
  ::
  ::field{name="limit" type="integer"}
  Сколько вернуть. От 1 до 100. По умолчанию `40`.
  ::
  ::field{name="cursor" type="string"}
  Значение `nextCursor` с предыдущей страницы. Не может быть пустым.
  ::
::

**Возвращает:** `{items, nextCursor, hasMore, totalCount}`. У каждого элемента есть `sessionId`, `title`, `status`, `startedAtMs`, `endedAtMs`, `projectId`, `seriesId`, `participantCount`, `pinned`, `source` и `private`.

- Показывает сессии, которые не в корзине; для сессий в корзине используйте `sessions.trash.list`.
- Чтобы получить следующую страницу, передайте `nextCursor` обратно как `cursor`.

```json
{"tool": "sessions.list", "args": {"projectId": "proj_123", "status": "complete", "limit": 20}}
```

## `sessions.get`

Читает одну сессию: её данные, текст и разделы итогов, задачи и решения.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
::

**Возвращает:** поля `sessions.list`, а также `speakerCount`, `workspaceId`, `sessionType`, `createdAt`, `updatedAt`, `revision`, `summary` (`{text, sections, generatedBy}`, где `generatedBy` называет модель и провайдера и сообщает, редактировались ли итоги), `actionItems` и `decisions`.

- `participantCount` учитывает всех участников сессии, включая тех, кто ничего не сказал; `speakerCount` — только тех, кто говорил.
- `revision` меняется при любом изменении на странице сессии, поэтому ассистент может дёшево опрашивать это поле и перечитывать сессию, только когда оно изменилось.
- Пока идёт запись: `recording: true`, `summaryPending: true` и `summary: null`. Итоги подводятся после остановки записи.
- Транскрипт читайте через `sessions.transcript`. Для сессии в корзине возвращается `not_found`.

```json
{"tool": "sessions.get", "args": {"sessionId": "ses_123"}}
```

## `sessions.recording`

Возвращает сессию, которая записывается прямо сейчас, или `null`, если запись не идёт. Вызывайте её первой при работе с текущей сессией, а затем используйте её `sessionId`.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы:** только `workspaceId`.

**Возвращает:** `{recording: null}` или `{recording: {sessionId, title, startedAtMs, elapsedMs, revision, appRunning, stale}}`.

- `elapsedMs` — время по часам с момента начала, включая паузы (о паузах знает только приложение).
- `appRunning` сообщает, запущено ли приложение TalkBar для этой папки данных (`null`, если это не удаётся определить). `stale: true` означает, что TalkBar не запущен, поэтому сессия лишь выглядит записываемой — при следующем запуске TalkBar отметит её как прерванную.
- Никогда не принимайте «самую новую сессию» за текущую: используйте эту операцию.

```json
{"tool": "sessions.recording", "args": {}}
```

## `sessions.stats`

Читает показатели сессии: сколько длилась запись, её паузы, реплики, число символов, время разговора каждого участника и какая модель подвела итоги для каждой сохранённой длины. Без текста транскрипта и итогов.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
::

**Возвращает:** `sessionId`, `status`, `sessionType`, `private`, `startedAtMs`, `endedAtMs`, `elapsedMs`, `recordedMs`, `recordingRuns`, `breaks`, `turns`, `transcriptChars`, `speakerCount`, `talkTimeMs`, `speakers` и `summary`. У каждого участника есть `speakerId`, `contactId` (связанный человек или `null`), `name`, `isUser`, `excludedFromAi`, `talkTimeMs` и `share`. `summary` описывает выбранную длину итогов и модель и перечисляет все сохранённые длины.

- Операции `sessions.speakers.*` принимают именно `speakerId`.
- Пока идёт запись, участники берутся из текущего транскрипта: `speakerId: null`, а также `turns` и `provisional: true`.

```json
{"tool": "sessions.stats", "args": {"sessionId": "ses_123"}}
```

## `sessions.transcript`

Читает транскрипт сессии так, как его показывает страница сессии, с именами участников и временем, страницами из целых реплик.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
  ::field{name="speaker" type="string"}
  Только реплики участников, имя которых содержит этот текст (без учёта регистра). Чтобы прочитать реплики одного человека, используйте значение `speaker`, которое возвращает `contacts.sessions`.
  ::
  ::field{name="turnOffset" type="integer"}
  Реплика, с которой начать: `nextTurnOffset` из предыдущей страницы. Нельзя сочетать с `cursor`.
  ::
  ::field{name="maxChars" type="integer"}
  Размер страницы в символах. От 1 000 до 200 000. По умолчанию `20000`.
  ::
  ::field{name="format" type="string"}
  `text` (по умолчанию) возвращает строки вида `[mm:ss] Name: text`; `json` возвращает объекты реплик с идентификаторами.
  ::
  ::field{name="cursor" type="string"}
  Следить за изменениями транскрипта. Начните с `"0:"`, затем передавайте `nextCursor` из каждого ответа, чтобы получать только реплики, добавленные или изменённые с тех пор.
  ::
::

**Возвращает:** `sessionId`, `title`, `startedAtMs`, `private`, `truncated`, `excludedFromAiSpeakers`, затем `transcript` (для text) или `turns` (для json). При постраничном чтении добавляются `totalTurns`, `turnOffset` и `nextTurnOffset`; при чтении с курсором вместо них добавляется `nextCursor`. Реплики в формате json содержат `turnId`, `chunkId`, `startMs`, `endMs`, `speaker`, `isUser`, `excludedFromAi`, `text` и `translatedText`.

- Страницы состоят из целых реплик. `turnOffset` за пределами конца отклоняется.
- `turnId` и `chunkId` принимают `markers.create` и `action_items.create`, чтобы указать на момент разговора.
- Пока идёт запись, реплики могут быть `provisional: true`, а ответ содержит `recording: true`.
- Участники, исключённые из ИИ, отмечаются, а не скрываются. Удалённые реплики при чтении с курсором не сообщаются; когда меняется `revision`, перечитайте транскрипт целиком.

```json
{"tool": "sessions.transcript", "args": {"sessionId": "ses_123", "format": "json", "maxChars": 50000}}
```

## `sessions.timeline`

Читает хронологию сессии со временем так, как её показывает страница сессии.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
::

**Возвращает:** `{sessionId, title, private, points: [{pointId, at, atMs, text, translatedText, edited}]}`. `at` имеет вид `mm:ss` (`h:mm:ss` после первого часа, `--:--`, если у пункта нет времени).

- `pointId` принимают `markers.create` и `action_items.create`, чтобы указать на пункт хронологии.

```json
{"tool": "sessions.timeline", "args": {"sessionId": "ses_123"}}
```

## `sessions.notes`

Показывает собственную заметку сессии и добавленные к ней заметки. Чтобы прочитать заметку целиком, используйте `notes.get`.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
::

**Возвращает:** `{sessionId, private, notes: [{noteId, title, role, preview, updatedAt}]}`. `role` равно `session` для собственной заметки сессии и `added` для добавленных к ней заметок; `preview` — первые 160 символов.

```json
{"tool": "sessions.notes", "args": {"sessionId": "ses_123"}}
```

## `sessions.documents`

Показывает документы, добавленные к сессии. Чтобы прочитать документ, используйте `documents.read`.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
::

**Возвращает:** `{sessionId, private, documents: [{documentId, title, fileType, status, pinned, projectId, updatedAt}]}`.

## `sessions.live_cards`

Показывает карточки знаний и прежние задачи, взятые в сессию, и моменты, когда разговор к каждой из них возвращался.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
::

**Возвращает:** `{sessionId, private, cards, broughtInActionItems, capturedActionItems}`. У карточек есть `memoryId`, `title`, `body`, `type`, `status` и `cameUp`. `cameUp` — это `null` или `{count, first, last, moments: [{at, atMs, heard, matchedTerms}]}`, где `heard` — слова, прозвучавшие в этот момент. Задачи возвращаются в том же виде, что и в `action_items.get`; у взятых задач также есть `statusWhenBroughtIn` и `cameUp`.

## `sessions.trash.list`

Показывает сессии в корзине.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="limit" type="integer"}
  Сколько вернуть. От 1 до 200. По умолчанию `50`.
  ::
::

**Возвращает:** `{sessions: [{sessionId, title, trashedAt}]}`.

## `sessions.rename`

Меняет название сессии. Работает и во время записи.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
  ::field{name="title" type="string" required}
  Новое название. Не может быть пустым; пробелы по краям удаляются.
  ::
::

**Возвращает:** `{sessionId, title}`, а также `sessionStatus` (и `warning`, если сессия была прервана или записывается, когда TalkBar не запущен).

```json
{"tool": "sessions.rename", "args": {"sessionId": "ses_123", "title": "Q4 roadmap review"}}
```

## `sessions.move`

Относит сессию к проекту или убирает её из проекта.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
  ::field{name="projectId" type="string | null" required}
  Проект, к которому отнести сессию, или `null`, чтобы убрать её из проекта. Обязательный аргумент: чтобы убрать сессию из проекта, явно передайте `null`.
  ::
  ::field{name="moveKnowledge" type="boolean"}
  Перенести вместе с сессией её карточки знаний. По умолчанию `true`.
  ::
::

**Возвращает:** `{sessionId, projectId, previousProjectId}`, а также `sessionStatus` (и `warning`, если сессия была прервана или записывается, когда TalkBar не запущен).

- Целевой проект должен существовать и не находиться в корзине.

```json
{"tool": "sessions.move", "args": {"sessionId": "ses_123", "projectId": "proj_456"}}
```

## `sessions.pin`

Закрепляет или открепляет сессию.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
  ::field{name="pinned" type="boolean" required}
  `true` закрепляет, `false` открепляет.
  ::
::

**Возвращает:** `{sessionId, pinned}`, а также `sessionStatus` (и `warning`, если сессия была прервана или записывается, когда TalkBar не запущен). Операции чтения показывают состояние в поле `pinned`, а `revision` меняется.

## `sessions.speakers.rename`

Даёт имя участнику сессии, запись которой не идёт, — так же, как меню участника в приложении. Участник связывается с человеком с этим именем; если такого человека нет, он создаётся.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия. Идентификаторы можно найти через `sessions.list` или `talkbar_find`; идентификатор текущей сессии — через `sessions.recording`.
  ::
  ::field{name="speakerId" type="string" required}
  `speakerId` из `sessions.stats`.
  ::
  ::field{name="name" type="string" required}
  Имя участника. От 1 до 40 символов после удаления пробелов по краям.
  ::
::

**Возвращает:** `{sessionId, speakerId, name, contactId}`.

- Если TalkBar создал человека только для этого участника (ещё не подтверждённого и ни с чем больше не связанного), этот человек переименовывается, а не создаётся новый.
- Если с таким именем несколько людей, вызов завершается ошибкой и перечисляет их, чтобы вы могли связать участника с одним из них через `sessions.speakers.link`.
- Имя, которое уже есть у другого участника этой сессии, отклоняется: вместо этого объедините этих участников в приложении.
- Сессия, запись которой идёт, отклоняется с `session_recording`; неизвестный участник — `not_found`. Сказанное и голосовые данные не меняются.

```json
{"tool": "sessions.speakers.rename", "args": {"sessionId": "ses_123", "speakerId": "spk_2", "name": "Dana Lee"}}
```

## `sessions.speakers.link`

Связывает участника сессии, запись которой не идёт, с человеком, который уже есть в TalkBar. Участник получает имя этого человека.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия. Идентификаторы можно найти через `sessions.list` или `talkbar_find`; идентификатор текущей сессии — через `sessions.recording`.
  ::
  ::field{name="speakerId" type="string" required}
  `speakerId` из `sessions.stats`.
  ::
  ::field{name="contactId" type="string" required}
  Человек из `contacts.list`.
  ::
::

**Возвращает:** `{sessionId, speakerId, name, contactId}`.

- Никогда не создаёт человека: для неизвестного или архивного человека возвращается `not_found`.
- Сессия, запись которой идёт, отклоняется с `session_recording`.

## `sessions.speakers.unlink`

Убирает имя участника и его связь с человеком в сессии, запись которой не идёт, — так же, как **Убрать имя** в приложении. Участник снова становится «Участник 1», «Участник 2» и так далее, по порядку первой реплики.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия. Идентификаторы можно найти через `sessions.list` или `talkbar_find`; идентификатор текущей сессии — через `sessions.recording`.
  ::
  ::field{name="speakerId" type="string" required}
  `speakerId` из `sessions.stats`.
  ::
::

**Возвращает:** `{sessionId, speakerId, name, contactId}`.

- Сессия, запись которой идёт, отклоняется с `session_recording`.

## `sessions.cards.add`

Создаёт карточку знаний в сессии, в том числе во время записи. Карточка сразу появляется на экране записи.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
  ::field{name="title" type="string" required}
  Заголовок карточки. Не может быть пустым.
  ::
  ::field{name="body" type="string"}
  Текст карточки.
  ::
  ::field{name="type" type="string"}
  Тип карточки. Одно из значений: `fact`, `preference`, `decision`, `commitment`, `risk`, `open_question`, `relationship_context`, `instruction`, `key_moment`, `contract_term`, `pricing_detail`, `technical_detail`. По умолчанию `fact`.
  ::
  ::field{name="sessionOnly" type="boolean"}
  Оставить карточку только в этой сессии. Иначе она сохраняется так же, как приложение сохраняет карточку, добавленную во время сессии: в проекте сессии, если он есть (если только настройка памяти сессии не оставляет карточки в сессии), а иначе — только в этой сессии.
  ::
::

**Возвращает:** карточку (`memoryId`, `title`, `type`, `status`, `pinned`, `projectId`, `sessionOnly`, `updatedAt`) с `sessionId` и `sessionStatus` (и `warning`, если сессия была прервана или записывается, когда TalkBar не запущен).

- В сессии может быть до 24 карточек; попытка добавить 25-ю отклоняется с `limit_reached`.

```json
{"tool": "sessions.cards.add", "args": {"sessionId": "ses_123", "title": "Budget capped at $40k", "type": "decision"}}
```

## `sessions.cards.attach`

Добавляет в сессию существующую карточку знаний, в том числе во время записи.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
  ::field{name="memoryId" type="string" required}
  Карточка из `knowledge.list`.
  ::
::

**Возвращает:** `{memoryId, sessionId, attached: true, alreadyAttached}`, а также `sessionStatus` (и `warning`, если сессия была прервана или записывается, когда TalkBar не запущен).

- В сессии может быть до 24 карточек (сверх этого — `limit_reached`). Для карточки из другого рабочего пространства возвращается `not_found`.

## `sessions.cards.detach`

Убирает карточку знаний из сессии. Сама карточка сохраняется, поэтому операция выполняется через `talkbar_change`.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия, с которой нужно работать. Идентификатор сессии, которая записывается сейчас, возвращает `sessions.recording`.
  ::
  ::field{name="memoryId" type="string" required}
  Карточка из `sessions.live_cards` или `knowledge.list`.
  ::
::

**Возвращает:** `{memoryId, sessionId, attached: false}`, а также `sessionStatus` (и `warning`, если сессия была прервана или записывается, когда TalkBar не запущен).

## `sessions.trash`

Перемещает завершённую сессию в корзину. Её можно восстановить.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия. Идентификаторы можно найти через `sessions.list` или `talkbar_find`; идентификатор текущей сессии — через `sessions.recording`.
  ::
::

**Возвращает:** `{sessionId, trashed: true}`.

- Сессия, запись которой ещё идёт, отклоняется с `session_recording`.
- Перемещение в корзину сессии, которая уже там, проходит успешно, а дата первого перемещения сохраняется.
- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

```json
{"tool": "sessions.trash", "args": {"sessionId": "ses_123"}}
```

## `sessions.restore`

Возвращает сессию из корзины.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="sessionId" type="string" required}
  Сессия. Идентификаторы можно найти через `sessions.list` или `talkbar_find`; идентификатор текущей сессии — через `sessions.recording`.
  ::
::

**Возвращает:** `{sessionId, restored: true}`. Для сессии, которой нет в корзине, возвращается тот же ответ.

- Учитывается в лимите сессий вашего тарифа: при достижении лимита отклоняется с `plan_limit` (`limit: "sessions"`). Лимит показывает `plan.get`.

## См. также

- [Справочник операций](/mcp/operations)
- [Темы и закладки](/mcp/operations/topics-and-markers) (ключевые слова и закладки сессий)
- [Задачи](/mcp/operations/action-items)
- [База знаний](/mcp/operations/knowledge)
- [Подробности сессии в приложении](/sessions/session-details)
