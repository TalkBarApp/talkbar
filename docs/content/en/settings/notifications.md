---
title: Notifications
description: Every setting under Settings → Notifications — delivery channels for email, Telegram, Slack, Microsoft Teams and webhooks, and desktop notifications.
navigation:
  icon: i-heroicons-bell-alert
---

**Settings → Notifications** sets up where TalkBar sends notifications and shared content. The page has two sections: **Delivery Channels** and **Desktop Notifications**. For what gets sent and when, see [Notifications](/sharing/notifications).

## Delivery Channels

A delivery channel is a destination outside TalkBar: an email account, a Telegram bot, a Slack or Microsoft Teams channel, or your own webhook. Channels are used for the notifications you choose for each channel and for [sharing](/sharing/share-links). You can create as many channels as you like and turn each one on or off.

There are two ways to add a channel:

- **Add Channel** at the top of the page opens a step-by-step setup that explains where to get each credential and lets you send a test before you finish.
- **Create channel** in the Delivery Channels section opens the same fields as a single form.

Passwords, bot tokens, webhook URLs and header values are stored encrypted on this computer.

::screenshot{src="/screenshots/settings/notifications-delivery-channels.png" alt="Settings → Notifications showing the Delivery Channels list with an email channel and a Telegram channel, each with a provider badge, an on/off switch and Send Test, Edit and Delete buttons, and the Desktop Notifications section below" caption="Delivery channels and desktop notifications"}
::

### Channel types

| Channel type | What you need |
| --- | --- |
| **Email** | An email account that can send through SMTP. Choose **Gmail**, **Outlook**, **Yahoo** or **Custom SMTP**. Gmail, Outlook and Yahoo need an app password, and the setup links to where you create one. |
| **Telegram** | A bot token from @BotFather. The setup can verify the token and detect the chats the bot can post to. |
| **Slack** | An incoming webhook URL from Slack. |
| **Microsoft Teams** | A webhook URL from a Teams Workflows webhook trigger. |
| **Custom webhook** | Any HTTPS endpoint, with optional authentication headers. |

### Channel fields

Which fields appear depends on the channel type.

| Setting | What it does | Default |
| --- | --- | --- |
| **Channel type** | The kind of channel. Shown only when you create a channel. | **Email** |
| **Channel name** | The name shown in channel lists and share dialogs. Required. | — |
| **Provider** | Email only: **Gmail**, **Outlook**, **Yahoo** or **Custom SMTP**. Choosing a provider fills in the server settings. | **Gmail** |
| **SMTP host** | Email only. The outgoing mail server. | `smtp.gmail.com` (filled in from the provider) |
| **SMTP port** | Email only. | 587 |
| **Security** | Email only: **STARTTLS**, **TLS** or **None**. | **STARTTLS** |
| **SMTP username** | Email only. Usually your email address. | — |
| **SMTP password** | Email only. Your app password or SMTP password. | — |
| **From name** | Email only. The sender name recipients see. | — |
| **From email** | Email only. The sender address. | — |
| **Default email recipients (optional)** | Email only. Where notifications and test sends go by default. Separate addresses with a comma or a new line. If your organization allows email only to certain domains, addresses outside them are refused. | — |
| **Bot token** | Telegram only. Required. | — |
| **Bot username (optional)** | Telegram only. | — |
| **Default delivery chat IDs (optional)** | Telegram only. The chats the bot sends TalkBar notifications to by default. | — |
| **Webhook URL** | Slack, Microsoft Teams and Custom webhook. Required. Must use HTTPS. | — |
| Authentication headers | Custom webhook only. Click **Add authentication header** to add a **Header name** and **Header value** (up to 16). | None |
| **Automatic notifications** | The updates this channel receives: **Session completed**, **Summary ready**, **System alerts** and **Application events**. To send full summaries, use automatic sharing rules instead. | None selected |
| **Enable** | Shown when you edit a channel. A disabled channel sends nothing. | On |

::callout{icon="i-heroicons-light-bulb" color="primary"}
**Summary ready** sends a short notice, not the summary text. To send summaries to a channel, add an automatic sharing rule under [Settings → Export & Share](/settings/export-and-share#automatic-sharing).
::

### Managing channels

Each channel in the list shows its type and has:

- an on/off switch to enable or disable the channel;
- **Send Test**, which sends a test message. You can enter a destination for this single test, or leave it blank to use the channel defaults;
- **Edit**, where you can change fields and **Replace credentials**;
- **Delete**, which permanently deletes the channel.

A channel that failed its last delivery shows **Delivery error** with the reason. If TalkBar can't read a saved password or token on this computer, the channel asks you to enter it again.

## Desktop Notifications

| Setting | What it does | Default |
| --- | --- | --- |
| **Desktop Notifications** | The switch in the section header. While it is on, TalkBar shows reminders and activity as desktop notifications. | On |
| **System Settings** | Opens your operating system's notification settings, where you can allow or silence TalkBar. | — |
| **Send Test** | Shows a test desktop notification. Available while desktop notifications are on. | — |

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
If your organization manages TalkBar, some channel types or the whole Delivery Channels section may be locked. A notice explains which rule applies.
::

## Related

- [Notifications](/sharing/notifications)
- [Export & Share settings](/settings/export-and-share)
- [Share links](/sharing/share-links)
