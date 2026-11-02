---
title: Templates & Skills
description: Reference for Settings → Templates & Skills — session templates, summary sections, note templates, skills and knowledge skills, and what you can do with each.
navigation:
  icon: i-heroicons-rectangle-group
---

**Settings → Templates & Skills** holds the reusable building blocks TalkBar uses with AI. It has five inner tabs: **Session templates**, **Summary sections**, **Note templates**, **Skills** and **Knowledge**. This page lists what each tab shows and the actions available. For what templates and skills do in a session, see [Templates and skills](/sessions/templates-and-skills).

::callout{icon="i-heroicons-lock-closed" color="amber"}
Creating, editing, duplicating and importing session templates, summary sections and note templates needs the Plus, Pro or Business plan. Creating, editing, duplicating and importing skills and knowledge skills needs the Pro or Business plan. On every plan you can view items, turn them on or off, pin them, set the default, export them, restore built-ins and delete your own. On a plan without these actions, a **Custom templates** or **Custom skills** note with the required plan takes the place of the buttons, and **Edit** and **Duplicate** leave the menus. See [Plans and license](/data/plans-and-license).
::

## Common controls

**Session templates**, **Note templates**, **Skills** and **Knowledge** work the same way:

- A count next to the tab title shows how many items are turned on.
- A search field and a category (or group) filter narrow the list. The filter can select several at once.
- Each card has a switch that turns the item on or off. Turned-off items show a **Disabled** badge and stay in the list so you can turn them back on.
- Each card has a pin button. On the **Knowledge** tab, it is a bookmark that marks a default.
- Click a card to open it read-only. To see its actions, click the **⋮** button or right-click the card.
- Built-in items you have changed show an **Edited** badge. Point at it to see when. Items you created or imported show a **User** badge.
- **Export** saves the item as a Markdown file, after you choose where.
- **Restore built-in** returns an edited built-in to its original content, after you confirm. It appears only on built-ins you have changed. On/off state and pins stay.
- **Delete** is available only on items you created or imported, after you confirm. Built-ins can be turned off but not deleted.

### Import

| Tab | Files it reads | What happens |
| --- | --- | --- |
| **Session templates** | `.md`, `.markdown`, `.yml` or `.yaml` exported from TalkBar | Adds one template to **Custom** right away. If the name is taken, TalkBar adds *(imported)*. |
| **Note templates** | `.md`, `.markdown`, `.yml` or `.yaml` exported from TalkBar, up to 1 MB | Adds one template to the category in the file right away. If the name is taken, TalkBar adds a number. |
| **Skills** | `.md`, `.markdown` or `.txt`, up to 64 KB | Opens the editor so you can check the skill. **Import skill** adds it. See [Manage and create skills](/sessions/templates-and-skills#manage-and-create-skills). |
| **Knowledge** | `.md`, `.markdown` or `.txt`, up to 64 KB | Opens the editor as **Import knowledge skill**. A file with no knowledge category goes to **Essentials**. **Import skill** adds it. |

Importing a file made from a built-in adds a copy of your own. It never changes the built-in.

## Session templates

A session template describes a type of session: the summary sections the AI writes, its instructions, and how speakers are captured. Enabled templates are offered when you start a session.

::screenshot{src="/screenshots/settings/templates-session-templates.png" alt="Settings → Templates & Skills with the Session templates inner tab selected, showing the New template and Import buttons, the search field and category filter, the Pinned group and template cards with their on/off switches" caption="Session templates"}
::

TalkBar ships 28 built-in session templates, 15 of them turned on, such as **Meeting**, **1:1**, **Call**, **Interview** and **Voice Note**. They are grouped by category: **Meetings**, **Calls & one-on-ones**, **Clients & deals**, **Interviews**, **Listening**, **Solo**, your own category names in alphabetical order, and **Custom** last for templates you create, copy or import. See the [full list](/sessions/templates-and-skills#what-each-built-in-includes).

| Control | What it does |
| --- | --- |
| **New template** | Opens the template editor for a new template. |
| **Import** | Adds a template from a file. See [Import](#import). |
| **Search session templates…** | Searches names, descriptions and section headings. |
| **Filter by category** | Shows only the selected categories. |
| **Pinned** group | Pinned templates are offered first when you start or schedule a session. Drag them to reorder. New workspaces start with **Call**, **Meeting**, **1:1** and **Podcast** pinned. While you search or filter, dragging is off. |
| Card footer | Shows the number of sections and the on/off switch. |

Actions in a template card's menu:

| Action | What it does |
| --- | --- |
| **Edit** | Opens the [template editor](#template-editor). |
| **Pin** / **Unpin** | Adds the template to, or removes it from, the **Pinned** group. |
| **Duplicate** | Makes an editable copy in **Custom**. |
| **Set as default** | Makes it the default template. The current default shows a **Default** badge. Meeting is the default until you change it. Not available for turned-off templates. Last-used and pinned templates are preselected ahead of it; see [Which template a session starts with](/sessions/templates-and-skills#which-template-a-session-starts-with). |
| **Export…** | Saves the template as a Markdown file. |
| **Restore built-in** | Replaces your changes with the original built-in. Existing sessions keep the version they used. |
| **Delete** | Removes a template you created. Completed sessions keep their summaries, and series that used it lose it as their template. |
| **Create note template from headings** | Starts a new note template in **General** that uses this template's name, icon and section headings. It is saved only when you click **Save template**. |

### Template overview

Clicking a card opens a read-only overview: the name, description and badges, **Session context**, **Sections** with their instructions and shapes, **Custom AI instructions** if set, and **Details** (**Capture**, **Live notes** and the number of **Vocabulary** terms). Its buttons are **Edit**, **Restore built-in** on an edited built-in, and **Close**.

### Template editor

| Field | What it does | Limit or default |
| --- | --- | --- |
| **Name** | The template's name. Required. | Up to 80 characters |
| **Icon** | The icon on cards and in the New session window. | |
| **Category** | The group it appears in. **New category…** lets you type your own; a name that matches an existing category joins it. | Starts in **Custom**. New names up to 40 characters |
| **Description** | One line about when to use it. | Up to 300 characters |
| **Session context** | What these sessions are, who is in them and what matters. | Up to 2,000 characters |
| **Sections** | The summary sections, in order. Edit the heading and instructions in place. Drag to reorder. **Add section** adds a row. Repeated headings show **Duplicate heading**. | Up to 10. Each needs a heading and instructions |
| **Section options** | Shows the **Output key** (a fixed name TalkBar uses to store the section), and lets you choose the shape, **Enable section** / **Disable section**, or **Remove section**. | New sections are **Bullets** |
| **Capture** (**Advanced settings**) | **Microphone**, **System audio** or **Microphone + system**. | **Microphone + system** |
| **Fewest speakers**, **Usual speakers**, **Most speakers** | The expected number of speakers and the range it stays in. **Usual speakers** sets what the New session window suggests: 2 is **You + 1**, 5 or more is **Large (5–8)**, anything else is **Small (2–4)**. | 1 to 16. Defaults: 1, 2 and 6 |
| **Separate speakers** | On: **Speakers are separated automatically.** Off: **Everything is transcribed as one speaker.** and the window suggests **Just you**. | On |
| **Live notes** | **Solo notes — capture your own thinking**, **Content — follow what is being presented** or **Conversation — track who said what**. | **Conversation** |
| Live note instructions | **Extra guidance for the live note-taker.** | Up to 2,000 characters |
| **Knowledge focus** | What this template should watch for when saving knowledge. | Up to 2,000 characters |
| **Vocabulary** | Names, products and jargon to use in AI notes and summaries. Enter a **Term** and an optional **Hint (optional)**, then click **Add** or press `Enter`. A term already on the list is ignored. | Up to 100 terms |
| **Custom AI instructions** | Extra instructions added to the summary: tone, formatting, things to always include or avoid. | Up to 1,000 characters |

The footer has **Save template**, **Duplicate** (saves a copy and opens it), **Restore built-in** on an edited built-in, and **Cancel**.

## Summary sections

This tab lists every summary section, grouped by the session template that owns it, so you can tune sections without opening each template. It includes templates that are turned off. Each group also shows the template's **Session context** and, if set, its **Custom AI instructions**. The count next to the tab title is the number of sections turned on. Unlike the template editor, each change here saves right away.

| Control | What it does |
| --- | --- |
| **Search sections** | Finds sections by heading, instructions or template name. |
| **Filter by category** | Shows only templates in the selected categories. |
| Drag handle | Reorders sections within a template. The summary is written in this order. While you search, dragging is off. |
| **Edit** (**Session context** menu) | Edits the session context in place. **Save** or **Cancel**. Up to 2,000 characters. |
| **Edit** (**Custom AI instructions** menu) | Edits the instructions in place. Up to 1,000 characters. Saving them empty removes them. |

**Template options** menu on each group:

| Action | What it does |
| --- | --- |
| **Add section** | Adds a row with a heading, instructions and a shape from **New section options**. **Save** or **Cancel**. At 10 sections it reads **Add section — limit is 10**. |
| **Add custom AI instructions** | Adds extra instructions for the whole summary. Shown when the template has none. |
| **Restore built-in** | Restores the whole built-in template, after you confirm. Shown when it has been edited. |

**Section options** menu on each section:

| Action | What it does |
| --- | --- |
| **Output key** | Read-only. A fixed name TalkBar uses to store the section. |
| **Edit** | Edits the heading and instructions in place. **Save** or **Cancel**. |
| **Bullets**, **Bullets with owners**, **Timestamped**, **Paragraph**, **Questions and answers** | Sets the [item shape](/sessions/templates-and-skills#summary-sections). The current one has a check mark. |
| **Enable section** / **Disable section** | A disabled section stays on the template but never reaches a summary. |
| **Restore section** | Returns an edited built-in section to its original wording, after you confirm. Shown only on edited sections. |
| **Remove section** | Removes the section, after you confirm. New summaries lose it. Completed sessions keep the summary they already have. |

Section headings are limited to 80 characters and section instructions to 500. On a plan without template editing, trying to change anything here shows your plan limits.

## Note templates

Note templates give a new note a ready-made structure of headings and writing hints. TalkBar ships 44 built-in note templates, grouped by category: **General**, **Sales**, **Customer success**, **Product**, **Engineering**, **Hiring**, **Leadership**, **People** and **Personal & learning**. See [Notes](/chats-and-notes/notes) for how to use them.

| Control | What it does |
| --- | --- |
| **New template** | Opens the [note template editor](#note-template-editor). |
| **Import** | Adds a note template from a file. See [Import](#import). |
| **Search note templates…** / **Filter by category** | Narrow the list. Search also covers categories and section headings. |
| **Pinned** group | Pinned templates are offered first when you write a note. |
| **Edit**, **Duplicate**, **Pin** / **Unpin**, **Export**, **Restore built-in**, **Delete** (card menu) | The standard actions described in [Common controls](#common-controls). **Duplicate** opens the copy in the editor. Deleting a note template or restoring a built-in leaves existing notes unchanged. |

Turning a note template off hides it from the new-note picker; it stays available here.

Clicking a card opens a read-only preview of the layout, with **Edit**, **Restore built-in** on an edited built-in, and **Close**.

### Note template editor

| Field | What it does | Limit or default |
| --- | --- | --- |
| **Name** | The template's name. Required. | Up to 80 characters |
| **Icon** | The icon on cards and in the picker. | |
| **Category** | One of the nine categories. You can't name your own. | **General** |
| **Description** | One line about when to use it. | Up to 300 characters |
| **Section heading** | A heading in the note. Required for every section. | Up to 80 characters. 1 to 12 sections |
| **Writing hint** | Gray guidance while the section is empty. It never becomes note text. | Up to 300 characters |
| **Add starter content** | Text that becomes part of every note. Choose the **Starter content type**. Lists take one item per line. | Up to 24 blocks per section, 50 items per list, 4,000 characters per paragraph or item, 50,000 in total |
| **Section actions** | Sets how the section is written (**Paragraph**, **Bullets**, **Numbered list** or **Checklist**), **Move up**, **Move down** and **Remove section**. You can also drag sections. The last section can't be removed. | **Paragraph** |

The footer has **Save template**, **Duplicate** (makes a copy and continues in it), **Restore built-in** on an edited built-in, and **Cancel**.

## Skills

Skills are reusable AI prompts you pick in a chat, such as **Prepare an agenda** or a follow-up email draft. TalkBar ships 24 built-in skills, grouped as **Before a session**, **During a session**, **After a session**, **Across sessions** and **Writing & editing**. See the [full list](/sessions/templates-and-skills#skills).

::screenshot{src="/screenshots/settings/templates-skills.png" alt="Settings → Templates & Skills with the Skills inner tab selected, showing the New skill and Import buttons, the search field and group filter, the Pinned group and skill cards" caption="Skills"}
::

| Control | What it does |
| --- | --- |
| **New skill** | Opens the [skill editor](#skill-editor). |
| **Import** | Adds a skill from a file. See [Import](#import). |
| **Search skills…** / **Filter skills by group** | Narrow the list. Search also covers the instructions. |
| **Pinned** group | Your go-to skills, kept at the top here and in the chat's skill picker. |
| **Edit**, **Duplicate**, **Pin** / **Unpin**, **Export**, **Restore built-in**, **Delete** (card menu) | The standard actions described in [Common controls](#common-controls). Duplicating opens the copy in the editor. Editing, restoring or deleting a skill leaves previous chats unchanged. |

Clicking a card opens a read-only view of the skill and its **Instructions**, with these buttons: **Use in chat** (opens a new chat with the skill selected; not available while the skill is turned off), **Edit**, **Duplicate**, **Export**, **Restore built-in** on an edited built-in, and **Close**.

### Skill editor

| Field | What it does | Limit or default |
| --- | --- | --- |
| **Name** | The skill's name. Required. | Up to 80 characters |
| **Icon** | The icon here and in chat. | |
| **Group** | The group it appears in. | **Writing & editing** |
| **Description** | One line about what the skill helps you do. | Up to 300 characters |
| **AI Instructions / Prompt** | The task, what to focus on and the output you want. Required. | Up to 4,000 characters, with a live count |

The footer has **Save skill** (**Import skill** when importing), **Duplicate**, **Restore built-in** on an edited built-in, and **Cancel**.

## Knowledge

Knowledge skills tell the AI what to look for when it scans a document or a session and drafts knowledge cards. TalkBar ships 14 built-in knowledge skills, grouped as **Essentials**, **People**, **Customers & deals**, **Projects & delivery** and **Meeting prep**. See the [full list](/sessions/templates-and-skills#knowledge-skills), and [Review and scans](/knowledge/review-and-scans) for how scans use them.

| Control | What it does |
| --- | --- |
| **New knowledge skill** | Opens the editor. The fields match the [skill editor](#skill-editor), with **Category** in place of **Group** (**Essentials** to start with). |
| **Import** | Adds a knowledge skill from a file. See [Import](#import). |
| **Search knowledge skills…** / **Filter by category** | Narrow the list. Search also covers the instructions. |
| **Defaults** group | Up to 3 skills preselected every time you scan. The heading shows how many are set, such as **Defaults (3 of 3)**. Use **Use as default** or **Remove from defaults** in a card's menu, or the bookmark on the card. At 3, TalkBar asks you to remove one first. |
| **Edit**, **Duplicate**, **Export**, **Restore built-in**, **Delete** (card menu) | The standard actions described in [Common controls](#common-controls). Duplicating opens the copy in the editor. |

New workspaces start with three defaults: **Key facts & figures**, **Decisions & commitments** and **Risks & open questions**.

## Related

- [Templates and skills](/sessions/templates-and-skills)
- [Notes](/chats-and-notes/notes)
- [Review and scans](/knowledge/review-and-scans)
- [Knowledge cards](/knowledge/knowledge-cards)
- [Plans and license](/data/plans-and-license)
