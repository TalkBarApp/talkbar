---
title: Calendar sync
description: Reference for Settings → Calendar sync. Bring meetings from Google, Outlook, Apple or an .ics file into Upcoming sessions and set up the calendar view.
navigation:
  icon: i-heroicons-calendar-days
---

**Settings → Calendar sync**, in the **Connections** group, brings meetings from your calendar into [Upcoming sessions](/sessions/scheduling-and-preparing) and sets how the calendar looks. TalkBar only reads your calendar. It never changes it.

## Calendar

These settings control the Upcoming sessions calendar and what a new scheduled session starts with.

| Setting | What it does | Default |
| --- | --- | --- |
| **Week starts on** | First day of the week in every calendar: **Sunday** or **Monday**. | Sunday |
| **Visible hours** | The hours the week grid opens on. Sessions outside them still show. | 7 AM to 7 PM |
| **Show weekends** | Turn off to show a five-day work week in the grid. | On |
| **Time slot size** | How finely the week grid divides time when you pick a slot: **15 min**, **30 min** or **1 hour**. | 30 min |
| **Default view** | How Upcoming sessions opens: **List** or **Week**. Switching the view on that page updates this setting. | List |
| **Show week numbers** | Shows the ISO week number next to each week in the grid. | Off |
| **Default duration** | Preselected when you schedule a session, from 15 minutes to 3 hours. | 30 min |
| **Default reminders** | Preselected reminders for a new scheduled session. Choose up to 6: **At start**, 5, 10, 15, 30 or 60 minutes before, or **1 day before**. | 10 min before |

## Connected calendars

You can connect more than one calendar. Each one belongs to the current [workspace](/settings/account-and-workspaces).

There are two ways to connect a calendar:

- **Add calendar…** subscribes to a calendar address. TalkBar checks it for changes on its own while it is running.
- **Import .ics file…** imports a calendar file you exported. It stays as it was until you import a newer file. Recurring meetings keep appearing as their dates come into range.

### Find your calendar address

| Calendar | Where to find it |
| --- | --- |
| Google Calendar | Your calendar's settings → **Secret address in iCal format** |
| Outlook | **Settings → Calendar → Shared calendars → Publish**, then copy the ICS link |
| Apple Calendar | Export the calendar to an `.ics` file and use **Import .ics file…** |
| Other calendars | Any address that starts with `https://`, `http://`, `webcal://` or `webcals://` and returns an iCalendar feed |

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
A secret calendar address lets anyone who has it read your calendar. Don't share it. If it leaks, reset it in your calendar's settings and paste the new one with **Edit…**.
::

### Calendar options

| Field | What it does | Default |
| --- | --- | --- |
| **Name** | The name shown in the list, such as *Work calendar*. | The file's name for an import; empty for a subscription |
| **Subscription URL** | The calendar address. Subscriptions only. | — |
| **Check for changes** | How often TalkBar checks the address: every 15 or 30 minutes, every 1 or 3 hours, or once a day. Subscriptions only. | Every 15 min |
| **Remind me about** | Which meetings get reminders: **Meetings with a video link**, **All meetings**, or **None — just show them**. See [Muted meetings](#muted-meetings). | Meetings with a video link |
| **Your calendar email (optional)** | Used to skip meetings you declined. Leave it empty to skip only free time. | Empty |
| **Reminders for imported sessions** | Reminders each imported session starts with: **At start**, or 5, 10, 15, 30 or 60 minutes before. | 10 min before |

## What gets imported

TalkBar imports timed events from 7 days back to 90 days ahead. Each one becomes a scheduled session with its title, start time, duration, time zone, location, description and meeting link. A recurring meeting becomes one session for each date.

These events are not imported:

- All-day events and events with no start time
- Events your calendar marks as free time
- Meetings you declined, if you entered **Your calendar email (optional)**

A calendar larger than 4 MB is refused.

Imported sessions work like any other [scheduled session](/sessions/scheduling-and-preparing): you can prepare them, and start recording from them. If a meeting has a link, its **Join** button opens the link in your browser. Joining doesn't start a session.

## When the calendar changes

TalkBar syncs a subscription right after you add or edit it, and then on its **Check for changes** schedule.

- If a meeting's time, duration or title changes, the session is updated.
- If a meeting is deleted or cancelled, the session is cancelled along with its reminders.
- Sessions that have started, finished or been skipped are left alone.
- Your preparation, reminders and start mode are never overwritten.
- If you moved or renamed an imported session, it keeps your time and title. It is still cancelled if the meeting is cancelled.

If a calendar suddenly returns no events, TalkBar keeps the sessions it already has and tells you, instead of cancelling them.

## Muted meetings

A meeting that **Remind me about** doesn't cover is muted. It stays on the calendar, dimmed, but it gets no reminders, never starts automatically and doesn't appear in the Home **Up next** card. It doesn't count as **Not recorded** when its time passes, and it is hidden from the **Past** tab unless you filter by **From calendar**.

To change one meeting, use **Mute** or **Remind me** on its row. Your choice wins over the rule and survives later syncs and rule changes.

## Manage a calendar

Each row shows when the calendar last synced and which meetings it reminds you about. Its menu has these actions:

| Action | What it does |
| --- | --- |
| **Sync now** | Syncs the calendar right away. |
| **Import a newer file…** | Replaces an imported file and syncs. Imported files only. |
| **Edit…** | Changes the calendar's options. |
| **Pause syncing** / **Resume syncing** | Stops or restarts syncing. A paused calendar shows **Paused**. |
| **Remove calendar** | After you confirm, removes the calendar and cancels the upcoming sessions it imported. Sessions you already recorded stay. |

If a sync has a problem, the row shows **Last sync failed** with the reason. Events TalkBar couldn't read are listed in a message after the sync, and the rest are still imported.

::callout{icon="i-heroicons-information-circle" color="gray"}
If your organization manages TalkBar, it can turn off calendar subscriptions. Importing `.ics` files stays available. See [Admin policy](/settings/admin-policy).
::

## Related

- [Scheduling and preparing](/sessions/scheduling-and-preparing)
- [Session series](/sessions/series)
- [Privacy and your data](/data/privacy-and-your-data)
- [Settings overview](/settings/overview)
