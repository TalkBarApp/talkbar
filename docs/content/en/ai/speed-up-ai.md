---
title: Speed up local AI
description: Why Built-in AI or Ollama can get slow on your computer, how to check what is happening, how to fix it, and when a cloud provider is the better choice.
navigation:
  icon: i-heroicons-bolt
---

Built-in AI and Ollama run AI models on your own computer. That keeps your data private, but the speed depends on your hardware and on what else is running. This page explains why local AI gets slow, how to check it, and what to do.

## Quick checklist

If replies, summaries or other AI features take much longer than usual:

1. **Read TalkBar's notice.** When a local model runs too slowly, TalkBar says why and offers fixes. Click **Show options**.
2. **Free graphics memory.** Close apps that use a lot of it (screen recorders, games, photo and video editors, browsers with many tabs), then click **Restart Built-in AI**.
3. **Run on processor** while graphics memory stays full.
4. **Use a smaller model.** **Find the best model** tests which model runs well on this computer.
5. **Give local AI more time** with **AI time limits on this computer**.
6. **Use a cloud provider** if this computer is always too slow. This means turning off Private AI Mode.

## Why local AI gets slow

A local model works best when it fits completely in your graphics card's own memory (graphics memory, also called VRAM). The card can read it very fast there.

Other apps use graphics memory too: screen capture tools, terminals, browsers, photo and video editors, games, and Ollama if it keeps a model loaded. When graphics memory is already full, Windows can quietly place part of TalkBar's model in regular memory instead. The graphics card then has to fetch that part for every word it writes, which is much slower. On a Mac with Apple silicon, the processor and graphics share one memory. The model slows down when the Mac is short of that memory, which Activity Monitor shows as **Memory Pressure**.

On one test computer, a model that normally wrote about 100 tokens per second (a token is a piece of a word) dropped to 3–7 tokens per second this way. The same model running on the processor alone wrote about 25 tokens per second. Without a warning it just looks like AI never answers.

Other reasons local AI gets slow:

- **The model doesn't fit.** A model larger than your graphics memory runs partly on the processor. Ollama does this for large models.
- **Low system memory.** When the computer itself is short of memory, everything slows down, including AI.
- **Long sessions.** Before it writes, the model reads everything it was given. A summary of a long session or a chat with many sources gives it a lot to read, and on a processor that takes a while.
- **No usable graphics acceleration.** If the model can't use your graphics hardware, it runs on the processor. Graphics built into the processor are usually slower for local AI than a separate graphics card. Replies can take longer, depending on the model and the computer.

## What TalkBar shows

TalkBar watches how fast Built-in AI and Ollama on this computer answer, in every feature: chat, summaries, the live timeline, dictation polish, notes and titles. When a model runs much slower than usual, a notice appears, such as **Built-in AI is running slowly** or **Ollama is running slowly**, with one line about the cause. If TalkBar's window isn't in front, a system notification says **Local AI is running slowly**.

- **Show options** opens a window with the reason, the numbers TalkBar measured and the fixes that apply.
- **Dismiss** only hides the notice. TalkBar shows it once for each new slowdown.
- At the bottom of the options window (and of the **Ollama is using the GPU** window), the main button runs the recommended fix: **Restart Built-in AI**, **Unload Ollama**, or **Use a cloud provider** when the computer is too slow. It sits next to **Close**. **Speed-up guide**, on the left, opens this page.

While a local model is running slowly, an amber warning button stays visible: in the live session toolbar, just before **Ask AI**, and on every other screen in the title bar, just before **Help**. Hover it to see the problem; click it to reopen the options window.

The button disappears when no slowdowns remain. A request at normal speed clears that model's warning. Restarting Built-in AI (**Restart Built-in AI**), changing **Local AI acceleration** (including **Run on processor**) or unloading Ollama (**Unload Ollama**) clears the warnings of the models it affects. Opening the model or provider choices from the options window also clears the warning you opened it for.

If TalkBar's window reloads while a model is still slow, the notice shows again. After you quit and reopen TalkBar, earlier slowdowns aren't remembered; if TalkBar detects another slowdown during a later request, it shows the notice again.

On a computer that is always too slow for local AI, the notice reads, for example, **Built-in AI is too slow on this computer** and recommends **Use a cloud provider for all AI features**.

A summary that runs long can also show **Summary is taking longer than usual**. You can keep waiting, click **Cancel**, or click **Speed-up guide** to open this page.

## Check what is happening

::platform-tabs
#windows
When graphics memory is full, TalkBar's options window lists **Apps using the most graphics memory (approximate)**.

Use Task Manager to see whether graphics memory is full.

1. Press `Ctrl+Shift+Esc` to open Task Manager.
2. Open **Performance** and select **GPU**. On Windows 11, **Performance** is in the left sidebar. On Windows 10, if Task Manager opens small, click **More details** first. If your computer has more than one, pick the graphics card, not the graphics built into the processor.
3. Compare **Dedicated GPU memory** (the card's own memory) with **Shared GPU memory** (regular memory the card borrows). If dedicated memory is almost full and shared memory is high while AI runs, the model didn't fit.
4. To find the apps using it, open **Details**. Right-click a column header, choose **Select columns** and tick **Dedicated GPU memory** and **Shared GPU memory**. Click **Dedicated GPU memory** to sort by it.

TalkBar's own model runs as `talkbar-local-llm.exe`. If its **Shared GPU memory** is much larger than its **Dedicated GPU memory**, most of the model is in regular memory and runs slowly.

On the **Memory** graph in **Performance**, check whether the computer is short of regular memory too.
#macos
Macs with Apple silicon don't have separate graphics memory: the processor and graphics share one memory. A model slows down when the Mac as a whole is short of memory. To check:

1. Open **Activity Monitor** (in **Applications → Utilities**).
2. Open the **Memory** tab and look at **Memory Pressure** at the bottom. Yellow or red means apps need more memory than is free, and AI slows down.
3. Sort by **Memory** to find the apps using the most, and quit the ones you don't need.
::

For Ollama, run `ollama ps` in a terminal while a model is loaded. The **PROCESSOR** column shows where it runs: `100% GPU` is best; a split such as `40%/60% CPU/GPU` means part of the model runs on the processor.

## Fixes, in order

### Close other apps, then restart

If graphics memory is full, freeing it and restarting Built-in AI can help restore its usual speed.

1. Close the apps listed in TalkBar's options window, or other apps you know use graphics, such as screen recorders, games, and photo or video editors. On a Mac, Activity Monitor's **Memory** list shows the apps using the most memory. Closing browser tabs helps too.
2. In the options window, under **Close other apps, then restart**, click **Restart Built-in AI** (or use the same button at the bottom of the window). Built-in AI starts again with your next request, and TalkBar confirms: **Built-in AI will restart with your next request.** Without the options window, quit TalkBar (click the TalkBar logo, choose **Quit TalkBar**, then click **Quit App** in the confirmation) and open it again.

If Ollama holds graphics memory, unload its models with `ollama stop <model>` in a terminal. When TalkBar shows **Ollama is using the GPU**, or when the slow model is an Ollama model, you can also click **Unload Ollama** (under **Free graphics memory** in the options window, or at its bottom). Unloading is always your choice.

### Run on processor

If you can't close those apps right now, click **Run on processor** in the options window. AI stays on this computer. It is usually slower than a free graphics card, but much faster than a model that doesn't fit in graphics memory. TalkBar offers this for Built-in AI when graphics memory is full.

It switches **Local AI acceleration** in **Settings → Private Local AI** to **CPU only**. Once graphics memory is free again, switch it back to **Auto (GPU when available)** there.

### Use a smaller model

A smaller model needs less memory and answers faster. In the options window, under **Use a smaller model**:

- **Find the best model** (Built-in AI only) opens **Model Advisor**. It tests your downloaded models on this computer and recommends one. Stop the current session before testing models; pausing it is not enough. Starting a session also stops a test already running. See [Find my best model](/ai/local-models#find-my-best-model).
- **Choose a model** opens **Settings → Private Local AI** for Built-in AI, or **Settings → AI Providers → Models** for Ollama.

The [model table](/ai/local-models#local-ai-models) shows how much memory each built-in model needs.

### Tips for Ollama

- Pick a smaller model, or a smaller size of the same model, so it fits in graphics memory. Check with `ollama ps`.
- Unload models you aren't using: **Unload Ollama** in TalkBar, or `ollama stop <model>` in a terminal.
- Don't run large Ollama models and Built-in AI at the same time. Together they rarely fit in graphics memory.

### Give local AI more time

On a slower computer, long requests can run out of time before they finish. **Settings → AI Providers → Advanced → AI time limits on this computer** gives built-in and local Ollama models more time. **Auto** sets the limits from the model's measured speed, up to six times the **Standard** limits (twice the Standard limits until a built-in model has run). **Longer** allows twice the Standard limits and **Longest** four times, so on a very slow computer they can allow less time than Auto. See [AI time limits](/settings/ai-providers#ai-time-limits-on-this-computer).

This doesn't make AI faster; it only waits longer. Keep **Queue built-in and Ollama** on with **Concurrent local requests** at 1 (the default), so local requests run one after another and don't compete for the graphics card.

## When to use a cloud provider instead

If this computer is always slow, for example with no usable graphics card, graphics built into the processor or little memory, the fixes above won't help much. Cloud and app providers answer much faster than such a computer can:

- **Cloud providers** with your own API key, such as Anthropic, OpenAI or Google Gemini. See [Providers and models](/ai/providers-and-models#add-a-cloud-provider-with-your-api-key).
- **CLI tools** you already use, such as Claude Code or Codex. See [CLI tools](/ai/cli-tools).

In the options window, click **Use another provider**, or **Use a cloud provider** when the computer is too slow. If you have already connected one, TalkBar opens **Settings → AI Providers → AI Features** to assign it; if not, it opens **Set up AI**.

If Private AI Mode is on, stop the current recording before you switch to another provider. Your organization may also prevent this change; the window says why when the button is unavailable.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Cloud providers and CLI tools don't run while [Private AI Mode](/ai/private-ai-mode) is on. TalkBar asks **Turn off Private AI Mode?** first. After **Turn off and continue**, AI requests follow your **Standard** assignments and may leave this computer: the text a feature works on, such as a transcript or a note, goes to the provider you chose.
::

You don't have to choose one or the other. You can keep Built-in AI for light features like dictation polish and titles, and assign a cloud model to summaries and chat. See [Default and per-feature models](/ai/providers-and-models#default-and-per-feature-models).

## FAQ

### Why is AI slow when memory still looks free?

::platform-tabs
#windows
The total free graphics memory doesn't show where this model's data is stored, and the memory available to it can change as other apps run. On our test computer, part of the model was in regular memory even with a few gigabytes of graphics memory shown as free. Check the model's own **Dedicated GPU memory** and **Shared GPU memory** in **Details**, as above.
#macos
A Mac with Apple silicon has no separate graphics-memory total. **Memory Pressure** can look fine while a large model still leaves the Mac short of memory, and that changes as other apps run. Open Activity Monitor's **Memory** tab, sort by **Memory**, and quit apps you don't need, as above.
::

### Will running on the processor stay slow forever?

No. It's a setting. Switch **Local AI acceleration** back to **Auto (GPU when available)** in **Settings → Private Local AI** once graphics memory is free.

### Does TalkBar switch to the processor or a cloud provider by itself?

No. TalkBar only explains and offers the fixes; you choose. It never turns off Private AI Mode without asking.

### I dismissed the notice. How do I get the options back?

Click the amber warning button: in the live session toolbar, or in the title bar next to **Help** on other screens. It stays there while the model is slow. Most fixes also work without the notice: see [Fixes, in order](#fixes-in-order).

### Is my session data safe if I use a cloud provider?

The provider receives the text it works on. Cloud providers and CLI tools use your own account with that service. If your sessions must stay on this computer, keep Private AI Mode on and use the local fixes above.

## Related

- [Local models](/ai/local-models)
- [Private AI Mode](/ai/private-ai-mode)
- [Providers and models](/ai/providers-and-models)
- [CLI tools](/ai/cli-tools)
- [Private Local AI settings](/settings/private-local-ai)
- [AI Providers settings](/settings/ai-providers)
