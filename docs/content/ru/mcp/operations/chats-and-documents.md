---
title: Чаты и документы
description: 'Операции MCP и CLI для чатов «Спросить TalkBar» и документов: список, чтение текста, переименование, закрепление, проекты, корзина и восстановление.'
navigation:
  icon: i-heroicons-chat-bubble-left-right
---

Операции с чатами читают и упорядочивают ваши чаты «Спросить TalkBar»; отправить сообщение в чат ассистент не может. Операции с документами выводят документы, читают извлечённый из них текст, переименовывают, закрепляют и привязывают документы к проектам. Каждая операция также принимает необязательный `workspaceId`. Общие правила описаны в разделе [Как читать этот справочник](/mcp/operations#как-читать-этот-справочник).

| Операция | Тип | Инструмент | По умолчанию | Группа |
| --- | --- | --- | --- | --- |
| [`chats.list`](#chatslist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`chats.get`](#chatsget) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`chats.trash.list`](#chatstrashlist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`chats.update`](#chatsupdate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`chats.trash`](#chatstrash) | Изменение | `talkbar_delete` | Выкл. | `contentChanges` |
| [`chats.restore`](#chatsrestore) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`documents.list`](#documentslist) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`documents.get`](#documentsget) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`documents.read`](#documentsread) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`documents.update`](#documentsupdate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |

## `chats.list`

Постранично выводит чаты с ИИ («Спросить TalkBar») рабочего пространства: сначала закреплённые, затем по времени последней активности. Сообщения не возвращаются.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="projectId" type="string"}
  Только чаты, привязанные к этому проекту.
  ::
  ::field{name="search" type="string"}
  Слова для поиска в названии чата или его сообщениях. Должно встретиться каждое слово; регистр и диакритические знаки не учитываются.
  ::
  ::field{name="view" type="string"}
  `active` (по умолчанию), `pinned` или `trash`.
  ::
  ::field{name="limit" type="integer"}
  Сколько вернуть: от 1 до 100. По умолчанию `40`.
  ::
  ::field{name="cursor" type="string"}
  Значение `nextCursor` из предыдущей страницы. Не может быть пустым.
  ::
::

**Возвращает:** `{items, nextCursor, totalCount}`. У каждого элемента есть `chatId`, `title`, `snippet`, `groundingMode`, `projectId`, `pinned`, `createdAt`, `updatedAt`, `lastMessageAtMs`, `trashedAtMs` и `currentTurnStatus`.

```json
{"tool": "chats.list", "args": {"search": "pricing"}}
```

## `chats.get`

Читает один чат и его последние сообщения: ваши вопросы и ответы на них, с источниками и названиями навыков.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="chatId" type="string" required}
  Чат из `chats.list`.
  ::
  ::field{name="limit" type="integer"}
  Сколько последних сообщений вернуть: от 1 до 200. По умолчанию `20`.
  ::
  ::field{name="beforeSequence" type="integer"}
  `nextBeforeSequence` из предыдущего вызова — чтобы получить более старые сообщения.
  ::
::

**Возвращает:** чат (как в `chats.list`, а также `workspaceId` и `replyLanguage`), `messages`, `hasMoreMessages` и `nextBeforeSequence`. У каждого сообщения есть `messageId`, `role`, `content`, `createdAt`, `sources` (`[{n, label, sourceType, sourceId, sessionId, documentId, atMs, locator, snippet, href}]`) и `skill`.

- Чат в корзине тоже можно прочитать; у него заполнено поле `trashedAtMs`.

```json
{"tool": "chats.get", "args": {"chatId": "chat_12", "limit": 50}}
```

## `chats.trash.list`

Выводит чаты в корзине.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="limit" type="integer"}
  Сколько вернуть: от 1 до 200. По умолчанию `50`.
  ::
::

**Возвращает:** `{chats: [{chatId, title, trashedAt}]}`.

## `chats.update`

Переименовывает чат, закрепляет его или привязывает к проекту.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="chatId" type="string" required}
  Чат из `chats.list`.
  ::
  ::field{name="title" type="string"}
  Новое название. Может быть пустым, как в приложении.
  ::
  ::field{name="pinned" type="boolean"}
  `true` закрепляет, `false` открепляет.
  ::
  ::field{name="projectId" type="string | null"}
  Проект или `null`, чтобы убрать чат из проекта.
  ::
::

**Возвращает:** `{chatId, title, pinned, projectId}`.

- Укажите хотя бы одно поле. Чат в корзине изменить нельзя: сначала восстановите его.

## `chats.trash`

Перемещает чат в корзину. Его можно восстановить.

**Изменение** · выполняется через [`talkbar_delete`](/mcp/tools#talkbar_delete) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="chatId" type="string" required}
  Чат из `chats.list`.
  ::
::

**Возвращает:** `{chatId, trashed: true}`. Перемещение в корзину чата, который уже там, тоже завершается успешно.

- Выполняется через `talkbar_delete`: [требует вашего подтверждения](/mcp/access-and-permissions#подтверждение-удаления), если ваше ИИ-приложение умеет его запрашивать; запросы приложений, которые не умеют, отклоняются, если не включён параметр **Разрешить удаление без подтверждения**.

## `chats.restore`

Восстанавливает чат из корзины.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="chatId" type="string" required}
  Чат из `chats.list`.
  ::
::

**Возвращает:** `{chatId, title, pinned, projectId}`. Восстановление чата, которого нет в корзине, возвращает тот же ответ.

## `documents.list`

Выводит документы рабочего пространства.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="projectId" type="string"}
  Только документы, привязанные к этому проекту.
  ::
  ::field{name="query" type="string"}
  Поиск по названию документа без учёта регистра.
  ::
  ::field{name="sessionId" type="string"}
  Только документы, добавленные в эту сессию (их выводит `sessions.documents`).
  ::
  ::field{name="limit" type="integer"}
  Сколько вернуть: от 1 до 200. По умолчанию `50`.
  ::
::

**Возвращает:** `{documents: [{documentId, title, fileType, status, pinned, projectId, updatedAt}]}`.

```json
{"tool": "documents.list", "args": {"projectId": "proj_456"}}
```

## `documents.get`

Читает данные одного документа и короткий фрагмент для предпросмотра.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="documentId" type="string" required}
  Документ из `documents.list` или `sessions.documents`.
  ::
::

**Возвращает:** строку из списка, а также `sizeBytes`, `sourceKind`, `indexProgress`, `preview` и `createdAt`.

## `documents.read`

Читает извлечённый из документа текст по страницам.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="documentId" type="string" required}
  Документ из `documents.list` или `sessions.documents`.
  ::
  ::field{name="offset" type="integer"}
  `nextOffset` из предыдущей страницы, в символах. Смещение за концом текста отклоняется.
  ::
  ::field{name="maxChars" type="integer"}
  Размер страницы в символах: от 1 000 до 200 000. По умолчанию `20000`.
  ::
::

**Возвращает:** `{documentId, title, status, totalChars, offset, nextOffset, truncated, text}`.

- Если текст из документа ещё не извлечён или документ больше недоступен, операция завершается ошибкой с понятным сообщением.

```json
{"tool": "documents.read", "args": {"documentId": "doc_8", "maxChars": 40000}}
```

## `documents.update`

Переименовывает документ, закрепляет его или привязывает к проекту.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="documentId" type="string" required}
  Документ из `documents.list` или `sessions.documents`.
  ::
  ::field{name="title" type="string"}
  Новое название. Не может быть пустым.
  ::
  ::field{name="pinned" type="boolean"}
  `true` закрепляет, `false` открепляет.
  ::
  ::field{name="projectId" type="string | null"}
  Проект или `null`, чтобы убрать документ из проекта. Проект не должен быть в корзине.
  ::
::

**Возвращает:** строку документа из списка.

- Укажите хотя бы одно поле. Добавление, удаление и повторная индексация документов доступны только в приложении.

## См. также

- [Справочник операций](/mcp/operations)
- [Спросить TalkBar](/chats-and-notes/ask-talkbar)
- [Документы в приложении](/knowledge/documents)
