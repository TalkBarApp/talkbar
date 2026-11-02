---
title: Admin policy
description: Reference for Settings → Admin policy. Lock TalkBar settings for everyone on a company computer, apply a policy or export it for device management.
navigation:
  icon: i-heroicons-building-office-2
---

**Settings → Admin policy** lets an administrator lock TalkBar settings for everyone on a computer. A policy can limit which AI services see meeting content, whether content can be shared or exported, where email can go, and how TalkBar updates.

Setting up a policy needs a [Business license](/data/plans-and-license) and the computer's administrator password. If you only use a computer with a policy, see [Settings managed by your organization](/settings/overview#settings-managed-by-your-organization).

## Show the page

The Admin policy tab is hidden until an administrator turns it on.

1. Open [**Settings → License**](/settings/license) and find the **Admin policy** section.
2. Turn on **Show Admin policy page** and approve the administrator prompt. This switch appears only on the Business plan.

The tab then appears in the **System** group for everyone on this computer.

The same section shows the rules in force to everyone, on every plan, with a status badge and **Enable admin policy**.

## This computer

The first section shows the policy's status and where it is stored.

| Status | What it means |
| --- | --- |
| **In force** | The rules are enforced on this computer. |
| **Disabled** | The rules are kept on this computer but not enforced, so people can change every setting. |
| **Could not be read** | TalkBar uses the strictest settings until the policy is fixed. Apply a new policy to replace it. |
| **Not set** | There is no policy on this computer. |

The policy is stored in a place standard users can't write to:

::platform-tabs
#windows
`HKLM\SOFTWARE\Policies\TalkBar` in the registry.
#macos
`/Library/Application Support/TalkBar/policy.json`. A configuration profile from device management is read from managed preferences instead.
::

| Control | What it does |
| --- | --- |
| **Enable admin policy** | Turns enforcement on or off. Turning it off keeps the rules. Changes you apply while it is off are saved and stay off until you enable it again. |
| **Remove policy** | After you confirm, deletes the policy, so people can change every setting again. |
| **Start from** | Replaces the rules on the page with a preset, which you can adjust before applying. |
| **Clear all** | Sets every rule on the page back to not managed. |

Two presets are available:

- **Local AI only, no sharing or exports** keeps Private AI Mode on, denies cloud and command-line AI, sharing, external notifications, calendar subscriptions, exports, MCP and the command-line tool, turns automatic updates off and stops usage statistics.
- **Company-approved services** freezes AI, sharing, notification and export settings. It limits cloud AI to approved hosts, sharing to invited emails and content by email, notifications to email, exports to local folders and MCP to lists and counts. It also denies license changes and usage statistics.

## Rules

A rule that is not set leaves that area to each person. Empty lists allow anything, unless the rule says otherwise.

### AI

Which AI services can see meeting content.

| Rule | What it controls | Choices |
| --- | --- | --- |
| **Prevent changes to AI settings** | Keeps the AI providers, models and task assignments set up now. People can use them but can’t change them. | **On** or off |
| **Cloud AI providers** | AI providers that send requests off this computer. Built-in and local models stay available. | **Not managed**, **Allow**, **Approved hosts only**, **Deny** |
| **Approved AI hosts** | Company AI servers. Cloud AI providers are limited to them when that rule is set to Approved hosts only. | List of hosts, for example `llm.example.com` |
| **Command-line AI providers** | AI providers that run a vendor command-line tool. | **Not managed**, **Allow**, **Deny** |
| **Keep Private AI Mode on** | AI features use local models only. | **On** or off |
| **Lock trusted local hosts** | Only approved AI hosts count as trusted local servers. | **On** or off |
| **AI request logging** | Writing AI request content to local log files. | **Not managed**, **Allow**, **Deny** |
| **Local AI model downloads** | Downloading local AI language models. Speech models stay available. | **Not managed**, **Allow**, **Deny** |

### Sharing

Shared links and content sent to other people.

| Rule | What it controls | Choices |
| --- | --- | --- |
| **Prevent changes to sharing settings** | Keeps share rules, share defaults and branding as set up now. | **On** or off |
| **Sharing** | Shared links and sending sessions, notes and chats by email or Telegram. | **Not managed**, **Allow**, **Deny** |
| **Allowed sharing methods** | Ways people may share. Public and private links are refused while company email domains are set. | **Not managed** or **Only these**: Public links, Private links, Links for invited emails, Content by email, Content by Telegram |
| **Custom share branding** | Your own name, logo and address on shared pages. When denied, shares use standard TalkBar branding. | **Not managed**, **Allow**, **Deny** |

### Email and notifications

Where TalkBar may send email and messages.

| Rule | What it controls | Choices |
| --- | --- | --- |
| **Prevent changes to notification channels** | Keeps the email and Telegram channels set up now. They keep sending but can’t be changed. | **On** or off |
| **Company email domains** | TalkBar sends email only to these domains: share recipients, notifications and test emails. Leave empty to allow any domain. | List of domains, for example `example.com` |
| **External notifications** | Email and Telegram channels, including briefs. | **Not managed**, **Allow**, **Email only**, **Deny** |
| **Approved mail servers** | SMTP servers email channels may use. Leave empty to allow any server. | List of hosts, for example `smtp.example.com` |
| **Calendar subscriptions** | Calendars fetched from a web address. Importing calendar files stays available. | **Not managed**, **Allow**, **Deny** |

### Exports and files

Where meeting data may be saved.

| Rule | What it controls | Choices |
| --- | --- | --- |
| **Prevent changes to export settings** | Keeps export destinations and automatic exports as set up now. People can still export to them. | **On** or off |
| **Session exports** | Exporting sessions to folders and Notion. | **Not managed**, **Allow**, **Local folders only**, **Deny** |
| **Allowed export folders** | Folders exports may write to; ~ is each person’s profile folder. Leave empty to allow any local folder. | List of folders, for example `~/Documents/TalkBar` |
| **Automatic exports** | Rules that export sessions when they end. | **Not managed**, **Allow**, **Deny** |
| **Audio and note files** | Saving recordings, notes and transfer files. | **Not managed**, **Allow**, **Deny** |
| **Data backups** | Saving a backup file of all TalkBar data. | **Not managed**, **Allow**, **Deny** |

### AI assistants and command line

Outside tools that read TalkBar data.

| Rule | What it controls | Choices |
| --- | --- | --- |
| **MCP server** | Connecting AI assistants such as Claude Desktop to TalkBar. | **Not managed**, **Allow**, **Deny** |
| **Allowed MCP tools** | Tools AI assistants and the command-line tool may use. | **Not managed** or **Only these**: Lists and counts, Meeting content, Exports, Scheduling changes, Background jobs, Changes to items |
| **Command-line tool** | The talkbar-cli tool, including its MCP server. | **Not managed**, **Allow**, **Deny** |

### Updates and license

How TalkBar updates and which license it uses.

| Rule | What it controls | Choices |
| --- | --- | --- |
| **Automatic updates** | Turn automatic updates on or off for everyone. | **Not managed**, **Let people choose**, **Always on**, **Always off** |
| **Manual updates** | Checking for and installing updates by hand. | **Not managed**, **Allow**, **Deny** |
| **Update channel** | Keeps every computer on one update channel. | **Not managed**, **Stable releases**, **Beta releases** |
| **License changes** | Activating, changing and removing the license. | **Not managed**, **Allow**, **Deny** |

### Data on this computer

Usage statistics and resetting TalkBar data.

| Rule | What it controls | Choices |
| --- | --- | --- |
| **Usage statistics** | Sending anonymous usage statistics. | **Not managed**, **Allow**, **Deny** |
| **Reset and restore** | Resetting, wiping and restoring TalkBar data. People can still delete their own files. | **Not managed**, **Allow**, **Deny** |

## Apply your changes

Rules you edit are marked **Changed**, and a bar at the bottom of the page counts them. Your edits stay while you visit other Settings tabs, but nothing changes for anyone until you apply them.

1. Click **Apply changes**. TalkBar shows **Waiting for administrator approval…**.
2. Approve the administrator prompt. If you cancel it, nothing changes.

**Discard** drops your edits. Only the rules you edited are written, so a change made meanwhile through Group Policy is not undone. If you pick a preset, **Clear all** or a file while you have unapplied edits, TalkBar asks before replacing them.

## Import and export

Use the **Import and export** menu at the top of the page to roll a policy out with your device management tools.

| Format | Use it for |
| --- | --- |
| **Group Policy templates (ADMX)** | Windows Group Policy. Saves `TalkBar.admx` and `en-US/TalkBar.adml` to a folder you choose. |
| **Registry file (.reg)** | Windows computers. |
| **Configuration profile (.mobileconfig)** | macOS device management. |
| **Policy file (JSON)** | Keeping a copy, or reusing the rules elsewhere. |

**Import policy file…** loads a JSON, registry or configuration profile file onto the page. Click **Apply changes** to put the rules in force. Settings this version of TalkBar doesn't know are skipped and named in a message.

## What people on the computer see

- Tabs with locked controls show a notice at the top, and locked controls are greyed out. See [Settings managed by your organization](/settings/overview#settings-managed-by-your-organization).
- **Settings → License → Admin policy** lists the rules in force.
- Rules also apply to [MCP and the command-line tool](/mcp/access-and-permissions), which get an error when they try a blocked action.

::callout{icon="i-heroicons-information-circle" color="gray"}
Removing a policy needs only the administrator prompt, not a Business license, so a lapsed license can't trap a policy on a computer.
::

## Related

- [License](/settings/license)
- [Settings overview](/settings/overview)
- [Private AI Mode](/ai/private-ai-mode)
- [Plans and license](/data/plans-and-license)
