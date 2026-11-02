---
title: Backup and restore
description: Find TalkBar's data folder, make a complete ZIP backup, restore it, move to another computer, and understand what each reset deletes.
navigation:
  icon: i-heroicons-archive-box
---

TalkBar keeps your sessions, recordings, notes and knowledge on this computer. Back them up regularly, and always before a reset or before you move to another computer. Everything on this page is in **Settings → Data & Backup**.

## The data folder

Open the data folder from **Settings → Data & Backup → Open data folder**. Under **This device**:

- **Open data folder** opens it in your file manager.
- **Open logs folder** opens the log files, which support may ask for.

The data folder holds TalkBar's database, your recordings and session files, note media, and downloaded models. Don't move or edit files in it by hand; use a backup instead.

::screenshot{src="/screenshots/data/data-and-backup-settings.png" alt="Settings, Data & Backup page showing the This device section with Open data folder and Open logs folder, the Backup & restore section with Create backup and Restore backup, and the Recovery code section" caption="Settings → Data & Backup"}
::

## Create a backup

1. Click **Create backup**.
2. Optionally tick **Skip downloaded models (they download again when needed)**. Models can be several gigabytes.
3. Click **Create backup** and choose where to save the ZIP file, for example an external drive or a cloud-synced folder.

TalkBar shows its progress, and you can **Cancel** at any time. When it finishes, it shows the file's location, its size, and how many workspaces and sessions it contains.

The backup contains the TalkBar database and all session media and local files on this device: recordings, transcripts, notes, knowledge, settings and, unless you skipped them, downloaded models.

::callout{icon="i-heroicons-light-bulb" color="primary"}
A backup can be large because it includes every recording. Keep at least one recent backup somewhere other than this computer.
::

### Passwords, API keys and tokens

TalkBar stores your API keys, email passwords, bot tokens, webhook URLs and Notion tokens encrypted. The key that unlocks them is kept in this computer's system keyring, not in the data folder. A backup therefore carries them only in encrypted form.

To be able to use them on another computer, or if this computer's keyring is ever reset, set up a **Recovery code** first:

1. In **Settings → Data & Backup → Recovery code**, click **Set up**.
2. Choose **Generate a code**, **Use my own password** (at least 12 characters) or **Use a code I already have**.
3. For a generated code, copy it or click **Save as a file**, and tick **I saved this code somewhere safe**. Then click **Turn on**.

Keep the code like a password: anyone who has your TalkBar data and this code can read your saved keys. A password manager or a printed copy is safer than a file on the same computer. You can set up a recovery code once you have saved your first API key, password or token. Until you do, TalkBar may remind you with **Protect your saved keys**.

## Restore a backup

1. Click **Restore backup**.
2. Leave **Create a safety backup of current data first** ticked unless you are sure you don't need the current data. The safety copy is saved next to the backup you restore, named `talkbar-pre-restore-….zip`.
3. Click **Choose backup file** and pick a TalkBar backup ZIP.
4. TalkBar checks the file and shows when it was made, with which TalkBar version, and what it contains. Click **Restore and restart**.

TalkBar restarts and replaces the data on this computer with the backup. Downloaded models already on this computer and the logs are kept.

A backup made by a different version of TalkBar can't be restored by this version; TalkBar tells you before anything changes. Update TalkBar to the same version on both computers first.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
On a company computer, your administrator can turn off backup, restore and resets. The affected rows then show your organization's rule.
::

## Move to another computer

You have two options:

| | Backup and restore | Transfer file |
| --- | --- | --- |
| What moves | Everything | Only what you choose: workspaces, settings, series and calendars, sessions, notes, knowledge or chats |
| On the new computer | Replaces all data there | Adds to what is already there; nothing is deleted |
| Session audio | Always included | Optional |
| Saved keys and passwords | Included encrypted; readable with your recovery code | Never included |

### With a backup

1. On the old computer, set up a [recovery code](#passwords-api-keys-and-tokens), then create a backup.
2. Install TalkBar on the new computer, at the same version, and open it.
3. Restore the backup there.
4. TalkBar shows a notice that it can't read your saved keys on this computer. Click **Fix**, then enter your code under **Restore with your recovery code**. Without a code, choose **Start fresh** and enter your keys and passwords again.
5. Activate your license on the new computer. The license is not part of the backup. See [Plans and license](/data/plans-and-license#move-a-license-to-another-computer).

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
If you **Start fresh**, TalkBar can no longer update or revoke share links you published from the old data. Links without an expiry stay available until they are revoked. To use your custom branding again, connect it with its brand key.
::

### Transfer to another device

Use **Transfer to another device** when you want to copy only some of your data, or add it to a computer that already has TalkBar data.

1. On the old computer, click **Export data**.
2. Choose the **Workspaces**, **What to include**, and **Which sessions**: all sessions in the chosen workspaces, sessions in selected projects or series, or **Selected sessions**.
3. Optionally tick **Include session audio** (this makes the file much larger) and **Include items in Trash**.
4. Click **Choose where to save**. TalkBar writes a `talkbar-transfer-….zip` file.
5. On the new computer, open **Settings → Data & Backup → Import data**, click **Choose transfer file**, and choose **Where to put it**: **Merge into a workspace**, **Create a new workspace** or **Keep the original workspaces**.
6. Click **Import**.

If the file holds more sessions than the new computer's plan allows, TalkBar asks whether to stop, or to import anyway and move the oldest extra sessions to Trash.

Passwords and API keys never travel in a transfer file. After the import, TalkBar lists the services to reconnect (AI providers, notification channels, export destinations, calendars, share branding) with a link to each one's settings. A calendar subscription's address isn't in the file, so you add it again. Shared links and export history stay with the old computer.

::screenshot{src="/screenshots/data/transfer-export-dialog.png" alt="The Export data to a transfer file dialog, with workspace checkboxes, the What to include list (Workspaces and projects; Settings, templates and AI setup; Knowledge, documents and people; Session series and calendars; Sessions and transcripts; Notes; AI chats), Which sessions options and the Include session audio checkbox" caption="Choosing what goes into a transfer file"}
::

## Resets

All resets are in the **Danger zone**. Create a backup first.

| Reset | What it deletes | What stays |
| --- | --- | --- |
| **Reset workspace data** | The sessions, notes, documents and files of one workspace. You choose the workspace and type its name to confirm; a safety backup is offered first. This cannot be undone. | The workspace name and profile, and all other workspaces. |
| **Reset database** | Starts over with an empty database and restarts TalkBar. Meant for when TalkBar will not start after an update. | Downloaded voice models, voice settings and speaker profiles. The old database, workspace files and recordings are moved into a `reset-…` folder inside the `backups` folder in the data folder, not deleted. |
| **Reset all data** | All local workspace data and settings. TalkBar restarts with a fresh database. You type this computer's device name to confirm. | Downloaded models, logs and the `backups` folder. |

After **Reset database**, **Reset all data** and **Restore backup**, TalkBar keeps the previous data in the `backups` folder inside the data folder. It keeps the two most recent copies of each kind and removes older ones. These copies can take a lot of space; delete the folders you don't need once you are sure.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Treat **Reset workspace data** and **Reset all data** as permanent. If you want your data removed from this computer for good, also delete the `backups` folder in the data folder after the reset.
::

## Related

- [Data & Backup settings](/settings/data-and-backup)
- [Privacy and your data](/data/privacy-and-your-data)
- [Plans and license](/data/plans-and-license)
- [Troubleshooting](/help/troubleshooting)
