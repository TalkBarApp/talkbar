---
title: Data & Backup
description: Reference for Settings → Data & Backup — your data folder, complete backups, restore, transfer files, the recovery code and reset options.
navigation:
  icon: i-heroicons-archive-box
---

**Settings → Data & Backup** is where you manage the TalkBar data stored on this computer. It covers complete backups, restoring a backup, moving data to another computer, the recovery code for saved keys, and resetting data.

::screenshot{src="/screenshots/settings/data-and-backup.png" alt="Settings → Data & Backup page showing the This device, Backup & restore, Recovery code and Transfer to another device sections, with the red Danger zone section at the bottom" caption="Settings → Data & Backup"}
::

## This device

Your TalkBar workspace data stays on this computer unless you turn on an external AI provider or a notification channel. On Windows, the data folder is `%LOCALAPPDATA%\TalkBar`.

| Control | What it does |
| --- | --- |
| **Open data folder** | Opens TalkBar's data folder in File Explorer. |
| **Open logs folder** | Opens the folder with TalkBar's application logs. Support may ask you for these. |

To learn what is stored and where it goes, see [Privacy and your data](/data/privacy-and-your-data).

## Backup & restore

A complete backup is one ZIP file with the TalkBar database plus all session media and local files. Restoring replaces what is on this computer.

| Control | What it does | Default |
| --- | --- | --- |
| **Create backup** | Asks where to save the ZIP, then shows progress (files and size). You can **Cancel** while it runs. When it finishes, the page shows the file path, size, and how many workspaces and sessions it holds. | — |
| **Skip downloaded models (they download again when needed)** | Option in the **Create a complete backup?** dialog. Leaves downloaded AI and voice models out to keep the file smaller. | Off |
| **Restore backup** | Asks you to choose a TalkBar backup ZIP, shows what it contains, then restores it and restarts TalkBar (**Restore and restart**). | — |
| **Create a safety backup of current data first** | Option in the restore dialogs. Saves your current data before it is replaced. | On |

A backup made by a different TalkBar version that this version can't read is flagged in the restore dialog and can't be restored.

For step-by-step instructions, see [Backup and restore](/data/backup-and-restore).

## Recovery code

TalkBar encrypts your saved API keys, passwords and tokens in its own data, and keeps the key that unlocks them in the Windows keyring (Credential Manager). A recovery code lets you restore them if the keyring loses TalkBar's key, or after you copy TalkBar's data to another computer.

When you click **Set up**, choose **Generate a code** (safer), **Use my own password** (at least 12 characters) or **Use a code I already have**. Keep the code or password somewhere safe outside TalkBar.

| State | What you see | Actions |
| --- | --- | --- |
| No saved keys yet | "Available after you save your first API key, password or token." | **Set up** is turned off. |
| Off | A note that saved keys can't be restored without it. | **Set up** |
| On | "On, with a generated code." or "On, with your own password." | **Change**, **Remove** |
| Keys can't be read | "TalkBar can't read your saved keys on this computer", with how many are affected. | **Fix issue** |

Default: Off. Removing the code doesn't affect backups made earlier; they still open with the old code.

## Transfer to another device

A transfer file moves chosen data to TalkBar on another computer. Unlike a backup, a transfer file **adds** to what is already there instead of replacing it. Passwords and API keys never travel in a transfer file.

### Export data

**Export data** opens **Export data to a transfer file**. Choose what to include, then **Choose where to save**.

| Option | What it does | Default |
| --- | --- | --- |
| **Workspaces** | Which workspaces to include. Shown only if you have more than one. | The active workspace |
| **What to include** | Checkboxes for **Workspaces and projects**, **Settings, templates and AI setup**, **Knowledge, documents and people**, **Session series and calendars**, **Sessions and transcripts**, **Notes** and **AI chats**. | All checked |
| **Which sessions** | **All sessions in the chosen workspaces**, **Sessions in selected projects**, **Sessions in selected series** or **Selected sessions** (pick them with **Choose sessions**). | All sessions in the chosen workspaces |
| **Include session audio** | Adds the audio recordings. The dialog shows how much space audio adds. | Off |
| **Include items in Trash** | Also exports items that are in Trash. | On |

### Import data

**Import data** opens **Import data from a transfer file**. Click **Choose transfer file**, review what it contains, then pick **Where to put it**:

| Option | What it does | Default |
| --- | --- | --- |
| **Merge into a workspace** | Everything lands in the workspace you choose. | Selected, with the active workspace |
| **Create a new workspace** | Everything lands in one new workspace that you name. | — |
| **Keep the original workspaces** | Recreates the file's workspaces with their names. Existing workspaces with the same identity are merged. | — |

If the file has more sessions than your plan allows, choose **Stop; I will free up space first** (default) or **Import anyway and move the oldest extra sessions to Trash**. If it needs another workspace or more projects than your plan allows, the dialog tells you before you import.

After an import, **Reconnect these services** lists anything you need to set up again, such as an AI provider, a notification channel, an export destination or share branding, each with an **Open settings** button.

## Danger zone

These actions empty or erase data on this computer. Each one asks you to confirm before it runs.

| Control | What it does |
| --- | --- |
| **Reset workspace data** | Pick a workspace from the list, then **Reset workspace**. Erases its sessions, notes, documents and files. The workspace name and profile stay. You confirm by typing the workspace name. **Create a safety backup of current data first** is on by default. |
| **Reset database** | Starts over with an empty database and restarts TalkBar (**Reset and restart**). Downloaded voice models, voice settings and speaker profiles are kept. The old database is moved into a backup folder inside TalkBar's data folder, not deleted. Use this if TalkBar won't start after an update. |
| **Reset all data** | Erases all TalkBar workspace data and settings on this computer and restarts with a fresh database (**Erase and restart**). You confirm by typing this computer's device name. This can't be undone. |

::callout{icon="i-heroicons-exclamation-triangle" color="red"}
**Reset all data** can't be undone. Create a backup first if there is anything you may want later.
::

::callout{icon="i-heroicons-lock-closed" color="gray"}
If your organization manages TalkBar on this computer, some buttons here may be turned off with a note that your organization manages this setting.
::

## Related

- [Backup and restore](/data/backup-and-restore)
- [Privacy and your data](/data/privacy-and-your-data)
- [Account and workspaces](/settings/account-and-workspaces)
- [Troubleshooting](/help/troubleshooting)
