---
title: CLI tools in the Mac App Store version
description: "Why CLI tools can't run in the Mac App Store version of TalkBar, and how to use cloud AI, local models, Ollama or MCP instead."
navigation: false
---

This page is for the Mac App Store version of TalkBar. It explains the notice **CLI tools can’t run in the Mac App Store version** that appears in **Set up AI → CLI tools**, and what you can use instead.

## Why CLI tools can’t run

macOS doesn’t let Mac App Store apps start other programs. That is an Apple rule, not a bug, and no setting in TalkBar changes it.

TalkBar can still see Claude Code, Codex, Antigravity (agy), Grok CLI and OpenCode on this Mac, and it lists them in **Set up AI**, but it can't pick or run them. The notice says: **macOS doesn’t let Mac App Store apps start other programs, so TalkBar can see the CLI tools on this Mac but can’t use them.**

## What to use instead

These options all work in the Mac App Store version:

- **Cloud AI providers** with an API key. Before a provider first gets meeting content, TalkBar asks for your consent once for that provider. See [Providers and models](/ai/providers-and-models).
- **Local AI** on this Mac, using TalkBar's own local models. See [Local models](/ai/local-models).
- **Ollama.** TalkBar connects to it over its local HTTP API. Ollama has to be installed and running separately.

## Have an AI subscription?

Use MCP the other way round. Your AI app (Claude Desktop, Claude Code, Codex, ChatGPT, Grok CLI, agy, OpenCode or any MCP client) connects to TalkBar. It can then read your meetings and add notes, action items and knowledge cards.

In **Set up AI**, the **Have an AI subscription?** card puts it this way: **Connect your AI app to TalkBar with MCP instead: it can read your meetings and add notes, action items and knowledge cards.**

1. In TalkBar, open **Settings → MCP Access**. The **Open MCP Access** card in the same **Set up AI** step goes there directly.
2. Turn MCP on, pick your AI app's tab and copy the setup shown. It already includes the right path. In the Mac App Store version the CLI is built into the app at `/Applications/TalkBar.app/Contents/MacOS/talkbar-cli`.
3. Optional: **Add to PATH** copies this command for you to run in Terminal:

```bash
sudo ln -sf '/Applications/TalkBar.app/Contents/MacOS/talkbar-cli' /usr/local/bin/talkbar-cli
```

The app can't run this itself, because sandboxed apps can't ask for an administrator password.

For the details, see [MCP and CLI overview](/mcp/overview). The app generates the setup; this page doesn't copy the configuration.

## Exports

In the Mac App Store version, exports started from the CLI or MCP are queued, and the TalkBar app delivers them, to a folder or to Notion. The app needs to be running for that. Notion is connected in the app, not from the CLI.

## Related

- [Providers and models](/ai/providers-and-models)
- [Local models](/ai/local-models)
- [MCP and CLI overview](/mcp/overview)
- [MCP Access](/settings/mcp-access)
