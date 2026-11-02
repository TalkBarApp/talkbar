---
title: Knowledge cards
description: Memory cards are the facts TalkBar keeps for you. Learn the card types, the status tabs, how to add and edit cards, and how cards light up during a call.
navigation:
  icon: i-heroicons-light-bulb
---

A **knowledge card** is one fact TalkBar keeps for you: a decision, a preference, a commitment, a detail about a person or a project. In the app these cards are called **memory cards**. AI uses your approved cards when it answers chats, prepares sessions and shows context while you record.

## The Knowledge section

Open **Knowledge** in the sidebar. The page has six tabs:

| Tab | What it holds |
| --- | --- |
| **Memory cards** | Your knowledge cards. This page. |
| **Documents** | Files you imported. See [Documents](/knowledge/documents). |
| **People** | Contacts and speakers. See [People and companies](/knowledge/people-and-companies). |
| **Companies** | Organizations. See [People and companies](/knowledge/people-and-companies). |
| **Action items** | Action items, decisions and questions. See [Action items](/knowledge/action-items). |
| **Review** | Suggestions waiting for your approval. A badge shows how many are waiting. See [Review and scans](/knowledge/review-and-scans). |

::screenshot{src="/screenshots/knowledge/memory-cards-page.png" alt="Knowledge → Memory cards tab with the six Knowledge tabs at the top, the scope switcher on the right showing All knowledge, the Approved/Outdated/Archived status tabs, and a grid of memory cards grouped by day" caption="Knowledge → Memory cards"}
::

::callout{icon="i-heroicons-light-bulb" color="primary"}
You can pin icon-only shortcuts to the Knowledge tabs under **Knowledge** in the sidebar. Turn them on in **Settings → General → Appearance → Knowledge shortcuts**. They are all off by default.
::

## What a card shows

Each card shows:

- **Title** and **details**: the fact itself.
- **Category**: the card type (see below).
- **Origin**: where the card came from, such as **Added by you**, **Knowledge scan**, **Extracted after session** or **Imported from document**.
- **Confirmed** date: the last time you confirmed the card is still true.
- A pin, if the card is pinned.

Click a card to open it. The card panel has these sections:

| Section | What it shows |
| --- | --- |
| **Source** | The session, document or other source the card came from, with a link to open it. Cards you write yourself have no recorded source. If a cited document changed later, the card says **Source changed since this card was created.** |
| **Organize** | The project the card is filed in, or **General**. |
| **About** | People, companies, projects and documents the card is about. **Attach…** links another one; **Make primary** sets the main one. |
| **Related** | Links to other knowledge items. **Add relation** connects the card to another item and lets you say why. Removing a relation removes only the link. |
| **History** | Every change to the card, in plain language. |

If a newer card replaced this one, the card shows **Replaced by a newer memory card** with a link.

## Card types

Every card has a category. TalkBar uses these built-in types:

| Type | Use it for |
| --- | --- |
| **Fact** | Something that is true. |
| **Preference** | How someone likes things done. |
| **Decision** | Something that was decided. |
| **Commitment** | Something someone promised. |
| **Risk** | Something that could go wrong. |
| **Open question** | Something still unanswered. |
| **Relationship** | Context about how people or companies relate. |
| **Instruction** | A standing instruction TalkBar should keep in mind. |
| **Key moment** | An important moment worth remembering. |
| **Contract term** | A term from an agreement. |
| **Pricing detail** | A price, discount or billing detail. |
| **Technical detail** | A technical fact or specification. |

Cards with a type TalkBar doesn't recognize show as **Other**.

You can also add your own categories. Open the filters (**More filters**), click **Category**, and use **New category** in the **Categories** dialog. From the same dialog you can rename or delete your categories.

## Status tabs

Cards are grouped by status. **Approved** is always shown. The other tabs can be turned on or off from the **Filter views** menu next to the tabs. **Outdated** and **Archived** are on by default.

| Tab | What it lists |
| --- | --- |
| **Approved** | Cards AI uses. **Pinned on top** keeps pinned cards first. |
| **Pinned** | Approved cards you pinned. Pinned cards rank higher in live recall. |
| **Needs review** | Approved cards that have not been confirmed for a while. **Confirm all** marks them all as still true. |
| **Outdated** | Cards you marked as outdated. They may no longer be true. |
| **Archived** | Cards you archived. They are hidden from search but kept here. |

To keep your choice of tabs, pick **Set as default** in the **Filter views** menu.

::callout{icon="i-heroicons-information-circle" color="gray"}
**Needs review** is not the same as the **Review** tab. **Needs review** lists cards you already approved that are due for a check. **Review** holds new suggestions that are not saved yet.
::

**Settings → General → Knowledge health** controls when cards move to **Needs review**:

| Setting | What it does | Default |
| --- | --- | --- |
| **Review after days** | After this many days without confirmation, approved cards show under **Needs review**. | 90 |
| **Exclude from live recall after days** | Unpinned cards older than this stop appearing during live sessions. Pinned cards stay. | 180 |
| **Knowledge health nudges** | Shows in-app reminders when approved cards have gone too long without confirmation. | Off |

## Find cards

- **Search** finds cards by their text.
- The date range shows cards from **Today**, **This week**, the last 7, 10, 15 or 30 days, or **All cards**. It starts at the last 7 days.
- **Filter by category** shows one card type.
- **More filters** narrows by **Person**, **Company**, **Document** or **Confirmed** date (for example **Confirmed in last 30 days** or **Never confirmed**).

## Add a card

There are two ways to add cards. Both start from **Add card** on the Memory cards tab, on a session's **Knowledge** tab, or while you prepare a session. On a project page, use **Add** → **Knowledge card** or **Scan for cards**.

- **New card** (**Write a card**): type a **Title**, pick a **Category**, add **Details** and choose where the card is **Available to**. Cards you write yourself are treated as verified and are saved right away.
- **Scan for cards**: AI reads a session or a document and proposes draft cards. You review every draft before it becomes a card. See [Review and scans](/knowledge/review-and-scans).

::screenshot{src="/screenshots/knowledge/add-card-dialog.png" alt="Add knowledge cards dialog with Write a card selected, showing the Title, Category, Details and Available to fields" caption="Writing a card"}
::

## Edit and manage a card

Open a card's **⋮** menu, or open the card and use its buttons. Only the actions that fit the card's status are shown.

| Action | What it does |
| --- | --- |
| **Edit** | Change the title, details, type or confidence. |
| **Move** | File the card in a project, in **General**, or add it to a session series. |
| **Still true** | Confirms the card and refreshes its **Confirmed** date. On an outdated card, it makes the card approved again. |
| **Pin** / **Unpin** | Pins the card so it ranks higher in live recall. |
| **Mark outdated** | Moves the card to **Outdated**. |
| **Archive** | Hides the card from search. It stays in **Archived**. |
| **Restore** | Brings an archived card back to **Approved**. |
| **Mark as duplicate of…** | In the open card: marks this card as a duplicate of another card you pick. This card is marked outdated and replaced by the one you pick. |
| **Keep beyond this session** | For a card that belongs to one session only: makes it available everywhere. |
| **Forget** | Permanently removes the card, its links and its history details. The original session transcript is not affected. This cannot be undone. |

**Select cards** lets you act on many cards at once: **Confirm**, **Pin**, **Change type**, **Move** or **Archive**.

## Scopes: General, project or series

Every card is filed somewhere. This decides where it shows up and when AI uses it.

| Scope | Meaning |
| --- | --- |
| **All knowledge** / **General** | The card belongs to the whole workspace, not to one project. |
| **Project** | The card is filed in one project. It shows on that project's **Memory cards** tab. |
| **This session only** | The card stays with one session. Sessions recorded in the **Session only** or **Sensitive** privacy mode always keep their cards this way. |

Cards can also be added to a **session series**, so they show up when you look at that series.

The scope switcher at the top right of Knowledge changes what you see on every Knowledge tab:

- **All knowledge**: everything in the workspace.
- **General**: only items not filed in a project.
- A project (**Project: name**) or a series (**Series: name**): only that project's or series' items.

## Attach cards to a session

A session has its own **knowledge deck**: the cards you want on hand during that call. A deck holds up to 24 cards.

- Before the call, add cards while you [prepare a scheduled session](/sessions/scheduling-and-preparing), or in the session setup.
- On a session's **Knowledge** tab, use **Add card** → **New card**, **Scan for cards** or **Add from knowledge**. **Add from knowledge** lets you pick existing approved cards.
- During a live session, use **Add** in the knowledge panel.

To take a card off the deck, open its menu and choose **Remove from session**. The card stays in Knowledge.

## Cards that light up during a call

While you record, TalkBar listens for the cards on the session's deck. When the conversation names a card, the card is flagged **Mentioned just now**. This is called live recall. It runs on your computer and does not send anything to an AI model.

The live **Knowledge** panel has three views. Each one appears when it has something to show:

| View | What it shows |
| --- | --- |
| **Mentions** | Cards and action items that came up in the conversation, newest first. **Heard** shows what was said. **Not relevant** stops flagging that item in this session. |
| **Cards** | The cards on this session's deck. |
| **Action items** | Action items brought into this meeting. |

From a live card's menu you can **Pin** it, mark it **Still true**, **Add to note**, **Copy** it, **Convert to task** (save it as an action item), open it in Knowledge, or **Remove from session**.

Use **Layout** in the live session to choose where the Knowledge panel goes, or show the cards as an overlay on the right edge.

::screenshot{src="/screenshots/knowledge/live-knowledge-panel.png" alt="Live session with the Knowledge panel open on the Cards view, one card highlighted with the Mentioned just now badge" caption="A card lighting up during a call"}
::

After the session, its **Knowledge** tab shows the **Knowledge deck** and the cards that **Came up in conversation**.

### What the privacy mode changes

The session's privacy mode decides whether cards appear live:

| Privacy mode | Live recall |
| --- | --- |
| **Normal** | Cards light up when mentioned. |
| **Session only** | Cards light up. Cards you add stay with this session. |
| **No auto cards** | No cards pop up during the session. Ask AI and search still work. |
| **Sensitive** | Recall, Ask AI, suggestions and search are all off. |

## Related

- [Review and scans](/knowledge/review-and-scans)
- [Documents](/knowledge/documents)
- [Projects](/knowledge/projects)
- [Scheduling and preparing](/sessions/scheduling-and-preparing)
- [Ask TalkBar](/chats-and-notes/ask-talkbar)
