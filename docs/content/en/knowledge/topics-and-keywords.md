---
title: Topics and keywords
description: Tag sessions and notes with your own topics, use the keywords AI picks from each session, and turn useful keywords into topics.
navigation:
  icon: i-heroicons-hashtag
---

TalkBar has two ways to label your work. **Topics** are your own labels, with a name and a color, that you put on sessions and notes. **Keywords** are picked by AI from each session's content. Both help you filter lists and find related work.

| | Topics | Keywords |
| --- | --- | --- |
| Who adds them | You | AI, when it writes a session's summary. You can edit them. |
| Used on | Sessions and notes | Sessions |
| Look | Name and color | Plain words |
| Own page | Yes | No |
| Limit per item | 20 | 20 per session |
| Managed in | **Settings → Topics & Keywords → Topics** | **Settings → Topics & Keywords → Keywords** |

## Topics

Topics belong to the workspace and are shared by sessions and notes. TalkBar never adds or suggests a topic on its own: a topic is on an item only because you put it there, or because a series you set up carries it to every meeting.

Topic names can have up to 80 characters and are unique in a workspace, ignoring case. Topics can't be merged. Create, rename, recolor and delete them in [settings](/settings/projects-and-topics#topics), or rename and delete them on their page.

### Add topics to a session

- **When you start a session**: use **Topics and source** in the session setup.
- **During or after a session**: use the topics row in the session's details. Click the **Topic** button with the plus sign, then tick topics in the picker.
- **For a series**: topics saved on a session series are added to each new meeting of that series.

In the picker, type in **Find or create topic…**. If no topic has that name, choose **Create “name”** to make one on the spot. Click **Save** to apply.

To take a topic off a session, untick it in the picker. In the session setup and in a live session's details, you can also click the **×** on its chip.

Session lists show the first two topics and a count of the rest. The session page shows up to six.

### Add topics to a note

- In the note editor, use **Add to topic…** in the note's links.
- In the Notes list, open a note's menu and choose **Add to Topic**. This menu lists existing topics only. To create one, use the note's links.

An item can have up to 20 topics.

::screenshot{src="/screenshots/knowledge/assign-topics.png" alt="Session details with the Assign topics picker open, two topics checked and a new name typed in Find or create topic… showing the Create option" caption="Assigning topics to a session"}
::

### The topic page

Click a topic chip anywhere in the app to open its page. It lists everything tagged with the topic on two tabs, **Sessions** and **Notes**, each with its own search box.

| Action | What it does |
| --- | --- |
| **Edit** | Rename the topic or change its color. |
| Delete (trash) → **Delete topic** | Deletes the topic after showing how many sessions and notes use it, then opens the session list. The sessions and notes are kept; only the topic is removed from them. |
| **Remove from topic** | In a row's menu: takes the topic off that one session or note. |

You can also open a topic's page from **Settings → Topics & Keywords → Topics** by clicking its name.

### Filter by topic

- **Sessions**: filter the list by topic. See [Sessions overview](/sessions/overview).
- **Notes**: filter by topic. See [Notes](/chats-and-notes/notes).
- **Projects**: on a project's **Sessions** tab, filter by topic.

If you pick several topics, you see items with any of them.

## Keywords

When AI writes a session's final summary, it also picks up to 12 keywords: the important words of that conversation. They appear with the summary and in the session list.

- **Edit keywords** next to the keywords lets you add, change or remove them. If a session has none, click **Add keywords**. Click **Save** to apply. You can edit keywords once a session has a final summary.
- A session can have up to 20 keywords, each up to 80 characters.
- When the summary is written again, AI replaces its own keywords with new ones. Keywords you added or changed are kept.
- When you remove a keyword, AI will not add it back to that session. If you add it back yourself, it counts as yours.

### Filter by keyword

Filter the **Sessions** list, or a project's **Sessions** tab, by keyword with **Filter by keyword**. If you pick several keywords, you see sessions with any of them. On a project's tab, the list holds only that project's keywords. Notes have no keywords.

In the **Sessions** list, click a keyword on a row to turn that filter on or off. Searching sessions also matches their keywords.

### Turn a keyword into a topic

A keyword is often a good topic. Open **Settings → Topics & Keywords → Keywords** to see every keyword in the workspace and how many sessions carry it.

- **Convert to topic** creates a topic with the keyword's name and assigns it to every session that carries the keyword. If a topic with that name already exists, you can **Assign topic** instead. To fold a keyword into a topic with a different name, type that topic's name in the dialog.
- Select several keywords and use **Convert to topics** to convert them at once.
- **View sessions** opens the session list filtered by the selected keywords.
- **Delete** removes keywords from every session that carries them. AI will not restore them unless you add them back on a session.

The keyword stays on its sessions after you convert it. See [Projects, topics and keywords settings](/settings/projects-and-topics#keywords) for every control on that tab.

::screenshot{src="/screenshots/knowledge/topic-page.png" alt="A topic page showing the topic name and color in the header with Edit and Delete topic buttons, and the Sessions tab listing three tagged sessions" caption="A topic page"}
::

## Related

- [Projects, topics and keywords settings](/settings/projects-and-topics)
- [Notes](/chats-and-notes/notes)
- [Sessions overview](/sessions/overview)
- [Series](/sessions/series)
