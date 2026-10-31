/**
 * Chorus — the storyboard 37:712 as one GSAP timeline.
 *
 *   01  "Speaker recognition" sits as one line
 *   02  the words move apart, a speech bubble draws itself into the gap and
 *       three dots arrive in it, one after another, and start typing
 *   03  the last of the bubble goes as the three dots rise into its place —
 *       travelling to their spots and swelling into heads in one move
 *   05  shoulders drawn in a beat behind their own heads. Three speakers.
 *
 * Then it unwinds and loops.
 *
 * THE ONE IDEA IN HERE
 * --------------------
 * A typing dot and a head are both circles — and Figma's heads really are
 * exact circles (see `circleFrom` in figma-source.js). So a dot does not
 * *morph* into a head: it is the same <circle>, moved by transform and
 * resized by its own `r`. One tween per speaker, no MorphSVG, no vertex
 * matching, and the radius it lands on is Figma's to the fourth decimal.
 *
 * WHY `r` AND NOT `scale`
 * -----------------------
 * Because the stroke has to read as Figma's 2px everywhere, always, and
 * scaling a stroked circle cannot do that:
 *
 *   - plain `scale(14)` multiplies the stroke with it — 28px;
 *   - `vector-effect="non-scaling-stroke"` pins the stroke to 2 *device*
 *     pixels rather than 2 viewBox units. The stage is drawn at roughly twice
 *     its 351-unit viewBox, so everything else lands near 4px and the circles
 *     come out visibly thinner than the shoulders beside them.
 *
 * Animating `r` sidesteps both: the stroke stays 2 user units on every frame,
 * exactly like the shoulders and exactly like Figma. For the same reason the
 * bubble is not scaled either — it only draws itself on. Nothing in this scene
 * is ever scaled, so nothing can ever be off 2px.
 *
 * The shoulders are the only thing that has to arrive separately, and they
 * arrive the way a line should: drawn, with DrawSVG.
 */
import {gsap} from 'gsap';
import {DrawSVGPlugin} from 'gsap/DrawSVGPlugin';
import F from './figma-source.js';

gsap.registerPlugin(DrawSVGPlugin);

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

const Chorus = (() => {

	/**
	 * The one layout number that is not Figma's. Figma's auto-layout row puts
	 * 35px between each word's box and the icon; the brief asks for 20, measured
	 * from the text to the icon. Everything else about the row — the 73/103/105
	 * widths, the type, the icon — is untouched, and frame 01 still lands on
	 * Figma's own numbers (see `measure`).
	 */
	const GAP = 20;

	/* ---------------------------------------------------------------- scene */

	const NS = 'http://www.w3.org/2000/svg';
	const XML_NS = 'http://www.w3.org/XML/1998/namespace';
	const el = (name, attrs) => {
		const node = document.createElementNS(NS, name);
		for (const k in attrs) {
			// xml:space is a real namespaced attribute — setAttribute would create
			// a literally-named "xml:space" that the renderer ignores.
			if (k.startsWith('xml:')) node.setAttributeNS(XML_NS, k, attrs[k]);
			else node.setAttribute(k, attrs[k]);
		}
		return node;
	};

	/**
	 * Works out the row once the type is on screen: where each part goes, and
	 * how far the words travel between frame 01 and frame 02.
	 *
	 * The awkward part is that Figma's right-hand word is literally
	 * `" recognition"`, leading space included, and that space is load-bearing —
	 * in frame 01 it is the only thing between the two words. It also means the
	 * word's ink starts a space in from its box, so nothing can be placed 20px
	 * from anything until that space's *rendered* advance is known. It is
	 * measured rather than assumed, because Stack Sans Text is usually not
	 * installed and the fallback's space is a different width.
	 *
	 * Two things fall out of the arithmetic that are worth knowing:
	 *
	 *  - the joined arrangement comes to 73 + space + (105 - space) = 178
	 *    whatever the space measures, so frame 01 lands on x=86.5 / x=159.5 —
	 *    Figma's own frame 01 (37:811), to the pixel;
	 *  - centring both arrangements on the same axis makes the two words'
	 *    travel equal and opposite by construction, so the split reads as one
	 *    symmetric movement rather than as two separate ones.
	 */
	function measure(words, gap = GAP) {
		// Real text in the site font: widths are whatever the browser drew.
		const space = spaceWidth(words[0]);
		const leftW = words[0].getComputedTextLength();
		const rightW = words[1].getComputedTextLength();

		const span = leftW + gap + F.ICON.w + gap + rightW;
		const originX = (F.STAGE.w - span) / 2;

		const split = [originX, originX + leftW + 2 * gap + F.ICON.w];
		const joinedX = (F.STAGE.w - (leftW + space + rightW)) / 2;
		const joined = [joinedX, joinedX + leftW + space];

		const minX = Math.min(0, originX);
		const maxX = Math.max(F.STAGE.w, originX + span);

		return {
			space,
			iconX: originX + leftW + gap,
			split, // the `x` each word is given
			join: split.map((x, i) => joined[i] - x), // what it tweens to for 01
			minX,
			width: maxX - minX,
		};
	}

	/**
	 * Builds the SVG scene inside `mount` and returns handles to its parts.
	 * `options.words` — the two words, left and right of the icon.
	 */
	function build(mount, options = {}) {
		const chars = options.words || F.words.map((word) => word.chars.trim());
		const svg = el('svg', {
			viewBox: `0 0 ${F.STAGE.w} ${F.STAGE.h}`,
			xmlns: NS,
			'aria-hidden': 'true',
		});

		const words = F.words.map((word, i) => {
			const node = el('text', {
				y: F.type.baseline,
				fill: F.COLOR.text,
				'data-figma': word.chars.trim(),
			});
			node.textContent = chars[i];
			svg.appendChild(node);
			return node;
		});

		// The icon keeps Figma's own 103x83 space; this <g> is what puts it in
		// the gap. Nothing below ever offsets anything by hand.
		const icon = el('g', {
			class: 'chorus-icon',
			fill: 'none',
			stroke: F.COLOR.ink,
			'stroke-width': F.STROKE,
		});

		const bubble = el('path', {
			class: 'chorus-bubble',
			d: F.bubble.d,
			'data-figma': F.bubble.figma,
		});
		icon.appendChild(bubble);

		// The bodies go in before the tokens so a head always sits on top of the
		// shoulders it grew out of — which is the stacking Figma has.
		const bodies = F.tokens.map((token) => {
			const node = el('path', {
				class: 'chorus-body',
				d: token.body,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'data-figma': token.figma,
			});
			icon.appendChild(node);
			return node;
		});

		// Every dot and every head is one of these: a circle at the origin, put
		// in place by transform and sized by its own `r`. r=0 is not rendered at
		// all, which is exactly what "no dot yet" should mean.
		const tokens = F.tokens.map((token) => {
			const node = el('circle', {
				class: 'chorus-token',
				cx: 0,
				cy: 0,
				r: 0,
				'data-figma': token.figma,
			});
			icon.appendChild(node);
			return node;
		});

		svg.appendChild(icon);
		mount.appendChild(svg);

		// Measured only now — the type has to be on screen to be measured.
		const layout = measure(words, options.gap);
		words.forEach((node, i) => node.setAttribute('x', layout.split[i]));
		icon.setAttribute('transform', `translate(${layout.iconX} ${F.ICON.y})`);
		svg.setAttribute('viewBox', `${layout.minX} 0 ${layout.width} ${F.STAGE.h}`);

		return {svg, icon, bubble, bodies, tokens, words, layout, width: layout.width};
	}

	/* --------------------------------------------------------------- motion */

	/**
	 * Everything below except `total` is *rhythm*, not clock: the numbers are
	 * proportions, and `create` scales them so the whole loop comes to `total`
	 * seconds. So changing one beat changes its share of the six seconds, and
	 * the loop stays six seconds. Set `total: 0` to read them as literal
	 * seconds instead.
	 */
	const DEFAULTS = {
		total: 6, // the whole loop, 01 through 05 and back, in seconds

		hold01: 0.5, // 01 sits still before anything happens
		split: 1.4, // 01 -> 02: the words move apart
		splitEase: 'power3.inOut',

		bubbleLead: 0.55, // how far into the split the bubble starts drawing
		bubbleDraw: 1.0, // 02: the outline draws itself round
		bubbleOut: 0.8, // and un-draws again on the way to 03

		dotIn: 0.68, // the three dots arrive one at a time
		dotStagger: 0.3,
		dotDelay: 0.6, // as a fraction of bubbleDraw

		pulse: 0.68, // 02: the typing beat
		pulseStagger: 0.22,
		pulseRise: 5, // px each dot lifts
		pulseRepeat: 1, // 1 -> two legs -> one bob, ends where it began

		bubbleLeave: 0.35, // the bubble starts leaving before the typing stops
		riseLead: 0.18, // and the dots start with this much of it still to go

		grow: 2.2, // dot -> head: travel and swell in one move, all three at once
		growEase: 'power3.out', // front-loaded, so a head is nearly home early
		body: 1.7, // shoulders drawn in under them
		bodyEase: 'power2.out',
		bodyLag: 0.8, // how far the shoulders trail their own head
		raiseStagger: 0.22, // and how far each speaker trails the one before

		hold: 0.7, // 05 holds
		exit: 0.8, // and unwinds
		exitStagger: 0.16,
		reset: 0.9,
		tail: 0.25,
		repeat: -1, // -1 loops forever; 0 plays once (the hero sequencer uses 0)
	};

	// Who leads: the middle speaker, then left, then right — Figma's own order,
	// and the one that breaks the icon's left/right mirror.
	const ORDER = [1, 0, 2];

	// Every key here is a duration. The rest of DEFAULTS is fractions, pixels
	// and counts, and fitting the loop to `total` must not touch them.
	const TIME_KEYS = [
		'hold01',
		'split',
		'bubbleDraw',
		'bubbleOut',
		'bubbleLeave',
		'dotIn',
		'dotStagger',
		'pulse',
		'pulseStagger',
		'grow',
		'body',
		'bodyLag',
		'raiseStagger',
		'hold',
		'exit',
		'exitStagger',
		'reset',
		'tail',
	];

	function create(scene, options) {
		const cfg = Object.assign({}, DEFAULTS, options);

		// Two passes: the first measures the rhythm, the second replays it with
		// every duration scaled so the loop lasts `total`. Scaling the numbers
		// rather than calling timeScale() keeps tl.duration() honest — it is
		// what GSDevTools reads out, and its own speed control writes timeScale,
		// so anything parked there would be overwritten the moment it is used.
		if (cfg.total) {
			const probe = create(scene, Object.assign({}, cfg, {total: 0}));
			const k = cfg.total / probe.duration();
			probe.kill();
			const fitted = Object.assign({}, cfg, {total: 0});
			TIME_KEYS.forEach((key) => (fitted[key] = cfg[key] * k));
			return create(scene, fitted);
		}

		// The id is what GSDevTools labels the animation with in its picker.
		const tl = gsap.timeline({
			id: 'chorus',
			repeat: cfg.repeat,
			defaults: {ease: 'power2.inOut'},
		});

		/**
		 * Speaker `i` stands up at absolute time `at`: the dot swells into its
		 * head while the shoulders are drawn in under it, `bodyLag` behind —
		 * a stagger between the two, not one after the other. Returns the time
		 * the pair is finished.
		 *
		 * `at` is an absolute number rather than `'<'` or `'-='` because all
		 * three speakers are placed on the same beat: a relative offset would be
		 * measured from whichever tween happened to be added last.
		 */
		const raise = (i, at) => {
			const head = F.tokens[i].head;
			const bodyAt = at + cfg.bodyLag;
			tl.to(
				scene.tokens[i],
				{
					x: head.cx,
					y: head.cy,
					attr: {r: head.r}, // Figma's radius, exactly
					duration: cfg.grow,
					ease: cfg.growEase,
				},
				at,
			)
				// Switched on rather than faded in — see the bodies' initial state.
				.set(scene.bodies[i], {autoAlpha: 1}, bodyAt)
				.to(
					scene.bodies[i],
					{drawSVG: '0% 100%', duration: cfg.body, ease: cfg.bodyEase},
					bodyAt,
				);
			return Math.max(at + cfg.grow, bodyAt + cfg.body);
		};

		tl
			// --- 01 : one line of text, an empty gap, nothing else on stage
			.set(scene.words, {x: (i) => scene.layout.join[i]})
			.set(scene.tokens, {
				x: (i) => F.tokens[i].dot.x,
				y: (i) => F.tokens[i].dot.y,
				attr: {r: 0},
			})
			.set(scene.bubble, {drawSVG: '0% 0%'})
			// Each body starts collapsed at the end it should grow out of: the
			// symmetric one at its own middle, the two small ones at the end that
			// tucks under the big body.
			//
			// And hidden on top of that, because a collapsed DrawSVG stroke is a
			// zero-length dash — which a round linecap, the one Figma puts on
			// these paths, faithfully paints as a 2px dot.
			.set(scene.bodies, {drawSVG: (i) => F.tokens[i].bodyDraw, autoAlpha: 0})
			.addLabel('01')
			.to({}, {duration: cfg.hold01})

			// --- 01 -> 02 : the words move apart and the bubble draws itself into
			// the gap they open.
			.to(scene.words, {x: 0, duration: cfg.split, ease: cfg.splitEase})
			.addLabel('bubble', `-=${cfg.split * cfg.bubbleLead}`)
			.to(scene.bubble, {drawSVG: '0% 100%', duration: cfg.bubbleDraw}, 'bubble')
			// ...and the three dots drop in behind it, one at a time.
			.to(
				scene.tokens,
				{
					attr: {r: F.DOT_R},
					duration: cfg.dotIn,
					ease: 'back.out(1.6)',
					stagger: cfg.dotStagger,
				},
				`bubble+=${cfg.bubbleDraw * cfg.dotDelay}`,
			)
			.addLabel('02')

			// --- 02 : the typing beat. `repeat` lives inside the stagger, so each
			// dot bobs on its own offset instead of the three of them moving as a
			// block — and an even number of legs lands every one back on its own
			// Figma y, which is the state 03 starts from.
			.to(scene.tokens, {
				y: (i) => F.tokens[i].dot.y - cfg.pulseRise,
				duration: cfg.pulse,
				ease: 'sine.inOut',
				stagger: {
					each: cfg.pulseStagger,
					repeat: cfg.pulseRepeat,
					yoyo: true,
				},
			})
			;

		// --- 02 -> 05 : one continuous move, not three steps.
		//
		// Figma parks the outer dots at 21.5/82.5 before growing them, which as
		// motion is a stop: the dots slide, land, wait, and only then the
		// shoulders start. So nothing parks here — each dot travels to its own
		// head position *while* swelling into it, and the three beats are laid
		// over one another instead of queued:
		//
		//   the bubble starts leaving  `bubbleLeave` before the typing stops
		//   the dots start rising      with `riseLead` of the bubble left to go
		//   the shoulders start        `bodyLag` after the dots, heads still moving
		//
		// `riseLead` is what keeps the big head off the bubble. That head ends up
		// r=14 around (51.5, 19.5), so its top crosses y=21.5 — the bubble's own
		// top edge — and the outline un-draws from its far end, which means that
		// top edge is the last thing left on stage. But the head only reaches up
		// there about a fifth of the way through its growth: it starts as a dot
		// at y=40, well inside the bubble. So the rise can start while the last
		// sliver of outline is still going, and the two never touch.
		//
		// The three speakers are one gesture rather than three steps, but not a
		// mirror: `raiseStagger` is small enough that they read as rising
		// together, and just enough to keep the two small ones off the same
		// frame. It carries the shoulders with it, since each body is hung off
		// its own head's start.
		const pulseEnd = tl.duration();
		const bubbleGone = pulseEnd - cfg.bubbleLeave + cfg.bubbleOut;
		const riseAt = bubbleGone - cfg.bubbleOut * cfg.riseLead;

		tl.addLabel('out', pulseEnd - cfg.bubbleLeave)
			.to(
				scene.bubble,
				{drawSVG: '0% 0%', duration: cfg.bubbleOut, ease: 'power2.in'},
				'out',
			)
			.addLabel('03', riseAt);

		const done = ORDER.map((i, n) => raise(i, riseAt + n * cfg.raiseStagger));

		tl.addLabel('05', Math.max(...done))
			.to({}, {duration: cfg.hold})
			.addLabel('exit')

			// --- back to 01 : the shoulders are un-drawn the way they were drawn,
			// the heads shrink back to dots, and the dots close down from the
			// edges in while the words shut the gap over them.
			.to(scene.bodies, {
				drawSVG: (i) => F.tokens[i].bodyDraw,
				duration: cfg.exit * 0.55,
				ease: 'power2.in',
				stagger: {each: cfg.exitStagger, from: 'edges'},
			})
			.set(scene.bodies, {autoAlpha: 0})
			.to(
				scene.tokens,
				{
					x: (i) => F.tokens[i].dot.x,
					y: (i) => F.tokens[i].dot.y,
					attr: {r: F.DOT_R},
					duration: cfg.exit,
					ease: 'power2.inOut',
				},
				`-=${cfg.exit * 0.35}`,
			)
			.to(scene.tokens, {
				attr: {r: 0},
				duration: cfg.exit * 0.45,
				ease: 'power2.in',
				stagger: {each: cfg.exitStagger, from: 'edges'},
			})
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

		return tl;
	}

	/**
	 * The composed frame 05, with no motion at all. Used behind
	 * `prefers-reduced-motion: reduce` — the design still reads, nothing moves.
	 */
	function still(scene) {
		gsap.set(scene.words, {x: 0});
		gsap.set(scene.bubble, {drawSVG: '0% 0%'});
		gsap.set(scene.tokens, {
			x: (i) => F.tokens[i].head.cx,
			y: (i) => F.tokens[i].head.cy,
			attr: {r: (i) => F.tokens[i].head.r},
		});
		gsap.set(scene.bodies, {autoAlpha: 1, drawSVG: '0% 100%'});
	}

	return {build, create, still, DEFAULTS, GAP};
})();

export default Chorus;
