---
title: Recording a session
description: The live recording screen and its panels, pausing and stopping, what happens after you stop, and how TalkBar recovers an interrupted recording.
navigation:
  icon: i-heroicons-microphone
---

Keyboard shortcuts shown below are Windows defaults. On macOS, check the shortcut shown in TalkBar or its settings; configurable shortcuts can be changed there.

When you click **Start session**, TalkBar opens the recording screen. The transcript appears by speaker as people talk, the timeline adds short AI notes every few minutes, and you can take notes, mark moments and ask questions while you record.

## Before the transcript starts

When you start, TalkBar first asks you to let people know they are being recorded. The **Recording — let everyone know** notice reminds you that telling everyone present, and getting their consent where the law requires it, is your responsibility. Click **Got it** to continue.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
**Do not show this again** asks you to confirm that you understand your obligations. Turning the reminder off hides the notice; it doesn't change those obligations. You can turn it back on in **Settings → General → Session defaults**.
::

The screen then shows **Getting audio ready…** and **Waiting for someone to speak** until the first words arrive. If it says **No audio detected yet — check your microphone or audio source.**, check your microphone or audio source in [Voice settings](/settings/voice).

## The recording screen

::screenshot{src="/screenshots/sessions/recording-screen.png" alt="The recording screen during a live session: title and controls (audio levels, timer, Pause, Stop) at the top, the speaker chips row below with Ask AI, search, Layout and Sidebar buttons, the Transcript panel on the left and the Timeline and Knowledge panels on the right" caption="The recording screen with the default Side panel layout"}
::

### Header

| Element | What it does |
| --- | --- |
| **Title** | Starts as **Untitled session**. TalkBar suggests a title once enough has been said. Click the title to rename it, or click the sparkle button (**Generate title with AI**) to suggest one now. |
| **Audio capture** | Shows live input levels for the microphone and system audio. Click it to see each stream's state (**Active**, **Starting**, **Retrying**, **Unavailable**, **Disabled**, **Muted**), **Mute microphone**, and turn on **Enhanced audio processing** (noise suppression, gain control and echo cancellation) or **Auto level balance** (evens out quiet and loud sources). |
| **Timer** | The recorded time. It stops while the session is paused. |
| Pause (**Pause recording**) | Pauses recording. Becomes available once the transcript starts. |
| **Stop** | Ends the recording. See [After you stop](#after-you-stop). |

A shield icon next to the title means this is a **Private session**: its AI runs on local models only.

### Speakers and tools

Below the header, each voice TalkBar hears gets a **speaker chip**. Click a chip to rename the speaker, mark **This is me**, set a label, combine two speakers who are the same person, or **Ignore speaker** to hide their lines and keep their text out of AI. Names you give carry into the transcript and summary. See [Speakers](/voice/speakers).

On the right of the same row:

| Tool | What it does |
| --- | --- |
| **Ask AI** | Opens a chat about what has been said so far. Off when the session's privacy mode is **Sensitive**. See [Ask TalkBar](/chats-and-notes/ask-talkbar). |
| **Search** | Finds words in this session. |
| **Topics and source** | Tags the session with topics and records where it comes from. |
| **Layout** | Chooses how the panels are arranged. See [Layouts](#layouts). |
| **Sidebar** | Shows or hides the side panel. |

## Panels

The recording screen has five panels. By default, the main panel shows **Transcript** and **Notes** as tabs, and the side panel shows **Timeline** and **Knowledge**. **Documents** is hidden until you show it from **Layout**.

### Transcript

Live speech, split by speaker. New lines appear at the bottom; click **Jump to latest** if you scrolled up. The panel's menus let you:

- open the **Action items** and **Bookmarks** menus for this session;
- change the order (**Oldest first** or **Newest first**) and how the transcript looks;
- choose **Original**, **Both** or **Translation** when [live translation](/voice/live-translation) is on.

Right-click a line, or select text in it, to **Set Action item**, **Add bookmark**, **Add to note** or copy it. The **Speaker** options on a line let you move it to another speaker with **Assign to…**.

### Notes

Your own rich-text note for the session, saved as you type (**Saving…**, **Saved**). Notes are pinned to the timeline, so you can see when you wrote them. The panel menu offers **Dictate**, **Ask AI**, **Expand notes**, and **View** options such as **Show toolbar** and **Bubble menu**.

If you prepared the session, your prep notes open here. See [Notes](/chats-and-notes/notes).

### Timeline

The AI summary while you record: short notes added every few minutes once people talk. Each entry links back to the transcript (**Show in transcript**). The panel menu sets the order, bullet style, the **Timeline language** and the AI model used for the timeline. It also has **Action items** and **Bookmarks** menus.

If the timeline can't be written for a while, TalkBar shows **Live summary is temporarily unavailable** and keeps trying. Your transcript keeps recording.

### Knowledge

Knowledge cards, mentions and action items for the session, in three tabs:

| Tab | What it shows |
| --- | --- |
| **Mentions** | Cards and action items that came up in the conversation, with the time they were heard. Mark one **Not relevant** to stop flagging it in this session. |
| **Cards** | The session's knowledge deck: cards you attached, and relevant cards TalkBar recalls as you talk (unless the privacy mode turns this off). Cards you attached light up when they are mentioned. |
| **Action items** | Open items brought in from earlier sessions or prep, and items you add now. Mark them done as you go. |

Use **Add** in the panel header for a **New card**, **Add from knowledge**, a **New action item** or **Add existing action item**. A card's menu can pin it, **Convert to task**, **Add to note**, confirm it is **Still true**, or **Remove from session** (the card stays in your knowledge). See [Knowledge cards](/knowledge/knowledge-cards) and [Action items](/knowledge/action-items).

### Documents

Reference files attached to the session, for reading while you talk. See [Documents](/knowledge/documents).

### Bookmarks and action items

Mark important moments while you record:

- Select text in the transcript or timeline and choose **Add bookmark**. A bookmark can have a title, a comment and a color.
- Choose **Set Action item** to flag a line as a task, decision or another action item label.
- Open the **Bookmarks** menu in a panel header to see every bookmark and jump to it.

### Layouts

Click **Layout** to arrange the panels:

| Layout | Arrangement |
| --- | --- |
| **Side panel** | Transcript and notes in the main panel; timeline and knowledge on the side. The default. |
| **Grid** | Transcript above notes; timeline and knowledge on the side. |
| **Tabs in main panel** | Transcript, notes and timeline as tabs in the main panel. |
| **Split main panel** | Transcript and notes on top, timeline below. |

**Place each view** lets you show, hide and move each panel, and drag to reorder tabs. **Manage custom layouts…** saves your arrangement under a name (up to 8 layouts). **Rounded** and **Flat** change the panel style. You can also set these in **Settings → General → Live Session Appearance**.

**Focus mode** hides the app sidebar and the panel headers so only the session content shows. Turn it on with **Focus** in the **Layout** menu or the **Focus mode** button in the title bar. Hover a panel to see its header; press `Esc` to exit.

## Pause and breaks

Click the pause button (**Pause recording**) to stop capturing for a while, for example during a private side conversation. While paused, nothing is recorded or transcribed, and the timer stops. Click **Resume** to continue. The transcript shows the gap, such as **Paused for 5 min**.

TalkBar can also pause and stop on its own. In **Settings → Voice → Recording → Session end**:

| Setting | What it does | Default |
| --- | --- | --- |
| **Auto-pause** | Pauses the session after a stretch of silence and resumes when someone speaks. Choose **Off**, 10, 15 or 30 seconds. | 10 seconds |
| **Auto-stop** | Completes an auto-paused session after you have been away from TalkBar this long. Needs Auto-pause. Choose **Off**, 2, 3, 5 or 10 minutes. | 3 minutes |
| **Notify before a session auto-ends** | Shows a desktop notification when an unattended session is about to auto-stop. | On |

Before an auto-stop, a **Session inactive** banner counts down (**Auto ending the session in**). Click **Continue** to keep recording, **Stop Session** to stop now, or **Ignore for this session** to turn auto-stop off for this session.

## The session bar

The session bar is a small always-on-top window, so you can keep an eye on a recording while you work in other apps. Press `Ctrl+Alt+B` to show or hide it.

While a session records, the bar shows the latest transcript lines and lets you:

- pause and resume transcription;
- mute and unmute the microphone;
- switch the translation view, when live translation is on;
- **Stop session**;
- open the main TalkBar window.

Hiding the bar doesn't stop the recording. On the Free plan, the bar also shows when the recording will stop at the plan limit.

::screenshot{src="/screenshots/sessions/session-bar-live.png" alt="The session bar during a recording, showing the last transcript lines by speaker, the pause and microphone mute buttons and Stop session" caption="The session bar while recording"}
::

## After you stop

When you click **Stop**, the recording ends and the session is **In progress**: it is saved, but not completed. TalkBar now:

1. saves the full transcript and the audio;
2. writes the summary, organized into the template's sections, in the **Summary** panel (**Summary — in progress**);
3. suggests a title, if you haven't renamed the session.

The header shows when the session ended and its total length, plus these actions:

| Action | What it does |
| --- | --- |
| **Continue session** | Records more into the same session. The transcript marks the break, and earlier text, notes and audio stay as they are. |
| **Complete session** | Finishes the session and opens its [details page](/sessions/session-details). Wait for the summary to finish, or cancel it, first. |
| **New session** | Starts a new session that isn't linked to this one. Its menu also offers **Follow-up** (record a linked follow-up of this session), **Schedule for later**, and **Share session** (after you complete it). |

The **Summary** panel's **AI** menu lets you change the summary language, length or model, and **Regenerate summary**. See [Session details](/sessions/session-details#summary).

When you complete the session, TalkBar fills in the summary if it is still missing. If **Auto-scan finished sessions** is on, it also scans the session for knowledge cards for you to review. See [Review and scans](/knowledge/review-and-scans).

::callout{icon="i-heroicons-information-circle" color="gray"}
A completed session can't be reopened for recording. To keep talking about the same subject, use **Follow-up**. It starts a new session in the same [series](/sessions/series), and creates a series if there isn't one.
::

### Very short sessions

If almost nothing was recorded (under a minute, or only a few words), TalkBar doesn't write a summary right away. It asks **Keep this short session?** or **Nothing was recorded**:

- **Keep session** keeps it. The dialog tells you whether keeping it also writes a summary or keeps it as a transcript only.
- **Move to Trash** moves it to Trash. This is the default: it happens on its own after about 15 seconds. Pointing at the button pauses the countdown.

After an automatic move to Trash, click **Undo** in the notification to bring the session back.

### Plan limit

On the Free plan, a session can record up to 30 minutes. TalkBar warns you 5 minutes before the limit and counts down the last minute. At the limit, it stops the recording and saves the session with its summary. You can't continue that session, but you can complete it to keep it. See [Plan limits](/sessions/overview#plan-limits).

## Interrupted sessions

If a recording stops unexpectedly, for example when TalkBar closes or your computer restarts, everything transcribed so far is kept. The next time you open TalkBar, it shows **Recording interrupted** with the session title, when it started and how many transcript segments were saved.

| Choice | What it does |
| --- | --- |
| **Continue** | Keeps recording into the same session. |
| **Complete** | Closes the session and writes the summary. |
| **More** → **Stop for now** | Saves what was recorded so you can continue later. |
| **More** → **Decide later** | Keeps the session interrupted for now. |

An interrupted session shows **Interrupted** in the Sessions list. Open it to see **Continue session**, **Complete session** and **Review** in its header.

Two other notices can appear:

- **Session audio still needs to be saved** — the transcript and summary are safe, but saving the audio failed. Click **Retry saving audio**.
- **Leftover recording data** (on the Sessions page) — recordings that were cut off before a session could be created. They can't be opened; click **Discard** to free up space.

## Related

- [Starting a session](/sessions/starting-a-session)
- [Session details](/sessions/session-details)
- [Recording and transcription](/voice/recording-and-transcription)
- [Speakers](/voice/speakers)
- [Live translation](/voice/live-translation)
