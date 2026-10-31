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
window.Luna = (() => {
	const F = window.LunaFigma;

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

	// The Union resolves to two contours: the outer A and the inner counter.
	// They are kept apart on purpose — the outer one unfolds out of the line,
	// the counter is drawn in afterwards as its own beat.
	const [LETTER_OUTER, LETTER_COUNTER] = parsePath(F.letter.path);

	// How far the surviving bar (33:914, cx 217) travels to reach the spot Figma
	// gives the lone line of frame 03 (cx 182). The glyph carries this as a plain
	// translateX from the collapse onward — it never morphs to get there.
	const HERO_SHIFT = F.line.cx - F.hero.cx; // -35

	/**
	 * The A in stage coordinates, pre-shifted back by HERO_SHIFT so it lands
	 * exactly where Figma puts it once the glyph's translateX is applied. That
	 * keeps every path the glyph ever draws in one coordinate space.
	 */
	const letterPath = toPath([
		LETTER_OUTER.map(([x, y]) => [
			x + F.letter.offset.x - HERO_SHIFT,
			y + F.letter.offset.y,
		]),
	]);

	/**
	 * The counter, in plain stage coordinates. It never moves and never morphs,
	 * so unlike the outer contour it needs no HERO_SHIFT compensation — it just
	 * gets drawn on once the A is already standing there.
	 */
	const counterPath = toPath([
		LETTER_COUNTER.map(([x, y]) => [
			x + F.letter.offset.x,
			y + F.letter.offset.y,
		]),
	]);

	/**
	 * The same vertex list squashed onto a single vertical stroke: x collapses
	 * to `cx`, y is remapped from the letter's 65.45px height onto the bar's
	 * own height. Renders as an ordinary 2px vertical line — the inner counter
	 * lies exactly on top of the outer contour and is invisible.
	 */
	function collapsedPath(cx, top, h) {
		return toPath([
			LETTER_OUTER.map(([, y]) => [cx, top + (y / F.letter.h) * h]),
		]);
	}

	const SHAPES = {
		// 33:914 in frame 02 and 33:950 in frame 03 are the same object, so one
		// path serves both: the bar slides to the line's x, it does not become it.
		bar: collapsedPath(F.hero.cx, F.hero.top, F.hero.h),
		letter: letterPath, // 33:981 outer contour, frame 04
		counter: counterPath, // 33:981 inner triangle
	};

	/* ---------------------------------------------------------------- scene */

	const NS = 'http://www.w3.org/2000/svg';
	const el = (name, attrs) => {
		const node = document.createElementNS(NS, name);
		for (const k in attrs) node.setAttribute(k, attrs[k]);
		return node;
	};

	/** Builds the SVG scene inside `mount` and returns handles to its parts. */
	function build(mount) {
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

		// Drawn separately from the glyph, so it can arrive on its own beat.
		const counter = el('path', {
			class: 'luna-counter',
			d: SHAPES.counter,
			stroke: F.COLOR.wave,
			'stroke-width': F.letter.strokeWeight,
			'stroke-linejoin': 'miter',
			'stroke-miterlimit': 10,
			fill: 'none',
			'data-figma': 'Union / counter',
		});

		const words = F.words.map((word) => {
			const node = el('text', {
				x: word.x,
				y: F.type.baseline,
				textLength: word.width,
				lengthAdjust: 'spacing',
				fill: F.COLOR.text,
				'data-figma': word.chars.trim(),
			});
			node.textContent = word.chars;
			svg.appendChild(node);
			return node;
		});

		svg.appendChild(wave);
		svg.appendChild(glyph);
		svg.appendChild(counter);
		mount.appendChild(svg);

		return {svg, bars, glyph, counter, words};
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
		morph: 0.9, // 03 -> 04: line -> A
		morphEase: 'power2.inOut',
		shapeIndex: 0,
		counter: 0.5, // the inner triangle draws itself in as its own beat
		counterEase: 'power2.inOut',
		counterOverlap: 0.1, // how far it starts before the outline settles
		hold: 1.1, // 04 holds
		unmorph: 0.6, // and unwinds
		reset: 0.7,
		tail: 0.4,
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
			.map((node, i) => i)
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
			repeat: -1,
			defaults: {ease: 'power2.inOut', lazy: false},
			onUpdate() {
				const t = tl.time();
				if (t < waveStart || t > waveEnd) return;
				renderWave(t - waveStart);
			},
		});

		tl
			// --- 01 : the words sit together, nothing else is on stage
			.set(scene.words[0], {x: F.words[0].join})
			.set(scene.words[1], {x: F.words[1].join})
			.set(parts, {scaleY: 0, x: 0})
			.set(gate, {k: 0})
			.set(scene.glyph, {attr: {d: SHAPES.bar}})
			.set(scene.counter, {drawSVG: '0% 0%'})
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

			// --- 03 -> 04 : the line unfolds into the A's outer contour...
			.to(scene.glyph, {
				morphSVG: {shape: SHAPES.letter, shapeIndex: cfg.shapeIndex},
				duration: cfg.morph,
				ease: cfg.morphEase,
			})
			// ...and only then the counter draws itself in, on its own.
			.to(
				scene.counter,
				{
					drawSVG: '0% 100%',
					duration: cfg.counter,
					ease: cfg.counterEase,
				},
				`-=${cfg.counterOverlap}`,
			)
			.addLabel('04')
			.to({}, {duration: cfg.hold})

			// --- back to 01 : the counter leaves the way it arrived, the A folds
			// back into the line, and the line drops away.
			.to(scene.counter, {
				drawSVG: '0% 0%',
				duration: cfg.counter * 0.6,
				ease: 'power2.in',
			})
			.to(scene.glyph, {
				morphSVG: {shape: SHAPES.bar, shapeIndex: cfg.shapeIndex},
				duration: cfg.unmorph,
				ease: 'power2.in',
			})
			.to(scene.glyph, {scaleY: 0, duration: cfg.reset * 0.5, ease: 'power2.in'})
			.to(
				scene.words,
				{
					x: (i) => F.words[i].join,
					duration: cfg.reset,
					ease: cfg.splitEase,
				},
				'<',
			)
			.to({}, {duration: cfg.tail});

		waveEnd = tl.labels['collapse'];

		return tl;
	}

	return {build, create, SHAPES, DEFAULTS, collapsedPath, parsePath, toPath};
})();
