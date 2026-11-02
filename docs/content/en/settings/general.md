---
title: General
description: 'Settings → General: appearance, session defaults and detection, cleanup, knowledge scans, language, updates, startup, time and logs.'
navigation:
  icon: i-heroicons-adjustments-horizontal
---

Keyboard shortcuts shown below are Windows defaults. On macOS, check the shortcut shown in TalkBar or its settings; configurable shortcuts can be changed there.

**Settings → General** holds app-wide preferences: how TalkBar looks, how new sessions start, what gets cleaned up automatically, and how the app starts and updates. Changes save as you make them. The one exception is the timezone, which has its own **Save Timezone** button.

::screenshot{src="/screenshots/settings/general-appearance.png" alt="Settings → General scrolled to the top, showing the Appearance section with the Theme previews (System, Light, Dark), the Accent Color swatches, the Highlight on hover and Hover Animation switches, and the Collapsed sidebar choice" caption="Settings → General"}
::

## Appearance

| Setting | What it does | Default |
| --- | --- | --- |
| **Theme** | Follows your system appearance (**System**), or always uses **Light** or **Dark**. | Light |
| **Accent Color** | The highlight color for buttons, selection and focus. Choose from 14 swatches, from Amber to Stone. | Amber |
| **Highlight on hover** | Shows item names in the accent color when you point at them in lists and cards. | On |
| **Hover Animation** | Adds motion when you hover the collapsed sidebar and similar parts of the app. | On |
| **Collapsed sidebar** | When the sidebar is collapsed, **Expand on hover** opens the full sidebar when you point at it. **Keep closed** keeps the icon rail with tooltips. | Expand on hover |
| **Knowledge shortcuts** | The section switch shows or hides icon-only links under Knowledge in the sidebar. A switch for each tab picks which links appear: **Memory cards**, **Documents**, **People**, **Companies**, **Action items** and **Review**. Turning the section off keeps your picks. | Off (no tabs picked) |

## Live Session Appearance

These options arrange the panels of the recording screen and apply right away. You can change the same things from the **Layout** menu on the recording screen. See [Recording a session](/sessions/recording).

| Setting | What it does | Default |
| --- | --- | --- |
| **Style** | **Rounded** shows floating cards. **Flat** shows edge-to-edge panels. | Rounded |
| **Layout** | Pick a preset (**Side panel**, **Grid**, **Tabs in main panel**, **Split main panel**) or one of your saved layouts. **Manage custom layouts…** saves the current arrangement as a new layout, or updates, renames and deletes saved ones. | Side panel |
| **Place each view** | One row for each view: **Transcript**, **Notes**, **Timeline**, **Knowledge** and **Documents**. Drag a row to change the tab order, show or hide the view, and choose where its panel sits. | Set by the layout |
| **Reset panel sizes** | Puts the panel sizes back to their defaults. | — |

## Session defaults

| Setting | What it does | Default |
| --- | --- | --- |
| **Default template** | The session template TalkBar uses when nothing else picks one, such as your last-used or a pinned template. See [Which template a session starts with](/sessions/templates-and-skills#which-template-a-session-starts-with). You manage templates in [Templates & Skills](/settings/templates-and-skills). | Meeting |
| **Remember last template** | New and scheduled sessions start with the template you used last. When it's off, they start with your pinned or default template. | On |
| **Delete confirmation** | How deletes inside a session are confirmed: moving a session to Trash from the list, and deleting transcript chunks, summaries, bookmarks, priorities or manual speakers. Choices: **Confirm with dialog**, **Confirm in menu (double-click)**, **No confirmation**. Notes, chats and other areas always use a dialog. | Confirm with dialog |
| **Default privacy** | The privacy mode new sessions start with: **Normal**, **Session only**, **No auto cards** or **Sensitive**. The hint under the setting explains what the selected mode turns off. See [Starting a session](/sessions/starting-a-session). | Normal |
| **Recording notice** | Shows a reminder when a session starts that it's your job to tell participants they're being recorded. | On |

## Session detection

When your microphone is free, TalkBar can listen locally for a conversation. If it hears one, it offers to start a session from the small session bar in a corner of your screen. Audio and text never leave your computer, and nothing is saved until you start a session.

| Setting | What it does | Default |
| --- | --- | --- |
| **Session detection** (section switch) | Turns detection on or off. | On |
| **Skip duration** | How long the session bar's **Skip** button pauses detection: 5, 10, 15, 30 or 60 minutes. | 15 minutes |
| **Session bar shortcut** | A keyboard shortcut that shows or hides the session bar, with its own on/off switch. Changes apply right away. If the shortcut doesn't respond, use the **restart the app** link under it. | `Ctrl+Alt+B`, on |
| **Current speaker lines** | How many lines of the current speaker's words the bar shows while you record: 2, 3, 4, 6, 8 or 10. | 3 lines |
| **Remember bar position** | You can drag the bar anywhere. With this on, it reopens where you left it instead of in the default corner. | On |
| **Default position** | Where the bar opens when it has no remembered position: **Top left**, **Top center**, **Top right**, **Bottom left**, **Bottom center** or **Bottom right**. | Top right |
| **Edge offset** | The distance between the bar and the screen edges, from 0 to 200 px. | 16 px |
| **Bar position** | **Reset position** forgets the remembered spot and moves the bar back to the default corner. | — |

## Auto titles

TalkBar can write a short title when a note or session still has an empty or placeholder title.

| Setting | What it does | Default |
| --- | --- | --- |
| **Auto-title notes** | Writes a title once a note has a few paragraphs, unless you already named it. | On |
| **Auto-title sessions** | Replaces the default session title once there is enough transcript, unless you renamed the session. | On |

## Session retention

Moves old sessions to Trash automatically. Pinned sessions and sessions that are still recording are never moved. Retention runs for each workspace when TalkBar starts.

| Setting | What it does | Default |
| --- | --- | --- |
| **Automatically move old sessions to Trash** | Turns retention on. | Off |
| **Keep at most** | How many of the newest sessions each workspace keeps: 25, 50, 100, 250, 500, 1000 or **No limit**. | 100 |
| **Move sessions older than** | Moves sessions older than 30, 90, 180 or 365 days, or **Never**. | Never |
| **Move to Trash now** | Shown while retention is on. It tells you how many sessions would move right now and moves them after you confirm. | — |

## Trash cleanup

These settings apply to sessions and notes in Trash. If a permanent delete fails, TalkBar tries again later on its own.

| Setting | What it does | Default |
| --- | --- | --- |
| **Automatically empty Trash** | Permanently deletes Trash items once the retention period ends. | On |
| **Keep Trash items for** | The retention period: 7, 14, 30, 60 or 90 days. | 30 days |

## Knowledge scanning

Knowledge scans look for knowledge cards, people and companies in your sessions and documents. See [Review and scans](/knowledge/review-and-scans).

| Setting | What it does | Default |
| --- | --- | --- |
| **Auto-scan finished sessions** | Scans a session shortly after its transcript is saved. | Off |
| **Auto-scan new documents** | Scans each document after it is indexed. | Off |
| **Scheduled sweep** | Checks about every 6 hours, up to 10 sources at a time. A source is scanned again when its content or the scan settings change. | Off |
| **Focus instructions** | Guidance added to every scan, such as the topics that matter most to you. | Empty |

## Knowledge health

| Setting | What it does | Default |
| --- | --- | --- |
| **Review after days** | Approved cards that haven't been confirmed for this many days move to **Needs review**. | 90 |
| **Exclude from live recall after days** | Unpinned cards older than this stop appearing in live recall during sessions. Pinned cards stay. | 180 |
| **Knowledge health nudges** | Shows reminders in the app when approved cards have gone too long without confirmation. | Off |

See [Knowledge cards](/knowledge/knowledge-cards) for how review and live recall work.

## Application UI Language

Pick the language of TalkBar's menus and screens. 15 languages are available: English, Español, Deutsch, Français, Italiano, Русский, Türkçe, Polski, Українська, 简体中文, Português (Brasil), Português (Portugal), 日本語, 한국어 and 繁體中文.

The default is your system language if TalkBar supports it, and English otherwise. Dates, numbers, the tray menu, the session bar, the dictation panel and the titles TalkBar gives new sessions all follow this language.

::callout{icon="i-heroicons-information-circle" color="gray"}
Some regional licenses cover only certain interface languages. With one of those, the other languages are greyed out, and a note links to **Settings → License**. See [Plans and license](/data/plans-and-license).
::

### Custom translations

Under the language buttons, **Custom translations** lets you change any phrase in the main window for the current language. Your wording applies right away and is saved on this computer, separately for each language. The tray menu, the session bar and the dictation panel keep the built-in text.

| Control | What it does | Default |
| --- | --- | --- |
| Switch next to **Custom translations** | Turns your wording on or off for every language. While it's off, TalkBar shows the built-in text. Your wording stays on this computer and applies again when you turn the switch back on. | On |
| **Improve translation** / **Edit overrides** | Opens **Improve translation for** *language*, where you change phrases. The button reads **Edit overrides** once you have at least one. | — |
| **Submit custom translations** | Sends your wording to the TalkBar team. It appears when you have phrases you haven't sent, and shows how many. | — |
| **Clear all overrides** | Removes all your wording for the current language, after you confirm. The built-in text comes back. | — |

#### Change a phrase

1. Click **Improve translation**.
2. In **Search phrases**, search by the English text, the current translation or the phrase's key, or filter by category.
3. Click **Add override** on the phrase, type your wording and click **Save**. The change shows at once.

Each phrase shows its **Original** English text and its **Current** text. A phrase you changed also shows the **Bundled** text that came with TalkBar.

- Once you have changes, the **Custom** tab lists them and **Browse all phrases** lists everything. **Edit** and **Revert** work on one phrase, and **Revert all custom translations** removes them all.
- Saving an empty field, or the same text as the bundled translation, removes your change.
- Keep variables such as `{{count}}`. If you remove one, TalkBar warns you with **Heads up — your override is missing variable(s)**.
- Phrases that change with a number are listed once for each form your language uses.

#### Send your translations to the TalkBar team

If you think your wording would help everyone, send it for review. Nothing is sent until you do this.

1. Click **Submit custom translations**, or **Send suggestions** in the editor.
2. Choose the phrases. Phrases you haven't sent are already selected, and ones you sent before are marked **Sent**. You can send up to 500 at a time.
3. Enter your name and email. You can also add a comment and up to 5 screenshots.
4. Leave **Include app version and system details** on, or turn it off. With a license, this option reads **Include license and app details**.
5. Check **I confirm these translations are accurate.** and click **Send suggestions**.

Your wording keeps working on this computer after you send it. If you edit a phrase later, it counts as not sent again. The team reviews every suggestion, and accepted ones can be built into a future version of TalkBar. See [Privacy and your data](/data/privacy-and-your-data#custom-translations) for what is sent.

## Updates

| Setting | What it does | Default |
| --- | --- | --- |
| **Automatic updates** | Downloads updates automatically and installs them the next time TalkBar starts. On the Free plan, this is always on and can't be turned off. If your license covers updates only until a certain date, a note shows that date, and TalkBar asks before installing a version released after it. | On |
| **Beta updates** | Gets only beta releases, so you can try new features early. Turn it off to get only production releases. | Off |
| **Return to production** | Appears only when you run a beta version, have turned **Beta updates** off, and an older production version is available. It shows a data compatibility warning before downloading. | — |

You can also check for an update at any time with **Check for Update** at the bottom of the Settings sidebar. See [Install and update](/getting-started/install-and-update).

## Startup

| Setting | What it does | Default |
| --- | --- | --- |
| **Window mode on launch** | **Last state** opens the window if it was open when you last quit, and stays in the tray if it was minimized. **Tray** always starts in the system tray. **Window** always opens the main window. | Last state |
| **Auto start** | Starts TalkBar when you sign in to your computer. | On |
| **Keep awake** | Keeps your computer from going to sleep while TalkBar is running. | Off |
| **Show TalkBar shortcut** | A keyboard shortcut that opens and focuses the main TalkBar window from any app. Click the field to record a new shortcut, and use the switch to turn it on. | `Ctrl+Shift+Space`, off |

## Time

| Setting | What it does | Default |
| --- | --- | --- |
| **Custom timezone override (optional)** | The timezone TalkBar uses for dates in exports, for the current date it gives AI, and for some date labels. Scheduled sessions keep using your computer's time zone. Leave it on **Auto (System timezone)** to follow the system, or search for any timezone and click **Save Timezone**. **Reset to Auto** goes back to the system timezone. The line under the setting shows the timezone in use. | Auto (System timezone) |
| **Time format** | Shows times as **12-hour** (AM/PM) or **24-hour**. | Follows the app language (12-hour for US English) |

Until you pick a time format, TalkBar uses the usual one for your app language, so US English shows 12-hour time and Russian shows 24-hour time. Your choice stays if you change the language later.

## Calendar

The calendar view, default duration and default reminders are in [**Settings → Calendar sync**](/settings/calendar-sync).

## Application Logs

| Setting | What it does | Default |
| --- | --- | --- |
| **Enable application logs** | Saves app diagnostics, warnings and errors to log files on this computer, for troubleshooting. | Off |
| **Enable Local AI logs** | Does the same for the built-in local AI. | Off |
| **Logs folder** | **Open logs folder** opens the folder that holds both kinds of log files. | — |

Logs stay on your computer. Turn them on when you need to send details to support. See [Troubleshooting](/help/troubleshooting).

## Local Identity

A read-only panel showing the **Profile user name** and **Machine name** of this computer. TalkBar uses them for diagnostics.

## Share usage statistics

| Setting | What it does | Default |
| --- | --- | --- |
| **Share usage statistics** | Sends basic usage statistics to help improve TalkBar: app starts and quits, daily use, which main sidebar sections you open, when you start or schedule a session, when your plan is upgraded, the app version, your plan and release channel, preview status, and a random device ID created by TalkBar. | On |

Your name, email and account are never sent with these statistics. Recordings, transcripts, notes and chats are never included, and no statistics come from their content. When the switch is off, nothing is sent. See [Privacy and your data](/data/privacy-and-your-data).

::callout{icon="i-heroicons-building-office" color="gray"}
If your organization manages TalkBar, it can lock **Automatic updates**, **Beta updates**, manual update checks and **Share usage statistics**. Locked controls are greyed out and marked **Managed by your organization**.
::

## Related

- [Settings overview](/settings/overview)
- [Voice](/settings/voice): recording, transcription and dictation
- [Templates & Skills](/settings/templates-and-skills): manage the templates behind **Default template**
- [Calendar sync](/settings/calendar-sync): the calendar view and connected calendars
- [Data & Backup](/settings/data-and-backup)
- [Getting around](/getting-started/getting-around)
