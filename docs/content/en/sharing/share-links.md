---
title: Share links
description: Publish a read-only page of a session, note, chat or answer on talkbar.link, or send the content by email, Telegram, Slack, Teams or webhook.
navigation:
  icon: i-heroicons-link
---

Share a session, a note, a chat or a single answer from Ask TalkBar. You can publish it as a read-only web page and send people the link, or send the text itself through one of your delivery channels. Everything you share is a snapshot: later edits in TalkBar don't change it until you publish an update.

## Three ways to get content out

| You want to… | Use | What the other person gets |
| --- | --- | --- |
| Give someone a page they can open in a browser | **Publish link** | A read-only page on talkbar.link |
| Send the text itself | **Send content** | A message through your Email, Telegram, Slack, Teams or webhook channel. No web page. |
| Keep a file or a copy in another app | **Export** | Files in a folder, or a Notion page. See [Exports](/sharing/exports). |

## What you can share

| Item | Where to find **Share** |
| --- | --- |
| Session | The **Share** button in the session header (completed sessions only). Its arrow menu has **Publish link**, **Send content** and, once links exist, **Manage links**. Also in the session's row menu in the Sessions list, and **Share summary** below the summary. |
| Note | The menu in the note editor, or the note's row menu in Notes. |
| Chat | The chat's menu, or its row menu in Chats. |
| Answer | The share action on a finished answer in a chat. |

Each opens the same dialog, titled **Share session**, **Share note**, **Share chat** or **Share reply**.

::screenshot{src="/screenshots/sharing/share-dialog-publish-link.png" alt="The Share session dialog with Publish link selected: the What they'll see parts (Summary, Action items, Timeline, Transcript, Notes) and the Who can open it options Public, Private link and Specific people" caption="The share dialog for a session"}
::

## Choose what they see

For a session, pick the parts to include under **What they'll see**:

- **Summary**, and which **Summary sections**. Keywords are shared with the summary.
- **Action items** (shown only when the session has some).
- **Timeline**. It can't be shared while a speaker is excluded from AI.
- **Transcript**.
- **Notes**.

TalkBar remembers the parts you chose last time. **Refresh preview** shows exactly what will be shared. The preview also lists anything that is left out.

## Publish a link

1. Choose **Publish link** under **How to share**.
2. Choose the parts to share.
3. Under **Who can open it**, pick an audience and set the options below.
4. Click **Publish**, then copy the link.

The result offers **Copy link**, **Copy short link** (when the page also has a shorter address) and **Open link**. For a public link, **Share to…** starts a post or message with the link in Email, X, LinkedIn, Facebook, WhatsApp or Telegram.

### Who can open it

| Option | Who can open the page | Plans |
| --- | --- | --- |
| **Public** | Anyone with the link. Link previews in chats show the title and summary. | All plans |
| **Private link** | Anyone with the link. It never appears on search engines, and its address does not include the title. | Plus, Pro, Business |
| **Specific people** | Only people who confirm one of the email addresses you enter. | Pro (up to 10 people per link), Business (up to 50) |

Options your plan doesn't include are shown with the plan they need, but you can't select them.

For **Specific people**, enter the addresses under **Allowed email addresses**. With **Email each person an invitation** on, TalkBar emails each address a personal link. Turn it off to share the link yourself: people on the list enter their email on the page and get a confirmation link.

### Link options

| Option | What it does |
| --- | --- |
| **Show on search engines** | Public links only. Off by default. When on, Google and AI search can list the page about a day after you publish it, and may keep a copy after you revoke it. |
| **Hide names** | Removes the participants list, shows transcript speakers as *Speaker 1*, *Speaker 2*, and hides action item owners. Names written in the summary itself stay. |
| **Link expiry** | 7 days, 30 days (the default), 90 days, 6 months, 1 year or **Never**. On the Free plan, links never expire and you can't choose a date. |
| **Send the link to** | Optional. The channels you pick get a short message with the link, not the content. |
| **Link address type** | A standard talkbar.link address, or **Branded** if you set up [custom branding](#custom-branding). |

::callout{icon="i-heroicons-light-bulb" color="primary"}
**Hide names** applies to links only. **Send content** always sends names as they appear in the content.
::

## Send content

**Send content** delivers the text through your delivery channels, with no web page. Set up channels in **Settings → Notifications** (see [Notifications](/sharing/notifications)); you can also add one from the share dialog.

1. Choose **Send content** under **How to share**.
2. Choose the parts to send.
3. Under **Send through**, pick one or more channels:
   - **Email**: a **Subject** and up to 10 email addresses, separated by commas.
   - **Telegram**: the chats to send to. Long content is split into several messages, and the dialog tells you how many. The transcript is not sent to Telegram.
   - **Slack**, **Microsoft Teams** or a **Custom webhook**: the message goes to the channel's saved webhook. Webhooks send text only; attachments are not included.
4. Click **Send**.

The result shows how many messages went out on each channel. If a delivery could not be confirmed, TalkBar asks before resending, because the recipient may already have it. Messages that were accepted can't be recalled.

## What the recipient sees

A published link opens a read-only page on talkbar.link. Depending on what you shared, it shows the title, the date and duration, participants and their talk time, and tabs such as **Summary**, **Action items**, **Timeline**, **Transcript** and **Notes**. A note reads like a document; a chat shows each question and answer.

- The page states that it is a read-only snapshot and that the owner can update or revoke it.
- Visitors can switch between light and dark themes and change the page language.
- Visitors can use **Report this page** to tell TalkBar about a problem with it.
- A page for **Specific people** first asks for an email address. If that address is on the list, a sign-in link arrives by email. The link works for 7 days, and the browser stays signed in for 30 days.
- People can see every page shared with their address under **Shared with me** on talkbar.link, after signing in by email.
- A revoked or expired link shows *This page is no longer available*.

Pages without custom branding show a small TalkBar footer and a link to download TalkBar.

::screenshot{src="/screenshots/sharing/shared-page-recipient.png" alt="A shared session page on talkbar.link opened in a browser, showing the title, date, participants, the Summary tab selected and the read-only snapshot note" caption="What a recipient sees"}
::

## Update or revoke a link

Open **Manage links** from the session's **Share** menu or the share dialog. All your links are also listed in **Settings → Export & Share → Share Content → Shared links**, with a search box and a status filter.

- **Publish update** replaces the page at the same link with the current content. Who can open it, when it expires and which parts it shares stay the same; you can still change the summary sections with **Edit and publish**. On the Free plan you can update a link once every 30 minutes.
- **Revoke link**: anyone using the link loses access at once. A revoked or expired link can't be brought back; publish a new one instead.
- **Clear ended links** removes revoked, expired and removed links from the list. Active links are not affected.

Each session, note or chat can have up to three active links. On the Free plan you can keep up to 10 active links in total; revoke one to publish another.

If TalkBar can't reach talkbar.link to revoke a page, it keeps trying in the background. **Settings → Export & Share → Share Content → Link cleanup** shows links still waiting, with **Retry revoke** for one that failed.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Moving an item to Trash does not revoke its links. Revoke them in **Manage links** if the page should stop opening. Deleting the item permanently revokes its links, and **Link cleanup** shows the progress.
::

## Automatic sharing

Automatic sharing sends the final summary of each new session without you opening the share dialog. Set it up in **Settings → Export & Share → Share Content → Automatic sharing**.

1. Click **Add automatic sharing rule**.
2. Under **Apply to**, choose the whole workspace, a project or a series. A series rule wins over a project rule, which wins over the workspace rule. **Inherit** follows the broader rule; **Disabled** turns automatic sharing off for that scope.
3. Under **Send as**, choose **Content** or **Publish link**. For a link, set **Link access** and **Each link stays up for**. Automatic links never appear on search engines.
4. Choose the channels, **When to share**, and whether to **Share again after summary regeneration** (off by default).
5. Click **Save rule**.

Things to know:

- Only new final summaries are shared. Existing sessions are never sent when you add a rule.
- Everything that matches a rule is sent without review.
- The **Automatic sharing** switch pauses all rules. Summaries that become ready while it is off are held and sent when you turn it back on.
- **Sharing history** lists every manual and automatic delivery, newest first, and lets you retry failed ones.

**Default sharing** on the same tab chooses which channels start selected in the share dialog (**Send through by default**).

## Custom branding

Custom branding publishes your pages, invitations and messages under your own name, logo and colors, at addresses like `talkbar.link/b/your-handle/…`. It is included in the Business plan, and is a yearly add-on for Personal, Plus and Pro. Get it from **Settings → License → Custom branding**.

Set it up in **Settings → Export & Share → Custom branding**:

1. Choose a **Handle** (3–32 lowercase letters, digits or single dashes) and click **Check availability**.
2. Fill in **Business details**: **Business name**, **Website (optional)**, a **Logo** and an optional **Logo for dark mode**, a **Brand color** and a **Default appearance**.
3. Optionally add **Footer links** and **Link addresses** (address patterns built from the project, series, title or date).
4. Click **Save and claim handle**, then turn custom branding on.

To use the same brand on another computer, copy the **Brand key** here and paste it on the other computer with **Connect existing brand**. If custom branding ends, branded addresses keep working and show standard TalkBar branding.

## Sharing limits by plan

| | Free | Personal | Plus | Pro | Business |
| --- | --- | --- | --- | --- | --- |
| Public links | Yes | Yes | Yes | Yes | Yes |
| Active links | 10 | Unlimited | Unlimited | Unlimited | Unlimited |
| Choose a link expiry | No (links never expire) | Yes | Yes | Yes | Yes |
| Private links | No | No | Yes | Yes | Yes |
| Specific people per link | No | No | No | 10 | 50 |
| Invitation emails per day | No | No | No | 100 | 500 |
| Custom branding | No | Add-on | Add-on | Add-on | Included |

A paid license includes the share link service for 12 months. After that, sharing uses the Free plan limits until you renew. See [Plans and license](/data/plans-and-license).

## What leaves your computer

- **Publish link** uploads the snapshot you previewed to TalkBar's share link service at talkbar.link: the parts you chose, the title, date and duration, and participant names unless you hide them. Images and audio clips inside shared notes can be uploaded with the note. Session recordings are never uploaded.
- **Specific people** invitations are sent by TalkBar's mail service to the addresses you enter.
- **Send content** goes through the services behind your channels: your own email provider, Telegram, Slack, Microsoft Teams or your webhook.

Nothing is shared until you click **Publish** or **Send**, or set up an automatic sharing rule. See [Privacy and your data](/data/privacy-and-your-data).

## Related

- [Exports](/sharing/exports)
- [Notifications](/sharing/notifications)
- [Export & Share settings](/settings/export-and-share)
- [Plans and license](/data/plans-and-license)
