---
title: Рабочее пространство и профиль
description: Операции MCP и CLI для рабочих пространств, поиска и статистики по пространству, вашего профиля и тарифа.
navigation:
  icon: i-heroicons-building-office
---

Эти операции сообщают ассистенту, в каком рабочем пространстве он работает, ищут по нему, считают, что в нём хранится, и читают ваш профиль и тариф. Все операции здесь, кроме `workspace.list`, также принимают необязательный `workspaceId`; без него используется пространство, открытое в приложении. Общие правила описаны в разделе [Как читать этот справочник](/mcp/operations#как-читать-этот-справочник).

| Операция | Тип | Инструмент | По умолчанию | Группа |
| --- | --- | --- | --- | --- |
| [`workspace.list`](#workspacelist) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`workspace.search`](#workspacesearch) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`workspace.stats`](#workspacestats) | Чтение | `talkbar_read` | Вкл. | `metadata` |
| [`workspace.rename`](#workspacerename) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`profile.get`](#profileget) | Чтение | `talkbar_read` | Вкл. | `content` |
| [`profile.update`](#profileupdate) | Изменение | `talkbar_change` | Выкл. | `contentChanges` |
| [`plan.get`](#planget) | Чтение | `talkbar_read` | Вкл. | `metadata` |

## `workspace.list`

Показывает ваши рабочие пространства и отмечает то, которое открыто в приложении. Операции, вызванные без `workspaceId`, используют это открытое пространство.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы:** нет.

**Возвращает:** `{workspaces: [{workspaceId, name, active}]}`. `active: true` отмечает пространство, открытое в приложении.

- Хороший первый вызов: он сообщает ассистенту, какое пространство по умолчанию будут использовать все остальные вызовы.

```json
{"tool": "workspace.list", "args": {}}
```

## `workspace.search`

Ищет по названиям и тексту в рабочем пространстве среди сессий, заметок, документов, чатов, задач, проектов, серий, людей, компаний и карточек знаний, начиная с лучших совпадений. Инструмент [`talkbar_find`](/mcp/tools#talkbar_find) выполняет тот же поиск.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы**

::field-group
  ::field{name="query" type="string" required}
  Что искать. Не может быть пустым. Регистр и диакритические знаки не учитываются.
  ::
  ::field{name="projectId" type="string"}
  Искать только в этом проекте.
  ::
  ::field{name="kinds" type="string[]"}
  Какие виды элементов искать. Пустой список или отсутствие аргумента означает все виды. Значения: `session`, `note`, `document`, `chat`, `action_item`, `project`, `series`, `person`, `company`, `memory` (карточка знаний).
  ::
  ::field{name="limit" type="integer"}
  Наибольшее число совпадений в ответе. От 1 до 100. По умолчанию `20`.
  ::
  ::field{name="match" type="string"}
  `any` (по умолчанию) принимает запрос на естественном языке и находит элементы, содержащие любое из оставшихся слов; `all` требует всех слов.
  ::
  ::field{name="includeArchived" type="boolean"}
  Искать также в архивных сериях, людях, компаниях и карточках знаний; они возвращаются с отметкой `archived`. По умолчанию `false`. Элементы в корзине не ищутся никогда.
  ::
::

**Возвращает:** `{matches, contentSearch}`. У каждого совпадения есть `kind`, `id`, `title`, `snippet`, `href` (ссылка в приложение), `score`, `projectId`, `matchedIn`, `atMs` (начало сессии, для остальных элементов — последнее изменение), `detail`, `context`, `itemCount`, `archived` и, для совпадения в проиндексированном тексте транскрипта или документа, `content`. `contentSearch` сообщает, искал ли поиск по проиндексированному содержимому: `on`, `keywordOnly` (модель эмбеддингов не установлена), `off` или `failed` (совпадения по названиям и тексту всё равно возвращаются).

- Фрагменты могут содержать текст транскрипта.
- Поиск идёт по названиям элементов и их собственному тексту (итоги сессий, текст заметок, сообщения чатов, подробности задач, текст карточек), а также по проиндексированному содержимому, если оно доступно.

```json
{"tool": "workspace.search", "args": {"query": "pricing decision for Northwind", "kinds": ["session", "note"], "limit": 10}}
```

## `workspace.stats`

Считает сессии по статусам, заметки, документы, проекты и одобренные карточки знаний в рабочем пространстве. Текст содержимого не возвращается.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы**

::field-group
  ::field{name="projectId" type="string"}
  Считать только в этом проекте. Действует на сессии, заметки, документы и карточки знаний; на число проектов не влияет.
  ::
  ::field{name="startedAfterMs" type="integer"}
  Считать только сессии, начатые в это время или позже (время Unix в мс, включительно). Действует только на сессии.
  ::
  ::field{name="startedBeforeMs" type="integer"}
  Считать только сессии, начатые раньше этого времени (время Unix в мс, не включительно). Действует только на сессии.
  ::
::

**Возвращает:** `{sessions: {total, byStatus, firstStartedAtMs, lastStartedAtMs}, notes: {total}, documents: {total}, projects: {total}, knowledge: {approvedTotal}}`.

```json
{"tool": "workspace.stats", "args": {"startedAfterMs": 1761955200000}}
```

## `workspace.rename`

Переименовывает рабочее пространство: открытое или то, которое указано в `workspaceId`.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="name" type="string" required}
  Новое название. Не может быть пустым; пробелы по краям удаляются.
  ::
::

**Возвращает:** `{workspaceId, name}`.

- Создание, переключение и удаление пространств в корзину остаются в приложении.

```json
{"tool": "workspace.rename", "args": {"name": "Client work"}}
```

## `profile.get`

Читает ваше имя, email и должность из профиля, который использует рабочее пространство.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `content`

**Аргументы:** только `workspaceId`.

**Возвращает:** `{profileId, workspaceId, name, email, jobTitle, isDefault}`.

```json
{"tool": "profile.get", "args": {}}
```

## `profile.update`

Меняет ваше имя, email или должность в профиле, который использует рабочее пространство.

**Изменение** · выполняется через [`talkbar_change`](/mcp/tools#talkbar_change) · переключатель MCP по умолчанию **Выкл.** · группа политики `contentChanges`

**Аргументы**

::field-group
  ::field{name="name" type="string | null"}
  Ваше имя. `null` или пустая строка очищает его.
  ::
  ::field{name="email" type="string | null"}
  Ваш email. В нём должен быть ровно один символ `@` с текстом до и после него и не должно быть пробелов. `null` или пустая строка очищает его.
  ::
  ::field{name="jobTitle" type="string | null"}
  Ваша должность. `null` или пустая строка очищает её.
  ::
::

**Возвращает:** профиль в том же виде, что и `profile.get`.

- Укажите хотя бы одно поле. Неуказанные поля не меняются; аватар сохраняется.
- Профиль виден в приложении и на страницах, которыми вы делитесь.

```json
{"tool": "profile.update", "args": {"jobTitle": "Head of Product"}}
```

## `plan.get`

Читает ваш тариф TalkBar: его лимиты и сколько из каждого занято в этом рабочем пространстве и в папке данных, состояние лицензии, а также тарифы выше вашего и что даёт каждый из них.

**Чтение** · выполняется через [`talkbar_read`](/mcp/tools#talkbar_read) · переключатель MCP по умолчанию **Вкл.** · группа политики `metadata`

**Аргументы:** только `workspaceId`.

**Возвращает:** `workspaceId`, `plan` (`{id, name}`, действующий тариф), `licensedPlan`, `previewTrialActive`, `previewTrialExpiresAt`, `environment`, `license` (`plan`, `status`, `paid`, `updatesUntil`, `onlineServicesUntil`, `renewalOpen`), `limits`, `features`, `upgrades` (`[{id, name, adds, limits}]`, пустой на самом старшем тарифе) и `upgradeUrl` (`null`, если тарифа выше нет).

- `limits` содержит `projects` и `sessions` (на рабочее пространство), `workspaces`, `profiles` и `shareLinks` (на папку данных) и `devices` (на лицензию), каждый в виде `{max, used, per}`; `max: null` означает «без ограничений». У других лимитов, например `recordingMinutes`, нет `used`.
- Во время пробного периода тестовой версии `plan` — тариф пробного периода, а `licensedPlan` сохраняет тариф вашей лицензии.
- Никогда не возвращает лицензионный ключ, email, имя владельца или платёжные данные и не может сменить тариф. Если изменение отклонено с `plan_limit`, именно здесь ассистент видит причину. Подробнее — в разделе [Ошибки и ограничения](/mcp/errors-and-limits).

```json
{"tool": "plan.get", "args": {}}
```

## См. также

- [Справочник операций](/mcp/operations)
- [Пять инструментов MCP](/mcp/tools)
- [Ошибки и ограничения](/mcp/errors-and-limits)
- [Тарифы и лицензия](/data/plans-and-license)
