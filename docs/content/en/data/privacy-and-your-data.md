---
title: Privacy and your data
description: Where TalkBar keeps your data, exactly what leaves your computer and when, how to turn off usage statistics, and how to delete what you no longer need.
navigation:
  icon: i-heroicons-shield-check
---

TalkBar is local-first. Your recordings, transcripts, summaries, notes, chats and knowledge are stored on your computer, not in a TalkBar cloud. Data leaves your computer only for things you choose, such as a cloud AI provider, a shared page or an export, plus a few app services listed below.

## What stays on your computer

Everything you create in TalkBar lives in its data folder, `%LOCALAPPDATA%\TalkBar` on Windows:

- session recordings, transcripts, timelines and summaries;
- notes, chats with Ask TalkBar, knowledge cards, documents, people and companies;
- your settings, templates and skills;
- downloaded speech and AI models.

There is no TalkBar account that stores your content. To keep a copy, make a [backup](/data/backup-and-restore). Saved API keys, passwords and tokens are stored encrypted, with the key in your system's keyring.

## What leaves your computer, and when

| What | Where it goes | When |
| --- | --- | --- |
| Text of AI requests | The AI provider you set up, or Ollama on another computer | Only when a feature uses that provider. Built-in local models and Ollama on this computer send nothing. |
| A shared page | talkbar.link, TalkBar's share link service | When you publish a link, or an automatic sharing rule does |
| Invitations for **Specific people** | TalkBar's mail service, to the addresses you enter | When you publish a link for specific people with invitations on |
| Sent content and notices | Your email provider, Telegram, Slack, Microsoft Teams or your webhook | When you send content, or a channel's automatic notices or a sharing rule fire |
| Exports | Your folder, or Notion for a Notion page destination | When you or an export rule export a session |
| Update checks | TalkBar's update server: your TalkBar version and system type | When TalkBar checks for updates |
| Model downloads | A download request to the site that hosts the model (Hugging Face for TalkBar's built-in models) | When you download a speech or local AI model |
| License checks | TalkBar's license service: license and device details | Only with an activated license, at startup and about once a week |
| Anonymous usage statistics | TalkBar's statistics server | While **Share usage statistics** is on |
| Messages to support | TalkBar's team | When you send **Contact us**, with the details you choose to include |

TalkBar never uploads your session recordings on its own. Audio leaves your computer only if you include it in an export to a Notion page, or if a note you share contains audio clips.

## AI and your data

Each AI feature uses the route you set, so you decide where it runs:

| AI route | Where it runs | What leaves your computer |
| --- | --- | --- |
| Built-in model | This computer | Nothing |
| Ollama on this computer | This computer | Nothing |
| Ollama on another computer | That computer | The text of each request, over your network |
| Your own API key | The provider you chose | Only the text the request needs |

**Private AI Mode** allows only the first two, with one switch. Speech-to-text always runs on your computer. See [How TalkBar uses AI](/ai/how-talkbar-uses-ai) and [Private AI Mode](/ai/private-ai-mode).

You can also keep parts of a conversation away from AI:

- **Ignore speaker** keeps a speaker's words out of AI features and exported text. See [Speakers](/voice/speakers).
- Each session has a privacy mode, and **Settings → General → Session defaults → Default privacy** sets it for new sessions:

| Mode | What it changes |
| --- | --- |
| **Normal** | Live recall, knowledge suggestions and search all work. |
| **Session only** | Live recall works, but the session doesn't feed search or suggestions later. |
| **No auto cards** | No cards pop up during the session. Ask AI and search still work; knowledge suggestions are off. |
| **Sensitive** | Recall, Ask AI, suggestions and search are off for this session. |

AI tools you connect through MCP can read and change only what you allow in **Settings → MCP Access**. What they do with that data is up to the tool. See [MCP access and permissions](/mcp/access-and-permissions).

## Anonymous usage statistics

To help improve TalkBar, the app can send anonymous usage statistics. This is on by default. The statistics cover:

- app starts and quits, and daily use;
- which main sidebar sections you open;
- when you start or schedule a session;
- your TalkBar version, plan and release channel, and whether it is a Preview version;
- a random device ID created by TalkBar.

Your name, email and account are never sent with them. Recordings, transcripts, notes and chats are never included, and no statistics are gathered from their content.

**To turn them off:** open **Settings → General** and turn off **Share usage statistics**. When it is off, nothing is sent. On a company computer, your organization may have turned them off already.

::screenshot{src="/screenshots/data/share-usage-statistics.png" alt="Settings, General page scrolled to the Share usage statistics section, showing its description and the on/off switch" caption="Turn off usage statistics in Settings → General"}
::

## Updates

TalkBar checks for new versions and, with **Automatic updates** on, downloads them and applies them the next time it starts. Every update is signed, and TalkBar checks the signature before installing it. On a paid plan you can turn **Automatic updates** off in **Settings → General → Updates**; on the Free plan they are always on. See [Install and update](/getting-started/install-and-update).

## Retention controls

Choose what TalkBar keeps, and for how long.

| Setting | Where | What it does | Default |
| --- | --- | --- | --- |
| **Delete audio when a session ends** | **Settings → Voice** | Removes the recording after you stop. Transcript, timeline and summaries stay; playback and enhancing from audio are no longer possible. | Off |
| **Automatically move old sessions to Trash** | **Settings → General → Session retention** | Moves old sessions to Trash when TalkBar starts, by **Keep at most** (newest sessions per workspace) and **Move sessions older than**. Pinned sessions and active recordings are never moved. **Move to Trash now** applies it right away. | Off |
| **Automatically empty Trash** | **Settings → General → Trash cleanup** | Permanently deletes trashed sessions and notes after **Keep Trash items for** (7, 14, 30, 60 or 90 days). | On, 30 days |

To delete the audio of one session, open its menu and choose **Audio Player → Delete Audio**, then type `DELETE` to confirm.

::screenshot{src="/screenshots/data/retention-settings.png" alt="Settings, General page showing the Session retention section (Automatically move old sessions to Trash, Keep at most, Move sessions older than) and the Trash cleanup section (Automatically empty Trash, Keep Trash items for)" caption="Session retention and Trash cleanup"}
::

## Trash

Sessions, notes and chats each have a Trash view. Items in Trash can be restored until they are deleted for good.

- **Restore** brings an item back.
- **Delete permanently** (**Delete forever** for chats) removes one item.
- **Empty Trash** permanently deletes everything in that Trash.

Permanently deleting a session removes its transcript, audio, session files and session-only data. Its knowledge cards, action items and drafts to review are kept. Action items don't go to Trash; deleting one is permanent.

Deleted workspaces and projects work the same way: they are hidden first, and their content stays on disk until you delete them permanently. See [Account and workspaces](/settings/account-and-workspaces).

## Deleting your data

| To remove | Do this |
| --- | --- |
| One item | Move it to Trash, then **Delete permanently**, or let Trash cleanup do it. |
| A recording, keeping the transcript | **Audio Player → Delete Audio** in the session's menu. |
| A shared page | Revoke the link in **Manage links**. Search engines may keep a copy of pages you allowed them to list. See [Share links](/sharing/share-links#update-or-revoke-a-link). |
| One workspace's content | **Settings → Data & Backup → Reset workspace data**. |
| Everything on this computer | **Settings → Data & Backup → Reset all data**, then delete the `backups` folder in the data folder. |

Backups, transfer files and exported files are ordinary files you created. TalkBar doesn't track or delete them; remove them yourself when you no longer need them. See [Backup and restore](/data/backup-and-restore#resets) for what each reset keeps.

## A note on recording consent

TalkBar removes the meeting bot, not your responsibilities. Recording-consent rules vary by region and by type of call. Tell everyone present that they are being recorded, and get their consent where the law requires it.

When a session starts, TalkBar shows a reminder about this. You can turn it off with **Recording notice** in **Settings → General → Session defaults**; TalkBar asks you to confirm that you understand your obligations first.

## Related

- [Backup and restore](/data/backup-and-restore)
- [How TalkBar uses AI](/ai/how-talkbar-uses-ai)
- [Private AI Mode](/ai/private-ai-mode)
- [Share links](/sharing/share-links)
- [General settings](/settings/general)
- The full privacy policy: [www.talkbar.app/privacy](https://www.talkbar.app/privacy)
