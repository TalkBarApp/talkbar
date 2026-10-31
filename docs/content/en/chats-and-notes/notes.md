---
title: Notes
description: Write your own notes in TalkBar, start from 44 note templates, link notes to sessions, projects and topics, and add voice memos, dictation and AI help.
navigation:
  icon: i-heroicons-pencil-square
---

A **note** is something you write yourself: an agenda, a plan, meeting notes, a journal entry. Notes can stand on their own or belong to a session, and you can link them to sessions, projects and topics so they show up where they belong and AI can use them.

## The Notes page

Click **Notes** in the sidebar.

| Control | What it does |
| --- | --- |
| **New note** | Creates an empty note. |
| **From template…** | Creates a note from a [note template](#note-templates). |
| **Import markdown** | Creates a note from a Markdown file. |
| **All notes** / **Pinned** / **Trash** | Switch views. |
| Filters | Show notes for one **Project** or one **Topic**. |
| **Sort** | By **Updated**, **Created** or **Title**. **Pinned on top** keeps pinned notes first. |
| **Search** | Finds notes by title or text. |

::screenshot{src="/screenshots/chats-and-notes/notes-page.png" alt="Notes page with the New note, From template… and Import markdown buttons, the All notes/Pinned/Trash tabs, project and topic filters, and a list of notes grouped by day" caption="The Notes page"}
::

Each note's menu in the list has **Open**, **Pin**, **Link to session**, **Link to project**, **Add to Topic**, **Share**, **Copy as markdown**, **Export as markdown** and **Move to trash**.

## Session notes

Every session also has its own note. Write in it while you record (the **Notes** panel of the live session) or afterwards on the session's **Notes** tab. It is named after the session, for example "Session notes: Planning".

You can also bring an existing note into a session as context, from the session's **Documents** tab (**Add** → **From notes**). See [Documents](/knowledge/documents#use-documents-in-sessions).

## Write a note

The editor saves as you type. The top bar shows the save status (**Saving…**, **Saved**), a **Pin** button and the **⋮** menu.

::screenshot{src="/screenshots/chats-and-notes/note-editor.png" alt="Note editor with a title, the links row showing a linked session, project and topic, a few paragraphs and a checklist, the slash menu open listing Text, Heading 1, Bullet List, Task List, Table and more, and the Ask AI bar at the bottom" caption="The note editor"}
::

### Title

Type a title, or click **Generate title with AI**. TalkBar can also title new notes on its own after you write a few paragraphs, unless you already named the note. Turn this on or off in **Settings → General → Auto titles → Auto-title notes**.

### Blocks and formatting

Type **/** to insert a block:

| Block | What it adds |
| --- | --- |
| **Text**, **Heading 1–3** | Paragraphs and headings. |
| **Bullet List**, **Numbered List**, **Task List** | Lists, including checklists. |
| **Table** | A 3×3 table with a header row. Further commands add or delete rows and columns. |
| **Image** | Upload or embed an image. You can also paste or drop images. |
| **YouTube** | Embeds a YouTube video from its link. |
| **Audio** | Uploads an audio file (up to 50 MB). |
| **Voice memo** | Records a voice memo (see below). |
| **Quick poll** | A question with **Yes / No** or **Yes / Neutral / No** answers. |
| **Ask AI** | Writes or generates content with AI at that spot. |
| **Memory** | Embeds a snapshot of a saved memory card. |
| **Timeline** | Embeds a section from a session timeline. |
| **Action item** | Embeds an action item you can check off in the note. |
| **Transcript chunk** | Embeds a piece of the transcript. Session notes only. |
| **Timestamp** | Inserts the current session time. Live session notes only. |
| **Template** | Inserts a note template. |
| **Dictate** | Speaks into the note at the cursor. |

Select text to see the formatting bubble (**Bold**, **Italic**, **Underline**, **Highlight**, **Link**). From the **⋮** menu you can also show a **Formatting toolbar** and see **Keyboard shortcuts**.

### Markdown

Notes work well with Markdown:

- Paste Markdown and it keeps its formatting.
- **Import markdown** on the Notes page turns a Markdown file into a note.
- **Copy as markdown** and **Export as markdown** (in the **⋮** menu) give you the note as Markdown. Embedded blocks that can't be written as Markdown are left out, and TalkBar tells you.

## Link a note

The links row under the title connects the note to other things, so it shows up there and AI can use it:

| Link | What it does |
| --- | --- |
| **Session** | Links the note to a recorded session. |
| **Scheduled session** | Links the note to a session you are preparing. The note opens alongside the session when you record. |
| **Project** | Files the note under a project. The Notes page can filter by it. |
| Topics | **Add to topic…** tags the note with [topics](/knowledge/topics-and-keywords). |

Click **Add link** to add one, and **Remove link** to take it off.

## Voice notes and dictation

- **Voice memo**: type **/** and choose **Voice memo** to record up to 5 minutes from your microphone. The memo is saved in the note with a player. You can pause and resume while recording.
- **Dictation**: choose **Dictate** in the **⋮** menu, use the microphone in the Ask AI bar, or hold your dictation shortcut. Your speech is typed into the note at the cursor. The dictation bar lets you pause, stop and change the **Language**, and **Polish on stop** cleans up the text when you finish. See [Dictation](/voice/dictation).
- **Audio files**: paste, drop or upload audio files up to 50 MB.

## Ask AI in a note

The **Ask AI** bar at the bottom of the note writes or changes text for you. Turn it on or off from the **⋮** menu (**Ask AI bar**).

- Type what you want, for example "Turn this into an agenda", and press `Enter`.
- Choose what the AI sees with **Share with AI**: **No context**, **Selected text**, **Previous paragraphs** or **Full note**.
- Select text first for quick actions: **Polish** (reads more naturally, same meaning), **Fix grammar**, **Shorter** and **Expand**.
- Review the result, then **Insert at cursor**, **Insert below**, **Replace selection**, **Regenerate** or **Discard**.

The Ask AI bar needs an AI model. If none is assigned, it tells you to assign a provider in **Settings → AI Providers**. See [Providers and models](/ai/providers-and-models).

## Note templates

Note templates give you a ready-made structure of headings, writing hints and starter text. TalkBar includes **44** built-in note templates in nine categories:

| Category | Templates |
| --- | --- |
| **General** | 8 |
| **Sales** | 5 |
| **Customer success** | 4 |
| **Product** | 5 |
| **Engineering** | 5 |
| **Hiring** | 4 |
| **Leadership** | 5 |
| **People** | 4 |
| **Personal & learning** | 4 |

Examples include Meeting notes, 1:1, Daily standup, Decision record, Discovery call, Quarterly business review, Feature spec, Sprint planning, Incident postmortem, Interview debrief, Board meeting, Weekly review and Reading notes.

### Use a template

- On the Notes page, click **From template…**.
- In a note, type **/** and choose **Template**, use **Start from a template** in an empty note, or choose **Insert template** in the **⋮** menu.

The picker lets you search templates by name, category or heading and preview the layout before you insert it. Pinned and recent templates appear near the top. Inserting a template keeps what you already wrote and your note's title, and **Undo** removes the insertion in one step.

In a session note, the picker also offers **This session's summary sections**: the headings of the session template pinned to that session.

Applying a template does not fill it with AI. Writing hints show in gray while a section is empty and never become note text.

### Make your own

Manage note templates in **Settings → Templates & Skills → Note templates**. You can pin templates, turn them off to hide them from the picker, export them, and restore an edited built-in template to its original wording. Creating, editing, duplicating and importing templates needs the Plus plan or higher. See [Templates and skills settings](/settings/templates-and-skills).

## Pin, share and trash

- **Pin** keeps a note at the top of your list.
- **Share** publishes the note as a link. See [Share links](/sharing/share-links).
- **Move to trash** moves the note to **Trash**. If you leave a note empty, TalkBar asks whether to keep it or move it to Trash.

In **Trash**, **Restore** brings a note back and **Delete permanently** removes it. **Empty trash** permanently deletes every note in Trash.

## Related

- [Ask TalkBar](/chats-and-notes/ask-talkbar)
- [Dictation](/voice/dictation)
- [Topics and keywords](/knowledge/topics-and-keywords)
- [Templates and skills settings](/settings/templates-and-skills)
- [Share links](/sharing/share-links)
