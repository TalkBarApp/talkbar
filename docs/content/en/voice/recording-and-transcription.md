---
title: Recording and transcription
description: Choose what TalkBar records, pick the speech model that writes your transcript on this computer, and decide how long audio is kept.
navigation:
  icon: i-heroicons-microphone
---

Keyboard shortcuts shown below are Windows defaults. On macOS, check the shortcut shown in TalkBar or its settings; configurable shortcuts can be changed there.

TalkBar records your microphone, your computer's audio, or both, and turns speech into a transcript on this computer. No audio is sent to an AI provider. This page explains the recording sources, the speech models, the transcription languages and what happens to the audio afterwards.

## Recording sources

TalkBar can record three kinds of audio. You set the default in **Settings → Voice → Recording → Audio source**, and you can change it for one session in the **Audio** row of **New session**.

| Source | What it records | Good for |
| --- | --- | --- |
| **Microphone** | Your own voice | Voice notes, in-person conversations |
| **System audio** | What your computer plays, such as the other people on a call | Webinars, videos, calls where you mostly listen |
| **Microphone + system audio** (**Mic + System** in New session) | Both at once | Online meetings and calls |

No bot joins the call. TalkBar listens on your computer, so it works with Zoom, Microsoft Teams, Google Meet, other meeting apps and browser calls.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Recording-consent rules vary by region. To be reminded each time a session starts that informing participants is your responsibility, turn on **Recording notice** in **Settings → General**.
::

If no microphone is connected, the microphone options are unavailable and TalkBar says **Connect a microphone to use Microphone or Microphone + system audio.** Use the refresh button next to **Audio source** after you plug one in.

::screenshot{src="/screenshots/voice/settings-voice-recording.png" alt="Settings → Voice with the Recording tab open, showing the Audio source dropdown, Microphone dropdown and the Test audio input panel" caption="Settings → Voice → Recording"}
::

### Microphone and test recording

- **Microphone**: the default microphone for sessions and dictation. **System default** follows the system default device.
- **Test audio input**: records up to 30 seconds from the selected source and plays it back, so you can check levels before a real session.
- **Show all audio devices**: lists every microphone and system-audio device TalkBar can see. Useful when the device you expect is missing.

### Mute shortcut

**Mute microphone shortcut** (default `Ctrl+Shift+M`) mutes all microphone input to TalkBar. Dictation and recordings hear silence until you press it again. Other apps and the system microphone are not affected. You can change the keys or turn the shortcut off.

### Audio processing

Under **Processing**:

| Setting | What it does | Default |
| --- | --- | --- |
| **Enhanced audio processing** | Noise suppression, gain control and echo cancellation for the microphone | On |
| **Auto level balance** | Raises quiet sources and lowers loud ones in **Microphone + system audio** mode | On |

### When a session goes quiet

Under **Session end**, TalkBar can pause and stop a session on its own:

| Setting | What it does | Default |
| --- | --- | --- |
| **Auto-pause** | Pauses the live session after silence and resumes when speech returns (10, 15 or 30 seconds, or Off) | 10 seconds |
| **Auto-stop** | Completes an auto-paused session after TalkBar has been unattended (2, 3, 5 or 10 minutes, or Off). Needs Auto-pause. | 3 minutes |
| **Notify before a session auto-ends** | Shows a desktop notification before an unattended session auto-stops | On |

## How transcription works

Speech-to-text always runs on this computer with a **speech model**. TalkBar uses two of them:

- **Live transcription model** writes the transcript while you record. It should be fast so words appear as you speak.
- **After-recording enhancement model** is used by **Enhance transcript** after a session ends. It re-transcribes the saved audio and runs speaker detection again, so it can be slower and more accurate. See [Session details](/sessions/session-details).

Choose both in **Settings → Voice → Transcription**. When you select a model that is not downloaded yet, TalkBar offers **Download** next to it; the status changes to **Ready** when it is installed. Speech models download from the internet once, then work offline.

::screenshot{src="/screenshots/voice/settings-voice-transcription.png" alt="Settings → Voice with the Transcription tab open, showing Live transcription model, After-recording enhancement model, Transcription language and Speaker detection model rows, with the Ready status under the live model" caption="Settings → Voice → Transcription"}
::

::callout{icon="i-heroicons-light-bulb" color="primary"}
**Parakeet V3** is the recommended live model. **Whisper Turbo** is the default enhancement model.
::

## Speech models

Each model shows its download size in the dropdown. You can see and delete downloaded speech models in **Settings → Private Local AI → Speech models** (see [Local models](/ai/local-models)).

| Model | Download | Languages | Notes |
| --- | --- | --- | --- |
| **Parakeet V3** | about 456 MB | European languages, including Russian and Ukrainian; detects the language itself | Recommended for live transcription: fast and accurate. Default live model. |
| **Orukeet INT8** | about 641 MB | Same as Parakeet V3; detects the language itself | An updated Parakeet V3. Fast and accurate; an alternative to Parakeet V3. |
| **Whisper Small** | about 465 MB | Many languages, with automatic detection | Light, lower accuracy |
| **Whisper Turbo** | about 1.5 GB | Many languages, with automatic detection | Best quality, but slow for live use. Default enhancement model. |
| **GigaAM v3** | about 215 MB | Russian only | |
| **Canary 180M Flash** | about 146 MB | English, German, Spanish, French | Smallest download |
| **Canary 1B v2** | about 692 MB | European languages, including Russian and Ukrainian | |

If you pick a model that is slow for live use, TalkBar warns: **This model is slow for live transcription; Parakeet V3 is recommended.**

## Transcription language

**Transcription language** applies to live and enhanced transcripts. Leave it on **Auto-detect**, or pick the spoken language if words come out wrong.

The list depends on the models you chose:

- **Whisper** models offer Auto-detect plus English, Russian, Spanish, German, French, Italian, Portuguese, Dutch, Polish, Ukrainian, Arabic, Hindi, Japanese, Korean, Chinese and Turkish.
- **Canary 1B v2** offers English, Russian, Ukrainian, Spanish, German, French, Italian, Portuguese, Dutch and Polish.
- **Canary 180M Flash** offers English, German, Spanish and French.
- **Parakeet V3**, **Orukeet INT8** and **GigaAM v3** detect the language themselves (or support only one), so the setting is locked.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Canary models do not detect the language reliably. If you use a Canary model for non-English speech, pick the spoken language instead of Auto-detect.
::

## Saved audio

TalkBar keeps the session audio on this computer so you can play it back and run **Enhance transcript** later. Settings are under **Settings → Voice → Recording → Saved recording**.

| Setting | What it does | Default |
| --- | --- | --- |
| **Quality** | Bitrate of the stored audio: Compact (24 kbps), Standard (32 kbps), High (48 kbps), Very high (64 kbps) or Maximum (96 kbps). Higher means larger files. Standard is plenty for speech. | Standard |
| **Delete audio when a session ends** | Removes the recording after you stop. The transcript, timeline and summaries stay, but playback and **Enhance transcript** are no longer available. | Off |

Moving a session to the Trash and deleting it permanently also removes its audio. See [Privacy and your data](/data/privacy-and-your-data).

## Related

- [Speakers](/voice/speakers)
- [Live translation](/voice/live-translation)
- [Dictation](/voice/dictation)
- [Recording a session](/sessions/recording)
- [Importing recordings](/sessions/importing-recordings)
- [Voice settings](/settings/voice)
- [Local models](/ai/local-models)
