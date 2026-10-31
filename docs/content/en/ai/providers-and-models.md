---
title: Providers and models
description: Connect Built-in AI, Ollama, a cloud provider with your own API key or a CLI tool, and choose which model powers each AI feature.
navigation:
  icon: i-heroicons-cpu-chip
---

An **AI provider** is where AI runs: on this computer, on an Ollama server you choose, or at a cloud service. An **AI model** is the specific AI that does the work, such as Qwen3.5 4B or Claude Sonnet. One provider can offer many models. This page shows how to connect providers and pick models.

## Supported providers

| Provider type | Providers | Where it runs |
| --- | --- | --- |
| **Built-in AI** | TalkBar's own on-device AI | This computer. Always present. Uses the models you download under [Local models](/ai/local-models). |
| **Ollama** | Ollama on this computer, or on another computer you run | Wherever the Ollama server runs |
| **Cloud providers** (bring your own API key) | Anthropic, OpenAI, Google Gemini, Groq, xAI (Grok), DeepSeek, Cohere, Fireworks AI, Together AI, OpenRouter, AWS Bedrock | The provider's servers |
| **CLI tools** | Claude Code CLI, Codex CLI, Agy CLI, Grok CLI, OpenCode CLI | Through the tool's own service, using the account you are signed in with |

Cloud providers and CLI tools use your own account with that service, so any usage costs are between you and them.

## Set up AI

The easiest way to connect a provider is **Set up AI**. Open it from the logo menu (**Set up AI…**) or with **Setup AI** in **Settings → AI Providers**. It shows your **Providers** and **Default models**, guides you through each step, and ends with **Review everything**. Nothing in it is required to start, and you can run it again at any time.

When you add a provider there, TalkBar asks how you want to connect:

- **Local AI (Ollama)**: runs on this machine. Private and free.
- **CLI tools**: use Claude Code, Codex, Agy, Grok CLI or OpenCode.
- **Bring your own API key**: Anthropic, OpenAI, Gemini, Groq and others.

## Add a cloud provider with your API key

1. Open **Set up AI** and choose **Bring your own API key**, or click **Add Provider** in **Settings → AI Providers → Providers**.
2. Pick the provider.
3. Paste your **API key**. **Endpoint (optional)** can stay blank to use the provider's default address.
4. Select the models you want to use. TalkBar lists the provider's models and shows what each can do (**Text**, **Vision**, **Structured**). To use a model that is not listed, use **Add custom model**; TalkBar sends it a quick test request before adding it.

::screenshot{src="/screenshots/ai/add-provider-api-key.png" alt="Set up AI wizard on the Connect to provider step, with the API key field, the optional Endpoint field and the Continue to select models button" caption="Connecting a cloud provider"}
::

::callout{icon="i-heroicons-light-bulb" color="primary"}
**AWS Bedrock**: put your AWS region in the endpoint address (for example `bedrock-runtime.us-east-1.amazonaws.com`) and paste a Bedrock API key.
::

### Where your API key is stored

TalkBar never writes your API key in plain text. Keys, passwords and tokens are encrypted inside TalkBar's own data on this computer. The key that unlocks them is kept in the Windows system keyring (Credential Manager).

To change a key, edit the provider and paste a new one; it replaces the old key.

If the keyring ever loses TalkBar's key, or you move TalkBar's data to another computer, a **Recovery code** lets you get your saved keys back. Set one up in **Settings → Data & Backup** (see [Backup and restore](/data/backup-and-restore)).

## Connect a CLI tool

If you already have an AI command-line tool installed and signed in, TalkBar can drive it.

1. Open **Set up AI** and choose **CLI tools**, or use **Detect Local CLI Tools** when adding a provider.
2. TalkBar scans your computer for Claude Code, Codex, Agy, Grok CLI and OpenCode and marks each one **Detected** or **Not detected**.
3. Pick the tool you want.

Installed a tool later? Click **Rescan** in **Local CLI Tools**.

CLI tools are never used while [Private AI Mode](/ai/private-ai-mode) is on.

## Set up Ollama

[Ollama](https://ollama.com) is a free app that runs AI models on your own hardware. TalkBar can use it on this computer or on another computer you run.

::tabs
  ::div{label="On this computer" icon="i-heroicons-computer-desktop"}
  1. Install Ollama from ollama.com/download, or run `winget install Ollama.Ollama` in PowerShell.
  2. Pull a model in a terminal. TalkBar recommends Gemma 4: `ollama pull gemma4:e4b`.
  3. In **Set up AI**, choose **Local AI (Ollama)** → **Local installation** → **Detect Ollama**. TalkBar looks for Ollama at `http://127.0.0.1:11434`.
  4. Select the models you have pulled to register them with TalkBar.
  ::
  ::div{label="On another computer" icon="i-heroicons-server"}
  1. Start Ollama on the other computer and allow incoming connections (set `OLLAMA_HOST=0.0.0.0` there).
  2. In **Set up AI**, choose **Local AI (Ollama)** → **Remote URL**.
  3. Type the server address, including the port, and click **Detect Ollama**.
  4. Select the models to register.
  ::
::

::screenshot{src="/screenshots/ai/ollama-setup.png" alt="Set up AI wizard on the Ollama step with Local installation selected, showing Ollama detected with its version and endpoint, and a list of pulled models with gemma4:e4b marked Recommended" caption="Setting up Ollama"}
::

### Local or remote?

[Private AI Mode](/ai/private-ai-mode) only uses Ollama servers that TalkBar counts as local:

- Ollama on this computer, and addresses written as an IP address, a name ending in `.local`, or a single name without dots, count as local automatically.
- For any other server name, TalkBar asks **Treat "…" as a private local host?** Choose **Treat as local** or **Keep as remote**. You can change this later on the provider.
- Ollama cloud models (tags ending in `cloud`) never count as local.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
A server that counts as local can still be another computer, and it receives the text you send it. Only treat servers you control as local.
::

If Ollama keeps a model loaded in your graphics card, the built-in model can run slower. While Private AI Mode is on, TalkBar can warn you and offer to unload Ollama's model. Unloading is always your choice.

## Manage providers and models

**Settings → AI Providers** has four tabs:

| Tab | What you do there |
| --- | --- |
| **AI Features** | Choose the default model and per-feature models. See [How TalkBar uses AI](/ai/how-talkbar-uses-ai#how-routing-works). |
| **Providers** | Add, edit, test, turn off or delete providers. |
| **Models** | See every model you can assign, grouped by provider. **Add Model** registers another model of a connected provider. Built-in models show their download status here. |
| **Advanced** | Diagnostics, response language, custom instructions, request settings and local AI limits. |

::screenshot{src="/screenshots/ai/ai-providers-tab.png" alt="Settings → AI Providers with the Providers tab open, listing Built-in AI, an Ollama provider and a cloud provider with their status, and the Add Provider and Setup AI buttons" caption="Settings → AI Providers → Providers"}
::

### Model details

When you add or edit a model you can set:

- **Display name**: how the model appears in TalkBar.
- **Capabilities**: **Text**, **Vision** and **Structured**. Most features need structured output; dictation polish, titles and the timeline need only text.
- **Context limit**: how much text the model can read at once. If a long summary fails with a context error, set this to the real limit configured on your server.

## Default and per-feature models

Once a provider is connected, choose what powers your AI features in **Settings → AI Providers → AI Features**:

- **Default model → Standard**: used by every feature while Private AI Mode is off.
- **Default model → Private AI**: a local model used while Private AI Mode is on.
- **Per-feature models → Customize**: give a feature group its own model.

With Built-in AI, TalkBar's defaults are **Qwen3.5 4B** for summaries and general features and **Qwen3 0.6B** for dictation polish. You can change both.

## Related

- [How TalkBar uses AI](/ai/how-talkbar-uses-ai)
- [Private AI Mode](/ai/private-ai-mode)
- [Local models](/ai/local-models)
- [AI Providers settings](/settings/ai-providers)
- [Backup and restore](/data/backup-and-restore)
