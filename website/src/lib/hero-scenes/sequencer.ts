/**
 * Plays the hero script: every line in order — each scene runs to its `exit`
 * label (the resolved figure plus its hold), rests, fades out, and the next
 * fades in from its first frame — with a breath between blocks, looping
 * from the last line back to the first. A row of dots under the stage
 * appears one by one as the lines first play; clicking one plays that line
 * from its start and holds on it.
 *
 * Hovering the stage holds whatever is resolved on it until the pointer
 * leaves. Behind `prefers-reduced-motion: reduce` each line is shown as its
 * still frame and the dots switch between them; nothing moves.
 */
import { gsap } from 'gsap';
import { SCENES, type SceneHandles } from './index';

export interface LineSpec {
  /** Scene id in `SCENES`. */
  scene: string;
  /** The two words shown left and right of the figure. */
  words: [string, string];
  /** Transcription only: what the caret types. */
  typed?: string;
  /** Space between each word and the figure, in stage units (default 20). */
  gap?: number;
  /** Lucide icon name for this line. */
  icon: string;
  /** Seconds from first frame to `exit`; the default is `lineSeconds`. */
  seconds?: number;
}

export interface HeroScript {
  blocks: LineSpec[][];
  /** Lucide icon bodies by name (stroke-width attributes stripped). */
  icons: Record<string, string>;
  /** UI strings. */
  labels: { play: string; pause: string };
}

export interface SequencerOptions {
  /** Seconds a line is given from first frame to `exit`, unless it says otherwise. */
  lineSeconds?: number;
  /** Crossfade length in seconds. */
  fadeSeconds?: number;
  /** Pause on the resolved frame after `exit` before fading, in seconds. */
  restSeconds?: number;
  /** Extra pause between blocks, in seconds. */
  blockRestSeconds?: number;
  /** Render scale over the Figma frames (1 = the prototypes' own size). */
  stageScale?: number;
  /** Widest a line may render, in CSS px; wider lines scale down to fit. */
  maxWidth?: number;
}

const DEFAULTS: Required<SequencerOptions> = {
  lineSeconds: 3.6,
  fadeSeconds: 0.4,
  restSeconds: 3, // every line rests on its resolved frame before moving on
  blockRestSeconds: 0.5,
  stageScale: 492 / 392, // the transcription scene renders at 492px
  maxWidth: 492,
};

/** The words are measured as drawn, so the site font must be in before build. */
async function fontsReady() {
  try {
    await Promise.all([
      document.fonts.load('300 18px "Urbanist"'),
      document.fonts.load('300 18px "Onest"'),
      document.fonts.ready,
    ]);
  } catch {
    /* fall through with whatever font is available */
  }
}

const wait = (seconds: number) =>
  new Promise<void>((resolve) => {
    gsap.delayedCall(seconds, resolve);
  });

export function mountHeroScenes(stage: HTMLElement, script: HeroScript, options: SequencerOptions = {}) {
  const cfg = { ...DEFAULTS, ...options };
  let dispose: (() => void) | null = null;
  let cancelled = false;

  fontsReady().then(() => {
    if (cancelled) return;
    dispose = start(stage, script, cfg);
  });

  return () => {
    cancelled = true;
    dispose?.();
  };
}

/* ----------------------------------------------------------------- dots */

/** A click hides the button's tooltip until the pointer leaves and returns. */
function dismissTipOnClick(button: HTMLElement) {
  button.addEventListener('click', () => button.classList.add('is-clicked'));
  button.addEventListener('pointerleave', () => button.classList.remove('is-clicked'));
}

function buildDots(
  stage: HTMLElement,
  script: HeroScript,
  onPick: (index: number) => void,
  onToggle: () => void,
) {
  const lines = script.blocks.flat();
  const nav = document.createElement('div');
  nav.className = 'hero-dots';
  nav.setAttribute('role', 'tablist');
  const dots = lines.map((line, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `${line.words[0]} ${line.words[1]}`);
    const tip = document.createElement('span');
    tip.className = 'hero-dot-tip';
    tip.setAttribute('aria-hidden', 'true');
    tip.textContent = `${line.words[0]} ${line.words[1]}`;
    dot.appendChild(tip);
    dot.addEventListener('click', () => onPick(i));
    dismissTipOnClick(dot);
    nav.appendChild(dot);
    return dot;
  });

  // Play / pause, after the dots.
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'hero-dot hero-dot-toggle is-shown';
  const toggleTip = document.createElement('span');
  toggleTip.className = 'hero-dot-tip';
  toggleTip.setAttribute('aria-hidden', 'true');
  toggle.addEventListener('click', onToggle);
  dismissTipOnClick(toggle);
  nav.appendChild(toggle);
  const setPlaying = (playing: boolean) => {
    const icon = script.icons[playing ? 'pause' : 'play'] ?? '';
    const label = playing ? script.labels.pause : script.labels.play;
    toggle.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg>`;
    toggle.appendChild(toggleTip);
    toggleTip.textContent = label;
    toggle.setAttribute('aria-label', label);
    toggle.classList.toggle('is-playing', playing);
  };
  setPlaying(true);

  stage.appendChild(nav);
  const setActive = (index: number) =>
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
  // Dots appear one by one, as their line first plays.
  const reveal = (index: number) => dots[index].classList.add('is-shown');
  const revealAll = () => dots.forEach((dot) => dot.classList.add('is-shown'));
  // The row takes the width of the scene on stage, so its centre is the
  // scene's centre rather than the stage's.
  const fit = (wrap: HTMLElement) => {
    nav.style.width = wrap.style.width;
  };
  return { nav, dots, setActive, reveal, revealAll, fit, setPlaying };
}

/* ------------------------------------------------------------ playback */

interface Playing {
  wrap: HTMLDivElement;
  handles: SceneHandles;
}

function mountLine(stage: HTMLElement, line: LineSpec, script: HeroScript, cfg: Required<SequencerOptions>): Playing | null {
  const module = SCENES[line.scene];
  if (!module) return null;
  const wrap = document.createElement('div');
  wrap.className = `hero-scene hero-scene-${line.scene}`;
  wrap.setAttribute('aria-hidden', 'true');
  stage.appendChild(wrap);
  const handles = module.build(wrap, { words: line.words, typed: line.typed, gap: line.gap, icons: script.icons });
  const width = Math.min(handles.width * cfg.stageScale, cfg.maxWidth);
  wrap.style.width = `min(${Math.ceil(width)}px, 100%)`;
  gsap.set(wrap, { autoAlpha: 0 });
  return { wrap, handles };
}

function start(stage: HTMLElement, script: HeroScript, cfg: Required<SequencerOptions>) {
  const entries = script.blocks.flatMap((block) =>
    block.map((line, i) => ({ line, lastInBlock: i === block.length - 1 })),
  );
  const lines = entries.map((e) => e.line);
  const mm = gsap.matchMedia();
  const ui = buildDots(
    stage,
    script,
    (i) => pick?.(i),
    () => toggle?.(),
  );
  let pick: ((index: number) => void) | null = null;
  let toggle: (() => void) | null = null;

  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      if (entries.length === 0) return;

      // Whatever is on the stage right now.
      let current: { tl: gsap.core.Timeline | null; wrap: HTMLDivElement; atExit?: boolean } | null = null;
      let generation = 0;
      let alive = true;

      const clear = async (fade: number) => {
        const prev = current;
        current = null;
        if (!prev) return;
        prev.tl?.kill();
        await gsap.to(prev.wrap, { autoAlpha: 0, duration: fade, ease: 'power2.in' });
        prev.wrap.remove();
      };

      /* ---- reduced motion: still frames, switched by the dots ---- */
      if (context.conditions?.reduced) {
        const show = (index: number) => {
          clear(0);
          const playing = mountLine(stage, lines[index], script, cfg);
          if (!playing) return;
          SCENES[lines[index].scene].still(playing.handles);
          gsap.set(playing.wrap, { autoAlpha: 1 });
          current = { tl: null, wrap: playing.wrap };
          ui.fit(playing.wrap);
          ui.setActive(index);
        };
        pick = show;
        ui.revealAll();
        ui.setPlaying(false);
        show(0);
        return () => {
          pick = null;
          clear(0);
        };
      }

      /* ---- motion ---- */

      // Hovering the stage holds whatever is resolved on it until the
      // pointer leaves. Pointer devices only; touch never "leaves".
      let hovered = false;
      const released: Array<() => void> = [];
      const canHover = window.matchMedia('(hover: hover)').matches;
      const onEnter = () => {
        hovered = true;
      };
      const onLeave = () => {
        hovered = false;
        released.splice(0).forEach((resolve) => resolve());
      };
      // pointerleave can be missed when the element under the pointer is
      // replaced (the toggle re-renders its icon), so any move outside the
      // stage also counts as leaving.
      const onMove = (event: PointerEvent) => {
        const inside = stage.contains(event.target as Node);
        if (inside && !hovered) onEnter();
        else if (!inside && hovered) onLeave();
      };
      if (canHover) {
        stage.addEventListener('pointerenter', onEnter);
        stage.addEventListener('pointerleave', onLeave);
        document.addEventListener('pointermove', onMove, { passive: true });
      }
      const untilReleased = () =>
        hovered ? new Promise<void>((resolve) => released.push(resolve)) : Promise.resolve();

      // Playback gate: the pause button stops the clock; a dot click holds
      // on its line until play is pressed again.
      let paused = false;
      let auto = true;
      const resumed: Array<() => void> = [];
      const untilPlaying = () =>
        paused || !auto ? new Promise<void>((resolve) => resumed.push(resolve)) : Promise.resolve();
      const releasePlaying = () => {
        if (!paused && auto) resumed.splice(0).forEach((resolve) => resolve());
      };

      /**
       * Plays line `index` from its first frame to its resolved frame and
       * resolves once it has rested there (and the pointer has left). The
       * line stays on the stage; the next play fades it out. Resolves false
       * if something else took over meanwhile.
       */
      const play = (index: number, gen: number) =>
        new Promise<boolean>((resolve) => {
          clear(cfg.fadeSeconds).then(() => {
            if (gen !== generation || !alive) return resolve(false);
            const playing = mountLine(stage, lines[index], script, cfg);
            if (!playing) return resolve(false);
            const { wrap, handles } = playing;
            const tl = SCENES[lines[index].scene].create(handles, { repeat: 0 });
            const me = { tl, wrap, atExit: false };
            current = me;
            ui.fit(wrap);
            ui.reveal(index);
            ui.setActive(index);

            // Fit every line to its clock, whatever its native rhythm.
            const exitAt = tl.labels.exit ?? tl.duration();
            tl.timeScale(exitAt / (lines[index].seconds ?? cfg.lineSeconds));
            tl.pause(0);
            gsap.to(wrap, { autoAlpha: 1, duration: cfg.fadeSeconds, ease: 'power2.out' });
            if (!paused) tl.play();

            tl.call(
              async () => {
                tl.pause(); // hold the resolved frame; the unwind is not part of the sequence
                me.atExit = true;
                stage.dataset.heroPhase = 'rest';
                await wait(cfg.restSeconds);
                stage.dataset.heroPhase = hovered ? 'hover-hold' : 'rested';
                await untilReleased();
                stage.dataset.heroPhase = paused || !auto ? 'hold' : 'released';
                await untilPlaying();
                stage.dataset.heroPhase = 'next';
                resolve(gen === generation && alive);
              },
              [],
              'exit',
            );
          });
        });

      // The script loops, last line back to first. A dot click plays its
      // line and holds there (auto off); play starts the loop again from it.
      const run = async (from: number, gen: number) => {
        for (let i = from; ; i = (i + 1) % entries.length) {
          const ok = await play(i, gen);
          if (!ok) return;
          if (entries[i].lastInBlock) await wait(cfg.blockRestSeconds);
          if (gen !== generation || !alive) return;
        }
      };
      run(0, ++generation);

      pick = (index) => {
        auto = false;
        ui.setPlaying(false);
        run(index, ++generation);
      };

      toggle = () => {
        if (paused || !auto) {
          paused = false;
          auto = true;
          if (current?.tl && !current.atExit) current.tl.play();
          ui.setPlaying(true);
          releasePlaying();
        } else {
          paused = true;
          current?.tl?.pause();
          ui.setPlaying(false);
        }
      };

      return () => {
        alive = false;
        generation++;
        pick = null;
        if (canHover) {
          stage.removeEventListener('pointerenter', onEnter);
          stage.removeEventListener('pointerleave', onLeave);
          document.removeEventListener('pointermove', onMove);
        }
        released.splice(0).forEach((resolve) => resolve());
        resumed.splice(0).forEach((resolve) => resolve());
        toggle = null;
        clear(0);
      };
    },
  );

  return () => {
    mm.revert();
    ui.nav.remove();
    stage.querySelectorAll('.hero-scene').forEach((n) => n.remove());
  };
}
