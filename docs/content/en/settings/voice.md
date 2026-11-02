---
title: Voice
description: Every control in Settings → Voice — recording, transcription, dictation, speaker labels and translation — with its default value.
navigation:
  icon: i-heroicons-microphone
---

Keyboard shortcuts shown below are Windows defaults. On macOS, check the shortcut shown in TalkBar or its settings; configurable shortcuts can be changed there.

**Settings → Voice** controls how TalkBar records audio, turns it into a transcript, runs dictation, and labels speakers. It has four inner tabs: **Recording**, **Transcription**, **Dictation** and **Speakers**. Speech models are downloaded and removed under [Settings → Private Local AI](/settings/private-local-ai); the **Manage Model** link next to a model opens that page.

::screenshot{src="/screenshots/settings/voice-recording-tab.png" alt="Settings → Voice with the Recording inner tab selected, showing the Recording section with Audio source, Microphone, the Test audio input panel and Mute microphone shortcut" caption="The Recording tab"}
::

## Recording

For how recording works end to end, see [Recording and transcription](/voice/recording-and-transcription).

### Recording

| Setting | What it does | Default |
| --- | --- | --- |
| **Audio source** | What TalkBar records: **Microphone**, **System audio** (what plays through your speakers or headphones), or **Microphone + system audio** (**Mic + System** in New session and the session bar). Options only appear when the device is available. The refresh button next to it checks for devices again. | **Microphone** |
| **Microphone** | The default microphone for sessions, dictation (when dictation follows it) and the audio test. Disabled when **Audio source** is **System audio**. | **System default** |
| **Test audio input** | **Start test** records a short sample from the current source so you can see the level and play it back. **Stop test** ends it. | — |
| **Mute microphone shortcut** | A global shortcut that mutes all microphone input to TalkBar. Dictation and recordings hear silence until you press it again. Other apps and the system microphone are not affected. The switch turns the shortcut on or off. | `Ctrl+Shift+M`, on |
| **Show all audio devices** | Lists every microphone and system-audio device TalkBar can see. Useful when a device is missing. | Off |

### Processing

| Setting | What it does | Default |
| --- | --- | --- |
| **Enhanced audio processing** | Applies noise suppression, gain control and echo cancellation to microphone audio. | On |
| **Auto level balance** | In **Microphone + system audio** mode, raises quiet sources and lowers loud ones automatically. | On |

### Session end

| Setting | What it does | Default |
| --- | --- | --- |
| **Notify before a session auto-ends** | Shows a desktop notification when an unattended session is about to stop on its own. | On |
| **Auto-pause** | Pauses a live session after sustained silence and resumes when someone speaks. Options: **Off**, **10 seconds**, **15 seconds**, **30 seconds**. | **10 seconds** |
| **Auto-stop** | Completes an auto-paused session after TalkBar has been unattended. Options: **Off**, **2 minutes**, **3 minutes**, **5 minutes**, **10 minutes**. Available only while **Auto-pause** is on. | **3 minutes** |

### Saved recording

| Setting | What it does | Default |
| --- | --- | --- |
| **Quality** | Bitrate of the audio TalkBar keeps on this computer. Higher means larger files. Options: **Compact · 24 kbps**, **Standard · 32 kbps (default)**, **High · 48 kbps**, **Very high · 64 kbps**, **Maximum · 96 kbps**. | **Standard · 32 kbps (default)** |
| **Delete audio when a session ends** | Removes the recording after you stop. The transcript, timeline and summaries stay, but playback and **Enhance transcript** are no longer available for that session. | Off |

## Transcription

Speech-to-text runs on this computer. A model downloads when you select it; a status line under each model shows whether it is ready and offers a download button if it is not.

::screenshot{src="/screenshots/settings/voice-transcription-tab.png" alt="Settings → Voice with the Transcription inner tab selected, showing Live transcription model, After-recording enhancement model, Transcription language and Speaker detection model with their model status lines" caption="The Transcription tab"}
::

### Transcription

| Setting | What it does | Default |
| --- | --- | --- |
| **Live transcription model** | The model that writes the live transcript while you record. A fast model keeps words appearing as you speak; TalkBar warns you if you pick a slow one. | **Parakeet V3** |
| **After-recording enhancement model** | The model used by **Enhance transcript** after a recording ends. Slower, more accurate models are fine here. | **Whisper Turbo** |
| **Transcription language** | The spoken language for live and enhanced transcripts. Leave it on auto-detect, or pick a language if words come out wrong. The list only offers languages your selected models support, and it is locked when both models detect the language on their own. | **Auto-detect** |
| **Speaker detection model** | The model that separates speakers in new sessions, imported audio and Enhance. Options: **Automatic (Sortformer up to 4 speakers, Nemotron 3 for more)**, **Sortformer (4 or 8 speakers)**, **Nemotron 3 (up to 8 speakers)**. For more than 4 speakers, **Automatic** uses Nemotron 3 when it is installed, otherwise the 8-speaker Sortformer model. | **Automatic (Sortformer up to 4 speakers, Nemotron 3 for more)** |

The model lists include Parakeet V3, Orukeet INT8, Whisper Small, Whisper Turbo, GigaAM v3, Canary 180M Flash and Canary 1B v2. Each entry shows a short hint and its download size. See [Local models](/ai/local-models) for more about them.

### Timelines

| Setting | What it does | Default |
| --- | --- | --- |
| **Timeline frequency** | How often the live timeline (short bullets about what was said) refreshes during a session. Options: 10, 20 or 30 seconds, or **1 min**. With a Whisper model as the **Live transcription model**, it refreshes every 30 seconds at the fastest. | 10 seconds |

### Summaries

| Setting | What it does | Default |
| --- | --- | --- |
| **Default summary length** | The summary length new sessions use: **Short**, **Standard** or **Detailed**. You can still change it on a single session. | **Standard** |
| **Summary effort** | How much work the AI puts into splitting and reading the transcript: **Fast**, **Balanced** or **Thorough**. Thorough uses more AI requests. This does not change model token limits. | **Balanced** |
| **Run summary parts in parallel** | Lets cloud and CLI models work on up to 3 parts of a long summary at once, so it finishes faster. Built-in models always work one part at a time. | On |

## Dictation

Dictation lets you hold a shortcut and speak into a note, or into a floating panel in any other app. See [Dictation](/voice/dictation) for how to use it.

::screenshot{src="/screenshots/settings/voice-dictation-tab.png" alt="Settings → Voice with the Dictation inner tab selected, showing the Dictation section with its on/off switch, Dictation shortcut with the Hold for field, Insert while recording, and the Polish with AI section below" caption="The Dictation tab"}
::

### Dictation

The switch in the section header turns dictation on or off. When it is off, the other dictation controls are disabled.

| Setting | What it does | Default |
| --- | --- | --- |
| **Dictation** (switch) | Turns dictation on or off. | On |
| **Dictation shortcut** | Hold this shortcut to start or stop dictation; a short tap does nothing. The switch turns the shortcut on or off, and **Hold for** sets how long you must hold it (200–3000 ms). | `Ctrl+Shift`, on, hold for 500 ms |
| **Insert while recording** | A shortcut that inserts what you have dictated so far and keeps recording. The switch turns it on or off. | `Ctrl+Shift+Enter`, on |

If TalkBar cannot detect the shortcut normally, a notice appears under it explaining why.

### Polish with AI

The switch in the section header turns polishing on or off. When it is on, AI cleans up the transcript before it is inserted.

| Setting | What it does | Default |
| --- | --- | --- |
| **Polish with AI** (switch) | Cleans up dictated text with AI before inserting it. | Off |
| **Polish shortcut** | Polishes and inserts in one step. Works only while **Polish with AI** is on. The switch turns the shortcut on or off. | `Ctrl+Shift+L`, on |
| **Auto-polish while dictating** | Cleans finished sentences in the background while you keep talking. Options: **Off**, or every 2, 3, 4, 5 or 8 sentences. | **Off** |
| **Polish instructions prompt** | The instructions the AI follows when polishing. **Edit** to change them, **Save** to keep your version, **Revert** to drop unsaved edits, **Reset to default** to go back to the built-in prompt. | Built-in prompt |

### Overlay

| Setting | What it does | Default |
| --- | --- | --- |
| **Panel auto-expand** | The dictation panel starts at 2 lines and grows up to this limit: 2, 4, 6, 8 or 10 lines. | **Up to 6 lines of text** |
| **Remember overlay position** | Reopens the panel where you last dragged it. | On |
| **Default position** | Where the panel opens when no position is remembered: **Bottom center (default)**, **Bottom left**, **Bottom right**, **Top center**, **Top left**, **Top right**. | **Bottom center (default)** |
| **Edge offset** | How far the panel sits from the screen edges (0–200 px). | 48 px |

### Speech

| Setting | What it does | Default |
| --- | --- | --- |
| **Microphone** | The microphone dictation uses. | **Same as voice recording** |
| **Dictation model** | The speech model for dictation. Follows the **Live transcription model** unless you pick another. | **Same as voice transcription** |
| **Dictation language** | Locks dictation to one language from the next dictation. Locked to auto-detect when the dictation model only detects the language itself. | **Same as voice (…)**, showing your **Transcription language** |

### When dictation stops

| Setting | What it does | Default |
| --- | --- | --- |
| **Output** | Where text goes when you insert or stop: **Paste into the active app**, **Copy to clipboard only**, or **Paste and keep in clipboard**. | **Paste into the active app** |
| **Close after insert** | Inserting also stops recording and hides the panel. | Off |
| **Erase button** | What `Esc` and the eraser remove on each press: **Last word, then all**, **Clear all text at once**, or **Clear all (ask to confirm)**. | **Last word, then all** |
| **Dictation history** | How many recent inserts the panel keeps (open them from the dictation panel logo): **Off — don’t keep history**, or the last 3, 5, 10 or 15 inserts. | **Keep last 5 inserts** |

## Speakers

### Translation

The switch in the section header turns live translation on or off. When it is on, TalkBar translates each speaker turn during recording and again when the transcript is enhanced. The audio must be in the selected source language. See [Live translation](/voice/live-translation).

| Setting | What it does | Default |
| --- | --- | --- |
| **Translation** (switch) | Turns transcript translation on or off. | Off |
| **From** | The spoken language to translate from. | English |
| **To** | The language to translate into. Only pairs TalkBar has a model for are offered. | Russian |
| **Transcript panel** | Translates live transcript segments. | On |
| **Timeline panel** | Translates live timeline bullets. | On |

Each language pair needs its own translation model. If it is not installed, a **Download** button with the model size appears, and translation stays unavailable until the download finishes.

### Speaker labels

Speaker labels are roles you can give to speakers, such as Client or Interviewer. Labels higher in the list get more attention in timelines and summaries. See [Speakers](/voice/speakers).

- **Add label** creates a new label.
- Drag a label to change its position.
- Click a label or its pencil button to rename it; the trash button removes it.
- Built-in labels (**Client**, **Manager**, **Interviewer**, **Guest**) show a lock and cannot be renamed or removed.

New workspaces also start with **Decision Maker**, **Expert**, **Support** and **Observer**, which you can edit or remove.

## Related

- [Recording and transcription](/voice/recording-and-transcription)
- [Speakers](/voice/speakers)
- [Live translation](/voice/live-translation)
- [Dictation](/voice/dictation)
- [Private Local AI settings](/settings/private-local-ai)
- [Local models](/ai/local-models)
