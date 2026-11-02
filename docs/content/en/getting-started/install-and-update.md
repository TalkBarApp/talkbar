---
title: Install and update
description: Download TalkBar, install it, keep it up to date automatically, choose beta updates, and uninstall it.
navigation:
  icon: i-heroicons-arrow-down-tray
---

Download TalkBar for your computer from GitHub, install it, and keep it up to date.

## Download and install

::platform-tabs
#windows
1. Open the [latest release](https://github.com/TalkBarApp/talkbar/releases/latest) on GitHub.
2. Under **Assets**, download `TalkBar_<version>_x64-setup.exe`.
3. Run the installer and follow the steps.

The installer is digitally signed. If Microsoft Edge WebView2 Runtime is missing, the installer sets it up using an internet connection.
#macos
A Mac version is in progress. When it is ready, its download and instructions will be on the [latest release](https://github.com/TalkBarApp/talkbar/releases/latest) page.
::

## First launch

The first time you open TalkBar, the welcome window guides you through setup: your name, the app language, where AI runs, and the speech and speaker models every session needs. Setup can't be skipped, but you can quit and continue where you left off the next time you open TalkBar. See [First-run setup](/getting-started/first-run-setup).

When you close the main window, TalkBar keeps running in the system tray. To exit completely, click the TalkBar logo and choose **Quit TalkBar**.

## Automatic updates

TalkBar checks for updates in the background. When a new version is available, it downloads it and applies it the next time TalkBar starts.

A banner at the top of the window keeps you informed:

| Banner | What it means |
| --- | --- |
| **TalkBar {version} is available** | A new version was found. Click **Download update** to get it now, or **Release notes** to see what changed. |
| **TalkBar {version} is available**, with **Restart TalkBar to finish updating to {version}** | The update is downloaded and ready. Click **Restart to update**, or keep working and it installs the next time TalkBar starts. |
| **TalkBar {version} is available**, with a note that your license includes versions released until a certain date | This version would use the Free plan. Click **Renew updates** to keep your plan in it, or **Install anyway** to install it now. **Release notes** shows what changed. |
| **TalkBar has been updated** | The update was installed. Click **Release notes** to see what is new. |

If preparing the update fails, the banner says why and offers **Retry preparing update**.

You can't restart to update while a recording, dictation or transcript processing is running. TalkBar asks you to finish first.

::screenshot{src="/screenshots/getting-started/update-banner.png" alt="Update banner at the top of the TalkBar main window reading 'TalkBar x.y.z is available' and 'Restart TalkBar to finish updating to x.y.z', with the Restart to update and Release notes buttons" caption="The update banner"}
::

### Check for updates yourself

- Click the TalkBar logo in the title bar and choose **Check for updates**.
- Or, in Settings, click **Check for Update** at the bottom of the Settings sidebar.

If TalkBar is already current, you see **You are up to date**.

### Turn automatic updates off

The **Automatic updates** setting is in **Settings → General → Updates**.

| Setting | What it does | Default |
| --- | --- | --- |
| **Automatic updates** | Downloads updates automatically and applies them the next time TalkBar starts. On a paid plan you can turn it off. On the Free plan it is always on. | On |
| **Beta updates** | Receives only beta releases, to test new features. Turn it off to check only production releases. | Off |

If your license includes updates released up to a certain date, the Updates section shows that date. For a newer version, TalkBar asks before installing it, even with automatic updates on, because that version would use the Free plan. See [Plans and license](/data/plans-and-license).

::callout{icon="i-heroicons-information-circle" color="gray"}
If your organization manages TalkBar, update settings may be locked and show **Your organization manages this setting.** It can also force automatic updates on or off, or turn off manual update checks. See [Admin policy](/settings/admin-policy).
::

## Release channels

| Release | Version looks like | For |
| --- | --- | --- |
| Latest release | `vX.Y.Z` | Everyone |
| Beta pre-release | `vX.Y.Z-beta.N` | Beta testers trying new features. Turn on **Beta updates** to receive them. |

### Leave the beta

Turn off **Beta updates** in **Settings → General → Updates**. You keep your current beta version until a newer production release is available, and then TalkBar updates to it.

If an older production version is available, a **Return to production** button also appears. It installs that older version. Your beta data may not be compatible with it, so TalkBar shows a warning and creates a database backup before installing.

## Signed updates

Every update is signed, and TalkBar checks the signature before installing it. If the check fails, the update is not installed and you see **The update could not be verified. Try again later.**

## Uninstall TalkBar

::platform-tabs
#windows
Uninstall TalkBar from the **Apps** section of Windows Settings.
#macos
Quit TalkBar and remove the app using the usual macOS app removal method.
::

Before you uninstall, make a backup if you might want your sessions later: **Settings → Data & Backup → Create backup** saves your data into a ZIP file. See [Backup and restore](/data/backup-and-restore).

Your sessions, recordings, notes and downloaded models live in the TalkBar data folder. Before uninstalling, locate it with **Settings → Data & Backup → Open data folder**. To remove all of your TalkBar data from the computer, check that this folder is gone after uninstalling, and delete it if it is still there.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Deleting the data folder permanently removes your sessions, recordings, notes and knowledge. Create a backup first if you are not sure.
::

## Related

- [First-run setup](/getting-started/first-run-setup)
- [Backup and restore](/data/backup-and-restore)
- [General settings](/settings/general)
- [Troubleshooting](/help/troubleshooting#updates)
