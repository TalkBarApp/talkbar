---
title: Templates & Skills
description: Reference for Settings → Templates & Skills — session templates, summary sections, note templates, skills and knowledge skills, and what you can do with each.
navigation:
  icon: i-heroicons-rectangle-group
---

**Settings → Templates & Skills** holds the reusable building blocks TalkBar uses with AI. It has five inner tabs: **Session templates**, **Summary sections**, **Note templates**, **Skills** and **Knowledge**. This page lists what each tab shows and the actions available. For what templates and skills do in a session, see [Templates and skills](/sessions/templates-and-skills).

::callout{icon="i-heroicons-lock-closed" color="amber"}
Creating, editing, duplicating and importing session templates, summary sections and note templates needs the Plus, Pro or Business plan. Creating, editing, duplicating and importing skills and knowledge skills needs the Pro or Business plan. On other plans you can still view, turn on or off, pin and export the built-ins. See [Plans and license](/data/plans-and-license).
::

## Common controls

Every tab works the same way:

- A count next to the tab title shows how many items are turned on.
- A search field and a category (or group) filter narrow the list.
- Each card has a switch that turns the item on or off. Turned-off items show a **Disabled** badge and stay in the list so you can turn them back on.
- Click a card to open it read-only. To see its actions, click the **⋮** button or right-click the card.
- Built-in items you have changed show an **Edited** badge. Items you created or imported show a **User** badge.
- **Import** reads a Markdown file (`.md`, `.markdown`) or a YAML file (`.yml`, `.yaml`). **Export** saves the item as a Markdown file.
- **Restore built-in** returns an edited built-in to its original content. It appears only on built-ins you have changed.
- **Delete** is available only on items you created or imported. Built-ins can be turned off but not deleted.

## Session templates

A session template describes a type of session: the summary sections the AI writes, its instructions, and how speakers are captured. Enabled templates are offered when you start a session.

::screenshot{src="/screenshots/settings/templates-session-templates.png" alt="Settings → Templates & Skills with the Session templates inner tab selected, showing the New template and Import buttons, the search field and category filter, the Pinned group and template cards with their on/off switches" caption="Session templates"}
::

TalkBar ships 28 built-in session templates, 15 of them turned on, such as **Meeting**, **1:1**, **Call**, **Interview** and **Voice Note**. They are grouped by category: **Meetings**, **Calls & one-on-ones**, **Clients & deals**, **Interviews**, **Listening**, **Solo**, plus a custom group for templates you create, copy or import (you can also name your own categories).

| Control | What it does |
| --- | --- |
| **New template** | Opens the template editor for a new template. |
| **Import** | Adds templates from a file. Built-ins already in your workspace are skipped. |
| **Search session templates…** | Searches names, descriptions and section headings. |
| **Filter by category** | Shows only the selected categories. |
| **Pinned** group | Pinned templates are offered first when you start or schedule a session. Drag them to reorder. |

Actions in a template card's menu:

| Action | What it does |
| --- | --- |
| **Edit** | Opens the template editor: name, description, icon, category, capture (speakers), sections, session context, custom AI instructions, live notes, vocabulary and knowledge focus. |
| **Pin** / **Unpin** | Adds the template to, or removes it from, the **Pinned** group. |
| **Duplicate** | Makes an editable copy. |
| **Set as default** | Makes it the template new sessions start with. The current default shows a **Default** badge. Meeting is the default until you change it. Not available for turned-off templates. |
| **Export…** | Saves the template as a Markdown file. |
| **Restore built-in** | Replaces your changes with the original built-in. Existing sessions keep the version they used. |
| **Delete** | Removes a template you created. Completed sessions keep their summaries. |
| **Create note template from headings** | Starts a new note template that uses this template's section headings. |

## Summary sections

This tab lists every summary section, grouped by the session template that owns it, so you can tune sections without opening each template. Each group also shows the template's **Session context** and, if set, its **Custom AI instructions**.

| Control | What it does |
| --- | --- |
| **Search sections** | Finds sections by heading, instructions or template name. |
| **Filter by category** | Shows only templates in the selected categories. |
| Drag handle | Reorders sections within a template. The summary is written in this order. |
| **Add section** (template menu) | Adds a section with a heading and instructions. A template can have up to 10 sections. |
| **Add custom AI instructions** (template menu) | Adds extra instructions for the whole summary. |
| **Restore built-in** (template menu) | Restores the whole built-in template. |
| **Edit**, **Enable section** / **Disable section**, **Restore section**, **Remove section** (section menu) | Change, turn off, restore or remove a single section. |

Section headings are limited to 80 characters and section instructions to 500.

## Note templates

Note templates give a new note a ready-made structure of headings and writing hints. TalkBar ships 44 built-in note templates, grouped by category: **General**, **Sales**, **Customer success**, **Product**, **Engineering**, **Hiring**, **Leadership**, **People** and **Personal & learning**. See [Notes](/chats-and-notes/notes) for how to use them.

| Control | What it does |
| --- | --- |
| **New template** | Creates a note template. |
| **Import** | Adds note templates from a file. |
| **Search note templates…** / **Filter by category** | Narrow the list. |
| **Pinned** group | Pinned templates are offered first when you write a note. |
| **Edit**, **Duplicate**, **Pin** / **Unpin**, **Export**, **Restore built-in**, **Delete** (card menu) | The standard actions described in [Common controls](#common-controls). Deleting a note template leaves existing notes unchanged. |

Turning a note template off hides it from the new-note picker; it stays available here.

## Skills

Skills are reusable AI prompts for sessions, notes and chats, such as **Prepare an agenda** or a follow-up email draft. TalkBar ships 24 built-in skills, grouped as **Before a session**, **During a session**, **After a session**, **Across sessions** and **Writing & editing**.

::screenshot{src="/screenshots/settings/templates-skills.png" alt="Settings → Templates & Skills with the Skills inner tab selected, showing the New skill and Import buttons, the search field and group filter, the Pinned group and skill cards" caption="Skills"}
::

| Control | What it does |
| --- | --- |
| **New skill** | Opens the skill editor: name, description, icon, group and **AI Instructions / Prompt**. |
| **Import** | Adds skills from a file. |
| **Search skills…** / **Filter skills by group** | Narrow the list. |
| **Pinned** group | Your go-to skills, kept at the top. |
| **Edit**, **Duplicate**, **Pin** / **Unpin**, **Export**, **Restore built-in**, **Delete** (card menu) | The standard actions described in [Common controls](#common-controls). Duplicating opens the copy in the editor. |

## Knowledge

Knowledge skills tell the AI what to look for when it scans a document and drafts knowledge cards. TalkBar ships 14 built-in knowledge skills, grouped as **Essentials**, **People**, **Customers & deals**, **Projects & delivery** and **Meeting prep**. See [Review and scans](/knowledge/review-and-scans) for how scans use them.

| Control | What it does |
| --- | --- |
| **New knowledge skill** | Creates a knowledge skill. |
| **Import** | Adds knowledge skills from a file. |
| **Search knowledge skills…** / **Filter by category** | Narrow the list. |
| **Defaults** group | Up to 3 skills preselected every time you scan a document. Use **Use as default** or **Remove from defaults** in a card's menu. |
| **Edit**, **Duplicate**, **Export**, **Restore built-in**, **Delete** (card menu) | The standard actions described in [Common controls](#common-controls). |

New workspaces start with three defaults: **Key facts & figures**, **Decisions & commitments** and **Risks & open questions**.

## Related

- [Templates and skills](/sessions/templates-and-skills)
- [Notes](/chats-and-notes/notes)
- [Review and scans](/knowledge/review-and-scans)
- [Knowledge cards](/knowledge/knowledge-cards)
- [Plans and license](/data/plans-and-license)
