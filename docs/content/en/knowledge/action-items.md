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

Click the status circle on a task, follow-up or question to mark it done or answered. Click it again to reopen it.

### Custom labels

Besides **Task**, **Follow-up**, **Question** and **Decision**, TalkBar includes ready-made labels you can turn on: Idea, Risk, Blocker, Commitment, Request, Waiting on, Delegated, Parking lot, Research, Agreement and Trade-off. You can also create your own, with a name, icon and color, for the whole workspace or for one project.

Manage labels in **Settings → Topics & Keywords → Action Items**. See [Projects, topics and keywords settings](/settings/projects-and-topics#action-items).

## Where action items come from

- **AI summaries.** When AI writes a session's summary, it captures tasks as action items, questions as open questions and decisions as decisions.
- **You flag text.** Select text in a session's transcript or summary and set it as an action item.
- **You add one.** Click **Add item** on a session's **Action items** tab, on a project's **Action items** tab, or in **Knowledge → Action items**.
- **During a live session.** Use **Add** → **New action item** in the live knowledge panel, or **Convert to task** on a knowledge card.

Each item captured from a session keeps its **Evidence**: the quotes from the summary or transcript it came from. Open the item to see them, and use **Open in session** to go to the session.

## Owners and due dates

Open an item and click **Edit** to change it.

| Field | What it does |
| --- | --- |
| **Type** | The label. |
| Title | **What needs to happen?** |
| **Status** | Open, done, answered, active or superseded, depending on the kind. |
| **Responsible people** | Who owns the item. **Assign people…** picks from your [people](/knowledge/people-and-companies). |
| **Due date** and **Time** | When the item is due. Tasks and follow-ups only. |
| **Details** | Context, links, or what done looks like. |
| **Answer** | For questions: the answer, once you have it. |

::screenshot{src="/screenshots/knowledge/action-item-editor.png" alt="Edit Action item dialog for a task, showing the Type label picker, the title field, Status, Responsible people with one person assigned, Due date with a date picked, and Details" caption="Editing an action item"}
::

## The Action items page

**Knowledge → Action items** lists action items, decisions and questions from every session and project. The scope switcher at the top right of Knowledge narrows the list to one project, one series, or **General**. **General** holds items with no session and no project, such as items kept after their session was permanently deleted.

Each item shows where it belongs: a project, a session or General.

| Control | What it does |
| --- | --- |
| **Table** / **Board** | Shows items as a table, or as columns on a board. On the board, **Group columns** **By behavior** or **By label**. |
| **Filters** → **Status** | **All statuses**, **Open** or **Resolved**. |
| Label filter | Shows one or more labels. |
| **Belongs to** | Shows items from one project or session. |
| **Search Action items…** | Finds items by title, details, answer, session, label or responsible people. |
| **Sort** | **Board order**, **Recently updated**, **Created**, **Due date** or **Alphabetical**. |

In General or a project, drag items to set their order (**Board order**).

::screenshot{src="/screenshots/knowledge/action-items-board.png" alt="Knowledge → Action items in Board view grouped by behavior, with Task, Follow-up, Question and Decision columns and several item cards showing their project or session" caption="Action items as a board"}
::

The same list appears on each session's **Action items** tab and each project's **Action items** tab, limited to that session or project. A project's tab includes items from all of its sessions.

## Carry items to the next meeting

Open items don't get lost between meetings. For a [session series](/sessions/series), items left open in earlier meetings show up in the next meeting, together with the ones you flag during it. A meeting can have up to 24 items brought in.

You can also bring items in yourself:

- While you [prepare a scheduled session](/sessions/scheduling-and-preparing), review the **Action items** step and add or skip items.
- On a session's **Action items** tab, click **Add existing action item**. Choose **Where to look**: **This series**, **This project**, **With these people** or **All open**.

A session's **Action items** tab has three views: **All**, **This meeting** (items captured in this session) and **Brought in** (items from earlier meetings). A brought-in item stays in its own session or project. It is linked, not copied.

On a brought-in item's menu:

| Action | What it does |
| --- | --- |
| **Open the meeting it came from** | Opens the original session. |
| **Move to this meeting** | Makes it an action item of this meeting. You can keep a link to the original session. |
| **Remove from this meeting** | Takes it off this meeting's list. |
| **Stop carrying over** | Stops bringing it into later meetings. **Carry over again** undoes this. |

During a live session, brought-in items that come up in conversation are flagged in the **Mentions** view of the knowledge panel. See [Knowledge cards](/knowledge/knowledge-cards#cards-that-light-up-during-a-call).

## Related

- [Projects, topics and keywords settings](/settings/projects-and-topics)
- [Session details](/sessions/session-details)
- [Series](/sessions/series)
- [Scheduling and preparing](/sessions/scheduling-and-preparing)
- [Projects](/knowledge/projects)
