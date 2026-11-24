---
title: Recording and transcription
description: Choose what TalkBar records, pick the speech model that writes your transcript on this computer, and decide how long audio is kept.
navigation:
  icon: i-heroicons-microphone
---

::platform-tabs
#windows
The shortcuts below are the defaults. Configurable shortcuts can be changed in Settings.
#macos
The shortcuts below are the Windows defaults. On a Mac the mute shortcut is `Control+Shift+M`, and recording needs the **Microphone** permission for your voice and, for system audio, **System Audio Recording** on macOS 14.4 and later or **Screen & System Audio Recording** on macOS 13.4 to 14.3 (see [Permissions on a Mac](/getting-started/first-run-setup#permissions-on-a-mac)). Settings shows each shortcut with Mac keys (⌃ ⌥ ⇧ ⌘), and you can change it there.
::

TalkBar records your microphone, your computer's audio, or both, and turns speech into a transcript on this computer. No audio is sent to an AI provider. This page explains the recording sources, the speech models, the transcription languages and what happens to the audio afterwards.

## Recording sources

TalkBar can record three kinds of audio. You set the default in **Settings → Voice → Recording → Audio source**, and you can change it for one session in the **Audio** row of **New session**.

| Source | What it records | Good for |
| --- | --- | --- |
| **Microphone** | Your own voice | Voice notes, in-person conversations |
| **System audio** | What your computer plays, such as the other people on a call | Webinars, videos, calls where you mostly listen |
| **Microphone + system audio** (**Mic + System** in New session and the session bar) | Both at once | Online meetings and calls |

No bot joins the call. TalkBar listens on your computer, so it works with Zoom, Microsoft Teams, Google Meet, other meeting apps and browser calls.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Recording-consent rules vary by region. To be reminded each time a session starts that informing participants is your responsibility, turn on **Recording notice** in **Settings → General → Session defaults**.
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
| **Mixed transcription** | Transcribes the microphone and system audio as one stream, see [below](#mixed-transcription) | Off |
| **Save raw echo recordings** | In **Microphone + system audio** sessions, saves the microphone and system audio before echo cancellation, to help tune echo cancellation | Off |

In **Microphone + system audio** sessions, the **Speaker echo filter** drops microphone lines that are really sound from your speakers. See [its rules](/settings/voice#processing).

### Mixed transcription

With **Microphone + system audio**, TalkBar normally transcribes your microphone and the computer's audio separately: microphone lines are **You**, system audio lines are the other people. When your speakers are loud or close to the microphone, for example a laptop's built-in speakers, some of the other side can still reach your microphone and show up as extra lines from you.

**Mixed transcription** instead combines your microphone, after echo cancellation, with the system audio and transcribes them as one stream. Speaker detection then runs on the combined stream, your voice included, so the other side's words aren't written a second time as your lines.

- Turn it on in **Settings → Voice → Processing**, or during a recording under **More audio options** in **Audio capture**. A change applies at once and is kept for your next recordings.
- It works on Windows and Mac. Mixing needs **Microphone + system audio**, **Enhanced audio processing** and speaker detection (a speaker mode other than **Just you**, with a speaker detection model installed). Until a recording has all of them, the switch under **More audio options** is unavailable and says what is missing; the choice saved in Settings applies once they are there.
- Your voice isn't marked **You** automatically, because TalkBar can no longer tell which voice came from your microphone. Mark yourself once with **This is me** in the speaker menu, see [Speakers](/voice/speakers#when-your-microphone-is-recorded).
- If you turn the microphone or system audio off during the recording, TalkBar keeps transcribing the other source the same way, so speakers keep their names. Turning **Enhanced audio processing** off goes back to separate streams until you turn it on again.
- The saved recording is the same either way; only the transcript changes. The **Speaker echo filter** doesn't apply to mixed lines.

Try it when your speakers' sound keeps appearing as your own lines. With headphones, separate streams usually work best.

### Mic Mode

::platform-tabs
#windows
Windows has no Mic Mode. **Enhanced audio processing** handles noise and echo, and any effects your microphone's own software applies reach TalkBar too.
#macos
On recent versions of macOS, the microphone item in the menu bar can offer **Mic Mode** for TalkBar while it records. It isn't on every macOS version, so if the item has no **Mic Mode** while TalkBar records, your Mac doesn't offer it for TalkBar.

1. Start a recording that uses the microphone.
2. Click the microphone item in the menu bar (on macOS 13, **Control Center**), then **Mic Mode**.
3. Choose a mode:
   - **Standard**: the microphone as it is.
   - **Voice Isolation**: macOS filters out background sounds so your voice stands out. Good for calls from a noisy room.
   - **Wide Spectrum**: keeps the sounds around you. Good when several people talk around the Mac.

macOS applies the mode before TalkBar hears the microphone, so it changes both the transcript and the saved recording, and TalkBar can't see or change it. **Voice Isolation** can quiet other people in the room, so use **Standard** or **Wide Spectrum** to record an in-person conversation with the Mac's microphone. TalkBar's **Enhanced audio processing** still runs on top of any mode.
::

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
| **Parakeet V3** | about 456 MB | [25 languages](/voice/languages#languages-by-speech-model); detects the language itself | Recommended for live transcription: fast and accurate. Default live model. |
| **Orukeet INT8** | about 641 MB | Same as Parakeet V3; detects the language itself | An updated Parakeet V3. Fast and accurate; an alternative to Parakeet V3. |
| **Whisper Small** | about 465 MB | [99 languages](/voice/languages#all-whisper-languages), with automatic detection | Light, lower accuracy |
| **Whisper Turbo** | about 1.5 GB | [100 languages](/voice/languages#all-whisper-languages), with automatic detection | Best quality, but slow for live use. Default enhancement model. |
| **GigaAM v3** | about 215 MB | Russian only | |
| **Canary 180M Flash** | about 146 MB | English, German, Spanish, French | Smallest download |
| **Canary 1B v2** | about 692 MB | [25 languages](/voice/languages#languages-by-speech-model) | |

If you pick a model that is slow for live use, TalkBar warns: **This model is slow for live transcription; Parakeet V3 is recommended.**

## Transcription language

**Transcription language** applies to live and enhanced transcripts. Leave it on **Auto-detect**, or pick the spoken language if words come out wrong.

The list depends on the models you chose:

- **Whisper** models offer Auto-detect plus English, Russian, Spanish, German, French, Italian, Portuguese, Dutch, Polish, Ukrainian, Arabic, Hindi, Japanese, Korean, Chinese and Turkish.
- **Canary 1B v2** offers English, Russian, Ukrainian, Spanish, German, French, Italian, Portuguese, Dutch and Polish.
- **Canary 180M Flash** offers English, German, Spanish and French.
- **Parakeet V3**, **Orukeet INT8** and **GigaAM v3** detect the language themselves (or support only one), so the setting is locked. You can still hold Parakeet V3 and Orukeet to one language for sessions and dictation; see [Hold Parakeet V3 and Orukeet to one language](/voice/languages#hold-parakeet-v3-and-orukeet-to-one-language).

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Canary models do not detect the language reliably. If you use a Canary model for non-English speech, pick the spoken language instead of Auto-detect.
::

### Which model for your language

The interface language doesn't decide what TalkBar can transcribe. Turkish, Japanese, Korean, Chinese, Arabic and Hindi need a Whisper model, for example. See [Supported languages](/voice/languages) for the full table of languages and models, and which model to choose.

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
