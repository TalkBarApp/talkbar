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
//   live-recording      slideshow (a live call: transcript, timeline, notes)
//   session-calendar    slideshow (upcoming sessions, week view)
//   session-start       slideshow (New session: template, audio, speakers, AI)
//   session-transcript  slideshow (transcript tab after a call)
//   session-search      slideshow (search inside one session)
//   sessions-list       slideshow (all sessions, with Up next)
//   global-search       slideshow (search across tasks, cards, sessions, notes)
//   speech-settings     slideshow, privacy page (on-device transcription)
//   mcp-access          slideshow, privacy page (what AI tools may read or change)
//   notes-list          slideshow (Notes page: pinned notes linked to sessions, topics)
//   note-templates-picker slideshow (choose a note template with live preview)
//   note-ai-draft       slideshow (AI fills a note template from the linked session)
//   note-standup        slideshow (daily standup note with checklist)
//   note-brainstorm     slideshow (brainstorm note filled by AI)
//   note-insert-menu    slideshow (/ insert menu: YouTube, voice memo, poll, Ask AI…)
//   notes-menu          slideshow (note actions: link, topic, share, Markdown export)
//   note-templates-settings slideshow (Settings → Note templates)
//   project-overview    slideshow (project page: sessions, open tasks, cards)
//   action-items-board  slideshow (Knowledge → Action items board)
//   action-item-edit    slideshow (Edit Action item dialog)
//   projects-settings   slideshow (Settings → Projects)
//   action-item-labels  slideshow (Settings → Action item labels)
//   knowledge-extract   slideshow (scan a session or document for knowledge cards)
//   knowledge-drafts    slideshow (review AI-drafted cards on a session)
//   skills-settings     slideshow (Settings → Skills: before/during/after a session)
//   dictation-settings  slideshow (Settings → Voice → Dictation)
//   data-backup         slideshow, privacy page (local data, backup, recovery code)
//
//   The Russian files for session-overview, live-translation, chat-sources,
//   live-summary, knowledge-review, knowledge-cards
//   and the new session ids use the Russian demo session
//   "Яндекс Станция: дизайн, звук и проверка" (*-ru-v2.png, action-items-ru*.png).
//   home-hero           homepage hero, Hero.astro: home-en.png, home-en-dark.png,
//                       home-ru.png, home-ru-dark.png
//
//   Use-case Examples panels cycle through live-translation, session-overview,
//   knowledge-review, and chat-sources (UseCaseExamples.astro).
//
// A `video` field can join an entry later; nothing renders it yet.

import homeHero from '../assets/screenshots/temporary/talkbar-new/home-en.png';
import homeHeroDark from '../assets/screenshots/temporary/talkbar-new/home-en-dark.png';
import homeHeroRu from '../assets/screenshots/temporary/talkbar-new/home-ru.png';
import homeHeroRuDark from '../assets/screenshots/temporary/talkbar-new/home-ru-dark.png';
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
import templatesSettings from '../assets/screenshots/temporary/talkbar-new/templates-settings-en-v2.png';
import templatesSettingsDark from '../assets/screenshots/temporary/talkbar-new/templates-settings-en-dark-v2.png';
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
import liveFocusRu from '../assets/screenshots/temporary/talkbar-new/live-focus-ru.png';
import liveFocusRuDark from '../assets/screenshots/temporary/talkbar-new/live-focus-ru-dark.png';
import knowledgeReviewRuV2 from '../assets/screenshots/temporary/talkbar-new/knowledge-review-ru-v2.png';
import knowledgeReviewRuDarkV2 from '../assets/screenshots/temporary/talkbar-new/knowledge-review-ru-dark-v2.png';
import knowledgeCardsRuV2 from '../assets/screenshots/temporary/talkbar-new/knowledge-cards-ru-v2.png';
import knowledgeCardsRuDarkV2 from '../assets/screenshots/temporary/talkbar-new/knowledge-cards-ru-dark-v2.png';
import knowledgeSourceRu from '../assets/screenshots/temporary/talkbar-new/knowledge-source-ru.png';
import knowledgeSourceRuDark from '../assets/screenshots/temporary/talkbar-new/knowledge-source-ru-dark.png';
import documentsRu from '../assets/screenshots/temporary/talkbar-new/documents-ru.png';
import documentsRuDark from '../assets/screenshots/temporary/talkbar-new/documents-ru-dark.png';
import templatesSettingsRu from '../assets/screenshots/temporary/talkbar-new/templates-settings-ru-v2.png';
import templatesSettingsRuDark from '../assets/screenshots/temporary/talkbar-new/templates-settings-ru-dark-v2.png';
import privateAiRu from '../assets/screenshots/temporary/talkbar-new/private-ai-ru.png';
import privateAiRuDark from '../assets/screenshots/temporary/talkbar-new/private-ai-ru-dark.png';
import setupAiRu from '../assets/screenshots/temporary/talkbar-new/setup-ai-ru.png';
import setupAiRuDark from '../assets/screenshots/temporary/talkbar-new/setup-ai-ru-dark.png';
import settingsWindowRu from '../assets/screenshots/temporary/talkbar-new/settings-window-ru.png';
import settingsWindowRuDark from '../assets/screenshots/temporary/talkbar-new/settings-window-ru-dark.png';
import topicsKeywordsRu from '../assets/screenshots/temporary/talkbar-new/topics-keywords-ru.png';
import topicsKeywordsRuDark from '../assets/screenshots/temporary/talkbar-new/topics-keywords-ru-dark.png';

import liveRecording from '../assets/screenshots/temporary/talkbar-new/live-recording-en.png';
import liveRecordingDark from '../assets/screenshots/temporary/talkbar-new/live-recording-en-dark.png';
import liveRecordingRu from '../assets/screenshots/temporary/talkbar-new/live-recording-ru.png';
import liveRecordingRuDark from '../assets/screenshots/temporary/talkbar-new/live-recording-ru-dark.png';
import sessionCalendar from '../assets/screenshots/temporary/talkbar-new/session-calendar-en.png';
import sessionCalendarDark from '../assets/screenshots/temporary/talkbar-new/session-calendar-en-dark.png';
import sessionCalendarRu from '../assets/screenshots/temporary/talkbar-new/session-calendar-ru.png';
import sessionCalendarRuDark from '../assets/screenshots/temporary/talkbar-new/session-calendar-ru-dark.png';
import sessionStart from '../assets/screenshots/temporary/talkbar-new/session-start-en.png';
import sessionStartDark from '../assets/screenshots/temporary/talkbar-new/session-start-en-dark.png';
import sessionStartRu from '../assets/screenshots/temporary/talkbar-new/session-start-ru.png';
import sessionStartRuDark from '../assets/screenshots/temporary/talkbar-new/session-start-ru-dark.png';
import sessionTranscript from '../assets/screenshots/temporary/talkbar-new/session-transcript-en.png';
import sessionTranscriptDark from '../assets/screenshots/temporary/talkbar-new/session-transcript-en-dark.png';
import sessionTranscriptRu from '../assets/screenshots/temporary/talkbar-new/session-transcript-ru.png';
import sessionTranscriptRuDark from '../assets/screenshots/temporary/talkbar-new/session-transcript-ru-dark.png';
import sessionSearch from '../assets/screenshots/temporary/talkbar-new/session-search-en.png';
import sessionSearchDark from '../assets/screenshots/temporary/talkbar-new/session-search-en-dark.png';
import sessionSearchRu from '../assets/screenshots/temporary/talkbar-new/session-search-ru.png';
import sessionSearchRuDark from '../assets/screenshots/temporary/talkbar-new/session-search-ru-dark.png';
import sessionsList from '../assets/screenshots/temporary/talkbar-new/sessions-list-en.png';
import sessionsListDark from '../assets/screenshots/temporary/talkbar-new/sessions-list-en-dark.png';
import sessionsListRu from '../assets/screenshots/temporary/talkbar-new/sessions-list-ru.png';
import sessionsListRuDark from '../assets/screenshots/temporary/talkbar-new/sessions-list-ru-dark.png';
import globalSearch from '../assets/screenshots/temporary/talkbar-new/global-search-en.png';
import globalSearchDark from '../assets/screenshots/temporary/talkbar-new/global-search-en-dark.png';
import globalSearchRu from '../assets/screenshots/temporary/talkbar-new/global-search-ru.png';
import globalSearchRuDark from '../assets/screenshots/temporary/talkbar-new/global-search-ru-dark.png';
import speechSettings from '../assets/screenshots/temporary/talkbar-new/speech-settings-en.png';
import speechSettingsDark from '../assets/screenshots/temporary/talkbar-new/speech-settings-en-dark.png';
import speechSettingsRu from '../assets/screenshots/temporary/talkbar-new/speech-settings-ru.png';
import speechSettingsRuDark from '../assets/screenshots/temporary/talkbar-new/speech-settings-ru-dark.png';
import mcpAccess from '../assets/screenshots/temporary/talkbar-new/mcp-access-en.png';
import mcpAccessDark from '../assets/screenshots/temporary/talkbar-new/mcp-access-en-dark.png';
import mcpAccessRu from '../assets/screenshots/temporary/talkbar-new/mcp-access-ru.png';
import mcpAccessRuDark from '../assets/screenshots/temporary/talkbar-new/mcp-access-ru-dark.png';
import sessionOverviewRuV2 from '../assets/screenshots/temporary/talkbar-new/session-overview-ru-v2.png';
import sessionOverviewRuDarkV2 from '../assets/screenshots/temporary/talkbar-new/session-overview-ru-dark-v2.png';
import liveTranslationRuV2 from '../assets/screenshots/temporary/talkbar-new/live-translation-ru-v2.png';
import liveTranslationRuDarkV2 from '../assets/screenshots/temporary/talkbar-new/live-translation-ru-dark-v2.png';
import chatSourcesRuV2 from '../assets/screenshots/temporary/talkbar-new/chat-sources-ru-v3.png';
import chatSourcesRuDarkV2 from '../assets/screenshots/temporary/talkbar-new/chat-sources-ru-dark-v3.png';
import liveSummaryRuV2 from '../assets/screenshots/temporary/talkbar-new/action-items-ru.png';
import liveSummaryRuDarkV2 from '../assets/screenshots/temporary/talkbar-new/action-items-ru-dark.png';

import notesList from '../assets/screenshots/temporary/talkbar-new/notes-list-en.png';
import notesListDark from '../assets/screenshots/temporary/talkbar-new/notes-list-en-dark.png';
import notesListRu from '../assets/screenshots/temporary/talkbar-new/notes-list-ru.png';
import notesListRuDark from '../assets/screenshots/temporary/talkbar-new/notes-list-ru-dark.png';
import noteTemplatesPicker from '../assets/screenshots/temporary/talkbar-new/note-templates-picker-en.png';
import noteTemplatesPickerDark from '../assets/screenshots/temporary/talkbar-new/note-templates-picker-en-dark.png';
import noteTemplatesPickerRu from '../assets/screenshots/temporary/talkbar-new/note-templates-picker-ru.png';
import noteTemplatesPickerRuDark from '../assets/screenshots/temporary/talkbar-new/note-templates-picker-ru-dark.png';
import noteAiDraft from '../assets/screenshots/temporary/talkbar-new/note-ai-draft-en.png';
import noteAiDraftDark from '../assets/screenshots/temporary/talkbar-new/note-ai-draft-en-dark.png';
import noteAiDraftRu from '../assets/screenshots/temporary/talkbar-new/note-ai-draft-ru.png';
import noteAiDraftRuDark from '../assets/screenshots/temporary/talkbar-new/note-ai-draft-ru-dark.png';
import noteStandup from '../assets/screenshots/temporary/talkbar-new/note-standup-en.png';
import noteStandupDark from '../assets/screenshots/temporary/talkbar-new/note-standup-en-dark.png';
import noteStandupRu from '../assets/screenshots/temporary/talkbar-new/note-standup-ru.png';
import noteStandupRuDark from '../assets/screenshots/temporary/talkbar-new/note-standup-ru-dark.png';
import noteBrainstorm from '../assets/screenshots/temporary/talkbar-new/note-brainstorm-en.png';
import noteBrainstormDark from '../assets/screenshots/temporary/talkbar-new/note-brainstorm-en-dark.png';
import noteBrainstormRu from '../assets/screenshots/temporary/talkbar-new/note-brainstorm-ru.png';
import noteBrainstormRuDark from '../assets/screenshots/temporary/talkbar-new/note-brainstorm-ru-dark.png';
import noteInsertMenu from '../assets/screenshots/temporary/talkbar-new/note-insert-menu-en.png';
import noteInsertMenuDark from '../assets/screenshots/temporary/talkbar-new/note-insert-menu-en-dark.png';
import noteInsertMenuRu from '../assets/screenshots/temporary/talkbar-new/note-insert-menu-ru.png';
import noteInsertMenuRuDark from '../assets/screenshots/temporary/talkbar-new/note-insert-menu-ru-dark.png';
import notesMenu from '../assets/screenshots/temporary/talkbar-new/notes-menu-en.png';
import notesMenuDark from '../assets/screenshots/temporary/talkbar-new/notes-menu-en-dark.png';
import notesMenuRu from '../assets/screenshots/temporary/talkbar-new/notes-menu-ru.png';
import notesMenuRuDark from '../assets/screenshots/temporary/talkbar-new/notes-menu-ru-dark.png';
import noteTemplatesSettings from '../assets/screenshots/temporary/talkbar-new/note-templates-settings-en.png';
import noteTemplatesSettingsDark from '../assets/screenshots/temporary/talkbar-new/note-templates-settings-en-dark.png';
import noteTemplatesSettingsRu from '../assets/screenshots/temporary/talkbar-new/note-templates-settings-ru.png';
import noteTemplatesSettingsRuDark from '../assets/screenshots/temporary/talkbar-new/note-templates-settings-ru-dark.png';
import projectOverview from '../assets/screenshots/temporary/talkbar-new/project-overview-en.png';
import projectOverviewDark from '../assets/screenshots/temporary/talkbar-new/project-overview-en-dark.png';
import projectOverviewRu from '../assets/screenshots/temporary/talkbar-new/project-overview-ru.png';
import projectOverviewRuDark from '../assets/screenshots/temporary/talkbar-new/project-overview-ru-dark.png';
import actionItemsBoard from '../assets/screenshots/temporary/talkbar-new/action-items-board-en.png';
import actionItemsBoardRu from '../assets/screenshots/temporary/talkbar-new/action-items-board-ru.png';
import actionItemsBoardDark from '../assets/screenshots/temporary/talkbar-new/action-items-board-en-dark.png';
import actionItemsBoardRuDark from '../assets/screenshots/temporary/talkbar-new/action-items-board-ru-dark.png';
import actionItemEdit from '../assets/screenshots/temporary/talkbar-new/action-item-edit-en.png';
import actionItemEditRu from '../assets/screenshots/temporary/talkbar-new/action-item-edit-ru.png';
import actionItemEditDark from '../assets/screenshots/temporary/talkbar-new/action-item-edit-en-dark.png';
import actionItemEditRuDark from '../assets/screenshots/temporary/talkbar-new/action-item-edit-ru-dark.png';
import projectsSettings from '../assets/screenshots/temporary/talkbar-new/projects-settings-en.png';
import projectsSettingsRu from '../assets/screenshots/temporary/talkbar-new/projects-settings-ru.png';
import projectsSettingsDark from '../assets/screenshots/temporary/talkbar-new/projects-settings-en-dark.png';
import projectsSettingsRuDark from '../assets/screenshots/temporary/talkbar-new/projects-settings-ru-dark.png';
import actionItemLabels from '../assets/screenshots/temporary/talkbar-new/action-item-labels-en.png';
import actionItemLabelsRu from '../assets/screenshots/temporary/talkbar-new/action-item-labels-ru.png';
import actionItemLabelsDark from '../assets/screenshots/temporary/talkbar-new/action-item-labels-en-dark.png';
import actionItemLabelsRuDark from '../assets/screenshots/temporary/talkbar-new/action-item-labels-ru-dark.png';
import knowledgeExtract from '../assets/screenshots/temporary/talkbar-new/knowledge-extract-en.png';
import knowledgeExtractDark from '../assets/screenshots/temporary/talkbar-new/knowledge-extract-en-dark.png';
import knowledgeExtractRu from '../assets/screenshots/temporary/talkbar-new/knowledge-extract-ru.png';
import knowledgeExtractRuDark from '../assets/screenshots/temporary/talkbar-new/knowledge-extract-ru-dark.png';
import knowledgeDrafts from '../assets/screenshots/temporary/talkbar-new/knowledge-drafts-en.png';
import knowledgeDraftsDark from '../assets/screenshots/temporary/talkbar-new/knowledge-drafts-en-dark.png';
import knowledgeDraftsRu from '../assets/screenshots/temporary/talkbar-new/knowledge-drafts-ru.png';
import knowledgeDraftsRuDark from '../assets/screenshots/temporary/talkbar-new/knowledge-drafts-ru-dark.png';
import skillsSettings from '../assets/screenshots/temporary/talkbar-new/skills-settings-en.png';
import skillsSettingsDark from '../assets/screenshots/temporary/talkbar-new/skills-settings-en-dark.png';
import skillsSettingsRu from '../assets/screenshots/temporary/talkbar-new/skills-settings-ru.png';
import skillsSettingsRuDark from '../assets/screenshots/temporary/talkbar-new/skills-settings-ru-dark.png';
import dictationSettings from '../assets/screenshots/temporary/talkbar-new/dictation-settings-en.png';
import dictationSettingsDark from '../assets/screenshots/temporary/talkbar-new/dictation-settings-en-dark.png';
import dictationSettingsRu from '../assets/screenshots/temporary/talkbar-new/dictation-settings-ru.png';
import dictationSettingsRuDark from '../assets/screenshots/temporary/talkbar-new/dictation-settings-ru-dark.png';
import dataBackup from '../assets/screenshots/temporary/talkbar-new/data-backup-en.png';
import dataBackupDark from '../assets/screenshots/temporary/talkbar-new/data-backup-en-dark.png';
import dataBackupRu from '../assets/screenshots/temporary/talkbar-new/data-backup-ru.png';
import dataBackupRuDark from '../assets/screenshots/temporary/talkbar-new/data-backup-ru-dark.png';

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
    srcRu: liveTranslationRuV2,
    srcRuDark: liveTranslationRuDarkV2,
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
    srcRu: liveSummaryRuV2,
    srcRuDark: liveSummaryRuDarkV2,
  },
  'session-overview': {
    ...entry('session-overview', sessionOverview, false),
    srcDark: sessionOverviewDark,
    srcRu: sessionOverviewRuV2,
    srcRuDark: sessionOverviewRuDarkV2,
  },
  'knowledge-review': {
    ...entry('knowledge-review', knowledgeReview, false),
    srcDark: knowledgeReviewDark,
    srcRu: knowledgeReviewRuV2,
    srcRuDark: knowledgeReviewRuDarkV2,
  },
  'knowledge-cards': {
    ...entry('knowledge-cards', knowledgeCards, false),
    srcDark: knowledgeCardsDark,
    srcRu: knowledgeCardsRuV2,
    srcRuDark: knowledgeCardsRuDarkV2,
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
    srcRu: chatSourcesRuV2,
    srcRuDark: chatSourcesRuDarkV2,
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
  'home-hero': {
    ...entry('home-hero', homeHero, false),
    srcDark: homeHeroDark,
    srcRu: homeHeroRu,
    srcRuDark: homeHeroRuDark,
  },
  'settings-window': {
    ...entry('settings-window', settingsWindow, false),
    srcDark: settingsWindowDark,
    srcRu: settingsWindowRu,
    srcRuDark: settingsWindowRuDark,
  },
  'topics-keywords': {
    ...entry('topics-keywords', topicsKeywords, false),
    srcDark: topicsKeywordsDark,
    srcRu: topicsKeywordsRu,
    srcRuDark: topicsKeywordsRuDark,
  },
  'live-recording': {
    ...entry('live-recording', liveRecording, false),
    srcDark: liveRecordingDark,
    srcRu: liveRecordingRu,
    srcRuDark: liveRecordingRuDark,
  },
  'session-calendar': {
    ...entry('session-calendar', sessionCalendar, false),
    srcDark: sessionCalendarDark,
    srcRu: sessionCalendarRu,
    srcRuDark: sessionCalendarRuDark,
  },
  'session-start': {
    ...entry('session-start', sessionStart, false),
    srcDark: sessionStartDark,
    srcRu: sessionStartRu,
    srcRuDark: sessionStartRuDark,
  },
  'session-transcript': {
    ...entry('session-transcript', sessionTranscript, false),
    srcDark: sessionTranscriptDark,
    srcRu: sessionTranscriptRu,
    srcRuDark: sessionTranscriptRuDark,
  },
  'session-search': {
    ...entry('session-search', sessionSearch, false),
    srcDark: sessionSearchDark,
    srcRu: sessionSearchRu,
    srcRuDark: sessionSearchRuDark,
  },
  'sessions-list': {
    ...entry('sessions-list', sessionsList, false),
    srcDark: sessionsListDark,
    srcRu: sessionsListRu,
    srcRuDark: sessionsListRuDark,
  },
  'global-search': {
    ...entry('global-search', globalSearch, false),
    srcDark: globalSearchDark,
    srcRu: globalSearchRu,
    srcRuDark: globalSearchRuDark,
  },
  'speech-settings': {
    ...entry('speech-settings', speechSettings, false),
    srcDark: speechSettingsDark,
    srcRu: speechSettingsRu,
    srcRuDark: speechSettingsRuDark,
  },
  'mcp-access': {
    ...entry('mcp-access', mcpAccess, false),
    srcDark: mcpAccessDark,
    srcRu: mcpAccessRu,
    srcRuDark: mcpAccessRuDark,
  },
  'notes-list': {
    ...entry('notes-list', notesList, false),
    srcDark: notesListDark,
    srcRu: notesListRu,
    srcRuDark: notesListRuDark,
  },
  'note-templates-picker': {
    ...entry('note-templates-picker', noteTemplatesPicker, false),
    srcDark: noteTemplatesPickerDark,
    srcRu: noteTemplatesPickerRu,
    srcRuDark: noteTemplatesPickerRuDark,
  },
  'note-ai-draft': {
    ...entry('note-ai-draft', noteAiDraft, false),
    srcDark: noteAiDraftDark,
    srcRu: noteAiDraftRu,
    srcRuDark: noteAiDraftRuDark,
  },
  'note-standup': {
    ...entry('note-standup', noteStandup, false),
    srcDark: noteStandupDark,
    srcRu: noteStandupRu,
    srcRuDark: noteStandupRuDark,
  },
  'note-brainstorm': {
    ...entry('note-brainstorm', noteBrainstorm, false),
    srcDark: noteBrainstormDark,
    srcRu: noteBrainstormRu,
    srcRuDark: noteBrainstormRuDark,
  },
  'note-insert-menu': {
    ...entry('note-insert-menu', noteInsertMenu, false),
    srcDark: noteInsertMenuDark,
    srcRu: noteInsertMenuRu,
    srcRuDark: noteInsertMenuRuDark,
  },
  'notes-menu': {
    ...entry('notes-menu', notesMenu, false),
    srcDark: notesMenuDark,
    srcRu: notesMenuRu,
    srcRuDark: notesMenuRuDark,
  },
  'note-templates-settings': {
    ...entry('note-templates-settings', noteTemplatesSettings, false),
    srcDark: noteTemplatesSettingsDark,
    srcRu: noteTemplatesSettingsRu,
    srcRuDark: noteTemplatesSettingsRuDark,
  },
  'project-overview': {
    ...entry('project-overview', projectOverview, false),
    srcDark: projectOverviewDark,
    srcRu: projectOverviewRu,
    srcRuDark: projectOverviewRuDark,
  },
  'action-items-board': {
    ...entry('action-items-board', actionItemsBoard, false),
    srcDark: actionItemsBoardDark,
    srcRu: actionItemsBoardRu,
    srcRuDark: actionItemsBoardRuDark,
  },
  'action-item-edit': {
    ...entry('action-item-edit', actionItemEdit, false),
    srcDark: actionItemEditDark,
    srcRu: actionItemEditRu,
    srcRuDark: actionItemEditRuDark,
  },
  'projects-settings': {
    ...entry('projects-settings', projectsSettings, false),
    srcDark: projectsSettingsDark,
    srcRu: projectsSettingsRu,
    srcRuDark: projectsSettingsRuDark,
  },
  'action-item-labels': {
    ...entry('action-item-labels', actionItemLabels, false),
    srcDark: actionItemLabelsDark,
    srcRu: actionItemLabelsRu,
    srcRuDark: actionItemLabelsRuDark,
  },
  'knowledge-extract': {
    ...entry('knowledge-extract', knowledgeExtract, false),
    srcDark: knowledgeExtractDark,
    srcRu: knowledgeExtractRu,
    srcRuDark: knowledgeExtractRuDark,
  },
  'knowledge-drafts': {
    ...entry('knowledge-drafts', knowledgeDrafts, false),
    srcDark: knowledgeDraftsDark,
    srcRu: knowledgeDraftsRu,
    srcRuDark: knowledgeDraftsRuDark,
  },
  'skills-settings': {
    ...entry('skills-settings', skillsSettings, false),
    srcDark: skillsSettingsDark,
    srcRu: skillsSettingsRu,
    srcRuDark: skillsSettingsRuDark,
  },
  'dictation-settings': {
    ...entry('dictation-settings', dictationSettings, false),
    srcDark: dictationSettingsDark,
    srcRu: dictationSettingsRu,
    srcRuDark: dictationSettingsRuDark,
  },
  'data-backup': {
    ...entry('data-backup', dataBackup, false),
    srcDark: dataBackupDark,
    srcRu: dataBackupRu,
    srcRuDark: dataBackupRuDark,
  },
} satisfies Record<string, ScreenshotEntry>;

export type ShotId = keyof typeof SCREENSHOTS;

/** Slideshow order: the product in the order a session happens. */
export const GALLERY_SHOTS: ShotId[] = [
  'session-setup',
  'session-schedule',
  'session-calendar',
  'session-start',
  'live-recording',
  'live-transcript',
  'live-focus',
  'knowledge-source',
  'live-translation',
  'live-summary',
  'session-overview',
  'session-transcript',
  'session-search',
  'knowledge-extract',
  'knowledge-drafts',
  'knowledge-review',
  'knowledge-cards',
  'documents',
  'chat-sources',
  'notes-list',
  'note-templates-picker',
  'note-ai-draft',
  'note-standup',
  'note-brainstorm',
  'note-insert-menu',
  'notes-menu',
  'note-templates-settings',
  'sessions-list',
  'global-search',
  'action-items-board',
  'action-item-edit',
  'project-overview',
  'projects-settings',
  'action-item-labels',
  'templates-settings',
  'skills-settings',
  'topics-keywords',
  'settings-window',
  'speech-settings',
  'dictation-settings',
  'setup-ai',
  'mcp-access',
  'data-backup',
  'private-ai',
];

/** Gallery tabs: each screenshot sits in one group, shown in this order. */
export const GALLERY_CATEGORIES: {
  id: string;
  labelKey: string;
  /** ShotFrame colour profile for the tab's cards. */
  profile: 'sky' | 'peach' | 'mint' | 'sun' | 'lavender' | 'rose';
  ids: ShotId[];
}[] = [
  {
    id: 'calls',
    labelKey: 'gallery.cat.calls',
    profile: 'sky',
    ids: ['session-setup', 'session-schedule', 'session-calendar', 'session-start', 'live-recording', 'live-transcript', 'live-focus', 'knowledge-source', 'live-translation', 'live-summary'],
  },
  {
    id: 'after',
    labelKey: 'gallery.cat.after',
    profile: 'peach',
    ids: ['session-overview', 'session-transcript', 'session-search', 'chat-sources', 'sessions-list', 'global-search'],
  },
  {
    id: 'work',
    labelKey: 'gallery.cat.work',
    profile: 'rose',
    ids: ['action-items-board', 'action-item-edit', 'project-overview', 'projects-settings', 'action-item-labels'],
  },
  {
    id: 'knowledge',
    labelKey: 'gallery.cat.knowledge',
    profile: 'mint',
    ids: ['knowledge-extract', 'knowledge-drafts', 'knowledge-review', 'knowledge-cards', 'documents'],
  },
  {
    id: 'notes',
    labelKey: 'gallery.cat.notes',
    profile: 'sun',
    ids: ['notes-list', 'note-templates-picker', 'note-ai-draft', 'note-standup', 'note-brainstorm', 'note-insert-menu', 'notes-menu', 'note-templates-settings'],
  },
  {
    id: 'settings',
    labelKey: 'gallery.cat.settings',
    profile: 'lavender',
    ids: ['setup-ai', 'private-ai', 'settings-window', 'templates-settings', 'skills-settings', 'topics-keywords', 'speech-settings', 'dictation-settings', 'mcp-access', 'data-backup'],
  },
];

export const PRIVACY_GALLERY_SHOTS: ShotId[] = [
  'setup-ai',
  'private-ai',
  'speech-settings',
  'mcp-access',
  'data-backup',
  'session-setup',
];

export const showTempLabel = (id: ShotId) =>
  SHOW_TEMP_LABELS && SCREENSHOTS[id].temp;
