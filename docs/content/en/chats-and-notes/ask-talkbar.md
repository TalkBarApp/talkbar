---
title: Ask TalkBar
description: Chat with TalkBar about one session, one document, a project or your whole workspace, with cited sources you can open.
navigation:
  icon: i-heroicons-chat-bubble-left-right
---

A **chat** is a conversation with the TalkBar AI assistant. Ask it what was decided in last week's call, what a contract says about renewals, or how to use a TalkBar feature. Answers about your own material cite their sources, so you can check them. Every chat is saved.

## The Chats page

Click **Chats** in the sidebar.

| Control | What it does |
| --- | --- |
| **New chat** | Starts a conversation. |
| **All Chats** / **Pinned** / **Trash** | Switch views. Pin the chats you come back to. |
| Filters | **Project**, **Chat mode** (what the chat answers from) and **Last activity** (**Any time**, **Today**, **Last 7 days**, **Last 30 days**, **Last 90 days**). |
| **Sort** | By last activity, creation date or title. **Pinned on top** keeps pinned chats first. |
| **Search** | Finds chats by title. |

::screenshot{src="/screenshots/chats-and-notes/chats-page.png" alt="Chats page with the All Chats/Pinned/Trash tabs, the Project, Chat mode and Last activity filters, and a list of chats grouped by day with their mode icons" caption="The Chats page"}
::

## Ask from anywhere

You don't have to open the Chats page first:

| Where | How |
| --- | --- |
| A session | **Ask AI about this session** on the session page. |
| A live session | **Ask AI** in the live session tools. The chat opens in the side panel while recording continues. |
| A document | **Ask AI about this document** in the document reader. |
| A chat | **Open in sidebar** in the chat's menu keeps it open next to other pages. |

These chats are grounded in that session or document, and they are saved in your chat list like any other chat. Asking the same session or document again reopens its chat.

::callout{icon="i-heroicons-lock-closed" color="gray"}
**Ask AI** is off for sessions recorded in the **Sensitive** privacy mode.
::

## Choose what TalkBar answers from

Open **Answer using** above the message box:

| Choice | Use it when |
| --- | --- |
| **All workspace** | You want answers from all your sessions, notes, documents and knowledge. |
| **Project only** | The question is about one project. Pick the project. |
| **Attached sources** | You want the answer based only on specific items: up to three sessions, notes, documents, memory cards, people or companies. |
| **General chat & TalkBar help** | The question is not about your own material, or you need help with TalkBar. No workspace data is used. |

The same menu has two more settings:

| Setting | What it does | Default |
| --- | --- | --- |
| **Conversation memory** | How much of the chat TalkBar re-reads with each question: **Auto**, **This message only**, or the **Recent messages** (5, 10, 20 or 40). **Auto** keeps recent exchanges and compacts older ones when needed. | Auto |
| **Reply language** | The language of answers. **Auto** answers in the language of your question, or your **Response language** setting. | Auto |

**Start new topic** clears the conversation memory without leaving the chat. **Start new chat** opens a fresh chat with the same scope, memory and sources.

::screenshot{src="/screenshots/chats-and-notes/answer-using-menu.png" alt="The Answer using menu open in a chat, showing All workspace, Project only, Attached sources and General chat & TalkBar help, with Conversation memory and Reply language rows below" caption="Answer using"}
::

## Write a question

- Type **@** to mention a session, note, document, memory card, person or company. A mention is attached as a source for that message.
- Type **/** in an empty box to apply a **skill**: ready-made instructions such as **Catch me up** or **Draft a follow-up email**. Skills are managed in [Templates and skills settings](/settings/templates-and-skills).
- **Add sources** attaches sessions, notes, documents, approved memory cards, people or companies. You can also **Import file and add source**; imported files are saved in your [document library](/knowledge/documents).
- The microphone button lets you dictate your question.

Attachments and **@** mentions share a limit of **three sources per message**. Remove one to add another.

## Sources and citations

Answers that use your material show numbered citations. Click a citation, or **Show sources**, to see where an answer came from. From a source you can open the session at that exact moment, the note, the document, the memory card, or the person or company.

When TalkBar mentions an item it actually used, such as a session, note or person, the name becomes a link you can click. TalkBar only links items it read for the answer, so a link never points to something made up.

TalkBar tells you when an answer is not fully grounded, for example:

- **Answered from general knowledge, not your workspace data.**
- **Not every attached source was used in this answer.**
- **Based on selected passages, not every part of the sources.**

## Work with answers

Each answer has these actions:

| Action | What it does |
| --- | --- |
| **Copy** | Copies the answer. |
| **Retry** | Asks again. |
| **Edit** | On your own message: edit the prompt and send it again. |
| **New chat with this prompt** | Starts a new chat with the same question. |
| **Save to note** | Saves the answer to a new note or adds it to an existing one. See [Notes](/chats-and-notes/notes). |
| **Share** | Shares the answer as a link. See [Share links](/sharing/share-links). |

TalkBar can also propose to create a memory card, an action item or a note from the conversation. The proposal appears as a card in the chat. Nothing is created until you click **Confirm and create**.

## Which model answers

Below the message box, **Answering with** shows the AI model for this chat. Click it to **Change chat model** for this chat only; your default model stays the same. **Manage models** opens the AI settings.

The default chat model is set in **Settings → AI Providers**. If your default model is not available, TalkBar tells you and lets you pick another one. See [Providers and models](/ai/providers-and-models) and [Private AI Mode](/ai/private-ai-mode).

## Manage chats

From a chat's menu:

- **Rename** the chat, or let AI suggest a title.
- **Pin** or **Unpin** it.
- **Share** the whole chat as a link.
- **Move to Trash**. You can restore it later from **Trash**.

In **Trash**, **Restore** brings a chat back and **Delete forever** removes it. **Empty Trash** permanently deletes all trashed chats.

## Related

- [Notes](/chats-and-notes/notes)
- [Documents](/knowledge/documents)
- [Knowledge cards](/knowledge/knowledge-cards)
- [How TalkBar uses AI](/ai/how-talkbar-uses-ai)
- [Providers and models](/ai/providers-and-models)
