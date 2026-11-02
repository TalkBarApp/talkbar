---
title: Templates and skills
description: Session templates decide how TalkBar captures and summarizes each kind of session; skills are reusable AI chat prompts. Use the built-ins or make your own.
navigation:
  icon: i-heroicons-squares-2x2
---

A **session template** is a type of session, such as a team meeting, a 1:1 or a lecture. It decides which sections the summary has, what the AI should pay attention to, and the default audio and speaker settings. **Skills** are reusable AI prompts you pick in a chat, such as *Draft a follow-up email*. Manage both in **Settings → Templates & Skills**. That page's [reference](/settings/templates-and-skills) lists every control.

## Session templates

You pick a template when you [start a session](/sessions/starting-a-session) or schedule one. It shapes the session in these ways:

- **Summary sections**: the summary always starts with an overview and key takeaways, then adds the template's sections, such as *Decisions* or *Action Items & Owners*.
- **AI guidance**: a description of the kind of session, custom AI instructions, and vocabulary that help the AI write the timeline and summary.
- **Live notes**: the style of the live timeline while you record.
- **Knowledge focus**: what to watch for when saving knowledge from these sessions.
- **Capture defaults**: the audio source, the expected number of speakers, and whether voices are separated. You can change the audio and speakers for one session in the New session window.

When a session starts, it keeps its own copy of the template. Editing, turning off or deleting the template later doesn't change existing sessions.

When you **Regenerate summary**, the session picks up the template's current sections, session context and custom AI instructions. Sections you turned off or added for that session stay that way. Audio, speakers, live notes, vocabulary and knowledge focus stay as they were when you recorded. To move a session to another template, see [Change the template](/sessions/session-details#change-the-template).

### Which template a session starts with

The New session and Schedule windows preselect the first of these that is turned on:

1. The template saved with a prepared or scheduled session.
2. The series' template, or the one suggested for its type.
3. The project's **Default session template**, when you open the window for that project or pick the project yourself.
4. The template you used last, if **Remember last template** is on. It is on by default.
5. The first pinned template.
6. The default template.
7. **Meeting**, or the first enabled template if **Meeting** is off.

::callout{icon="i-heroicons-information-circle" color="gray"}
New workspaces start with **Call**, **Meeting**, **1:1** and **Podcast** pinned, in that order, and **Meeting** as the default. Pinned templates come before the default, so the window opens on **Call** until you use another template. To control the starting template yourself, turn off **Remember last template** in **Settings → General → Session defaults**, then drag your preferred template to the top of **Pinned**, or unpin all templates so the default applies.
::

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

Templates you create, duplicate or import go in a seventh category, **Custom**. In the template editor, you can move a template to another category or choose **New category…** to name your own, up to 40 characters.

::callout{icon="i-heroicons-light-bulb" color="primary"}
The practice templates (*Presentation Practice* and *Speaking Practice*) add delivery feedback and suggested rewrites, and their sessions show **Words per minute** and **Longest pause**.
::

### What each built-in includes

Every built-in except *Podcast Episode (Host)* also ends with a **Key Timestamps** section, which the table leaves out. **Audio** and **Speakers** are what the New session window suggests. Some client and research templates also come with vocabulary terms.

| Template | Summary sections | Audio | Speakers |
| --- | --- | --- | --- |
| Meeting | Decisions, Action Items & Owners, Open Questions | Mic + System | Small (2–4) |
| In-person Meeting | Decisions, Action Items & Owners, Open Questions | Microphone | Small (2–4) |
| Client Workshop | Options Explored, Decisions, Action Items & Owners | Mic + System | Small (2–4) |
| Board / Leadership Sync | Decisions, Positions & Dissent, Action Items & Owners | Mic + System | Small (2–4) |
| 1:1 | Blockers & Support, Feedback, Decisions, Action Items & Owners | Mic + System | You + 1 |
| Call | Decisions, Action Items & Owners, Open Questions | Mic + System | Small (2–4) |
| Coaching Session | Obstacles & Options, Action Items & Owners | Mic + System | You + 1 |
| Sales Discovery Call | Qualification, Objections & Responses, Action Items & Owners | Mic + System | You + 1 |
| Customer Check-in / QBR | Risks & Renewal, Requests & Feedback, Action Items & Owners | Mic + System | Small (2–4) |
| Investor & Founder Call | Diligence Q&A, Decisions, Action Items & Owners | Mic + System | You + 1 |
| Legal Consultation | Advice, Options & Risks, Obligations & Deadlines, Decisions, Action Items & Owners | Mic + System | You + 1 |
| Interview | Questions & Answers, Notable Quotes | Mic + System | You + 1 |
| Candidate Interview | Answers & Examples, Candidate Scorecard, Action Items & Owners | Mic + System | You + 1 |
| User Research Interview | Pain Points & Needs, Product Feedback, Notable Quotes, Action Items & Owners | Mic + System | You + 1 |
| Podcast Episode (Host) | Episode Chapters, Show Notes, Notable Quotes, Action Items & Owners | Mic + System | You + 1 |
| Listening | Content Outline, References Mentioned | System audio | You + 1 |
| Podcast | Episode Topics, Viewpoints & Arguments, Stories & Examples, Recommendations & References | System audio | Small (2–4) |
| Lecture | Concepts & Definitions, Methods & Reasoning, Worked Examples, Assignments & Reading | Mic + System | Small (2–4) |
| Educational Talk | Concepts Explained, Examples & Evidence, Practical Applications, Open Questions | System audio | Small (2–4) |
| Review & Critique | Subject & Criteria, Strengths, Limitations, Verdict & Suitability | System audio | Small (2–4) |
| Product Launch | Announcements, Specs & Features, Pricing & Availability, Comparisons & Claims | System audio | Small (2–4) |
| Webinar | Topics Covered, Demonstrations, Questions & Answers, Resources & Next Steps | System audio | You + 1 |
| Tutorial | Goal & Prerequisites, Steps, Tips & Pitfalls, Expected Results | System audio | Small (2–4) |
| Panel Discussion | Discussion Topics, Positions & Arguments, Agreements & Disagreements, Open Questions | Mic + System | Small (2–4) |
| Voice Note | Action Items & Owners, Open Questions | Microphone | Just you |
| Brainstorm | Ideas, Leaning Towards, Action Items & Owners | Microphone | Just you |
| Presentation Practice | Talk Structure, Supporting Examples, Exact Quotes, Presentation Feedback, Suggested Rewrites | Microphone | Just you |
| Speaking Practice | Ideas & Themes, Reasoning & Assumptions, Exact Quotes, Speaking Feedback, Suggested Rewrites | Microphone | Just you |

### Manage templates

::screenshot{src="/screenshots/sessions/templates-settings.png" alt="Settings, Templates & Skills, Session templates tab: the New template and Import buttons, the search box and category filter, the Pinned group and template cards grouped by category, each with a section count and an on/off switch" caption="Session templates in Settings"}
::

In **Settings → Templates & Skills → Session templates**:

- Click a card to read the template: its session context, sections, custom AI instructions, and capture details.
- Use the switch on a card to turn a template on or off. Only enabled templates appear when you start a session.
- **Pin** a template (from its menu) to offer it first when you start or schedule a session. Drag pinned templates to reorder them.
- Click **New template** to create one, or **Import** to add a template from a file.
- Search, or filter by category.

Each card's menu:

| Action | What it does |
| --- | --- |
| **Edit** | Opens the template editor. Built-in templates can be edited too. |
| **Pin** / **Unpin** | Offers it first when starting a session. |
| **Duplicate** | Makes an editable copy in **Custom**. Find it there and open it to change it. |
| **Set as default** | Makes it the default template. Your last-used and pinned templates come first; see [Which template a session starts with](#which-template-a-session-starts-with). Not available for a template that is turned off. |
| **Export…** | Saves it as a Markdown file you can share or import elsewhere. The file holds the whole template. |
| **Restore built-in** | For an edited built-in: puts back the original. Its on/off state and pin stay. Existing sessions keep their copy. |
| **Delete** | For your own templates only. Completed sessions keep their summary. A series that used the template no longer starts with it. |
| **Create note template from headings** | Opens a new [note template](#note-templates) with the same headings. Nothing is saved until you click **Save template**. |

You can also choose the default template in **Settings → General → Session defaults → Default template**, including **Remember last template**.

**Import** reads a file exported from TalkBar. It adds a new template in **Custom**, even if the file came from a built-in. If the name is taken, TalkBar adds *(imported)*.

### Create or edit a template

1. Click **New template**, or choose **Edit** on a card. A new template starts empty, with no sections.
2. Fill in **General**: a **Name** is required.
3. Describe the sessions in **Session context**.
4. Click **Add section** for each part of the summary, and drag sections into order. Without sections, the summary has only its overview and key takeaways.
5. Open **Advanced settings** if you want to change capture, live notes, knowledge focus, vocabulary or custom AI instructions.
6. Click **Save template**.

The template editor has these parts. For limits and defaults, see the [template editor reference](/settings/templates-and-skills#template-editor).

| Part | What you set |
| --- | --- |
| **General** | **Name**, **Icon**, **Category** and a one-line **Description**. |
| **Session context** | What these sessions are, who is in them and what matters (up to 2,000 characters). Every summary is written with this in mind. |
| **Sections** | The summary sections, in order. See below. |
| **Advanced settings** → **Capture** | The audio source, how many speakers to expect, and **Separate speakers**. |
| **Advanced settings** → **Live notes** | The style of the live timeline: **Solo notes**, **Content** (follow what's presented) or **Conversation** (track who said what), plus extra guidance. |
| **Advanced settings** → **Knowledge** | A **Knowledge focus**: what to watch for when saving knowledge from these sessions. |
| **Advanced settings** → **Vocabulary** | Names, products and jargon, each with an optional hint, so the AI spells them right. |
| **Advanced settings** → **Custom AI instructions** | Extra instructions for the summary: tone, formatting, things to always include or avoid (up to 1,000 characters). |

When you edit a template, **Duplicate** saves a copy and opens it. For an edited built-in, **Restore built-in** puts back the original.

## Summary sections

Each section is one part of the summary and belongs to one template. Two templates can have sections with the same heading, but changing one doesn't change the other. A section has:

| Field | What it does |
| --- | --- |
| **Section heading** | The heading in the summary (up to 80 characters). Required. |
| **Section instructions** | What the AI should pull out for this section (up to 500 characters). Required. |
| Item shape | How items are written. See below. New sections start as **Bullets**. |

| Item shape | How items look |
| --- | --- |
| **Bullets** | A plain list. |
| **Bullets with owners** | A list that names who is responsible for each item. |
| **Timestamped** | A list tied to moments in the recording. |
| **Paragraph** | Running text. |
| **Questions and answers** | Each question in bold, with its answer below. |

A template can have up to 10 sections, and the summary follows their order. In the template editor, drag sections to reorder them, and click **Add section** to add one. Each section's **Section options** menu lets you change its shape, **Disable section** (it stays on the template but never reaches a summary) or **Remove section**. It also shows the section's **Output key**, a fixed name TalkBar uses to store the section. Renaming the heading doesn't change it.

The **Summary sections** tab in **Settings → Templates & Skills** shows every template's session context and sections in one place, grouped by template. You can edit and reorder them there too. Each change saves right away, and an edited built-in section offers **Restore section**. See the [Summary sections reference](/settings/templates-and-skills#summary-sections).

In the built-in templates, the *Decisions*, *Action Items & Owners* and *Open Questions* sections also feed [action items](/knowledge/action-items). They keep doing so if you rename them. If you remove or disable one, nothing reaches action items from it.

### Change sections for one session

You can change the sections of a single session without touching its template:

- Before you start: in the New session window, click **Customize** next to **Sections**. Picking another template clears these changes.
- After you stop: open the **AI** menu on the summary and choose **Summary sections**.

In both places, switch sections on or off, or **Add section** to borrow one from another enabled template. The session keeps its own copy of a borrowed section. A session can have up to 12 sections turned on. Then regenerate the summary to apply the change. See [Session details](/sessions/session-details#summary).

## Skills

A **skill** is a reusable prompt that helps the AI write or analyze your sessions and notes. You pick a skill in a chat: click **Skills** in the message box, or type **/** in an empty box, and choose one. The skill applies to that request, and the result is the chat reply. Skills don't run on their own and don't change the session summary. See [Use a skill](/chats-and-notes/ask-talkbar#use-a-skill).

Skills work in every chat: on the Chats page, in the chat panel, and through **Ask AI** on a session, live session or document. They don't run anywhere outside a chat.

TalkBar includes 24 built-in skills, all turned on:

| Group | Skills |
| --- | --- |
| **Before a session** | Prepare an agenda, Suggest questions, Review previous commitments, Prepare a stakeholder brief |
| **During a session** | Catch me up, Explain a term, Suggest follow-up questions, Identify unresolved points |
| **After a session** | Draft a follow-up email, Write a short recap, Extract action items, Document decisions, Find risks and blind spots, Quotes worth keeping |
| **Across sessions** | Write a weekly recap, Trace decision history, Find recurring product feedback, Who owns what, What leadership asked |
| **Writing & editing** | Polish notes, Shorten text, Expand using source details, Draft a project brief, Draft an engineering ticket |

### Manage and create skills

In **Settings → Templates & Skills → Skills**, turn skills on or off, pin the ones you use most, and search or filter by group. Skills you turn off leave the chat picker. Click a skill to read its instructions, and choose **Use in chat** to open a new chat with that skill selected.

To write your own:

1. Click **New skill**.
2. Fill in **Name** (up to 80 characters), **Icon**, **Group** (**Writing & editing** to start with) and a one-line **Description** (up to 300 characters).
3. In **AI Instructions / Prompt**, explain the task, what to focus on and the output you want (up to 4,000 characters).
4. Click **Save skill**.

A skill is one block of instructions. It has no variables or input fields. Whatever you type next to the skill in a chat goes along with it as extra details.

Each skill's menu has **Edit**, **Duplicate** (opens the copy in the editor), **Pin** or **Unpin**, **Export**, **Restore built-in** and **Delete**. Editing, restoring or deleting a skill leaves previous chats unchanged.

**Import** adds a skill from a Markdown or text file of up to 64 KB:

- A file exported from TalkBar keeps its name, description, icon and group.
- For any other file, all of its text becomes the instructions, up to 4,000 characters. The first `# ` heading becomes the name, or the file name if there is no heading. The group is **Writing & editing**.

The editor opens so you can check the skill. Click **Import skill** to add it. If the name is taken, TalkBar adds *(imported)*.

When you use a skill in a chat, you can edit its instructions for that one request without changing the saved skill.

## Knowledge skills

The **Knowledge** tab holds knowledge skills: what a scan looks for when it drafts [knowledge cards](/knowledge/knowledge-cards) from a document or a session. Choose up to 3 per scan under **What to look for**. See [Review and scans](/knowledge/review-and-scans).

| | Skills | Knowledge skills |
| --- | --- | --- |
| **Where they run** | In a chat, when you pick one | In a knowledge scan |
| **Result** | A chat reply | Draft cards to review |
| **Picked with** | **Skills** or **/** in the message box | **What to look for** in the scan |
| **How many at once** | One | Up to 3 |
| **Preselected** | No | Your defaults |

TalkBar includes 14 built-in knowledge skills, all turned on:

| Category | Knowledge skills |
| --- | --- |
| **Essentials** | Key facts & figures, Decisions & commitments, Goals & success criteria, Risks & open questions, Terms & definitions |
| **People** | People & roles, Preferences & working style |
| **Customers & deals** | Customer needs & pain points, Pricing & contract terms, Objections & concerns, Competitors & alternatives |
| **Projects & delivery** | Timeline & milestones, Lessons learned |
| **Meeting prep** | Talking points & questions |

Choose up to 3 defaults to preselect in every scan, with **Use as default** on a card. New workspaces start with **Key facts & figures**, **Decisions & commitments** and **Risks & open questions**. A knowledge skill you turn off isn't offered in scans, even if it is a default.

To write your own, click **New knowledge skill**. It has the same fields as a skill, with **Category** in place of **Group**. Its instructions describe what to look for in the source. **Import**, **Export**, **Duplicate** and **Restore built-in** work as they do for skills.

## Note templates

TalkBar also includes **44 note templates** for structured notes, in categories such as sales, engineering, product, leadership, hiring and personal. Manage them in **Settings → Templates & Skills → Note templates**. To insert one in a note, type **/** and choose **Template**. See [Notes](/chats-and-notes/notes).

To make your own, click **New template** on that tab, or choose **Create note template from headings** on a session template. Add sections with a heading, a writing hint and optional starter content, then click **Save template**. See the [note template editor reference](/settings/templates-and-skills#note-template-editor).

## Plan limits

| Action | Free, Personal | Plus | Pro, Business |
| --- | --- | --- | --- |
| Use built-in templates, sections, skills and knowledge skills | Yes | Yes | Yes |
| Change sections for one session, switch a session's template, edit a skill's instructions for one message | Yes | Yes | Yes |
| Turn on or off, pin, set the default, export, restore built-ins, delete your own | Yes | Yes | Yes |
| Create, edit, duplicate and import session templates and note templates; edit their sections | No | Yes | Yes |
| Create, edit, duplicate and import skills and knowledge skills | No | No | Yes |

Where your plan doesn't include an action, its buttons give way to a **Custom templates** or **Custom skills** note with the plan you need. See [Plans and license](/data/plans-and-license).

## Related

- [Starting a session](/sessions/starting-a-session)
- [Session details](/sessions/session-details)
- [Templates & Skills settings](/settings/templates-and-skills)
- [Notes](/chats-and-notes/notes)
