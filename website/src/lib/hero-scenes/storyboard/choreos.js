/**
 * What arrives in the gap, line by line. Each choreography draws into a
 * 103x83 icon slot (centre 51.5, 41.5) with 2-unit strokes, and uses either
 * plain primitives or a lucide glyph (see `h.lucide`) when the glyph is the
 * right thing. Motion follows the two Figma scenes: figures are drawn on
 * (DrawSVG), dots grow by `r`, nothing is scaled while it moves.
 *
 * Every tween in `enter` is positioned from the 'in' label so a choreography
 * can be read top to bottom as a storyboard.
 */
import {gsap} from 'gsap';


const drawIn = (tl, strokes, at, {duration = 0.6, stagger = 0.08, ease = 'power2.out'} = {}) =>
	tl.fromTo(strokes, {drawSVG: '0% 0%'}, {drawSVG: '0% 100%', duration, stagger, ease}, at);

const drawOut = (tl, strokes, at, {duration = 0.35, stagger = 0.04} = {}) =>
	tl.to(strokes, {drawSVG: '100% 100%', duration, stagger, ease: 'power2.in'}, at);

// Growing overshoots (back.out); shrinking to nothing must not, or `r`
// would dip below zero for a frame.
const pop = (tl, nodes, r, at, {duration = 0.4, stagger = 0.1} = {}) =>
	tl.to(nodes, {attr: {r}, duration, stagger, ease: r > 0 ? 'back.out(1.6)' : 'power2.in'}, at);

/* ------------------------------------------------------ Conversation timeline */
// Three moments, top to bottom: a speaker dot pops in and its two lines of
// talk draw out beside it, one after another. The last moment is live: its
// dot fills in and sends a ring out.
export const timeline = {
	extent: [19.5, 82],
	build(g, h) {
		const ys = [16, 41.5, 67];
		const widths = [
			[44, 30],
			[36, 24],
			[42, 28],
		];
		const dots = ys.map((y) => h.el('circle', {cx: 24, cy: y, r: 0}));
		const lines = ys.map((y, i) => [
			h.el('line', {x1: 36, y1: y - 4.5, x2: 36 + widths[i][0], y2: y - 4.5}),
			h.el('line', {x1: 36, y1: y + 4.5, x2: 36 + widths[i][1], y2: y + 4.5}),
		]);
		const ring = h.el('circle', {cx: 24, cy: ys[2], r: 4.5, opacity: 0});
		[...lines.flat(), ring, ...dots].forEach((n) => g.appendChild(n));
		return {dots, lines, ring};
	},
	reset({dots, lines, ring}) {
		gsap.set(lines.flat(), {drawSVG: '0% 0%'});
		gsap.set(dots, {attr: {r: 0}, fill: 'none'});
		gsap.set(ring, {attr: {r: 4.5}, opacity: 0});
	},
	enter(tl, {dots, lines, ring}) {
		[0, 0.34, 0.68].forEach((at, i) => {
			pop(tl, [dots[i]], 4.5, `in+=${at}`, {duration: 0.35});
			drawIn(tl, lines[i], `in+=${at + 0.08}`, {duration: 0.4, stagger: 0.12, ease: 'power2.out'});
		});
		// The last one is happening now.
		tl.to(dots[2], {fill: 'currentColor', duration: 0.25}, 'in+=1.15');
		tl.fromTo(ring, {attr: {r: 4.5}, opacity: 0.7}, {attr: {r: 13}, opacity: 0, duration: 0.8, ease: 'power2.out'}, 'in+=1.2');
	},
	leave(tl, {dots, lines}) {
		drawOut(tl, lines.flat().reverse(), 'exit', {duration: 0.3, stagger: 0.04});
		pop(tl, [...dots].reverse(), 0, 'exit+=0.1', {duration: 0.25, stagger: 0.06});
	},
	still({dots, lines}) {
		gsap.set(lines.flat(), {drawSVG: '0% 100%'});
		gsap.set(dots, {attr: {r: 4.5}});
		gsap.set(dots[2], {fill: 'currentColor'});
	},
};

/* --------------------------------------------------------- Live context cards */
// The two lower layers draw on from the bottom up; the top one arrives from
// above; then a beacon at its top-right corner pulses once: live.
export const cards = {
	extent: [17.5, 86],
	defaults: {lead: 0.45},
	build(g, h) {
		const glyph = h.lucide(h.icons['layers'], {size: 68});
		const [top, ...rest] = glyph.strokes; // lucide draws the top plane first
		const lower = [...rest].reverse(); // bottom first
		const beacon = h.el('circle', {cx: 76, cy: 12, r: 0, fill: 'currentColor', stroke: 'none'});
		const ring = h.el('circle', {cx: 76, cy: 12, r: 3, opacity: 0});
		g.appendChild(ring);
		g.appendChild(beacon);
		return {top, lower, beacon, ring};
	},
	reset({top, lower, beacon, ring}) {
		gsap.set(lower, {drawSVG: '0% 0%'});
		gsap.set(top, {drawSVG: '0% 100%', y: -10, autoAlpha: 0});
		gsap.set(beacon, {attr: {r: 0}});
		gsap.set(ring, {attr: {r: 3}, opacity: 0});
	},
	enter(tl, {top, lower, beacon, ring}) {
		drawIn(tl, lower, 'in', {duration: 0.7, stagger: 0.28, ease: 'power2.out'});
		tl.to(top, {y: 0, autoAlpha: 1, duration: 1.1, ease: 'power2.out'}, 'in+=1.0');
		pop(tl, [beacon], 2.5, 'in+=2.0', {duration: 0.6});
		tl.fromTo(ring, {attr: {r: 3}, opacity: 0.7}, {attr: {r: 11}, opacity: 0, duration: 1.5, ease: 'power1.out'}, 'in+=2.2');
	},
	leave(tl, {top, lower, beacon}) {
		pop(tl, [beacon], 0, 'exit', {duration: 0.2});
		tl.to(top, {y: -10, autoAlpha: 0, duration: 0.35, ease: 'power2.in'}, 'exit+=0.05');
		drawOut(tl, [...lower].reverse(), 'exit+=0.2', {duration: 0.35, stagger: 0.08});
	},
	still({top, lower, beacon}) {
		gsap.set(lower, {drawSVG: '0% 100%'});
		gsap.set(top, {drawSVG: '0% 100%', y: 0, autoAlpha: 1});
		gsap.set(beacon, {attr: {r: 2.5}});
	},
};

/* ----------------------------------------------------------- Documents search */
// A page draws on, a magnifier draws over it and sweeps the lines once.
export const search = {
	extent: [14, 79],
	build(g, h) {
		const page = h.lucide(h.icons['file-text'], {size: 52, x: 14, y: 12});
		const lens = h.el('g', {class: 'sb-lens'});
		const ring = h.el('circle', {cx: 57, cy: 56, r: 10});
		const handle = h.el('line', {x1: 64.5, y1: 63.5, x2: 76, y2: 75});
		lens.appendChild(ring);
		lens.appendChild(handle);
		g.appendChild(lens);
		return {page: page.strokes, lens, ring, handle};
	},
	reset({page, ring, handle, lens}) {
		gsap.set(page, {drawSVG: '0% 0%'});
		gsap.set([ring, handle], {drawSVG: '0% 100%'});
		// Centred on the page's top-left corner.
		gsap.set(lens, {x: -34, y: -40, autoAlpha: 0});
	},
	enter(tl, {page, lens}) {
		drawIn(tl, page, 'in', {duration: 0.7, stagger: 0.09});
		// The lens fades in on the page's top-left corner and zig-zags down
		// it — middle right, bottom left — before settling bottom right.
		tl.to(lens, {autoAlpha: 1, duration: 0.5, ease: 'power2.out'}, 'in+=0.7')
			.to(lens, {x: 0, y: -18, duration: 1.0, ease: 'sine.inOut'}, 'in+=1.2')
			.to(lens, {x: -29, y: 2, duration: 1.0, ease: 'sine.inOut'})
			.to(lens, {x: 0, y: 0, duration: 0.9, ease: 'sine.inOut'});
	},
	leave(tl, {page, lens}) {
		tl.to(lens, {autoAlpha: 0, duration: 0.3, ease: 'power2.in'}, 'exit');
		drawOut(tl, page, 'exit+=0.1', {stagger: 0.04});
	},
	still({page, ring, handle, lens}) {
		gsap.set([...page, ring, handle], {drawSVG: '0% 100%'});
		gsap.set(lens, {x: 0, y: 0, autoAlpha: 1});
	},
};

/* ------------------------------------ Session summaries and actionable items */
// Three rows draw on; then the boxes get ticked one after another.
export const checks = {
	extent: [22, 82],
	build(g, h) {
		const ys = [20, 41.5, 63];
		const boxes = ys.map((y) => h.el('rect', {x: 22, y: y - 7, width: 14, height: 14, rx: 3}));
		// Two lines of text per item: a longer first line, a shorter second.
		const rows = ys.flatMap((y, i) => [
			h.el('line', {x1: 45, y1: y - 3.5, x2: [82, 74, 79][i], y2: y - 3.5}),
			h.el('line', {x1: 45, y1: y + 3.5, x2: [68, 62, 66][i], y2: y + 3.5}),
		]);
		// Ticks fill their box; each scales about the box centre as it lands.
		const ticks = ys.map((y) => {
			const tick = h.el('path', {d: `M24.5 ${y + 0.5}l3.5 3.5 7.5-8`});
			gsap.set(tick, {svgOrigin: `29 ${y}`});
			return tick;
		});
		[...boxes, ...rows, ...ticks].forEach((n) => g.appendChild(n));
		return {boxes, rows, ticks};
	},
	reset({boxes, rows, ticks}) {
		gsap.set([...boxes, ...rows, ...ticks], {drawSVG: '0% 0%'});
		gsap.set(ticks, {scale: 0.4, opacity: 0});
	},
	enter(tl, {boxes, rows, ticks}) {
		drawIn(tl, boxes, 'in', {duration: 0.45, stagger: 0.12});
		drawIn(tl, rows, 'in+=0.1', {duration: 0.4, stagger: 0.07});
		// Each tick draws itself while springing up to size.
		drawIn(tl, ticks, 'in+=0.8', {duration: 0.35, stagger: 0.28, ease: 'power2.out'});
		tl.to(ticks, {scale: 1, opacity: 1, duration: 0.45, stagger: 0.28, ease: 'back.out(2.2)'}, 'in+=0.8');
	},
	leave(tl, {boxes, rows, ticks}) {
		drawOut(tl, ticks, 'exit', {duration: 0.2, stagger: 0.05});
		drawOut(tl, [...rows, ...boxes], 'exit+=0.1', {stagger: 0.04});
	},
	still({boxes, rows, ticks}) {
		gsap.set([...boxes, ...rows, ...ticks], {drawSVG: '0% 100%'});
		gsap.set(ticks, {scale: 1, opacity: 1});
	},
};

/* ---------------------------------------------------------------- User notes */
// The notebook draws on, then two lines are written onto the page, left
// to right, one after the other.
export const notes = {
	extent: [22.5, 80.5],
	build(g, h) {
		const book = h.lucide(h.icons['notebook-pen'], {size: 58});
		const ink = [
			h.el('line', {x1: 39, y1: 49, x2: 62, y2: 49}),
			h.el('line', {x1: 39, y1: 57, x2: 62, y2: 57}),
		];
		ink.forEach((n) => g.appendChild(n));
		return {book: book.strokes, ink};
	},
	reset({book, ink}) {
		gsap.set([...book, ...ink], {drawSVG: '0% 0%'});
	},
	enter(tl, {book, ink}) {
		drawIn(tl, book, 'in', {duration: 0.55, stagger: 0.06});
		drawIn(tl, ink, 'in+=0.75', {duration: 0.5, stagger: 0.35, ease: 'power1.inOut'});
	},
	leave(tl, {book, ink}) {
		drawOut(tl, [...ink].reverse(), 'exit', {duration: 0.25, stagger: 0.08});
		drawOut(tl, book, 'exit+=0.15', {stagger: 0.03});
	},
	still({book, ink}) {
		gsap.set([...book, ...ink], {drawSVG: '0% 100%'});
	},
};

/* ------------------------------------------------------- Post session memory */
// The open book's outline draws on first, empty; then its lines of text
// appear together with a rounded outline that echoes once out of the
// book's bounds — saved.
export const memory = {
	extent: [21.5, 81.5],
	build(g, h) {
		// lucide's book-open-text, split so the pages and the text can arrive
		// on their own beats: the outline (with the spine) as one path, the
		// four text lines as their own strokes.
		const body =
			'<path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4a4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3a3 3 0 0 0-3-3z"/>' +
			'<line x1="6" y1="8" x2="8" y2="8"/><line x1="6" y1="12" x2="8" y2="12"/>' +
			'<line x1="16" y1="8" x2="18" y2="8"/><line x1="16" y1="12" x2="18" y2="12"/>';
		const glyph = h.lucide(body, {size: 60});
		glyph.g.setAttribute('stroke-linecap', 'round');
		glyph.g.setAttribute('stroke-linejoin', 'round');
		const [outline, ...lines] = glyph.strokes;
		const halo = h.el('rect', {x: 21.5, y: 11.5, width: 60, height: 60, rx: 14, opacity: 0});
		g.insertBefore(halo, g.firstChild);
		return {outline, lines, halo};
	},
	reset({outline, lines, halo}) {
		gsap.set([outline, ...lines], {drawSVG: '0% 0%'});
		gsap.set(halo, {attr: {x: 21.5, y: 11.5, width: 60, height: 60, rx: 14}, opacity: 0});
	},
	enter(tl, {outline, lines, halo}) {
		drawIn(tl, [outline], 'in', {duration: 1.2, ease: 'power1.inOut'});
		// Text and ripple land together.
		drawIn(tl, lines, 'in+=1.35', {duration: 0.35, stagger: 0.12, ease: 'power2.out'});
		tl.fromTo(
			halo,
			{attr: {x: 21.5, y: 11.5, width: 60, height: 60, rx: 14}, opacity: 0.55},
			{attr: {x: 11.5, y: 1.5, width: 80, height: 80, rx: 20}, opacity: 0, duration: 1.0, ease: 'power2.out'},
			'in+=1.35',
		);
	},
	leave(tl, {outline, lines}) {
		drawOut(tl, lines, 'exit', {duration: 0.2, stagger: 0.04});
		drawOut(tl, [outline], 'exit+=0.15', {duration: 0.5});
	},
	still({outline, lines}) {
		gsap.set([outline, ...lines], {drawSVG: '0% 100%'});
	},
};

/* ------------------------------------------ Private Mode + Built-in Local AI */
// The shield draws on, then the check lands inside it.
export const shield = {
	extent: [22.5, 80.5],
	build(_g, h) {
		const glyph = h.lucide(h.icons['shield-check'], {size: 58});
		const [outline, tick] = glyph.strokes.length > 1 ? glyph.strokes : [glyph.strokes[0], null];
		return {outline, tick};
	},
	reset({outline, tick}) {
		gsap.set([outline, tick].filter(Boolean), {drawSVG: '0% 0%'});
	},
	enter(tl, {outline, tick}) {
		drawIn(tl, [outline], 'in', {duration: 0.8});
		if (tick) drawIn(tl, [tick], 'in+=0.75', {duration: 0.35, ease: 'power3.out'});
	},
	leave(tl, {outline, tick}) {
		if (tick) drawOut(tl, [tick], 'exit', {duration: 0.2});
		drawOut(tl, [outline], 'exit+=0.1', {duration: 0.4});
	},
	still({outline, tick}) {
		gsap.set([outline, tick].filter(Boolean), {drawSVG: '0% 100%'});
	},
};

/* -------------------------------------------------------------- Ask AI Chats */
// A bubble draws on, three dots type, then the dots give way to a spark.
export const chat = {
	extent: [22, 79],
	build(g, h) {
		const bubble = h.el('path', {
			d: 'M22 22h51a6 6 0 0 1 6 6v25a6 6 0 0 1-6 6H44l-12 10V59h-10a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6z',
		});
		const dots = [35.5, 47.5, 59.5].map((x) => h.el('circle', {cx: x, cy: 40.5, r: 0}));
		const spark = h.lucide(h.icons['sparkles'], {size: 22, x: 36.5, y: 29.5});
		g.appendChild(bubble);
		dots.forEach((d) => g.appendChild(d));
		return {bubble, dots, spark: spark.strokes};
	},
	reset({bubble, dots, spark}) {
		gsap.set(bubble, {drawSVG: '0% 0%'});
		gsap.set(dots, {attr: {r: 0}, y: 0});
		gsap.set(spark, {drawSVG: '0% 0%'});
	},
	enter(tl, {bubble, dots, spark}) {
		drawIn(tl, [bubble], 'in', {duration: 0.8});
		pop(tl, dots, 2.5, 'in+=0.5', {stagger: 0.14});
		tl.to(dots, {y: -4, duration: 0.3, ease: 'sine.inOut', stagger: {each: 0.12, repeat: 1, yoyo: true}}, 'in+=0.95');
		pop(tl, dots, 0, 'in+=1.6', {duration: 0.25, stagger: 0.04});
		drawIn(tl, spark, 'in+=1.7', {duration: 0.45, stagger: 0.08, ease: 'power3.out'});
	},
	leave(tl, {bubble, spark}) {
		drawOut(tl, spark, 'exit', {duration: 0.25, stagger: 0.04});
		drawOut(tl, [bubble], 'exit+=0.1', {duration: 0.4});
	},
	still({bubble, spark}) {
		gsap.set(bubble, {drawSVG: '0% 100%'});
		gsap.set(spark, {drawSVG: '0% 100%'});
	},
};

/* ------------------------------------------------- No cloud account required */
// A cloud draws on; a stroke crosses it out and the cloud fades back.
export const cloud = {
	extent: [21.5, 81.5],
	build(g, h) {
		const glyph = h.lucide(h.icons['cloud'], {size: 60});
		const slash = h.el('line', {x1: 30, y1: 63, x2: 73, y2: 20});
		g.appendChild(slash);
		return {cloud: glyph.strokes, cloudG: glyph.g, slash};
	},
	reset({cloud, cloudG, slash}) {
		gsap.set([...cloud, slash], {drawSVG: '0% 0%'});
		gsap.set(cloudG, {opacity: 1});
	},
	enter(tl, {cloud, slash}) {
		drawIn(tl, cloud, 'in', {duration: 0.8});
		drawIn(tl, [slash], 'in+=0.8', {duration: 0.35, ease: 'power3.out'});
	},
	leave(tl, {cloud, slash}) {
		drawOut(tl, [slash], 'exit', {duration: 0.25});
		drawOut(tl, cloud, 'exit+=0.15', {duration: 0.4});
	},
	still({cloud, slash}) {
		gsap.set([...cloud, slash], {drawSVG: '0% 100%'});
	},
};

/** Lucide bodies each choreography needs at build time. */
export const CHOREO_ICONS = ['file-text', 'notebook-pen', 'book-open-text', 'shield-check', 'sparkles', 'cloud', 'layers'];
