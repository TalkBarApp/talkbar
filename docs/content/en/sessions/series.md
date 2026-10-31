---
title: Session series
description: Group recurring meetings and related sessions into a series, with a shared schedule, default setup, open action items and history.
navigation:
  icon: i-heroicons-arrow-path
---

A **session series** groups related sessions, such as a weekly 1:1, a team standup, a client engagement or a podcast. A series keeps its sessions, schedule and default setup together, and carries open action items from one session to the next. Repeating is optional: a series can also just collect related sessions.

## The Series page

Open **Sessions → Series** to see every series in the workspace.

::screenshot{src="/screenshots/sessions/series-list.png" alt="The Series page in Cards view on the Active tab, showing several series cards with their type icon, name, session count, schedule and next meeting" caption="The Series page"}
::

- **Active** and **Archived** tabs.
- Sort by **Next meeting** (the default), **Recent activity**, **Most sessions** or **Name**.
- Switch between **List view** and **Cards view**.
- Filter by type or project, or search by name.
- **Select series** lets you merge, archive or delete several series at once.

Each series' menu offers **Edit series**, **Open series**, **Start next session**, **Merge into…**, **Archive** (or **Restore**) and **Delete series**.

## Create a series

There are several ways to create a series:

- Click **New series** on the Series page. Enter a **Series name**, and optionally a **Series type**, **Project** and **Description (optional)**.
- Choose **New series…** in the **Series** field of the [New session window](/sessions/starting-a-session) or the Schedule window.
- Schedule a session that repeats. If you don't pick a series, TalkBar creates one named after the session.
- Click **Record follow-up** on a completed session that isn't in a series. TalkBar creates a series named after it, adds the original session, and starts recording the follow-up in it.

### Series types

A type labels what a series is for and gives it an icon. TalkBar has many built-in types, such as *One-on-one*, *Standup*, *Team meeting*, *Client meeting*, *Sales call*, *Interview*, *Lecture*, *Podcast* and *Other*.

Click **Series types** on the Series page to add your own (under **Your types**), rename them or change their icon. Deleting a type you created doesn't affect its series; they show the type *Other*.

## The series page

Open a series to see everything about it.

::screenshot{src="/screenshots/sessions/series-page.png" alt="A series page for a weekly team meeting: header with type, name, session count and schedule, the Start next session button, the Upcoming list with five planned meetings, the Sessions list, Open action items, and the right column with Series type, Project, Schedule and New sessions start with" caption="A series page"}
::

| Part | What it shows |
| --- | --- |
| Header | The type, name (click to rename), session count, schedule and description. |
| **Start next session** | Opens the New session window for the series, set up for its next planned session if there is one. Unavailable for an archived series. |
| **Upcoming** | The next planned sessions. **Show all** lists the rest. Each row has the same actions as in [Upcoming sessions](/sessions/scheduling-and-preparing#row-actions): move, skip, cancel, prepare. |
| **Sessions** | The sessions recorded in the series so far. |
| **Open action items** | Action items still open across the whole series. |
| **Series type** and **Project** | What the series is for, and the project it belongs to. |
| **Schedule** | How the series repeats and when the next session is. |
| **New sessions start with** | The template new sessions in the series use. |

The menu at the top has **Edit series**, **Edit schedule** (or **Add a schedule**), **Export**, **Merge into…**, **Archive** or **Restore**, and **Delete series**.

## Schedules and occurrences

A series can have one schedule, either **One time** or **Recurring**. Each planned session it creates is an occurrence: it appears in **Upcoming sessions**, gets reminders, and can auto-start. When you record it, the recording becomes a session in the series.

Click **Add a schedule** or **Edit schedule** to open **Series schedule**:

| Field | What it does |
| --- | --- |
| **Repeat** | **One time** or **Recurring**. |
| **Date**, **Time**, **Timezone** | When the first session starts. |
| **Duration** | How long each session runs. |
| **Frequency**, **Every**, **On days** | How often it repeats: daily, weekly on chosen days, or monthly. |
| **Ends** | **Never**, **On date**, or after a number of sessions. |
| **Reminders** and **Auto-start recording** | The same choices as when [scheduling a session](/sessions/scheduling-and-preparing#schedule-a-session). |
| **Enable schedule and reminders** | Turn off to pause the schedule without deleting it. |

When you change the schedule, **Apply changes to** lets you choose the **Entire schedule** or **This and following**, starting with a date you pick.

To skip or move one session, use its row in **Upcoming**. To end a repeating series early, cancel an upcoming session and choose **Cancel all upcoming**.

## Series defaults

New sessions in a series start with the series' defaults: template, audio, speakers, context (including attached documents and knowledge cards) and AI choices. Some series types suggest a template, which is used until you save defaults for the series. To set them, start a session in the series. In the New session window, under **Project and Series → Defaults**:

- **Save current setup as defaults** saves the window's current choices for the series.
- **Copy latest** copies the setup of the series' most recent session.
- **Copy from a past session…** copies the setup of a session you pick.

## Add or move sessions

- In the [Sessions list](/sessions/overview#row-actions), a session's menu has **Add to series…**, **Move to series…** and **Remove from series**.
- On a [session's details page](/sessions/session-details), the **Series** panel has **Add to series**, **Change series…** and **Remove from series**.

Sessions created by a repeating schedule stay in their series.

## Archive, merge and delete

| Action | What happens |
| --- | --- |
| **Archive** | The sessions stay as they are. Planned sessions are hidden from the calendar, and their reminders and automatic starts stop. The series becomes read-only until you **Restore** it from the menu. |
| **Merge into…** | Moves the sessions and past meetings into the series you choose, which keeps its own schedule, type and defaults. Future planned sessions of the merged series are deleted, then it is removed. |
| **Delete series** | The sessions stay and leave the series. Its schedule and future planned sessions are deleted. |

Archived series are listed under the **Archived** tab.

## Related

- [Scheduling and preparing](/sessions/scheduling-and-preparing)
- [Starting a session](/sessions/starting-a-session)
- [Action items](/knowledge/action-items)
- [Projects](/knowledge/projects)
