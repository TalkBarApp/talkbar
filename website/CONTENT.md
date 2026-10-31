# TalkBar Homepage Content Map

This document tracks the current English-only homepage structure. Final website copy should stay in `src/i18n/en.ts`; this file is a planning reference for sections and intent.

## 1. Navbar

**Component:** `src/components/Navbar.tsx`

| Element | Current direction |
|---|---|
| Brand | TalkBar text logo from `design/`, with light/dark and warm/blue variants |
| Links | Product, Live Context Cards, Privacy, Use Cases, FAQ |
| Actions | Light/dark theme toggle, warm/blue color theme toggle, Download button |
| Mobile | Drawer with the same homepage links and controls |

## 2. Hero

**Component:** `src/components/Hero.astro`

- Badge: `Privacy-first · Runs locally · No accounts`
- Badge icon: lock icon
- Headline: `Private Conversation Intelligence for Your Desktop`
- Supporting line: private conversation memory before, during, and after
- Primary CTA: `Download`
- Secondary CTA: `See How It Works`
- Visual: desktop dashboard screenshot placeholder with Live Context Card overlay

## 3. Social Proof

**Component:** `src/components/SocialProof.astro`

Shows short proof/stat chips around bot-free capture, local operation, lifecycle pillars, and user-controlled processing.

## 4. Live Context Cards

**Component:** `src/components/LiveDemo.astro`

Repurposed from a before/after demo into the signature TalkBar experience:

- Memory Card
- Document Card
- Suggested Question Card
- Fact Check Card
- Blind Spot Card
- Action Card

Cards should stay source-backed and trust-oriented, with source, timestamp, confidence, and action affordances.

## 5. Pre-Meeting Briefing

**Component:** `src/components/PriceMonitoring.astro`

Uses existing screenshot/mock placeholders where possible and presents:

- Strategic pre-meeting briefing
- Profile consolidation
- Open item tracking
- Suggested agenda generation
- Document excerpt surfacing
- Role-specific briefing templates
- Plain-English AI focus instructions

## 6. Product Feature Bento

**Component:** `src/components/Spotlights.astro`

Core feature grid:

- Bot-free capture
- Strategic briefing
- Live Context Cards
- Searchable conversation memory
- Document integration
- Automated action items
- Custom vocabulary
- BYOK or local AI core

## 7. Conversation Lifecycle

**Component:** `src/components/Workflows.astro`

Explains TalkBar across:

- Before the call
- During the call
- After the call

## 8. Use Cases

**Component:** `src/components/UseCases.astro`

Professional use cases:

- Venture and private equity
- Legal counsel and M&A advisors
- Executive leadership and chiefs of staff
- B2B sales and customer success
- Consultants and advisors
- Product research and recruiting

## 9. Role Cards

**Component:** `src/components/Industries.astro`

Homepage role/framework cards for TalkBar users. These cards should not link to old public deep pages during this homepage-first pass.

## 10. How It Works

**Component:** `src/components/HowItWorks.astro`

Five setup steps:

1. Choose your workflow profile
2. Configure desktop audio
3. Link your private knowledge
4. Talk normally
5. Export what matters

## 11. Under the Hood

**Component:** `src/components/FeaturesGrid.astro`

Technical capability grid for native desktop, local memory, retrieval, local AI support, BYOK, and exports.

## 12. Privacy Compare

**Component:** `src/components/PrivacyCompare.astro`

Compare TalkBar with cloud meeting bots and browser-only tools. Keep the language careful and privacy-first.

## 13. FAQ

**Component:** `src/components/FAQ.astro`

Answers common questions about TalkBar, bot-free capture, local AI, external providers, searchable memory, document linking, exports, and target users.

## 14. CTA

**Component:** `src/components/CTASection.astro`

Final conversion section:

- Headline about bringing private memory into every conversation
- CTA button: `Download`
- Proof line: `Privacy-first · Runs locally · No accounts`

## 15. Footer

**Component:** `src/components/Footer.astro`

Footer is always dark and should use only dark TalkBar logo assets. Links should remain scoped to homepage sections plus support/contact email links.
