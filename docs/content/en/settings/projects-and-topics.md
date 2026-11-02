---
title: Projects, topics and keywords
description: Reference for Settings → Projects and Settings → Topics & Keywords, including project Trash, keywords cleanup and Action item labels.
navigation:
  icon: i-heroicons-tag
---

Two tabs in the **Workspace** group of Settings organize your work. **Settings → Projects** manages the projects in the current workspace. **Settings → Topics & Keywords** manages your own topics, the keywords AI picks from sessions, and the labels you use to capture action items.

For what projects, topics and action items are and how to use them day to day, see [Projects](/knowledge/projects), [Topics and keywords](/knowledge/topics-and-keywords) and [Action items](/knowledge/action-items).

## Projects

**Settings → Projects** lists every project in the workspace. Pinned projects come first, then the rest in their saved order, then by name. Each row shows the project icon, its name, its type and how many sessions it has. The project you are working in is marked **Active**. Hover over a row to see its ⋮ menu, or right-click the row.

::screenshot{src="/screenshots/settings/projects-tab.png" alt="Settings → Projects tab with several projects listed (one marked Active, one pinned), the New project button and the Show deleted button at the bottom" caption="Settings → Projects"}
::

| Control | What it does |
| --- | --- |
| **New project** | Opens the **New project** dialog. If your plan's project limit is reached, TalkBar shows your plan limits instead. |
| Row menu (⋮) → **Pin project** / **Unpin project** | Pins the project so it sorts first and stays in the sidebar. |
| Row menu (⋮) → **Edit project** | Opens the same dialog to change the project. |
| Row menu (⋮) → **Move to Trash** | Moves the project to Trash after you confirm. Its sessions, documents and knowledge cards stay, and published session links stay live. |
| **Show deleted (*n*)** / **Hide deleted (*n*)** | Shows or hides the **Deleted projects** list. Appears only when at least one project is in Trash. |

### New project and Edit project dialog

| Field | What it does | Default |
| --- | --- | --- |
| Icon | The project icon shown everywhere in the app. **Use the default folder** clears it. | Default folder icon |
| **Name** | The project name. | — |
| **Type** | The kind of project: Client, Engagement, Recurring, Internal, Personal, Research, Product, Sales, Hiring, Education, Event or Support. | Client |
| **Upload logo** / **Change logo** / **Remove logo** | An image shown on the project page. The icon is used everywhere else. | No logo |
| Color | The project color. **A** picks a color automatically. | Automatic |
| **Organization** | Links the project to a company. | No organization |
| **Default session template** | The template new sessions in this project start with. | No default template |
| **Links** | Labeled links to docs, boards or repos for the project. **Add link** adds a row. | None |
| **Description** | What the project is about. Accepts pasted Markdown and images. | Empty |

### Deleted projects

When you click **Show deleted**, the **Deleted projects** list shows each project in Trash and when it was moved there.

- **Restore** brings the project back. If your plan's project limit is already reached, TalkBar shows your plan limits instead.
- **Delete permanently** opens a confirmation dialog. It cannot be undone.

In the **Delete permanently** dialog:

| Control | What it does | Default |
| --- | --- | --- |
| **Delete everything** / **Keep contents** | **Delete everything** erases the project's sessions, documents, knowledge cards and extracted items, and takes down their published links. **Keep contents** deletes only the project; its contents move to **No project** and their published links keep working. | Delete everything |
| **Create a backup first** | Makes a backup before deleting. | On |
| **Type the full project name … to confirm** | You must type the exact project name before the delete button turns on. | — |

If a permanent delete fails partway, the button changes to **Retry**. A retry always continues with the choice you made the first time.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Permanent delete is only available here, in **Deleted projects**. Everywhere else in the app, deleting a project moves it to Trash.
::

## Topics & Keywords

**Settings → Topics & Keywords** has three inner tabs: **Topics**, **Keywords** and **Action Items**. The Topics and Keywords tabs show a count of their items.

### Topics

Topics are your own labels for sessions and notes. They apply to the whole workspace and have only a name and a color.

| Control | What it does |
| --- | --- |
| **New topic** | Opens a form with a color picker and a **Topic name** field (up to 80 characters). **Create** or Enter saves it, and Esc cancels. A new topic gets a random color unless you choose one. |
| Topic name | Click a topic's name to open its page with the sessions and notes tagged with it. |
| Edit (pencil) | Rename the topic or change its color, then **Save**. |
| Delete (trash) | Deletes the topic after you confirm with **Delete Topic**. The dialog shows how many sessions and notes use it. Those sessions and notes are kept; only the topic is removed from them. |

Topic names are unique in a workspace, ignoring case. If a name is taken, TalkBar says so and keeps the form open. Topics can't be merged. AI never creates or suggests topics.

### Keywords

Keywords are picked by AI for each session when its summary is generated. They appear here after the first summary. The number next to each keyword is how many sessions carry it.

::screenshot{src="/screenshots/settings/topics-keywords-tab.png" alt="Settings → Topics & Keywords with the Keywords inner tab open, a few keywords selected, and the selection bar showing Convert to topics, View sessions, Clear and Delete" caption="Keywords tab with a selection"}
::

| Control | What it does | Default |
| --- | --- | --- |
| **Search keywords** | Filters the list by text. | Empty |
| **All** / **No topic** | **No topic** shows only keywords that don't yet match one of your topics. | All |
| Click a keyword, **Select all** | Selects keywords for a bulk action. **Select all** selects the keywords shown right now. Click a selected keyword again to deselect it, or press Esc to clear the selection. | — |
| Remove (×) on a keyword | Appears when you hover over a keyword. Removes that one keyword, after you confirm with **Remove**. The dialog shows how many sessions carry it. | — |
| **Convert to topics** | Creates a topic for each selected keyword, or reuses a topic with the same name, and assigns it to the sessions that carry the keyword. Keywords stay on the sessions. The dialog shows how many topics are new and how many already exist. Confirm with **Convert**. | — |
| **View sessions** | Opens the session list filtered by the selected keywords. | — |
| **Clear** | Clears the selection. | — |
| **Delete** | Removes the selected keywords from every session that carries them, after you confirm with **Remove**. AI will not add them back unless you add them on a session yourself. | — |
| Right-click a keyword | Opens a menu for that keyword with **View sessions**, **Convert to topic** and **Delete**. | — |
| **Convert to topic** | Converts one keyword. If a topic with that name already exists, you are asked to **Assign topic**; otherwise you name the new topic and choose **Create and assign**. If you type the name of an existing topic, TalkBar assigns that topic. | — |
| **Load more** | Loads the next page of keywords when the list is long. | — |

Keywords can't be renamed or merged on this tab. To change one keyword's wording, edit it on its session. See [Topics and keywords](/knowledge/topics-and-keywords#keywords).

If a session that carries the keyword already has 20 topics, the conversion fails with an error. Remove a topic from that session and try again.

### Action Items

The **Action Items** inner tab manages **Action item labels**: the names, icons, colors and order of the choices you see when you capture an action item.

::screenshot{src="/screenshots/settings/action-item-labels.png" alt="Settings → Topics & Keywords → Action Items inner tab showing the Catalog picker set to Workspace defaults, the four built-in labels (Task, Follow-up, Question, Decision) and the Disabled Action items list below" caption="Action item labels"}
::

| Control | What it does | Default |
| --- | --- | --- |
| **Catalog** | Chooses which labels you are editing: **Workspace defaults** (available in every project and in sessions without a project) or one project. Project labels are added to the workspace labels and can have their own order. | Workspace defaults |
| **Add label** | Creates a label in the selected catalog. | — |
| Drag handle | Drag a row to change the order labels appear in capture menus. | — |
| Label menu (⋮, or right-click the row) → **Edit** | Change the label's icon, name or color. This also works for built-in labels. | — |
| Label menu → **Hide from capture menus** / **Show in capture menus** | Hides a label without deleting it. Hidden labels move to **Disabled Action items**. | — |
| Label menu → **Archive** | Removes a label you created, or a ready-made one, from capture menus and from this tab. Existing action items keep its name, icon and color. You can't bring an archived label back. The four built-in labels can't be archived, only hidden. | — |
| **Enable** (in **Disabled Action items**) | Turns on a ready-made or hidden label. | — |

In a project catalog, labels marked **Managed in Workspace defaults** come from the workspace. You can reorder them for the project, but you edit them, and turn ready-made ones on, under **Workspace defaults**.

If every label is hidden, capture menus show **Configure action item labels**, which opens this tab.

**Add label dialog.**

| Field | What it does | Default |
| --- | --- | --- |
| **Icon** | The label's icon. | Set by the behavior |
| **Label** | The name, up to 80 characters. Two labels in a catalog can't share a name. | Empty |
| **Color** | The label's color. | Set by the behavior |
| **Behavior** | How items with this label work. See the table below. Choosing a behavior resets the icon and color to its defaults. | Task |

**Built-in labels.** Every workspace starts with four visible labels: **Task**, **Follow-up**, **Question** and **Decision**. It also includes ready-made labels that start under **Disabled Action items** until you enable them: Idea, Risk, Blocker, Commitment, Request, Waiting on, Delegated, Parking lot, Research, Agreement and Trade-off.

**Behavior.** When you add a label, you pick its **Behavior**. It can't be changed after the label is created.

| Behavior | Statuses | Due dates and assignees | Ready-made labels |
| --- | --- | --- | --- |
| **Task** | Open → Done | Yes | Idea, Risk, Blocker, Commitment |
| **Follow-up** | Open → Done | Yes | Request, Waiting on, Delegated |
| **Question** | Open → Answered, with an answer field | No due dates | Parking lot, Research |
| **Decision** | Active → Superseded | No due dates | Agreement, Trade-off |

AI summaries capture tasks as action items, questions as open questions and decisions as decisions. They always use the built-in labels, even hidden ones, and never your own labels. To change a label on an item, use **Convert**. See [Action items](/knowledge/action-items#change-or-remove-an-item).

## Related

- [Projects](/knowledge/projects)
- [Topics and keywords](/knowledge/topics-and-keywords)
- [Action items](/knowledge/action-items)
- [Templates and skills settings](/settings/templates-and-skills)
- [Settings overview](/settings/overview)
