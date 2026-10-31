---
title: Private Local AI
description: Every control under Settings → Private Local AI, where you turn on Private AI Mode and download or delete the AI models that run on your computer.
navigation:
  icon: i-heroicons-shield-check
---

**Settings → Private Local AI** is where you manage every AI model that runs on your computer and switch Private AI Mode on or off. It has three inner tabs: **Local AI models**, **Speech models** and **System models**. For what each model is good at, see [Local models](/ai/local-models); for how the mode works, see [Private AI Mode](/ai/private-ai-mode).

::screenshot{src="/screenshots/settings/private-local-ai-models.png" alt="Settings → Private Local AI with the Local AI models inner tab selected, showing the Private AI Mode switch at the top, the Local AI acceleration dropdown, and the list of built-in models with Download buttons and speed and accuracy ratings" caption="Local AI models"}
::

## Private AI Mode

The top of the page shows the **Private AI Mode** switch.

| Setting | What it does | Default |
| --- | --- | --- |
| **Private AI Mode** | Keeps all AI on this computer and turns off any external providers you connected. Features use the Private AI model assignments from [Settings → AI Providers](/settings/ai-providers#ai-features). You can't change it while a session is in progress. | Off |

The switch appears only after you add a cloud or command-line provider. Until then you see **Private AI Mode is not available**, because TalkBar already runs only on the built-in models and nothing needs restricting.

When you turn the mode on, TalkBar offers to download any local model it still needs. If a feature is still assigned to a model that isn't local, the switch shows **Not fully local** and a message tells you how many features to reassign.

If Ollama is holding GPU memory while the built-in model needs it, a warning **Ollama is using the GPU** appears with an **Unload Ollama** button.

## Local AI models

The **Local AI models** tab (search entry: **Local AI models**) lists the built-in language models that run entirely on this device. These power summaries, chat, dictation polish, titles and knowledge extraction when they're assigned to those features.

| Setting | What it does | Default |
| --- | --- | --- |
| **Manage models** | Opens the **Models** tab of [Settings → AI Providers](/settings/ai-providers#models). | — |
| **Assign to AI features** | Opens the **AI Features** tab of Settings → AI Providers, where you pick which model each feature uses. | — |
| **Find my best model** | Opens **Model Advisor**. It tests your downloaded models on this computer (about a minute per model) and recommends the fastest one that passes a quality check. **Set as default** makes it your default model. | — |
| **Local AI acceleration** | **Auto (GPU when available)** uses your graphics card when it can. **CPU only** avoids using GPU memory. | **Auto (GPU when available)** |

### Model list

Each model row shows its size, speed and accuracy ratings, and badges for the features that use it. Model Advisor results also appear here once you've run a test. The available models are Qwen3 0.6B, Qwen3.5 2B, Qwen3.5 4B, Qwen3.5 9B, Gemma 4 E4B, Ministral 3 3B, LFM2.5 1.2B Thinking and LFM2.5 2.6B.

| Control | What it does |
| --- | --- |
| **Download** | Downloads the model. The button shows the download size. While it downloads, the row shows progress and a **Cancel** button. |
| **Retry** | Appears when a download failed. Starts it again. |
| **Re-download** | Downloads a fresh copy of a model you already have. |
| **Delete** | Deletes the model file to free disk space. If a feature uses the model, TalkBar names the feature and warns that it will need a re-download to work again. |

The total space your downloaded models use is shown under the list.

### Detect running Ollama

| Setting | What it does | Default |
| --- | --- | --- |
| **Detect running Ollama** | While Private AI Mode is on, warns you when Ollama is holding GPU memory, so the built-in model can run at full speed. Unloading Ollama is always your choice. | On |

## Speech models

The **Speech models** tab (search entry: **Speech models**) lists the speech recognition models used for live transcription, transcript enhancement and dictation. These models run on your computer.

Pick which model each feature uses in [Settings → Voice](/settings/voice). Here you download and delete them. Each row shows which feature uses the model: **Live transcription**, **Enhancement** or **Dictation**. The available models are Parakeet V3, Orukeet INT8, Whisper Small, Whisper Turbo, GigaAM v3, Canary 180M Flash and Canary 1B v2.

Each row has the same **Download**, **Cancel**, **Re-download** and **Delete** controls as local AI models.

## System models

The **System models** tab (search entry: **System models**) lists helper models that TalkBar downloads automatically when a feature needs them. You can re-download them, download optional ones, or delete them to free space.

| Model | What it's for |
| --- | --- |
| Silero VAD | Detects when someone is speaking and splits the live microphone audio before transcription. |
| WeSpeaker speaker embeddings | Identifies who is speaking when a transcript is enhanced after a session. |
| Sortformer diarizer | Separates speakers live during recordings. |
| Sortformer diarizer (large meetings) | Optional. Separates up to 8 speakers live, for sessions with more than 4 speakers. |
| Nemotron 3 speaker detection (up to 8 speakers) | Optional. Automatic speaker detection prefers it when a session expects more than 4 voices; the large-meetings Sortformer model also handles up to 8. |
| Translation models (for example English → Russian) | Optional. Used for transcript translation, one model per language pair. See [Live translation](/voice/live-translation). |
| Semantic document search | Used to search your documents by meaning. See [Documents](/knowledge/documents). |

::screenshot{src="/screenshots/settings/private-local-ai-system-models.png" alt="Settings → Private Local AI with the System models inner tab selected, showing the list of helper models such as Silero VAD and Sortformer diarizer, with their sizes and Download, Re-download or Delete buttons" caption="System models"}
::

::callout{icon="i-heroicons-lock-closed" color="gray"}
If your organization manages TalkBar, model downloads or the Private AI Mode switch may be locked. A notice explains what your administrator set.
::

## Related

- [AI Providers settings](/settings/ai-providers)
- [Voice settings](/settings/voice)
- [Private AI Mode](/ai/private-ai-mode)
- [Local models](/ai/local-models)
- [Data and backup settings](/settings/data-and-backup)
