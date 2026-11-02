---
title: Notes
description: Write notes in TalkBar with blocks and shortcuts, 44 note templates, your own AI commands, links to sessions and projects, voice memos and dictation.
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
| **Search** | Finds notes by title or text. It also works in **Trash**. |

::screenshot{src="/screenshots/chats-and-notes/notes-page.png" alt="Notes page with the New note, From template… and Import markdown buttons, the All notes/Pinned/Trash tabs, project and topic filters, and a list of notes grouped by day" caption="The Notes page"}
::

Active filters and a changed sort show above the list, where you can remove them.

Each note's menu in the list has **Open**, **Pin** (**Unpin** on a pinned note), **Link to project**, **Link to session**, **Add to Topic**, **Share**, **Copy as markdown**, **Export as markdown** and **Move to trash**.

## Session notes

Every session also has its own note. Write in it while you record (the **Notes** panel of the live session) or afterwards on the session's **Notes** tab. It is named after the session, for example "Session notes: Planning".

A session note works like any other note, with these additions:

- The **/** menu adds **Transcript chunk**, and **Timestamp** while you record.
- **@** lists the session's speakers first.
- With nothing selected, Ask AI also reads the session. See [What the AI can see](#what-the-ai-can-see).
- The template picker offers **This session's summary sections**.
- Select text in the session's transcript or summary and choose **Add to notes** to embed it in the note.

Session notes keep their own display settings, apart from notes you open from the Notes page. During a recording, the **View** menu of the **Notes** panel has **Show toolbar**, **Bubble menu**, **Ask AI** and **Dictate**. By default the toolbar is off and the others are on.

The session's **Notes** tab also has **Linked notes**: other notes [linked](#link-a-note) to this session. You can open them or remove the link there.

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
| **Table** | A 3×3 table with a header row. In a table, **Table: Add Row**, **Table: Add Column**, **Table: Delete Row**, **Table: Delete Column** and **Table: Delete Table** change it. |
| **Image** | Upload or embed an image. You can also paste or drop images. Drag a handle to resize. **Align left**, **Align center** and **Align right** place it. |
| **YouTube** | Embeds a YouTube video from its link. |
| **Audio** | Uploads an audio file (up to 50 MB). |
| **Voice memo** | Records a voice memo (see below). |
| **Quick poll** | A question with **Yes / No** or **Yes / Neutral / No** answers. In the block's menu, **Edit poll** changes the question and options (**Add option**), and **Clear answer** removes your answer. |
| **Ask AI** | Writes or generates content with AI at that spot. See [the Ask AI block](#the-ask-ai-block). |
| **Memory** | Embeds a snapshot of a saved memory card. See [Embedded blocks](#embedded-blocks). |
| **Timeline** | Embeds a section from a session timeline. See [Embedded blocks](#embedded-blocks). |
| **Action item** | Embeds an action item you can check off in the note. See [Embedded blocks](#embedded-blocks). |
| **Transcript chunk** | Embeds a piece of the transcript. Session notes only. See [Embedded blocks](#embedded-blocks). |
| **Timestamp** | Inserts the current session time. Live session notes only. |
| **Template** | Inserts a note template. |
| **Dictate** | Speaks into the note at the cursor. |

Type words after **/** to filter the menu. Markdown-style typing also works: `# ` for a heading, `- ` for a bullet, `1. ` for a numbered item and `> ` for a quote.

Type **@** to mention someone from your contacts.

Select text to see the formatting bubble: **Bold**, **Italic**, **Underline**, **Strikethrough**, **Highlight** (with a choice of colors), **Inline code**, **Link** and **Clear formatting**. In the **⋮** menu, **Bubble menu** turns this bubble on or off. **Formatting toolbar** shows a toolbar above the note, which also has headings, **Image**, **Code block**, **Blockquote**, lists and **Horizontal rule**. It is off by default.

### Embedded blocks

**Memory**, **Timeline**, **Action item** and **Transcript chunk** open the **Insert block** window, with a tab for each kind. Search for what you want. **Timeline** and **Transcript** need a session first (**Choose a session…**); in a session note, that session is already chosen.

Memory, timeline and transcript blocks are snapshots. They keep the text from when you inserted them and do not follow later changes. The block's menu has:

- **Edit text**: changes the text in this note only.
- **Open source**: opens the original.
- **Remove**: takes the block out of the note. The original stays.

An action item block is live. It shows the item as it is now, and **Mark done** or **Reopen** changes the item itself.

### Links

Type or paste a web address and it becomes a link. To link other text, select it and click **Link** in the bubble. Select linked text and click **Link** again to change or remove the link.

Clicking a link in a note you can edit only places the cursor. To open it in your browser, hold `Ctrl` and click (`Cmd` on macOS). Links TalkBar generated to your sessions and other items open with a plain click.

### Keyboard shortcuts

| Action | Windows | macOS |
| --- | --- | --- |
| Open the block menu | `/` | `/` |
| Mention someone | `@` | `@` |
| Bold | `Ctrl+B` | `Cmd+B` |
| Italic | `Ctrl+I` | `Cmd+I` |
| Underline | `Ctrl+U` | `Cmd+U` |
| Highlight | `Ctrl+Shift+H` | `Cmd+Shift+H` |
| Task list | `Ctrl+Shift+9` | `Cmd+Shift+9` |
| Clear formatting | `Ctrl+\` | `Cmd+\` |
| Undo | `Ctrl+Z` | `Cmd+Z` |
| Redo | `Ctrl+Y` or `Ctrl+Shift+Z` | `Cmd+Shift+Z` |
| Jump to the Ask AI bar | `Ctrl+J` | `Cmd+J` |

**Keyboard shortcuts** in the **⋮** menu shows a short list under the note. It always writes `Ctrl`; on macOS, press `Cmd` instead.

### Markdown

Notes work well with Markdown:

- Paste Markdown and it keeps its formatting.
- **Import markdown** on the Notes page turns a `.md`, `.markdown` or `.txt` file into a note. The first `#` heading becomes the title; without one, the file name does.
- **Copy as markdown** puts the note on the clipboard, and **Export as markdown** saves a `.md` file where you choose. Both are in the **⋮** menu and in the note's menu in the list.
- Embedded blocks that can't be written as Markdown are left out. **Export as markdown** and the list's **Copy as markdown** tell you when that happens. The [Ask AI block](#the-ask-ai-block) is never exported.

## Link a note

The links row under the title connects the note to other things, so it shows up there and AI can use it:

| Link | What it does |
| --- | --- |
| **Session** | Links the note to a recorded session. |
| **Scheduled session** | Links the note to a session you are preparing. The note opens alongside the session when you record. |
| **Project** | Files the note under a project. The Notes page can filter by it. |
| Topics | **Add to topic…** tags the note with [topics](/knowledge/topics-and-keywords). |

To add a link, click **Link…**, choose **Session**, **Project** or **Scheduled session**, choose the item (**Choose a target…**) and click **Add link**. **Remove link** on a link takes it off. Clicking a link opens that item.

## Voice notes and dictation

- **Voice memo**: type **/** and choose **Voice memo** to record up to 5 minutes from your microphone. The memo is saved in the note with a player. You can pause and resume while recording.
- **Dictation**: type **/** and choose **Dictate**, click **Dictate into the note** in the Ask AI bar, or hold your dictation shortcut. Your speech is typed into the note at the cursor. The dictation bar lets you pause, stop and change the **Language**, and **Polish on stop** cleans up the text when you finish. **Dictate** in the **⋮** menu shows or hides the dictate button. See [Dictation](/voice/dictation).
- **Audio files**: paste, drop or upload audio files up to 50 MB.

## Ask AI in a note

A note has two ways to use AI: the **Ask AI bar** at the bottom of the note, and the **Ask AI** block you insert with **/**. [AI commands](#ai-commands) are ready-made requests in the bar.

All of them use the **Ask AI** feature, in the **Chat & Ask AI** group of **Settings → AI Providers → AI Features**. That setting decides the model; you can't choose one in the note. If the feature is off, or no model can run it, the bar shows a message saying what to change. See [Providers and models](/ai/providers-and-models).

### The Ask AI bar

The **Ask AI bar** writes or changes text for you. Turn it on or off from the **⋮** menu (**Ask AI bar**). To jump to it from anywhere in the note, press `Ctrl+J`, or `Cmd+J` on macOS.

1. Select the text you want changed, or place the cursor where new text should go.
2. Click the bar. It opens and shows its target, which is also highlighted in the note:
   - **Replace selection** and the start of the selected text. Click **×** (**Clear selection**) to work from the cursor instead.
   - **Insert at cursor** when nothing is selected.
3. Type what you want, for example "Turn this into an agenda", and press `Enter`. `Shift+Enter` starts a new line. Or click an [AI command](#ai-commands).
4. Wait while the bar shows **Generating…** and the elapsed time. **Cancel** stops the request.
5. [Review the result](#review-the-result).

The bar has two voice buttons. **Dictate message** speaks your request into the bar. **Dictate into the note** speaks into the note itself. See [Voice notes and dictation](#voice-notes-and-dictation).

### What the AI can see

The bar sends only what this table lists:

| When you ask | The AI gets |
| --- | --- |
| With text selected | The selected text and the note's title. Not the rest of the note, and not the session. |
| With nothing selected | The note's title, its text up to 24,000 characters (later text is left out) and the text just before the cursor. |
| With nothing selected, in a session note | The same, plus that session's summary or timeline so far and the latest transcript. |

To change what the AI sees, change the selection, or use the [Ask AI block](#the-ask-ai-block), where you choose. Links, topics, other notes and knowledge cards are not sent. To ask across your workspace, use [Ask TalkBar](/chats-and-notes/ask-talkbar).

Words from an [ignored speaker](/voice/speakers) are never sent.

### Review the result

The result shows in the bar and nothing changes in the note until you choose:

| Button | What it does |
| --- | --- |
| **Replace selection** | Replaces the selected text. Shown when you asked with text selected. |
| **Insert below** | Adds the result after the selected text and keeps that text. Shown when you asked with text selected. |
| **Insert at cursor** | Adds the result where the cursor is now, not where it was when you asked. |
| **Regenerate** | Asks again with the same request and the same text. |
| **Discard** | Drops the result. `Esc` does the same. |

After you apply a result, **Undo** (`Ctrl+Z`, or `Cmd+Z` on macOS) takes it back. If you changed the selected text while waiting, TalkBar says **The selection changed — select the text again** and keeps the result.

TalkBar checks each reply. It removes comments around the text, such as "Here's the result:". If a reply is empty, too long or looks like a refusal, it asks again, up to three attempts and five minutes in total. The bar shows the attempt, such as **Attempt 2 of 3**. If the last reply still fails a check, you see it with the reason and can decide yourself. If there is nothing to show, the bar shows the error; press `Enter` to try again.

You can leave the note while the AI works. The request keeps running, and the result waits when you come back, in the Notes page and the session views alike. If you left, an answer about selected text can only use **Insert at cursor**. If TalkBar closes during a request, that result is lost.

### Which language the AI writes in

The AI keeps the language of the text it works on: the selected text, or the note. In an empty note, it uses your [**Response Language**](/settings/ai-providers#response-language) setting. With **Auto**, the default, an empty note uses the language of your request. To get another language, ask for it in the request. AI commands follow the same rule, whatever language their prompt is in.

### Private AI and private sessions

- **[Private AI Mode](/ai/private-ai-mode) on**: requests run only on the local model assigned to **Ask AI**. Cloud and CLI providers are blocked. If no local model can run it, the bar says so.
- **A note of a private session, or of a session in Sensitive memory mode**: the session's summary, timeline and transcript are not sent. The note's own text still goes to your **Ask AI** model. A private session keeps Private AI Mode on only until its final summary is done. After that, a request in its note goes to your usual model, which may be a cloud provider.

### The Ask AI block

Type **/** and choose **Ask AI** to open a prompt at that spot in the note. Unlike the bar, the block lets you choose what is shared, and the answer takes the block's place.

**Share with AI** chooses what the AI sees. What will be shared is highlighted in the note:

| Choice | What is shared |
| --- | --- |
| **No context** | No note text. |
| **Selected text** | The text selected in the note. |
| **Previous paragraphs** | The three blocks above the prompt. The default. |
| **Full note** | The whole note. |

The block shares up to 12,000 characters and keeps the text closest to it. The note's title is always sent. In a session note, the session's summary or timeline and the latest transcript are also sent with every choice, including **No context**, unless the session is private or in Sensitive memory mode.

Press `Enter` to generate; `Shift+Enter` starts a new line. `Esc` or **Close Ask AI** removes the block. **Cancel** stops a running request.

- **Accept** replaces the block with the answer.
- **Reject** returns to the prompt.
- **Regenerate** asks again.
- If the request fails, choose **Try again** or **Dismiss**.

AI commands are not available in the block.

## AI commands

AI commands are one-click requests. The first four shown commands sit in the Ask AI bar, and the rest are under **More**. Each command has a title and a prompt, the text the AI receives.

### Built-in commands

Every workspace starts with these nine, in this order:

| Command | What it does | Needs selected text |
| --- | --- | --- |
| **Polish** | Makes the text read more naturally, with the same meaning and tone. Removes filler words. | Yes |
| **Fix grammar** | Fixes spelling, grammar, punctuation and capitalization only. | Yes |
| **Shorter** | Makes the text much shorter and keeps every key point. | Yes |
| **Expand** | Adds detail, examples and clearer structure. | Yes |
| **Summarize** | Summarizes the selected text, or the whole note, in a few sentences. | No |
| **Bullet points** | Turns the text into a bulleted list and adds nothing new. | Yes |
| **Action items** | Lists the action items in the selected text, or the whole note, as a checklist. | No |
| **Simplify** | Rewrites the text in plain language. | Yes |
| **Continue writing** | Adds one or two paragraphs from the cursor. | No |

### Run a command

1. Select text if the command needs it. Without a selection, those commands are dimmed and say **Select text in the note first**.
2. Click the command in the bar, or click **More** and choose it there.
3. [Review the result](#review-the-result) as usual.

With text selected, a command works on that text. A command that doesn't need a selection can also run without one: it then reads the note, as [the table above](#what-the-ai-can-see) shows, and offers **Insert at cursor**.

The command's title appears in the request box, and the AI gets its prompt. If you edit the title there and press `Enter`, your edited text is sent instead. Typing the exact title of a shown command and pressing `Enter` runs that command.

**More** has a search box. It finds every shown command by title or prompt, including those in the bar, but not hidden ones. Use the arrow keys to move, or press `Enter` in the search box to run the first match. `Esc` closes **More** and keeps the bar open. With four or fewer shown commands, **More** says **Every command is in the bar.**

### Add your own command

1. Click **More** → **Add command**. **Add command** is also in **Manage AI commands**.
2. In **New AI command**, fill in:
   - **Title** (required, up to 40 characters): the name on the button.
   - **Prompt (optional)** (up to 1,000 characters): what you want done. TalkBar adds the selected text or the note for you. When empty, the title is sent as the request.
   - **Needs selected text** (off by default): when on, the command is dimmed until you select text. When off, it runs either way.
3. Click **Save**.

For example, a command titled "Make it formal" could have the prompt "Rewrite this text in a formal, polite tone. Keep every fact and name." and **Needs selected text** on.

A new command goes last in the list. To put it in the bar, [drag it](#manage-ai-commands) into the first four. You can add up to 30 of your own in a workspace; built-in commands don't count.

### Manage AI commands

**More** → **Manage AI commands** opens the **AI commands** window with every command and the total count. **Done** closes it and returns to the bar.

| To | Do this | Good to know |
| --- | --- | --- |
| Reorder | Drag a command by its handle. | The first four shown commands are marked **In the bar**. |
| Show or hide | Use the switch. | A hidden command leaves the bar, **More** and search. It stays here, dimmed. The next shown command moves into the bar. Hiding doesn't count as an edit. |
| Edit | Click the pencil button. | **Edit AI command** has the same fields as a new command. The list shows your prompt, **Built-in prompt** for an unedited built-in, or **Sends the title as the request** when the prompt is empty. |
| Reset a built-in | Click **Reset to default**, in the list or in the edit form. | Shown only after you edit a built-in. It restores the title, prompt and **Needs selected text**. The command keeps its place and whether it is shown. |
| Delete your own | Click the trash button, in the list or in the edit form, and confirm **Delete this command?** | This can't be undone. Built-in commands can be hidden but not deleted. |

A built-in command's title follows the app language until you rename it. Its prompt is in English in every language, and you see that English text when you edit it. Either way, the result follows the note's language, as described in [Which language the AI writes in](#which-language-the-ai-writes-in).

Commands have no duplicate action. To copy one, add a new command with the same text.

### Where commands are kept

- **Per workspace**: each workspace has its own list, order and edits. They are stored on this computer with the workspace.
- **Plans**: AI commands are available on every plan.
- **Moving them**: there is no separate export. A [backup](/data/backup-and-restore) includes them, and so does a [transfer file](/data/backup-and-restore#transfer-to-another-device) with **Settings, templates and AI setup** selected. On import, built-in commands take the file's version and your own are added.
- **Starting over**: **Reset workspace data** brings back the nine built-ins and removes your own. See [Resets](/data/backup-and-restore#resets).

## Note templates

Note templates give you a ready-made structure of headings, writing hints and starter text. TalkBar includes **44** built-in note templates in nine categories:

| Category | Count | Templates |
| --- | --- | --- |
| **General** | 8 | Meeting notes, 1:1, Daily standup, Brainstorm, Decision record, Quick call, Workshop, Project kickoff |
| **Sales** | 5 | Discovery call, Product demo, Deal review, Negotiation, Sales to CS handoff |
| **Customer success** | 4 | Onboarding kickoff, Customer check-in, Quarterly business review, Support escalation |
| **Product** | 5 | User interview, Feature spec, Design review, Roadmap planning, Launch plan |
| **Engineering** | 5 | Sprint planning, Retrospective, Technical design review, Incident postmortem, Bug triage |
| **Hiring** | 4 | Hiring interview, Interview debrief, Role kickoff, Reference check |
| **Leadership** | 5 | Leadership sync, Board meeting, Investor update, Strategy offsite, All-hands |
| **People** | 4 | Performance review, Career conversation, Difficult conversation, Exit interview |
| **Personal & learning** | 4 | Daily journal, Weekly review, Reading notes, Lecture notes |

### Use a template

- **New note from a template**: on the Notes page, click **From template…**, choose a template and click **Create note**. The new note has no title yet.
- **Into a note you are writing**: type **/** and choose **Template**, use **Start from a template** in an empty note, or choose **Insert template** in the **⋮** menu. Then choose a template and click **Insert**.

The **Choose a note template** window shows a preview of the layout next to the list:

- **Search templates…** finds templates by name, description, category or heading.
- **All categories** narrows the list to one category.
- The list starts with **Pinned**, **Recently used** (the last five) and **My templates** (your own and edited built-ins), and then the categories.
- The arrow keys move through the list and `Enter` confirms.
- Templates you turned off don't appear.

The template goes after the block with the cursor and replaces an empty line there. The cursor moves to the first empty place to write. Inserting a template keeps what you already wrote and your note's title, and **Undo** (`Ctrl+Z`, or `Cmd+Z` on macOS) removes the insertion in one step.

Built-in headings and hints use the app language at the moment you insert them.

In a session note, the picker also offers **This session's summary sections**: the headings of the session template pinned to that session.

Applying a template does not fill it with AI. Writing hints show in gray while a section is empty and never become note text.

### Make your own

Creating, editing, duplicating and importing note templates needs the Plus plan or higher.

To start from a note you are writing, open the picker from that note and click **New template**. Each heading in the note becomes a section. From **From template…** on the Notes page, **New template** starts empty.

In **New note template**, fill in **Name**, **Icon**, **Category** and **Description**, and add up to 12 sections with **Add section**. Each section has a **Section heading**, a **Writing hint** and optional **Starter content**: **Paragraph**, **Bullets**, **Numbered list** or **Checklist**. Hints show only while the section is empty. Starter content becomes real text in every new note. Click **Save template** and the new template is selected in the picker.

**Manage templates** in the picker opens **Settings → Templates & Skills → Note templates**. There you can pin templates, turn them off to hide them from the picker, export them, and restore an edited built-in template to its original wording. See [Templates and skills settings](/settings/templates-and-skills#note-templates).

## Pin, share and trash

- **Pin** keeps a note at the top of your list and adds it to **Pinned**. **Unpin** takes it off. **Pinned on top** on the Notes page decides whether pinned notes stay first in **All notes**.
- **Share** publishes the note as a link. See [Share links](/sharing/share-links).
- **Move to trash** asks you to confirm, then moves the note to **Trash**. From the note itself, the confirmation message has **Undo**.
- If you leave a note empty, TalkBar asks every time whether to **Keep note** or **Move to trash**.

In **Trash**, **Restore** brings a note back. **Delete** removes it for good after you confirm with **Delete permanently**. **Empty trash** permanently deletes every note in Trash after you confirm.

TalkBar also empties Trash on its own after 30 days by default. Change this in [**Settings → General → Trash cleanup**](/settings/general#trash-cleanup).

## Related

- [Ask TalkBar](/chats-and-notes/ask-talkbar)
- [Providers and models](/ai/providers-and-models)
- [Private AI Mode](/ai/private-ai-mode)
- [Backup and restore](/data/backup-and-restore)
- [Dictation](/voice/dictation)
- [Topics and keywords](/knowledge/topics-and-keywords)
- [Templates and skills settings](/settings/templates-and-skills)
- [Share links](/sharing/share-links)
