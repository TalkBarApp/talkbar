---
title: Templates and skills
description: Session templates decide how TalkBar captures and summarizes each kind of session; skills are reusable AI chat prompts. Use the built-ins or make your own.
navigation:
  icon: i-heroicons-squares-2x2
---

A **session template** is a type of session, such as a team meeting, a 1:1 or a lecture. It decides which sections the summary has, what the AI should pay attention to, and the default audio and speaker settings. **Skills** are reusable AI prompts you pick in a chat, such as *Draft a follow-up email*. Manage both in **Settings → Templates & Skills**.

## Session templates

You pick a template when you [start a session](/sessions/starting-a-session). It shapes the session in three ways:

- **Summary sections**: the summary always starts with an overview and key takeaways, then adds the template's sections, such as *Decisions* or *Action Items & Owners*.
- **AI guidance**: a description of the kind of session, custom AI instructions, and vocabulary that help the AI write the timeline and summary.
- **Capture defaults**: the audio source and expected number of speakers.

When a session starts, it keeps its own copy of the template. Editing the template later doesn't change existing sessions until you regenerate their summary.

### Built-in templates

TalkBar includes **28 built-in templates** in six categories. **15 are turned on** by default and show up when you start a session. Turn on the others in **Settings → Templates & Skills → Session templates**. **Meeting** is the default template.

Turned on by default:

| Category | Templates |
| --- | --- |
| **Meetings** | Meeting, In-person Meeting |
| **Calls & one-on-ones** | 1:1, Call |
| **Interviews** | Interview |
| **Listening** | Listening, Podcast, Lecture, Educational Talk, Review & Critique, Product Launch |
| **Solo** | Voice Note, Brainstorm, Presentation Practice, Speaking Practice |

Turned off by default:

| Category | Templates |
| --- | --- |
| **Meetings** | Client Workshop, Board / Leadership Sync |
| **Calls & one-on-ones** | Coaching Session |
| **Clients & deals** | Sales Discovery Call, Customer Check-in / QBR, Investor & Founder Call, Legal Consultation |
| **Interviews** | Candidate Interview, User Research Interview, Podcast Episode (Host) |
| **Listening** | Webinar, Tutorial, Panel Discussion |

Templates you create, duplicate or import go in a seventh category, **Custom**. You can also type your own category name.

::callout{icon="i-heroicons-light-bulb" color="primary"}
The practice templates (*Presentation Practice* and *Speaking Practice*) add delivery feedback and suggested rewrites, and their sessions show **Words per minute** and **Longest pause**.
::

### Manage templates

::screenshot{src="/screenshots/sessions/templates-settings.png" alt="Settings, Templates & Skills, Session templates tab: the New template and Import buttons, the search box and category filter, the Pinned group and template cards grouped by category, each with a section count and an on/off switch" caption="Session templates in Settings"}
::

In **Settings → Templates & Skills → Session templates**:

- Use the switch on a card to turn a template on or off. Only enabled templates appear when you start a session.
- **Pin** a template (from its menu) to offer it first when you start or schedule a session. Drag pinned templates to reorder them.
- Click **New template** to create one, or **Import** to add templates from a file.
- Search, or filter by category.

Each card's menu:

| Action | What it does |
| --- | --- |
| **Edit** | Opens the template editor. Built-in templates can be edited too. |
| **Pin** / **Unpin** | Offers it first when starting a session. |
| **Duplicate** | Makes an editable copy. |
| **Set as default** | Makes it the template new sessions start with. |
| **Export…** | Saves it as a Markdown file you can share or import elsewhere. |
| **Restore built-in** | For an edited built-in: puts back the original. Existing sessions keep their copy. |
| **Delete** | For your own templates only. Completed sessions keep their summary. |
| **Create note template from headings** | Makes a [note template](#note-templates) with the same headings. |

You can also choose the default template in **Settings → General → Session defaults → Default template**, including **Remember last template**.

### Create or edit a template

The template editor has these parts:

| Part | What you set |
| --- | --- |
| **General** | **Name**, **Icon**, **Category** and a one-line **Description**. |
| **Session context** | What these sessions are, who is in them and what matters (up to 2,000 characters). Every summary is written with this in mind. |
| **Sections** | The summary sections, in order. See below. |
| **Advanced settings** → **Capture** | The audio source and how many speakers to expect. |
| **Advanced settings** → **Live notes** | The style of the live timeline: **Solo notes**, **Content** (follow what's presented) or **Conversation** (track who said what), plus extra guidance. |
| **Advanced settings** → **Knowledge** | A **Knowledge focus**: what to watch for when saving knowledge from these sessions. |
| **Advanced settings** → **Vocabulary** | Names, products and jargon, each with an optional hint, so the AI spells them right. |
| **Advanced settings** → **Custom AI instructions** | Extra instructions for the summary: tone, formatting, things to always include or avoid (up to 1,000 characters). |

Click **Save template** when done.

## Summary sections

Each section is one part of the summary. A section has:

| Field | What it does |
| --- | --- |
| **Section heading** | The heading in the summary (up to 80 characters). |
| **Section instructions** | What the AI should pull out for this section (up to 500 characters). |
| Item shape | How items are written: **Bullets**, **Bullets with owners**, **Timestamped**, **Paragraph** or **Questions and answers**. |

A template can have up to 10 sections. In the editor, drag sections to reorder them, and click **Add section** to add one. Each section's **Section options** menu lets you **Edit** it, change its shape, **Disable section** (it stays on the template but never reaches a summary), **Restore section** (for an edited built-in) or **Remove section**.

The **Summary sections** tab in **Settings → Templates & Skills** shows every template's session context and sections in one place, grouped by template. You can edit and reorder them there, too.

### Change sections for one session

You can change the sections of a single session without touching its template:

- Before you start: in the New session window, click **Customize** next to **Sections**.
- After you stop: open the **AI** menu on the summary and choose **Summary sections**.

In both places, switch sections on or off, or **Add section** to borrow one from another enabled template. A session can have up to 12 sections turned on. Then regenerate the summary to apply the change. See [Session details](/sessions/session-details#summary).

## Skills

A **skill** is a reusable prompt that helps the AI write or analyze your sessions and notes. You pick a skill in a chat: click **Skills** in the chat box and choose one. The skill applies to that request, and the result is the chat reply. Skills don't run on their own and don't change the session summary. See [Ask TalkBar](/chats-and-notes/ask-talkbar).

TalkBar includes 24 built-in skills, all turned on:

| Group | Skills |
| --- | --- |
| **Before a session** | Prepare an agenda, Suggest questions, Review previous commitments, Prepare a stakeholder brief |
| **During a session** | Catch me up, Explain a term, Suggest follow-up questions, Identify unresolved points |
| **After a session** | Draft a follow-up email, Write a short recap, Extract action items, Document decisions, Find risks and blind spots, Quotes worth keeping |
| **Across sessions** | Write a weekly recap, Trace decision history, Find recurring product feedback, Who owns what, What leadership asked |
| **Writing & editing** | Polish notes, Shorten text, Expand using source details, Draft a project brief, Draft an engineering ticket |

### Manage and create skills

In **Settings → Templates & Skills → Skills**, turn skills on or off, pin the ones you use most, and search or filter by group. Click a skill and choose **Use in chat** to start a chat with it.

Click **New skill** to write your own, or **Import** to add one from a Markdown or text file. A skill has a **Name**, **Icon**, **Group**, a one-line **Description** and its **AI Instructions / Prompt** (up to 4,000 characters). Each skill's menu also has **Edit**, **Duplicate**, **Export**, **Restore built-in** and **Delete**.

When you use a skill in a chat, you can edit its instructions for that one request without changing the saved skill.

## Knowledge skills

The **Knowledge** tab holds knowledge skills: what a document scan looks for when it drafts [knowledge cards](/knowledge/knowledge-cards), such as *Key facts & figures* or *Terms & definitions*. Choose up to 3 defaults to preselect in every scan. See [Review and scans](/knowledge/review-and-scans).

## Note templates

TalkBar also includes **44 note templates** for structured notes, in categories such as sales, engineering, product, leadership, hiring and personal. Manage them in **Settings → Templates & Skills → Note templates**, and insert one in a note by typing `/template`. See [Notes](/chats-and-notes/notes).

## Plan limits

| Plan | Use built-in templates | Create, edit and import templates | Create custom skills |
| --- | --- | --- | --- |
| Free, Personal | Yes | No | No |
| Plus | Yes | Yes | No |
| Pro, Business | Yes | Yes | Yes |

On every plan, you can turn templates and skills on or off, pin them, set the default, export them, restore built-ins and delete your own. See [Plans and license](/data/plans-and-license).

## Related

- [Starting a session](/sessions/starting-a-session)
- [Session details](/sessions/session-details)
- [Templates & Skills settings](/settings/templates-and-skills)
- [Notes](/chats-and-notes/notes)
