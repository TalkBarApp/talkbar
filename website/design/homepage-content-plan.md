# Homepage Content & Conversion Plan

Goal: maximize visitors who **download / try TalkBar**. This compares the **current site copy** (`src/i18n/en.ts`) with the **Mocks2 "Studio" mockup** copy, and recommends a merged, conversion-optimized version.

## TL;DR diagnosis

The current copy *is* the mockup copy, lightly expanded. Both are clear and on-brand, but neither is fully tuned for conversion. Biggest levers, in order:

1. **Hero says the category, not the payoff.** "Private Conversation Intelligence for Your Desktop" labels what it *is*, not what the user *gets*. Lead with the differentiator + outcome.
2. **No friction-reducer next to the primary CTA.** Download intent rises with reassurance ("Free · No account · Runs on your machine · 2-min setup").
3. **Hero highlight chips are inconsistent** (title-case, jargon, a parenthetical). Clean trio reads as more polished/trustworthy.
4. **Lifecycle card titles are functional ("Before the call")** instead of benefit-led. The mockup's "Walk in briefed" sells the outcome.
5. **Lifecycle intro buries a great hook** ("Meeting notes are useful. But they are late.") inside a long paragraph.
6. **Hero sub is one dense clause-stack.** Re-rhythm it to before → during → after for skimmability.

What's already strong (keep): the bot-free / local-first / no-accounts differentiator repeated consistently; concrete live-card examples (the "renewal notice is 60 days, not 30" specificity); the privacy comparison table; the before/during/after mental model.

## Section-by-section comparison

| Section | Current | Mockup (Studio) | Recommendation | Conversion rationale |
|---|---|---|---|---|
| **Hero H1** | "Private Conversation Intelligence" + *for Your Desktop* (title case, category label) | "Private conversation intelligence, *on your desktop.*" (sentence case) | Keep the SEO term but make it outcome/differentiator-led. Recommended: **"Private conversation intelligence, *on your desktop.*"** as the safe refresh; A/B test a bolder outcome line (below) | Sentence case + "on your desktop" signals local/private; category term retained for clarity & search |
| **Hero sub** | Long single sentence: "…gives you private, source-backed context… then turns meetings, calls, interviews, and voice notes into searchable memory with actionable follow-ups." | Shorter: "…private, source-backed context during live conversations — then turns every meeting, call, and voice note into searchable memory." | **Merge + add 3-beat rhythm:** "A local-first, bot-free desktop app that **briefs you before** calls, surfaces **source-backed context live**, and turns every meeting, call, and voice note into **searchable memory**." | Mirrors the before/during/after model; scannable; keeps key nouns |
| **Hero chips** | "Native Audio Capture", "Live Private Context", "Local AI-Optional (Ollama)" (mixed case, parenthetical) | "Native audio capture", "Live context cards", "Local AI optional" | Adopt the mockup trio | Cleaner, consistent, less jargon |
| **Hero CTA** | "Download for Windows" + "See How It Works" | "Download for Mac & Windows" + "See how it works" | Keep "Download for Windows"; **add reassurance microcopy** under buttons (new) | Friction reduction is the single highest-ROI hero tweak for downloads |
| **Trust strip** | 0 bots · Runs locally · 5 pillars · BYOK/Ollama · Source-backed | Same | Keep. Optionally swap "5 lifecycle pillars" → a more tangible claim if available | Already concrete & differentiating |
| **Lifecycle intro** | "Meeting notes are useful. But they are late. Most AI meeting tools… without inviting a bot into the call." (long) | "Most AI meeting tools tell you what happened after the call ends. TalkBar helps while the conversation is still happening — and keeps the memory after." (concise) | **Keep current's hook, cut the rest:** "Meeting notes are useful — but they're late. TalkBar helps **while the conversation is still happening**, then keeps the memory after." | Strong contrarian hook stays; length cut ~70% for skimmability |
| **Lifecycle card titles** | "Before the call" / "During the call" / "After the call" | "Walk in briefed" / "Live, private intelligence" / "Action & lasting memory" | **Adopt mockup titles** (keep Before/During/After as the small step label) | Benefit-led titles outsell functional labels |
| **Bento (Live Cards)** | "The right context, *exactly when it matters.*" + 6 cards | Same intent, tighter card copy | Keep; tighten Document Card desc to mockup's ("…clause, memo, note, or PDF that matters right now — with confidence and a one-click source.") | The concrete examples are the page's best proof — preserve |
| **Capabilities grid** | "Everything you need to turn talk *into an asset.*" (8 cards) | Same | Keep | Strong, benefit-framed |
| **Use cases & industries** | "Built for the conversations *you need to remember.*" | Same | Keep | Good "who it's for" coverage |
| **Privacy band** | "Local-first. Bot-free. *Built for sensitive talk.*" + table | Same | Keep | Best objection-handler on the page |
| **How it works** | "…*in 60 seconds*" + 5 steps (descriptive step titles) | Same, shorter step titles ("Choose a profile") | Keep current titles; they're clear | Speed-to-value ("60 seconds") is a strong download nudge |
| **FAQ** | "Common *questions.*" (10 Q&As) | Same | Keep | Covers privacy/export objections |
| **Final CTA** | "Ready to bring your private memory *into every conversation?*" + chips | Same | Keep; add same reassurance microcopy as hero | Reinforce low-risk download at the decision point |

## High-impact rewrites (proposed copy)

**1. Hero headline — two options**
- **A (recommended, safe):** `hero.headline` = "Private conversation intelligence," / `hero.headlineAccent` = "on your desktop." — keeps the search term, sentence case, local cue.
- **B (bolder, A/B test):** `hero.headline` = "Walk in briefed. Stay sharp live." / `hero.headlineAccent` = "Never lose the follow-up." — pure outcome; pairs with a sub that names the category.

**2. Hero sub** (`hero.subheadline`)
> "A local-first, bot-free desktop app that briefs you before calls, surfaces source-backed context live, and turns every meeting, call, and voice note into searchable memory."

**3. Hero chips** (`hero.highlight.memory / .localAi / .cards`)
> "Native audio capture" · "Live context cards" · "Local AI optional"

**4. CTA reassurance microcopy** (NEW key, e.g. `hero.ctaNote` + reuse under final CTA)
> "Free download · No account · Runs on your machine"  *(confirm "Free" matches pricing)*

**5. Lifecycle card titles** (`workflows.before.title / during.title / after.title`)
> "Walk in briefed" · "Live, private intelligence" · "Action & lasting memory"

**6. Lifecycle intro** (`workflows.subhead`)
> "Meeting notes are useful — but they're late. TalkBar helps while the conversation is still happening, then keeps the memory after."

## New conversion elements to consider

| Element | Why | Effort |
|---|---|---|
| CTA reassurance microcopy (hero + final CTA) | Removes download risk/uncertainty at both decision points | XS |
| Confirm & surface "Free" / pricing signal above the fold | Uncertainty about cost is a top download blocker | XS (needs pricing decision) |
| Repurpose unused `hero.brandLine` ("Your private memory. Every conversation. Before, during, and after.") as a tagline near logo/footer | Memorable positioning line currently unused | XS |
| Secondary CTA → "Watch the 60-second tour" (if a demo/video/gif exists) | Demo engagement lifts download intent | S (needs asset) |
| Add a single specificity stat to trust strip if one becomes available (e.g., "Runs 100% offline") | Tangible proof beats abstract claims | XS |

## Priority

| Priority | Change | Keys / files |
|---|---|---|
| **P0** | CTA reassurance microcopy (hero + final CTA) | new `hero.ctaNote`; `Hero.astro`, `CTASection.astro` |
| **P0** | Benefit-led lifecycle card titles | `workflows.before/during/after.title` |
| **P0** | Tighten lifecycle intro | `workflows.subhead` |
| **P1** | Clean hero chips | `hero.highlight.memory/.localAi/.cards` |
| **P1** | Re-rhythm hero sub | `hero.subheadline` |
| **P1** | Hero H1 refresh (option A) | `hero.headline`, `hero.headlineAccent` |
| **P2** | Confirm "Free"/pricing signal | content decision |
| **P2** | Demo-tour secondary CTA | needs asset |
| **P2** | A/B test bold outcome H1 (option B) | experiment |

All copy lives in `src/i18n/en.ts` (en-only build), so changes are low-risk string edits plus one new key wired into `Hero.astro` and `CTASection.astro`. Note: `Hero.test.ts` asserts a few hero strings ("Private Conversation Intelligence", `hero.cta.primary`/`cta.button` = "Download for Windows") — update those assertions alongside any hero H1 change.
