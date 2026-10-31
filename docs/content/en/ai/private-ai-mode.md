---
title: Private AI Mode
description: One switch that keeps all of TalkBar's AI on your own computer by blocking cloud providers and CLI tools.
navigation:
  icon: i-heroicons-lock-closed
---

**Private AI Mode** keeps every AI feature on hardware you control. While it is on, TalkBar sends AI requests only to Built-in AI and to Ollama servers it counts as local. Cloud providers and CLI tools are blocked. Turn it on for a sensitive meeting, or leave it on all the time.

## What it does

| | Private AI Mode off | Private AI Mode on |
| --- | --- | --- |
| **Built-in AI** | Allowed | Allowed |
| **Ollama on this computer** | Allowed | Allowed |
| **Ollama on another computer** | Allowed | Allowed only if TalkBar counts it as local |
| **Cloud providers** | Allowed | Blocked |
| **CLI tools** | Allowed | Blocked |
| **Models used** | Your **Standard** default and per-feature choices | Your **Private AI** default and private per-feature choices |

Speech-to-text, speaker detection, translation and document search already run on this computer, so they work the same either way.

TalkBar keeps two separate setups in **Settings → AI Providers → AI Features**: **Standard** and **Private AI**. Turning the mode on switches every feature to its Private AI choice. Turning it off brings your Standard choices back. Nothing is lost when you switch.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
An Ollama server that counts as local can still be another computer, and it receives your text. See [Local or remote?](/ai/providers-and-models#local-or-remote) for how TalkBar decides, and only treat servers you control as local.
::

## When it is available

Private AI Mode is a restriction switch, so it only appears once there is something to restrict: a provider other than Built-in AI (including Ollama) that is turned on and has a model turned on.

If you only use Built-in AI, all AI already runs on this computer. **Settings → Private Local AI** then says **Private AI Mode is not available**, and the switch is hidden.

## Turn it on or off

You can switch it from several places:

- **Logo menu**: click the TalkBar logo and choose **Turn on Private AI Mode** or **Turn off Private AI Mode**.
- **Settings → AI Providers**: the **Private AI Mode** switch at the top.
- **Settings → Private Local AI**: the **Private AI Mode** switch at the top.
- **System tray menu**: **Private AI Mode**.

::screenshot{src="/screenshots/ai/private-ai-mode-switch.png" alt="Settings → Private Local AI with the Private AI Mode card at the top switched On, reading All AI runs on this computer. Any external providers you have connected are turned off." caption="The Private AI Mode switch"}
::

### While a session is recording

You cannot change the mode while a session records. The switch is locked with the message **Session in progress. Stop the session to change Private AI Mode.** Stop the session first, or use a private session (below).

### If local models are missing

If you turn the mode on before the needed built-in models are downloaded, TalkBar shows **Private AI needs a model download** and offers to download them. The affected features wait until the models are ready.

## How you know it is on

- The TalkBar logo turns into a shield and the wordmark turns green. Hover it to see **Private AI: all AI features run on local models only**.
- The Private AI Mode card in settings shows **On**.
- The [dictation](/voice/dictation) panel shows a shield next to **Dictation**.
- In model lists, models that cannot be used are marked **Unavailable in Private Mode**.

::screenshot{src="/screenshots/ai/logo-private-ai-shield.png" alt="Top-left corner of the TalkBar window with Private AI Mode on: the logo shown as a shield next to a green TalkBar wordmark, with the tooltip Private AI: all AI features run on local models only" caption="The shield shows Private AI Mode is on"}
::

### Not fully local

If a Private AI choice points at a provider TalkBar cannot confirm as local, the Private AI Mode card shows **Not fully local** and TalkBar tells you how many features use a non-local provider. Those features do not run while the mode is on. Reassign them to a local model in **Settings → AI Providers → AI Features** (Private AI tab).

## Private AI for one session

You can keep a single session private without changing your everyday setup.

1. In **New session**, find the **Intelligence** row.
2. Choose **Private AI**. Click it again to pick which built-in local model writes the timeline and summary.
3. Start the session.

The session runs on built-in local models only, and its summaries stay private. TalkBar turns Private AI Mode on while the session runs and restores your previous choice after the final summary is done. The session is marked **Private session**.

**Private AI** needs at least one downloaded built-in model. If none is downloaded, the option is unavailable and points you to **Settings → Private Local AI**.

::screenshot{src="/screenshots/ai/new-session-intelligence-private.png" alt="New session dialog with the Intelligence row showing the Default pill and the Private AI pill selected, with the note This session runs on built-in local models only, and its summaries stay private forever." caption="A private session"}
::

::callout{icon="i-heroicons-light-bulb" color="primary"}
Private AI for a session only controls where AI runs. Sharing and export still work as you set them up.
::

## What it does not change

- Sharing, exports and notification channels keep working as you set them up.
- Your Standard choices are kept and come back when you turn the mode off.
- Model downloads still use the internet.

If your organization manages TalkBar, it can keep Private AI Mode on. The switch then says **Your organization keeps Private AI Mode on.**

## Related

- [How TalkBar uses AI](/ai/how-talkbar-uses-ai)
- [Providers and models](/ai/providers-and-models)
- [Local models](/ai/local-models)
- [Starting a session](/sessions/starting-a-session)
- [Privacy and your data](/data/privacy-and-your-data)
