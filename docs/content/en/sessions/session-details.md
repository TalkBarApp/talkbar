---
title: Session details
description: 'The page of a finished session: summary, action items, transcript, notes and knowledge, plus how to edit speakers, redo the summary and manage audio.'
navigation:
  icon: i-heroicons-document-text
---

When a session is complete, it opens on its details page. Here you read and edit the summary, check the transcript, work through action items, and share, export or follow up on the session.

::callout{icon="i-heroicons-information-circle" color="gray"}
Sessions that are still recording, stopped but not completed, or interrupted open on the [recording screen](/sessions/recording) instead. Click **Complete session** there to finish them.
::

::screenshot{src="/screenshots/sessions/session-details-overview.png" alt="The session details page for a completed meeting on the Overview tab: header with template name, date, length and title, topic chips, Ask AI and Share buttons, the audio player strip, the Session Summary card on the left and the Participants, Source, Project and Series panels on the right" caption="Session details, Overview tab"}
::

## Header

The header shows:

- the **template** name, which is also a menu for switching templates (see [Change the template](#change-the-template));
- the date and time, the session length, and its origin (**Captured locally** or **From audio file**);
- the **title**: click it or the pencil to rename; click the sparkle button to **Generate title with AI**;
- **topics**: add or remove [topics](/knowledge/topics-and-keywords) with the topic picker.

Header buttons:

| Button | What it does |
| --- | --- |
| **Ask AI** | Opens a chat about this session. See [Ask TalkBar](/chats-and-notes/ask-talkbar). |
| **Share** | Opens the share window. Its menu has **Publish link**, **Send content** and, once links exist, **Manage links**. See [Share links](/sharing/share-links). |
| **⋮** (**Session actions**) | More actions, listed below. |

The **⋮** menu:

| Action | What it does |
| --- | --- |
| **Record follow-up** | Starts recording a linked follow-up right away, with the same series, project, title and template. On the recording screen, this is **Follow-up** in the **New session** menu. |
| **Schedule follow-up** | Opens the Schedule window, filled in with the series, project and title. |
| **Scan for knowledge** | Scans this session for knowledge cards. Hidden when the session's privacy mode doesn't allow it. See [Review and scans](/knowledge/review-and-scans). |
| **Export session** | Exports the session. After the first export, it becomes a submenu with **Export again…**, a way to open the exported files, and **View export history**. See [Exports](/sharing/exports). |
| **Add source** / **Edit source** | Records where the session comes from, with a name and an optional link. |
| **Audio Player** | **Show Player** or **Hide Player**, **Export Audio** and **Delete Audio**. Only shown when the session has audio. |
| **Move to Trash** | Moves the session to Trash after you confirm. |

To pin a session, use its row menu in the [Sessions list](/sessions/overview#row-actions).

## Audio player

The player sits under the header. Play the recording, scrub the waveform, and jump to speaker changes. A session recorded in several parts (after **Continue session**) shows which recording you're playing.

Click the time on any transcript line to **Play from here**. Search results and links from the summary or chats also jump to the right moment.

**Hide Player** hides it for all sessions; **Show Player** brings it back.

## Search this session

The **Search this session…** field searches the transcript, timeline, action items, decisions, questions and knowledge cards of this session, and jumps to each match.

## Tabs

| Tab | What it shows |
| --- | --- |
| **Overview** | Statistics, the summary, participants, project and series. |
| **Action items** | Tasks, follow-ups, questions and decisions, with a count. |
| **Transcript** | The full transcript, and the timeline. |
| **Notes** | Your session note. |
| **Documents** | Files attached to the session. |
| **Knowledge** | The session's knowledge cards, with a count. |

## Overview

### Statistics

The tiles at the top show **Duration**, **Speakers** (people who actually spoke), **Turns** and **Mentioned** (cards and action items that came up in conversation). For practice templates, such as *Presentation Practice*, they show **Words per minute** and **Longest pause** instead.

### Summary

The **Session Summary** card holds the summary. It opens with an overview and key takeaways, followed by the sections of the session's [template](/sessions/templates-and-skills).

Each section has a **⋮** menu:

| Action | What it does |
| --- | --- |
| **Set Action item** | Flags the section text as an action item. |
| **Copy text** | Copies the section. |
| **Add bookmark** | Bookmarks the section. |
| **Add to note** | Adds the section to your session note. |
| **Regenerate section** | Rewrites only this section. Asks first if you edited it. |
| **Edit text** | Edits the section in place. |
| **Delete section** | Removes the section from the summary. |

Select text in the summary to get a small toolbar with **Copy to clipboard**, **Set Action item**, **Add bookmark**, **Add to notes** and **Delete selected text**.

To check where a point came from, hover over it. When the AI recorded its source, an icon (**Show evidence**) appears at the right edge. Hover the icon to see the transcript lines behind the point, with the speaker and time, and click a line to jump to it in the transcript. Not every point has one, and lines from ignored speakers aren't shown.

The card's **AI** menu changes how the summary is written:

| Option | What it does |
| --- | --- |
| **Summary sections** | Shows how many sections are on, for example *5 of 6 sections*. Switch sections on or off, or **Add section** from another enabled template. |
| **Summary language** | The language of the summary. **Reset to Auto** follows the spoken language. |
| **Summary length** | **Short**, **Standard** or **Detailed**. A dot marks lengths already written for this session, which switch instantly. |
| **AI model** | The model used for this summary. **Reset to default** goes back to your configured model. |
| **Regenerate summary** | Writes the whole summary again with the current settings and template. |

A changed language, length or model waits for you to regenerate. The card shows **Your new summary settings apply when you regenerate.** with **Regenerate** and **Cancel**. Regenerating replaces manual edits, so TalkBar asks first.

The card footer shows when the summary was generated or edited, which model wrote it and how long it took. It also has **Share summary**, **Copy as text**, **Copy as markdown** and **Regenerate summary**.

If a session has no summary yet, click **Generate summary**.

### Change the template

Open the template name in the header or on the summary card and pick another template. TalkBar asks **Switch to *template*?**:

- **Switch only** changes the template, but keeps the current summary as it is.
- **Switch & regenerate** changes the template and writes a new summary with its sections. If you edited the summary, TalkBar warns you that this replaces your edits.

Sections you added to this session are kept.

### Side panels

| Panel | What it does |
| --- | --- |
| **Participants** | Every speaker, ordered by talk time, with their share of the conversation. Click a speaker to rename or edit them (see [Speakers](#speakers)). |
| **Source** | Where the session comes from. **Edit source** to change it. |
| **Project** | The session's [project](/knowledge/projects). **Change project** moves it; you can also move its knowledge cards to the new project. |
| **Series** | **Add to series**, or for a session in a series: **Open series**, **Change series…** and **Remove from series**. Shows the session's position and the next session. See [Series](/sessions/series). |
| **Scheduled as** | For a scheduled session: the planned time and length, whether it started on time, and **Schedule follow-up**. |
| **Knowledge scan** | Whether the session was scanned for knowledge and what was found, with **Scan now**, **Scan again** or **Open Review**. |
| **Recent changes** | A history of edits to the session. |

If the session has temporary memories, a banner offers **Keep all** or **Discard all**.

## Speakers

Click a speaker's chip, in **Participants** or in the transcript, to open its menu:

| Option | What it does |
| --- | --- |
| **Rename voice** | Names the speaker. Type `@` to link the speaker to a saved person. |
| **Session Leader** | Marks the person leading the session. |
| **This is me** | Marks the speaker as you. |
| **Ignore speaker** | Hides the speaker's lines and keeps their text out of AI. The audio keeps every voice. |
| **Label** | Gives the speaker a role label, such as *Client* or *Manager*. **Manage labels** opens **Settings → Voice → Speakers**. |
| **Combine speakers…** | Moves all speech from this speaker to another one, when TalkBar split one person in two. |
| **Color** | Changes the speaker's color. |
| **Remove name** | Clears a name you gave, so the speaker goes back to its default label. Shown only for a speaker you named. |

Names carry into the transcript and summary. See [Speakers](/voice/speakers) for how TalkBar recognizes voices.

## Transcript

The **Transcript** tab has two views: **Transcript** (every turn) and **Timeline** (the notes written while you recorded).

Right-click a line, or use its **⋮** menu:

| Action | What it does |
| --- | --- |
| **Set Action item** | Flags the line as an action item. |
| **Speaker** → **Assign to…** | Moves the line to another speaker, or type `@` to pick a person. |
| **Speaker** → **Join with previous** | Merges the line into the one before it. |
| **Copy text** | Copies the line. |
| **Add bookmark** | Bookmarks the moment. |
| **Add to note** | Adds the line to your session note. |
| **Edit text** | Corrects the wording. |
| **Delete** | Removes the line. This can't be undone. |

Select words in a line to get a small toolbar with **Copy to clipboard**, **Add bookmark**, **Export this transcript turn**, **Add to notes** and **Delete selected text**.

The **View** menu switches between **Classic layout**, **Avatar layout** and **Chat layout**, sets the order, and opens **Previous transcripts**. If the session was translated, both the original and the translation are shown.

### Enhance transcript

**Enhance transcript** runs the saved recording through a more accurate speech model on your computer, to improve the text and the speaker separation. It is available for completed sessions that still have their audio.

1. Click **Enhance transcript**, choose the **Enhancement model** and **Spoken language**, and start. TalkBar offers to download a model if one is missing.
2. When it finishes, review the result in the **Enhanced transcript ready for review** card. **Show preview** shows the new text.
3. If some speakers didn't match, map each one to an existing speaker, or keep it as a new speaker, then click **Apply speaker mapping**.
4. Click **Replace session transcript** to use the new version, or **Discard enhanced transcript** to keep the old one.

The old transcript stays under **View → Previous transcripts**. After replacing, regenerate the summary if you want it to reflect the new text.

::screenshot{src="/screenshots/sessions/enhance-transcript-review.png" alt="The Transcript tab with the 'Enhanced transcript ready for review' card open, showing speaker match statistics, per-speaker mapping dropdowns, and the Replace session transcript and Discard enhanced transcript buttons" caption="Reviewing an enhanced transcript"}
::

## Action items

The **Action items** tab lists everything to do or remember from the session: tasks, follow-ups, questions and decisions. Switch between **All**, **This meeting** and **Brought in** (items carried over from earlier sessions or prep).

- Show items as a **Table** or a **Board**, and filter by status, type or source.
- Click **Add item** to create one, or **Add existing action item** to bring one in.
- Check off tasks, answer questions, and mark decisions as superseded.
- An item's menu can **Edit**, **Convert** it to another type, open its source in the transcript or summary, or remove it.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Removing an action item you created deletes it for good; action items don't go to Trash. Removing one from the summary hides it, and it won't come back if you regenerate the summary.
::

See [Action items](/knowledge/action-items) for how they work across sessions and projects.

## Notes, Documents and Knowledge

- **Notes**: your rich-text session note. Notes elsewhere that link to this session are listed above it. See [Notes](/chats-and-notes/notes).
- **Documents**: attach files with **Upload file**, **From document library** or **From notes**, and search inside them. **Remove from session** keeps the document in your library. See [Documents](/knowledge/documents).
- **Knowledge**: the session's knowledge deck and card drafts. Add a **New card**, **Scan for cards** or **Add from knowledge**. **Came up in conversation** lists cards mentioned in the session, with links to the moment. See [Knowledge cards](/knowledge/knowledge-cards).

## Skills

Skills are reusable AI prompts you use in chat. To use one on this session, click **Ask AI**, then click **Skills** in the chat and choose one, such as *Draft a follow-up email* or *Write a short recap*. The result appears as the chat reply. See [Templates and skills](/sessions/templates-and-skills#skills).

## Audio and storage

**Delete Audio** (in **⋮ → Audio Player**) deletes the session's recording for good after you type `DELETE` to confirm. The transcript, notes and summary stay, but playback and **Enhance transcript** are no longer available. You can't delete audio while the session is recording, still saving its audio, or being enhanced.

**Export Audio** saves the recording as **OPUS (Original)**, **MP4 (AAC)**, **MP3** or **WAV**.

To remove audio from every new session automatically, turn on **Delete audio when a session ends** in **Settings → Voice → Recording → Saved recording** (off by default). The same section sets the recording **Quality**. TalkBar has no setting to keep audio for a set number of days; to clean up old sessions, use **Session retention** (see [Trash](/sessions/overview#trash)).

## Move, rename and trash

| To… | Do this |
| --- | --- |
| Rename | Click the title. |
| Move to a project | **Project** panel → **Change project**. |
| Add to or move between series | **Series** panel. |
| Pin | Use the session's row menu in the Sessions list. |
| Move to Trash | **⋮ → Move to Trash**. Restore it from **Sessions → Trash**. |

## Related

- [Recording a session](/sessions/recording)
- [Templates and skills](/sessions/templates-and-skills)
- [Speakers](/voice/speakers)
- [Share links](/sharing/share-links)
- [Exports](/sharing/exports)
