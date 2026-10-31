import type { UseCaseContent, UseCaseFeatureBlockContent, UseCaseWorkflowItem } from '../content/use-cases/types';
import type { Language } from './types';
import { ruUseCaseContent } from './ru-use-cases';

const download = { label: 'Download for Windows', href: '/#cta' };
const examples = { label: 'See examples', href: '#examples' };

const deepCtaProofItems = [
  { icon: 'lucide:user-x', label: 'No meeting bot' },
  { icon: 'lucide:hard-drive', label: 'Runs on your computer' },
  { icon: 'lucide:lock-keyhole', label: 'No account' },
  { icon: 'lucide:cpu', label: 'Local AI or your key' },
];

const workflowItems: UseCaseWorkflowItem[] = [
  {
    icon: 'lucide:layers-3',
    title: 'Knowledge Cards',
    desc: 'The Knowledge Cards and action items you attached light up when the conversation reaches them.',
    meta: 'DURING',
  },
  {
    icon: 'lucide:list-checks',
    title: 'Follow-ups',
    desc: 'Leave with a summary, open questions, and action items for the next call.',
    meta: 'AFTER',
  },
  {
    icon: 'lucide:database',
    title: 'Searchable memory',
    desc: 'Search sessions, notes, and imported documents, and open the source behind any answer.',
    meta: 'LATER',
  },
  {
    icon: 'lucide:file-output',
    title: 'Exports you choose',
    desc: 'Copy a recap, or export Markdown, HTML, or JSON, or send it to Obsidian.',
    meta: 'WHEN YOU CHOOSE',
  },
];

const roleScenarios = {
  venture: [
    { icon: 'lucide:presentation', title: 'Founder pitch calls', desc: 'Bring prior metrics, thesis notes, and diligence gaps into the conversation.' },
    { icon: 'lucide:file-text', title: 'Investment memos', desc: 'Draft memo notes from calls, voice notes, and imported materials, with sources.' },
    { icon: 'lucide:search-check', title: 'Diligence follow-up', desc: 'Track open questions and follow-up requests as action items, and bring them into the next call with the founder.' },
    { icon: 'lucide:network', title: 'Portfolio context', desc: 'Keep your thesis and market notes as global knowledge, and each company’s facts in its own project.' },
  ],
  legal: [
    { icon: 'lucide:scale', title: 'Negotiation history', desc: 'Recall positions and concessions from prior calls, and carry unresolved issues into the next round as action items.' },
    { icon: 'lucide:shield-check', title: 'Sensitive conversations', desc: 'No bot or recording service joins the call.' },
    { icon: 'lucide:file-search', title: 'Clause references', desc: 'Attach the excerpts and term history you want in view during the call.' },
    { icon: 'lucide:git-compare', title: 'Deal chronology', desc: 'Keep a clear record of what changed, who said it, and what remains open.' },
  ],
  exec: [
    { icon: 'lucide:users', title: 'Leadership syncs', desc: 'Put last week’s decisions and owners in front of this week’s sync.' },
    { icon: 'lucide:clipboard-check', title: 'Chief of staff follow-through', desc: 'Carry owners, blockers, and open action items from one meeting to the next.' },
    { icon: 'lucide:route', title: 'Strategic continuity', desc: 'Connect today\'s discussion to previous priorities and board-level context.' },
    { icon: 'lucide:briefcase-business', title: 'Executive briefings', desc: 'Prepare the next meeting from your notes and the cards you choose.' },
  ],
  sales: [
    { icon: 'lucide:handshake', title: 'Discovery calls', desc: 'Bring account history, stakeholders, and objections into the call on cards you attach.' },
    { icon: 'lucide:message-square-reply', title: 'Customer follow-ups', desc: 'Draft the recap and next steps, and bring open commitments into the next call as action items.' },
    { icon: 'lucide:map', title: 'Stakeholder notes', desc: 'Keep each person’s role, concerns, and history on the account.' },
    { icon: 'lucide:badge-dollar-sign', title: 'Commercial context', desc: 'Recall prior packaging discussions and decision criteria without digging through notes.' },
  ],
  consultants: [
    { icon: 'lucide:messages-square', title: 'Discovery workshops', desc: 'Keep client context, prior decisions, and stakeholder goals close at hand.' },
    { icon: 'lucide:notebook-tabs', title: 'Advisory notes', desc: 'Turn calls and voice notes into structured observations, and scan them for Knowledge Cards to bring into the next workshop.' },
    { icon: 'lucide:layers', title: 'Multi-client memory', desc: 'Keep clients and engagements apart with projects, all on your computer.' },
    { icon: 'lucide:file-check-2', title: 'Deliverable prep', desc: 'Summaries you can paste into decks, memos, and recaps.' },
  ],
  research: [
    { icon: 'lucide:user-search', title: 'Research interviews', desc: 'Connect new comments to prior themes, hypotheses, and product decisions.' },
    { icon: 'lucide:scan-search', title: 'Recruiting screens', desc: 'Keep criteria and earlier notes in view on cards you attach.' },
    { icon: 'lucide:tags', title: 'Theme tracking', desc: 'After each interview, save what you heard as Knowledge Cards. They light up when the same topic comes up in the next one.' },
    { icon: 'lucide:clipboard-list', title: 'Research readouts', desc: 'Draft notes, themes with quotes, and next steps.' },
  ],
};

const conversationScenarios = {
  oneOnOne: [
    { icon: 'lucide:user-round-check', title: 'Manager 1:1s', desc: 'Remember goals, blockers, feedback, and commitments across recurring conversations.' },
    { icon: 'lucide:calendar-check', title: 'Follow-up continuity', desc: 'Add last time’s action items to the next 1:1. They light up when the topic comes back.' },
    { icon: 'lucide:heart-handshake', title: 'Sensitive feedback', desc: 'Keep notes local when the conversation is personal or confidential.' },
    { icon: 'lucide:list-checks', title: 'Action tracking', desc: 'Leave with owners, dates, and practical next steps.' },
  ],
  coaching: [
    { icon: 'lucide:sparkles', title: 'Coaching arcs', desc: 'Track goals, patterns, breakthroughs, and commitments over time.' },
    { icon: 'lucide:message-circle-heart', title: 'Private sessions', desc: 'Nothing joins the session, and notes stay on your computer.' },
    { icon: 'lucide:book-open-check', title: 'Session notes', desc: 'Turn live conversations into structured reflection notes and action plans.' },
    { icon: 'lucide:repeat-2', title: 'Progress memory', desc: 'See what changed since earlier sessions, with the source behind each note.' },
  ],
  interviews: [
    { icon: 'lucide:mic', title: 'Candidate interviews', desc: 'Keep role criteria, prior screens, and evidence visible while you talk.' },
    { icon: 'lucide:clipboard-check', title: 'Structured notes', desc: 'Turn the call into consistent notes: strengths, risks, and follow-ups.' },
    { icon: 'lucide:user-check', title: 'Research interviews', desc: 'Connect quotes to themes and hypotheses without losing the original context.' },
    { icon: 'lucide:help-circle', title: 'Open questions in view', desc: 'Keep criteria and earlier answers on cards, so you can see what’s still open.' },
  ],
  podcasts: [
    { icon: 'lucide:podcast', title: 'Guest prep', desc: 'Bring prior notes, episode arcs, and reference material into the recording.' },
    { icon: 'lucide:audio-lines', title: 'Episode memory', desc: 'Turn recordings into a searchable archive, and save guest facts as Knowledge Cards for the next episode.' },
    { icon: 'lucide:quote', title: 'Key moments', desc: 'Find the moment in the transcript without losing the surrounding context.' },
    { icon: 'lucide:file-pen-line', title: 'Show-note drafts', desc: 'Summaries, topic lists, and follow-ups after the session.' },
  ],
  voiceNotes: [
    { icon: 'lucide:voicemail', title: 'Fast capture', desc: 'Hold a shortcut and speak. TalkBar can tidy the text and paste it into the app you were using.' },
    { icon: 'lucide:brain', title: 'Thinking out loud', desc: 'Attach a voice note to the session, project, or document it belongs to.' },
    { icon: 'lucide:file-output', title: 'Draft outputs', desc: 'Turn rough speech into briefs, action items, and memos.' },
    { icon: 'lucide:folder-search', title: 'Find it later', desc: 'Search every note by what you said, weeks later.' },
  ],
  clientCalls: [
    { icon: 'lucide:phone-call', title: 'Status calls', desc: 'Bring last call’s decisions and open risks into this one.' },
    { icon: 'lucide:file-check', title: 'Client recaps', desc: 'Create clear summaries, decisions, and next steps after every call.' },
    { icon: 'lucide:badge-check', title: 'Trust and privacy', desc: 'Keep sensitive context local while still producing useful outputs.' },
    { icon: 'lucide:workflow', title: 'Delivery handoff', desc: 'Go from call to action plan without rebuilding the context.' },
  ],
};

type FeatureCopy = { heading: string; body: string };

function featureBlocks(
  live: FeatureCopy,
  memory: FeatureCopy,
  output: FeatureCopy & { outputs: string[] },
): UseCaseFeatureBlockContent[] {
  return [
    {
      icon: 'lucide:audio-lines',
      heading: live.heading,
      body: live.body,
      mediaPlaceholder: 'Knowledge Card preview',
      mediaLabel: 'Knowledge Card preview',
    },
    {
      icon: 'lucide:folder-search',
      heading: memory.heading,
      body: memory.body,
      mediaSide: 'left',
      mediaPlaceholder: 'Conversation memory preview',
      mediaLabel: 'Conversation memory preview',
    },
    {
      icon: 'lucide:list-checks',
      heading: output.heading,
      body: output.body,
      subList: output.outputs,
    },
  ];
}

// Session template first, then note templates. Sentence case, no near-duplicates.
const templatesBySlug: Record<string, string[]> = {
  'venture-private-equity': ['Investor & founder call', 'Decision record', 'Board meeting', 'Investor update'],
  'legal-counsel': ['Legal consultation', 'Negotiation', 'Decision record', 'Meeting notes'],
  'executive-leadership': ['Meeting', 'Leadership sync', 'Board meeting', 'Strategy offsite', 'All-hands', 'Decision record'],
  'b2b-sales': ['Sales discovery call', 'Product demo', 'Deal review', 'Negotiation', 'Sales to CS handoff', 'Quarterly business review'],
  consulting: ['Client workshop', 'Project kickoff', 'Decision record'],
  'product-research': ['User research interview', 'Candidate interview', 'Feature spec', 'Interview debrief'],
  'one-on-one-meetings': ['1:1', 'Career conversation', 'Performance review', 'Difficult conversation'],
  'coaching-sessions': ['Coaching session', 'Career conversation', 'Weekly review', 'Daily journal'],
  interviews: ['Interview', 'Candidate interview', 'User research interview', 'Interview debrief', 'Reference check'],
  podcasts: ['Podcast episode', 'Brainstorm', 'Reading notes'],
  'voice-notes': ['Daily journal', 'Weekly review', 'Brainstorm', 'Reading notes', 'Lecture notes'],
  'client-calls': ['Client workshop', 'Customer check-in', 'Quarterly business review', 'Onboarding kickoff', 'Support escalation'],
};

function makeContent(input: {
  slug: string;
  title: string;
  /** Search title, kept to 50 characters so "| TalkBar" fits in 60. */
  seoTitle: string;
  description: string;
  icon: string;
  eyebrow: string;
  headline: string;
  accent: string;
  sub: string;
  mediaLabel: string;
  problem: string[];
  pullquote: string;
  features: UseCaseFeatureBlockContent[];
  examples: UseCaseContent['examples'];
  faq: UseCaseContent['faq'];
  ctaEyebrow: string;
  ctaHeadline: string;
  ctaAccent: string;
}): UseCaseContent {
  return {
    slug: input.slug,
    meta: {
      title: `${input.seoTitle} | TalkBar`,
      description: input.description,
      shortTitle: input.title,
    },
    hero: {
      icon: input.icon,
      eyebrow: input.eyebrow,
      headline: input.headline,
      accent: input.accent,
      sub: input.sub,
      ctaPrimary: download,
      ctaSecondary: examples,
      mediaLabel: input.mediaLabel,
    },
    problem: {
      paragraphs: input.problem,
      pullquote: input.pullquote,
    },
    features: input.features,
    examples: {
      ...input.examples,
      templatesLine: {
        label: 'Templates to start from',
        chips: templatesBySlug[input.slug] ?? [],
      },
    },
    workflow: {
      eyebrow: 'Workflow',
      headline: 'From live context to',
      accent: 'usable memory.',
      note: 'Cards during the call, memory after it, exports only when you choose.',
      items: workflowItems,
    },
    faq: input.faq,
    cta: {
      eyebrow: input.ctaEyebrow,
      headline: input.ctaHeadline,
      accent: input.ctaAccent,
      ctaLabel: 'Download for Windows',
      ctaHref: '/#cta',
      platformsNote: 'Available for Windows · Mac version in progress',
      proofItems: deepCtaProofItems,
    },
  };
}

const commonFaq = [
  {
    q: 'Does TalkBar join the meeting as a bot?',
    a: 'No. TalkBar records your mic and your computer’s audio from the desktop, so no one new joins the participant list. Recording-consent rules still apply.',
  },
  {
    q: 'Where is the conversation memory stored?',
    a: 'On your computer. It stays there unless you export or share it, or use an AI provider with your own key.',
  },
];

export const competitorIntelligence = makeContent({
  slug: 'venture-private-equity',
  title: 'Venture & Private Equity',
  seoTitle: 'Private AI Notes for Venture & PE Calls',
  description: 'See your notes and open questions during founder calls, search past diligence, and draft memo notes. On your computer, no meeting bot.',
  icon: 'lucide:line-chart',
  eyebrow: 'Venture & private equity',
  headline: 'Out-prepare every',
  accent: 'founder call.',
  sub: 'See your notes, the deck, and open questions while the founder talks, then draft memo notes from the call.',
  mediaLabel: 'Investment conversation memory preview',
  problem: [
    'A founder call can touch metrics, customer proof, technical risk, and market assumptions in twenty minutes, and the detail that matters is usually the one you half-remember from three calls ago.',
    'The job is not taking more notes. It is having the right prior context in front of you while the call is live, then turning it into diligence memory you can actually search.',
  ],
  pullquote: 'Your edge is remembering the detail that changes the next question.',
  features: featureBlocks(
    { heading: 'Live context on founder calls.', body: 'Bring thesis notes, earlier claims, and open questions as Knowledge Cards. They light up while the founder is still talking.' },
    { heading: 'A diligence memory you can search.', body: 'Founder calls, partner discussions, diligence notes, and voice notes become searchable memory. Ask any past call what the founder actually said.' },
    { heading: 'Memo-ready outputs.', body: 'Turn the conversation into investment notes, open questions, and a partner-ready summary you can refine.', outputs: ['Notes ready for your memo', 'Open questions and follow-ups', 'Summaries you review'] },
  ),
  examples: {
    eyebrow: 'Examples',
    headline: 'Built around',
    accent: 'deal flow.',
    items: roleScenarios.venture,
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Questions from',
    accent: 'investors.',
    items: [
      { q: 'Will it write the investment memo?', a: 'It drafts memo notes, open questions, and a summary. The memo and the judgment stay yours.' },
      { q: 'Can I prepare before a founder call?', a: 'Yes. Jot down your notes, attach the deck or the documents you need, and pick the Knowledge Cards you want in view.' },
      ...commonFaq,
    ],
  },
  ctaEyebrow: 'Ready to remember every diligence thread?',
  ctaHeadline: 'Bring private memory',
  ctaAccent: 'to every call.',
});

export const brandCompliance = makeContent({
  slug: 'legal-counsel',
  title: 'Legal Counsel & M&A',
  seoTitle: 'Private AI Meeting Notes for Lawyers & M&A',
  description: 'For counsel and deal teams: recall positions, terms, and open issues during negotiations. On your computer, with no bot on the call.',
  icon: 'lucide:scale',
  eyebrow: 'Legal counsel & M&A',
  headline: 'Every position, every term,',
  accent: 'within reach.',
  sub: 'Recall earlier positions and open issues mid-negotiation, then keep a clean chronology afterward.',
  mediaLabel: 'Legal conversation memory preview',
  problem: [
    'Legal and transaction work lives on exact context: what was said, what changed, who accepted a position, and which issues are still open.',
    'A third-party recording service can chill a sensitive room, and scattered notes make the chronology almost impossible to rebuild later.',
  ],
  pullquote: 'The right prior position should reach you before the moment passes.',
  features: featureBlocks(
    { heading: 'Positions and terms, in the moment.', body: 'Attach the terms, earlier positions, and open issues you need. They light up when the negotiation gets to them.' },
    { heading: 'A clean, searchable deal record.', body: 'Conversation history, issue lists, excerpts, and voice notes stay searchable on your computer. Ask a past call or the draft agreement for the exact wording.' },
    { heading: 'Chronologies and issue lists, drafted.', body: 'Get a matter summary, chronology notes, and an open-issue list to refine.', outputs: ['Matter summaries you refine', 'Chronology notes', 'Open-issue lists and follow-ups'] },
  ),
  examples: {
    eyebrow: 'Examples',
    headline: 'Designed for',
    accent: 'sensitive work.',
    items: roleScenarios.legal,
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Questions from',
    accent: 'counsel.',
    items: [
      { q: 'Can I keep matters separate?', a: 'Yes. Give each matter its own project, with its own sessions, documents, and Knowledge Cards.' },
      { q: 'Does this replace legal review?', a: 'No. TalkBar organizes conversation context and drafts. Professional judgment and review stay with you.' },
      ...commonFaq,
    ],
  },
  ctaEyebrow: 'Ready for private deal memory?',
  ctaHeadline: 'Keep sensitive context',
  ctaAccent: 'local.',
});

export const developers = makeContent({
  slug: 'executive-leadership',
  title: 'Executive Leadership & Chiefs of Staff',
  seoTitle: 'AI Meeting Notes for Executives & Chiefs of Staff',
  description: 'Carry decisions, owners, and open action items from one leadership meeting to the next, with memory that stays on your computer.',
  icon: 'lucide:building-2',
  eyebrow: 'Executive leadership & chiefs of staff',
  headline: 'Never re-litigate',
  accent: 'a past decision.',
  sub: 'Bring last meeting’s decisions and open action items, with owners, into this one.',
  mediaLabel: 'Executive briefing preview',
  problem: [
    'Leadership teams repeat themselves constantly. Decisions, assumptions, and owner commitments scatter across meetings, voice notes, chats, and documents.',
    'Executives and chiefs of staff need the last decision close at hand, not the first ten minutes of every meeting spent rebuilding what everyone already agreed.',
  ],
  pullquote: 'Alignment breaks the moment the last decision is hard to find.',
  features: featureBlocks(
    { heading: 'Prior decisions, in view.', body: 'Bring earlier decisions, commitments, and goals into the leadership sync as Knowledge Cards.' },
    { heading: 'Every past decision, searchable.', body: 'Search or ask across 1:1s, staff meetings, notes, and documents the moment a detail matters.' },
    { heading: 'Decision logs and follow-through.', body: 'After each meeting, refine the decision log and your notes, and add the action items to the next one.', outputs: ['Decisions and commitments', 'Action items with owners and dates', 'Prep notes for next time'] },
  ),
  examples: {
    eyebrow: 'Examples',
    headline: 'Useful across the',
    accent: 'leadership cadence.',
    items: roleScenarios.exec,
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Questions from',
    accent: 'leaders.',
    items: [
      { q: 'How does it handle recurring meetings?', a: 'A recurring series keeps its prep: notes, documents, cards, and open action items. They light up when the topic comes back.' },
      ...commonFaq,
    ],
  },
  ctaEyebrow: 'Ready to keep leadership context connected?',
  ctaHeadline: 'Keep decisions',
  ctaAccent: 'decided.',
});

export const ecommerce = makeContent({
  slug: 'b2b-sales',
  title: 'B2B Sales & Customer Success',
  seoTitle: 'AI Notes for Sales & Customer Success Calls',
  description: 'Private account memory, context you bring into every call, and recaps you can paste into your CRM. No meeting bot.',
  icon: 'lucide:handshake',
  eyebrow: 'B2B sales & customer success',
  headline: 'Walk into every account call',
  accent: 'with the full story.',
  sub: 'See stakeholders, objections, and past commitments during the call, then paste a reviewed recap into your CRM.',
  mediaLabel: 'Account conversation memory preview',
  problem: [
    'Momentum dies when account context is buried across call notes, CRM fields, email threads, and memory.',
    'Customers expect continuity. They should not have to repeat goals, blockers, and prior commitments on every call.',
  ],
  pullquote: '',
  features: featureBlocks(
    { heading: 'Account context, mid-call.', body: 'Attach stakeholder notes, past objections, and prior commitments, and keep them beside the live transcript.' },
    { heading: 'One project per account.', body: 'Give each account its own project: calls, notes, Knowledge Cards, and the people on the account, together on your computer.' },
    { heading: 'Recaps and next steps.', body: 'Draft the recap and next steps when the call ends. Review them, then paste them into the CRM you already use.', outputs: ['Customer recaps and next steps', 'Stakeholder and objection notes', 'Drafts you paste into your CRM'] },
  ),
  examples: {
    eyebrow: 'Examples',
    headline: 'For teams that',
    accent: 'own the relationship.',
    items: roleScenarios.sales,
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Questions from',
    accent: 'account teams.',
    items: [
      { q: 'Can I get the recap into my CRM?', a: 'Yes, by copy and paste. TalkBar drafts the recap and next steps; there’s no CRM sync.' },
      ...commonFaq,
    ],
  },
  ctaEyebrow: 'Ready for better account continuity?',
  ctaHeadline: 'Keep customer context',
  ctaAccent: 'within reach.',
});

export const seo = makeContent({
  slug: 'consulting',
  title: 'Consultants & Advisors',
  seoTitle: 'AI Meeting Notes for Consultants & Advisors',
  description: 'A project per client, context in view during workshops, and recaps with sources you can paste into deliverables. On your computer.',
  icon: 'lucide:presentation',
  eyebrow: 'Consultants & advisors',
  headline: 'Bill for thinking,',
  accent: 'not note-taking.',
  sub: 'Keep each engagement’s context in one project, and turn workshops and interviews into recaps with sources.',
  mediaLabel: 'Consultant conversation memory preview',
  problem: [
    'Advisory work spans many moving conversations. Context shifts by client, stakeholder, workstream, and deliverable.',
    'Notes only pay off when they can be found, trusted, and turned into the next recommendation.',
  ],
  pullquote: '',
  features: featureBlocks(
    { heading: 'Client context, live in the room.', body: 'Attach workshop goals, stakeholder notes, and open questions so they’re in view during the session.' },
    { heading: 'A project for every client.', body: 'Give each client or engagement its own project, with its own sessions, documents, and Knowledge Cards. Keep your frameworks as global knowledge, ready for every client.' },
    { heading: 'Deliverable-ready drafts.', body: 'Draft recaps, observations, and action plans, ready to paste into your decks and memos.', outputs: ['Client recaps with sources', 'Observations and recommendations', 'Notes ready for decks and memos'] },
  ),
  examples: {
    eyebrow: 'Examples',
    headline: 'Built for',
    accent: 'advisory work.',
    items: roleScenarios.consultants,
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Questions from',
    accent: 'advisors.',
    items: [
      { q: 'Can I keep clients separate?', a: 'Yes. Give each client or engagement its own project, and its sessions, notes, and documents stay organized apart from the rest.' },
      ...commonFaq,
    ],
  },
  ctaEyebrow: 'Ready to retain client context?',
  ctaHeadline: 'Make every conversation',
  ctaAccent: 'usable later.',
});

export const personal = makeContent({
  slug: 'product-research',
  title: 'Product Research & Recruiting',
  seoTitle: 'AI Notes for User Research & Recruiting',
  description: 'Keep interview criteria and themes in view, and turn every conversation into searchable notes for product research and recruiting.',
  icon: 'lucide:user-search',
  eyebrow: 'Product research & recruiting',
  headline: 'Hear the pattern',
  accent: 'across every interview.',
  sub: 'Save themes as Knowledge Cards, and they light up when the next participant raises them.',
  mediaLabel: 'Interview memory preview',
  problem: [
    'The pattern that matters rarely shows up in one interview. It shows up across ten, once the quotes, themes, and hypotheses can be searched together.',
    'Afterward you need consistent notes without flattening the nuance that made the conversation worth having.',
  ],
  pullquote: 'A stronger interview starts before the first question and keeps its evidence after the last.',
  features: featureBlocks(
    { heading: 'Criteria and themes, on screen.', body: 'Put role criteria, your hypotheses, and earlier notes on Knowledge Cards. They light up as the interview reaches them.' },
    { heading: 'Evidence you can search by theme.', body: 'Search interview notes, quotes, and voice notes by person, project, or label, or ask what you’ve saved about a theme so far.' },
    { heading: 'Structured notes, every time.', body: 'Use an interview template for structured notes, themes, and follow-ups, then refine the result.', outputs: ['Notes in a consistent template', 'Themes and evidence', 'Follow-up questions and action items'] },
  ),
  examples: {
    eyebrow: 'Examples',
    headline: 'Useful for',
    accent: 'interview-driven work.',
    items: roleScenarios.research,
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Questions from',
    accent: 'interviewers.',
    items: [
      { q: 'Does it work for both research and hiring?', a: 'Yes. There’s a template for each, and both use the same workspace: preparation, Knowledge Cards, searchable notes, and follow-ups you refine.' },
      ...commonFaq,
    ],
  },
  ctaEyebrow: 'Ready for better interview memory?',
  ctaHeadline: 'Keep evidence',
  ctaAccent: 'connected.',
});

export const oneOnOneMeetings = makeContent({
  slug: 'one-on-one-meetings',
  title: 'One-on-one Meetings',
  seoTitle: 'Private AI Notes for One-on-One Meetings',
  description: 'Private memory for recurring 1:1s: carry goals, feedback, and commitments from one conversation to the next.',
  icon: 'lucide:user-round-check',
  eyebrow: 'One-on-one meetings',
  headline: 'Make every 1:1',
  accent: 'build on the last one.',
  sub: 'Bring goals, blockers, feedback, and prior commitments into recurring one-on-ones, and leave with clear next steps every time.',
  mediaLabel: 'One-on-one meeting memory preview',
  problem: [
    'One-on-ones are where trust, feedback, and career context build up over months.',
    'When prior commitments and sensitive details are hard to find, every meeting restarts from a weaker place.',
  ],
  pullquote: 'A good 1:1 remembers the person, not just the agenda.',
  features: featureBlocks(
    { heading: 'Last time, in front of you.', body: 'Attach prior goals, feedback, and open commitments so they’re in view while you talk.' },
    { heading: 'A private thread per person.', body: 'Each person has a page with your past 1:1s, notes, and open action items.' },
    { heading: 'Commitments that come back next time.', body: 'Turn each meeting into owners, feedback notes, and action items for the next one.', outputs: ['Owners and next steps', 'Feedback and coaching notes', 'Open loops carried to next time'] },
  ),
  examples: {
    eyebrow: 'Examples',
    headline: 'For recurring',
    accent: 'human context.',
    items: conversationScenarios.oneOnOne,
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Questions about',
    accent: '1:1s.',
    items: [
      { q: 'Can I prepare for a performance review?', a: 'Yes. Search past 1:1s with that person and start from the Performance review template.' },
      ...commonFaq,
    ],
  },
  ctaEyebrow: 'Ready to improve recurring conversations?',
  ctaHeadline: 'Remember the context',
  ctaAccent: 'that matters.',
});

export const coachingSessions = makeContent({
  slug: 'coaching-sessions',
  title: 'Coaching Sessions',
  seoTitle: 'Private AI Notes for Coaching Sessions',
  description: 'Private, searchable coaching memory: track goals, themes, and breakthroughs across sessions with no meeting bot.',
  icon: 'lucide:sparkles',
  eyebrow: 'Coaching sessions',
  headline: 'Never lose the thread',
  accent: 'between sessions.',
  sub: 'Track goals, recurring themes, breakthroughs, and commitments across coaching conversations.',
  mediaLabel: 'Coaching session memory preview',
  problem: [
    'Coaching runs on continuity. Progress shows up as patterns across sessions, not in any single transcript.',
    'Clients open up more when a third-party bot isn\'t sitting in on the session.',
  ],
  pullquote: '',
  features: featureBlocks(
    { heading: 'Goals and themes, in session.', body: 'Attach goals, prior commitments, and recurring themes so they stay within reach while you coach.' },
    { heading: 'Progress you can revisit.', body: 'Session notes and reflections stay in local, searchable memory so you can track change over time.' },
    { heading: 'Action plans and prep.', body: 'Create action plans and reflection summaries after each session, and carry the client’s commitments into the next one as action items.', outputs: ['Action plans and commitments', 'Session reflection summaries', 'Prep notes for next time'] },
  ),
  examples: {
    eyebrow: 'Examples',
    headline: 'For coaching',
    accent: 'continuity.',
    items: conversationScenarios.coaching,
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Questions about',
    accent: 'coaching.',
    items: [
      { q: 'Can I keep each client separate?', a: 'Yes. Each client gets a project with their sessions, notes, and commitments.' },
      ...commonFaq,
    ],
  },
  ctaEyebrow: 'Ready to carry coaching context forward?',
  ctaHeadline: 'Keep progress',
  ctaAccent: 'visible.',
});

export const interviews = makeContent({
  slug: 'interviews',
  title: 'Interviews',
  seoTitle: 'AI Interview Notes Without a Meeting Bot',
  description: 'Keep criteria and context in view during candidate, research, and expert interviews, then search your notes afterward.',
  icon: 'lucide:mic',
  eyebrow: 'Interviews',
  headline: 'Ask sharper questions,',
  accent: 'leave with cleaner notes.',
  sub: 'Keep criteria, prior answers, and themes in reach during candidate, research, and expert interviews, and turn each one into consistent notes you can refine.',
  mediaLabel: 'Interview context preview',
  problem: [
    'Interviewers have to listen deeply while holding criteria, prior answers, themes, and the next question in mind.',
    'The output has to be consistent, but the conversation should still feel natural.',
  ],
  pullquote: 'The next question is usually hidden in the context you already have.',
  features: featureBlocks(
    { heading: 'Criteria and notes, live.', body: 'Put role criteria and your must-ask questions on Knowledge Cards; they light up when the candidate gets there.' },
    { heading: 'Evidence, searchable later.', body: 'Interview evidence, quotes, and notes stay searchable by person, project, or label.' },
    { heading: 'Same structure, every interview.', body: 'Pick an interview template, and the summary comes back organized by criteria, evidence, strengths, risks, and follow-ups, ready to refine.', outputs: ['Notes in one structure', 'Strengths, risks, and evidence', 'Follow-up questions and action items'] },
  ),
  examples: {
    eyebrow: 'Examples',
    headline: 'For structured',
    accent: 'conversation work.',
    items: conversationScenarios.interviews,
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Questions about',
    accent: 'interviews.',
    items: [
      { q: 'How does it keep notes consistent?', a: 'Use the same template for each interview, and every set of notes shares one structure: criteria, evidence, strengths, risks, and follow-ups. The comparison is still yours to make.' },
      ...commonFaq,
    ],
  },
  ctaEyebrow: 'Ready to improve interview memory?',
  ctaHeadline: 'Decide from notes,',
  ctaAccent: 'not recall.',
});

export const podcasts = makeContent({
  slug: 'podcasts',
  title: 'Podcasts',
  seoTitle: 'Local AI Transcription for Podcasts',
  description: 'Prep guests, record episodes with no meeting bot, and turn each one into searchable notes and show-note drafts you review.',
  icon: 'lucide:podcast',
  eyebrow: 'Podcasts',
  headline: 'Show up prepared,',
  accent: 'leave with the show notes.',
  sub: 'Keep guest research on screen while you record, then draft show notes from the transcript.',
  mediaLabel: 'Podcast conversation memory preview',
  problem: [
    'Great episodes depend on prep, memory, and the ability to follow a thread when a guest says something unexpected.',
    'After recording, the work continues: show notes, follow-ups, themes, and the next episode idea.',
  ],
  pullquote: '',
  features: featureBlocks(
    { heading: 'Guest context while you record.', body: 'Attach guest notes, episode arcs, and the questions you want in view while you record.' },
    { heading: 'A searchable episode archive.', body: 'Recordings, prep notes, and voice notes stay searchable by person, project, or label.' },
    { heading: 'Show notes, drafted for you.', body: 'Draft show notes, key moments, and follow-ups after the session, then polish them.', outputs: ['Show-note and summary drafts', 'Key moments and quotes', 'Follow-ups and next-episode ideas'] },
  ),
  examples: {
    eyebrow: 'Examples',
    headline: 'For creators who',
    accent: 'work from conversation.',
    items: conversationScenarios.podcasts,
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Questions about',
    accent: 'podcasts.',
    items: [
      { q: 'Can it turn a recording into notes?', a: 'Yes. Import an audio or video file, or a voice note, and TalkBar gives you a transcript and a show-note draft to review.' },
      ...commonFaq,
    ],
  },
  ctaEyebrow: 'Ready to make recordings searchable?',
  ctaHeadline: 'Turn episodes',
  ctaAccent: 'into memory.',
});

export const voiceNotes = makeContent({
  slug: 'voice-notes',
  title: 'Voice Notes',
  seoTitle: 'Private Voice Notes & Dictation with Local AI',
  description: 'Dictate or import voice notes, then search them alongside the meetings, documents, and projects you attach them to.',
  icon: 'lucide:voicemail',
  eyebrow: 'Voice notes',
  headline: 'Turn spoken thoughts',
  accent: 'into searchable memory.',
  sub: 'Capture ideas, field notes, and reflections by voice, attach them to a session, project, or document, and find them later.',
  mediaLabel: 'Voice note memory preview',
  problem: [
    'Voice notes are fast to capture and slow to reuse. The detail disappears because it is trapped in audio.',
    'A real memory system connects those notes to meetings, decisions, projects, and actions.',
  ],
  pullquote: '',
  features: featureBlocks(
    { heading: 'Notes, connected to context.', body: 'Dictate a note or import audio, then attach it to a session, project, person, or document.' },
    { heading: 'Searchable when it matters.', body: 'Search across spoken notes and conversation memory the moment you need an old detail.' },
    { heading: 'From rough audio to real work.', body: 'Turn a recording into a summary and action items, and scan it for Knowledge Cards worth keeping.', outputs: ['Briefs and summaries', 'Action items and follow-ups', 'Memos drafted from speech'] },
  ),
  examples: {
    eyebrow: 'Examples',
    headline: 'For thoughts that',
    accent: 'need to become work.',
    items: conversationScenarios.voiceNotes,
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Questions about',
    accent: 'voice notes.',
    items: [
      { q: 'Can notes link to my meetings?', a: 'Yes. Attach a voice note to a session, document, or project, and search it along with the rest of your workspace.' },
      ...commonFaq,
    ],
  },
  ctaEyebrow: 'Ready to make voice notes useful?',
  ctaHeadline: 'Capture once,',
  ctaAccent: 'find later.',
});

export const clientCalls = makeContent({
  slug: 'client-calls',
  title: 'Client Calls',
  seoTitle: 'AI Notes for Client Calls, No Meeting Bot',
  description: 'Client-call memory on your computer: context in view during the call, and a recap to check before you send.',
  icon: 'lucide:phone-call',
  eyebrow: 'Client calls',
  headline: 'Every client call starts',
  accent: 'where the last one ended.',
  sub: 'Keep client goals, decisions, stakeholders, and risks in view during the call, then review the recap and action plan before you send them.',
  mediaLabel: 'Client call memory preview',
  problem: [
    'Client calls create the commitments that drive delivery, but the context scatters across notes, chat, email, and memory.',
    'Teams need accurate recaps and action plans without making the client repeat the same background every time.',
  ],
  pullquote: '',
  features: featureBlocks(
    { heading: 'The client, live on the call.', body: 'Attach goals, stakeholders, and open risks, plus the action items from the last call. They light up when the conversation gets there.' },
    { heading: 'Client history, searchable.', body: 'Client conversations, voice notes, and delivery context stay searchable on your computer. Ask last month’s call before the next one.' },
    { heading: 'Recaps and action plans.', body: 'Draft the recap, action plan, and handoff notes when the call ends, then check them before you send.', outputs: ['Recaps to review and send', 'Action plans and owners', 'Handoff notes for delivery'] },
  ),
  examples: {
    eyebrow: 'Examples',
    headline: 'For client work',
    accent: 'that needs continuity.',
    items: conversationScenarios.clientCalls,
  },
  faq: {
    eyebrow: 'FAQ',
    headline: 'Questions about',
    accent: 'client calls.',
    items: [
      { q: 'Can I check a recap before I send it?', a: 'Yes. Decisions and action items link to the moment they came from.' },
      ...commonFaq,
    ],
  },
  ctaEyebrow: 'Ready for cleaner client follow-up?',
  ctaHeadline: 'Keep client context',
  ctaAccent: 'organized.',
});

export const enUseCaseContent = {
  'venture-private-equity': competitorIntelligence,
  'legal-counsel': brandCompliance,
  'executive-leadership': developers,
  'b2b-sales': ecommerce,
  consulting: seo,
  'product-research': personal,
  'one-on-one-meetings': oneOnOneMeetings,
  'coaching-sessions': coachingSessions,
  interviews,
  podcasts,
  'voice-notes': voiceNotes,
  'client-calls': clientCalls,
} satisfies Record<string, UseCaseContent>;

const useCaseContentByLanguage: Partial<Record<Language, typeof enUseCaseContent>> = {
  en: enUseCaseContent,
  ru: ruUseCaseContent,
};

export function getUseCaseTranslationContent(lang: Language): typeof enUseCaseContent {
  return useCaseContentByLanguage[lang] ?? enUseCaseContent;
}
