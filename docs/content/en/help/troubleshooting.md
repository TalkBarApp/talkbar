---
title: Troubleshooting
description: Fix common problems with recording, transcripts, AI providers, model downloads, imports, sharing, calendars and updates, and find out how to get help.
navigation:
  icon: i-heroicons-wrench-screwdriver
---

Keyboard shortcuts shown below are Windows defaults. On macOS, check the shortcut shown in TalkBar or its settings; configurable shortcuts can be changed there.

Most problems have a quick fix. Start with Settings Doctor, then look for your problem below. If you're still stuck, contact the TalkBar team from inside the app.

## Start with Settings Doctor

Open **Settings → Doctor** and click **Run all checks**. Settings Doctor checks your setup and points every finding at the place that fixes it. Each check shows **OK**, **Needs a look** or **Issue**, with a button that takes you to the fix.

| Group | What it checks |
| --- | --- |
| **AI** | AI routing, your providers, Private AI, CLI tools and Ollama. **Run all checks** also sends one tiny test request to your default model. |
| **Local Models** | Whether the models your features need are downloaded. |
| **Voice** | Your microphone and keyboard shortcuts. |
| **Notifications** | Your delivery channels. |
| **Application** | Saved keys, the app version and the database. |

::screenshot{src="/screenshots/help/settings-doctor.png" alt="Settings → Doctor page after Run all checks: the check groups AI, Local Models, Voice, Notifications and Application, each check with an OK, Needs a look or Issue badge and a fix button" caption="Settings Doctor"}
::

See [Help & Tours and Doctor](/settings/help-and-doctor).

## Recording

### "Microphone not found"

- Turn on or connect a microphone. TalkBar picks it up automatically and shows **Microphone connected**.
- In **Settings → Voice → Recording**, check the selected microphone and click **Start test** under **Test audio input**.
- Allow TalkBar microphone access in your system privacy settings.
- Pressed `Ctrl+Shift+M`? That shortcut mutes all microphone input to TalkBar. Press it again to unmute.

### "No audio detected yet — check your microphone or audio source."

- Check the audio source. **System audio** only records what your computer plays. To record yourself, choose **Microphone** or **Mic + System**.
- Use the audio source menu on the recording screen to switch devices.

### "Could not start the session"

If TalkBar says the voice model is not downloaded, open **Settings → Voice → Transcription** and select or download the live transcription model. Parakeet V3 is recommended.

### Speaker model warning in the New session window

Large meetings need an extra speaker model. Click **Download** in the warning, or manage speaker models in **Settings → Private Local AI → System models**.

### "Recording in progress" when starting a session

Another session is recording. Open it and stop it, or use **Schedule for later**. If an audio import is running, wait for it to finish or cancel it first.

### "Recording interrupted"

TalkBar stopped unexpectedly, for example because the app or computer closed. Everything transcribed so far was kept. Choose **Continue** to keep recording, or **Complete** to close the session and generate the summary. Under **More**, **Stop for now** saves what was recorded so you can continue later, and **Decide later** keeps the session interrupted for now.

### "Session audio still needs to be saved"

Your transcript and summary are safe. Click **Retry saving audio** to save the audio file again.

### "Leftover recording data" on the Sessions page

These recordings were cut off before a session could be created, so they can't be opened. Click **Discard** to free up space.

### "Microphone not available" in the dictation panel

Dictation needs a microphone. Connect one, or allow TalkBar microphone access in your system privacy settings, then close the panel and dictate again.

### A keyboard shortcut doesn't respond

Another app may already use it. TalkBar tells you when a shortcut is taken; choose a different one in Settings. **Settings → Doctor** lists any shortcuts that couldn't be registered. See [Getting around](/getting-started/getting-around#keyboard-shortcuts).

## Transcript and summary

### "Enhance transcript" isn't available

**Enhance transcript** needs a completed session and its saved recording. If **Delete audio when a session ends** is on in **Settings → Voice → Recording → Saved recording**, the audio is removed after you stop, and Enhance isn't available for those sessions.

### "Summary failed" or "Summary timed out"

- Click **Retry**, or **Change model** to pick a faster or more capable model.
- If a local model is slow, try **Settings → Private Local AI → Find my best model**.
- Very short sessions don't get an automatic summary. You can generate one from the summary panel when you're ready.

### The transcript is in the wrong language

Check **Transcription language** in **Settings → Voice → Transcription**. Some speech models detect the language automatically; others transcribe only certain languages. See [Recording and transcription](/voice/recording-and-transcription).

## AI and providers

### A banner says a feature "could not use" a model

- **Fix now** opens the problem in **Settings → AI Providers**.
- **Use Private AI** switches to local models, if you have them.

### A provider or model doesn't work

- In **Settings → AI Providers**, click **Test** next to the provider or model.
- The **Advanced** tab has **Diagnostics**: provider health, route readiness and recent runtime issues.
- For a cloud provider, check your API key and your account with the provider.
- For a local model, check that it is downloaded in **Settings → Private Local AI**.

See [Providers and models](/ai/providers-and-models) and [AI provider settings](/settings/ai-providers).

## Model downloads

- **"Not enough free space"**: TalkBar shows how much space the download needs and how much is free. Free up space on the drive, then download again.
- **"Download failed"**: check your internet connection, then click **Retry downloads** (during setup) or download the model again where you chose it.
- Speech models are in **Settings → Voice → Transcription**. Speaker detection models and other system models are in **Settings → Private Local AI → System models**. Built-in AI models are in **Settings → Private Local AI**.
- **Settings → Doctor → Local Models** shows which needed models are missing.

See [Local models](/ai/local-models).

## Importing recordings

### "Unsupported file type", "The file is empty", or the file is too large or too long

Use an mp3, wav, m4a, mp4, aac, flac, ogg, opus, mkv or webm file, up to 1 GB and 6 hours.

### "Audio import failed"

If part of the file was transcribed, it was kept: open the session. Otherwise try again, or choose a different transcription model. See [Importing recordings](/sessions/importing-recordings).

## Exports, sharing and notifications

- **An export failed.** Check that the destination folder exists and you can write to it, or reconnect Notion. **Settings → Export & Share → Export Session → Export history** has **Retry failed deliveries**.
- **A share failed, or shows "Delivery unconfirmed".** Open **Manage links** or **Sharing history**, then use **Retry failed deliveries**, **Resend failed invitations** or **Send content instead**.
- **Email or Telegram messages don't arrive.** In **Settings → Notifications**, click **Send Test** on the channel and fix any **Missing credentials**.
- **No desktop notifications.** In **Settings → Notifications → Desktop Notifications**, click **Send Test**. **System Settings** opens the system notification settings, where TalkBar notifications may be turned off.

See [Share links](/sharing/share-links), [Exports](/sharing/exports) and [Notifications](/sharing/notifications).

## Calendar sync

### A calendar shows "Last sync failed"

- Check your internet connection, then choose **Sync now** in the calendar's menu in **Settings → Calendar sync**.
- If you reset your calendar's secret address, paste the new one with **Edit…**.
- A calendar larger than 4 MB is refused.
- **Your organization turned off calendar subscriptions.** means subscriptions are locked on this computer. Importing an `.ics` file still works.

### Meetings from a calendar don't appear

- TalkBar imports timed events from 7 days back to 90 days ahead. All-day events and events marked as free time are left out, and so are meetings you declined, if you entered **Your calendar email (optional)**.
- Each calendar belongs to one workspace. Check that you are in the right one.
- A calendar marked **Paused** doesn't sync. Choose **Resume syncing** in its menu.
- An imported `.ics` file stays as it was. To update it, choose **Import a newer file…** in its menu.

### A meeting from a calendar has no reminder

**Remind me about** decides which meetings get reminders. By default, only meetings with a video link do. To change one meeting, click **Remind me** on its row. See [Muted meetings](/settings/calendar-sync#muted-meetings).

## Settings managed by your organization

### A setting is greyed out or marked "Managed by your organization"

An administrator set an admin policy on this computer. You can't change the locked settings, and what is already set up keeps working. Ask your administrator if you need a change. See [Settings managed by your organization](/settings/overview#settings-managed-by-your-organization).

### "The policy could not be read"

TalkBar uses the strictest settings until your administrator fixes the policy on this computer. See [Admin policy](/settings/admin-policy).

## Custom translations

### Your custom wording doesn't appear

- In **Settings → General → Application UI Language → Custom translations**, check that the switch next to **Custom translations** is on.
- Custom translations apply to one language on this computer. Check that you are using the language you changed.

### "Could not send your suggestions."

Check your internet connection and try again. If the message says there are too many translations, select fewer and send them in smaller batches. If you sent many messages in a short time, try again in a few minutes. See [Custom translations](/settings/general#custom-translations).

## Updates

- **"Could not check for updates"**: check your internet connection and try again from the TalkBar logo menu (**Check for updates**) or **Settings → Check for Update**.
- **"Could not download the update"**: follow the message. For example, free up disk space, then try again.
- **"The update could not be verified"**: the update's signature check failed, so it wasn't installed. Try again later.
- **"Could not restart to update"**: finish any recording, dictation or transcript processing, and wait for notes to finish saving, then click **Restart to update** again.

See [Install and update](/getting-started/install-and-update).

## If TalkBar stops working after an update

**Settings → Data & Backup → Danger zone → Reset database** starts over with an empty database and restarts TalkBar. Your sessions, transcripts, notes and knowledge are moved to a backup folder inside the TalkBar data folder, not deleted. Downloaded voice models, voice settings and speaker profiles are kept. Create a backup first if you can. See [Backup and restore](/data/backup-and-restore) before you use any reset.

### If TalkBar can't open at all

If TalkBar fails while starting, it shows a dialog instead of the main window: **TalkBar needs to reset its database**, **TalkBar's database is damaged** or **TalkBar could not start**.

- **Open Data Folder** opens the data folder so you can make your own backup. The dialog then comes back.
- **Reset and Restart** creates a new, empty database. The current database moves to a backup folder inside the data folder. Downloaded voice models, voice settings and speaker profiles are kept.
- **Quit** closes TalkBar and changes nothing.

If your organization turned off resetting data, the dialog says so. Ask your administrator for help.

## Logs

Logs help the TalkBar team find the cause of a problem. They are off by default and stay on your computer.

1. Open **Settings → General → Application Logs**.
2. Turn on **Enable application logs**. For problems with built-in AI, also turn on **Enable Local AI logs**.
3. Reproduce the problem.
4. Click **Open logs folder**. Log files are in the `logs` folder inside the TalkBar data folder.

You can also open the logs folder from **Settings → Data & Backup → This device**. Turn logging off again when you're done.

## Get help

Contact the TalkBar team from inside the app:

1. Click **Help → Contact us** in the title bar, or **Contact us** at the bottom of the Settings sidebar.
2. Under **What do you need help with?**, pick a topic, such as **Bug report** or **General question**.
3. Enter your email, a subject and a message. You can add up to 5 screenshots.
4. Leave **Include app version and system details** on to help the team find the problem faster.
5. Click **Send message**. The team replies by email.

The form doesn't attach log files. If the team asks for logs, send them by email to **contact@talkbar.app**, the address shown in the form under **Or send us a direct email:**.

::screenshot{src="/screenshots/help/contact-us.png" alt="Contact us window opened from Help → Contact us, with the What do you need help with? topic list, the Your name, Email, Subject and Message fields, the Screenshots (optional) drop area and the Include app version and system details checkbox" caption="The Contact us window"}
::

## Related

- [FAQ](/help/faq)
- [Help & Tours and Doctor](/settings/help-and-doctor)
- [Backup and restore](/data/backup-and-restore)
- [Your first session](/getting-started/first-session)
