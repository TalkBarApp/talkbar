---
title: AI Providers
description: Every control under Settings → AI Providers, including default and per-feature models, providers, model limits, and advanced request settings.
navigation:
  icon: i-heroicons-sparkles
---

**Settings → AI Providers** decides which AI model each TalkBar feature uses and where it runs. It has four inner tabs: **AI Features**, **Providers**, **Models** and **Advanced**. For the concepts behind these controls, see [How TalkBar uses AI](/ai/how-talkbar-uses-ai) and [Providers and models](/ai/providers-and-models).

::screenshot{src="/screenshots/settings/ai-providers-features-tab.png" alt="Settings → AI Providers with the AI Features inner tab selected, showing the Private AI Mode switch, the Default model card with Standard and Private AI dropdowns, and the Per-feature models row" caption="The AI Features tab"}
::

## Page header

These controls sit above the inner tabs and stay visible on every tab.

| Setting | What it does | Default |
| --- | --- | --- |
| **Setup AI** | Opens the **Set up AI** window, where you set up providers, local models and default models. See [Set up AI](/ai/providers-and-models#set-up-ai). | — |
| Issue count (for example **1 issue**) | Appears only when an AI feature is failing. Click it to jump to the problem. | — |
| **Private AI Mode** | Keeps AI on Built-in AI and on Ollama servers TalkBar counts as local, and turns off cloud and CLI providers. Shown once a provider other than Built-in AI, including Ollama, is turned on with a model turned on. You can't change it while a session is in progress. See [Private AI Mode](/ai/private-ai-mode). | Off |

When an AI feature fails, a red card appears under the header with the affected provider and model and the latest error. **Retry** tests the connection again. **Clear this error** removes the error for that provider or model.

If an Ollama provider uses a host name, TalkBar can't tell whether it's on this computer, so it asks. Choose **Treat as local** or **Keep as remote**. Trusted hosts count as local in Private AI Mode. Other hosts don't: while the mode is on, features assigned to them [do not run](/ai/private-ai-mode#not-fully-local). You can change this later with the **Treat host as local** switch on the provider's card.

## AI Features

The **AI Features** tab (search entry: **AI Features**) shows which model powers each feature.

| Setting | What it does | Default |
| --- | --- | --- |
| **Test** | Sends a short test request for every enabled feature and lists the result, the model used and the response time. | — |
| **Quick Apply Wizard** | Opens the **Set up AI** window on its **Default models** step, where you pick a provider and a model and apply it as the **Standard** or **Private AI** default. | — |

### Default model

**Default model** is used by every AI feature you haven't customized. It has two dropdowns. The one in use right now is marked **Active**.

| Setting | What it does | Default |
| --- | --- | --- |
| **Standard** | The model features use while Private AI Mode is off. Any model from any provider that can serve every feature. Text-only models aren't listed. | Qwen3.5 4B (Built-in AI) |
| **Private AI** | The model features use while Private AI Mode is on. Only built-in and Ollama models are listed, and TalkBar refuses an Ollama server it doesn't count as local. Disabled until a provider other than Built-in AI, including Ollama, is turned on with a model turned on, because until then all AI already runs locally. | Qwen3.5 4B (Built-in AI) |

If you have no provider other than Built-in AI yet, a **Set up a provider** button takes you to the **Providers** tab.

### Per-feature models

**Per-feature models** lets individual features use their own model instead of the default. Click **Customize** to show the controls (and **Hide** to collapse them). A **Standard** / **Private AI** switch picks which set of assignments you're editing. The two sets are kept separately. **Private AI** can't be selected until Private AI Mode is available.

Features are grouped. Each group row has an on/off switch, a model dropdown and a **Reset** button. **Show features** expands a group so you can set each feature on its own.

| Group | Features in the group | Default |
| --- | --- | --- |
| **Chat & Ask AI** | **Chat replies**, **Ask AI** (note text from a prompt) | On, uses the default model |
| **Summaries** | **Voice summaries**, **Timeline** (live timeline bullets) | On, uses the default model |
| **Dictation & voice commands** | **Dictation polish**, **Command interpretation** | On, uses the default model |
| **Knowledge & titles** | **Knowledge extraction**, **Title generation** | On, uses the default model |

| Control | What it does | Default |
| --- | --- | --- |
| Group or feature switch | Turns that AI feature on or off. | On |
| Model dropdown | Picks a model for the group or feature. Until you choose one, it reads **Select custom model** and the group or feature follows the default model. Only models that can do the job are listed. | **Select custom model** |
| **Reset** | Appears on a customized group or feature. Returns it to the default model. | — |

In the **Standard** set, while Private AI Mode is off, a badge next to each feature shows its status: **Ready**, **Disabled**, **Invalid** or **Needs config**. **Customized** or **Inherited** tells you whether a group has its own model; **Mixed** means its features use different models. **Model not downloaded** means the chosen local model still needs to be downloaded on **Settings → Private Local AI**.

In the Private AI set, **Dictation polish** starts out assigned to the small Qwen3 0.6B model instead of the default.

## Providers

The **Providers** tab (search entry: **Providers**) lists every AI provider TalkBar can use. **Built-in AI** is always there and runs on this computer.

| Setting | What it does | Default |
| --- | --- | --- |
| **Set up via wizard** | Opens the **Set up AI** window on its **Providers** step. | — |
| **Add Provider** | Opens **Add AI Provider**, where you connect a cloud API or a command-line AI tool. | — |

### Each provider

Each provider card shows its type (**API / BYOK**, **Installed CLI** or **Built-in (on-device)**), how many models it has, and warnings such as **No API key**, **Invalid key** or **Validation failed**. An Ollama provider that uses a host name also has a **Treat host as local** switch.

| Control | What it does | Default |
| --- | --- | --- |
| **Test** | Checks that the provider answers. | — |
| **Manage downloads** | Built-in AI only. Opens **Settings → Private Local AI** to download local models. | — |
| **Edit** | Opens **Edit AI Provider** to change the display name, endpoint, API key and, for CLI tools, prompt controls. **Validate Provider** tests the connection; **Save Changes** saves it. | — |
| **Remove** | Deletes the provider and its API key. Features that used it lose their model. | — |
| On/off switch | Turns the provider on or off. Built-in AI can't be turned off. | On |

### Adding a provider

In **Add AI Provider**, choose a **Provider Type**:

- **Cloud API**: pick a provider and enter your API key. The list includes Anthropic, OpenAI, Google Gemini, Ollama (Local), Groq, xAI (Grok), DeepSeek, Cohere, Fireworks AI, Together AI, OpenRouter and AWS Bedrock. **Custom...** lets you enter any compatible endpoint. **Ollama (Local)** is in this list even though it runs on hardware you control, and its API key is optional. See [Set up Ollama](/ai/providers-and-models#set-up-ollama) for the guided way to add it.
- **CLI Tool**: pick an AI command-line tool that's installed on this computer. In **Detect Local CLI Tools**, **Scan** (or **Rescan**) detects installed tools and marks each one **Detected** or **Not found**; **Use** fills in a detected one. You can also set the **Executable path** yourself.

**Advanced settings...** shows extra fields such as **Display name** and **Endpoint override (optional)**. Then click **Connect & Select Models**, tick the models you want and add them.

For command-line tools, the edit screen also has **CLI prompt controls**, including **Enable CLI parallel execution**. When it's on, long summaries send up to 3 requests to the tool at once. Turn it off if the tool hits its plan limits. Default: On.

### Local CLI Tools

The **Local CLI Tools** card detects AI command-line tools installed on this computer. Supported tools are Claude Code, Codex, Agy, Grok CLI and OpenCode (marked **Experimental**). Click **Scan** (or **Rescan**) to check again. Each tool shows **Detected** or **Not found**. **Add Provider** connects a detected tool, and **Installed** marks one you already connected. The **Set up AI** window marks a missing tool **Not detected** instead.

## Models

The **Models** tab (search entry: **Models**) lists the models attached to your providers.

| Setting | What it does | Default |
| --- | --- | --- |
| **Add Model** | Attaches a model to an existing provider. Choose the **Provider**, click **Get list** to load its available models (or type a **Remote model key**), set a **Display name** and the **Capabilities** (**Text**, **Vision**, **Structured**), then click **Create Model**. | — |

Each model card shows which features use it and has these controls:

| Control | What it does | Default |
| --- | --- | --- |
| **Test** | Sends a short request and shows how long the model took to answer. | — |
| **Chat budgets** | Built-in models only. Opens **Chat context and generation**. | — |
| **Generation limits** | Built-in models only. Opens **Summary generation limits**. | — |
| **Manage** | Built-in models only. Opens **Settings → Private Local AI** to download or delete the model. | — |
| **Edit** | Other models. Changes the display name, **Context limit** and capabilities. The edit screen also has the **Chat context and generation** and **Summary generation limits** sections. | — |
| **Remove** | Other models. Deletes the model. | — |
| On/off switch | Turns the model on or off. | On |

### Chat context and generation

Sets how much room a model gets for chat. Values are in tokens. The panel first shows read-only figures, such as **Effective chat context**, **Chat working input** and **Reserved generation**. Changes apply to your next message. **Reset to Auto** clears your values.

| Setting | What it does | Default |
| --- | --- | --- |
| **Chat input ceiling** | Caps how much input (sources and conversation) a chat sends. **Custom** lets you enter a **Custom token limit**. | Auto |
| **Chat generation ceiling** | Caps how long an answer can be, including reasoning where the provider counts it. A small ceiling can cut an answer short. | Auto |
| **Ollama context allocation** | Ollama models only. How much context TalkBar asks Ollama to load. Auto requests up to 16K tokens within the model's capacity. **Custom allocation** uses more memory. | Auto |
| **Declared model capacity** | Shown when TalkBar can't verify the model's capacity. Enter the model's context size to confirm it. Leave it blank to use discovered limits or a safe fallback. | Blank (Auto) |

For providers that manage their own limits, the panel shows **Provider-managed limits** instead of these fields.

### Summary generation limits

Sets output limits for session summaries. Changes apply to the next summary. **Reset to Auto** clears your values.

| Setting | What it does | Default |
| --- | --- | --- |
| **Extraction output limit** | Caps the output of each extraction step of a long summary. Auto adapts to segment size, sections and language. | Auto |
| **Final output limit** | Caps the length of the final summary. Auto depends on the summary length. | Auto |
| **Local summary context** | Built-in models only. The context window used for summaries. Choose Auto or a fixed size. | Auto |
| **Reasoning budget** | Built-in models that support it. Caps tokens spent on reasoning. Leave blank for Auto. | Blank (Auto) |

For providers that manage their own limits, **Output limits** and **Reasoning budget** show **Provider-managed**.

## Advanced

The **Advanced** tab holds diagnostics and settings that apply to all AI requests.

### Diagnostics

| Setting | What it does | Default |
| --- | --- | --- |
| **Ollama (Local) — GPU memory** | Shown only when Ollama is installed or running. Lists what Ollama holds in GPU memory. **Unload now** frees the GPU for the built-in model. | — |
| **AI Usage Overview** | A **Feature routing** table that shows each feature, the provider and model it uses, and whether it can run. **Refresh** reloads it. | — |
| **Diagnostics** | Shows each provider's health, how many features are ready, its last validation and recent errors. **Clear issue history** removes past errors. | — |

### Request Settings

| Setting | What it does | Default |
| --- | --- | --- |
| **Redact URLs** | Replaces full web addresses in content with placeholders before it's sent to an AI provider, so tokens and private links don't leave your device. | On |
| **Log requests** | Saves a local copy of every AI request and response for troubleshooting. Logs stay on your device. | Off |

### AI time limits on this computer

Gives built-in and local Ollama models more time on slower computers before a request counts as timed out. Cloud models and command-line tools are not affected.

| Setting | What it does | Default |
| --- | --- | --- |
| **Auto** | Sets the limits from the measured speed of your computer. Until a built-in model has run, Auto doubles the limits; run the speed test in [Model Advisor](/ai/local-models#find-my-best-model) to measure now. Under the control, TalkBar shows the measured speed for each model. | Selected |
| **Standard** | Keeps the default limits. | — |
| **Longer** | Doubles the limits. | — |
| **Longest** | Allows four times as long. | — |

### Local AI request queue

Runs built-in and Ollama requests one after another, so tasks don't compete for the same GPU.

| Setting | What it does | Default |
| --- | --- | --- |
| **Queue built-in and Ollama** | Turns the queue on. Cloud providers and command-line tools always run outside it. | On |
| **Concurrent local requests** | How many local requests run at the same time (1–8). Use 1 to fully serialize GPU work. | 1 |
| **Pending local requests** | How many requests can wait in line (0–512). This counts waiting requests only, so total local work can reach concurrent plus pending. | 32 |

### Response Language

| Setting | What it does | Default |
| --- | --- | --- |
| **Response Language** | The language AI writes in, including chat replies. A chat can override it with **Reply language** in its **Answer using** menu. In Auto, chat replies follow the language of your question. Ask AI in notes keeps the language of the selected text or note. For an empty note it uses this setting or, with Auto, the language of your request. **Custom...** lets you type any language (up to 30 characters). | **Auto (Application UI Language)** |

### Custom AI Instructions

| Setting | What it does | Default |
| --- | --- | --- |
| **Custom AI Instructions** | Extra instructions added to every AI feature, up to 300 characters. They add to the built-in prompts; they don't replace them. | Empty |

### Voice

A shortcut card. **Open Voice settings** takes you to [Settings → Voice](/settings/voice), where recording, transcription, dictation and speaker labels live.

::screenshot{src="/screenshots/settings/ai-providers-advanced-tab.png" alt="Settings → AI Providers with the Advanced inner tab selected, scrolled to show the Request Settings, AI time limits on this computer, and Local AI request queue cards" caption="Advanced request settings"}
::

::callout{icon="i-heroicons-lock-closed" color="gray"}
If your organization manages TalkBar with an [admin policy](/settings/admin-policy), some of these controls may be locked and show a notice. Locked settings keep working as your administrator set them up.
::

## Related

- [Private Local AI settings](/settings/private-local-ai)
- [Providers and models](/ai/providers-and-models)
- [Private AI Mode](/ai/private-ai-mode)
- [Local models](/ai/local-models)
- [How TalkBar uses AI](/ai/how-talkbar-uses-ai)
