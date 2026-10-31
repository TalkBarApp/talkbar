---
title: Starting a session
description: Open the New session window and choose the template, audio, speakers, AI model, project, context, summary language and privacy for a recording.
navigation:
  icon: i-heroicons-play-circle
---

Every recording starts in the **New session** window. You pick what kind of session it is, where the audio comes from and how many people will talk, then click **Start session**. Everything else is optional and has sensible defaults.

## Ways to start

- Click **New session** in the title bar.
- Click **Start session** on the **Sessions** page or on Home.
- Click **Start** on a scheduled session in **Upcoming sessions**. The window opens with that session's prepared setup. (**Start** in a reminder, or on a session about to begin in the **Up next** strip, starts recording right away.) See [Scheduling and preparing](/sessions/scheduling-and-preparing).
- Use the **session bar** (see [below](#the-session-bar)).

::callout{icon="i-heroicons-information-circle" color="gray"}
Only one session can record at a time. If another session is recording, the window shows **Recording in progress** with **Open live session**. Stop that session first, or click **Schedule for later**.
::

## The New session window

The window has four parts. Use the step bar at the top to jump between them. **Template** is always open; the other three expand when you click them.

::screenshot{src="/screenshots/sessions/new-session-window.png" alt="The New session window with the Template part showing template cards, the Sections line, the Audio, Speakers, Speakers at start and Intelligence rows, and the footer with Start session, Prepare, Schedule for later and Cancel" caption="The New session window"}
::

### Template

| Option | What it does |
| --- | --- |
| **Template cards** | A [session template](/sessions/templates-and-skills) is a type of session, such as *Meeting*, *1:1*, *Interview* or *Voice Note*. It sets the summary sections, AI instructions and default audio and speaker settings. Pinned templates come first. Click **More…** to search every enabled template by category, or **Manage templates…** to open template settings. |
| **Sections** | The summary sections this template writes. Click **Customize** to switch sections on or off, or **Add section** to borrow a section from another template. These changes apply to this session only. Click **Done** when finished. |
| **Audio** | **Microphone** (your voice), **System audio** (the sound your computer plays, such as the other side of a call) or **Mic + System** (both). |
| **Upload audio file** | Builds the session from an existing recording instead. See [Importing recordings](/sessions/importing-recordings). |
| **Speakers** | How many people you expect: **Just you**, **You + 1**, **Small (2–4)** or **Large (5–8)**. This helps TalkBar tell voices apart. |
| **Speakers at start** | The expected voices as slots, starting with **You**. Use the buttons next to it to add or remove slots. Click a slot to type a name, or type `@` to pick a saved person. New voices fill free slots in order; you can rename or combine speakers later. |
| **Intelligence** | Which AI writes the timeline and summary. **Default** uses your configured model; open its menu to pick another model for this session. **Private AI** runs the session on built-in local models only (see below). |
| **Topics** and **Source** | Tag the session with [topics](/knowledge/topics-and-keywords), and note where it comes from, such as a video or meeting link. |

If you change **Audio** or **Speakers** away from what the template suggests, **Reset to template default** puts them back.

::callout{icon="i-heroicons-light-bulb" color="primary"}
For **Large (5–8)**, TalkBar needs a larger speaker model. If it isn't downloaded, the window says so and offers **Download**. Without it, TalkBar separates up to 4 speakers. See [Speakers](/voice/speakers).
::

#### Private AI for one session

Choose **Private AI** in **Intelligence** to keep this session's AI on your computer. The window title then reads **This session will run on Private AI**, and the recording screen shows a shield icon. The setting is permanent for that session: its summaries are always written by built-in local models.

**Private AI** needs a downloaded built-in local model. If you don't have one, add it in **Settings → Private Local AI**. See [Private AI Mode](/ai/private-ai-mode) and [Local models](/ai/local-models).

### Project and Series

| Option | What it does |
| --- | --- |
| **Project** | Files the session under a [project](/knowledge/projects). Choose **New project…** to create one. |
| **Series** | Adds the session to a [session series](/sessions/series). Choose **New series…** to create one. |
| **Defaults** | Appears once you pick a series. **Save current setup as defaults** makes this window's choices the starting point for the series' next sessions. **Copy latest** and **Copy from a past session…** copy the setup of a session already in the series. |

### Prep & context

Attach what the AI should know about during the session. You can read these items while you record, and they help with recall and summaries.

| Option | What it does |
| --- | --- |
| **People** | **Add people** from your contacts. They are attached to the session for context. |
| **Knowledge deck** | **Add cards** from your [knowledge cards](/knowledge/knowledge-cards). They light up when they come up in conversation. |
| **Documents** | **Add documents** from your [document library](/knowledge/documents). |
| **Prepare** / **Open meeting prep** | Opens the full preparation page for notes, document scans and drafts to review. For a session that isn't scheduled yet, **Prepare** saves it as a prep first. See [Preparing for a session](/sessions/scheduling-and-preparing#preparing-for-a-session). |

### AI & privacy

| Option | What it does | Default |
| --- | --- | --- |
| **Summary language** | The language of the summary, the timeline and the AI title. **Auto** follows the language spoken. Click **More…** to pick from 16 languages. | Auto |
| **Summary length** | **Short**, **Standard** or **Detailed**. Affects the summary only, not the timeline. | Standard |
| **Privacy** | What TalkBar may do with this session's knowledge. See the table below. | Normal |

The **Privacy** modes:

| Mode | What happens |
| --- | --- |
| **Normal** | Live recall, knowledge suggestions and search all work. |
| **Session only** | Live recall works, but this session won't feed search or suggestions later. Cards you add stay with this session. |
| **No auto cards** | No cards pop up during the session. Ask AI and search still work; knowledge suggestions are off. |
| **Sensitive** | Recall, Ask AI, suggestions and search are off for this session. Cards you add stay with this session. |

Privacy modes never stop the recording, transcript or summary from being saved.

## Defaults

At the bottom of the window:

- **Save as my defaults** remembers the current choices. They pre-fill the window next time, when nothing more specific applies (such as a series' own defaults or a prepared session).
- **Reset to defaults** puts the window back to your saved defaults.

You can also choose a default template in **Settings → General → Session defaults**. See [General settings](/settings/general).

## Start, prepare or schedule

| Button | What it does |
| --- | --- |
| **Start session** | Starts recording now and opens the [recording screen](/sessions/recording). |
| **Prepare** | Saves the setup as a session to prepare for and opens its prep page. |
| **Schedule for later** | Turns the setup into a scheduled session. See [Scheduling and preparing](/sessions/scheduling-and-preparing). |
| **Cancel** | Closes the window without starting. |

If **Start session** is unavailable, look for one of these notices:

- **The speech recognition model is not ready.** Download the speech model, or click **Open voice settings**. See [Voice settings](/settings/voice).
- **An audio import is running** — wait for it to finish, or schedule the session for later.
- **Recording in progress** — another session is recording.
- On the Free plan, the workspace has reached its session limit. Move an old session to Trash to free a slot. See [Plan limits](/sessions/overview#plan-limits).

## The session bar

The session bar is a small window that stays on top of your other apps, in the top-right corner by default. Press `Ctrl+Alt+B` to show or hide it.

- When nothing is recording, it asks **Start a session?** Pick a **Template:** and an **Input:** (**Mic**, **System** or **Mic + System**), then click **Start session**.
- While a session records, it becomes a compact live view. See [The session bar while recording](/sessions/recording#the-session-bar).

::screenshot{src="/screenshots/sessions/session-bar-prompt.png" alt="The session bar in the top-right corner of the screen showing 'Start a session?' with template pills, the Input choice and the Start session button" caption="The session bar prompt"}
::

### Session detection

TalkBar can notice when a conversation starts near your microphone and offer to record it. The session bar then shows **Sounds like a conversation — start a session?** with a short snippet of what it heard. Click **Start session**, **Skip** detection for a while, or turn detection off from the bar.

Detection is on by default. Change it, the skip duration, and the bar's shortcut, position and number of transcript lines in **Settings → General → Session detection**. Detection never starts recording by itself, and nothing it hears is saved.

## Related

- [Recording a session](/sessions/recording)
- [Templates and skills](/sessions/templates-and-skills)
- [Scheduling and preparing](/sessions/scheduling-and-preparing)
- [Speakers](/voice/speakers)
