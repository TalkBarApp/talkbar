/**
 * Luna — the storyboard 33:872 as one GSAP timeline.
 *
 *   01  words together
 *   02  words move apart, the 31 Figma line-vectors appear and behave like a
 *       live sound wave
 *   03  the wave collapses inward; "Line 16" — the one 76px bar — is the only
 *       thing left, and it slides to the centre of the gap
 *   04  that line MorphSVGs into the "Union" outline, i.e. the letter A
 *
 * Then it unwinds the same way and loops.
 *
 * Every shape is a Figma object (see figma-source.js). The only geometry this
 * file invents is the *collapsed* form of the A: the same vertex list with all
 * x pushed onto the line and all y stretched over the line's 76px. That gives
 * MorphSVG a perfect 1:1 vertex mapping, so the letter unfolds sideways out of
 * the line instead of scrambling.
 */
import {gsap} from 'gsap';
import F from './figma-source.js';

/*
 * Frame 04 is not Figma's letter A any more: the surviving bar shrinks to a
 * text caret, slides to the left edge of the gap and types a phrase in the
 * site font — speech becoming words. Everything up to frame 03 is as drawn.
 */

/**
 * Width of one space in the rendered font, taken from the difference between
 * "a a" and "aa" so it survives kerning and fallback fonts alike.
 */
function spaceWidth(textNode) {
	const probe = textNode.cloneNode(false);
	probe.removeAttribute('x');
	textNode.parentNode.appendChild(probe);
	probe.textContent = 'a\u00A0a';
	const withSpace = probe.getComputedTextLength();
	probe.textContent = 'aa';
	const without = probe.getComputedTextLength();
	probe.remove();
	return Math.max(2, withSpace - without);
}

const Luna = (() => {

	/* ---------------------------------------------------------------- paths */

	// The Figma fillGeometry only ever uses absolute M / L / Z.
	function parsePath(d) {
		const subpaths = [];
		let current = null;
		const tokens = d.match(/[MLZ][^MLZ]*/gi) || [];
		for (const token of tokens) {
			const cmd = token[0].toUpperCase();
			if (cmd === 'Z') continue;
			const [x, y] = token
				.slice(1)
				.trim()
				.split(/[\s,]+/)
				.map(Number);
			if (cmd === 'M') {
				current = [];
				subpaths.push(current);
			}
			current.push([x, y]);
		}
		return subpaths;
	}

	const toPath = (subpaths) =>
		subpaths
			.map(
				(pts) =>
					'M' +
					pts.map(([x, y]) => `${round(x)} ${round(y)}`).join('L') +
					'Z',
			)
			.join('');

	const round = (n) => Math.round(n * 1000) / 1000;

	// How far the surviving bar (33:914, cx 217) travels to reach the spot Figma
	// gives the lone line of frame 03 (cx 182). The glyph carries this as a plain
	// translateX from the collapse onward.
	const HERO_SHIFT = F.line.cx - F.hero.cx; // -35

	// The caret: the same object as the bar, at text height.
	const CARET_H = 22;
	const CARET_GAP = 3; // phrase end -> caret

	const SHAPES = {
		// 33:914 in frame 02 and 33:950 in frame 03 are the same object, so one
		// path serves both: the bar slides to the line's x, it does not become it.
		bar: `M${F.hero.cx} ${F.hero.top}L${F.hero.cx} ${F.hero.top + F.hero.h}`,
	};

	/* ---------------------------------------------------------------- scene */

	const NS = 'http://www.w3.org/2000/svg';
	const el = (name, attrs) => {
		const node = document.createElementNS(NS, name);
		for (const k in attrs) node.setAttribute(k, attrs[k]);
		return node;
	};

	/**
	 * The wave lives at Figma's coordinates (gap 83..281, centre 182). The words
	 * are real text in the site font, so their widths are measured once rendered
	 * and the two of them are laid out against that fixed gap: frame 02 has them
	 * flush to either edge of it, frame 01 has them joined by one space and
	 * centred on it.
	 */
	// The wave's outermost bars: everything the words keep their distance from.
	const WAVE_L = Math.min(...F.bars.map((bar) => bar.cx), F.hero.cx); // 112
	const WAVE_R = Math.max(...F.bars.map((bar) => bar.cx), F.hero.cx); // 262

	/**
	 * `gap` is the distance from each word's ink to the nearest wave bar —
	 * the same meaning it has in the other scenes. Figma's own frame sits at
	 * roughly 20.
	 */
	function measure(words, gap = 20) {
		const w = words.map((node) => node.getComputedTextLength());
		const space = spaceWidth(words[0]);
		const gapL = WAVE_L - gap;
		const gapR = WAVE_R + gap;
		const centre = (gapL + gapR) / 2;

		const split = [gapL - w[0], gapR];
		const joinedLeft = centre - (w[0] + space + w[1]) / 2;
		const joined = [joinedLeft, joinedLeft + w[0] + space];

		const minX = Math.min(0, split[0]);
		const maxX = Math.max(F.STAGE.w, split[1] + w[1]);
		return {
			split,
			join: split.map((x, i) => joined[i] - x),
			minX,
			width: maxX - minX,
		};
	}

	/**
	 * Builds the SVG scene inside `mount` and returns handles to its parts.
	 * `options.words` — the two words, left and right of the wave.
	 */
	function build(mount, options = {}) {
		const chars = options.words || F.words.map((word) => word.chars.trim());
		const phrase = options.typed || 'Hello, everyone.';
		const svg = el('svg', {
			viewBox: `0 -22 ${F.STAGE.w} ${F.STAGE.h + 44}`,
			xmlns: NS,
			'aria-hidden': 'true',
		});

		const wave = el('g', {
			class: 'luna-wave',
			stroke: F.COLOR.wave,
			'stroke-width': 2,
			fill: 'none',
		});
		const bars = F.bars.map((bar) => {
			const node = el('line', {
				x1: bar.cx,
				x2: bar.cx,
				y1: bar.top,
				y2: bar.top + bar.h,
				'data-figma': bar.name,
			});
			wave.appendChild(node);
			return node;
		});

		// "Line 16" is a <path> rather than a <line> because it is the object
		// that morphs; at rest its d is identical to the other bars' geometry.
		const glyph = el('path', {
			class: 'luna-glyph',
			d: SHAPES.bar,
			stroke: F.COLOR.wave,
			'stroke-width': F.letter.strokeWeight,
			'stroke-linejoin': 'miter',
			'stroke-miterlimit': 10,
			fill: 'none',
			'data-figma': 'Line 16 / Union',
		});

		// The phrase sits centred on the line of frame 03 and is revealed through
		// a clip that opens from that centre outward — so it unfolds out of the
		// line the way the A did, and the room it needs is measured, not assumed.
		const gapL = WAVE_L - (options.gap ?? 20);
		const gapR = WAVE_R + (options.gap ?? 20);
		const clipId = `luna-clip-${Math.random().toString(36).slice(2, 8)}`;
		const clip = el('clipPath', {id: clipId});
		const clipRect = el('rect', {x: F.line.cx, y: -22, width: 0, height: F.STAGE.h + 44});
		clip.appendChild(clipRect);
		const typed = el('text', {
			class: 'luna-typed',
			x: F.line.cx,
			y: F.type.baseline,
			'text-anchor': 'middle',
			fill: F.COLOR.wave,
			'clip-path': `url(#${clipId})`,
		});
		typed.textContent = phrase;

		const words = F.words.map((word, i) => {
			const node = el('text', {
				x: word.x,
				y: F.type.baseline,
				fill: F.COLOR.text,
				'data-figma': word.chars.trim(),
			});
			node.textContent = chars[i];
			svg.appendChild(node);
			return node;
		});

		svg.appendChild(clip);
		svg.appendChild(wave);
		svg.appendChild(glyph);
		svg.appendChild(typed);
		mount.appendChild(svg);

		let phraseW = typed.getComputedTextLength();
		const room = gapR - gapL - 2 * CARET_GAP - 8;
		if (phraseW > room) {
			typed.setAttribute('textLength', room);
			typed.setAttribute('lengthAdjust', 'spacingAndGlyphs');
			phraseW = room;
		}

		// Measured only now — the type has to be on screen to be measured.
		const layout = measure(words, options.gap);
		words.forEach((node, i) => node.setAttribute('x', layout.split[i]));
		svg.setAttribute('viewBox', `${layout.minX} -22 ${layout.width} ${F.STAGE.h + 44}`);

		return {
			svg,
			bars,
			glyph,
			typed,
			phrase,
			phraseW,
			clipRect,
			// glyph translateX that parks the caret just past the phrase's end
			caretEnd: HERO_SHIFT + phraseW / 2 + CARET_GAP,
			words,
			layout,
			width: layout.width,
		};
	}

	/* --------------------------------------------------------------- motion */

	const DEFAULTS = {
		split: 0.85, // 01 -> 02: the words move apart
		splitEase: 'power3.inOut',
		barsIn: 0.55, // the wave opens up centre-first, already pulsing
		barsInStagger: 0.02,
		listen: 0.5, // 02: the sound-wave beat
		waveAmp: 0.26, // per-bar wobble around the Figma silhouette
		waveEnv: 0.28, // shared loudness envelope on top of it
		waveCeil: 0.57, // soft ceiling/floor on the combined deviation
		waveSpeed: 1,
		collapse: 0.3, // 02 -> 03: bars shrink away, the 76px one survives
		collapseStagger: 0.012,
		collapseEase: 'power2.inOut',
		caret: 0.35, // 03 -> 04: the line shrinks to caret height, in place
		unfold: 0.8, // the phrase opens out of it, centre-first, caret riding the edge
		unfoldEase: 'power2.inOut',
		blink: 0.42, // caret blink half-period on the hold
		blinks: 2,
		hold: 0.3, // pause after the last blink
		refold: 0.5, // the unwind closes the phrase back into the line
		reset: 0.7,
		tail: 0.4,
		repeat: -1, // -1 loops forever; 0 plays once (the hero sequencer uses 0)
	};

	// Deterministic per-bar character, so the wave looks organic but the
	// timeline is fully scrubbable.
	function seeded(seed) {
		let s = seed >>> 0;
		return () => {
			s = (s * 1664525 + 1013904223) >>> 0;
			return s / 4294967296;
		};
	}

	function voices(count) {
		const rand = seeded(0x1ea7);
		return Array.from({length: count}, () => ({
			amp: 0.4 + rand() * 0.6, // scaled by cfg.waveAmp at render time
			freq: 0.45 + rand() * 0.95,
			phase: rand(),
		}));
	}

	function create(scene, options) {
		const cfg = Object.assign({}, DEFAULTS, options);
		const parts = [scene.glyph, ...scene.bars];
		const origins = [F.hero, ...F.bars];
		const voice = voices(parts.length);

		// Every bar scales about its own Figma midpoint.
		parts.forEach((node, i) =>
			gsap.set(node, {svgOrigin: `${origins[i].cx} ${origins[i].cy}`}),
		);

		// Rank the bars by distance from the line everything resolves to: the
		// wave appears centre-first and collapses outside-in, so the two orders
		// are just this list forwards and backwards.
		const ranked = parts
			.map((_, i) => i)
			.sort(
				(a, b) =>
					Math.abs(origins[a].cx - F.line.cx) -
					Math.abs(origins[b].cx - F.line.cx),
			);

		// The entry is a per-bar 0..1 gate rather than a scaleY tween, because
		// scaleY belongs to the wave: a bar is already pulsing as it grows in.
		const gate = parts.map(() => ({k: 0}));
		const gatesInsideOut = ranked.map((i) => gate[i]);
		const barsOutsideIn = ranked
			.filter((i) => parts[i] !== scene.glyph)
			.reverse()
			.map((i) => parts[i]);

		let waveStart = Infinity;
		let waveEnd = Infinity;

		// Amplitude is full from the very first frame, then eases out at the end
		// so the beat finishes on the exact Figma silhouette — which is the state
		// the collapse, and the 76px line that survives it, start from.
		const fade = (elapsed) => {
			const span = waveEnd - waveStart;
			const edge = Math.min(0.5, span / 4);
			const k = Math.max(0, Math.min(1, (span - elapsed) / edge));
			return k * k * (3 - 2 * k);
		};

		function renderWave(elapsed) {
			const t = elapsed * cfg.waveSpeed;
			const w = fade(elapsed);
			const env =
				cfg.waveEnv *
				(0.5 * Math.sin(2 * Math.PI * 0.31 * t) +
					0.5 * Math.sin(2 * Math.PI * 0.17 * t + 1.3));
			for (let i = 0; i < parts.length; i++) {
				const v = voice[i];
				const wobble =
					cfg.waveAmp * v.amp * Math.sin(2 * Math.PI * (v.freq * t + v.phase));
				// Soft limiter instead of a hard clamp — peaks round off rather
				// than flattening into a plateau.
				const d = w * (env + wobble);
				gsap.set(parts[i], {
					scaleY: gate[i].k * (1 + cfg.waveCeil * Math.tanh(d / cfg.waveCeil)),
				});
			}
		}

		// The wave is driven from the timeline's own onUpdate rather than from a
		// tween's: a timeline renders its children first and calls onUpdate last,
		// so the procedural scaleY is always the final write and can never be
		// clobbered by a neighbouring tween re-rendering on a seek. `lazy: false`
		// keeps GSAP from deferring those writes past this point.
		const tl = gsap.timeline({
			repeat: cfg.repeat,
			defaults: {ease: 'power2.inOut', lazy: false},
			onUpdate() {
				const t = tl.time();
				if (t < waveStart || t > waveEnd) return;
				renderWave(t - waveStart);
			},
		});

		tl
			// --- 01 : the words sit together, nothing else is on stage
			.set(scene.words, {x: (i) => scene.layout.join[i]})
			.set(parts, {scaleY: 0, x: 0})
			.set(gate, {k: 0})
			.set(scene.glyph, {attr: {d: SHAPES.bar}, opacity: 1, y: 0})
			.set(scene.clipRect, {attr: {x: F.line.cx, width: 0}})
			.addLabel('01')

			// --- 01 -> 02 : the words move apart and the wave fills the gap,
			// already pulsing as each bar opens up.
			.to(scene.words, {x: 0, duration: cfg.split, ease: cfg.splitEase})
			.to(
				gatesInsideOut,
				{
					k: 1,
					duration: cfg.barsIn,
					ease: 'back.out(1.6)',
					stagger: cfg.barsInStagger,
				},
				`-=${cfg.split * 0.55}`,
			);

		waveStart = tl.recent().startTime();

		tl
			.addLabel('02')

			// --- 02 : the sound wave (rendered by the timeline's onUpdate)
			.to({}, {duration: cfg.listen})
			.addLabel('collapse')

			// The wave beat is the only thing that writes scaleY, and it writes
			// nothing outside its own window — so the resting state is pinned here
			// explicitly. Playing through, the fade-out has already landed on
			// exactly 1; seeking straight into 03 or 04 now lands there too.
			.set(parts, {scaleY: 1})

			// --- 02 -> 03 : each bar shrinks straight down to nothing on its own
			// axis, outside-in. Nothing slides sideways. The only survivor is
			// Line 16 — the 76px one — and it glides to the centre of the gap.
			.to(barsOutsideIn, {
				scaleY: 0,
				duration: cfg.collapse,
				ease: cfg.collapseEase,
				stagger: cfg.collapseStagger,
			})
			.to(
				scene.glyph,
				{
					x: HERO_SHIFT,
					duration: cfg.collapse + cfg.collapseStagger * barsOutsideIn.length,
					ease: cfg.collapseEase,
				},
				'<',
			)
			.addLabel('03')

			// --- 03 -> 04 : the line shrinks to caret height where it stands...
			.to(scene.glyph, {
				scaleY: CARET_H / F.hero.h,
				y: F.type.baseline - 7 - F.hero.cy,
				duration: cfg.caret,
				ease: 'power2.inOut',
			})
			// ...and the phrase unfolds out of it, centre outward, the caret
			// riding the right-hand edge until it rests at the end.
			.to(scene.clipRect, {
				attr: {x: F.line.cx - scene.phraseW / 2 - 2, width: scene.phraseW + 4},
				duration: cfg.unfold,
				ease: cfg.unfoldEase,
			})
			.to(scene.glyph, {x: scene.caretEnd, duration: cfg.unfold, ease: cfg.unfoldEase}, '<')
			.addLabel('04')
			.to(scene.glyph, {
				opacity: 0,
				duration: cfg.blink,
				ease: 'steps(1)',
				repeat: cfg.blinks * 2 - 1,
				yoyo: true,
			})
			.to({}, {duration: cfg.hold})
			.addLabel('exit')

			// --- back to 01 : the phrase folds back into the caret, which grows
			// back into the line, and the line drops away.
			.to(scene.clipRect, {attr: {x: F.line.cx, width: 0}, duration: cfg.refold, ease: 'power2.in'})
			.to(scene.glyph, {x: HERO_SHIFT, duration: cfg.refold, ease: 'power2.in'}, '<')
			.to(scene.glyph, {scaleY: 1, y: 0, duration: cfg.caret, ease: 'power2.inOut'})
			.to(scene.glyph, {scaleY: 0, duration: cfg.reset * 0.5, ease: 'power2.in'})
			.to(
				scene.words,
				{
					x: (i) => scene.layout.join[i],
					duration: cfg.reset,
					ease: cfg.splitEase,
				},
				'<',
			)
			.to({}, {duration: cfg.tail});

		waveEnd = tl.labels['collapse'];

		return tl;
	}

	/**
	 * Frame 04 composed with no motion — the words apart, the A standing in
	 * the gap. Used behind `prefers-reduced-motion: reduce`.
	 */
	function still(scene) {
		gsap.set(scene.words, {x: 0});
		gsap.set(scene.bars, {scaleY: 0});
		gsap.set(scene.clipRect, {attr: {x: F.line.cx - scene.phraseW / 2 - 2, width: scene.phraseW + 4}});
		gsap.set(scene.glyph, {
			scaleY: CARET_H / F.hero.h,
			y: F.type.baseline - 7 - F.hero.cy,
			x: scene.caretEnd,
			opacity: 1,
		});
	}

	return {build, create, still, SHAPES, DEFAULTS, parsePath, toPath};
})();

export default Luna;
