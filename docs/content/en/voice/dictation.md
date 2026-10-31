---
title: Dictation
description: Hold a shortcut and speak to type in any app or straight into a TalkBar note, with optional AI cleanup.
navigation:
  icon: i-heroicons-pencil-square
---

**Dictation** lets you speak instead of typing. Hold the dictation shortcut, talk, and TalkBar turns your words into text on this computer. In a TalkBar note the text goes straight into the note; anywhere else a small floating panel shows your words and then pastes them into the app you are using.

## Dictate anywhere

1. Click into the app and the spot where you want the text.
2. Hold the dictation shortcut (default: hold `Ctrl+Shift`) and speak. A short tap does nothing.
3. The dictation panel opens and shows your words as you speak.
4. Hold the shortcut again to stop. TalkBar inserts the text into the active app.

While the panel is open you can also:

- **Insert while recording** (default `Ctrl+Shift+Enter`): inserts what you have so far and keeps listening.
- **Polish** the text with AI before inserting it (see [Polish with AI](#polish-with-ai)).
- **Copy** the text instead of inserting it.
- Erase text with `Esc` or the eraser button. With the cursor over the panel, `Backspace` erases a word and `Ctrl+Backspace` a sentence.
- Pause and resume listening with the microphone button.
- Open **Recent inserts** from the panel logo to copy or insert an earlier dictation again.
- Open **Quick settings** (gear icon) to change common options without leaving the panel.

Closing the panel discards text you have not inserted.

::screenshot{src="/screenshots/voice/dictation-overlay.png" alt="The floating dictation panel over another app, showing dictated text, the microphone, Copy, Polish, erase and Insert buttons, and the gear and history icons in the header" caption="The dictation panel"}
::

## Dictate in TalkBar

- **Notes**: hold the shortcut while a note is open, or click **Dictate** in the note, and the text goes straight into the note. A small bar shows that you are **Dictating** and lets you pause, resume or stop.
- **Chats**: click the microphone button (**Dictate message**) in the chat box to speak your message.

## Polish with AI

**Polish with AI** cleans up dictated text before it is inserted: punctuation, filler words and spoken numbers, without changing what you meant. It is off by default.

Turn it on in **Settings → Voice → Dictation → Polish with AI**. Then:

- **Polish shortcut** (default `Ctrl+Shift+L`) polishes and inserts in one step. The Polish button on the panel does the same.
- **Auto-polish while dictating** cleans finished sentences in the background while you keep talking, after 2, 3, 4, 5 or 8 sentences (Off by default).
- **Polish instructions prompt** tells the AI how to clean the text. Click **Edit** to change it and **Reset to default** to go back.

Polish uses the AI model assigned to the **Dictation & voice commands** feature group. With Built-in AI, the default is the small **Qwen3 0.6B** model, which runs on this computer. If that feature group uses a cloud provider, your dictated text is sent to that provider for polishing. See [How TalkBar uses AI](/ai/how-talkbar-uses-ai).

When [Private AI Mode](/ai/private-ai-mode) is on, the panel shows a shield next to **Dictation**, and polish runs only on local models.

If polishing fails, your original text is kept, so nothing you said is lost.

## Dictation settings

All settings are in **Settings → Voice → Dictation**. The **Dictation** switch at the top turns the feature on or off.

::screenshot{src="/screenshots/voice/settings-dictation.png" alt="Settings → Voice → Dictation tab showing the Dictation switch, Dictation shortcut with the Hold for field, Insert while recording, and the Polish with AI section" caption="Settings → Voice → Dictation"}
::

### Shortcuts

| Setting | What it does | Default |
| --- | --- | --- |
| **Dictation shortcut** | Hold to start or stop. Can be modifier keys only. **Hold for** sets how long you must hold (200–3000 ms). | Hold `Ctrl+Shift` for 500 ms |
| **Insert while recording** | Inserts what you have so far and keeps recording | `Ctrl+Shift+Enter` |
| **Polish shortcut** | Polishes and inserts; works only while **Polish with AI** is on | `Ctrl+Shift+L` |

Each shortcut has its own switch, so you can turn one off without turning off dictation.

### Overlay

| Setting | What it does | Default |
| --- | --- | --- |
| **Panel auto-expand** | Starts at 2 lines, then grows up to 4, 6, 8 or 10 lines | 6 lines |
| **Remember overlay position** | Reopens the panel where you last dragged it | On |
| **Default position** | Where the panel opens when no position is remembered | Bottom center |
| **Edge offset** | How far the panel sits from the screen edges | 48 px |

### Speech

| Setting | What it does | Default |
| --- | --- | --- |
| **Microphone** | Which microphone dictation uses | Same as voice recording |
| **Dictation model** | The speech model for dictation | Same as voice transcription |
| **Dictation language** | Locks dictation to one language. Locked when the model detects the language itself. | Same as voice |

Speech models are described in [Recording and transcription](/voice/recording-and-transcription#speech-models).

### When dictation stops

| Setting | What it does | Default |
| --- | --- | --- |
| **Output** | **Paste into the active app**, **Copy to clipboard only**, or **Paste and keep in clipboard** | Paste into the active app |
| **Close after insert** | Inserting also stops recording and hides the panel | Off |
| **Erase button** | What `Esc` and the eraser remove: **Last word, then all**, **Clear all text at once** or **Clear all (ask to confirm)** | Last word, then all |
| **Dictation history** | How many recent inserts to keep (3, 5, 10 or 15), or Off | Keep last 5 inserts |

## If dictation does not start

- If no microphone is available, the panel says so and offers **Close**. Connect a microphone and try again.
- The [Mute microphone shortcut](/voice/recording-and-transcription#mute-shortcut) also silences dictation. Press it again to unmute.
- If the shortcut clashes with another app, pick different keys in **Dictation shortcut**.

## Related

- [Recording and transcription](/voice/recording-and-transcription)
- [Notes](/chats-and-notes/notes)
- [How TalkBar uses AI](/ai/how-talkbar-uses-ai)
- [Voice settings](/settings/voice)
