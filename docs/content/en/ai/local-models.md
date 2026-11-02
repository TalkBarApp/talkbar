---
title: Local models
description: The AI, speech and helper models that run on your computer, how to pick one for your hardware, and how to download or remove them.
navigation:
  icon: i-heroicons-server-stack
---

TalkBar can do all of its work on your computer: transcription, speaker detection, translation, document search and, with Built-in AI, summaries and chat. Each of these needs a model on disk. **Settings → Private Local AI** is the one place to see, download and remove them.

## Where to manage local models

Open **Settings → Private Local AI**. It has the [Private AI Mode](/ai/private-ai-mode) switch at the top and three tabs:

| Tab | What it holds |
| --- | --- |
| **Local AI models** | Small language models for Built-in AI: summaries, chat, polish, titles |
| **Speech models** | Speech-to-text models for live transcription, enhancement and dictation |
| **System models** | Helper models TalkBar downloads automatically when a feature needs them |

No models come with the installer. Each one downloads once, when you or a feature needs it, then works offline. Downloads come from Hugging Face and are checked before TalkBar uses them.

::screenshot{src="/screenshots/ai/private-local-ai-llm.png" alt="Settings → Private Local AI with the Local AI models tab open, showing the Find my best model button, the Local AI acceleration dropdown and model rows with size, speed and accuracy dots, usage badges and download or delete buttons" caption="Settings → Private Local AI → Local AI models"}
::

## Local AI models

These models power **Built-in AI**. Each row shows the download size, **speed** and **accuracy** ratings, which features use it, and **Download**, **Cancel** or **Delete**.

| Model | Download | Memory | Good to know |
| --- | --- | --- | --- |
| **Qwen3 0.6B** | 380 MB | Small | Tiny and fast, text only: for polish, titles and timelines, not for summaries or chat. Starts on **Dictation polish** in the Private AI set. |
| **Qwen3.5 2B** | 1.2 GB | About 2 GB | Compact model for summaries on smaller computers |
| **Qwen3.5 4B** | 2.6 GB | About 3.5 GB | The default model for Standard and Private AI |
| **Qwen3.5 9B** | 5.3 GB | About 7 GB | Stronger quality than 4B when you have the graphics memory; slower |
| **Gemma 4 E4B** | 5 GB | About 6 GB | Highest-quality Gemma 4 |
| **Ministral 3 3B** | 2 GB | About 4 GB | Compact multilingual model with strong structured output |
| **LFM2.5 1.2B Thinking** | 697 MB | Small | Fast, text only: for polish, titles and timelines, not for summaries or chat |
| **LFM2.5 2.6B** | 1.6 GB | | Suited to computers with an 8 GB graphics card |

Text-only models can't be a default model. Assign them to the features that need only text: **Dictation polish**, **Title generation** and **Timeline**.

Larger models usually write better but need more memory and run slower. Speed depends a lot on your computer, so the best way to choose is to test.

Links at the top of the tab take you to **Manage models** (the Models tab in AI Providers) and **Assign to AI features** (the AI Features tab), where you choose which model each feature uses. See [Providers and models](/ai/providers-and-models#default-and-per-feature-models).

### Find my best model

**Find my best model** opens the **Model Advisor**. It runs a short test of each downloaded model on this computer, measures real speed and quality, and recommends the best default. Tick the models to test and click **Start test**. It takes about a minute per model, and **Cancel test** stops it.

- The advisor shows your computer, for example **Your system: 16 GB RAM · 8 cores**.
- Models you have not downloaded are dimmed and marked **Download to test**. Download them from the model list first.
- **Best for your system** names the recommended model: the highest-quality model that passed every check and runs fast on your computer or, failing that, the fastest one that passed the quality check. Click **Set as default** to make it your **Standard** default model.
- Each tested model shows its speed and check results. **Make default** on a model's row picks that model instead. If it is not the recommended one, TalkBar asks you to confirm.
- **Test again** returns to the list of models. If your hardware changed since the last test, the advisor asks you to run it again.

::screenshot{src="/screenshots/ai/model-advisor.png" alt="The Model Advisor dialog after a test run, showing the Your system line with RAM and cores, per-model speed and check results, and the Best for your system recommendation with a Set as default button" caption="Model Advisor"}
::

### Local AI acceleration

| Option | What it does |
| --- | --- |
| **Auto (GPU when available)** | Uses your graphics card when one is available. Usually faster. Default. |
| **CPU only** | Runs on the processor only. Choose it if the graphics card causes problems or you want to keep its memory free. |

If Ollama is running and holding graphics memory, the built-in model can slow down. While Private AI Mode is on, TalkBar can warn you and offer to unload Ollama's model.

## Speech models

The **Speech models** tab lists every speech-to-text model with its size and what it is **used for**: **Live transcription**, **Enhancement** or **Dictation**. Pick which model does which job in **Settings → Voice** (see [Recording and transcription](/voice/recording-and-transcription#speech-models)).

| Model | Download |
| --- | --- |
| Parakeet V3 (recommended for live transcription) | about 456 MB |
| Orukeet INT8 | about 641 MB |
| Whisper Small | about 465 MB |
| Whisper Turbo | about 1.5 GB |
| GigaAM v3 (Russian only) | about 215 MB |
| Canary 180M Flash | about 146 MB |
| Canary 1B v2 | about 692 MB |

::screenshot{src="/screenshots/ai/speech-models-tab.png" alt="Settings → Private Local AI with the Speech models tab open, listing speech models with sizes, a Live transcription badge on Parakeet V3 and an Enhancement badge on Whisper Turbo" caption="Speech models"}
::

## System models

System models are small helpers. TalkBar downloads them automatically when a feature needs them; here you can re-download them or delete them to free space.

| Model | Download | What it does |
| --- | --- | --- |
| **Silero VAD** | about 2 MB | Detects when someone is speaking before transcription |
| **WeSpeaker speaker embeddings** | about 25 MB | Recognizes who is speaking when transcripts are enhanced |
| **Sortformer diarizer** | about 470 MB | Separates speakers live during meetings |
| **Sortformer diarizer (large meetings)** | about 470 MB | Optional. Separates up to 8 speakers. |
| **Nemotron 3 speaker detection (up to 8 speakers)** | about 99 MB | Optional. Preferred by Automatic speaker detection for sessions with more than 4 speakers. |
| **Translation models** | about 400 to 430 MB per language pair | [Live translation](/voice/live-translation) |
| **BGE-M3 Q4_K_M** | about 417 MB | Semantic document search |

## Hardware and disk space

TalkBar works without a graphics card. When one is available, Built-in AI can use it to run faster (see [Local AI acceleration](#local-ai-acceleration)).

How much memory you need depends on the AI model you choose; the **Memory** column above is a guide. If you are unsure, start with **Qwen3.5 4B**, or a smaller model on a computer with little memory, and let **Find my best model** test what runs well.

Disk space adds up quickly:

- The **Local AI models** tab shows how much space your downloaded models use (**… on disk**).
- During first-run setup, TalkBar checks free space before it downloads the models you need for your first session.
- Models are stored in TalkBar's data folder, in its `voice/models` subfolder. Open the data folder from **Settings → Data & Backup**.

## Download and remove models

- **Download** fetches a model. You can keep working while it downloads, and **Cancel** stops it.
- **Retry** starts a failed download again.
- **Re-download** replaces a damaged or incomplete copy.
- **Delete** removes a model and tells you how much space it frees. If a feature still uses the model, TalkBar warns you that the feature will need the model downloaded again to work.

You can download any deleted model again at any time. TalkBar downloads **Silero VAD** and **WeSpeaker speaker embeddings** again by itself the next time a feature needs them.

::callout{icon="i-heroicons-light-bulb" color="primary"}
Local AI on a slow computer may need more time. **Settings → AI Providers → Advanced → AI time limits on this computer** gives built-in and local Ollama models longer before a request times out, and **Local AI request queue** controls how many local requests run at once.
::

## Related

- [How TalkBar uses AI](/ai/how-talkbar-uses-ai)
- [Private AI Mode](/ai/private-ai-mode)
- [Providers and models](/ai/providers-and-models)
- [Recording and transcription](/voice/recording-and-transcription)
- [Private Local AI settings](/settings/private-local-ai)
