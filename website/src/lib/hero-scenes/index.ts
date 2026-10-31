/**
 * Hero scenes — the storyboard lines that play above the hero headline, one
 * after another, then all together in the overview.
 *
 * Two lines are Figma storyboards ported from `design/animation/*` (Luna,
 * Chorus). The rest are built on the same construction by `defineStoryboard`
 * with a short choreography each (see `storyboard/choreos.js`). Every scene
 * exposes the same API — `build(mount, options)`, `create(scene, options)`
 * returning a timeline with an `exit` label, `still(scene)` — so the
 * sequencer treats them alike. To add a line: write a choreography, register
 * it here, add its words to the translations and the script in
 * `HeroScenes.astro`.
 */
import Luna from './luna/luna.js';
import Chorus from './chorus/chorus.js';
import { defineStoryboard } from './storyboard/storyboard.js';
import * as choreos from './storyboard/choreos.js';

export interface SceneHandles {
  svg: SVGSVGElement;
  /** Natural stage width in CSS px once the words are measured. */
  width: number;
  [part: string]: unknown;
}

export interface SceneOptions {
  /** The two words shown left and right of the figure. */
  words?: [string, string];
  /** Transcription only: what the caret types. */
  typed?: string;
  /** Space between each word's ink and the figure, in stage units (default 20).
   *  For the transcription scene it offsets the words from the wave's edges. */
  gap?: number;
  /** Lucide icon bodies by name, for choreographies that draw a glyph. */
  icons?: Record<string, string>;
}

export interface SceneModule {
  build(mount: HTMLElement, options?: SceneOptions): SceneHandles;
  create(scene: SceneHandles, options?: Record<string, unknown>): gsap.core.Timeline;
  still(scene: SceneHandles): void;
}

export const SCENES: Record<string, SceneModule> = {
  transcription: Luna as SceneModule,
  speakers: Chorus as SceneModule,
  timeline: defineStoryboard(choreos.timeline) as SceneModule,
  cards: defineStoryboard(choreos.cards) as SceneModule,
  search: defineStoryboard(choreos.search) as SceneModule,
  checks: defineStoryboard(choreos.checks) as SceneModule,
  notes: defineStoryboard(choreos.notes) as SceneModule,
  memory: defineStoryboard(choreos.memory) as SceneModule,
  shield: defineStoryboard(choreos.shield) as SceneModule,
  chat: defineStoryboard(choreos.chat) as SceneModule,
  cloud: defineStoryboard(choreos.cloud) as SceneModule,
};

export { CHOREO_ICONS } from './storyboard/choreos.js';
