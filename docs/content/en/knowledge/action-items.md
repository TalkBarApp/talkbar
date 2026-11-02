---
title: Action items
description: Tasks, follow-ups, open questions and decisions from your sessions — where they come from, owners and due dates, and how they carry over to the next meeting.
navigation:
  icon: i-heroicons-check-circle
---

**Action items** are the things that come out of a conversation: tasks to do, people to follow up with, questions still open and decisions that were made. TalkBar captures them from your sessions, keeps them with the session or project they belong to, and brings the open ones into your next meeting.

## Kinds of action items

Every action item has a label. Each label behaves like one of four built-in kinds:

| Kind | Statuses | Extras |
| --- | --- | --- |
| **Task** | Open → Done | Due date |
| **Follow-up** | Open → Done | Due date |
| **Question** | Open → Answered | An **Answer** field |
| **Decision** | Active → Superseded | — |

Any item can have responsible people.

Click the status circle on a task, follow-up or question to mark it done or answered. Click it again to reopen it. A decision has no circle: use **Mark as superseded** or **Mark as active** in its menu.

On an open question's card, **Add answer** saves your answer and marks the question answered.

### Custom labels

Besides **Task**, **Follow-up**, **Question** and **Decision**, TalkBar includes ready-made labels you can turn on: Idea, Risk, Blocker, Commitment, Request, Waiting on, Delegated, Parking lot, Research, Agreement and Trade-off. You can also create your own, with a name, icon and color, for the whole workspace or for one project.

Manage labels in **Settings → Topics & Keywords → Action Items**. See [Projects, topics and keywords settings](/settings/projects-and-topics#action-items).

## Where action items come from

- **AI summaries.** When AI writes a session's summary, it captures tasks as action items, questions as open questions and decisions as decisions.
- **You flag text.** Select text in a session's transcript or summary and set it as an action item.
- **You add one.** Click **Add item** on a session's **Action items** tab, on a project's **Action items** tab, or in **Knowledge → Action items**.
- **During a live session.** Use **Add** → **New action item** in the live knowledge panel, or **Convert to task** on a knowledge card.

Each item captured from a session keeps its **Evidence**: the quotes from the summary or transcript it came from. Open the item to see them, and use **Open in session** to go to the session.

### What AI fills in

AI captures items from a summary's **Decisions**, **Action Items & Owners** and **Open Questions** sections. A [template](/settings/templates-and-skills) without these sections produces no items.

- **Label.** Items get the built-in label of their kind and a **From summary** mark. AI never uses your own labels.
- **Owner.** If the name AI found matches exactly one session participant or person, that person is assigned. Otherwise the name shows in amber, marked **Unconfirmed**. Open **Edit** to assign someone.
- **Due date.** AI does not set one. Add it yourself.

When a summary is written again, AI updates the items it created, and removes the ones that no longer apply. Items you changed or closed stay as they are, and so do items embedded in a note or brought into a meeting. An item you hid stays hidden. AI does not create a copy of an item you added yourself or one brought in from an earlier meeting.

## Owners and due dates

Click an item's title to open **Action item details**. It shows the status, owners, due date, details, answer and evidence. For tasks, follow-ups and questions, you can change the status at the top. Click **Edit**, or choose **Edit** in the item's menu, to change the rest.

| Field | What it does |
| --- | --- |
| **Type** | The label. |
| Title | **What needs to happen?** |
| **Status** | Open, done, answered, active or superseded, depending on the kind. Shown only in **Add Action item**. For an existing item, use the status circle or the details window. |
| **Responsible people** | Who owns the item. **Assign people…** picks from your [people](/knowledge/people-and-companies). |
| **Due date** and **Time** | When the item is due. Tasks and follow-ups only. **Time** is optional and needs a date. |
| **Details** | Context, links, or what done looks like. |
| **Answer** | For questions: the answer, once you have it. |

An open item's due date turns amber within three days of the date and red once it has passed. TalkBar does not send reminders for due dates.

::screenshot{src="/screenshots/knowledge/action-item-editor.png" alt="Edit Action item dialog for a task, showing the Type label picker, the title field, Responsible people with one person assigned, Due date with a date picked, and Details" caption="Editing an action item"}
::

## Change or remove an item

Open an item's menu (⋮). On a board card, you can also right-click.

| Action | What it does |
| --- | --- |
| **Edit** | Opens the item's fields. |
| **Convert** | Gives the item another label. |
| **Mark as superseded** / **Mark as active** | Changes a decision's status. |
| **Hide** | For items AI created. The item leaves the list and does not come back when the summary is written again. |
| **Remove** | For items you added. Deletes the item permanently. Action items do not go to Trash. |
| **Copy** | On a board card: copies the title. |

Hiding or removing an item also takes it off every meeting it was brought into.

Converting between Task and Follow-up behavior keeps the status and due date. Any other change of behavior resets the status to Open or Active. A due date is kept only on Task and Follow-up behavior, and an answer only on Question behavior. Converting between labels with the same behavior changes only the label.

You change action items one at a time. There are no bulk actions.

## The Action items page

**Knowledge → Action items** lists action items, decisions and questions from every session and project. The scope switcher at the top right of Knowledge narrows the list to one project, one series, or **General**. **General** holds items with no session and no project, such as items kept after their session was permanently deleted.

Each item shows where it belongs: a project, a session or General.

| Control | What it does |
| --- | --- |
| **Table** / **Board** | Shows items as a table, or as columns on a board. On the board, **Group columns** **By behavior** or **By label**. |
| **Filters** → **Status** | **All statuses**, **Open** or **Resolved**. |
| Label filter | Shows one or more labels. |
| **Belongs to** | Shows items from one project or session. |
| **Add item** | Adds an item. With no scope selected, it goes to General. With a project selected, it goes to that project. You can't add items with a series selected. |
| **Search Action items…** | Finds items by title, details, answer, session, label or responsible people. |
| **Sort** | **Board order**, **Recently updated**, **Created**, **Due date** or **Alphabetical**. |

Click **Reset** next to the label filter to show every label again. Active filters also show as chips above the list.

### Table

The table shows **Type**, **Action item**, **Status**, **Owner** and **Due**, plus **Belongs to** in Knowledge or **Session** on a project's tab. In **Knowledge → Action items**, click the **Action item** or **Due** header to sort. On a session's or project's tab, click any column header to sort.

### Board

Each column has **Add item**, which starts a new item with that column's label or behavior. **By label** shows one column per visible label, plus read-only columns for labels that exist only on items, such as archived ones.

- Drag a card within a column to set its order.
- Drag a card to another column to convert it. See [Change or remove an item](#change-or-remove-an-item).

In **Knowledge → Action items**, you can drag only in General or one project, with **Board order** selected and no filters. On a session's or project's tab, dragging is off while a status filter or search is on.

TalkBar remembers your choice of table or board and your column grouping.

::screenshot{src="/screenshots/knowledge/action-items-board.png" alt="Knowledge → Action items in Board view grouped by behavior, with Task, Follow-up, Question and Decision columns and several item cards showing their project or session" caption="Action items as a board"}
::

The same list appears on each session's **Action items** tab and each project's **Action items** tab, limited to that session or project. A project's tab includes items from all of its sessions, and adds **Filter by session** with **All sessions**, **No session** and each session.

## Carry items to the next meeting

Open items don't get lost between meetings. For a [session series](/sessions/series), items left open in earlier meetings show up in the next meeting, together with the ones you flag during it. A meeting can have up to 24 items brought in.

You can also bring items in yourself:

- While you [prepare a scheduled session](/sessions/scheduling-and-preparing), review the **Action items** step and add or skip items.
- On a session's **Action items** tab, click **Add existing action item**. Choose **Where to look**: **This series**, **This project**, **With these people** or **All open**.

A session's **Action items** tab has three views under **Source** in the label filter: **All**, **This meeting** (items captured in this session) and **Brought in** (items from earlier meetings). A brought-in item stays in its own session or project. It is linked, not copied. If you close it here, it shows **Done in this meeting**.

On a brought-in item's menu:

| Action | What it does |
| --- | --- |
| **Open the meeting it came from** | Opens the original session. |
| **Move to this meeting** | Makes it an action item of this meeting. You can keep a link to the original session. |
| **Remove from this meeting** | Takes it off this meeting's list. |
| **Stop carrying over** | Stops bringing it into later meetings. **Carry over again** undoes this. |

An item you moved with its link shows **Moved from** and the original session. Its menu adds **Move back to the meeting it came from** and **Open the meeting it came from**.

If a brought-in item came up in the session, it shows **Mentioned at** and the time. Click it to jump to that moment.

During a live session, brought-in items that come up in conversation are flagged in the **Mentions** view of the knowledge panel. See [Knowledge cards](/knowledge/knowledge-cards#cards-that-light-up-during-a-call).

## Share and export

- [Exports](/sharing/exports) include action items, decisions and open questions under **Outcomes**.
- A [share link](/sharing/share-links) can include the **Action items** part.
- A [note](/chats-and-notes/notes) can embed an action item you can check off.

## Related

- [Projects, topics and keywords settings](/settings/projects-and-topics)
- [Session details](/sessions/session-details)
- [Series](/sessions/series)
- [Scheduling and preparing](/sessions/scheduling-and-preparing)
- [Projects](/knowledge/projects)
