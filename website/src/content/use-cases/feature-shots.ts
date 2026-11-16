import type { ShotId } from '../../lib/screenshots';

/**
 * Screenshot for each of a use-case page's three feature blocks, in order:
 * during the call, the searchable memory, then what you get afterwards.
 * Picked to match each block's heading and text. The page hero (live-focus)
 * and the examples explorer (live-translation, session-overview,
 * knowledge-review, chat-sources) already use those shots, so they are
 * avoided here where another screen fits.
 */
export const FEATURE_SHOTS: Record<string, [ShotId, ShotId, ShotId]> = {
  // Live context on founder calls / diligence memory, ask any past call / memo-ready notes.
  'venture-private-equity': ['knowledge-source', 'global-search', 'note-ai-draft'],
  // Terms in the moment / exact wording in a past call / open-issue lists.
  'legal-counsel': ['knowledge-source', 'session-search', 'live-summary'],
  // Prior decisions as cards / search 1:1s and staff meetings / decision log and action items.
  'executive-leadership': ['knowledge-source', 'global-search', 'live-summary'],
  // Account context beside the live transcript / one project per account / recap drafts.
  'b2b-sales': ['live-transcript', 'project-overview', 'note-ai-draft'],
  // Client context in the room / a project per client / deliverable drafts.
  consulting: ['knowledge-source', 'project-overview', 'note-ai-draft'],
  // Criteria on cards / evidence by theme / interview template.
  'product-research': ['live-transcript', 'knowledge-cards', 'note-templates-picker'],
  // Last time in front of you (prep with open items) / thread per person / commitments.
  'one-on-one-meetings': ['session-setup', 'project-overview', 'live-summary'],
  // Goals in session / progress in notes / action plans carried into the next prep.
  'coaching-sessions': ['knowledge-source', 'notes-list', 'session-setup'],
  // Criteria live / evidence searchable / same structure every interview.
  interviews: ['live-transcript', 'session-search', 'templates-settings'],
  // Guest context while recording / episode archive / show-note drafts.
  podcasts: ['live-recording', 'sessions-list', 'note-ai-draft'],
  // Notes linked to context / search spoken notes / scan audio for cards.
  'voice-notes': ['notes-menu', 'global-search', 'knowledge-extract'],
  // The client live on the call / client history / recaps and action plans.
  'client-calls': ['knowledge-source', 'global-search', 'live-summary'],
};
