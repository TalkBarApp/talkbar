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

::screenshot{src="/screenshots/voice/new-session-speakers.png" alt="New session dialog showing the Audio row and the Speakers row with Just you, You + 1, Small (2–4) and Large (5–8) pills, and the Speakers at start roster with You and Speaker 1 slots below" caption="Choosing speakers in New session"}
::

### Name speakers before you start

Under **Speakers at start** you see a slot for **You** and one for each expected voice (**Speaker 1**, **Speaker 2**, and so on). Use **More speakers** and **Fewer speakers** to change the count. Click a slot to type a name, or type `@` to pick a saved person.

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

During or after a session, click a speaker chip to open its menu.

::screenshot{src="/screenshots/voice/speaker-chip-menu.png" alt="A session's speaker chip menu open, showing Rename voice, Session Leader, This is me, Ignore speaker, Label, Combine speakers… and the Color swatches" caption="The speaker menu"}
::

| Menu item | What it does |
| --- | --- |
| **Rename voice** | Type a name, or type `@` to pick a saved person. The name carries into the transcript and summary. |
| **Session Leader** | Marks the speaker who leads the session. |
| **This is me** | Marks this speaker as you. |
| **Ignore speaker** | Leaves this speaker out of AI (see below). |
| **Label** | Adds a role such as Client or Manager. See [Speaker labels](#speaker-labels). |
| **Combine speakers…** | Moves all speech from this speaker to another one, when TalkBar split one person into two. |
| **Color** | Changes the speaker's color. |
| **Remove name** | Clears a name you gave, so the speaker goes back to its default label. Shown only for a speaker you named. |

When you name a speaker, that person appears in [People and companies](/knowledge/people-and-companies), linked to the session. Names can be up to 40 characters, and two speakers in one session cannot share the same name.

### Fix single lines

Sometimes one line lands on the wrong speaker. Open the line's menu in the transcript:

- **Assign to…** moves the line to another speaker.
- **Join with previous** merges the line into the previous speaker turn. This cannot be undone.

### When your microphone is recorded

When the recording includes your microphone, TalkBar can mark your own voice as **You**. If your microphone is not captured (for example with **System audio** only), no speaker is marked as you. Use **This is me** to set it yourself.

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
