import type { ImageMetadata } from 'astro';

// Every product screenshot on the site comes from this registry, by id.
//
// To replace a screenshot, point its import at the new file and set
// `temp: false`. Temporary entries carry a small "Temp · <id>" label on the
// page so a slot can be named when asking for a swap. Set SHOW_TEMP_LABELS to
// false to hide every label at once.
//
// Where each id is used:
//   session-setup       Preparation (home), slideshow, privacy page
//   session-schedule    slideshow
//   live-focus          While you talk: "Your card, on cue" (home), use-case heroes, slideshow
//   live-transcript     use-case feature block 1
//   live-translation    While you talk: "Ask TalkBar" (home), slideshow
//   live-summary        While you talk: "Action item, back on the table" (home)
//   session-overview    After the call (home), slideshow
//   knowledge-review    Knowledge (home), use-case feature block 1, slideshow
//   knowledge-cards     slideshow
//   knowledge-source    While you talk: "Back to the source" (home), use-case feature block 2
//   documents           slideshow
//   chat-sources        Ask TalkBar (home), slideshow
//   templates-settings  slideshow
//   private-ai          slideshow, privacy page
//   setup-ai            slideshow, privacy page
//
//   Use-case Examples panels cycle through live-translation, session-overview,
//   knowledge-review, and chat-sources (UseCaseExamples.astro).
//
// A `video` field can join an entry later; nothing renders it yet.

import sessionSetup from '../assets/screenshots/temporary/talkbar-sceenshots/1-session-new/live.png';
import sessionSchedule from '../assets/screenshots/temporary/talkbar-sceenshots/1-session-new/schedule.png';
import liveTranscript from '../assets/screenshots/temporary/talkbar-sceenshots/2-session-live/1-transcript.png';
import liveTranslation from '../assets/screenshots/temporary/talkbar-sceenshots/2-session-live/2-translations.png';
import liveFocus from '../assets/screenshots/temporary/talkbar-sceenshots/2-session-live/3-focus.png';
import liveSummary from '../assets/screenshots/temporary/talkbar-sceenshots/2-session-live/4-summary.png';
import sessionOverview from '../assets/screenshots/temporary/talkbar-sceenshots/3-session-details/1-overview.png';
import knowledgeReview from '../assets/screenshots/temporary/talkbar-sceenshots/4-knowledge/1-suggestions.png';
import knowledgeCards from '../assets/screenshots/temporary/talkbar-sceenshots/4-knowledge/2-memory-cards.png';
import knowledgeSource from '../assets/screenshots/temporary/talkbar-sceenshots/4-knowledge/3-memory-card-details.png';
import documents from '../assets/screenshots/temporary/talkbar-sceenshots/5-documents/documents.png';
import chatSources from '../assets/screenshots/temporary/talkbar-sceenshots/5-documents/document-chat.png';
import templatesSettings from '../assets/screenshots/temporary/talkbar-sceenshots/7-settings/session-templates.png';
import privateAi from '../assets/screenshots/temporary/talkbar-sceenshots/7-settings/private-ai.png';
import setupAi from '../assets/screenshots/temporary/talkbar-sceenshots/7-settings/setup-ai.png';

export const SHOW_TEMP_LABELS = true;

export interface ScreenshotEntry {
  src: ImageMetadata;
  /** en.ts key for the image's alt text. */
  altKey: string;
  /** en.ts key for the short caption in the slideshow. */
  captionKey: string;
  /** Still a stand-in; shows the "Temp · <id>" label. */
  temp: boolean;
}

const entry = (id: string, src: ImageMetadata, temp = true): ScreenshotEntry => ({
  src,
  altKey: `shot.${id}.alt`,
  captionKey: `shot.${id}.caption`,
  temp,
});

export const SCREENSHOTS = {
  'session-setup': entry('session-setup', sessionSetup),
  'session-schedule': entry('session-schedule', sessionSchedule),
  'live-transcript': entry('live-transcript', liveTranscript),
  'live-translation': entry('live-translation', liveTranslation),
  'live-focus': entry('live-focus', liveFocus),
  'live-summary': entry('live-summary', liveSummary),
  'session-overview': entry('session-overview', sessionOverview),
  'knowledge-review': entry('knowledge-review', knowledgeReview),
  'knowledge-cards': entry('knowledge-cards', knowledgeCards),
  'knowledge-source': entry('knowledge-source', knowledgeSource),
  documents: entry('documents', documents),
  'chat-sources': entry('chat-sources', chatSources),
  'templates-settings': entry('templates-settings', templatesSettings),
  'private-ai': entry('private-ai', privateAi),
  'setup-ai': entry('setup-ai', setupAi),
} satisfies Record<string, ScreenshotEntry>;

export type ShotId = keyof typeof SCREENSHOTS;

/** Slideshow order: the product in the order a session happens. */
export const GALLERY_SHOTS: ShotId[] = [
  'session-setup',
  'session-schedule',
  'live-focus',
  'live-translation',
  'session-overview',
  'knowledge-review',
  'knowledge-cards',
  'documents',
  'chat-sources',
  'templates-settings',
  'setup-ai',
  'private-ai',
];

export const PRIVACY_GALLERY_SHOTS: ShotId[] = ['setup-ai', 'private-ai', 'session-setup'];

export const showTempLabel = (id: ShotId) => SHOW_TEMP_LABELS && SCREENSHOTS[id].temp;
