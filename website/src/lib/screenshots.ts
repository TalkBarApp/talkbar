import type { ImageMetadata } from "astro";

// Every product screenshot on the site comes from this registry, by id.
//
// To replace a screenshot, point its import at the new file and set
// `temp: false`. Temporary entries carry a small "Temp · <id>" label on the
// page so a slot can be named when asking for a swap. Set SHOW_TEMP_LABELS to
// false to hide every label at once.
//
// Where each id is used:
//   session-setup       Preparation (home), slideshow, privacy page. Final pair:
//                       session-prepare-en.png (light) and session-prepare-dark-en.png.
//   session-schedule    slideshow
//   live-focus          While you talk: "Knowledge Cards that help" (home), use-case heroes, slideshow.
//                       Final pair: knowledge-cards-session-en.png and knowledge-cards-session-en-dark.png.
//   live-transcript     use-case feature block 1
//   live-translation    While you talk: "Ask TalkBar" (home), slideshow
//   live-summary        While you talk: "Decisions and follow-ups" (home)
//   session-overview    After the call (home), slideshow, use-case examples.
//                       Final pair: session-details-en.png (light) and session-details-en-dark.png.
//   knowledge-review    Knowledge (home), use-case feature block 1, slideshow
//   knowledge-cards     slideshow
//   knowledge-source    While you talk: "Notes, as you talk" (home), use-case feature block 2.
//                       Final pair: notes-en.png (light) and notes-en-dark.png.
//   documents           slideshow
//   chat-sources        Ask TalkBar (home), slideshow
//   templates-settings  slideshow
//   private-ai          slideshow, privacy page
//   setup-ai            slideshow, privacy page
//   home-mint           slideshow (mint frame)
//   home-hero           homepage hero (final): home-en.png light, home-en-dark.png dark
//   home-peach          slideshow (peach frame)
//   settings-framed     slideshow (General, framed crop)
//   settings-framed-lg  slideshow (same crop, larger export)
//   settings-window     slideshow (General, full window)
//   settings-frame-win  slideshow (General, framed window)
//   topics-keywords     slideshow (Topics & Keywords, framed window)
//
//   Use-case Examples panels cycle through live-translation, session-overview,
//   knowledge-review, and chat-sources (UseCaseExamples.astro).
//
// A `video` field can join an entry later; nothing renders it yet.

import sessionSetup from "../assets/screenshots/temporary/talkbar-new/session-prepare-en.png";
import sessionSetupDark from "../assets/screenshots/temporary/talkbar-new/session-prepare-dark-en.png";
import sessionSchedule from "../assets/screenshots/temporary/talkbar-sceenshots/1-session-new/schedule.png";
import liveTranscript from "../assets/screenshots/temporary/talkbar-sceenshots/2-session-live/1-transcript.png";
import liveTranslation from "../assets/screenshots/temporary/talkbar-sceenshots/2-session-live/2-translations.png";
import liveFocus from "../assets/screenshots/temporary/talkbar-new/knowledge-cards-session-en.png";
import liveFocusDark from "../assets/screenshots/temporary/talkbar-new/knowledge-cards-session-en-dark.png";
import liveSummary from "../assets/screenshots/temporary/talkbar-sceenshots/2-session-live/4-summary.png";
import sessionOverview from "../assets/screenshots/temporary/talkbar-new/session-details-en3.png";
import sessionOverviewDark from "../assets/screenshots/temporary/talkbar-new/session-details-en-dark4.png";
import knowledgeReview from "../assets/screenshots/temporary/talkbar-sceenshots/4-knowledge/1-suggestions.png";
import knowledgeCards from "../assets/screenshots/temporary/talkbar-sceenshots/4-knowledge/2-memory-cards.png";
import knowledgeSource from "../assets/screenshots/temporary/talkbar-new/notes-en.png";
import knowledgeSourceDark from "../assets/screenshots/temporary/talkbar-new/notes-en-dark.png";
import documents from "../assets/screenshots/temporary/talkbar-sceenshots/5-documents/documents.png";
import chatSources from "../assets/screenshots/temporary/talkbar-sceenshots/5-documents/document-chat.png";
import templatesSettings from "../assets/screenshots/temporary/talkbar-sceenshots/7-settings/session-templates.png";
import privateAi from "../assets/screenshots/temporary/talkbar-sceenshots/7-settings/private-ai.png";
import setupAi from "../assets/screenshots/temporary/talkbar-sceenshots/7-settings/setup-ai.png";
import homeMint from "../assets/screenshots/temporary/talkbar-new/shotcandy-2011x1490@1x.png";
import homeHero from "../assets/screenshots/temporary/talkbar-new/home-en.png";
import homeHeroDark from "../assets/screenshots/temporary/talkbar-new/home-en-dark.png";
import homePeach from "../assets/screenshots/temporary/talkbar-new/shotcandy-2011x1490@1x (1).png";
import settingsFramed from "../assets/screenshots/temporary/talkbar-new/shotcandy-2011x1490@1x (2).png";
import settingsFramedLg from "../assets/screenshots/temporary/talkbar-new/shotcandy-4022x2980@2x.png";
import settingsWindow from "../assets/screenshots/temporary/talkbar-new/shotcandy-5548x4060@2x.png";
import settingsFrameWin from "../assets/screenshots/temporary/talkbar-new/shotcandy-5758x4270@2x.png";
import topicsKeywords from "../assets/screenshots/temporary/talkbar-new/shotcandy-4746x3496@2x.png";

export const SHOW_TEMP_LABELS = true;

export interface ScreenshotEntry {
  src: ImageMetadata;
  /** Dark-theme file. Shown when the page has the `dark` class. */
  srcDark?: ImageMetadata;
  /** en.ts key for the image's alt text. */
  altKey: string;
  /** en.ts key for the short caption in the slideshow. */
  captionKey: string;
  /** Still a stand-in; shows the "Temp · <id>" label. */
  temp: boolean;
}

const entry = (
  id: string,
  src: ImageMetadata,
  temp = true,
): ScreenshotEntry => ({
  src,
  altKey: `shot.${id}.alt`,
  captionKey: `shot.${id}.caption`,
  temp,
});

export const SCREENSHOTS = {
  "session-setup": {
    ...entry("session-setup", sessionSetup, false),
    srcDark: sessionSetupDark,
  },
  "session-schedule": entry("session-schedule", sessionSchedule),
  "live-transcript": entry("live-transcript", liveTranscript),
  "live-translation": entry("live-translation", liveTranslation),
  "live-focus": {
    ...entry("live-focus", liveFocus, false),
    srcDark: liveFocusDark,
  },
  "live-summary": entry("live-summary", liveSummary),
  "session-overview": {
    ...entry("session-overview", sessionOverview, false),
    srcDark: sessionOverviewDark,
  },
  "knowledge-review": entry("knowledge-review", knowledgeReview),
  "knowledge-cards": entry("knowledge-cards", knowledgeCards),
  "knowledge-source": {
    ...entry("knowledge-source", knowledgeSource, false),
    srcDark: knowledgeSourceDark,
  },
  documents: entry("documents", documents),
  "chat-sources": entry("chat-sources", chatSources),
  "templates-settings": entry("templates-settings", templatesSettings),
  "private-ai": entry("private-ai", privateAi),
  "setup-ai": entry("setup-ai", setupAi),
  "home-mint": entry("home-mint", homeMint),
  "home-hero": {
    ...entry("home-hero", homeHero, false),
    srcDark: homeHeroDark,
  },
  "home-peach": entry("home-peach", homePeach),
  "settings-framed": entry("settings-framed", settingsFramed),
  "settings-framed-lg": entry("settings-framed-lg", settingsFramedLg),
  "settings-window": entry("settings-window", settingsWindow),
  "settings-frame-win": entry("settings-frame-win", settingsFrameWin),
  "topics-keywords": entry("topics-keywords", topicsKeywords),
} satisfies Record<string, ScreenshotEntry>;

export type ShotId = keyof typeof SCREENSHOTS;

/** Slideshow order: the product in the order a session happens. */
export const GALLERY_SHOTS: ShotId[] = [
  "home-mint",
  "home-peach",
  "settings-framed",
  "settings-framed-lg",
  "settings-window",
  "settings-frame-win",
  "topics-keywords",
  "session-setup",
  "session-schedule",
  "live-focus",
  "live-translation",
  "session-overview",
  "knowledge-review",
  "knowledge-cards",
  "documents",
  "chat-sources",
  "templates-settings",
  "setup-ai",
  "private-ai",
];

export const PRIVACY_GALLERY_SHOTS: ShotId[] = [
  "setup-ai",
  "private-ai",
  "session-setup",
];

export const showTempLabel = (id: ShotId) =>
  SHOW_TEMP_LABELS && SCREENSHOTS[id].temp;
