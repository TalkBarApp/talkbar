---
title: Help & Tours and Doctor
description: Reference for Settings → Help & Tours (guided tours and onboarding replay) and Settings → Doctor (checks your TalkBar setup and points to fixes).
navigation:
  icon: i-heroicons-question-mark-circle
---

Two tabs in the **System** group of Settings help you learn TalkBar and fix problems. **Settings → Help & Tours** replays guided tours and onboarding. **Settings → Doctor** checks your setup and points each finding at the place that fixes it.

## Help & Tours

### Onboarding

**Start onboarding again** reopens the first-run setup: your profile, starter packs and AI setup. Your existing settings stay as they are. The button is turned off while a session is recording. See [First-run setup](/getting-started/first-run-setup).

### Guided tours

A guided tour points at the real screen and explains it step by step. Use **Search tours…** to filter the list by title or description.

You can also start a tour from any screen: open the **Help** menu and choose **Take a tour**. The tour for the current screen is already selected. Pick another one, or click **All tours** to come here.

Tours are grouped by category. Each category shows how many of its tours you've completed. Each tour has a **Start** button, or **Run Again** once it shows **Completed** or **Skipped**.

| Category | Tours |
| --- | --- |
| Getting started | Find your way around, Home, How TalkBar uses AI |
| Sessions | Sessions, Starting a session, Recording a session, Session details, Upcoming sessions, Session reminders, Scheduling a session, Prepare sessions, Preparing a session, Series, Session series |
| Chats and notes | Chats, Asking TalkBar, Notes, Writing a note |
| Knowledge and projects | Knowledge, Review suggestions, Documents, People, Companies, Projects, Inside a project, Topics |
| Settings: workspace | Settings overview, General settings, Projects settings, Topics, keywords and action items, Templates and skills, Quick Actions |
| Settings: AI and voice | AI providers and models, Private Local AI, Recording and transcription, Dictation |
| Settings: connections | Notifications, Calendar sync, MCP Access, Export and share |
| Settings: system | Account and workspaces, Plan and license, Data and backup, Help & Tours, Settings Doctor |

::callout{icon="i-heroicons-light-bulb" color="primary"}
When you finish a tour, TalkBar offers the next tour in the same category. Choose **Start next tour** or **Not now**.
::

::screenshot{src="/screenshots/settings/help-and-tours.png" alt="Settings → Help & Tours with the Onboarding row and Start onboarding again button at the top, the Search tours field, and the Getting started category showing tour rows with Completed badges and Run Again buttons" caption="Settings → Help & Tours"}
::

## Doctor

The **Settings Doctor** runs quick checks every time you open it. **Run all checks** also runs the probes, which take a moment: it sends one tiny test request to your default AI model, checks Ollama, and checks the TalkBar database.

Each check shows a status:

- **OK** (green): nothing to do.
- **Needs a look** (amber): something may need attention.
- **Issue** (red): something needs action.

Most checks that aren't OK have a button that takes you to the fix. When every check passes, you see **Everything looks healthy**.

::screenshot{src="/screenshots/settings/doctor.png" alt="Settings → Doctor after clicking Run all checks, showing the AI, Local Models, Voice, Notifications and Application groups with OK badges and the Route test row showing a reply time" caption="Settings → Doctor"}
::

### Checks

Each group has a shortcut on the right to the related settings (**AI setup**, **Open setup**, **Voice settings**, **Notification settings**, **General settings**).

| Group | Check | What it looks at | Fix button |
| --- | --- | --- | --- |
| AI | **AI routing** | Unresolved AI provider issues and assigned local models that aren't downloaded. | **Open AI settings** |
| AI | **Providers** | Whether your AI providers are healthy. | **Open AI settings** |
| AI | **Private AI** | Whether Private AI Mode is on or available, and whether its models are downloaded. | **Download models** |
| AI | **CLI tools** | AI command-line tools detected on this computer. | **Open provider setup** |
| AI | **Ollama** | Whether Ollama is installed and running, and how many models it has loaded. Probe only. | **Unload Ollama** |
| AI | **Route test** | Sends one tiny request to the default model and shows the reply time. Probe only; you can also click **Run** on this row. | — |
| Local Models | **Language models**, **Speech recognition**, **Documents**, **Translation**, **System models** | Whether the models each feature needs are downloaded. | **Open setup** |
| Voice | **Microphone** | Whether your chosen microphone is connected, or that the system default is used. | **Open voice settings** |
| Voice | **Shortcuts** | Whether all keyboard shortcuts registered. | **Open voice settings** |
| Notifications | **Delivery channels** | Whether your enabled delivery channels are healthy. | **Open notification settings** |
| Application | **Saved keys** | Whether TalkBar can read your saved keys, passwords and tokens on this computer. | **Fix** or **Open settings** |
| Application | **App version** | Whether TalkBar is up to date or an update is ready. | **Check for updates**, **Download update** or **Restart to update** |
| Application | **Database** | The database integrity check. Probe only. | **Open data folder** |

The Doctor tab also has a **Start onboarding again** button, the same one as in Help & Tours.

For problems the Doctor can't fix, see [Troubleshooting](/help/troubleshooting).

## Related

- [Troubleshooting](/help/troubleshooting)
- [FAQ](/help/faq)
- [First-run setup](/getting-started/first-run-setup)
- [Getting around](/getting-started/getting-around)
- [Data & Backup settings](/settings/data-and-backup)
