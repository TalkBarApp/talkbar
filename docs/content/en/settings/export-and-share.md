---
title: Export & Share
description: Every setting under Settings → Export & Share — export destinations and rules, sharing defaults and history, and custom branding.
navigation:
  icon: i-heroicons-arrow-down-tray
---

**Settings → Export & Share** controls where sessions are exported, what is shared automatically, and how your shared pages look. It has three inner tabs: **Export Session**, **Share Content** and **Custom branding**. For how exporting and sharing work day to day, see [Exports](/sharing/exports) and [Share links](/sharing/share-links).

## Export Session

This tab has four sections, from top to bottom: **Export destinations**, **Automatic export rules**, **Export existing sessions** and **Export history**.

::screenshot{src="/screenshots/settings/export-session-tab.png" alt="Settings → Export & Share with the Export Session inner tab selected, showing the Export destinations list with one local folder and one Notion page, and the Automatic export rules section below it" caption="The Export Session tab"}
::

### Export destinations

A destination is a place exported sessions go: a folder on this computer (for example inside an Obsidian vault) or a Notion page. Click **Add destination…** to create one.

| Setting | What it does | Default |
| --- | --- | --- |
| **Destination type** | **Local folder** or **Notion page**. You can't change the type after the destination is created. | **Local folder** |
| **Destination name** | The name shown in export choices and rules. Required. | — |
| **Format** | Local folders only. The file format: **Markdown (.md)**, **Obsidian vault**, **Plain text (.txt)**, **HTML**, **JSON**, **Subtitles (.srt)**, **Web subtitles (.vtt)**, **ZIP bundle** or **Notion import (Markdown)**. | **Markdown (.md)** |
| **Export folder** | Local folders only. Click **Browse…** to choose the folder. Each session is written to its own dated folder inside it. | — |
| **Folder layout** | Local folders only. Subfolders inside the export folder: **One folder**, **By project**, **By series** or **By project and series**. | **By project and series** |
| **Notion parent page URL or ID** | Notion only. TalkBar creates one page per session under this page. | — |
| **Notion integration token** | Notion only. Share the parent page with your Notion integration, then paste its token. The token is stored encrypted on this computer. | — |
| **Enable destination** | Disabled destinations are hidden from export choices. | On |

Each destination has a menu with **Edit…**, **Open folder** (or **Open in Notion**), **Test connection** (Notion), **Disable destination** / **Enable destination**, **Disconnect Notion** and **Delete destination**. Deleting a destination removes its export history and stops rules from using it; files and pages already exported are kept.

### Automatic export rules

Rules export future completed sessions once their final summary is ready. Without a rule, nothing is exported automatically, and existing sessions are never exported by a rule. Click **Add rule…** (you need at least one enabled destination first).

| Setting | What it does | Default |
| --- | --- | --- |
| **Apply to** | The scope: **Whole workspace**, one project or one series. Series rules override project and workspace rules. | **Whole workspace** |
| **Automatic export** | **Use this rule**, **Inherit** (follow the project or workspace rule; not offered for the whole workspace) or **Disabled**. | **Use this rule** |
| **Destinations** | The enabled destinations this rule exports to. At least one is required. | None selected |
| **When to export** | **When ready**, **After a delay** or **Daily**. | **When ready** |
| **Delay** | Shown for **After a delay**: 5, 15, 30, 60 or 120 min. | 15 min |
| **Local time** and **Timezone** | Shown for **Daily**: the time of day and timezone for the daily export. | 18:00 in your computer's timezone |
| **Content** | What each export includes: **Summary**, **Transcript**, **Session information**, **Notes**, **Outcomes** (action items, decisions and open questions) and **Markers**. | **Summary**, **Transcript** and **Session information** on; the rest off |
| **Audio** | **No Audio**, **OPUS (Original)**, **MP4 (AAC)**, **MP3** or **WAV**. Audio contains every recorded voice, including speakers excluded from the transcript. | **No Audio** |
| **Re-export after summary regeneration** | Exports the session again when you regenerate its summary. | Off |
| **Re-export after transcript enhancement** | Exports the session again after its transcript is enhanced. If summary content is selected, the export waits for a matching regenerated summary. | Off |

Each rule's menu has **Edit…**, **Disable rule** / **Enable rule** and **Delete rule**.

### Export existing sessions

Exports sessions you already have, in bulk.

| Setting | What it does | Default |
| --- | --- | --- |
| **Sessions to export** | **All workspace sessions**, or the sessions of one project or series. The number of completed sessions is shown below the label. | **All workspace sessions** |
| **Choose content and export…** | Opens the export dialog for those sessions, where you pick content and destinations. Needs an enabled destination. | — |

### Export history

Lists manual and automatic exports with their delivery status. Use the search box and the status filter (**All statuses**, **In progress**, **Exported**, **Needs attention**, **Cancelled**) to find one. From an export's menu you can **Run now**, **Cancel export**, **Retry failed deliveries**, **View deliveries…** and open the exported folder or page.

If an exported file or page was **Edited outside TalkBar**, choose **Replace external copy**, **Keep external copy** or **Save a separate copy**.

**Clear history** removes finished exports from the list. Exports in progress are kept, and exported files and pages are not changed.

## Share Content

This tab controls automatic and default sharing. Sections, from top to bottom: **Default sharing**, **Sharing channels**, **Automatic sharing**, **Shared links**, **Sharing history** and **Link cleanup**.

::screenshot{src="/screenshots/settings/share-content-tab.png" alt="Settings → Export & Share with the Share Content inner tab selected, showing Default sharing with channel pills, the Sharing channels list, and the Automatic sharing section with its header switch on" caption="The Share Content tab"}
::

### Default sharing

| Setting | What it does | Default |
| --- | --- | --- |
| **Send through by default** | The delivery channels that start selected in the share dialog. You can still change them for each share. Only enabled channels are listed. | None selected |

The share dialog also remembers what you last chose to include.

### Sharing channels

A read-only list of your delivery channels, each marked **Ready**, **Disabled** or **Missing credentials**. Channels are created and edited under **Settings → Notifications**; click **Manage delivery channels** to go there. Share links work without any channel.

### Automatic sharing

Automatic sharing sends only new final session summaries. Existing sessions are never sent when you add a rule, and notes, chats and replies are always shared manually.

The switch in the section header pauses or resumes all automatic sharing. While it is paused, summaries that become ready are held and sent when you turn it back on. It is on by default, but nothing is sent until you add a rule.

Click **Add automatic sharing rule** to create a rule. Each scope (the whole workspace, a project or a series) can have one rule.

| Setting | What it does | Default |
| --- | --- | --- |
| **Apply to** | **Whole workspace**, one project or one series. Series rules override project and workspace rules. | The first scope without a rule |
| **Automatic sharing** | **Use this rule**, **Inherit** (not offered for the whole workspace) or **Disabled**. | **Use this rule** |
| **Send as** | **Content** sends the summary itself. **Publish link** publishes a read-only page and sends its link. | **Content** |
| **Link access** | Shown for **Publish link**: **Public**, **Private link** or **Specific people**. Private links and specific people depend on your plan. | **Public** |
| **Each link stays up for** | Shown for **Publish link**: 7, 30, 90, 180 or 365 days, limited by your plan. Automatic links never appear on search engines. | 30 days |
| **Allowed email addresses** | Shown for **Specific people**: who can open the link. | — |
| Channels | The delivery channels to send through, with recipients for email channels and chats for Telegram channels. At least one is required. | None selected |
| **When to share** | **When ready**, **After a delay** or **Daily**, with the same **Delay**, **Local time** and **Timezone** options as export rules. | **When ready** |
| **Share again after summary regeneration** | Sends again when you regenerate the summary. Link rules update the same URL, then notify the selected channels. | Off |

Before you save, the dialog lists everyone who will receive summaries automatically, without review.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
A rule that uses a kind of link your plan doesn't include stays inactive and is marked so in the list. Choose **Content**, or see [Plans and license](/data/plans-and-license).
::

### Shared links

Every read-only page you published, with search and a filter (**All links**, **Active**, **Ended**, **In progress**, **Needs attention**). Each link has **Copy link**, **Open link** and **Manage link**. Published copies stay unchanged until you update them, and updates keep the same URL.

**Clear ended links** removes revoked, expired or removed links from the list. Active links are kept.

### Sharing history

Manual and automatic deliveries, newest first, with search and a status filter (**All statuses**, **In progress**, **Sent**, **Needs attention**, **Cancelled**). **Clear history** removes finished deliveries; shared links and sent messages are not affected.

### Link cleanup

Links waiting to be revoked across all your workspaces, including links to deleted items. If a revoke fails, click **Retry revoke** (or **Retry local cleanup**). The list is empty when nothing is pending.

## Custom branding

Custom branding publishes your shared pages, invitations and messages under your own name, logo and colors at `talkbar.link/b/your-handle`.

::callout{icon="i-heroicons-key" color="primary"}
The Business plan includes custom branding. On Personal, Plus and Pro you can add it as a yearly add-on with **Add custom branding**. See [Plans and license](/data/plans-and-license).
::

The switch in the section header turns custom branding on or off. It is **off** by default. You need to claim a handle before you can turn it on.

::screenshot{src="/screenshots/settings/custom-branding.png" alt="Settings → Export & Share with the Custom branding inner tab selected on a plan that includes branding, showing the Handle field with a Claimed badge, Business details, Logo, Brand color swatches and Default appearance" caption="Custom branding settings"}
::

| Setting | What it does | Default |
| --- | --- | --- |
| **Handle** | Your branded addresses start with it. Use 3–32 lowercase letters, digits or single dashes, then click **Check availability**. Changing it later moves every branded address; the old handle is held for 90 days. | — |
| **Business name** | Shown in the page header, the footer and invitation emails. Required. | — |
| **Website (optional)** | Your website, shown with your business details. | — |
| **Logo** and **Logo for dark mode (optional)** | PNG, JPEG or WebP, up to 8 MB. Resized to 512 px; a square browser-tab icon is made from it. | — |
| **Brand color** | Color of buttons and links on your shared pages and in invitation emails. | **Amber** |
| **Default appearance** | **Auto**, **Light** or **Dark**. Viewers can still switch. | **Auto** |
| **Footer links** | Up to 5 links under your pages, such as your privacy policy. A neutral "Report this page" link is always added. | None |
| **Link addresses** | How branded addresses are built: **ID only**, **Title only**, **Project / Title**, **Project / Series / Title**, **Date / Title**, **Year / Month / Title**, **Type / Title**, or up to 5 of your own patterns (**Add address pattern**). The default applies to public links; private and email links start with **ID only**. You can pick another one when you share. | **Title only** |
| **Brand key** | Lets another device or workspace publish under this brand. **Copy brand key**, **Rotate key**, **Release handle**, or paste a key and click **Connect existing brand**. Keep it private. | — |

Click **Save and claim handle** the first time, then **Save branding** for later changes. **Discard changes** drops unsaved edits.

## Related

- [Exports](/sharing/exports)
- [Share links](/sharing/share-links)
- [Notifications settings](/settings/notifications)
- [Plans and license](/data/plans-and-license)
