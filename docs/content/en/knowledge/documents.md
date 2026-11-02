---
title: Documents
description: Import PDFs, Word files, Markdown and other documents so TalkBar can search them, use them as chat sources, and bring them into your sessions.
navigation:
  icon: i-heroicons-document-text
---

Keyboard shortcuts shown below are Windows defaults. On macOS, check the shortcut shown in TalkBar or its settings; configurable shortcuts can be changed there.

**Documents** are files you add to TalkBar: briefs, contracts, specs, slides, notes from other apps. TalkBar reads the text on this computer and indexes it, so your chats, session preparation and knowledge scans can use the documents as sources.

Open **Knowledge → Documents** to see your document library.

::screenshot{src="/screenshots/knowledge/documents-library.png" alt="Knowledge → Documents tab showing the All/Markdown/PDF/Docs/Other kind tabs, the sort and search controls, and a grid of document cards, one of them still showing Building search with a percentage" caption="The document library"}
::

## Supported formats

| Kind | File types |
| --- | --- |
| **PDF** | `.pdf` |
| **Markdown** and text | `.md`, `.markdown`, `.txt` |
| **Docs** (Word and similar) | `.doc`, `.docx`, `.odt`, `.rtf` |
| Spreadsheets | `.xls`, `.xlsx`, `.ods`, `.csv` |
| Presentations | `.ppt`, `.pptx`, `.odp` |
| E-books | `.epub` |

Each file can be up to **64 MB**.

## Import documents

1. Open **Knowledge → Documents** and click **Add documents**. (On the **Memory cards** tab, **Import documents** takes you here.)
2. Choose **Add files**, **Add folder**, or drag files onto the dialog. You can add many files at once. **Add folder** imports the supported files in a folder and its subfolders.
3. Under **File into**, pick a project, or leave the documents in **General**.
4. Click **Add documents**.

TalkBar reads each file, adds it to your library and builds its search index. The dialog shows how many files are imported and how many failed. You can close the dialog while indexing runs.

Files with an unsupported type are skipped, and the dialog tells you how many.

### Document status

| Status | Meaning |
| --- | --- |
| **Queued…** | Waiting to be indexed. |
| **Building search… · n%** | TalkBar is indexing the document. |
| Ready | No badge. The document is searchable and can be used as a source. |
| **Import failed** | TalkBar could not read the file. **Retry** tries again. |
| **Source changed** | The original file on disk changed after import. **Update from file** re-reads it. |

## Search: keyword and semantic

Documents are always searchable by exact words. For search that also finds passages with the same meaning in different words, TalkBar uses a local semantic search model.

If the model is not installed, the Documents tab shows a banner saying search runs in keyword-only mode. Click **Install model** to download it once. It runs on your computer.

To search your documents:

- Use the search box on the Documents tab to filter documents by title and preview text.
- Use the app-wide search (`Ctrl+K`) to find passages in documents together with sessions, notes and cards. See [Getting around](/getting-started/getting-around).
- Open a document and search inside it (see below).

## Read a document

Click a document to open it in the reader. The reader shows the text TalkBar extracted from the file.

- **Search in** the document, and step through matches with **Previous match** and **Next match**. Matches are highlighted.
- Open up to **five** documents as tabs. Use **Preview** → **Upload file** or **From document library** to add more tabs, and search across all open documents at once.
- **File Info** shows the type, size, source and when the document was added. For a document imported with **Add folder**, it also shows the **Imported folder**. Under **Knowledge**, it says how many memory cards came from the document and how many may be stale.
- **Related** lists linked knowledge items.
- **Ask AI** opens a chat about the document in the side panel.
- **Scan for knowledge** asks AI to find memory cards, people and companies in the document. See [Review and scans](/knowledge/review-and-scans).

::screenshot{src="/screenshots/knowledge/document-reader.png" alt="Document reader with two documents open as tabs, a search term highlighted in the text, and the Ask AI and Scan for knowledge buttons visible" caption="Reading and searching a document"}
::

## Organize documents

- **Kind tabs**: **All**, **Markdown**, **PDF**, **Docs** and **Other** (text, spreadsheets, slides, e-books). **Filter views** chooses which kind tabs you see, and **Set as default** keeps your choice.
- **Sort** by date added or by title. **Pinned on top** keeps pinned documents first.
- The scope switcher at the top right of Knowledge shows documents for the whole workspace, for **General**, or for one project or series.

Each document's menu has:

| Action | What it does |
| --- | --- |
| **Open** | Opens the reader. |
| **Pin** / **Unpin** | Keeps the document at the top. |
| **Move** | Files the document in a project, in **General** or in a series. |
| **Scan for knowledge** | Scans the document for suggestions. |
| **Related…** | Shows linked knowledge items. **Add relation** links the document to another one. |
| **Update from file** | Re-reads the original file from disk. |
| **Show in File Explorer** (Windows), **Show in Finder** (macOS) | Shows the original file. Only for documents imported from a file on disk. |
| **Delete** | Removes the document from your library and from search. This cannot be undone. |

**Select documents** lets you **Open** several documents as tabs, **Move** them to a project, **General** or a series, or **Delete** them.

## Use documents in sessions

You can attach documents to a session, so AI has them as context during the call and when it answers questions about the session.

- **Before a session**: add documents while you [prepare a scheduled session](/sessions/scheduling-and-preparing).
- **During a session**: add the **Documents** panel from **Layout** in the live session.
- **After a session**: open the session's **Documents** tab.

Click **Add** and choose **Upload file**, **From document library** or **From notes**.

::callout{icon="i-heroicons-information-circle" color="gray"}
A session can have up to **three** attached sources, documents and notes together. Remove one to add another.
::

**Remove from session** takes a document off the session. It stays in your library and remains searchable elsewhere.

## Use documents in chats and projects

- In a chat, use **Add sources** to attach a document, or type **@** and pick it. See [Ask TalkBar](/chats-and-notes/ask-talkbar).
- A project's **Documents** tab lists documents filed in it. Use **Add** → **Document** on the project page to add one. See [Projects](/knowledge/projects).

## Related

- [Review and scans](/knowledge/review-and-scans)
- [Ask TalkBar](/chats-and-notes/ask-talkbar)
- [Projects](/knowledge/projects)
- [Scheduling and preparing](/sessions/scheduling-and-preparing)
- [Local models](/ai/local-models)
