/**
 * Storyboard — the construction shared by every line after the two Figma
 * scenes, and lifted straight from them:
 *
 *   01  the two words sit as one line
 *   02  they move apart and a figure arrives in the gap (the choreography)
 *   03  the figure resolves; `exit`
 *       then it leaves and the words close over it
 *
 * Geometry is Chorus's: a 351x83 stage, a 103x83 icon slot, 20px from each
 * word's ink to the icon, 2px strokes that are never scaled (lucide glyphs
 * are scaled with their stroke-width divided back so they still read as 2).
 * The words are real text in the site font, measured as drawn.
 *
 * A choreography is a small object:
 *   build(g, h)          -> parts, drawn hidden into the icon group
 *   enter(tl, parts, h)  -> tweens placed from label 'in'
 *   leave(tl, parts, h)  -> tweens placed after label 'exit'
 *   still(parts)         -> the resolved frame with no motion
 * `h` is a bag of helpers (el, lucide, ICON...). See choreos.js.
 */
import {gsap} from 'gsap';
import {DrawSVGPlugin} from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

export const STAGE = {w: 351, h: 83};
export const ICON = {w: 103, h: 83};
export const GAP = 20;
export const STROKE = 2;
export const TYPE = {size: 18, baseline: 30 + 17.6};

const NS = 'http://www.w3.org/2000/svg';
const DRAWABLE = 'path, line, circle, ellipse, polyline, polygon, rect';

export const el = (name, attrs = {}) => {
	const node = document.createElementNS(NS, name);
	for (const k in attrs) node.setAttribute(k, attrs[k]);
	return node;
};

function spaceWidth(textNode) {
	const probe = textNode.cloneNode(false);
	probe.removeAttribute('x');
	textNode.parentNode.appendChild(probe);
	probe.textContent = 'a a';
	const withSpace = probe.getComputedTextLength();
	probe.textContent = 'aa';
	const without = probe.getComputedTextLength();
	probe.remove();
	return Math.max(2, withSpace - without);
}

/**
 * A lucide glyph placed in the icon slot. `body` is the icon's inner markup
 * from @iconify-json/lucide with its stroke-width attributes stripped; it is
 * scaled by `size / 24` and given stroke-width 2 / scale so the rendered
 * stroke is 2 units like everything else. Returns the group and its
 * drawable children, for DrawSVG.
 */
function lucide(parent, body, {size = 56, x = null, y = null} = {}) {
	const k = size / 24;
	const gx = x == null ? (ICON.w - size) / 2 : x;
	const gy = y == null ? (ICON.h - size) / 2 : y;
	const g = el('g', {
		class: 'sb-lucide',
		transform: `translate(${gx} ${gy}) scale(${k})`,
		'stroke-width': STROKE / k,
	});
	g.innerHTML = body;
	parent.appendChild(g);
	return {g, strokes: Array.from(g.querySelectorAll(DRAWABLE))};
}

/**
 * `gap` is the distance from each word's ink to the figure; `extent` is the
 * figure's own [x1, x2] inside the 103-unit slot, so words hug what is
 * actually drawn rather than the slot's edges.
 */
function measure(words, gap, extent) {
	const space = spaceWidth(words[0]);
	const leftW = words[0].getComputedTextLength();
	const rightW = words[1].getComputedTextLength();
	const figureW = extent[1] - extent[0];

	const span = leftW + gap + figureW + gap + rightW;
	const originX = (STAGE.w - span) / 2;

	const split = [originX, originX + leftW + 2 * gap + figureW];
	const joinedX = (STAGE.w - (leftW + space + rightW)) / 2;
	const joined = [joinedX, joinedX + leftW + space];

	const minX = Math.min(0, originX);
	const maxX = Math.max(STAGE.w, originX + span);
	return {
		iconX: originX + leftW + gap - extent[0],
		split,
		join: split.map((x, i) => joined[i] - x),
		minX,
		width: maxX - minX,
	};
}

const DEFAULTS = {
	hold01: 0.3,
	split: 1.0,
	splitEase: 'power3.inOut',
	lead: 0.5, // how far into the split the figure starts arriving
	hold: 0.9, // resolved frame holds
	leave: 0.5, // the figure leaves
	reset: 0.8, // the words close
	tail: 0.2,
	repeat: -1,
};

export function defineStoryboard(choreo) {
	function build(mount, options = {}) {
		const chars = options.words || ['', ''];
		const icons = options.icons || {};
		const gap = options.gap ?? choreo.gap ?? GAP;
		const extent = choreo.extent || [0, ICON.w];
		const svg = el('svg', {
			viewBox: `0 0 ${STAGE.w} ${STAGE.h}`,
			xmlns: NS,
			'aria-hidden': 'true',
		});

		const words = chars.map((text) => {
			const node = el('text', {y: TYPE.baseline});
			node.textContent = text;
			svg.appendChild(node);
			return node;
		});

		const icon = el('g', {
			class: 'sb-icon',
			fill: 'none',
			'stroke-width': STROKE,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		});
		svg.appendChild(icon);
		mount.appendChild(svg);

		const helpers = {
			el,
			lucide: (body, opts) => lucide(icon, body, opts),
			icons,
			ICON,
			STROKE,
			drawables: (node) => Array.from(node.querySelectorAll(DRAWABLE)),
		};
		const parts = choreo.build(icon, helpers);

		const layout = measure(words, gap, extent);
		words.forEach((node, i) => node.setAttribute('x', layout.split[i]));
		icon.setAttribute('transform', `translate(${layout.iconX} 0)`);
		svg.setAttribute('viewBox', `${layout.minX} 0 ${layout.width} ${STAGE.h}`);

		return {svg, icon, words, layout, parts, helpers, width: layout.width};
	}

	function create(scene, options) {
		const cfg = Object.assign({}, DEFAULTS, choreo.defaults, options);
		const tl = gsap.timeline({repeat: cfg.repeat, defaults: {ease: 'power2.inOut'}});

		tl.set(scene.words, {x: (i) => scene.layout.join[i]})
			.call(() => choreo.reset(scene.parts))
			.addLabel('01')
			.to({}, {duration: cfg.hold01})
			.to(scene.words, {x: 0, duration: cfg.split, ease: cfg.splitEase})
			.addLabel('in', `-=${cfg.split * cfg.lead}`);

		choreo.enter(tl, scene.parts, scene.helpers, cfg);

		tl.addLabel('resolved', tl.duration())
			.to({}, {duration: cfg.hold})
			.addLabel('exit');

		choreo.leave(tl, scene.parts, scene.helpers, cfg);

		tl.to(
			scene.words,
			{x: (i) => scene.layout.join[i], duration: cfg.reset, ease: cfg.splitEase},
			`-=${cfg.leave * 0.4}`,
		).to({}, {duration: cfg.tail});

		return tl;
	}

	function still(scene) {
		gsap.set(scene.words, {x: 0});
		choreo.reset(scene.parts);
		choreo.still(scene.parts);
	}

	return {build, create, still, DEFAULTS};
}
