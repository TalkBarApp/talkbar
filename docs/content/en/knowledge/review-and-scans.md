---
title: Review and scans
description: How TalkBar scans sessions and documents for knowledge, and how you approve, edit or dismiss its suggestions in the Review inbox.
navigation:
  icon: i-heroicons-inbox-arrow-down
---

TalkBar can read your sessions and documents and suggest memory cards, people and companies worth keeping. These suggestions wait in **Knowledge → Review**. New cards, people and companies are added only when you approve them. When a scan finds a fact you already have as a card, it can mark that card as confirmed again on its own.

## How suggestions are made

A **knowledge scan** asks AI to read one source and find facts worth keeping. Each scan produces suggestions of three kinds:

- **Memory**: a new memory card, or a change to an existing one.
- **Person**: a new contact, or new details for someone you already have.
- **Company**: a new company, or new details for one you already have.

If a scan finds a fact that matches a card you already have, TalkBar confirms the existing card instead of suggesting it again. The **Scans** view counts these as auto-confirmed.

Scans use the AI model assigned to knowledge extraction in **Settings → AI Providers**. See [Providers and models](/ai/providers-and-models).

::callout{icon="i-heroicons-lock-closed" color="gray"}
TalkBar only scans sessions recorded in the **Normal** privacy mode. Sessions recorded as **Session only**, **No auto cards** or **Sensitive** are never scanned.
::

## Start a scan yourself

Choose **Add card** → **Scan for cards** anywhere you can add cards. You can also use **Scan for knowledge** on a document or a finished session, or **Scan for cards** on the Review tab when it is empty.

In the **Add knowledge cards** dialog, with **Scan for cards** selected:

| Field | What it does |
| --- | --- |
| **Document** / **Session** | Choose what to scan. |
| Document picker | Pick a document from your library, or **Upload** a file. An uploaded file used only for this scan is a **Temporary upload**: it is kept out of your documents and removed when the scan finishes. Draft cards stay for review. |
| Session picker | Pick a session. Filter by project or series, or search by title. |
| **Scan in** | For a session: which parts to read. **Summary**, **Action items** and **Transcript** are all selected by default. |
| **What to look for** | Pick up to three knowledge skills that guide what AI looks for. Your defaults are set in **Settings → Templates & Skills**. |
| **Focus instructions (optional)** | Extra guidance for this scan, for example "Pricing, deadlines, and who owns each deliverable." |

Click **Scan for cards**. The scan runs in the background, and its drafts appear in **Review** when it finishes.

On a session's **Knowledge** tab and while you prepare a session, drafts from that session's scans also appear under **Drafts to review**. There you can **Confirm**, **Edit** or **Dismiss** each draft, or **Confirm all**.

::screenshot{src="/screenshots/knowledge/scan-for-cards-dialog.png" alt="Add knowledge cards dialog with Scan for cards selected and Session chosen, showing the session picker, the Scan in chips (Summary, Action items, Transcript), the What to look for skill pills and the Focus instructions box" caption="Scanning a session for cards"}
::

## Automatic scans

**Settings → General → Knowledge scanning** controls scans that run on their own. All three are off until you turn them on.

| Setting | What it does | Default |
| --- | --- | --- |
| **Auto-scan finished sessions** | Scans a session for knowledge shortly after its transcript is saved. | Off |
| **Auto-scan new documents** | Scans each document after it is indexed. | Off |
| **Scheduled sweep** | Checks about every 6 hours, up to 10 sources per pass. Re-scans sources when their content or the scan settings change. | Off |
| **Focus instructions** | Guidance added to every scan, such as the topics that matter most to you. | Empty |

## The Review inbox

**Knowledge → Review** has three views: **Suggestions**, **Activity** and **Scans**. The **Review** tab shows a badge with the number of suggestions waiting. Projects have the same **Review** tab, limited to that project.

### Suggestions

Suggestions are grouped by the scan that found them. Each one asks a question, such as **Add this memory?** or **Update this person?**, and shows the quote from the source it is based on. Click the source to open the session or document.

::screenshot{src="/screenshots/knowledge/review-suggestions.png" alt="Knowledge → Review → Suggestions view with the All/Memories/People/Companies filter tabs, a group of suggestions from one scan, and one suggestion showing its source quote and the Add to knowledge, Edit & approve, Dismiss and Snooze 7 days buttons" caption="The Review inbox"}
::

| Action | Key | What it does |
| --- | --- | --- |
| **Add to knowledge** | `A` | Approves the suggestion and creates the card, person or company. For a change to an existing item the button reads **Update knowledge**. |
| **Edit & approve** | `E` | Opens the suggestion so you can fix the text or fields first, then approve it. |
| **Dismiss** | `D` | Removes the suggestion. **Undo** brings it back. |
| **Snooze 7 days** | `S` | Hides the suggestion for a week. It moves to **Snoozed**. |
| **Approve as new** | | Shown when the person or company an update refers to was deleted. Creates a new item instead. |

Use `J` and `K` to move between suggestions, and `Space` to select one.

Badges help you decide:

- **Low confidence**: AI was not sure about this one.
- **Conflict**: two suggestions want different values for the same field of the same person or company. Approve the one that is right.

### Filter and act on many suggestions

- Filter tabs: **All**, **Memories**, **People**, **Companies**.
- **Needs attention** appears when scans failed or were skipped, or when an update points to an item that no longer exists. Use **Retry scan** to run a failed scan again. **Remove** takes one scan off the list, and **Clear all** removes them all.
- **Snoozed** lists snoozed suggestions. **Review now** brings one back.
- **Search** finds suggestions by text.
- **Select suggestions** lets you **Add to knowledge** or **Dismiss** several at once. When you approve memory cards in bulk, you choose where they go: **This session only**, a **Project**, or **All knowledge**.

## Activity

**Activity** is a log of every change to your knowledge: cards created, edited, pinned, archived or forgotten, people and companies added or updated, documents imported, suggestions approved or dismissed, and scans completed.

- Filter by type (**Memories**, **People**, **Companies**, **Documents**, **Suggestions**, **Scans**) or by action.
- **Search** finds events by text. **Search older activity** looks further back.

When you forget a memory card, its history keeps only the event, not the card's text (**Details removed**).

## Scans

**Scans** lists every scan run: what was scanned, when, its status and how many suggestions it made.

| Status | Meaning |
| --- | --- |
| **Queued** | Waiting to run. |
| **Running** | Reading the source now. |
| **Complete** | Finished. Its suggestions are in **Suggestions**. |
| **Failed** | Something went wrong. Use **Retry scan**. |
| **Skipped** | TalkBar did not scan the source, for example because it is no longer available or its privacy mode no longer allows scanning. |

Each row's menu has **Open suggestions**, **Scan again** (or **Retry scan**), and **Pause** / **Resume** to stop scheduled scans of that one source.

At the top, **Pause scheduled scans** / **Resume scheduled scans** turns the scheduled sweep off or on, and the summary shows pending sources, suggestion counts and the **Next sweep**.

## Related

- [Knowledge cards](/knowledge/knowledge-cards)
- [Documents](/knowledge/documents)
- [People and companies](/knowledge/people-and-companies)
- [Templates and skills settings](/settings/templates-and-skills)
- [How TalkBar uses AI](/ai/how-talkbar-uses-ai)
