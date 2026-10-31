import type { Language } from '../../i18n';
import { getUseCaseTranslationContent } from '../../i18n/use-cases';
import type { UseCaseContent } from './types';

export {
  brandCompliance,
  clientCalls,
  coachingSessions,
  competitorIntelligence,
  developers,
  ecommerce,
  interviews,
  oneOnOneMeetings,
  personal,
  podcasts,
  seo,
  voiceNotes,
} from '../../i18n/use-cases';

export function getTalkBarUseCases(lang: Language): Record<string, UseCaseContent> {
  return getUseCaseTranslationContent(lang);
}
