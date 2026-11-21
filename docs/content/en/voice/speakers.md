---
title: Speakers
description: How TalkBar tells voices apart, how to name speakers and link them to people, and how to keep one speaker out of AI.
navigation:
  icon: i-heroicons-user-group
---

TalkBar separates the voices in a recording into **speakers**, so the transcript shows who said what. You choose how many people to expect, then name speakers so real names carry into the transcript, summary and your people list. Speaker detection runs on this computer.

## Speaker modes

When you start a session, the **Speakers** row in **New session** tells TalkBar how many voices to expect. A session template can set a default; **Reset to template default** brings it back.

| Mode | When to use it | What TalkBar does |
| --- | --- | --- |
| **Just you** | Voice notes and solo thinking | Skips speaker detection, the fastest option |
| **You + 1** | A one-on-one call or conversation | Separates two voices |
| **Small (2–4)** | Small meetings | Separates up to four voices |
| **Large (5–8)** | Larger meetings | Separates up to eight voices with a large-meeting speaker model |

::screenshot{src="/screenshots/voice/new-session-speakers.png" alt="New session dialog showing the Audio row and the Speakers row with Just you, You + 1, Small (2–4) and Large (5–8) pills, You + 1 selected, and the Speakers at start roster below with the You and Speaker 2 slots" caption="Choosing speakers in New session" compact max-width="640"}
::

### Name speakers before you start

Under **Speakers at start** you see one slot for each expected voice. With **You + 1** and your microphone captured, the first slot is **You** and the next is **Speaker 2**. With **Small** or **Large**, the slots are **Speaker 1**, **Speaker 2** and so on; mark yourself later with **This is me**. If your microphone isn't captured (for example with **System audio** only), there is no **You** slot. **Just you** has no roster. Use **−** and **+** next to the count to change it. Click a slot to type a name, or type `@` to pick a saved person.

New voices are matched to free speakers in order. If the order turns out wrong, rename or combine speakers at any time.

## Speaker detection models

Speaker detection uses small models that TalkBar downloads when a feature needs them. You can see them in **Settings → Private Local AI → System models**.

The **Speaker detection model** setting in **Settings → Voice → Transcription** decides which model separates voices in new sessions, imported audio and **Enhance transcript**:

| Option | What it does |
| --- | --- |
| **Automatic (Sortformer up to 4 speakers, Nemotron 3 for more)** | The default. Picks the right model from the speaker mode. |
| **Sortformer (4 or 8 speakers)** | Always uses Sortformer: the 4-speaker model, or the 8-speaker model for large sessions. |
| **Nemotron 3 (up to 8 speakers)** | Always uses Nemotron 3. |

Sessions with more than four speakers need the large-meeting model. If it is not downloaded, **New session** shows a notice with a **Download** link. Without it, TalkBar may fall back to a model that separates fewer voices, so some voices can be merged.

::callout{icon="i-heroicons-light-bulb" color="primary"}
If a session starts without speaker detection because its model is missing, TalkBar says so on the session and offers **Download the model** so your next session tells speakers apart.
::

## Rename speakers and link them to people

During or after a session, click a speaker chip to open its menu. The menu is headed by the speaker's name and how many lines they have. Hover a chip to see their talk time and share of the conversation, for example **Talk time: 4 min · 30% of total**. A speaker with no lines yet shows as a faded, dashed chip (**No speech**).

::screenshot{src="/screenshots/voice/speaker-chip-menu.png" alt="A session's speaker chip menu open, showing Rename voice, Session Leader, This is me, Ignore speaker, Label, Combine speakers… and the Color swatches" caption="The speaker menu" compact max-width="600"}
::

| Menu item | What it does |
| --- | --- |
| **Rename speaker** | Type a name, or type `@` to pick a saved person. The name carries into the transcript and summary. |
| **Session Leader** | Marks the speaker who leads the session. |
| **This is me** | Marks this speaker as you. |
| **Ignore speaker** | Leaves this speaker out of AI (see below). |
| **Show only their lines** | Filters the transcript to this speaker. See [Filter the transcript by speaker](#filter-the-transcript-by-speaker). |
| **Label** | Adds a role such as Client or Manager. See [Speaker labels](#speaker-labels). |
| **Combine into…** | Moves all of this speaker's lines to another speaker and removes this one, after you confirm. Anything this voice says later is shown as the other speaker too. Use it when TalkBar split one person into two. |
| **Move all lines to…** | While recording only. Moves this speaker's lines so far to another speaker or a **New speaker**, after you confirm. The speaker stays, and new speech from this voice still appears under it. |
| **Color** | Changes the speaker's color. |
| **Remove name** | Clears a name you gave, so the speaker goes back to its default label. Shown only for a speaker you named. |
| **Delete speaker and lines…** | Deletes the speaker's lines after you confirm. While recording, the lines so far are deleted and the speaker stays as ignored, so anything new from this voice is collapsed and left out of summaries. After recording, the speaker and all of their lines are deleted from the session; summaries already written don't change. This can't be undone. |

When you name a speaker, that person appears in [People and companies](/knowledge/people-and-companies), linked to the session. Names can be up to 40 characters, and two speakers in one session cannot share the same name.

### Fix single lines

Sometimes one line lands on the wrong speaker. Open the line's menu in the transcript and its **Speaker** submenu. The **This line** section has:

- **Move this line to…** moves the line to another speaker or to a **New speaker**.
- **Join with previous** merges the line into the previous speaker turn. This cannot be undone.

Below it, a section headed by the speaker's name has **Rename speaker** and **Ignore speaker**, which apply to the whole speaker.

### When your microphone is recorded

When the recording includes your microphone, TalkBar can mark your own voice as **You**. If your microphone is not captured (for example with **System audio** only), no speaker is marked as you. Use **This is me** to set it yourself.

## Filter the transcript by speaker

To see only what some speakers said, click **Filter by speakers** in the transcript header. Under **Show lines from**, tick the speakers to show (each shows its line count), or click **Only** next to one speaker. The header shows how many lines are shown, for example **12 of 40 lines**. **Show all speakers** clears the filter. **Show only their lines** in a speaker's menu is a shortcut for **Only**.

While the transcript is filtered, each speaker it shows has a funnel icon on their chip (**Filtered by speaker**). Filtering only changes the transcript view: nothing is moved or deleted, and summaries are not affected. Ignored speakers are still left out of summaries.

## Exclude a speaker from AI

**Ignore speaker** keeps one person's words out of AI. Use it when someone's speech should not go into summaries, chat answers or knowledge.

- Their lines are collapsed in the transcript and marked **Ignored**. Click **Show hidden text** to read them. The text stays excluded from AI.
- Their speech is left out of the summary, chat answers, knowledge scans and search.
- Choose **Ignore speaker** again to bring them back. Everything is restored.

Ignoring a speaker does not delete anything. The words stay in the transcript.

## Recognizing returning voices

Within a session, TalkBar keeps track of each voice. If you pause and continue a session, or a recording is resumed after an interruption, it compares new voices with the speakers already in the session and reuses a speaker when the voice matches.

**Enhance transcript** runs speaker detection again on the saved audio. In the review it shows how well each detected voice matches an existing speaker (**Strong match**, **Possible match**, **Weak match**). Voices with no match get new labels, and you can map them to existing speakers before you replace the transcript. See [Session details](/sessions/session-details).

## Speaker labels

**Speaker labels** are roles such as Client or Manager. Speakers whose labels sit higher in the list get more attention in timelines and summaries.

Manage them in **Settings → Voice → Speakers → Speaker labels**:

- **Add label** creates a new one. Drag labels to reorder them.
- TalkBar ships with built-in labels (**Client**, **Manager**, **Interviewer**, **Guest**) that you cannot rename or remove, plus editable ones (**Decision Maker**, **Expert**, **Support**, **Observer**).

You can also create a label from a speaker's menu with **Label → New label…**.

## Related

- [Recording and transcription](/voice/recording-and-transcription)
- [Starting a session](/sessions/starting-a-session)
- [Session details](/sessions/session-details)
- [People and companies](/knowledge/people-and-companies)
- [Voice settings](/settings/voice)
