import type { ImageMetadata } from 'astro';

// Every product screenshot on the site comes from this registry, by id.
//
// To replace a screenshot, point its import at the new file and set
// `temp: false`. Temporary entries carry a small "Temp · <id>" label on the
// page so a slot can be named when asking for a swap. Set SHOW_TEMP_LABELS to
// false to hide every label at once.
//
// Where each id is used:
//   Every product slot below ships four files in talkbar-new/:
//   <id>-en.png, <id>-en-dark.png, <id>-ru.png, <id>-ru-dark.png
//   (English UI light/dark, Russian UI light/dark; the Russian pair is used
//   on the /ru build only).
//   session-setup       Preparation (home), slideshow, privacy page
//   session-schedule    slideshow
//   live-transcript     use-case feature block 1, slideshow
//   live-focus          While you talk: "Knowledge Cards in a call" (home), use-case heroes, slideshow
//   knowledge-source    While you talk: "Notes, as you talk" (home), use-case feature block 2, slideshow
//   live-translation    While you talk: "Ask during a call" (home), slideshow
//   live-summary        While you talk: "Decisions and follow-ups" (home), slideshow
//   session-overview    After the call (home), slideshow, use-case examples
//   knowledge-review    Knowledge (home), use-case feature block 1, slideshow
//   knowledge-cards     slideshow
//   documents           slideshow
//   chat-sources        Ask TalkBar (home), slideshow
//   templates-settings  slideshow
//   topics-keywords     slideshow
//   settings-window     slideshow
//   setup-ai            slideshow, privacy page
//   private-ai          slideshow, privacy page
//   home-hero           homepage hero, Hero.astro: home-en.png, home-en-dark.png,
//                       home-ru.png, home-ru-dark.png
//   home-mint, home-peach, settings-framed, settings-framed-lg,
//   settings-frame-win  older experiments, no longer in the slideshow.
//
//   Use-case Examples panels cycle through live-translation, session-overview,
//   knowledge-review, and chat-sources (UseCaseExamples.astro).
//
// A `video` field can join an entry later; nothing renders it yet.

import homeMint from '../assets/screenshots/temporary/talkbar-new/shotcandy-2011x1490@1x.png';
import homeHero from '../assets/screenshots/temporary/talkbar-new/home-en.png';
import homeHeroDark from '../assets/screenshots/temporary/talkbar-new/home-en-dark.png';
import homeHeroRu from '../assets/screenshots/temporary/talkbar-new/home-ru.png';
import homeHeroRuDark from '../assets/screenshots/temporary/talkbar-new/home-ru-dark.png';
import homePeach from '../assets/screenshots/temporary/talkbar-new/shotcandy-2011x1490@1x (1).png';
import settingsFramed from '../assets/screenshots/temporary/talkbar-new/shotcandy-2011x1490@1x (2).png';
import settingsFramedLg from '../assets/screenshots/temporary/talkbar-new/shotcandy-4022x2980@2x.png';
import settingsFrameWin from '../assets/screenshots/temporary/talkbar-new/shotcandy-5758x4270@2x.png';
import sessionSetup from '../assets/screenshots/temporary/talkbar-new/session-setup-en.png';
import sessionSetupDark from '../assets/screenshots/temporary/talkbar-new/session-setup-en-dark.png';
import sessionSchedule from '../assets/screenshots/temporary/talkbar-new/session-schedule-en.png';
import sessionScheduleDark from '../assets/screenshots/temporary/talkbar-new/session-schedule-en-dark.png';
import liveTranscript from '../assets/screenshots/temporary/talkbar-new/live-transcript-en.png';
import liveTranscriptDark from '../assets/screenshots/temporary/talkbar-new/live-transcript-en-dark.png';
import liveTranslation from '../assets/screenshots/temporary/talkbar-new/live-translation-en.png';
import liveTranslationDark from '../assets/screenshots/temporary/talkbar-new/live-translation-en-dark.png';
import liveFocus from '../assets/screenshots/temporary/talkbar-new/live-focus-en.png';
import liveFocusDark from '../assets/screenshots/temporary/talkbar-new/live-focus-en-dark.png';
import liveSummary from '../assets/screenshots/temporary/talkbar-new/live-summary-en.png';
import liveSummaryDark from '../assets/screenshots/temporary/talkbar-new/live-summary-en-dark.png';
import sessionOverview from '../assets/screenshots/temporary/talkbar-new/session-overview-en.png';
import sessionOverviewDark from '../assets/screenshots/temporary/talkbar-new/session-overview-en-dark.png';
import knowledgeReview from '../assets/screenshots/temporary/talkbar-new/knowledge-review-en.png';
import knowledgeReviewDark from '../assets/screenshots/temporary/talkbar-new/knowledge-review-en-dark.png';
import knowledgeCards from '../assets/screenshots/temporary/talkbar-new/knowledge-cards-en.png';
import knowledgeCardsDark from '../assets/screenshots/temporary/talkbar-new/knowledge-cards-en-dark.png';
import knowledgeSource from '../assets/screenshots/temporary/talkbar-new/knowledge-source-en.png';
import knowledgeSourceDark from '../assets/screenshots/temporary/talkbar-new/knowledge-source-en-dark.png';
import documents from '../assets/screenshots/temporary/talkbar-new/documents-en.png';
import documentsDark from '../assets/screenshots/temporary/talkbar-new/documents-en-dark.png';
import chatSources from '../assets/screenshots/temporary/talkbar-new/chat-sources-en.png';
import chatSourcesDark from '../assets/screenshots/temporary/talkbar-new/chat-sources-en-dark.png';
import templatesSettings from '../assets/screenshots/temporary/talkbar-new/templates-settings-en.png';
import templatesSettingsDark from '../assets/screenshots/temporary/talkbar-new/templates-settings-en-dark.png';
import privateAi from '../assets/screenshots/temporary/talkbar-new/private-ai-en.png';
import privateAiDark from '../assets/screenshots/temporary/talkbar-new/private-ai-en-dark.png';
import setupAi from '../assets/screenshots/temporary/talkbar-new/setup-ai-en.png';
import setupAiDark from '../assets/screenshots/temporary/talkbar-new/setup-ai-en-dark.png';
import settingsWindow from '../assets/screenshots/temporary/talkbar-new/settings-window-en.png';
import settingsWindowDark from '../assets/screenshots/temporary/talkbar-new/settings-window-en-dark.png';
import topicsKeywords from '../assets/screenshots/temporary/talkbar-new/topics-keywords-en.png';
import topicsKeywordsDark from '../assets/screenshots/temporary/talkbar-new/topics-keywords-en-dark.png';
import sessionSetupRu from '../assets/screenshots/temporary/talkbar-new/session-setup-ru.png';
import sessionSetupRuDark from '../assets/screenshots/temporary/talkbar-new/session-setup-ru-dark.png';
import sessionScheduleRu from '../assets/screenshots/temporary/talkbar-new/session-schedule-ru.png';
import sessionScheduleRuDark from '../assets/screenshots/temporary/talkbar-new/session-schedule-ru-dark.png';
import liveTranscriptRu from '../assets/screenshots/temporary/talkbar-new/live-transcript-ru.png';
import liveTranscriptRuDark from '../assets/screenshots/temporary/talkbar-new/live-transcript-ru-dark.png';
import liveTranslationRu from '../assets/screenshots/temporary/talkbar-new/live-translation-ru.png';
import liveTranslationRuDark from '../assets/screenshots/temporary/talkbar-new/live-translation-ru-dark.png';
import liveFocusRu from '../assets/screenshots/temporary/talkbar-new/live-focus-ru.png';
import liveFocusRuDark from '../assets/screenshots/temporary/talkbar-new/live-focus-ru-dark.png';
import liveSummaryRu from '../assets/screenshots/temporary/talkbar-new/live-summary-ru.png';
import liveSummaryRuDark from '../assets/screenshots/temporary/talkbar-new/live-summary-ru-dark.png';
import sessionOverviewRu from '../assets/screenshots/temporary/talkbar-new/session-overview-ru.png';
import sessionOverviewRuDark from '../assets/screenshots/temporary/talkbar-new/session-overview-ru-dark.png';
import knowledgeReviewRu from '../assets/screenshots/temporary/talkbar-new/knowledge-review-ru.png';
import knowledgeReviewRuDark from '../assets/screenshots/temporary/talkbar-new/knowledge-review-ru-dark.png';
import knowledgeCardsRu from '../assets/screenshots/temporary/talkbar-new/knowledge-cards-ru.png';
import knowledgeCardsRuDark from '../assets/screenshots/temporary/talkbar-new/knowledge-cards-ru-dark.png';
import knowledgeSourceRu from '../assets/screenshots/temporary/talkbar-new/knowledge-source-ru.png';
import knowledgeSourceRuDark from '../assets/screenshots/temporary/talkbar-new/knowledge-source-ru-dark.png';
import documentsRu from '../assets/screenshots/temporary/talkbar-new/documents-ru.png';
import documentsRuDark from '../assets/screenshots/temporary/talkbar-new/documents-ru-dark.png';
import chatSourcesRu from '../assets/screenshots/temporary/talkbar-new/chat-sources-ru.png';
import chatSourcesRuDark from '../assets/screenshots/temporary/talkbar-new/chat-sources-ru-dark.png';
import templatesSettingsRu from '../assets/screenshots/temporary/talkbar-new/templates-settings-ru.png';
import templatesSettingsRuDark from '../assets/screenshots/temporary/talkbar-new/templates-settings-ru-dark.png';
import privateAiRu from '../assets/screenshots/temporary/talkbar-new/private-ai-ru.png';
import privateAiRuDark from '../assets/screenshots/temporary/talkbar-new/private-ai-ru-dark.png';
import setupAiRu from '../assets/screenshots/temporary/talkbar-new/setup-ai-ru.png';
import setupAiRuDark from '../assets/screenshots/temporary/talkbar-new/setup-ai-ru-dark.png';
import settingsWindowRu from '../assets/screenshots/temporary/talkbar-new/settings-window-ru.png';
import settingsWindowRuDark from '../assets/screenshots/temporary/talkbar-new/settings-window-ru-dark.png';
import topicsKeywordsRu from '../assets/screenshots/temporary/talkbar-new/topics-keywords-ru.png';
import topicsKeywordsRuDark from '../assets/screenshots/temporary/talkbar-new/topics-keywords-ru-dark.png';

export const SHOW_TEMP_LABELS = true;

export interface ScreenshotEntry {
  src: ImageMetadata;
  /** Dark-theme file. Shown when the page has the `dark` class. */
  srcDark?: ImageMetadata;
  /** Russian UI, light. Used on /ru only. */
  srcRu?: ImageMetadata;
  /** Russian UI, dark. Used on /ru only. */
  srcRuDark?: ImageMetadata;
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
  'session-setup': {
    ...entry('session-setup', sessionSetup, false),
    srcDark: sessionSetupDark,
    srcRu: sessionSetupRu,
    srcRuDark: sessionSetupRuDark,
  },
  'session-schedule': {
    ...entry('session-schedule', sessionSchedule, false),
    srcDark: sessionScheduleDark,
    srcRu: sessionScheduleRu,
    srcRuDark: sessionScheduleRuDark,
  },
  'live-transcript': {
    ...entry('live-transcript', liveTranscript, false),
    srcDark: liveTranscriptDark,
    srcRu: liveTranscriptRu,
    srcRuDark: liveTranscriptRuDark,
  },
  'live-translation': {
    ...entry('live-translation', liveTranslation, false),
    srcDark: liveTranslationDark,
    srcRu: liveTranslationRu,
    srcRuDark: liveTranslationRuDark,
  },
  'live-focus': {
    ...entry('live-focus', liveFocus, false),
    srcDark: liveFocusDark,
    srcRu: liveFocusRu,
    srcRuDark: liveFocusRuDark,
  },
  'live-summary': {
    ...entry('live-summary', liveSummary, false),
    srcDark: liveSummaryDark,
    srcRu: liveSummaryRu,
    srcRuDark: liveSummaryRuDark,
  },
  'session-overview': {
    ...entry('session-overview', sessionOverview, false),
    srcDark: sessionOverviewDark,
    srcRu: sessionOverviewRu,
    srcRuDark: sessionOverviewRuDark,
  },
  'knowledge-review': {
    ...entry('knowledge-review', knowledgeReview, false),
    srcDark: knowledgeReviewDark,
    srcRu: knowledgeReviewRu,
    srcRuDark: knowledgeReviewRuDark,
  },
  'knowledge-cards': {
    ...entry('knowledge-cards', knowledgeCards, false),
    srcDark: knowledgeCardsDark,
    srcRu: knowledgeCardsRu,
    srcRuDark: knowledgeCardsRuDark,
  },
  'knowledge-source': {
    ...entry('knowledge-source', knowledgeSource, false),
    srcDark: knowledgeSourceDark,
    srcRu: knowledgeSourceRu,
    srcRuDark: knowledgeSourceRuDark,
  },
  documents: {
    ...entry('documents', documents, false),
    srcDark: documentsDark,
    srcRu: documentsRu,
    srcRuDark: documentsRuDark,
  },
  'chat-sources': {
    ...entry('chat-sources', chatSources, false),
    srcDark: chatSourcesDark,
    srcRu: chatSourcesRu,
    srcRuDark: chatSourcesRuDark,
  },
  'templates-settings': {
    ...entry('templates-settings', templatesSettings, false),
    srcDark: templatesSettingsDark,
    srcRu: templatesSettingsRu,
    srcRuDark: templatesSettingsRuDark,
  },
  'private-ai': {
    ...entry('private-ai', privateAi, false),
    srcDark: privateAiDark,
    srcRu: privateAiRu,
    srcRuDark: privateAiRuDark,
  },
  'setup-ai': {
    ...entry('setup-ai', setupAi, false),
    srcDark: setupAiDark,
    srcRu: setupAiRu,
    srcRuDark: setupAiRuDark,
  },
  'home-mint': entry('home-mint', homeMint),
  'home-hero': {
    ...entry('home-hero', homeHero, false),
    srcDark: homeHeroDark,
    srcRu: homeHeroRu,
    srcRuDark: homeHeroRuDark,
  },
  'home-peach': entry('home-peach', homePeach),
  'settings-framed': entry('settings-framed', settingsFramed),
  'settings-framed-lg': entry('settings-framed-lg', settingsFramedLg),
  'settings-window': {
    ...entry('settings-window', settingsWindow, false),
    srcDark: settingsWindowDark,
    srcRu: settingsWindowRu,
    srcRuDark: settingsWindowRuDark,
  },
  'settings-frame-win': entry('settings-frame-win', settingsFrameWin),
  'topics-keywords': {
    ...entry('topics-keywords', topicsKeywords, false),
    srcDark: topicsKeywordsDark,
    srcRu: topicsKeywordsRu,
    srcRuDark: topicsKeywordsRuDark,
  },
} satisfies Record<string, ScreenshotEntry>;

export type ShotId = keyof typeof SCREENSHOTS;

/** Slideshow order: the product in the order a session happens. */
export const GALLERY_SHOTS: ShotId[] = [
  'session-setup',
  'session-schedule',
  'live-transcript',
  'live-focus',
  'knowledge-source',
  'live-translation',
  'live-summary',
  'session-overview',
  'knowledge-review',
  'knowledge-cards',
  'documents',
  'chat-sources',
  'templates-settings',
  'topics-keywords',
  'settings-window',
  'setup-ai',
  'private-ai',
];

export const PRIVACY_GALLERY_SHOTS: ShotId[] = [
  'setup-ai',
  'private-ai',
  'session-setup',
];

export const showTempLabel = (id: ShotId) =>
  SHOW_TEMP_LABELS && SCREENSHOTS[id].temp;
