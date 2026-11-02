---
title: MCP Access
description: Every setting under Settings → MCP Access — the MCP server switch, client setup, permissions, and server settings.
navigation:
  icon: i-heroicons-link
---

**Settings → MCP Access** lets AI tools on this computer, such as Claude, ChatGPT or Codex, work with your TalkBar data through MCP (Model Context Protocol). This page lists the controls; for step-by-step setup see [MCP setup](/mcp/setup), and for what each permission allows see [Access and permissions](/mcp/access-and-permissions).

## MCP server switch

The switch at the top right of the page turns the MCP server on or off. A badge next to the title shows **Disabled** while it is off, and **Ready**, **Missing** or **Error** while it is on.

| Setting | What it does | Default |
| --- | --- | --- |
| MCP server switch | Lets connected AI tools reach TalkBar. Turn it on only when you want to connect a tool. | Off |

If your organization turned off the MCP server or command-line tools, the switch is locked and a notice explains why.

::screenshot{src="/screenshots/settings/mcp-access.png" alt="Settings → MCP Access with the MCP server switch on and a Ready badge, the MCP Connect card open with the Claude Desktop preset selected and its JSON configuration shown, and the Copy buttons below it" caption="MCP Access with MCP Connect open"}
::

## MCP Connect

Ready-made setup for each supported client. Pick a client, copy the configuration, and paste it into that client's MCP settings. The card is available once the MCP server is on.

| Control | What it does |
| --- | --- |
| Client presets | **ChatGPT**, **Claude Desktop**, **Claude Code**, **Codex**, **agy CLI**, **Grok CLI**, **OpenCode** and **Generic JSON**. **ChatGPT** is selected when you open the page. |
| **Copy *client* MCP Connect** | Copies the configuration or command for the selected client. |
| **Copy CLI MCP Serve Command** | Copies the command that starts TalkBar's MCP server, for clients not in the list. |
| Chevron | Folds or unfolds the card. TalkBar remembers your choice on this computer. The card starts unfolded. |

See [MCP setup](/mcp/setup) for where to paste the configuration in each client.

## Permissions

Connected AI tools see a small set of TalkBar tools (find, read, change, delete and the operation list) and can run only the operations you switch on here.

The table has one row per kind of data: **Sessions**, **Notes**, **Projects**, **Action items**, **Knowledge**, **People**, **Topics**, **Markers**, **Chats**, **Documents**, **Calendar**, **Session Series**, **Scheduler**, **Exports**, **Workspace** and **Profile**. Each row has a **Read** switch and a **Write** switch. Open a row to switch single operations on or off. Operations marked **Confirmation advised** are ones an AI tool should confirm with you before running.

| Setting | What it does | Default |
| --- | --- | --- |
| **Read** switches | Let connected tools read that kind of data. | On |
| **Write** switches | Let connected tools create, change, trash or restore that kind of data. | Off, except calendar, series, scheduler and export operations |
| **Reset to Default** | Returns every operation to its default. Shown only when something differs from the defaults. | — |
| **Enable All** | Turns on every operation, after a confirmation. | — |
| **Disable All** | Turns off every operation, after a confirmation. | — |

The header shows how many read and write operations are on. Permissions can't be changed while the MCP server is off. Operations blocked by your organization show **Blocked by your organization**.

::screenshot{src="/screenshots/settings/mcp-permissions.png" alt="The Permissions card on Settings → MCP Access with the Read and Write columns, the Sessions row expanded to show its single read and write operations with On/Off switches, and the Reset to Default, Enable All and Disable All buttons in the header" caption="The Permissions card"}
::

## Server Settings

| Setting | What it does | Default |
| --- | --- | --- |
| **Audit logging** | Logs every tool call and resource read to the server's error output (stderr), for debugging and compliance review. Your MCP client decides where that output is saved. | Off |
| **Allow deletes without confirmation** | Lets AI tools that can't ask you first move items to the Trash, archive or delete them. When off, those requests are refused. | Off |
| **Executable path** | Where the `talkbar-cli` program used by the MCP server is. **Copy** copies the path. | — |
| **Add to PATH** | Copies a command for your system that adds the `talkbar-cli` folder to PATH. Run it to use `talkbar-cli` from a terminal. | — |
| **Data root** | The folder where TalkBar stores its database and files. **Copy** copies the path. | — |

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Keep write permissions and **Allow deletes without confirmation** off unless you need them. See [Access and permissions](/mcp/access-and-permissions) for the details.
::

## Related

- [MCP overview](/mcp/overview)
- [MCP setup](/mcp/setup)
- [Access and permissions](/mcp/access-and-permissions)
- [Command-line tool](/mcp/cli)
