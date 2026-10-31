---
title: Settings overview
description: How TalkBar Settings is organized, how to find any setting with search, and what highlighted, flagged and locked settings mean.
navigation:
  icon: i-heroicons-cog-6-tooth
---

Settings is where you change how TalkBar looks, records, uses AI, shares and stores your data. This section is the complete reference: one page for each Settings tab, with every control, what it does and its default value. For how a feature works, follow the links to its feature page.

::screenshot{src="/screenshots/settings/settings-overview.png" alt="The Settings screen with the General tab open: the Settings sidebar on the left showing Back, Find a setting…, the Workspace, AI & Voice, Connections and System groups, and Check for Update, Contact us and Quit / Hide at the bottom" caption="The Settings sidebar"}
::

## Opening Settings

- Click **Settings** at the bottom of the main sidebar. A red badge on it means a setting needs your attention.
- Open the TalkBar logo menu and choose **Settings**. A submenu lists every tab, so you can jump straight to one.
- Click your account card in the sidebar to open [Account](/settings/account-and-workspaces).
- Click the gear in the Quick Actions menu to open [Quick Actions](/settings/quick-actions).

Most changes save as soon as you make them. You don't need to press a Save button unless a page shows one, such as **Save Timezone** in [General](/settings/general#time).

## How Settings is organized

The Settings sidebar groups the tabs into four sections.

| Group | Tab | What you set there | Reference |
| --- | --- | --- | --- |
| Workspace | **General** | Appearance, session defaults, session detection, cleanup, knowledge scans, language, updates, startup, time, calendar, logs | [General](/settings/general) |
| Workspace | **Projects** | Create, edit, pin and restore projects | [Projects, topics and keywords](/settings/projects-and-topics) |
| Workspace | **Topics & Keywords** | Topics, AI keywords and action item labels | [Projects, topics and keywords](/settings/projects-and-topics) |
| Workspace | **Templates & Skills** | Session templates, summary sections, note templates, skills and knowledge skills | [Templates & Skills](/settings/templates-and-skills) |
| Workspace | **Quick Actions** | The floating Quick Actions button and its shortcuts | [Quick Actions](/settings/quick-actions) |
| AI & Voice | **AI Providers** | Default and per-feature models, providers, token limits, request settings | [AI Providers](/settings/ai-providers) |
| AI & Voice | **Private Local AI** | Private AI Mode and the models that run on your computer | [Private Local AI](/settings/private-local-ai) |
| AI & Voice | **Voice** | Microphone, recording, transcription, dictation and speakers | [Voice](/settings/voice) |
| Connections | **Notifications** | Email, Telegram, Slack, Teams and webhook channels, and desktop notifications | [Notifications](/settings/notifications) |
| Connections | **MCP Access** | Let other AI apps on this computer work with your TalkBar data | [MCP Access](/settings/mcp-access) |
| Connections | **Export & Share** | Export destinations and rules, share links, custom branding | [Export & Share](/settings/export-and-share) |
| System | **Account** | Your profiles and workspaces | [Account and workspaces](/settings/account-and-workspaces) |
| System | **License** | Your plan, license key and upgrades | [License](/settings/license) |
| System | **Data & Backup** | Data folder, backups, transfer between computers, recovery code, reset | [Data & Backup](/settings/data-and-backup) |
| System | **Help & Tours** | Replay onboarding and guided tours | [Help & Tours and Doctor](/settings/help-and-doctor) |
| System | **Doctor** | Check your setup and jump to fixes | [Help & Tours and Doctor](/settings/help-and-doctor) |

At the top of the sidebar, **Back** returns you to where you were before Settings. At the bottom:

- **Check for Update** checks for a new TalkBar version right away.
- **Contact us** opens a form for sending a message to the TalkBar team.
- **Quit / Hide** asks whether to quit TalkBar (**Quit App**) or keep it running in the tray (**Hide to Tray**).

### Inner tabs

Several tabs are split into inner tabs along the top of the page.

| Tab | Inner tabs |
| --- | --- |
| **AI Providers** | **AI Features**, **Providers**, **Models**, **Advanced** |
| **Private Local AI** | **Local AI models**, **Speech models**, **System models** |
| **Voice** | **Recording**, **Transcription**, **Dictation**, **Speakers** |
| **Templates & Skills** | **Session templates**, **Summary sections**, **Note templates**, **Skills**, **Knowledge** |
| **Topics & Keywords** | **Topics**, **Keywords**, **Action Items** |
| **Export & Share** | **Export Session**, **Share Content**, **Custom branding** |

## Find a setting

**Find a setting…** at the top of the Settings sidebar searches every setting in every tab.

1. Click **Find a setting…**. With the search box empty, it lists all tabs by group, so you can also use it to jump between tabs.
2. Type a word, such as *dark mode*, *shortcut*, *backup* or *Telegram*. Results are grouped by tab and show the section each setting belongs to. Search also matches related words and descriptions, so *telemetry* finds **Share usage statistics**. English setting names work even when TalkBar is in another language.
3. Pick a result. TalkBar opens the right tab and inner tab, scrolls to the control, and highlights it.

If nothing matches, you see **No matching settings**.

::screenshot{src="/screenshots/settings/settings-search.png" alt="The Find a setting… dialog with the word shortcut typed, showing results grouped by tab, such as Show TalkBar shortcut and Session bar shortcut under General and Dictation shortcut under Voice, with the matching word highlighted" caption="Settings search"}
::

## Highlighted settings

When search or a link opens a specific setting, the control briefly scales up and flashes in your accent color so you can spot it on the page. A link to a specific setting elsewhere in TalkBar, such as one in an Ask TalkBar answer, opens it the same way.

## Attention dots

A red dot next to a tab in the Settings sidebar means something there needs your attention. Dots can appear on:

- **AI Providers**: an AI provider or model has a problem, or a saved provider key can't be read.
- **Private Local AI**: a built-in model that TalkBar needs isn't downloaded.
- **Notifications**: a turned-on delivery channel failed to deliver or is missing its password or token.
- **Export & Share**: a saved export destination or branding key can't be read on this computer.
- **Data & Backup**: TalkBar can't read your saved keys on this computer. Use your recovery code there to restore them.
- **License**: your license needs attention.

The **Settings** item in the main sidebar shows a badge while there are problems. [Doctor](/settings/help-and-doctor#doctor) checks your setup and takes you to the fix for most problems.

## Settings managed by your organization

If your organization manages TalkBar, some settings may be locked. A tab with locked controls shows a notice at the top:

- **Your organization manages some of these settings.** Some controls on the page are locked, and the others work as usual.
- **Your organization locked these settings. They keep working as set up.** The whole setup on the page is locked. What's already configured keeps working, but you can't change it.

Locked controls are greyed out. A **Managed by your organization** label marks them, and its tooltip reads **Your organization manages this setting.** Notices can appear on **General**, **AI Providers**, **Private Local AI**, **Notifications**, **MCP Access**, **Export & Share**, **Data & Backup** and **License**. To change a locked setting, contact your administrator.

## Related

- [Getting around](/getting-started/getting-around)
- [First-run setup](/getting-started/first-run-setup)
- [General](/settings/general)
- [Help & Tours and Doctor](/settings/help-and-doctor)
- [Troubleshooting](/help/troubleshooting)
