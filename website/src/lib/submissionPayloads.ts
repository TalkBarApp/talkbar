import type { Language } from "../i18n";

const DEFAULT_SOURCE = "talkbar.app";
const MAX_REFERRER_LENGTH = 500;

export type SubmissionContext = {
  lang: Language;
  referrer?: string;
};

export const CONTACT_CATEGORIES = [
  "question",
  "bug",
  "feature",
  "account",
  "billing",
  "license",
  "volume",
  "other",
] as const;

export type ContactCategory = (typeof CONTACT_CATEGORIES)[number];

export type ContactPayloadInput = {
  name: string;
  email: string;
  message: string;
  category: ContactCategory;
  subscribeUpdates: boolean;
};

export function currentSubmissionContext(lang: Language): SubmissionContext {
  return {
    lang,
    referrer: typeof window === "undefined" ? "" : window.location.href,
  };
}

export function buildSubscriptionPayload(email: string, context: SubmissionContext) {
  const referrer = cleanReferrer(context.referrer);
  return {
    email: email.trim(),
    source: sourceFromReferrer(referrer),
    locale: context.lang,
    referrer,
  };
}

export function buildEarlyAccessPayload(email: string, context: SubmissionContext) {
  return buildSubscriptionPayload(email, context);
}

export function buildContactPayload(input: ContactPayloadInput, context: SubmissionContext) {
  return {
    name: input.name.trim(),
    email: input.email.trim(),
    subject: "Website contact form",
    message: input.message.trim(),
    category: input.category,
    source: sourceFromReferrer(context.referrer),
    appLanguage: context.lang,
    subscribeUpdates: input.subscribeUpdates,
  };
}

function cleanReferrer(referrer = "") {
  return referrer.trim().slice(0, MAX_REFERRER_LENGTH);
}

function sourceFromReferrer(referrer = "") {
  try {
    return new URL(referrer).hostname || DEFAULT_SOURCE;
  } catch {
    return DEFAULT_SOURCE;
  }
}
