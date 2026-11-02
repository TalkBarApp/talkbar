---
title: Scheduling and preparing
description: Schedule sessions ahead of time with reminders, auto-start and repeats, and prepare notes, documents, knowledge cards and open action items before they start.
navigation:
  icon: i-heroicons-calendar-days
---

Schedule a session to get a reminder before it starts, or have TalkBar start recording on its own. Then prepare for it: write an agenda, attach documents, pick the knowledge cards you want in front of you, and review what's still open from last time. When the session starts, all of it comes with it.

## Upcoming sessions

Open **Sessions → Upcoming** to see your scheduled sessions. The header has **Sessions**, **Series**, **Prepare** and **Schedule session**.

::screenshot{src="/screenshots/sessions/upcoming-sessions-list.png" alt="The Upcoming sessions page in List layout on the Upcoming tab, with rows grouped under Starting soon, Today and Tomorrow, each showing time, title, duration, series, reminder and a Start button" caption="Upcoming sessions"}
::

### Views

- **Upcoming** and **Past** tabs. **Past** shows missed, cancelled and recorded sessions from the last 90 days. Sessions you cancel or skip before their start time are listed last, under **Cancelled or skipped**.
- **List** or **Week** layout. The week view has **Previous week**, **Next week**, **Today** and **Jump to week**, and can switch between **Working hours** and **All hours**. Click a block to start or open it; hover it for **Prepare**, **Edit schedule** and **Start**.
- **Sort** (list only): **Soonest first**, **Latest first** or **Recently changed**.
- **Filters**: series, project, **Start mode** (**Auto-start** or **Reminder**) and **Origin** (**From calendar** or **Scheduled in TalkBar**), plus search.

Set the week start, visible hours, weekends, slot size, default layout, week numbers, default duration and default reminders in **Settings → Calendar sync**. See [Calendar sync](/settings/calendar-sync).

### Statuses

| Status | What it means |
| --- | --- |
| **Planned** | Scheduled and not started yet. |
| **Started** / **Recording** | The session is being recorded. |
| **Completed** | It was recorded. |
| **Not recorded** | Nothing was recorded within 15 minutes of the start time. You can still **Record now**. |
| **Skipped** / **Cancelled** | You skipped or cancelled it. |
| **Moved** | It was rescheduled. |
| **Auto-start** | It will start recording by itself. |

### Row actions

Each row has a **Start** button (**Record now** once it's under way or missed). It opens the New session window with the session's prepared setup, so you can check it before recording. The **⋮** menu offers:

| Action | What it does |
| --- | --- |
| **Edit schedule** | Opens the Schedule window. |
| **Repeat…** | Makes a one-time session repeat. |
| **Add to series…** | Adds it to a [series](/sessions/series). |
| **Prepare** | Opens its prep page. |
| **Reschedule…** | Picks a new date and time. |
| **Open series** | Opens its series. |
| **Skip this one** | For a repeating session: skips this one, and the series continues. |
| **Cancel session** | Cancels it and removes its reminders. This can't be undone. |

For past sessions, the menu offers **Open session** and **Schedule again**. For a prep without a time, it offers **Open prep**, **Start now**, **Schedule…** and **Discard**.

### Events from your calendar

Events from a calendar you connect in [Calendar sync](/settings/calendar-sync) appear in **Upcoming sessions** as scheduled sessions, with a few extras:

- A calendar icon after the title means **From a connected calendar**. The tooltip adds **edited here** once you change the event in TalkBar.
- A **Join** button opens the event's meeting link in your browser, when it has one. The **⋮** menu has the same action as **Join meeting**.
- **Mute** in the **⋮** menu turns off TalkBar's reminders for that meeting, and the row shows **Muted**. **Remind me** turns them back on. See [Muted meetings](/settings/calendar-sync#muted-meetings).

## Schedule a session

Open the Schedule window from:

- **Schedule session** on the Upcoming page;
- **Schedule for later** in the [New session window](/sessions/starting-a-session) or on the recording screen;
- **Schedule follow-up** on a [session's details page](/sessions/session-details);
- the title bar's upcoming menu, or the tray menu.

::screenshot{src="/screenshots/sessions/schedule-window.png" alt="The Schedule for later window showing the title, Project and Series fields, Date, Time start and Time end, the duration pills, the Reminders choices, the Repeats dropdown and the Auto-start recording switch" caption="The Schedule for later window"}
::

The window is titled **Schedule for later**. Its first part, **Schedule**, sets when the session happens:

| Field | What it does |
| --- | --- |
| **Meeting title (optional)** | The session's name. |
| **Project** / **Series** | Where to file it. |
| **Date**, **Time start**, **Time end** | When it runs. Or click **Pick from calendar** to choose a free slot on a week view. |
| Duration | Quick choices from 15 minutes to 3 hours. A scheduled session can't be longer than 3 hours. |
| **Reminders** | One or more reminders: **At start**, 5, 10, 15 or 30 minutes before, 1 hour before or 1 day before. **None** turns them off. |
| **Repeats** | **Does not repeat**, **Daily**, weekly on the chosen day, **Every weekday (Mon–Fri)**, monthly on the same date or weekday, or **Custom…** (see below). |
| **Auto-start recording** | Starts recording by itself after a countdown of 10, 30 or 60 seconds, instead of asking you. Off by default. |

The other parts — **Template**, **Prep & context** and **AI & privacy** — are the same as in the [New session window](/sessions/starting-a-session), so you can set up everything in advance.

The Schedule window uses your computer's time zone. **Custom timezone override (optional)** in **Settings → General** doesn't change it. To schedule in another time zone, use the [**Series schedule**](/sessions/series#schedules-and-occurrences) window, which has its own **Timezone** field.

If the new time overlaps another scheduled session, TalkBar warns you. Click **Schedule anyway** to keep both on the calendar, or **Pick another time**. Only one session can record at a time.

Click **Schedule session** to save, or **Schedule and prepare** to save and open its prep page.

### Repeating sessions

A repeating session always belongs to a [series](/sessions/series). If you didn't pick one, TalkBar creates a series named after the session and tells you.

**Custom…** repeat options:

- **Every** 1 to 52 **days**, **weeks** or **months**.
- For weeks: **On** which weekdays. The scheduled day always stays on.
- For months: a day of the month, or a weekday such as *the second Tuesday*.
- **Ends**: **Never**, **On date**, or **After** a number of sessions.

When you edit a repeating session, **Apply changes to** asks whether the change is for **This session only**, **This and following**, or **All sessions in the series**. To change how it repeats, choose one of the last two.

When you reschedule a repeating session, TalkBar asks whether to move **This session only** or **This and all upcoming**. When you cancel one, you can **Skip this one** and keep the series, or **Cancel all upcoming** to end the series there.

## Reminders and auto-start

### The reminder panel

At reminder time, a panel appears in the bottom-right corner of the TalkBar window, and a desktop notification appears too. The panel shows the template (for example *Meeting reminder*, or **Session reminder**), the session's title, its project and workspace, the time, and how close it is, such as **Starting now**.

| Button | What it does |
| --- | --- |
| **Start** | Starts recording now, with the prepared setup. Unavailable while another session is recording. |
| **Snooze 10m** | Reminds you again in 10 minutes. The arrow next to it offers 5, 10, 15 or 30 minutes, and **Until 5 min before start** while that moment is still ahead. |
| **Skip** | Skips this session. It moves to the **Past** tab, and a series continues with its next session. |
| **Dismiss** (×) | Hides the panel. The session stays scheduled. |

Only one panel shows at a time: the one for the latest meeting. Every session stays listed in **Upcoming sessions**.

### The auto-start countdown

For an **Auto-start** session, the panel shows **Automatic recording** and counts down (**Recording starts in**) for the 10, 30 or 60 seconds you chose. Recording starts when the countdown ends.

- **Start** records right away, and **Skip** skips the session.
- **Snooze** turns this one session back into a reminder. Automatic start stays on for the rest of a series.
- If TalkBar restarts during the countdown, it picks up where it was and says **Countdown resumed after TalkBar restarted**.

Auto-start becomes a normal reminder when:

- another session is already recording;
- TalkBar setup isn't finished;
- desktop notifications are off and TalkBar is in the background;
- on the Free plan, the workspace has reached its session limit.

A session scheduled in another workspace asks you to **Start within** a short time; starting it switches to that workspace.

## Preparing for a session

Open **Sessions → Prepare** to see the sessions you're preparing for.

- **Upcoming** lists scheduled sessions that have prep, plus preps without a time yet. **Past** shows the last 90 days.
- Sort by **Soonest first** or **Recently prepared**. Filter by series, project, or what the prep **Has**: **Action items**, **Notes**, **Documents**, **Knowledge cards** or **Drafts to review**.
- The **Not prepared yet** strip lists upcoming sessions with nothing prepared. Click **Prepare** on one to start.
- **Schedule and prepare** schedules a new session and opens its prep.

You can also prepare a session that isn't scheduled yet: click **Prepare** in the New session window. It appears as **Not scheduled** until you click **Schedule…**.

### The prep page

::screenshot{src="/screenshots/sessions/prep-page.png" alt="A session prep page with the step bar Notes, Action items, Documents, Knowledge cards, a prep note with an agenda, open action items from earlier meetings, one attached document and a few knowledge cards, and the Session setup and Start session buttons in the header" caption="Preparing for a session"}
::

The header shows when the session starts, with **Session setup** (choose the template, audio and other options in advance) and **Start session**. Work through the four steps; each gets a check mark once it has content. Everything saves as you go.

| Step | What you do |
| --- | --- |
| **Prep notes** (the step bar says **Notes**) | Write the agenda, questions and what you want to learn. This note opens with the session when it starts. |
| **Action items** | Review what's still open **From earlier meetings** in the series, and add more with **Add action items**. Each item's menu can **Skip for this meeting**, **Stop carrying over**, **Remove from this meeting** or **Add to prep notes**. |
| **Documents** | **Upload files** or add documents **From the knowledge hub**. Up to 3 documents, such as a brief, a CV or a proposal. Click **Scan for cards** on a document to draft knowledge cards from it. |
| **Knowledge cards** | The facts, numbers, names and questions you want in front of you. Add a **New card**, **Scan for cards** or **Add from knowledge**. Review scan results in **Drafts to review**. |

**Done preparing** takes you back to the Prepare list. **Discard prep** exists only for a prep without a time; it is in the page's menu. To drop a scheduled session, use **Cancel session** in its row menu.

When the session starts, the prep comes with it: the prep note opens in the **Notes** panel, documents and cards are attached, and the action items show in the **Knowledge** panel. Once the session has started, the prep page says **This meeting has started. Its prep is now part of the session.** with a link to the session.

## Related

- [Session series](/sessions/series)
- [Starting a session](/sessions/starting-a-session)
- [Knowledge cards](/knowledge/knowledge-cards)
- [Action items](/knowledge/action-items)
- [Notifications](/sharing/notifications)
