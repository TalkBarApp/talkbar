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

A note starts with its title. Below the title are the [links row](#link-a-note) and then the text. Type a title first, or come back to it later.

The editor saves as you type. The bar above the title shows **Back**, the save status (**Unsaved changes**, **Saving…**, **Saved**), a **Pin** button and the **⋮** menu.

The **⋮** menu has **Insert template**, **Formatting toolbar**, **Bubble menu**, **Ask AI bar**, **Dictate**, **Share**, **Copy as markdown**, **Export as markdown**, **Keyboard shortcuts** and **Move to trash**.

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
| **Ask AI** | Writes or generates content with AI at that spot. See [the Ask AI block](#the-ask-ai-block). |
| **Memory** | Embeds a snapshot of a saved memory card. |
| **Timeline** | Embeds a section from a session timeline. |
| **Action item** | Embeds an action item you can check off in the note. |
| **Transcript chunk** | Embeds a piece of the transcript. Session notes only. |
| **Timestamp** | Inserts the current session time. Live session notes only. |
| **Template** | Inserts a note template. |
| **Dictate** | Speaks into the note at the cursor. |

Select text to see the formatting bubble (**Bold**, **Italic**, **Underline**, **Highlight**, **Link**). In the **⋮** menu, **Bubble menu** turns this bubble on or off, **Formatting toolbar** shows a toolbar above the note, and **Keyboard shortcuts** lists the editor's shortcuts.

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
- **Dictation**: type **/** and choose **Dictate**, click **Dictate into the note** in the Ask AI bar, or hold your dictation shortcut. Your speech is typed into the note at the cursor. The dictation bar lets you pause, stop and change the **Language**, and **Polish on stop** cleans up the text when you finish. **Dictate** in the **⋮** menu shows or hides the dictate button. See [Dictation](/voice/dictation).
- **Audio files**: paste, drop or upload audio files up to 50 MB.

## Ask AI in a note

A note has two ways to use AI: the **Ask AI bar** at the bottom of the note, and the **Ask AI** block you insert with **/**. Both need an AI model. If none is assigned, the bar tells you to assign a provider in **Settings → AI Providers**. See [Providers and models](/ai/providers-and-models).

### The Ask AI bar

The **Ask AI bar** writes or changes text for you. Turn it on or off from the **⋮** menu (**Ask AI bar**). To jump to it from anywhere in the note, press `Ctrl+J`, or `Cmd+J` on macOS.

- Type what you want, for example "Turn this into an agenda", and press `Enter`. `Shift+Enter` starts a new line.
- With text selected, the request is about that text, and the bar shows **Replace selection**. With nothing selected, the AI reads the note's title and text, and the bar shows **Insert at cursor**. In a session note, it also reads that session's summary or timeline so far and the latest transcript.
- Click an [AI command](#ai-commands) to run a ready-made request.
- Review the result. With selected text, choose **Replace selection** or **Insert below**. Otherwise choose **Insert at cursor**. **Regenerate** asks again, and **Discard** drops the result.

### AI commands

AI commands are one-click requests. The first four sit in the Ask AI bar, and the rest are under **More**. TalkBar includes nine:

| Command | What it does | Needs selected text |
| --- | --- | --- |
| **Polish** | Makes the text read more naturally, with the same meaning and tone. | Yes |
| **Fix grammar** | Fixes spelling, grammar and punctuation only. | Yes |
| **Shorter** | Makes the text much shorter and keeps every key point. | Yes |
| **Expand** | Adds detail, examples and clearer structure. | Yes |
| **Summarize** | Summarizes the selected text, or the whole note, in a few sentences. | No |
| **Bullet points** | Turns the text into a bulleted list. | Yes |
| **Action items** | Lists the action items in the selected text, or the whole note, as a checklist. | No |
| **Simplify** | Rewrites the text in plain language. | Yes |
| **Continue writing** | Adds one or two paragraphs from the cursor. | No |

**More** also has a search box that covers every command, **Add command** and **Manage AI commands**.

**Manage AI commands** opens the **AI commands** window:

- Drag a command to change the order. The first four shown commands are marked **In the bar**.
- Use the switch to show or hide a command.
- The pencil button edits a command: its **Title** (up to 40 characters), its **Prompt (optional)** (up to 1,000 characters; when empty, the title is sent as the request) and **Needs selected text**.
- **Reset to default** restores a built-in command you edited. Built-in commands can be hidden but not deleted.
- **Add command** creates your own, up to 30. You can delete your own commands.

### Which language the AI writes in

The AI keeps the language of the text it works on: the selected text, or the note. In an empty note, it uses your [**Response Language**](/settings/ai-providers#response-language) setting. With **Auto**, the default, an empty note uses the language of your request. To get another language, ask for it in the request.

### The Ask AI block

Type **/** and choose **Ask AI** to open a prompt at that spot in the note. **Share with AI** chooses what the AI sees: **No context**, **Selected text**, **Previous paragraphs** (the default) or **Full note**. Press `Enter` to generate, then choose **Accept**, **Reject** or **Regenerate**.

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
- **Move to trash** moves the note to **Trash**. If you leave a note empty, TalkBar asks whether to **Keep note** or **Move to trash**.

In **Trash**, **Restore** brings a note back. **Delete** removes it for good after you confirm with **Delete permanently**. **Empty trash** permanently deletes every note in Trash after you confirm.

## Related

- [Ask TalkBar](/chats-and-notes/ask-talkbar)
- [Dictation](/voice/dictation)
- [Topics and keywords](/knowledge/topics-and-keywords)
- [Templates and skills settings](/settings/templates-and-skills)
- [Share links](/sharing/share-links)
