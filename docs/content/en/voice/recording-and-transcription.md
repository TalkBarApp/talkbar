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

In **Microphone + system audio** sessions, the **Speaker echo filter** drops microphone lines that are really sound from your speakers. See [its rules](/settings/voice#processing).

### Mac echo cancellation

On a Mac, **Mac echo cancellation** is an optional switch for recording. When it's on, TalkBar uses macOS's own voice processing for the Mac's built-in microphone instead of TalkBar's own echo cancellation. That's the same echo cancellation FaceTime uses, tuned by Apple for each Mac model. It can help when sound from the Mac's built-in speakers (a call or a video) is picked up by the built-in microphone and shows up in the transcript as your words.

TalkBar's own echo cancellation stays the default everywhere and keeps working as before, including for USB microphones, headsets and external speakers. The switch is an extra choice only for a Mac's built-in microphone with its built-in speakers. If echo from the built-in speakers shows up in the transcript as your words, this is an option to try.

**When the switch appears.** All of the following must be true:

- A Mac with macOS 14 (Sonoma) or later.
- A recording is running in **Microphone + system audio** mode.
- **Enhanced audio processing** is on.
- The microphone in use is the Mac's built-in microphone, and the sound output is the Mac's built-in speakers. In practice this means a MacBook. A Mac mini, iMac or Mac Studio without a built-in microphone won't show it, and neither will a MacBook using headphones (wired or Bluetooth), an external microphone, external speakers, a display's speakers or AirPlay.

The switch never appears in Microphone-only or System-audio-only recordings, never in dictation, and never on Windows.

**How to turn it on**

1. Start a recording in **Microphone + system audio** mode on a MacBook, using its own microphone and speakers.
2. On the recording screen, open the **Audio capture** panel (the audio status badge in the session's header).
3. Expand **More audio options**.
4. Turn on **Mac echo cancellation** (the row is right under **Enhanced audio processing**).

It's off by default. Once turned on, TalkBar remembers the choice and uses it again in later recordings whenever the conditions above are met. To stop using it, turn the switch off.

The row reads: **Uses macOS's own processing for this Mac's microphone and speakers. Other apps may play a little quieter while recording.**

**While recording**

- Turning the switch on or off during a recording switches the microphone right away. Expect a gap of under a second in the transcript.
- If you plug in headphones or switch the output, TalkBar goes back to its own echo cancellation within a few seconds and the switch disappears. When you return to the built-in speakers, Apple's processing comes back. The saved choice stays on.
- If macOS's processing can't start or stops working, TalkBar continues with its own echo cancellation and the recording keeps going. The row then shows: **Not in use right now: TalkBar's own echo cancellation is running.**
- If you try to turn it on after the route has changed (for example, headphones were just plugged in), TalkBar shows: **Mac echo cancellation needs this Mac's built-in microphone and speakers.**
- TalkBar's [Speaker echo filter](/settings/voice#processing) still runs: it drops microphone lines that repeat what the speakers played.

**Trade-offs**

- Other apps may play a little quieter while recording with it on. macOS lowers other audio; TalkBar asks for the minimum.
- The recorded microphone audio is macOS's processed voice, not the raw microphone.
- While it's on, TalkBar may appear in macOS's Mic Mode menu (Control Center). Choosing a mode there, such as Voice Isolation, changes TalkBar's microphone sound too.

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
