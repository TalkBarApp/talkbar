---
title: FAQ
description: Short answers to common questions about TalkBar privacy, offline use, meeting apps, languages, consent, where your data lives, plans, Mac and MCP.
navigation:
  icon: i-heroicons-question-mark-circle
---

Quick answers to the questions people ask most. Each answer links to the page with the details.

## Privacy and data

### Does a bot join my meetings?

No. TalkBar records from your own computer, using your microphone and your computer's audio. Nothing joins or is added to the call. See [Introduction](/getting-started/introduction#bot-free-capture).

### Where is my data stored?

On your computer, in the TalkBar data folder. It holds your sessions, recordings, notes, knowledge and downloaded models. Open it from **Settings → Data & Backup → Open data folder**. See [Privacy and your data](/data/privacy-and-your-data).

### Does TalkBar send my recordings or transcripts anywhere?

Not unless you choose to. Transcription runs on your computer. Text leaves your computer only when you set it up: a cloud AI provider you connect, an Ollama server on another computer, a share link, an export to a cloud destination, or a notification channel. Anonymous usage statistics never include recordings, transcripts, notes or chats, and you can turn them off in **Settings → General → Share usage statistics**.

### What is Private AI Mode?

One switch that keeps AI on local models. While it's on, cloud and CLI providers are blocked, and AI uses only Built-in AI and Ollama servers that TalkBar counts as local. Sharing and export still work as usual. Turn it on from the TalkBar logo menu. See [Private AI Mode](/ai/private-ai-mode).

### Does calendar sync send my data anywhere?

No. For a subscribed calendar, TalkBar contacts only the address you add and downloads the calendar. It never writes to your calendar. An imported `.ics` file stays on this computer. See [Privacy and your data](/data/privacy-and-your-data#calendar-sync).

### Can I keep transcripts but not the audio?

Yes. Turn on **Delete audio when a session ends** in **Settings → Voice → Recording → Saved recording**. The transcript, timeline and summaries stay. Playback and **Enhance transcript** won't be available for those sessions. See [Recording and transcription](/voice/recording-and-transcription).

### Do I need to create an account?

No. Setup asks only for your name (and, if you like, your job title), and your profile stays on this device. See [First-run setup](/getting-started/first-run-setup).

## Recording

### Which meeting apps does TalkBar work with?

Any app that plays sound on your computer, because TalkBar records your computer's audio. That includes Zoom, Microsoft Teams, Google Meet, other meeting apps and calls in your browser. Choose **Mic + System** in the New session window to record both sides of a call.

### Can I record an in-person meeting?

Yes. Choose **Microphone** as the audio source, and set **Speakers** to roughly how many people will talk. See [Starting a session](/sessions/starting-a-session).

### Can I transcribe a recording I already have?

Yes. In the New session window, choose **Upload audio file**. TalkBar accepts mp3, wav, m4a, mp4, aac, flac, ogg, opus, mkv and webm files, up to 1 GB and 6 hours. See [Importing recordings](/sessions/importing-recordings).

### Who is responsible for recording consent?

You are. TalkBar shows a recording reminder when a session starts: telling everyone present that they are being recorded, and getting their consent where the law requires it, is your responsibility. Recording-consent rules vary by region and type of call. TalkBar cannot verify consent for you.

### Can TalkBar start recording when a meeting begins?

It can offer to. With session detection on, TalkBar listens on this computer for a conversation while your microphone is free, and the session bar offers to start a session. Nothing is saved until you start. Scheduled sessions can also start on their own. See [Getting around](/getting-started/getting-around#the-session-bar) and [Scheduling and preparing](/sessions/scheduling-and-preparing).

### Can TalkBar use my Google, Outlook or Apple calendar?

Yes, one way. In **Settings → Calendar sync**, subscribe to your calendar's address or import an `.ics` file, which is the way to go for Apple Calendar. Meetings become scheduled sessions with reminders. TalkBar only reads your calendar and never changes it. See [Calendar sync](/settings/calendar-sync).

## Languages and AI

### Which languages can TalkBar transcribe?

It depends on the speech model you choose in **Settings → Voice → Transcription**. Parakeet V3, the recommended model, detects the language automatically and covers European languages, including Russian and Ukrainian. Other models cover other languages, and the setting shows what each one supports. See [Recording and transcription](/voice/recording-and-transcription).

### Which languages is the app available in?

The interface is available in 15 languages, including English, Spanish, German, French, Italian, Russian, Japanese, Korean and Chinese. Change it in **Settings → General → Application UI Language**. See [Getting around](/getting-started/getting-around#interface-language).

### Can I change the wording of a translation?

Yes. **Custom translations** in **Settings → General → Application UI Language** lets you change phrases for the current language. Your changes stay on this computer unless you choose to send them to the TalkBar team with **Submit custom translations**. See [Custom translations](/settings/general#custom-translations).

### Does TalkBar work offline?

Yes, for the core work. Transcription runs on your computer, and with Built-in AI or Ollama on the same computer, summaries, chat and knowledge suggestions do too, once the models are downloaded. You need the internet to download models and updates, and for cloud AI providers, share links, cloud exports, notifications and calendar subscriptions.

### Which AI providers can I use?

**Built-in AI** on this computer, **Ollama**, AI tools installed on your computer (Claude Code, Codex, Agy CLI, Grok CLI or OpenCode), or a cloud provider with your own API key, such as Anthropic, OpenAI, Gemini or Groq. You can give each AI feature its own model. See [Providers and models](/ai/providers-and-models).

### Can AI assistants like Claude Desktop or Cursor use my TalkBar data?

Yes, through MCP. Set it up in **Settings → MCP Access**, where you also choose what connected clients may read and change. Recording, transcript editing, summary generation and settings stay in the app. See [MCP overview](/mcp/overview).

## Plans, platforms and updates

### Is TalkBar free?

There is a Free plan, and paid plans named Personal, Plus, Pro and Business. The Free plan has limits, such as 20 stored sessions, recordings of up to 30 minutes, one workspace and one project. Moving sessions to Trash frees space again. See [Plans and license](/data/plans-and-license).

### Is there a Mac version?

TalkBar runs on Windows now. A Mac version is in progress. See [Install and update](/getting-started/install-and-update).

### How do updates work?

TalkBar downloads updates in the background and applies them the next time it starts. Every update is signed, and TalkBar checks the signature before installing it. Want new features early? Turn on **Beta updates** in **Settings → General → Updates**. See [Install and update](/getting-started/install-and-update).

### Can I keep work and personal conversations apart?

Yes, with workspaces. Each workspace is fully separate, with its own sessions, notes, people and knowledge. Your plan sets how many workspaces you can have. See [Account and workspaces](/settings/account-and-workspaces).

### Why can't I change a setting marked "Managed by your organization"?

An administrator set an admin policy on this computer. Locked settings are greyed out, and what is already set up keeps working. Ask your administrator if you need a change. See [Settings managed by your organization](/settings/overview#settings-managed-by-your-organization).

### Can I lock TalkBar settings on a company computer?

Yes, with a Business license and the computer's administrator password. Turn on **Show Admin policy page** in **Settings → License**, then choose the rules in **Settings → Admin policy**. See [Admin policy](/settings/admin-policy).

### How do I move TalkBar to another computer?

Create a backup in **Settings → Data & Backup → Create backup**, copy the ZIP file to the new computer, install TalkBar there and choose **Restore backup**. See [Backup and restore](/data/backup-and-restore).

### Where do I get help?

Start with **Settings → Doctor → Run all checks** and [Troubleshooting](/help/troubleshooting). To reach the TalkBar team, click **Help → Contact us**.

## Related

- [Introduction](/getting-started/introduction)
- [Troubleshooting](/help/troubleshooting)
- [Privacy and your data](/data/privacy-and-your-data)
