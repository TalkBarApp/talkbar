---
title: Set up MCP
description: Turn on MCP in TalkBar and connect Claude Desktop, ChatGPT, Claude Code, Codex, agy, Grok, OpenCode or any other MCP client.
navigation:
  icon: i-heroicons-wrench
---

Connecting an AI app to TalkBar takes two steps: turn MCP on in **Settings → MCP Access**, then copy the ready-made setup for your app. TalkBar fills in the real paths for your computer, so you never have to type them.

## Before you start

- TalkBar is installed on this computer.
- Your AI app supports local MCP servers (the kind that start a program on your computer, often called "stdio" servers).
- If your organization manages TalkBar, MCP may be turned off for you. See [Administrator rules](/mcp/access-and-permissions#administrator-rules).

## Turn on MCP

1. Open **Settings → MCP Access**.
2. Turn on the switch at the top right of the page. It changes from **Disabled** to **Enabled**.
3. Check the badge next to the page title:

| Badge | What it means |
| --- | --- |
| **Ready** | TalkBar found `talkbar-cli` and it answered. You can connect your app. |
| **Missing** | TalkBar could not find `talkbar-cli` next to the app. Reinstall TalkBar. |
| **Error** | `talkbar-cli` was found but failed to start. A warning above the page shows its message. |
| **Disabled** | MCP is off. Connected apps see no TalkBar tools. |

When MCP is on, reading is allowed and most changes are not. You can change that later in [Access and permissions](/mcp/access-and-permissions).

::screenshot{src="/screenshots/mcp/mcp-access-enabled.png" alt="Settings → MCP Access with the header switch set to Enabled and a green Ready badge next to the MCP Access title, and the MCP Connect card open below it with the client buttons ChatGPT, Claude Desktop, Claude Code, Codex, agy CLI, Grok CLI, OpenCode and Generic JSON" caption="MCP turned on and ready to connect"}
::

## Copy the setup for your app

The **MCP Connect** card shows one button per app. Pick yours, then use **Copy *app* MCP Connect** under the code box. Depending on the app, you get either a JSON block to paste into its settings or a command to run in a terminal.

Every setup does the same thing: it tells your app to start `talkbar-cli` with `serve --transport stdio`, and sets `TALKBAR_DATA_ROOT` to your TalkBar data folder.

::callout{icon="i-heroicons-light-bulb" color="primary"}
The examples below use `C:/path/to/talkbar-cli.exe` and `C:/Users/you/AppData/Local/TalkBar`. TalkBar's own copy has the real paths for your computer, so copy it from **MCP Access** rather than from this page. Paths use forward slashes, which Windows accepts.
::

::tabs
  ::div{label="Claude Desktop" icon="i-heroicons-computer-desktop"}
  Copy the JSON and add it to Claude Desktop's configuration file, `claude_desktop_config.json` (in Claude Desktop: **Settings → Developer → Edit Config**). If the file already has an `mcpServers` section, add the `talkbar` entry inside it. Then quit and reopen Claude Desktop.

  ```json [claude_desktop_config.json]
  {
    "mcpServers": {
      "talkbar": {
        "command": "C:/path/to/talkbar-cli.exe",
        "args": [
          "serve",
          "--transport",
          "stdio"
        ],
        "env": {
          "TALKBAR_DATA_ROOT": "C:/Users/you/AppData/Local/TalkBar"
        }
      }
    }
  }
  ```
  ::

  ::div{label="ChatGPT" icon="i-heroicons-chat-bubble-left-right"}
  ChatGPT gets the same `mcpServers` JSON as Claude Desktop. Paste it where your ChatGPT app takes MCP server settings, then restart the app.

  ```json
  {
    "mcpServers": {
      "talkbar": {
        "command": "C:/path/to/talkbar-cli.exe",
        "args": [
          "serve",
          "--transport",
          "stdio"
        ],
        "env": {
          "TALKBAR_DATA_ROOT": "C:/Users/you/AppData/Local/TalkBar"
        }
      }
    }
  }
  ```
  ::

  ::div{label="Claude Code" icon="i-heroicons-command-line"}
  Run the copied command once in a terminal. `-s user` adds TalkBar for all your projects.

  ```powershell
  claude mcp add talkbar -s user -e TALKBAR_DATA_ROOT=C:/Users/you/AppData/Local/TalkBar -- C:/path/to/talkbar-cli.exe serve --transport stdio
  ```

  Claude Code can also run `talkbar-cli` directly instead of through MCP. See [For AI agents with a shell](/mcp/cli#for-ai-agents-with-a-shell).
  ::

  ::div{label="Codex" icon="i-heroicons-command-line"}
  Run the copied command once in a terminal.

  ```powershell
  codex mcp add talkbar --env TALKBAR_DATA_ROOT=C:/Users/you/AppData/Local/TalkBar -- C:/path/to/talkbar-cli.exe serve --transport stdio
  ```
  ::

  ::div{label="agy CLI" icon="i-heroicons-command-line"}
  Run the copied command once in a terminal. agy takes its options before the server name.

  ```powershell
  agy mcp add --env TALKBAR_DATA_ROOT=C:/Users/you/AppData/Local/TalkBar talkbar -- C:/path/to/talkbar-cli.exe serve --transport stdio
  ```
  ::

  ::div{label="Grok CLI" icon="i-heroicons-command-line"}
  Run the copied command once in a terminal.

  ```powershell
  grok mcp add talkbar -e TALKBAR_DATA_ROOT=C:/Users/you/AppData/Local/TalkBar -- C:/path/to/talkbar-cli.exe serve --transport stdio
  ```
  ::

  ::div{label="OpenCode" icon="i-heroicons-code-bracket"}
  Add the copied block to your OpenCode configuration. If it already has an `mcp` section, add the `talkbar` entry inside it.

  ```json [opencode.json]
  {
    "$schema": "https://opencode.ai/config.json",
    "mcp": {
      "talkbar": {
        "type": "local",
        "command": [
          "C:/path/to/talkbar-cli.exe",
          "serve",
          "--transport",
          "stdio"
        ],
        "environment": {
          "TALKBAR_DATA_ROOT": "C:/Users/you/AppData/Local/TalkBar"
        },
        "enabled": true
      }
    }
  }
  ```
  ::

  ::div{label="Other apps" icon="i-heroicons-puzzle-piece"}
  For any other MCP client, such as Cursor, pick **Generic JSON**. It holds the four facts every client needs: a stdio server, the program, its arguments and the environment variable. Put them where your client expects them.

  ```json
  {
    "type": "stdio",
    "command": "C:/path/to/talkbar-cli.exe",
    "args": [
      "serve",
      "--transport",
      "stdio"
    ],
    "env": {
      "TALKBAR_DATA_ROOT": "C:/Users/you/AppData/Local/TalkBar"
    }
  }
  ```
  ::
::

After you add TalkBar, restart your app or reload its MCP servers. Then ask it something like "What TalkBar sessions did I have this week?" to check the connection. See [Examples](/mcp/examples) for more.

## Copy the serve command

**Copy CLI MCP Serve Command** copies one line that starts the MCP server by hand, for testing or for a client that wants a single command. On Windows it is a PowerShell line:

```powershell
$env:TALKBAR_DATA_ROOT = 'C:/Users/you/AppData/Local/TalkBar'; & 'C:/path/to/talkbar-cli.exe' serve --transport stdio
```

The server then waits for an MCP client on standard input. Press `Ctrl+C` to stop it.

## Where talkbar-cli is installed

`talkbar-cli.exe` is installed with TalkBar, in the same folder as the app. The **Server Settings** card on **MCP Access** shows:

| Setting | What it shows |
| --- | --- |
| **Executable path** | The full path to `talkbar-cli.exe`. **Copy** copies it. |
| **Add to PATH** | Copies a PowerShell command that adds that folder to your user PATH. Run it in PowerShell, then open a new terminal to use `talkbar-cli` by name. |
| **Data root** | Your TalkBar data folder. **Copy** copies it. |

The PATH command looks like this, with your folder in place of `C:\path\to`:

```powershell
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
[Environment]::SetEnvironmentVariable("PATH", "$currentPath;C:\path\to", "User")
```

::screenshot{src="/screenshots/mcp/mcp-server-settings.png" alt="The Server Settings card at the bottom of Settings → MCP Access showing the Audit logging and Allow deletes without confirmation switches, the Executable path box with Copy and Add to PATH buttons, and the Data root box with its Copy button" caption="Server Settings: where talkbar-cli is and which data folder it uses"}
::

## TALKBAR_DATA_ROOT

`TALKBAR_DATA_ROOT` tells `talkbar-cli` which TalkBar data folder to open. TalkBar's ready-made setups always set it to the folder the app uses, shown as **Data root**.

- On Windows, TalkBar keeps its data in `%LOCALAPPDATA%\TalkBar`. When `TALKBAR_DATA_ROOT` is not set, `talkbar-cli` uses that folder too.
- Point it only at a TalkBar data folder. A folder without TalkBar data gets a new, empty database, and the assistant would see an empty workspace.
- To open a database file directly from the command line, use `--db` instead. See [talkbar-cli](/mcp/cli#global-options).

## After a TalkBar update

Installing a TalkBar update closes any `talkbar-cli` that is running from the app folder, including MCP servers your AI apps started. If an app loses its TalkBar tools after an update, restart the app or reconnect its TalkBar server.

## Troubleshooting

| Problem | What to try |
| --- | --- |
| The app shows no TalkBar tools | Check that MCP is **Enabled** in **MCP Access**. If the app connected while MCP was off, restart the app or reconnect TalkBar. |
| The assistant says an operation "is turned off in TalkBar" | Turn that operation on in **MCP Access**. See [Access and permissions](/mcp/access-and-permissions). |
| The assistant sees an empty workspace | Check that `TALKBAR_DATA_ROOT` in your app's setup matches **Data root** in **MCP Access**. Copy the setup again if you moved your data. |
| Deletes are refused with `confirmation_unavailable` | Your app cannot ask you to confirm. See [Confirming deletes](/mcp/access-and-permissions#confirming-deletes). |
| The badge shows **Missing** | `talkbar-cli` is not next to the app. Reinstall TalkBar. |
| The page is locked with a notice from your organization | An administrator turned off the MCP server or the command-line tool on this computer. |

## Related

- [MCP overview](/mcp/overview)
- [Access and permissions](/mcp/access-and-permissions)
- [MCP Access settings](/settings/mcp-access)
- [talkbar-cli](/mcp/cli)
- [Examples](/mcp/examples)
