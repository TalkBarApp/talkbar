---
title: Privacy policy
description: How the TalkBar application handles your information — what stays on your computer, what can leave it, and how you can access or delete your data.
navigation: false
---

This policy describes how the TalkBar desktop application handles your information. It applies to TalkBar on Mac and Windows, including versions distributed through app stores.

For a guide to the privacy controls in the app, see [Privacy and your data](/data/privacy-and-your-data).

## Local-first processing

TalkBar is local-first. Your recordings, transcripts, summaries, notes, chats and knowledge are stored on your computer, not in a TalkBar cloud. There is no TalkBar account that stores your content. Data leaves your computer only for things you choose, such as a cloud AI provider, a shared page or an export, plus a few app services listed below.

Conversation records, transcripts, summaries and local app settings are not sent to TalkBar's license service. That service only knows your license status.

## What stays on your computer

Everything you create in TalkBar lives in its data folder, which you can open from **Settings → Data & Backup → Open data folder**:

- session recordings, transcripts, timelines and summaries;
- notes, chats with Ask TalkBar, knowledge cards, documents, people and companies;
- your settings, templates, skills and custom translations;
- meetings imported from your calendars, and copies of imported `.ics` files;
- downloaded speech and AI models.

Saved API keys, passwords and tokens are stored encrypted, with the key in your system's keyring. To keep a copy of your workspace, make a [backup](/data/backup-and-restore).

## What can leave your computer, and when

| What | Where it goes | When |
| --- | --- | --- |
| Text of AI requests | The AI provider you set up, or Ollama on another computer | Only when a feature uses that provider. Built-in local models and Ollama on this computer send nothing. |
| A shared page | talkbar.link, TalkBar's share link service | When you publish a link, or an automatic sharing rule does |
| Invitations for **Specific people** | TalkBar's mail service, to the addresses you enter | When you publish a link for specific people with invitations on |
| Sent content and notices | Your email provider, Telegram, Slack, Microsoft Teams or your webhook | When you send content, or a channel's automatic notices or a sharing rule fire |
| Exports | Your folder, or Notion for a Notion page destination | When you or an export rule export a session |
| Update checks | TalkBar's update server: your TalkBar version and system type | When TalkBar checks for updates. The Mac App Store version is different; see [App updates](#app-updates) |
| Model downloads | A download request to the site that hosts the model (Hugging Face for TalkBar's built-in models) | When you download a speech or local AI model |
| Calendar subscriptions | A read request to the calendar address you added, and nothing else | When TalkBar checks a subscribed calendar for changes |
| License checks | TalkBar's license service: license and device details | Only with an activated license, at startup and about once a week |
| Anonymous usage statistics | TalkBar's statistics server | While **Share usage statistics** is on |
| Messages to support | TalkBar's team | When you send **Contact us**, with the details you choose to include |
| Translation suggestions | TalkBar's team | Only when you send your custom translations with **Send suggestions** |

TalkBar never uploads your session recordings on its own. Audio leaves your computer only if you include it in an export to a Notion page, or if a note you share contains audio clips.

## AI providers and services you connect

Each AI feature uses the route you set, so you decide where it runs:

| AI route | Where it runs | What leaves your computer |
| --- | --- | --- |
| Built-in model | This computer | Nothing |
| Ollama on this computer | This computer | Nothing |
| Ollama on another computer | That computer | The text of each request, over your network |
| Your own API key | The provider you chose | Only the text the request needs |

**Private AI Mode** allows the first two, with one switch. It also allows an Ollama server on another computer when TalkBar counts it as local: an IP address, a `.local` name, a name without dots, or a host you chose **Treat as local** for. Requests to that server still travel over your network. Cloud providers and CLI tools are blocked. Speech-to-text always runs on your computer. See [How TalkBar uses AI](/ai/how-talkbar-uses-ai) and [Private AI Mode](/ai/private-ai-mode).

Before a cloud AI provider first gets meeting content, TalkBar asks for your consent once for that provider.

AI tools you connect through MCP can read and change only what you allow in **Settings → MCP Access**. What they do with that data is up to the tool. See [MCP access and permissions](/mcp/access-and-permissions).

You can also keep parts of a conversation away from AI. **Ignore speaker** keeps a speaker's words out of AI features and exported text. Each session has a privacy mode, and **Settings → General → Session defaults → Default privacy** sets it for new sessions. The modes and what they change are described in [Privacy and your data](/data/privacy-and-your-data#ai-and-your-data).

## Licensing and payments

TalkBar does not collect or store full payment card details.

If you pay for TalkBar through an app store, that store processes the payment under its own privacy policy. TalkBar may keep the store's signed transaction records on your computer.

If you activate a license in TalkBar, the app sends license and device details to TalkBar's license service at startup and about once a week. That service uses basic technical information (device ID, operating system and app version) solely to bind the license to a device and enforce the device limit.

When a license is issued through TalkBar's license service, that service stores the name and email provided at checkout, and payment metadata (transaction IDs, payment status and payment method). Financial operations are processed by the payment partners Stripe, PayPal and YooKassa. A transactional email service delivers license emails and receipts. This information is used to issue, deliver and activate licenses, to provide access to the license management portal, to provide support, and to prevent fraud and abuse.

## App updates

Some versions of TalkBar check TalkBar's update server, sending the app version and system type. Every update is signed, and TalkBar checks the signature before installing it. Depending on the version, you may be able to turn **Automatic updates** off in **Settings → General → Updates**.

The Mac App Store version checks Apple's lookup service for the App Store version, sending the app's bundle identifier only — nothing about you or your computer. Updates for that version are delivered by the App Store.

## Anonymous usage statistics

To help improve TalkBar, the app can send anonymous usage statistics. This is on by default. The statistics cover:

- app starts and quits, and daily use;
- which main sidebar sections you open;
- when you start or schedule a session;
- when your plan is upgraded;
- your TalkBar version, plan and release channel, and whether it is a Preview version;
- a random device ID created by TalkBar.

Your name, email and account are never sent with them. Recordings, transcripts, notes and chats are never included, and no statistics are gathered from their content.

To turn them off, open **Settings → General** and turn off **Share usage statistics**. When it is off, nothing is sent. On a company computer, your organization may have turned them off already.

## Calendar sync and custom translations

Calendar sync is one-way. For a subscribed calendar, TalkBar contacts only the address you add, on the schedule you set, and downloads the calendar. It never writes to your calendar and sends none of your sessions or notes to it. Your optional calendar email is used on this computer to skip meetings you declined; it isn't sent anywhere. Importing an `.ics` file uses no network at all.

Custom translations stay on this computer. Nothing is sent unless you click **Submit custom translations** and then **Send suggestions**. If you do, TalkBar's team receives the language; for each phrase you select, the English text, the shipped translation and your wording; your name and email, and your comment and screenshots if you add them; and, with the include-details box on (it is on by default), your app version, system and device ID, plus your license ID if you have a license.

## Retention and deletion

You choose what TalkBar keeps on your computer, and for how long. Settings include deleting audio when a session ends, automatically moving old sessions to Trash, and automatically emptying Trash. You can delete a recording, a session, a note, a chat, a workspace or everything on this computer from inside the app. The controls are described in [Privacy and your data](/data/privacy-and-your-data#retention-controls).

To remove a shared page, revoke the link in **Manage links**. Search engines may keep a copy of pages you allowed them to list.

Backups, transfer files and exported files are ordinary files you created. TalkBar doesn't track or delete them; remove them yourself when you no longer need them.

For information TalkBar stores on its own services — for example license records, or a shared page until you revoke the link — you may request access, correction or deletion as described below.

## Third parties

TalkBar does not sell, rent or share your personal data with third parties for marketing or any other commercial purpose.

When you connect a service of your own (an AI provider, Ollama on another computer, Notion, email, Telegram, Slack, Microsoft Teams, a webhook or a calendar address), the data you send goes to that service under its terms. TalkBar has no access to an AI provider account you set up with your own key, beyond sending the text of each request you run.

TalkBar's own services involved in the cases above are the share link service (talkbar.link), the mail service used for invitations, the license service, the update server, the statistics server, and the team that receives support messages and translation suggestions. Payment partners and the transactional email service used for licenses are described under [Licensing and payments](#licensing-and-payments).

## Your rights

You may at any time request information about what data TalkBar stores about you, and request its correction or complete deletion. Contact the TalkBar team from the app (**Help → Contact us**) or by email at **contact@talkbar.app**.

You can also delete the data that lives on your computer yourself, using the controls in [Privacy and your data](/data/privacy-and-your-data#deleting-your-data).

## Recording consent

TalkBar removes the meeting bot, not your responsibilities. Recording-consent rules vary by region and by type of call. Tell everyone present that they are being recorded, and get their consent where the law requires it.

When a session starts, TalkBar shows a reminder about this. You can turn it off with **Recording notice** in **Settings → General → Session defaults**; TalkBar asks you to confirm that you understand your obligations first.

## Contact

- In the app: **Help → Contact us** in the title bar, or **Contact us** at the bottom of the Settings sidebar
- By email: **contact@talkbar.app**
