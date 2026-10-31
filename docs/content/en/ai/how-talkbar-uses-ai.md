---
title: How TalkBar uses AI
description: Which TalkBar features use AI, how each feature is routed to a model, and what leaves your computer on each AI path.
navigation:
  icon: i-heroicons-sparkles
---

TalkBar uses AI to write summaries, answer questions, polish dictation and find knowledge in your conversations. You decide where that AI runs: on this computer, on an Ollama server you run, or at a cloud provider with your own API key. Each feature can even use a different model.

## Two kinds of AI

TalkBar runs two kinds of models.

**Voice and helper models always run on this computer.** They are never sent to a provider and need no setup beyond a one-time download:

- Speech-to-text for live transcripts, **Enhance transcript** and dictation
- Speaker detection and voice activity detection
- [Live translation](/voice/live-translation)
- Document search for your imported documents

Your audio is never sent to an AI provider.

**AI models (language models)** do the writing and reasoning. These are the ones you route, and they can run locally or in the cloud.

## Features that use an AI model

AI settings group the features into four **feature groups**. You can give each group its own model.

| Feature group | Feature | What the AI does |
| --- | --- | --- |
| **Chat & Ask AI** | Chat replies | Answers in [Ask TalkBar](/chats-and-notes/ask-talkbar) chats, grounded in your sessions, notes and knowledge |
| | Ask AI | Writes or rewrites note text from your prompt in the notes Ask bar |
| **Summaries** | Voice summaries | Writes the live and final summary of each session |
| | Timeline | Writes the short live timeline bullets during a session |
| **Dictation & voice commands** | Dictation polish | Cleans up dictated text before it is inserted ([Dictation](/voice/dictation#polish-with-ai)) |
| | Command interpretation | Understands natural-language commands in chat and maps them to actions |
| **Knowledge & titles** | Knowledge extraction | Finds memories, people and companies in sessions and documents during [knowledge scans](/knowledge/review-and-scans) |
| | Title generation | Writes short titles for notes and sessions when automatic titles are on |

A model has to support what a feature needs. Every feature needs a text model. Dictation polish, title generation and the timeline need nothing more, so small fast models work well there. The other features also need **structured output**. TalkBar only lets you pick models that can serve a feature.

## How routing works

**Settings → AI Providers → AI Features** decides which model each feature uses.

::screenshot{src="/screenshots/ai/ai-features-tab.png" alt="Settings → AI Providers with the AI Features tab open, showing the Default model section with Standard and Private AI dropdowns, the Test button, and the Per-feature models section with Customize" caption="Settings → AI Providers → AI Features"}
::

### Default model

One **Default model** powers every feature you have not customized. There are two:

- **Standard**: your everyday choice, used while Private AI Mode is off.
- **Private AI**: must be a local model. Used while [Private AI Mode](/ai/private-ai-mode) is on.

**Test** sends a tiny request to check that the default model answers.

### Per-feature models

Click **Customize** under **Per-feature models** to give a feature group (or a single feature inside it) its own model. For example, a small fast model for dictation polish and a larger one for summaries. Standard and Private AI keep separate choices. A feature you do not customize shows **Inherited** and uses the default model; **Reset** returns a customized one to the default.

### Choices for one chat or one session

- **Chats**: each chat can use its own model. Use **Change chat model** in the chat.
- **Sessions**: in **New session**, the **Intelligence** row lets you pick the model for that session's timeline and summary, or choose **Private AI** to keep the session on local models. You can also change the model on a session's summary later.

## AI paths and what leaves your computer

Where your text goes depends on the provider behind the model.

| AI path | Where it runs | What leaves your computer |
| --- | --- | --- |
| **Built-in AI** | This computer, with models you download under **Private Local AI** | Nothing. Works offline after the download. |
| **Ollama on this computer** | The Ollama app on this computer | Nothing |
| **Ollama on another computer** | An Ollama server you run on your network | The text a feature works on goes to that computer |
| **Cloud provider with your own API key** | The provider's servers (for example Anthropic, OpenAI or Google Gemini) | The text a feature works on goes to that provider |
| **CLI tool** (for example Claude Code or Codex) | The tool's own service | The text a feature works on goes through the tool to its service |

"The text a feature works on" means what that feature needs: for example transcript text for a summary, your question and the sources the chat uses for a chat reply, or the dictated words for polish. Audio is never part of it.

::callout{icon="i-heroicons-lock-closed" color="green"}
To make sure nothing goes to a cloud provider or CLI tool, turn on [Private AI Mode](/ai/private-ai-mode). It blocks every non-local provider at once.
::

### Settings that shape outgoing requests

In **Settings → AI Providers → Advanced**:

- **Redact URLs** strips full web addresses from content before it is sent to the AI provider, replacing them with placeholders.
- **Log requests** saves a local copy of every AI request and response for troubleshooting. Logs stay on your computer.
- **Custom AI Instructions** adds your own short note (up to 300 characters) to every AI request, such as your role or preferred tone.
- **Response Language** sets the language AI answers in. **Auto (Application UI Language)** follows the app language; chat replies in Auto follow the language of your question.

You can also keep one person's words out of AI with [Ignore speaker](/voice/speakers#exclude-a-speaker-from-ai).

## Setting up AI

The quickest start is **Set up AI** (logo menu → **Set up AI…**, or **Settings → AI Providers → Setup AI**). It walks you through providers and default models, and you can open it again at any time. Details are in [Providers and models](/ai/providers-and-models) and [Local models](/ai/local-models).

## When AI does not work

1. Open **Settings → Doctor** and click **Run all checks**. Each finding links to the setting that fixes it.
2. In **Settings → AI Providers**, use **Test** on the provider, and check **Advanced → Diagnostics** for recent errors.
3. If a cloud provider fails, an alert may offer **Fix now** or **Use Private AI** to switch to local models.
4. For local models, check that they are downloaded under **Settings → Private Local AI**.

See also [Troubleshooting](/help/troubleshooting).

## Related

- [Providers and models](/ai/providers-and-models)
- [Private AI Mode](/ai/private-ai-mode)
- [Local models](/ai/local-models)
- [AI Providers settings](/settings/ai-providers)
- [Privacy and your data](/data/privacy-and-your-data)
