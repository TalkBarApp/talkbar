---
title: Importing recordings
description: Create a session from an existing audio or video file. TalkBar transcribes it on your computer, separates speakers and writes the summary.
navigation:
  icon: i-heroicons-arrow-up-tray
---

Already have a recording of a meeting, lecture or call? Import it, and TalkBar turns it into a session just like one you recorded live: a transcript by speaker, a timeline, a summary and a title. Transcription runs on your computer.

## Supported files

| | |
| --- | --- |
| **Formats** | mp3, wav, m4a, mp4, aac, flac, ogg, opus, mkv, webm |
| **Maximum size** | 1 GB |
| **Maximum length** | 6 hours |

Video files (mp4, mkv, webm) work too: TalkBar uses their audio track.

## Import a file

1. Click **New session** and set up the session as usual: choose a [template](/sessions/templates-and-skills), and optionally a project, series, context, summary language, length and privacy mode. See [Starting a session](/sessions/starting-a-session).
2. In the **Template** part, click **Upload audio file**.
3. Drop your file on the window, or click to browse for it.
4. Choose the options below, then click **Start import**.

::screenshot{src="/screenshots/sessions/upload-audio-file.png" alt="The Upload audio file window with an mp3 file selected, the Speakers choice, the Transcription model and Summary model dropdowns, and the Start import button" caption="The Upload audio file window"}
::

| Option | What it does |
| --- | --- |
| **Speakers** | **Just you** is fastest: it skips speaker detection. **You + 1**, **Small (2–4)** and **Large (5–8)** separate who said what. |
| **Transcription model** | The speech model that transcribes the file. If the model isn't installed yet, you can download it from this window. |
| **Summary model** | The AI model used for the timeline entries and the summary. **Default** uses your configured model. For a Private AI session, the summary runs on a built-in local model. |

The session uses the rest of the setup from the New session window, such as the template, project and privacy mode.

::callout{icon="i-heroicons-light-bulb" color="primary"}
If the speaker detection model isn't downloaded, the window tells you and offers to download it. See [Speakers](/voice/speakers).
::

## What happens during an import

The **Importing audio file** window shows each stage and how long it has taken:

1. **Decoding audio** and **Converting audio**: reads the file and saves it as the session's audio.
2. **Detecting speech**: finds the parts where people talk.
3. **Transcribing**: transcribes each part, and detects speakers.
4. **Saving transcript**.
5. **Summarizing timeline**: writes the timeline notes.
6. **Writing the summary**.
7. **Naming the session**: suggests a title.

You can keep the window open. When the import finishes, the session opens by itself on the recording screen; click **Details** in its header for the full [details page](/sessions/session-details). Imported sessions are completed sessions, and their details page shows **From audio file**.

Click **Process in background** to keep working while it runs. The session shows **Importing** in the Sessions list, and a notification says **Audio import complete** when it's done. Click **View session** in the notification to open it.

## Cancel an import

Click **Cancel import**. If some of the file was already transcribed, TalkBar keeps that part as a session; click **View session** to open it. If nothing was transcribed yet, the empty session is removed.

## Things to know

- Only one import runs at a time. While it runs, you can't start a live session; you can still schedule one for later.
- The imported audio is kept with the session, so you can play it and use **Enhance transcript** later. See [Session details](/sessions/session-details#enhance-transcript).
- On the Free plan, an import counts toward the workspace's session limit. See [Plan limits](/sessions/overview#plan-limits).
- If the import fails, the window shows **Audio import failed** with the reason.

## Related

- [Starting a session](/sessions/starting-a-session)
- [Session details](/sessions/session-details)
- [Recording and transcription](/voice/recording-and-transcription)
