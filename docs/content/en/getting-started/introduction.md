---
title: Introduction
description: TalkBar is a private AI note taker for Windows that records meetings and calls from your desktop and keeps your data on your computer.
navigation:
  icon: i-heroicons-sparkles
---

TalkBar records your meetings, calls and conversations right from your desktop, turns them into a transcript and summary, and remembers what matters. It is local-first: your sessions, notes and knowledge are stored on your computer, and you decide whether AI runs on this computer or with a provider you connect.

::screenshot{src="/screenshots/getting-started/talkbar-overview.png" alt="TalkBar main window showing a completed session: the sidebar on the left, and the session details page with its summary, speakers and timeline" caption="A recorded session with its summary and transcript"}
::

## Bot-free capture

TalkBar records from your own computer. It uses your microphone for your voice and your computer's audio for the other side of the call. No bot joins the meeting and nothing is added to the call.

Because it captures your computer's audio, it works with Zoom, Microsoft Teams, Google Meet, other meeting apps and calls in your browser. You choose what to record for each session: **Microphone**, **System audio**, or **Mic + System**.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
TalkBar removes the meeting bot, not your responsibilities. Telling people they are being recorded, and getting their consent where the law requires it, is up to you. TalkBar shows a recording reminder when a session starts.
::

## Local-first privacy at a glance

- **Transcription runs on your computer.** Speech-to-text uses a speech model downloaded to this device.
- **AI runs where you choose.** Use **Built-in AI** (a model downloaded to this computer), Ollama, an AI tool installed on this computer, or a cloud provider with your own API key. Each AI feature can use its own model.
- **Private AI Mode** keeps AI on local models only. One switch blocks cloud and CLI providers.
- **Your data stays in one folder** on your computer. Open it from **Settings → Data & Backup → Open data folder**. You can open it, back it up to a ZIP file and restore it.

Apart from what you start or set up yourself, such as exports, share links, notifications, calendar subscriptions and requests to your own AI provider, TalkBar uses the network for model downloads, update checks and anonymous usage statistics. You can turn usage statistics off in **Settings → General → Share usage statistics**. Recordings, transcripts, notes and chats are never included.

Read more in [How TalkBar uses AI](/ai/how-talkbar-uses-ai), [Private AI Mode](/ai/private-ai-mode) and [Privacy and your data](/data/privacy-and-your-data).

## Before, during and after a conversation

| When | What you can do |
| --- | --- |
| Before | Schedule a session with reminders, and prepare it with notes, documents, knowledge cards and open action items from last time. |
| During | Follow the live transcript by speaker, a running summary and timeline, knowledge cards that appear when the conversation reaches their topic, and **Ask AI** about what has been said so far. |
| After | Review the summary, decisions and action items, ask questions about the session, share a link or export it, and find it later with search. |

Between conversations you can also write notes, chat with your sessions and documents in **Chats**, dictate into any app, and keep the facts worth remembering as knowledge cards.

## System requirements

| Requirement | Details |
| --- | --- |
| Operating system | 64-bit Windows. A Mac version is in progress. Check the release for supported versions and hardware. |
| Disk space | Room for the speech, speaker and AI models you download, plus your recordings. First-run setup shows the size of each download and the free space on the drive. |
| Internet | Needed to download the installer and models, and for cloud AI providers, sharing, calendar subscriptions and updates. Transcription and Built-in AI run on this computer once their models are downloaded. |
| Audio | A microphone to record your own voice. Without one you can still record system audio. |

Local AI models run faster on more capable computers. During setup, the **Model Advisor** measures this computer and marks the model it recommends.

## Where to go next

::card-group
  ::card{title="Install and update" icon="i-heroicons-arrow-down-tray" to="/getting-started/install-and-update"}
  Download TalkBar, install it and keep it up to date.
  ::
  ::card{title="First-run setup" icon="i-heroicons-rocket-launch" to="/getting-started/first-run-setup"}
  What the welcome window asks and which models it downloads.
  ::
  ::card{title="Getting around" icon="i-heroicons-map" to="/getting-started/getting-around"}
  The sidebar, Home, search, shortcuts and tours.
  ::
  ::card{title="Your first session" icon="i-heroicons-play-circle" to="/getting-started/first-session"}
  Record and review a session from start to finish.
  ::
::

## Related

- [Recording a session](/sessions/recording)
- [Providers and models](/ai/providers-and-models)
- [Plans and license](/data/plans-and-license)
- [FAQ](/help/faq)
