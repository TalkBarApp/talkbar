import type { Language } from '../../i18n';
import type { UseCaseContent } from './types';
import { getTalkBarUseCases } from './talkbar-content';

export type UseCaseSlug =
  | 'venture-private-equity'
  | 'legal-counsel'
  | 'executive-leadership'
  | 'b2b-sales'
  | 'consulting'
  | 'product-research'
  | 'one-on-one-meetings'
  | 'coaching-sessions'
  | 'interviews'
  | 'podcasts'
  | 'voice-notes'
  | 'client-calls';

export const enUseCases = getTalkBarUseCases('en') as Record<UseCaseSlug, UseCaseContent>;

export function getUseCaseContent(slug: UseCaseSlug, lang: Language): UseCaseContent {
  const localizedUseCases = getTalkBarUseCases(lang) as Record<UseCaseSlug, UseCaseContent>;
  return localizedUseCases[slug] ?? enUseCases[slug];
}
