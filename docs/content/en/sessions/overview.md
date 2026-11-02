---
title: Sessions overview
description: What a TalkBar session is, how the Sessions list works, what each session status means, and how many sessions your plan can keep.
navigation:
  icon: i-heroicons-queue-list
---

A **session** is one recorded meeting, call or conversation. TalkBar records the audio, writes a transcript by speaker while people talk, keeps a running timeline, and writes a summary when the session ends. Your sessions are stored on your computer; only the AI providers and channels you choose to set up receive any of it.

New to recording? Start with [Your first session](/getting-started/first-session).

## What a session contains

| Part | What it is |
| --- | --- |
| Transcript | What was said, split by speaker, with times. |
| Timeline | Short AI notes written while you record, every 10 seconds by default. |
| Summary | The final write-up, organized into the sections of the session's [template](/sessions/templates-and-skills). |
| Notes | Your own rich-text note for the session. |
| Action items | Tasks, follow-ups, questions and decisions from the session. |
| Documents | Files you attached for reference. |
| Knowledge | [Knowledge cards](/knowledge/knowledge-cards) attached to the session or that came up in it. |
| Audio | The recording itself, unless you delete it. |

## The Sessions list

Open **Sessions** from the sidebar. The page lists every session in the current workspace.

::screenshot{src="/screenshots/sessions/sessions-list.png" alt="The Sessions page in the All sessions view, with the Up next strip at the top, the All sessions / Pinned / Trash tabs, the Sort and filter buttons, and a few session rows grouped under Today and Yesterday" caption="The Sessions list"}
::

The header has buttons for the other session pages, plus the primary action:

- **Upcoming** opens your calendar of scheduled sessions. See [Scheduling and preparing](/sessions/scheduling-and-preparing).
- **Series** opens your [session series](/sessions/series).
- **Prepare** lists the sessions you are preparing for.
- **Start session** opens the New session window. See [Starting a session](/sessions/starting-a-session).

Below the header, the **Up next** strip shows your scheduled sessions for the coming week. A session that starts within a few minutes gets a **Start** button.

### Views

| View | What it shows |
| --- | --- |
| **All sessions** | Every session that is not in Trash. |
| **Pinned** | Only the sessions you pinned. |
| **Trash** | Sessions you moved to Trash. |

In **All sessions**, the list is grouped:

- the session that is recording now, at the top;
- **Continue where you left off**: sessions you stopped but have not completed yet;
- **Pinned**, when **Pinned on top** is turned on;
- then one group per day (**Today**, **Yesterday**, then dates).

### Sort, filter and search

- **Sort**: **Session date** (the default), **Recently updated** or **Title**. **Reset** goes back to the default.
- Filters: **Filter by series**, **Filter by project**, **Filter by topic** and **Filter by keyword**. Active filters show as chips above the list; click a chip's **×** to remove it, or **Clear filters** to remove them all.
- **Search** matches words in the session title, project, series, keywords and speaker names. Every word you type must match. When a match comes from something the row doesn't show, the row says where, for example **With** a speaker's name.

::callout{icon="i-heroicons-light-bulb" color="primary"}
To search inside transcripts, summaries and notes across all your sessions, use the search in the title bar or ask [Ask TalkBar](/chats-and-notes/ask-talkbar).
::

### Row actions

Click a row to open the session. The **⋮** menu on each row offers:

| Action | Notes |
| --- | --- |
| **Share** | Completed sessions only. See [Share links](/sharing/share-links). |
| **Export session** | Completed sessions only. See [Exports](/sharing/exports). |
| **Open** | Opens the session. |
| **Pin** / **Unpin** | Pinned sessions appear in the **Pinned** view. |
| **Add to series…** / **Move to series…** | Puts the session in a [series](/sessions/series). |
| **Remove from series** | Shown when the session is in a series. |
| **Move to Trash** | Not available while the session is recording. |

Sessions that are stopped but not completed show **Continue** and **Complete** buttons right on the row.

## Session statuses

A session moves through a few states. The list shows a badge for each state except Completed.

| Badge | What it means |
| --- | --- |
| **Recording** | The session is recording now. Only one session can record at a time. |
| **PAUSED** | Recording is paused. Nothing is captured until you resume. |
| **On hold** | Every audio stream is muted or unavailable, so nothing is being captured. |
| **Importing** | TalkBar is building the session from an [audio file](/sessions/importing-recordings). |
| **In progress** | You stopped recording but have not completed the session. You can still **Continue** recording into it. |
| **Interrupted** | Recording stopped unexpectedly, for example when TalkBar or your computer shut down. See [Interrupted sessions](/sessions/recording#interrupted-sessions). |
| *(no badge)* | **Completed.** The session is finished and opens on its [details page](/sessions/session-details). |

When you click **Stop**, the session becomes **In progress**: TalkBar writes the summary, and you can still record more into the same session. When you click **Complete session**, it is finished for good. A completed session can't be reopened, but you can record a linked **follow-up**. See [After you stop](/sessions/recording#after-you-stop).

## Pinned sessions

Pin a session from its row menu to keep it at hand. Turn on **Pinned on top** in **All sessions** to list pinned sessions above the rest, or switch to the **Pinned** view to see only them. Pinned sessions are never moved to Trash by automatic session retention.

## Trash

**Move to Trash** asks you to confirm, then moves the session to **Trash**. You can restore it from there.

In the **Trash** view:

- **Restore** puts the session back in your list.
- **Delete** removes one session for good, after you confirm.
- **Empty Trash** permanently deletes every session in Trash.

Permanent deletion removes the transcript, audio, session files and session-only data. It keeps the session's knowledge cards, action items and drafts to review; they just lose their link to the session.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Permanent deletion can't be undone.
::

Two settings in **Settings → General** handle this for you:

| Setting | What it does | Default |
| --- | --- | --- |
| **Trash cleanup** → **Automatically empty Trash** | Permanently deletes sessions and notes that have been in Trash longer than **Keep Trash items for**. | On, 30 days |
| **Session retention** → **Automatically move old sessions to Trash** | Moves sessions to Trash by count (**Keep at most**) or age (**Move sessions older than**). Pinned sessions and active recordings are never moved. Runs for each workspace when TalkBar starts. | Off |

## Plan limits

On the **Free** plan:

- A workspace can hold up to **20 sessions**; TalkBar starts warning you at 15. Sessions in Trash don't count, so moving an old session to Trash frees a slot. When you reach the limit, you can't record or import a new session, but your existing sessions stay fully available.
- Each session can record up to **30 minutes**. TalkBar warns you before the limit, then stops the recording and saves the session with its summary.

Paid plans have no limit on stored sessions or recording length. See [Plans and license](/data/plans-and-license).

## Related

- [Starting a session](/sessions/starting-a-session)
- [Recording a session](/sessions/recording)
- [Session details](/sessions/session-details)
- [Importing recordings](/sessions/importing-recordings)
- [Scheduling and preparing](/sessions/scheduling-and-preparing)
