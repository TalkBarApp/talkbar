---
title: First-run setup
description: What the TalkBar welcome window asks, which models it downloads, how to choose where AI runs, and how to run setup again later.
navigation:
  icon: i-heroicons-rocket-launch
---

The first time you open TalkBar, a setup window gets it ready for your first session. It has five steps: **Welcome**, **AI**, **Voice**, **Workspace** and **Review**. Most people finish it in a few minutes, plus the time the model downloads take.

::screenshot{src="/screenshots/getting-started/setup-welcome.png" alt="First-run setup window on the Welcome step: the step bar Welcome, AI, Voice, Workspace, Review at the top, the Your name and Job title fields, the 'Get TalkBar ready to record' download card, the App language buttons and the Theme control" caption="The Welcome step"}
::

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
| **Get TalkBar ready to record** | Lists the models TalkBar needs before your first session: **Speech recognition**, **Speaker models** and **Built-in AI**, with their download sizes. Click **Download all** to start them all at once. |
| **App language** | The language of the TalkBar interface. It changes right away. |
| **Theme** | **System**, **Light** or **Dark**. |

The **Built-in AI** row has an **Include** switch. Turn it off if you plan to use your own AI provider instead; the card then says the model is skipped and you connect a provider in the next step.

The card also shows the free space on the drive. If there isn't enough room, it tells you how much is needed. If a download fails, click **Retry downloads**.

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

- **Local language models** lets you choose the built-in model. Not sure which one? Click **Model Advisor**. It measures this computer and marks its pick.
- **External providers** walks you through connecting one: **Local AI (Ollama)**, **CLI tools** (Claude Code, Codex, Agy, Grok CLI or OpenCode), or **Bring your own API key** (Anthropic, OpenAI, Gemini, Groq and others).
- When your default model comes from an external provider, click **Verify it works** once. It sends a small test request and shows **Working** when the provider answers. If the check fails, TalkBar says why, for example **The provider rejected the API key.**, and offers **Fix provider**.

To continue, one AI model must be ready: the built-in model downloaded, or a provider set up. If you picked the local option but your default model is an external provider, click **Use built-in AI instead**.

Want the background first? **Learn about AI first** starts the *How TalkBar uses AI* tour, then returns you to setup. See [How TalkBar uses AI](/ai/how-talkbar-uses-ai) and [Providers and models](/ai/providers-and-models).

::screenshot{src="/screenshots/getting-started/setup-ai.png" alt="First-run setup window on the AI step with the three option cards Local built-in AI (default), External providers and Both, Local built-in AI selected, and the Local language models row below" caption="Choosing where AI runs"}
::

## Step 3: Voice

**Set up voice.** The models every session needs, and your microphone.

| Section | What to do |
| --- | --- |
| **Speech recognition** | Turns what is said into the live transcript. Choose the **Live transcription model**; Parakeet V3 is fast and recommended. Then set the **Transcription language**. Some models detect the spoken language automatically; others transcribe only certain languages, and the step tells you which. |
| **Speaker models** | Voice activity detection and speaker separation. Needed for every session. |
| **Microphone** | Optional. Choose the **Input device** used by default for sessions and dictation, and make a short test recording to check it. If no microphone is found, you can still record system audio. |
| **Optional downloads** | Extra models you can add now or later: **Large sessions (more than 4 speakers)**, **Translation** and **Documents** (semantic document search). |

The speech and speaker models must finish downloading before you can continue. Click **Download all** if they haven't started.

## Step 4: Workspace

**Set up your workspace.** Starter packs and an optional first project.

Under **What will you record?**, pick any starter packs that fit. Each one switches on the matching session templates and skills. **Meetings & 1:1s** and **Voice notes & ideas** are selected by default.

| Starter pack | For |
| --- | --- |
| Meetings & 1:1s | Team meetings, calls, and one-on-ones. |
| Voice notes & ideas | Solo thinking, dictation, and brainstorms. |
| Sales & client calls | Discovery calls, QBRs, objections, follow-ups. |
| Interviews & research | Candidate interviews and user research sessions. |
| Coaching & 1:1 development | Coaching conversations and development check-ins. |
| Podcasts & lectures | Recorded shows, talks, and lectures. |
| Legal & diligence | Consultations, risk, and compliance-relevant calls. |
| Leadership & board | Investor calls, board syncs, and exec reviews. |

**First project (optional)** creates a project to file sessions and notes under. Leave it empty to skip; you can add projects any time.

## Step 5: Review

**Review and finish.** This step lists **Your setup** (profile, app language, AI, speech recognition, microphone, starter packs and first project) and lets you pick a **Default template** for new sessions. Click **Change** next to any row to go back and fix it.

Below that, each **Required** and **Optional** item shows its status: **Ready**, **Missing**, **Downloading**, **Failed** or **Not verified**. When everything required is ready, you see **Everything required is ready**. Click **Finish setup**.

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
