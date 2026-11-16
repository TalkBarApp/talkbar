---
title: First-run setup
description: What the TalkBar welcome window asks, which models it downloads, how to choose where AI runs, and how to run setup again later.
navigation:
  icon: i-heroicons-rocket-launch
---

The first time you open TalkBar, a setup window gets it ready for your first session. It has five steps: **Welcome**, **AI**, **Voice**, **Extras** and **Review**. Most people finish it in a few minutes, plus the time the model downloads take.

::screenshot{src="/screenshots/getting-started/setup-welcome.png" alt="First-run setup window on the Welcome step: the step bar Welcome, AI, Voice, Extras, Review at the top, the Your name and Job title fields, the App language buttons, the What will you record? starter packs and the Theme control" caption="The Welcome step" compact max-width="680"}
::

## Choose your setup

Every setup downloads the speech and speaker models, about 950 MB. They run on this computer, need no account, and can't be skipped. What differs is the AI that writes summaries and answers chats.

| Setup | Extra download during setup | Good if |
| --- | --- | --- |
| **External AI with an API key or a CLI tool** (smallest) | None | You already use a provider and want to start quickly. AI requests need internet. |
| **Ollama** | None in TalkBar. You download Ollama and its models yourself. | You already run Ollama. |
| **Local built-in AI** | About 2.6 GB for the default model, Qwen3.5 4B | You want AI on this computer with no provider. |
| **Both** | About 2.6 GB for the default model | You want a provider now and local models ready for private work. |

With any setup, your audio is never sent to an AI provider. With external AI, the text that AI features work on, such as transcripts, goes to the provider you connect. See [How TalkBar uses AI](/ai/how-talkbar-uses-ai).

### The smallest setup: external AI

Have your API key ready, or install your CLI tool first.

1. **Welcome**: enter your name.
2. **AI**: choose **External providers**. Connect your provider, choose a default model, then click **Verify it works** and wait for **Working**. In **Get TalkBar ready to record**, click **Download all** to get the speech and speaker models.
3. **Voice**: wait for the speech and speaker models to finish.
4. **Extras**: click **Skip for now**.
5. **Review**: click **Finish setup**.

::callout{icon="i-heroicons-light-bulb" color="primary"}
With **External providers**, **Get TalkBar ready to record** has no **Built-in AI** row, so the built-in model isn't downloaded. Choose **Local built-in AI** or **Both** if you want it.
::

### Add private local models later

You can start with external AI and add local models at any time, without running setup again.

1. Open **Settings → Private Local AI → Local AI models**.
2. Click **Find my best model** to test this computer, or click **Download** on a model. See [Local models](/ai/local-models#local-ai-models) for sizes.
3. Click **Assign to AI features**, and choose the model as your **Private AI** default.
4. Turn on [Private AI Mode](/ai/private-ai-mode) when you want all AI to stay on this computer, or choose **Private AI** for [one session](/ai/private-ai-mode#private-ai-for-one-session).

If you turn on the mode before a local model is ready, TalkBar shows **Private AI needs a model download** and offers to download it.

## How setup works

- Click **Continue** to move to the next step and **Back** to return. You can also click any step you have already visited in the step bar.
- If something is missing, **Continue** tells you what to do and highlights the field or download that needs attention.
- Setup must be finished before you use TalkBar. If you close the window, TalkBar asks **Quit setup?** Choose **Quit TalkBar** to stop for now, or **Continue setup**. The next time you open TalkBar, setup resumes where you left off with the notice **Setup didn't finish last time. Continue from here.**
- Downloads keep running in the background while you fill in the other steps.

## Step 1: Welcome

**Welcome to TalkBar.** Your profile stays on this device.

| Field | What it's for |
| --- | --- |
| **Your name** | Required. It is saved to your profile on this device. |
| **Job title** | Optional. |
| **What will you record?** | Starter packs. Meetings, calls and voice notes are always included. Pick more to add their session templates (see the table below). |
| **App language** | The language of the TalkBar interface. It changes right away. |
| **Theme** | **System**, **Light** or **Dark**. |

| Starter pack | For |
| --- | --- |
| Sales & client calls | Discovery calls, QBRs, objections, follow-ups. |
| Interviews & research | Candidate interviews and user research sessions. |
| Coaching & 1:1 development | Coaching conversations and development check-ins. |
| Podcasts & lectures | Recorded shows, talks, and lectures. |
| Legal & diligence | Consultations, risk, and compliance-relevant calls. |
| Leadership & board | Investor calls, board syncs, and exec reviews. |

When you run setup again, packs you pick are added, and templates that are already on stay on.

::callout{icon="i-heroicons-light-bulb" color="primary"}
New to TalkBar? Click **Take a quick TalkBar tour** at the bottom of the Welcome step. The setup window steps aside while the tour runs and comes back afterwards with what you already typed.
::

## Step 2: AI

**Choose how TalkBar runs AI.** Pick where AI runs and make one model ready.

| Option | What it means |
| --- | --- |
| **Local built-in AI (default)** | Runs on this computer after a one-time model download. No external AI provider is used. |
| **External providers** | Connect Ollama, a CLI tool, or your own API key. You can skip local downloads. |
| **Both** | Download local models and connect an external provider. You can switch, or restrict AI to local models with Private AI Mode, at any time. |

Below the options you set up what you chose:

- **Built-in AI models** lets you choose the built-in model. Not sure which one? Click **Model Advisor**. It measures this computer and marks its pick.
- **External providers** walks you through connecting one: **Local AI (Ollama)**, **CLI tools** (Claude Code, Codex, Agy, Grok CLI or OpenCode), or **Bring your own API key** (Anthropic, OpenAI, Gemini, Groq and others).
- When your default model comes from an external provider, click **Verify it works**. You can't continue until this check passes. It sends a small test request and shows **Working** when the provider answers. If the check fails, TalkBar says why, for example **The provider rejected the API key.**, and offers **Fix provider**.

**Get TalkBar ready to record** lists the models TalkBar needs before your first session, with their download sizes: **Speech recognition**, **Speaker detection** and, when you choose **Local built-in AI** or **Both**, **Built-in AI**. Click **Download all** to start them at once, or **Choose models** to pick different ones. The card also shows the free space on the drive; if there isn't enough room, it says how much is needed. If a download fails, click **Retry downloads**.

To continue, one AI model must be ready: the built-in model downloaded, or a provider connected and verified. If you picked the local option but your default model is an external provider, click **Use built-in AI instead**.

Want the background first? **Learn about AI first** starts the *How TalkBar uses AI* tour, then returns you to setup. See [How TalkBar uses AI](/ai/how-talkbar-uses-ai) and [Providers and models](/ai/providers-and-models).

::screenshot{src="/screenshots/getting-started/setup-ai.png" alt="First-run setup window on the AI step with the three option cards Local built-in AI (default), External providers and Both, Local built-in AI selected, the Get TalkBar ready to record card listing Speech recognition, Speaker detection and Built-in AI, and the Built-in AI models row below" caption="Choosing where AI runs" compact max-width="680"}
::

## Step 3: Voice

**Set up voice.** The models every session needs, and your microphone.

| Section | What to do |
| --- | --- |
| **Speech recognition** | Turns what is said into the live transcript. Choose the **Live transcription model**; Parakeet V3 is fast and recommended. Then set the **Transcription language**. Some models detect the spoken language automatically; others transcribe only certain languages, and the step tells you which. |
| **Speaker detection** | Voice activity detection and speaker separation. Needed for every session. |
| **Microphone** | Optional. Choose the **Input device** used by default for sessions and dictation, and make a short test recording to check it. If no microphone is found, you can still record system audio. |

The speech and speaker models must finish downloading before you can continue. Click **Download all** if they haven't started.

## Step 4: Extras

**Optional extras.** All optional. Turn on what you want now, or skip and add it later in Settings.

Under **Extra features**, everything starts off. Turn a feature on, then download its model when you want it.

| Feature | What it does |
| --- | --- |
| **Enhance transcripts after recording** | When a session ends, a larger model checks the transcript again for better accuracy. It also makes **Enhance transcript** available on finished sessions. |
| **Live translation** | Translates the transcript into another language while you record. Choose **From** and **To**. |
| **Large meetings (5+ speakers)** | Tells apart more than four speakers in big meetings. |
| **Search inside your documents** | Finds attached documents by meaning, not only by exact words. |

**First project (optional)** creates a project to file sessions and notes under. Leave it empty to skip; you can add projects any time. It isn't shown when you run setup again.

Until you turn something on, the button reads **Skip for now**. Models for the extras you turn on keep downloading after you finish setup.

## Step 5: Review

**Review and finish.** This step lists **Your setup** (profile, app language, AI, speech recognition, microphone, starter packs and first project) and lets you pick a **Default template** for new sessions. Click **Change** next to any row to go back and fix it.

Below that, each **Required** and **Optional** item shows its status: **Ready**, **Missing**, **Downloading**, **Failed** or **Not verified**. When everything required is ready, you see **Everything required is ready**. Click **Finish setup**.

## Model downloads during setup

| What happens | What to do |
| --- | --- |
| **You keep working while models download** | Downloads run in the background, and the window shows their progress. **Continue** on the **Voice** step and **Finish setup** wait until they're done. |
| **Not enough free space** | The card says how much is needed and how much is free, and **Download all** is turned off until there's room. Free up space on the drive. |
| **A download fails** | Check your internet connection, then click **Retry downloads**. Only what's missing is downloaded again. |
| **You quit during a download** | Setup resumes at your last step the next time you open TalkBar. Click **Download all** to finish. Models that finished stay, and a built-in AI model continues from where it stopped. |
| **You speak a language the default model doesn't cover** | On the **Voice** step, choose another **Live transcription model**. Its size replaces Parakeet V3's in the download. See [Supported languages](/voice/languages). |
| **You choose Local built-in AI, but your default model is external** | Click **Use built-in AI instead**, or choose **External providers**. |
| **The check fails for a provider** | **Fix provider** returns to the provider's setup, or **Use built-in AI instead** switches to a local model. You can't continue until one model is ready. |
| **Your organization manages TalkBar** | A notice on the **AI** step says what's limited. Some providers or downloads may be locked. See [Settings managed by your organization](/settings/overview#settings-managed-by-your-organization). |

You need internet to download models and to use external AI. After the speech and speaker models are downloaded, recording and transcription work offline. See [Local models](/ai/local-models#download-and-remove-models) to manage them later, and [Troubleshooting](/help/troubleshooting#model-downloads) if a download keeps failing.

## After setup

TalkBar shows **Welcome to TalkBar** and offers the *Find your way around* tour once. Click **Start tour** to take it now, or **Not now** to skip it. You can start any tour later from **Settings → Help & Tours**. See [Getting around](/getting-started/getting-around#guided-tours).

## Run setup again

You can revisit your profile, starter packs and AI setup at any time. Existing settings stay as they are.

- **Settings → Help & Tours → Start onboarding again**, or
- **Settings → Doctor → Start onboarding again**.

When you run it again, setup opens on **Welcome** and can be closed at any time. Starter packs you choose are added; existing templates and skills remain unchanged. You can't start it while a recording is running.

To change just the AI setup, click the TalkBar logo and choose **Set up AI…**, or open **Settings → AI Providers** and click **Setup AI**. Both open the same **Set up AI** window.

## Related

- [Install and update](/getting-started/install-and-update)
- [Your first session](/getting-started/first-session)
- [Local models](/ai/local-models)
- [Private Local AI settings](/settings/private-local-ai)
- [Voice settings](/settings/voice)
