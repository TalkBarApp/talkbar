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
| A session | **Ask AI** in the header of a completed session. |
| A live session | **Ask AI** in the live session tools. The chat opens in the side panel while recording continues. |
| A document | **Ask AI** in the document reader. |
| Any page | **Chat** in the [Quick Actions](/settings/quick-actions) menu opens the chat panel on the current page. |
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

The same menu has more settings:

| Setting | What it does | Default |
| --- | --- | --- |
| **Conversation memory** | How much of the chat TalkBar re-reads with each question: **Auto**, **This message only**, or the **Recent messages** (5, 10, 20 or 40). **Auto** keeps recent exchanges and compacts older ones when needed. | Auto |
| **Reply language** | The language of answers in this chat. You can pick one of 16 languages. **Auto** uses your [**Response Language**](/settings/ai-providers#response-language) setting if you chose a language there. Otherwise it answers in the language of your question. | Auto |
| **Suggest next steps** | Shows buttons under answers for what to ask next. See [Next steps](#next-steps). Not available while **Conversation memory** is **This message only**. | On |

**Start new topic** clears the conversation memory without leaving the chat. **Start new chat** opens a fresh chat with the same scope, memory and sources. The shortcut is `Ctrl+Shift+O`, or `Cmd+Shift+O` on macOS.

A chat keeps answering from what it started with. If a chat already has messages and you change **Answer using**, TalkBar asks **Open a new chat?**. **Open new chat** moves your unsent message there, and the current chat stays as it is.

::screenshot{src="/screenshots/chats-and-notes/answer-using-menu.png" alt="The Answer using menu open in a chat, showing All workspace, Project only, Attached sources and General chat & TalkBar help, with Conversation memory and Reply language rows below" caption="Answer using"}
::

## Write a question

- Type **@** to mention a session, note, document, memory card, person or company. A mention is attached as a source for that message.
- Click **Skills** in the message box, or type **/** in an empty box, to apply a [skill](#use-a-skill).
- **Add sources** attaches sessions, notes, documents, approved memory cards, people or companies. You can also **Import file and add source**; imported files are saved in your [document library](/knowledge/documents).
- The microphone button lets you dictate your question.
- `Enter` sends and `Shift+Enter` starts a new line. While TalkBar answers, **Stop** ends the reply. In an empty box, the up arrow key opens your last message for editing.

Attachments and **@** mentions share a limit of **three sources per message**. Remove one to add another.

### Use a skill

A skill is a set of ready-made instructions, such as **Catch me up** or **Draft a follow-up email**. **Choose a skill** lets you search skills or filter them by group. Pinned skills come first, then **Suggested for this chat**. **Manage skills** opens [Templates and skills settings](/settings/templates-and-skills).

The skill you pick appears above the message box:

- **Change** picks another skill, and **Remove skill** takes it off.
- **Edit instructions** changes the instructions for this message only. The saved skill stays the same.
- Add details if you want, and press `Enter`. The skill runs on what **Answer using** is set to. With **Attached sources**, attach a source first.

Your sent message shows the skill it used. Click it to see the instructions, or choose **Use skill again**.

## Sources and citations

Answers that use your material show numbered citations and a **Sources** row with a count. Click the row to show or hide the source chips (**Show sources** / **Hide sources**). TalkBar keeps your choice for other answers. Several passages from one item share one chip.

Click a citation or a chip to see the cited excerpt. From there you can open the session at that exact moment, the note, the document, the memory card, or the person or company.

When TalkBar mentions an item it actually used, such as a session, note or person, the name becomes a link you can click. TalkBar only links items it read for the answer, so a link never points to something made up.

TalkBar tells you when an answer is not fully grounded, for example:

- **Answered from general knowledge, not your workspace data.**
- **Not every attached source was used in this answer.**
- **Based on selected passages, not every part of the sources.**

## Work with answers

The buttons under a message depend on who wrote it. They stay visible on the latest messages and appear on hover on older ones.

| Under | Action | What it does |
| --- | --- | --- |
| An answer | **Copy** | Copies the answer. |
| An answer | **Save to note** | **Create new note**, or pick a note and **Add to selected note**. The answer goes at the end of the note. See [Notes](/chats-and-notes/notes). |
| An answer | **Share** | Publishes the answer as a link or sends its text. See [Share links](/sharing/share-links). |
| The last answer | **Retry** | Asks again. |
| Your message | **Copy** | Copies your message. |
| Your message | **Edit** | Lets you change the prompt and send it again as a new message. |
| Your message | **New chat with this prompt** | Starts a new chat with the same question and skill. |

Select text in an answer and click **Ask about this** to quote it in your next message.

TalkBar can also propose to create a memory card, an action item or a note from the conversation. The proposal appears as a card in the chat. Nothing is created until you click **Confirm and create**.

### Next steps

Under the latest answer, TalkBar can offer up to 4 buttons with what to ask next. AI writes them in the language of the answer. Point at a button to see the full request, and click it to send that request as your next message.

To turn them off for a chat, use **Suggest next steps** in the **Answer using** menu.

## Which model answers

Below the message box, **Answering with** shows the AI model for this chat. Click the model name to see its context and reply limits. **Change** picks another model for this chat only; your default model stays the same. In the picker:

- Search for a model, or choose your default model at the top of the list to go back to it.
- **Auto-retry** sends your last prompt again when you change models. Your current draft stays unchanged.
- **Manage models** opens the AI settings.

The default chat model is set in **Settings → AI Providers**. If your default model is not available, TalkBar tells you and lets you pick another one. See [Providers and models](/ai/providers-and-models) and [Private AI Mode](/ai/private-ai-mode).

## Manage chats

From a chat's menu:

- **Share** the whole chat as a link, or send it. See [Share links](/sharing/share-links).
- **Open in sidebar** keeps the chat open next to other pages.
- **Rename** the chat, or click **Generate title with AI** in the title.
- **Pin** or **Unpin** it.
- **Move to Trash**. You can restore it later from **Trash**.

If you leave a chat with no messages, TalkBar asks **Keep this chat?**. Choose **Keep chat** or move it to Trash.

In **Trash**, **Restore** brings a chat back and **Delete forever** removes it. **Empty Trash** permanently deletes all trashed chats.

On the Chats page, `Shift+Esc` returns you to the message box.

## Related

- [Notes](/chats-and-notes/notes)
- [Documents](/knowledge/documents)
- [Knowledge cards](/knowledge/knowledge-cards)
- [How TalkBar uses AI](/ai/how-talkbar-uses-ai)
- [Providers and models](/ai/providers-and-models)
