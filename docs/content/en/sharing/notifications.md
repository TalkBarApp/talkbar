---
title: Notifications
description: Get desktop notifications and reminders, and send TalkBar notices to email, Telegram, Slack, Microsoft Teams or your own webhook.
navigation:
  icon: i-heroicons-bell
---

TalkBar tells you about reminders and activity with desktop notifications on this computer. It can also send short notices to other places through delivery channels: email, Telegram, Slack, Microsoft Teams or a custom webhook. Both are set up in **Settings → Notifications**.

## Desktop notifications

**Desktop Notifications** is on by default. While it is on, TalkBar shows reminders and activity as system notifications, for example:

- reminders for scheduled sessions (new scheduled sessions start with the reminders chosen in **Settings → General → Calendar → Default reminders**), and the countdown before a session starts automatically;
- a warning before an unattended session ends on its own (**Notify before a session auto-ends** in [Voice settings](/settings/voice)).

When the TalkBar window is in front, TalkBar shows these in the app instead, so you don't get the same notice twice.

In **Settings → Notifications → Desktop Notifications**:

| Control | What it does |
| --- | --- |
| **Desktop Notifications** switch | Turns desktop notifications from TalkBar on or off. |
| **System Settings** | Opens the system notification settings, where you can also allow or block TalkBar. |
| **Send Test** | Shows a test notification so you can check that the system displays it. |

::callout{icon="i-heroicons-light-bulb" color="primary"}
If the test notification doesn't appear, check that notifications for TalkBar are allowed in your system settings and that Do not disturb is off.
::

Reminders for scheduled sessions are set on each session or series. See [Scheduling and preparing](/sessions/scheduling-and-preparing).

## Delivery channels

A delivery channel is a place outside TalkBar that can receive messages. Channels are used for three things:

- automatic notices about your sessions (see [below](#automatic-notifications));
- **Send content** and **Send the link to** when you [share](/sharing/share-links);
- [automatic sharing](/sharing/share-links#automatic-sharing) of final summaries.

| Channel type | What you need |
| --- | --- |
| **Email (SMTP)** | An email account to send from. Presets for **Gmail**, **Outlook** and **Yahoo** need an app password from that provider. **Custom SMTP** works with any other server (host, port, security, username, password). |
| **Telegram** | A bot you create with @BotFather, and the chats or channels it should post to. Add the bot to the group or channel, send any message there, then click **Detect chat IDs**, or paste the chat IDs yourself. |
| **Slack** | An incoming webhook URL from a Slack app. |
| **Microsoft Teams** | A Teams Workflows webhook URL, using the trigger *When a Teams webhook request is received* with authentication set to *Anyone*. Older Office 365 connector URLs are not supported. |
| **Custom webhook** | An HTTPS URL that accepts JSON, and optionally an authentication header name and value. |

You can create several channels of any type and turn each one on or off.

### Add a channel

1. Open **Settings → Notifications** and click **Add Channel** (or **Create channel** in **Delivery Channels**).
2. Choose the channel type and follow the steps. Slack, Teams and custom webhooks have a short help link with step-by-step instructions.
3. Optionally choose the [automatic notifications](#automatic-notifications) this channel receives.
4. Use **Send test** to check delivery, then click **Create channel**.

::screenshot{src="/screenshots/sharing/add-channel-type.png" alt="The Set up a channel wizard on its first step, asking Which kind of channel would you like to set up, with cards for Email (SMTP), Telegram, Slack, Microsoft Teams and Custom webhook" caption="Choosing a channel type"}
::

### Automatic notifications

Each channel can receive these short notices. None are selected when you create a channel.

| Notice | When it is sent |
| --- | --- |
| **Session completed** | A session finishes. |
| **Summary ready** | The final summary of a session is first generated. It does not include the summary text. |
| **System alerts** | Something needs your attention, such as an AI problem or an automatic recording that failed to start. |
| **Application events** | Other TalkBar events, such as a finished content share. |

To send the full summary instead of a short notice, use [automatic sharing](/sharing/share-links#automatic-sharing).

### Manage channels

Channels are listed under **Settings → Notifications → Delivery Channels**. Each channel has:

- **Edit**: change its name, defaults and notices. Use **Replace credentials** to enter a new password, bot token or webhook URL; saved credentials are never shown again.
- **Send Test**: send a test message. Leave the destination blank to use the channel defaults.
- The on/off switch: turn the channel on or off without deleting it.
- **Delete**: remove the channel permanently.

If a message fails, the channel shows the latest **Delivery error**.

::screenshot{src="/screenshots/sharing/delivery-channels-list.png" alt="Settings, Notifications page with the Delivery Channels list showing an Email channel and a Telegram channel, each with its on/off switch and Send Test, Edit and Delete buttons" caption="Delivery channels in Settings"}
::

## Default email recipients and Telegram chats

Email channels can have **Default email recipients (optional)**, and Telegram channels **Default delivery chat IDs (optional)**. Automatic notices go to these defaults. When you share, or set up an automatic sharing rule, you choose the recipients for each channel there.

## Custom webhook format

For technical users: a custom webhook receives one JSON `POST` per message.

```json
{
  "schemaVersion": 1,
  "id": "stable-delivery-id",
  "type": "share.delivered",
  "occurredAt": 1793336166000,
  "title": "Planning",
  "body": "Decisions and action items selected by the sender",
  "data": { "...": "depends on the event" }
}
```

- The `Idempotency-Key` header repeats `id`. Use it to ignore duplicates.
- TalkBar retries connection errors, timeouts, HTTP 408, 429 and 5xx responses. A timeout may still have delivered the message, so duplicates are possible.
- Other 4xx responses and redirects fail without a retry.
- Your receiver should accept extra fields; new ones may be added.
- Each notice is one JSON request; a payload over the size limit fails instead of being split.

Slack receives plain messages and Teams receives Adaptive Cards. Webhooks send text only; attachments are not included.

## Where channel credentials are kept

Passwords, bot tokens and webhook URLs are stored encrypted on this computer. They are not shown again after you save them. If you move TalkBar to another computer, you may need to enter them again; see [Backup and restore](/data/backup-and-restore#passwords-api-keys-and-tokens).

On a company computer, your administrator may turn off some channel types or external notifications. TalkBar then shows a notice explaining what your organization blocked.

## Related

- [Share links](/sharing/share-links)
- [Notifications settings](/settings/notifications)
- [Scheduling and preparing](/sessions/scheduling-and-preparing)
- [Privacy and your data](/data/privacy-and-your-data)
