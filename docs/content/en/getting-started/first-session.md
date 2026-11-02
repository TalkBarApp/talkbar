---
title: Your first session
description: Set up, record and review your first TalkBar session from start to finish, or create one from an existing audio file.
navigation:
  icon: i-heroicons-play-circle
---

This walkthrough takes you from an empty workspace to a finished session with a transcript and summary. It takes a few minutes. If you haven't finished [first-run setup](/getting-started/first-run-setup) yet, do that first: it downloads the speech and speaker models every session needs.

## Before you start

- **Microphone.** Connect the microphone you want to use. In **Settings → Voice → Recording** you can pick it and click **Start test** under **Test audio input** to hear how it sounds.
- **Microphone access.** Allow TalkBar to use the microphone in your system privacy settings.
- **Speech model.** Transcription runs on this computer. If the model is missing when you start, TalkBar tells you to download it in **Settings → Voice**.
- **AI.** Summaries and titles need an AI model. You chose one during setup; to change it, click the TalkBar logo and choose **Set up AI…**.

## 1. Set up the session

Click **New session** in the title bar or on Home. The New session window opens.

1. **Template.** Pick the kind of session, such as *Meeting*, *1:1* or *Voice Note*. The template decides the summary sections. **More…** shows all templates.
2. **Audio.** Choose what to record:
   - **Microphone** for your own voice, such as voice notes or an in-person meeting;
   - **System audio** for the other side of a call, played by your computer;
   - **Mic + System** for both sides of a call. This is the usual choice for online meetings.
3. **Speakers.** Roughly how many people will talk: **Just you**, **You + 1**, **Small (2–4)** or **Large (5–8)**. This helps TalkBar tell voices apart. For large meetings TalkBar may ask you to download an extra speaker model.
4. **Optional.** Choose the AI model for the summary, add topics, file the session under a project or series, attach knowledge cards and documents, and adjust **AI & privacy**.
5. Click **Start session**.

::screenshot{src="/screenshots/getting-started/new-session-window.png" alt="New session window with the Meeting template selected, Mic + System chosen under Audio, Small (2–4) chosen under Speakers, and the Start session button at the bottom" caption="The New session window"}
::

::callout{icon="i-heroicons-light-bulb" color="primary"}
Click **Save as my defaults** before starting to keep these choices for next time. Not ready yet? **Schedule for later** sets a date and time instead.
::

If **Start session** doesn't work, check for a **Recording in progress** notice (another session is recording; stop it first), an audio import that is still running, or a missing audio device.

## 2. Record

- The **Recording — let everyone know** reminder appears. Telling everyone present that they are being recorded, and getting their consent where the law requires it, is your responsibility. Click **Got it**.
- The screen shows **Getting audio ready…**, then **Waiting for someone to speak** until the transcript starts. If it says **No audio detected yet — check your microphone or audio source.**, check that the right microphone and audio source are selected.
- The live transcript appears by speaker. Click a speaker chip to rename the speaker, so the transcript and summary use real names.
- The timeline sums up the conversation as it goes. Use **Ask AI** to ask about what has been said so far.
- The pause button (**Pause recording**) and **Stop** are in the recording controls at the top.

::screenshot{src="/screenshots/getting-started/recording-screen.png" alt="Recording screen during a live session: the session title and recording controls with timer, Pause and Stop at the top, the live transcript split by speaker with speaker chips in the main panel, and the timeline in the sidebar" caption="Recording a session"}
::

See [Recording a session](/sessions/recording) for everything on this screen.

## 3. After you stop

- **Very short sessions.** If almost nothing was recorded, TalkBar asks **Keep this short session?** Choose **Keep session** or **Move to Trash**. If you don't choose within about 15 seconds, the session moves to Trash. **Undo** in the notification brings it back.
- **Summary.** For a normal session, TalkBar writes the final summary automatically and suggests a title.
- **Continue or complete.** The session is now ended but still open. **Continue session** records more into the same session. **Complete session** locks it and opens its details page. You can record a linked follow-up afterwards.

## 4. Review the result

Open the session from **Sessions** (or from the sidebar, where recent sessions are listed). The session details page shows:

- the **summary**, organized into the sections of the template. Edit any part, or regenerate it in another language, length or model;
- the **transcript**, **action items**, **notes**, **documents** and **knowledge** for the session;
- **Ask AI**, to ask questions about the session. Answers show the sources they are based on;
- **Enhance transcript**, which re-processes the recording on this computer with a more accurate model to improve the text and who said what;
- **Share**, to publish a read-only link or send the content by email or Telegram, and the session menu, to export it.

See [Session details](/sessions/session-details), [Share links](/sharing/share-links) and [Exports](/sharing/exports).

## Or start from an existing recording

You can create a session from an audio or video file instead of recording live.

1. Click **New session** and choose **Upload audio file**.
2. Drop a file, or choose one. Supported formats are mp3, wav, m4a, mp4, aac, flac, ogg, opus, mkv and webm, up to 1 GB and 6 hours.
3. Pick the transcription and summary models, then click **Start import**.

A progress window shows each stage. If you keep it open, the session opens when it's done. Click **Process in background** to keep working; a notification says **Audio import complete** when it's done, and **View session** opens it. See [Importing recordings](/sessions/importing-recordings).

## If something goes wrong

Open **Settings → Doctor** and click **Run all checks**, or see [Troubleshooting](/help/troubleshooting).

## Related

- [Starting a session](/sessions/starting-a-session)
- [Speakers](/voice/speakers)
- [Scheduling and preparing](/sessions/scheduling-and-preparing)
- [Templates and skills](/sessions/templates-and-skills)
