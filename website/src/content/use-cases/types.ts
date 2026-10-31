import type { ImageMetadata } from 'astro';
import type { ShotId } from '../../lib/screenshots';

export interface UseCaseFeatureBlockContent {
  icon: string;
  heading: string;
  body: string;
  mediaSide?: 'left' | 'right';
  mediaLabel?: string;
  mediaImage?: ImageMetadata;
  mediaMock?: 'cards' | 'memory';
  mediaPlaceholder?: string;
  shot?: ShotId;
  subList?: string[];
}

export interface UseCaseExampleItem {
  icon: string;
  title: string;
  desc: string;
  shot?: ShotId;
}

export interface UseCaseFAQItem {
  q: string;
  a: string;
}

export interface UseCaseWorkflowItem {
  icon: string;
  title: string;
  desc: string;
  meta?: string;
}

export interface UseCaseCtaProofItem {
  icon: string;
  label: string;
}

export interface UseCaseContent {
  slug: string;
  meta: {
    title: string;
    description: string;
    /** Short page name for breadcrumbs. */
    shortTitle?: string;
  };
  hero: {
    icon: string;
    eyebrow: string;
    headline: string;
    accent: string;
    sub: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    mediaLabel: string;
    mediaImage?: ImageMetadata;
    mediaPlaceholder?: string;
    shot?: ShotId;
  };
  problem: {
    paragraphs: string[];
    pullquote?: string;
  };
  features: UseCaseFeatureBlockContent[];
  examples: {
    eyebrow: string;
    headline: string;
    accent?: string;
    items: UseCaseExampleItem[];
    templatesLine?: {
      label: string;
      chips: string[];
    };
  };
  workflow: {
    eyebrow: string;
    headline: string;
    accent: string;
    note?: string;
    items: UseCaseWorkflowItem[];
  };
  faq: {
    eyebrow: string;
    headline: string;
    accent: string;
    items: UseCaseFAQItem[];
  };
  cta: {
    eyebrow: string;
    headline: string;
    accent: string;
    ctaLabel: string;
    ctaHref: string;
    platformsNote?: string;
    proofItems?: UseCaseCtaProofItem[];
  };
}
