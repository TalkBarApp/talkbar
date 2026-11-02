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
- If your organization manages TalkBar, MCP may be turned off for you. See [Administrator rules](/mcp/access-and-permissions#administrator-rules) and [Admin policy](/settings/admin-policy).

## Turn on MCP

1. Open **Settings → MCP Access**.
2. Turn on the switch at the top right of the page. It changes from **Disabled** to **Enabled**.
3. Check the badge next to the page title:

| Badge | What it means |
| --- | --- |
| **Ready** | TalkBar found `talkbar-cli` and it answered. You can connect your app. |
| **Missing** | TalkBar could not find `talkbar-cli`. Reinstall TalkBar. |
| **Error** | `talkbar-cli` was found but failed to start. A warning above the page shows its message. |
| **Disabled** | MCP is off. Connected apps see no TalkBar tools. |

When MCP is on, reading is allowed and most changes are not. You can change that later in [Access and permissions](/mcp/access-and-permissions).

::screenshot{src="/screenshots/mcp/mcp-access-enabled.png" alt="Settings → MCP Access with the header switch set to Enabled and a green Ready badge next to the MCP Access title, and the MCP Connect card open below it with the client buttons ChatGPT, Claude Desktop, Claude Code, Codex, agy CLI, Grok CLI, OpenCode and Generic JSON" caption="MCP turned on and ready to connect"}
::

## Copy the setup for your app

The **MCP Connect** card shows one button per app, with **ChatGPT** selected first. While MCP is off the buttons are greyed out and there is nothing to copy. If the card is folded, open it with the chevron at its top right. Pick your app, then use **Copy *app* MCP Connect** under the code box. Depending on the app, you get either a JSON block to paste into its settings or a command to run in a terminal.

Every setup does the same thing: it tells your app to start `talkbar-cli` with `serve --transport stdio`, and sets `TALKBAR_DATA_ROOT` to your TalkBar data folder.

::callout{icon="i-heroicons-light-bulb" color="primary"}
The examples use placeholders for the executable and data folder. Replace them with the paths shown in **MCP Access**, or copy the ready-made setup from TalkBar. The executable name and paths depend on your operating system. Escape backslashes in JSON paths (or use forward slashes where supported).
::

::tabs
  ::div{label="Claude Desktop" icon="i-heroicons-computer-desktop"}
  Copy the JSON and add it to Claude Desktop's configuration file, `claude_desktop_config.json` (in Claude Desktop: **Settings → Developer → Edit Config**). If the file already has an `mcpServers` section, add the `talkbar` entry inside it. Then quit and reopen Claude Desktop.

  ```json [claude_desktop_config.json]
  {
    "mcpServers": {
      "talkbar": {
        "command": "PATH_TO_TALKBAR_CLI",
        "args": [
          "serve",
          "--transport",
          "stdio"
        ],
        "env": {
          "TALKBAR_DATA_ROOT": "PATH_TO_TALKBAR_DATA"
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
        "command": "PATH_TO_TALKBAR_CLI",
        "args": [
          "serve",
          "--transport",
          "stdio"
        ],
        "env": {
          "TALKBAR_DATA_ROOT": "PATH_TO_TALKBAR_DATA"
        }
      }
    }
  }
  ```
  ::

  ::div{label="Claude Code" icon="i-heroicons-command-line"}
  Run the copied command once in a terminal. `-s user` adds TalkBar for all your projects.

  ```shell
  claude mcp add talkbar -s user -e "TALKBAR_DATA_ROOT=PATH_TO_TALKBAR_DATA" -- "PATH_TO_TALKBAR_CLI" serve --transport stdio
  ```

  Claude Code can also run `talkbar-cli` directly instead of through MCP. See [For AI agents with a shell](/mcp/cli#for-ai-agents-with-a-shell).
  ::

  ::div{label="Codex" icon="i-heroicons-command-line"}
  Run the copied command once in a terminal.

  ```shell
  codex mcp add talkbar --env "TALKBAR_DATA_ROOT=PATH_TO_TALKBAR_DATA" -- "PATH_TO_TALKBAR_CLI" serve --transport stdio
  ```
  ::

  ::div{label="agy CLI" icon="i-heroicons-command-line"}
  Run the copied command once in a terminal. agy takes its options before the server name.

  ```shell
  agy mcp add --env "TALKBAR_DATA_ROOT=PATH_TO_TALKBAR_DATA" talkbar -- "PATH_TO_TALKBAR_CLI" serve --transport stdio
  ```
  ::

  ::div{label="Grok CLI" icon="i-heroicons-command-line"}
  Run the copied command once in a terminal.

  ```shell
  grok mcp add talkbar -e "TALKBAR_DATA_ROOT=PATH_TO_TALKBAR_DATA" -- "PATH_TO_TALKBAR_CLI" serve --transport stdio
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
          "PATH_TO_TALKBAR_CLI",
          "serve",
          "--transport",
          "stdio"
        ],
        "environment": {
          "TALKBAR_DATA_ROOT": "PATH_TO_TALKBAR_DATA"
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
    "command": "PATH_TO_TALKBAR_CLI",
    "args": [
      "serve",
      "--transport",
      "stdio"
    ],
    "env": {
      "TALKBAR_DATA_ROOT": "PATH_TO_TALKBAR_DATA"
    }
  }
  ```
  ::
::

After you add TalkBar, restart your app or reload its MCP servers. Then ask it something like "What TalkBar sessions did I have this week?" to check the connection. See [Examples](/mcp/examples) for more.

## Copy the serve command

**Copy CLI MCP Serve Command** copies the command to start the MCP server manually, with your real paths filled in. Run it in a terminal for testing or for a client that needs one command.

::platform-tabs
#windows
It is a PowerShell command:

```powershell
$env:TALKBAR_DATA_ROOT = 'PATH_TO_TALKBAR_DATA'; & 'PATH_TO_TALKBAR_CLI' serve --transport stdio
```
#macos
```shell
TALKBAR_DATA_ROOT=PATH_TO_TALKBAR_DATA PATH_TO_TALKBAR_CLI serve --transport stdio
```
::

The server then waits for an MCP client on standard input. Press `Ctrl+C` to stop it.

## Where talkbar-cli is installed

`talkbar-cli` is installed with TalkBar. The **Server Settings** card on **MCP Access** shows:

| Setting | What it shows |
| --- | --- |
| **Executable path** | The full path to `talkbar-cli`. **Copy** copies it. |
| **Add to PATH** | Opens **Add talkbar-cli to PATH**, where **Copy Command** copies the command for your system. See below. |
| **Data root** | Your TalkBar data folder. **Copy** copies it. |

To run `talkbar-cli` by name from any terminal:

::platform-tabs
#windows
The copied command is for PowerShell. It adds the program's folder to your user PATH. Paste it into PowerShell, run it, then open a new terminal.
#macos
The copied command creates a symlink in `/usr/local/bin`. It uses `sudo`, so Terminal asks for your password. Paste it into Terminal and run it.
::

::screenshot{src="/screenshots/mcp/mcp-server-settings.png" alt="The Server Settings card at the bottom of Settings → MCP Access showing the Audit logging and Allow deletes without confirmation switches, the Executable path box with Copy and Add to PATH buttons, and the Data root box with its Copy button" caption="Server Settings: where talkbar-cli is and which data folder it uses"}
::

## TALKBAR_DATA_ROOT

`TALKBAR_DATA_ROOT` tells `talkbar-cli` which TalkBar data folder to open. TalkBar's ready-made setups always set it to the folder the app uses, shown as **Data root**.

::platform-tabs
#windows
The default data folder is `%LOCALAPPDATA%\TalkBar`. Check **Data root** for the path in use.
#macos
The default data folder is `~/Library/Application Support/TalkBar`. Check **Data root** for the path in use.
::

- Point it only at a TalkBar data folder. A folder without TalkBar data gets a new, empty database, and the assistant would see an empty workspace.
- To open a database file directly from the command line, use `--db` instead. See [talkbar-cli](/mcp/cli#global-options).

## After a TalkBar update

::platform-tabs
#windows
Installing a TalkBar update closes any `talkbar-cli` you are running from the app folder, including MCP servers your AI apps started. If one cannot be closed, the installer stops and asks you to close it and retry. If an app loses its TalkBar tools after an update, restart the app or reconnect its TalkBar server.
#macos
After an update, restart your AI app or reconnect its TalkBar server, so that it starts the updated `talkbar-cli`.
::

## Troubleshooting

| Problem | What to try |
| --- | --- |
| The app shows no TalkBar tools | Check that MCP is **Enabled** in **MCP Access**. If the app connected while MCP was off, restart the app or reconnect TalkBar. |
| The assistant says an operation "is turned off in TalkBar" | Turn that operation on in **MCP Access**. See [Access and permissions](/mcp/access-and-permissions). |
| The assistant sees an empty workspace | Check that `TALKBAR_DATA_ROOT` in your app's setup matches **Data root** in **MCP Access**. Copy the setup again if you moved your data. |
| Deletes are refused with `confirmation_unavailable` | Your app cannot ask you to confirm. See [Confirming deletes](/mcp/access-and-permissions#confirming-deletes). |
| The badge shows **Missing** | TalkBar cannot find `talkbar-cli`. **MCP Connect** then says "TalkBar executable not found." Reinstall TalkBar. |
| The page is locked with a notice from your organization | An administrator turned off the MCP server or the command-line tool on this computer. See [Admin policy](/settings/admin-policy). |
| Operations show **Blocked by your organization** | An administrator limited **Allowed MCP tools**. Your switches cannot turn those operations on. See [Administrator rules](/mcp/access-and-permissions#administrator-rules). |

## Related

- [MCP overview](/mcp/overview)
- [Access and permissions](/mcp/access-and-permissions)
- [MCP Access settings](/settings/mcp-access)
- [Admin policy](/settings/admin-policy)
- [talkbar-cli](/mcp/cli)
- [Examples](/mcp/examples)
