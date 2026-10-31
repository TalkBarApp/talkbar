---
title: Exports
description: Export sessions to Markdown, plain text, HTML, JSON, subtitles or ZIP, to an Obsidian vault or a Notion page, by hand or automatically.
navigation:
  icon: i-heroicons-arrow-down-tray
---

Export keeps a copy of your sessions outside TalkBar: as files in a folder, in an Obsidian vault, or as a page in Notion. Export one session by hand, export many at once, or let rules export new sessions automatically when their summary is ready.

## What you can export

| What | How |
| --- | --- |
| A completed session (summary, transcript, notes, outcomes, markers, audio) | **Export session**, described below |
| All completed sessions of a workspace, project or series | **Export existing sessions**, or the **Export** button on a project or series page |
| One recording as an audio file | **Audio Player → Export Audio** in the session's menu |
| A note | **Export as markdown** or **Copy as markdown** in the note's menu |
| Your data for another computer | A transfer file. See [Backup and restore](/data/backup-and-restore#transfer-to-another-device). |

Only completed sessions can be exported. Exports are always local or go to the destination you choose; nothing is sent anywhere else.

## Export one session

1. Open the session's menu (or its row menu in the Sessions list) and choose **Export session**.
2. Under **What to export**, choose the content:

   | Content | What it includes |
   | --- | --- |
   | **Summary** | The accepted final summary and the **Summary sections** you pick. |
   | **Transcript** | Spoken turns, speakers and timestamps. |
   | **Session information** | Date, project, speakers and session statistics. |
   | **Notes** | Notes taken during or after the session. |
   | **Outcomes** | Action items, decisions and open questions. |
   | **Markers** | Bookmarks and highlights from the transcript. |
   | **Audio** | **No Audio**, **OPUS (Original)**, **MP4 (AAC)**, **MP3** or **WAV**. |

   To export only part of the session, turn on **Limit to a time range** and enter a **Start time** and **End time** (`mm:ss`). The transcript and audio are cut to that range.
3. Click **Continue**. Under **Where to export**, choose **A folder** or one or more **Saved destinations**.
4. For a folder, click **Browse**, choose a **File format**, and optionally turn on **Export as ZIP**.
5. Click **Export**.

TalkBar remembers the folder you used and saves it as a destination named after the folder, so you can pick it next time.

To export a single transcript turn, use **Export this transcript turn** in the transcript.

::screenshot{src="/screenshots/sharing/export-session-what-to-export.png" alt="The Export session dialog on the What to export step, with Summary, Transcript, Session information, Notes, Outcomes and Markers checked, the Audio format row, and Limit to a time range" caption="Choosing what to export"}
::

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Speakers you excluded are left out of the exported text, but exported audio still contains every recorded voice.
::

### When the summary isn't ready

If the session has no accepted final summary yet, or the summary was made from an earlier transcript, the export waits (**Waiting for summary**). You can **Export without summary**, or **Regenerate and export**.

## File formats

| Format | What you get |
| --- | --- |
| **Markdown (.md)** | Separate `.md` files, with a `session.md` overview that links to the content and audio. |
| **Plain text (.txt)** | Separate `.txt` files, with a `session.txt` overview. |
| **HTML** | Standalone HTML pages linked from `session.html`. Notes keep their cards and images. |
| **JSON** | One `session.json` file with the selected data, for scripts and other tools. |
| **Subtitles (.srt)** | `transcript.srt` with timestamped transcript lines. |
| **Web subtitles (.vtt)** | `transcript.vtt`, the same for web players. |
| **ZIP bundle** | One `session.zip` with the Markdown files, `session.json` and the selected media. |
| **Obsidian vault** | Markdown with properties and relative media links, ready for an Obsidian vault. |
| **Notion import (Markdown)** | Markdown files to import into Notion yourself. |
| **Notion page** | A page created directly in your Notion workspace. |

**A folder** offers Markdown, plain text, HTML, JSON and the two subtitle formats. Obsidian, ZIP bundle, Notion import and Notion page are available as [saved destinations](#saved-destinations). **Export as ZIP** wraps each session in its own ZIP archive.

Subtitle formats don't need a summary, so they export as soon as the transcript is ready.

### Audio formats

| Format | Notes |
| --- | --- |
| **OPUS (Original)** | The recorded audio as it was captured. Time-range excerpts in this format are saved as WAV. |
| **MP4 (AAC)** | Audio-only `.mp4`, 128 kbps. |
| **MP3** | `.mp3`, 128 kbps. |
| **WAV** | Uncompressed audio. Large files. |

TalkBar includes the encoders; you don't need extra software.

### What an export folder looks like

Each session gets its own folder, named with the date, the title and a short ID. Readable formats put each kind of content in its own file. Sections you didn't select, or that are empty, get no file.

```text
2026-09-12-Weekly sync-a1b2c3d4e5/
  session.md          overview: title, details, links to the files below
  summary.md
  transcript.md
  notes.md
  action-items.md
  decisions.md
  open-questions.md
  markers.md
  media/              audio and audio clips
  media/notes/        images and audio clips from your notes
```

Plain text and HTML use the same names with their own extensions. Exporting the same session again updates the same folder.

## Saved destinations

Manage destinations in **Settings → Export & Share → Export Session → Export destinations**. Click **Add destination…** and choose a **Destination type**:

- **Local folder**: a **Destination name**, a **Format**, an **Export folder** (use **Browse…**; for Obsidian, pick your vault or a folder in it) and a **Folder layout**: **One folder**, **By project**, **By series** or **By project and series**.
- **Notion page**: the **Notion parent page URL or ID** and a **Notion integration token**. Share the parent page with your Notion integration first. TalkBar creates one page per session under that parent page. The token is stored encrypted on this computer.

Each destination's menu has **Edit…**, **Open folder** or **Open in Notion**, **Test connection** (Notion), **Enable destination** / **Disable destination**, **Disconnect Notion** and **Delete destination**. Deleting a destination keeps the files and pages already exported.

::screenshot{src="/screenshots/sharing/export-add-destination.png" alt="The Add destination dialog with Local folder selected, showing Destination name, Format set to Obsidian vault, Export folder with Browse, and Folder layout set to By project" caption="Adding a saved destination"}
::

## Automatic export rules

Rules export future completed sessions once their final summary is ready. Set them up in **Settings → Export & Share → Export Session → Automatic export rules**.

1. Click **Add rule…**.
2. Under **Apply to**, choose the **Workspace**, a project or a series. Series rules override project rules, which override the workspace rule.
3. Choose **Use this rule**, **Inherit** (follow the project or workspace rule) or **Disabled** (no automatic export for this scope).
4. Pick the **Destinations** and the content to export.
5. Under **When to export**, choose **When ready**, **After a delay** (5, 15, 30, 60 or 120 minutes), or **Daily** at a **Local time** in a **Timezone**.
6. Optionally turn on **Re-export after summary regeneration** and **Re-export after transcript enhancement**.
7. Click **Save rule**.

Automatic export is off until you add a rule. Adding a rule never exports sessions you already have; use **Export existing sessions** for those. Other edits, such as renaming a session or editing notes, need a manual export.

::callout{icon="i-heroicons-light-bulb" color="primary"}
Exports run in the background while TalkBar is running. Closing the export dialog or Settings doesn't stop them.
::

## Export existing sessions

**Settings → Export & Share → Export Session → Export existing sessions** exports every completed session of the whole workspace, a project or a series. Choose the sessions, then click **Choose content and export…**. The dialog shows how many sessions it will export, and **Preview** lists the target folders and files before anything is written.

Project and series pages have an **Export** button that does the same for that project or series.

## Export status and history

A session you exported shows a status badge in its header, such as **Exported**, **Changed since export** or **Needs attention**. Its menu offers **Export again…**, **Open folder** and **View export history**.

| Status | Meaning |
| --- | --- |
| **Scheduled** | Waiting for its turn, or for the rule's delay or daily time. |
| **Waiting for summary** | The final summary is missing, or was made from an earlier transcript. |
| **Waiting for audio** | The recording is still being finalized. TalkBar checks again on its own. |
| **Exporting** | Writing files or the Notion page now. |
| **Exported** | Done. |
| **Partially exported** | Some content could not be delivered, for example a missing recording. |
| **Needs attention** | A file was changed outside TalkBar, the folder is unavailable, or the connection failed. |
| **Cancelled** | You cancelled it. Files already written stay. |

**Settings → Export & Share → Export Session → Export history** lists manual and automatic exports with a search box and a status filter. From an export's menu you can **View deliveries…**, **Run now**, **Retry failed deliveries** or **Cancel export**. **Clear history** removes finished exports from the list; exported files and pages are not changed.

## Files changed outside TalkBar

Before it overwrites or removes a file it exported earlier, TalkBar checks whether you edited it elsewhere. If you did, the export stops with **Needs attention** and you choose:

- **Keep external copy**: leave your edit alone.
- **Save a separate copy**: export to a new folder from now on.
- **Replace external copy**: overwrite it with the latest session content.

Files in the folder that TalkBar didn't create are never touched.

## Export from the command line or an AI tool

The TalkBar CLI and MCP server can also set up destinations, queue exports and check their status. See [Exports operations](/mcp/operations/exports).

## Related

- [Share links](/sharing/share-links)
- [Export & Share settings](/settings/export-and-share)
- [Backup and restore](/data/backup-and-restore)
- [Session details](/sessions/session-details)
