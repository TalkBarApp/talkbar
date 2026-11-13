---
title: CLI tools
description: Install Claude Code, Codex, Agy, Grok CLI or OpenCode, sign in and connect it to TalkBar, step by step, with a ready prompt for your AI assistant.
navigation:
  icon: i-heroicons-command-line
---

An **AI CLI tool** is a small program from an AI company, such as Anthropic, OpenAI, Google or xAI, that you use by typing commands in a terminal ("CLI" means command-line interface). TalkBar can use one as an AI provider: it hands the tool a request, such as a summary or a chat reply, and the tool answers using your account with that company.

Why use one with TalkBar:

- **It can use a plan you already have.** Claude Code, Codex, Agy and Grok CLI sign in with your Claude, ChatGPT, Google, SuperGrok or X Premium+ account, so you don't need a separate API key. OpenCode is different: depending on the AI provider you connect in it, it may need an API key with separate billing.
- **It doesn't rely on your graphics card.** When the tool uses a cloud model, the AI runs on the company's servers, so it may be faster than local AI on a computer without a strong graphics card. See [Speed up local AI](/ai/speed-up-ai).

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
When a CLI tool uses a cloud model, the text a feature works on, such as a transcript or a note, is sent to the AI provider connected in that tool. CLI tools never run while [Private AI Mode](/ai/private-ai-mode) is on. If your sessions must stay on this computer, use Built-in AI or Ollama instead.
::

You don't need to be technical. Each tool below has short install steps and a ready-made prompt: paste it into ChatGPT, Claude, Gemini or another AI assistant, and it walks you through every step.

## Which tool to choose

| Tool | What you need | Signs in with |
| --- | --- | --- |
| [Claude Code](#claude-code) | A Claude Pro, Max, Ultra, Team or Enterprise plan, or a Claude Console account. The free Claude plan doesn't include it. | Your Claude account |
| [Codex](#codex) | A ChatGPT plan that includes Codex, such as Plus, Pro, Business, Edu or Enterprise | Your ChatGPT account |
| [Agy](#agy) (Google Antigravity CLI) | A personal Google account. The free, Pro and Ultra plans work. | Your Google account |
| [Grok CLI](#grok) (xAI Grok Build) | A SuperGrok or X Premium+ plan | The account with that plan |
| [OpenCode](#opencode) (experimental) | Node.js, and an AI provider connected in OpenCode. Depending on the provider, that may mean an API key with separate billing. | That provider |

Pick the tool of a service you already pay for. If you have none, Agy works with a free Google account.

## Open a terminal

You type the install commands in a terminal. Copy each command from this page, paste it into the terminal and press Enter.

::platform-tabs
#windows
1. Click **Start**, type `PowerShell` and click **Windows PowerShell**. You don't need to run it as administrator.
2. To paste a command, right-click in the window or press `Ctrl+V`, then press `Enter`.
#macos
1. Press `Cmd+Space`, type `Terminal` and press `Return`.
2. To paste a command, press `Cmd+V`, then press `Return`.
::

After you install a tool, close the terminal window and open a new one before you check it. A terminal that was already open doesn't see the new program.

## Claude Code

Claude Code is Anthropic's AI command-line tool. In TalkBar it is listed as **Claude Code CLI**.

### What you need

A Claude Pro, Max, Ultra, Team or Enterprise plan, or a Claude Console account. The free Claude plan doesn't include Claude Code.

### Install Claude Code

::platform-tabs
#windows
In PowerShell, run:

```powershell
irm https://claude.ai/install.ps1 | iex
```

The installer shows no progress while it downloads.
#macos
In Terminal, run:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

If you use Homebrew, `brew install --cask claude-code` also works.
::

Open a new terminal window and check that it works:

```bash
claude --version
```

It prints a version number, such as `2.1.211 (Claude Code)`.

### Sign in to Claude Code

Run `claude` and follow the steps in your browser to sign in with your Claude account. When you're signed in, close the terminal window.

### Connect Claude Code to TalkBar

Follow [Connect a tool to TalkBar](#connect-a-tool-to-talkbar) and pick **Claude Code CLI**.

### Claude Code problems

- **`claude` is not recognized or not found.** Open a new terminal window. If the installer printed a note that the install folder is not in your PATH, follow the fix it shows.
- **More checks.** `claude doctor` checks the installation and lists problems with suggested fixes.

Official instructions: [Claude Code setup](https://code.claude.com/docs/en/setup).

### Ask your AI assistant to help with Claude Code

Copy this prompt into ChatGPT, Claude, Gemini or another AI assistant. **Copy AI prompt** in TalkBar copies the same text.

::platform-tabs
#windows
```text
I want to install Claude Code CLI on my Windows computer and connect it to the TalkBar app. I'm not technical, so please guide me one step at a time. Explain each step in simple words and wait for my reply before you continue.

Official instructions: https://code.claude.com/docs/en/setup

1. First check that I have what I need: Needs a Claude Pro, Max, Ultra, Team or Enterprise plan, or a Claude Console account. The free plan doesn't include Claude Code.

2. Show me how to open PowerShell and run the official install command: irm https://claude.ai/install.ps1 | iex

3. Check that it works: run claude --version. It should print a version number. If the command is not found, close PowerShell, open it again and retry.

4. Sign in: run claude and help me finish signing in. Then close it.

5. Connect it to TalkBar: click the TalkBar logo, choose Set up AI…, click Providers, choose CLI tools and then Claude Code CLI.

6. Then help me tick the models I want and click Continue to select model. On the next screen, pick the model, click Continue to apply, choose Standard and click Apply.

If TalkBar doesn't find Claude Code CLI, quit TalkBar completely, open it again and retry. If it still isn't found, help me find the full path to the Claude Code CLI program and enter it in Settings → AI Providers → Providers → Add Provider → CLI Tool → Executable path.

If anything goes wrong, ask me to paste the exact message I see.
```
#macos
```text
I want to install Claude Code CLI on my macOS computer and connect it to the TalkBar app. I'm not technical, so please guide me one step at a time. Explain each step in simple words and wait for my reply before you continue.

Official instructions: https://code.claude.com/docs/en/setup

1. First check that I have what I need: Needs a Claude Pro, Max, Ultra, Team or Enterprise plan, or a Claude Console account. The free plan doesn't include Claude Code.

2. Show me how to open Terminal and run the official install command: curl -fsSL https://claude.ai/install.sh | bash

3. Check that it works: run claude --version. It should print a version number. If the command is not found, close Terminal, open it again and retry.

4. Sign in: run claude and help me finish signing in. Then close it.

5. Connect it to TalkBar: click the TalkBar logo, choose Set up AI…, click Providers, choose CLI tools and then Claude Code CLI.

6. Then help me tick the models I want and click Continue to select model. On the next screen, pick the model, click Continue to apply, choose Standard and click Apply.

If TalkBar doesn't find Claude Code CLI, quit TalkBar completely, open it again and retry. If it still isn't found, help me find the full path to the Claude Code CLI program and enter it in Settings → AI Providers → Providers → Add Provider → CLI Tool → Executable path.

If anything goes wrong, ask me to paste the exact message I see.
```
::

## Codex

Codex is OpenAI's AI command-line tool. In TalkBar it is listed as **Codex CLI**.

### What you need

A ChatGPT plan that includes Codex, such as Plus, Pro, Business, Edu or Enterprise.

### Install Codex

::platform-tabs
#windows
In PowerShell, run:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```
#macos
In Terminal, run:

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

If you use Homebrew, `brew install --cask codex` also works.
::

Open a new terminal window and check that it works:

```bash
codex --version
```

It prints a version number.

### Sign in to Codex

Run `codex` and choose **Sign in with ChatGPT**. Finish signing in in your browser, then close the terminal window.

### Connect Codex to TalkBar

Follow [Connect a tool to TalkBar](#connect-a-tool-to-talkbar) and pick **Codex CLI**.

### Codex problems

- **Codex asks how to sign in.** Choose **Sign in with ChatGPT** to use your ChatGPT plan. Using an API key instead needs extra setup.

Official instructions: [Codex on GitHub](https://github.com/openai/codex).

### Ask your AI assistant to help with Codex

::platform-tabs
#windows
```text
I want to install Codex CLI on my Windows computer and connect it to the TalkBar app. I'm not technical, so please guide me one step at a time. Explain each step in simple words and wait for my reply before you continue.

Official instructions: https://github.com/openai/codex

1. First check that I have what I need: Needs a ChatGPT plan that includes Codex, such as Plus, Pro, Business, Edu or Enterprise.

2. Show me how to open PowerShell and run the official install command: powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"

3. Check that it works: run codex --version. It should print a version number. If the command is not found, close PowerShell, open it again and retry.

4. Sign in: run codex and help me finish signing in. Then close it.

5. Connect it to TalkBar: click the TalkBar logo, choose Set up AI…, click Providers, choose CLI tools and then Codex CLI.

6. Then help me tick the models I want and click Continue to select model. On the next screen, pick the model, click Continue to apply, choose Standard and click Apply.

If TalkBar doesn't find Codex CLI, quit TalkBar completely, open it again and retry. If it still isn't found, help me find the full path to the Codex CLI program and enter it in Settings → AI Providers → Providers → Add Provider → CLI Tool → Executable path.

If anything goes wrong, ask me to paste the exact message I see.
```
#macos
```text
I want to install Codex CLI on my macOS computer and connect it to the TalkBar app. I'm not technical, so please guide me one step at a time. Explain each step in simple words and wait for my reply before you continue.

Official instructions: https://github.com/openai/codex

1. First check that I have what I need: Needs a ChatGPT plan that includes Codex, such as Plus, Pro, Business, Edu or Enterprise.

2. Show me how to open Terminal and run the official install command: curl -fsSL https://chatgpt.com/codex/install.sh | sh

3. Check that it works: run codex --version. It should print a version number. If the command is not found, close Terminal, open it again and retry.

4. Sign in: run codex and help me finish signing in. Then close it.

5. Connect it to TalkBar: click the TalkBar logo, choose Set up AI…, click Providers, choose CLI tools and then Codex CLI.

6. Then help me tick the models I want and click Continue to select model. On the next screen, pick the model, click Continue to apply, choose Standard and click Apply.

If TalkBar doesn't find Codex CLI, quit TalkBar completely, open it again and retry. If it still isn't found, help me find the full path to the Codex CLI program and enter it in Settings → AI Providers → Providers → Add Provider → CLI Tool → Executable path.

If anything goes wrong, ask me to paste the exact message I see.
```
::

## Agy

Agy is the Google Antigravity CLI. In TalkBar it is listed as **Agy CLI**.

### What you need

A personal Google account. The free, Pro and Ultra plans work.

### Install Agy

::platform-tabs
#windows
In PowerShell, run:

```powershell
irm https://antigravity.google/cli/install.ps1 | iex
```

Agy installs to `C:\Users\<your name>\AppData\Local\agy\bin`.
#macos
In Terminal, run:

```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
```

Agy installs to `~/.local/bin/agy`.
::

Open a new terminal window and check that it works:

```bash
agy --version
```

It prints a version number.

### Sign in to Agy

Run `agy`. The first time, your browser opens so you can sign in with your Google account. When you're signed in, close the terminal window.

### Connect Agy to TalkBar

Follow [Connect a tool to TalkBar](#connect-a-tool-to-talkbar) and pick **Agy CLI**.

### Agy problems

- **On Windows, TalkBar refuses the path you entered.** TalkBar needs the program file `agy.exe` itself, not a `.cmd` or `.bat` file. The official installer puts `agy.exe` in the folder above.

Official instructions: [Antigravity CLI](https://antigravity.google/docs/getting-started?tab=cli).

### Ask your AI assistant to help with Agy

::platform-tabs
#windows
```text
I want to install Agy CLI on my Windows computer and connect it to the TalkBar app. I'm not technical, so please guide me one step at a time. Explain each step in simple words and wait for my reply before you continue.

Official instructions: https://antigravity.google/docs/getting-started?tab=cli

1. First check that I have what I need: Agy is the Google Antigravity CLI. It signs in with your personal Google account; the free, Pro and Ultra plans work.

2. Show me how to open PowerShell and run the official install command: irm https://antigravity.google/cli/install.ps1 | iex

3. Check that it works: run agy --version. It should print a version number. If the command is not found, close PowerShell, open it again and retry.

4. Sign in: run agy and help me finish signing in. Then close it.

5. Connect it to TalkBar: click the TalkBar logo, choose Set up AI…, click Providers, choose CLI tools and then Agy CLI.

6. Then help me tick the models I want and click Continue to select model. On the next screen, pick the model, click Continue to apply, choose Standard and click Apply.

If TalkBar doesn't find Agy CLI, quit TalkBar completely, open it again and retry. If it still isn't found, help me find the full path to the Agy CLI program and enter it in Settings → AI Providers → Providers → Add Provider → CLI Tool → Executable path.

If anything goes wrong, ask me to paste the exact message I see.
```
#macos
```text
I want to install Agy CLI on my macOS computer and connect it to the TalkBar app. I'm not technical, so please guide me one step at a time. Explain each step in simple words and wait for my reply before you continue.

Official instructions: https://antigravity.google/docs/getting-started?tab=cli

1. First check that I have what I need: Agy is the Google Antigravity CLI. It signs in with your personal Google account; the free, Pro and Ultra plans work.

2. Show me how to open Terminal and run the official install command: curl -fsSL https://antigravity.google/cli/install.sh | bash

3. Check that it works: run agy --version. It should print a version number. If the command is not found, close Terminal, open it again and retry.

4. Sign in: run agy and help me finish signing in. Then close it.

5. Connect it to TalkBar: click the TalkBar logo, choose Set up AI…, click Providers, choose CLI tools and then Agy CLI.

6. Then help me tick the models I want and click Continue to select model. On the next screen, pick the model, click Continue to apply, choose Standard and click Apply.

If TalkBar doesn't find Agy CLI, quit TalkBar completely, open it again and retry. If it still isn't found, help me find the full path to the Agy CLI program and enter it in Settings → AI Providers → Providers → Add Provider → CLI Tool → Executable path.

If anything goes wrong, ask me to paste the exact message I see.
```
::

## Grok

Grok CLI is xAI's Grok Build. In TalkBar it is listed as **Grok CLI**.

### What you need

A SuperGrok or X Premium+ plan.

### Install Grok CLI

::platform-tabs
#windows
In PowerShell, run:

```powershell
irm https://x.ai/cli/install.ps1 | iex
```
#macos
In Terminal, run:

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```
::

Open a new terminal window and check that it works:

```bash
grok --version
```

It prints a version number.

### Sign in to Grok CLI

Run `grok login` and finish signing in in your browser with the account that has your SuperGrok or X Premium+ plan. Then close the terminal window.

### Connect Grok CLI to TalkBar

Follow [Connect a tool to TalkBar](#connect-a-tool-to-talkbar) and pick **Grok CLI**.

### Grok CLI problems

- **TalkBar finds `grok`, but requests fail.** TalkBar works with xAI's Grok Build from x.ai. Other programs that are also called `grok` don't work with it.

Official instructions: [Grok Build](https://docs.x.ai/build/overview).

### Ask your AI assistant to help with Grok CLI

::platform-tabs
#windows
```text
I want to install Grok CLI on my Windows computer and connect it to the TalkBar app. I'm not technical, so please guide me one step at a time. Explain each step in simple words and wait for my reply before you continue.

Official instructions: https://docs.x.ai/build/overview

1. First check that I have what I need: Grok CLI is xAI's Grok Build. Needs a SuperGrok or X Premium+ plan.

2. Show me how to open PowerShell and run the official install command: irm https://x.ai/cli/install.ps1 | iex

3. Check that it works: run grok --version. It should print a version number. If the command is not found, close PowerShell, open it again and retry.

4. Sign in: run grok login and help me finish signing in. Then close it.

5. Connect it to TalkBar: click the TalkBar logo, choose Set up AI…, click Providers, choose CLI tools and then Grok CLI.

6. Then help me tick the models I want and click Continue to select model. On the next screen, pick the model, click Continue to apply, choose Standard and click Apply.

If TalkBar doesn't find Grok CLI, quit TalkBar completely, open it again and retry. If it still isn't found, help me find the full path to the Grok CLI program and enter it in Settings → AI Providers → Providers → Add Provider → CLI Tool → Executable path.

If anything goes wrong, ask me to paste the exact message I see.
```
#macos
```text
I want to install Grok CLI on my macOS computer and connect it to the TalkBar app. I'm not technical, so please guide me one step at a time. Explain each step in simple words and wait for my reply before you continue.

Official instructions: https://docs.x.ai/build/overview

1. First check that I have what I need: Grok CLI is xAI's Grok Build. Needs a SuperGrok or X Premium+ plan.

2. Show me how to open Terminal and run the official install command: curl -fsSL https://x.ai/cli/install.sh | bash

3. Check that it works: run grok --version. It should print a version number. If the command is not found, close Terminal, open it again and retry.

4. Sign in: run grok login and help me finish signing in. Then close it.

5. Connect it to TalkBar: click the TalkBar logo, choose Set up AI…, click Providers, choose CLI tools and then Grok CLI.

6. Then help me tick the models I want and click Continue to select model. On the next screen, pick the model, click Continue to apply, choose Standard and click Apply.

If TalkBar doesn't find Grok CLI, quit TalkBar completely, open it again and retry. If it still isn't found, help me find the full path to the Grok CLI program and enter it in Settings → AI Providers → Providers → Add Provider → CLI Tool → Executable path.

If anything goes wrong, ask me to paste the exact message I see.
```
::

## OpenCode

OpenCode is an open-source AI command-line tool that works with many AI providers. In TalkBar it is listed as **OpenCode CLI** and marked **Experimental**.

### What you need

- **Node.js**, which installs OpenCode.
- An AI provider connected in OpenCode. Depending on the provider, that may mean an API key with separate billing: some providers work with a subscription you already have, others need their own API key. See [OpenCode providers](https://opencode.ai/v1/docs/providers/).
- **OpenCode 1.** TalkBar works with OpenCode 1. The commands below install it.

### Install Node.js

1. Download the **LTS** installer for your system from [nodejs.org](https://nodejs.org/en/download) and run it with the default options.
2. Open a new terminal window and check that it works:

```bash
node --version
```

### Install OpenCode

::platform-tabs
#windows
In PowerShell, run:

```powershell
npm.cmd install -g --allow-scripts=opencode-ai opencode-ai@1
```

Then open a new PowerShell window and check that it works:

```powershell
opencode.cmd --version
```

On Windows, type `npm.cmd` and `opencode.cmd` rather than `npm` and `opencode`. Without `.cmd`, PowerShell's default settings can stop the command with "running scripts is disabled on this system".
#macos
In Terminal, run:

```bash
npm install -g --allow-scripts=opencode-ai opencode-ai@1
```

Then open a new Terminal window and check that it works:

```bash
opencode --version
```

If npm stops with `EACCES` (permission denied), don't use `sudo`. Instead, follow npm's own fix, which moves npm's global folder into your home folder:

```bash
npm config set prefix ~/.local
echo 'PATH=~/.local/bin:$PATH' >> ~/.profile
echo 'source ~/.profile' >> ~/.zprofile
source ~/.profile
```

Then run the install command again. TalkBar may not find programs in `~/.local/bin` by itself; see [TalkBar doesn't find the tool](#talkbar-doesnt-find-the-tool).

If you use Homebrew, `brew install anomalyco/tap/opencode` also installs OpenCode 1, without npm. Plain `brew install opencode` installs OpenCode 2.
::

The version number should start with `1`.

`--allow-scripts=opencode-ai` lets OpenCode finish its setup. Since npm 12, npm skips packages' install scripts unless you allow them, and without its script OpenCode installs a placeholder that only prints an error. The command works with older npm versions too.

### Sign in to OpenCode

Run `opencode auth login` (on Windows, `opencode.cmd auth login`), choose your AI provider and follow the steps. Then close the terminal window.

### Connect OpenCode to TalkBar

Follow [Connect a tool to TalkBar](#connect-a-tool-to-talkbar) and pick **OpenCode CLI**.

### OpenCode problems

- **TalkBar says OpenCode doesn't advertise the required `--pure` headless mode.** You have a version TalkBar can't use, such as OpenCode 2. Install OpenCode 1 with the command above.
- **`opencode` only prints that its postinstall script was not run.** npm skipped OpenCode's setup script. Run the install command above again, including `--allow-scripts=opencode-ai`.

Official instructions: [OpenCode 1 docs](https://opencode.ai/v1/docs/).

### Ask your AI assistant to help with OpenCode

::platform-tabs
#windows
```text
I want to install OpenCode CLI on my Windows computer and connect it to the TalkBar app. I'm not technical, so please guide me one step at a time. Explain each step in simple words and wait for my reply before you continue.

Official instructions: https://opencode.ai/v1/docs/

1. First check that I have what I need: Experimental. TalkBar works with OpenCode 1, which this command installs. Needs Node.js and an AI provider connected in OpenCode; depending on the provider, that can mean an API key with separate billing.

2. Show me how to open PowerShell and run the official install command: npm.cmd install -g --allow-scripts=opencode-ai opencode-ai@1

3. Check that it works: run opencode.cmd --version. It should print a version number. If the command is not found, close PowerShell, open it again and retry.

4. Sign in: run opencode.cmd auth login and help me finish signing in. Then close it.

5. Connect it to TalkBar: click the TalkBar logo, choose Set up AI…, click Providers, choose CLI tools and then OpenCode CLI.

6. Then help me tick the models I want and click Continue to select model. On the next screen, pick the model, click Continue to apply, choose Standard and click Apply.

If TalkBar doesn't find OpenCode CLI, quit TalkBar completely, open it again and retry. If it still isn't found, help me find the full path to the OpenCode CLI program and enter it in Settings → AI Providers → Providers → Add Provider → CLI Tool → Executable path.

If anything goes wrong, ask me to paste the exact message I see.
```
#macos
```text
I want to install OpenCode CLI on my macOS computer and connect it to the TalkBar app. I'm not technical, so please guide me one step at a time. Explain each step in simple words and wait for my reply before you continue.

Official instructions: https://opencode.ai/v1/docs/

1. First check that I have what I need: Experimental. TalkBar works with OpenCode 1, which this command installs. Needs Node.js and an AI provider connected in OpenCode; depending on the provider, that can mean an API key with separate billing.

2. Show me how to open Terminal and run the official install command: npm install -g --allow-scripts=opencode-ai opencode-ai@1

If npm reports EACCES (permission denied), never use sudo. Use npm's documented fix instead: run npm config set prefix ~/.local, then add ~/.local/bin to my PATH.

3. Check that it works: run opencode --version. It should print a version number. If the command is not found, close Terminal, open it again and retry.

4. Sign in: run opencode auth login and help me finish signing in. Then close it.

5. Connect it to TalkBar: click the TalkBar logo, choose Set up AI…, click Providers, choose CLI tools and then OpenCode CLI.

6. Then help me tick the models I want and click Continue to select model. On the next screen, pick the model, click Continue to apply, choose Standard and click Apply.

If TalkBar doesn't find OpenCode CLI, quit TalkBar completely, open it again and retry. If it still isn't found, help me find the full path to the OpenCode CLI program and enter it in Settings → AI Providers → Providers → Add Provider → CLI Tool → Executable path.

If anything goes wrong, ask me to paste the exact message I see.
```
::

## Connect a tool to TalkBar

Once a tool is installed and signed in:

1. Open **Set up AI**: click the TalkBar logo and choose **Set up AI…**, or click **Setup AI** in **Settings → AI Providers**.
2. Click **Providers** and choose **CLI tools**. TalkBar looks for Claude Code, Codex, Agy, Grok CLI and OpenCode and marks each one **Detected** or **Not detected**.
3. Click your tool. TalkBar opens its models.
4. Tick the models you want to use and click **Continue to select model**.
5. On **Default models**, pick the model and click **Continue to apply**. Choose **Standard**, then click **Apply**.

If TalkBar finds no tool, click **Show install steps**. That step shows the commands for each tool on your system with **Copy** buttons, **Copy AI prompt**, **Full guide** (opens that tool's section of this page) and **Step-by-step guide** (opens this page). After you install a tool, click **Recheck CLI tools**.

You can also add a tool in **Settings → AI Providers → Providers**: click **Add Provider**, choose **CLI Tool** and pick the tool. See [AI Providers settings](/settings/ai-providers#adding-a-provider).

To choose which features use the tool, see [Default and per-feature models](/ai/providers-and-models#default-and-per-feature-models).

## Common problems

### TalkBar doesn't find the tool

1. Open a new terminal window and run the tool's version command, such as `claude --version`. If the terminal can't find it either, check what the installer printed about PATH and the problems listed in the tool's section before you reinstall. An installer can finish correctly and still leave its folder out of PATH.
2. Quit TalkBar completely: click the TalkBar logo, choose **Quit TalkBar**, then click **Quit App** in the confirmation. Open it again and click **Recheck CLI tools**. TalkBar looks for programs in the folders your system lists when TalkBar starts, so a tool installed while it was running may not show up until then.
3. Still not found? Tell TalkBar where the program is. Find its full path:

::platform-tabs
#windows
In PowerShell, run `where.exe claude`, using your tool's name (`claude`, `codex`, `agy`, `grok` or `opencode`). Use the line that ends in `.exe` or `.cmd`. For Agy, use `agy.exe`.
#macos
In Terminal, run `which claude`, using your tool's name (`claude`, `codex`, `agy`, `grok` or `opencode`).

On a Mac, TalkBar opened from the Dock or Finder may not see folders your terminal uses, such as `~/.local/bin`. If your tool is installed there, this step is often the one that helps.
::

Then go to **Settings → AI Providers → Providers**, click **Add Provider**, choose **CLI Tool**, pick the tool and paste the path into **Executable path**.

### The tool says you aren't signed in

Run the sign-in command from the tool's section again (`claude`, `codex`, `agy`, `grok login` or `opencode auth login`; `opencode.cmd auth login` on Windows), finish signing in, then try again in TalkBar.

### Requests stop working after a while

Your plan with the service has usage limits. When you reach them, the tool stops answering until the limit resets. Long summaries can send up to 3 requests at once; if the tool keeps hitting its limits, turn off **Enable CLI parallel execution** when you edit the provider (see [AI Providers settings](/settings/ai-providers#adding-a-provider)).

### TalkBar doesn't use the tool

- [Private AI Mode](/ai/private-ai-mode) is on. CLI tools don't run while it is on.
- The tool isn't assigned to any feature. See [Default and per-feature models](/ai/providers-and-models#default-and-per-feature-models).
- If your organization manages TalkBar with an [admin policy](/settings/admin-policy), CLI tools may be turned off.

## Related

- [Providers and models](/ai/providers-and-models)
- [Speed up local AI](/ai/speed-up-ai)
- [Private AI Mode](/ai/private-ai-mode)
- [AI Providers settings](/settings/ai-providers)
