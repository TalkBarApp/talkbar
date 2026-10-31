---
title: Live translation
description: Translate the transcript and timeline while you record, with a translation model that runs on this computer.
navigation:
  icon: i-heroicons-language
---

TalkBar can translate what people say while you record. Each speaker turn is translated as soon as it is finished, and translated again when you enhance the transcript. Translation runs on this computer with a small translation model, so no text is sent anywhere.

## Supported language pairs

Each language pair has its own translation model.

| From | To |
| --- | --- |
| English | Russian |
| Russian | English |
| English | Spanish |
| English | German |
| English | French |

The audio must be in the source language you pick. Text that is already in the target language is not translated again.

## Turn on translation

1. Open **Settings → Voice → Speakers**.
2. In the **Translation** section, turn on **Translate transcript**.
3. Pick the languages in **From** and **To**.
4. If the model for that pair is not installed, click **Download**. A pair's model is roughly 400 MB. Translation is unavailable until the model is downloaded; the row then shows **Translation model ready**.

::screenshot{src="/screenshots/voice/settings-translation.png" alt="Settings → Voice → Speakers tab with the Translation section switched on, showing From (English) and To (Russian) dropdowns, the Transcript panel and Timeline panel switches, and the Translation model ready status" caption="Translation settings"}
::

### What gets translated

| Setting | What it does | Default |
| --- | --- | --- |
| **Transcript panel** | Translates live transcript segments | On |
| **Timeline panel** | Translates live timeline bullets | On |

Turning a panel off stops the translation model from working on that panel. The change applies to a session that is already recording.

## What you see

When translation is on, the **Transcript** and **Timeline** panels let you choose how to show it. Open the panel's view menu and use the **Translation** section:

- **Original**: only what was said.
- **Both**: the original with its translation.
- The target language (for example **Russian**): only the translation.

The switch in the same section turns translation on or off for that panel.

::screenshot{src="/screenshots/voice/transcript-translation-view.png" alt="A live session's Transcript panel with its view menu open, showing the Translation section with Original / Both / Russian set to Both, and English lines with Russian translations under them in the panel" caption="Original, Both or translation only"}
::

### In the session bar

The floating session bar has its own quick settings: **Live translation** turns translation on or off, and **Translation view** picks **Original**, **Both** or **Translation** for the bar.

## After the session

When you run **Enhance transcript**, TalkBar translates the improved transcript again, so translations match the final text. See [Session details](/sessions/session-details).

## Manage translation models

Translation models are listed with the other helper models in **Settings → Private Local AI → System models**, where you can re-download or delete them to free space. See [Local models](/ai/local-models).

## Related

- [Recording and transcription](/voice/recording-and-transcription)
- [Speakers](/voice/speakers)
- [Recording a session](/sessions/recording)
- [Voice settings](/settings/voice)
