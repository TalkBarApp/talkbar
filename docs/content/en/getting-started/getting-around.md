---
title: Getting around
description: The TalkBar layout, sidebar, Home, search, Quick Actions, system tray, session bar, reminders, tours, keyboard shortcuts and the interface language.
navigation:
  icon: i-heroicons-map
---

Keyboard shortcuts shown below are Windows defaults. On macOS, check the shortcut shown in TalkBar or its settings; configurable shortcuts can be changed there.

This page shows where everything is in the TalkBar main window and how to move around quickly. For a guided version, take the *Find your way around* tour from **Help → Take a tour**.

::screenshot{src="/screenshots/getting-started/main-window-layout.png" alt="TalkBar main window on Home with the sidebar expanded on the left (Home, Recording, Sessions, Chats, Notes, Knowledge, Projects, Settings and the account card), the title bar with the TalkBar logo, New session, Upcoming and Help, and the round Quick Actions button in the bottom-right corner" caption="The main window"}
::

## The sidebar

The sidebar on the left holds the main areas of the app.

| Item | What it opens |
| --- | --- |
| **Home** | Your start page. |
| **Recording** | The session you are recording now. After a session ends it is called **Last session** and opens the most recent one. A status indicator shows when you are recording, paused or on hold. |
| **Sessions** | Every recorded session. A second **Sessions** group, below **Projects**, lists your recent sessions that aren't in a project. |
| **Chats** | Your conversations with TalkBar. |
| **Notes** | Your own notes. |
| **Knowledge** | Memory cards, documents, people, companies and action items that TalkBar keeps for you. A **Review** item appears under it when AI suggestions are waiting. |
| **Projects** | Your projects, one click away. The list shows up to five, pinned ones first; **View all projects** opens the rest. The arrow on a project's row shows its latest sessions. Use **+** to create a project. |
| **Settings** | All settings. A red badge means something needs your attention. |
| Account card | At the very bottom: your profile and the active workspace. Click it to switch workspace or manage your account. |

Point at a session in the sidebar to see a small card with its template, date, length, speakers, project and source.

Collapse the sidebar to a narrow rail with the button at its top. To pin icon links to Knowledge pages, such as **Documents** or **People**, under Knowledge, turn on **Knowledge shortcuts** in **Settings → General → Appearance**.

## The title bar

| Control | What it does |
| --- | --- |
| **TalkBar logo** | Opens the TalkBar menu: **About TalkBar** (with your version and plan), **Upgrade to {plan}** (when a higher plan is available), **Check for updates**, a **Settings** submenu with every tab, **Set up AI…**, **Turn on Private AI Mode** or **Turn off Private AI Mode** (once the mode is available), **Show Session Bar** (or **Hide Session Bar**), **Close Window** and **Quit TalkBar**. |
| **New session** | Opens the New session window to start a recording. |
| **Record now** | Appears next to **New session** when a scheduled session has started and nothing is recording. Click it to start that session. |
| **Upcoming** | Lists your scheduled sessions. A session that is starting soon gets a **Start** button. **View all** opens the Upcoming sessions page, and **Schedule new** opens the Schedule window. |
| **Focus mode** | Shown on the recording screen. See [Layouts](/sessions/recording#layouts). |
| **Help** | **Take a tour**, **Documentation** and **Contact us**. On the Free plan, a computer that never had a Preview trial also gets **Activate Invite**. See [Preview trial](/settings/license#preview-trial). |

When Private AI Mode is on, the logo becomes a green shield to remind you that all AI features run on local models only. See [Private AI Mode](/ai/private-ai-mode).

**Close Window** hides TalkBar to the system tray, and so does the window's close button. TalkBar keeps running there. **Quit TalkBar** asks whether to exit completely (**Quit App**) or keep running in the tray (**Hide to Tray**).

## The system tray

TalkBar keeps an icon in the system tray while it runs, even when the main window is closed. The icon changes while a session records or is paused.

::platform-tabs
#windows
Click the icon to open the main window. Right-click it to open the menu.
#macos
Click the icon in the menu bar to open the menu.
::

| Menu item | What it does |
| --- | --- |
| **Start session** | Starts recording right away. |
| **New session…** | Opens the New session window. |
| Session status, **Pause session** or **Resume session**, **Stop session** | Shown instead of the two items above while you record. Click the status to open the live session. |
| **Schedule new session…** | Opens the schedule window. |
| **Upcoming sessions** | Your next scheduled sessions, and **View all upcoming sessions**. |
| **Recent Sessions** | Your last 10 sessions, and **View all sessions**. |
| **Quick Actions** | The same items as the [Quick Actions](#quick-actions) button. |
| **Settings** | **All settings…**, and links to the settings tabs. |
| **Private AI Mode** | Turns [Private AI Mode](/ai/private-ai-mode) on or off, once the mode is available. It is locked while a session is in progress. |
| **Open TalkBar** | Opens the main window. |
| **Quit** | Exits TalkBar. |

## Home

Home is your start page for the active workspace.

- The greeting names the active **workspace**. **New session** starts a recording.
- **Add** creates a **Chat**, **Note**, **Person**, **Company** or **Knowledge card**.
- Four tiles count your **Sessions**, **Chats**, **Notes** and **Documents**. Click a tile to open that list.
- **Up next** appears when sessions are scheduled soon. Start one, or open its preparation.
- The time range menu sets how far back the recent list goes, such as **Today** or **This week**. Click **Set as default** to keep your choice.
- The recent list shows your latest sessions, notes and chats by day. Switch between **All** and **Pinned**, filter by type, and search. The pin on a row pins or unpins it, and **Pinned on top** keeps pinned items first.

::screenshot{src="/screenshots/getting-started/home-dashboard.png" alt="TalkBar Home page with the greeting, the Add menu and New session buttons, the four count tiles for Sessions, Chats, Notes and Documents, the Up next strip with one scheduled session, and the recent activity list grouped by day" caption="Home"}
::

## Universal search

Press `Ctrl+K` (`Cmd+K` on macOS), or click the search box at the top of the sidebar, to search everything in the workspace. Outside text fields, `/` opens search too.

Search finds sessions, notes, chats, action items, documents, memory cards, people, companies, projects and series. Matches inside a transcript, summary or document text are marked as such.

In the note editor these keys belong to the editor: `/` opens the editor's command menu and `Ctrl+K` inserts a link.

To find a setting, use the **Find a setting…** box at the top of the Settings sidebar.

## Quick Actions

The round button in the bottom-right corner opens **Quick Actions**, your shortcuts for common tasks. By default it holds **Home**, **New session**, **Sessions**, **Chat** and **Settings**. You can also add Recording, Calendar, Chats, Knowledge, Notes, Documents and Projects.

Choose and reorder the items in **Settings → Quick Actions**. See [Quick Actions settings](/settings/quick-actions).

## The session bar

The session bar is a small floating window that stays on top of your other apps.

- While you record, it shows a compact view of the session, with the latest words of the current speaker.
- When session detection is on and your microphone is free, TalkBar listens on this computer for a conversation and offers to start a session from the bar. Audio and text never leave this device, and nothing is saved until you start.

Show or hide it from the TalkBar logo menu, or with `Ctrl+Alt+B`. You can drag the bar anywhere. Configure detection, the shortcut, its position, how many lines it shows and the **Skip duration** (how long the bar's Skip button pauses detection) in **Settings → General → Session detection**. Session detection is on by default.

## Reminders

You don't open the reminder panel yourself. When a scheduled session reaches one of its reminder times, the panel pops up on its own in the bottom-right corner of TalkBar, over the Quick Actions button, and a desktop notification appears too.

The panel shows the session's title and time. **Start** starts the session, **Snooze 10m** reminds you again later (the arrow next to it has other times), **Skip** skips this session, and the **X** closes the panel. For a session that starts on its own, the panel counts down instead. See [Reminders and auto-start](/sessions/scheduling-and-preparing#reminders-and-auto-start).

## Guided tours

Tours point at the real screen and explain it step by step.

- **Help → Take a tour** opens a tour picker with the tour for the current screen selected.
- **Settings → Help & Tours** lists every tour by group, shows how many you have completed, and lets you **Start** a tour or **Run Again**.
- Press `Esc` or click **Skip Tour** to stop a tour. A skipped tour is marked so you can come back to it.
- When you finish a tour, TalkBar usually offers the next one in the same group.

While a tour runs, only the highlighted part of the screen responds to clicks.

## Keyboard shortcuts

### In the app

| Shortcut | What it does |
| --- | --- |
| `Ctrl+K` | Open or close search. |
| `/` | Open search (outside text fields and editors). |
| `Esc` | In search, clear the query, then close search. During a tour, stop the tour. On the recording screen, leave Focus mode. |
| `Ctrl+J` | In a note, jump to the **Ask AI to write or edit…** bar. |
| `Ctrl+Shift+O` | In a chat, start a new chat with the same setup. |
| `Shift+Esc` | On the Chats page, return to the message box. |
| `J` / `K` | On the Knowledge **Review** page, move to the next or previous suggestion. |
| `A` / `E` / `D` / `S` | On the **Review** page, approve, edit, dismiss or snooze the current suggestion. |
| `Space` | On the **Review** page, select the current suggestion. |

### Anywhere on your computer

These shortcuts work even when TalkBar is in the background. You can change each one, or turn it off, in Settings.

| Shortcut | What it does | Default | Where to change it |
| --- | --- | --- | --- |
| Hold `Ctrl+Shift` | Start or stop dictation. A short tap does nothing. | On | **Settings → Voice → Dictation → Dictation shortcut** |
| `Ctrl+Shift+Enter` | While dictating, insert what you have so far and keep recording. | On | **Settings → Voice → Dictation → Insert while recording** |
| `Ctrl+Shift+L` | Polish the dictation with AI and insert it. Works only while **Polish with AI** is on. | On | **Settings → Voice → Dictation → Polish shortcut** |
| `Ctrl+Shift+M` | Mute or unmute all microphone input to TalkBar. Other apps are not affected. | On | **Settings → Voice → Recording → Mute microphone shortcut** |
| `Ctrl+Alt+B` | Show or hide the session bar. | On | **Settings → General → Session detection → Session bar shortcut** |
| `Ctrl+Shift+Space` | Open and focus the main TalkBar window. | Off | **Settings → General → Startup → Show TalkBar shortcut** |

If a shortcut is already used by another app, TalkBar tells you and asks you to choose a different one. **Settings → Doctor** also checks your shortcuts. See [Dictation](/voice/dictation).

## Interface language

TalkBar's interface is available in 15 languages: English, Español, Deutsch, Français, Italiano, Русский, Türkçe, Polski, Українська, 简体中文, Português (Brasil), Português (Portugal), 日本語, 한국어 and 繁體中文.

Choose it during first-run setup, or later in **Settings → General → Application UI Language**. The change applies right away, including in the session bar and the dictation panel. To change specific wording, see [Custom translations](/settings/general#custom-translations).

::callout{icon="i-heroicons-information-circle" color="gray"}
Some regional licenses include only certain interface languages. If a language is unavailable, TalkBar explains why and links to **Settings → License**.
::

The interface language is separate from the language TalkBar transcribes. Set that in **Settings → Voice → Transcription**. See [Recording and transcription](/voice/recording-and-transcription).

## Related

- [Your first session](/getting-started/first-session)
- [Settings overview](/settings/overview)
- [General settings](/settings/general)
- [Scheduling and preparing](/sessions/scheduling-and-preparing)
- [Help & Tours and Doctor](/settings/help-and-doctor)
