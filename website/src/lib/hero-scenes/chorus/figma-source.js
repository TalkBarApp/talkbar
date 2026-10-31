/**
 * Chorus — geometry exported verbatim from Figma.
 *
 * File:  Talkbar – dev  (3wcZ0kpet62l4hcM7jRhuj)
 * Frame: 37:712 "Frame 19" — the five-step storyboard 01 … 05.
 *
 * Nothing below is redrawn by hand. Every path string is the `d` Figma exports
 * for that node; every number is a box off the node tree.
 *
 * STAGE COORDINATES
 * -----------------
 * The four split frames (37:820, 37:772, 37:784, 37:795) are the same 351x83
 * auto-layout row: "Speaker" (73) · 35 · icon (103) · 35 · " recognition" (105).
 * One of them is the stage, so stage space *is* that row.
 *
 * The icon lives at x=108 inside it. Rather than re-adding 108 to every number
 * — which is where hand-transcribed geometry goes wrong — the icon keeps its
 * own 103x83 space and the scene nests it in a translated <g>. So everything
 * under `icon` here is exactly the number Figma printed.
 *
 * Where that <g> and the two words end up is the one thing NOT taken from
 * Figma: the brief asks for 20px from the text to the icon where Figma's
 * auto-layout has 35. chorus.js works the row out from these widths — frame 01
 * still lands on Figma's own 86.5px-per-word split.
 *
 * Frame 01 (37:811) is the only frame with a different layout: the words sit
 * flush at 112..185 and 185..290 instead of 0..73 and 246..351.
 */
const ChorusFigma = (() => {
	const STAGE = {w: 351, h: 83};

	// 37:822 et al — "Frame 3", the icon slot inside the auto-layout row.
	const ICON = {x: 108, y: 0, w: 103, h: 83};

	const COLOR = {
		ink: '#054df5', // every stroke in the icon
		text: '#2b3a5d',
		page: '#ffffff',
	};

	const STROKE = 2; // every vector in the icon is a 2px centre stroke

	/**
	 * Figma draws each head as four cubic quarter-arcs. The 1st and 3rd arc
	 * endpoints in the `d` are diametrically opposite, so the circle is
	 * recovered exactly from that one pair — see the assertions in the comments
	 * below each head. That is why the heads render as <circle> here: they are
	 * true circles in Figma too, not eyeballed ones.
	 */
	const circleFrom = (ax, ay, bx, by) => ({
		cx: (ax + bx) / 2,
		cy: (ay + by) / 2,
		r: Math.hypot(bx - ax, by - ay) / 2,
	});

	/* ------------------------------------------------------------ frame 02 */

	// 37:822 > "Union" — the speech bubble. Figma paints it with a linear
	// gradient whose two stops are both #054DF5, i.e. a flat fill written the
	// long way; it is collapsed to the plain colour here.
	const bubble = {
		figma: 'Union',
		d:
			'M32 21.5H71C74.866 21.5 78 24.634 78 28.5V51.374C78 55.24 74.866 58.374 ' +
			'71 58.374H34.415C33.2491 58.374 32.0971 58.6293 31.04 59.1211L25 ' +
			'61.9316V28.5C25 24.7549 27.9411 21.6963 31.6396 21.5088L32 21.5Z',
		// The tail — the one corner the shape is anchored by, so the bubble
		// grows out of it instead of out of its own middle.
		tail: {x: 25, y: 61.9316},
	};

	/* ------------------------------------------------------- the three dots */

	// The dot is r=2.5 in every frame it appears in (37:822 "Ellipse 16/17/18",
	// 37:771 "Ellipse 16", 37:786 "Ellipse 18").
	const DOT_R = 2.5;

	/**
	 * One token per speaker. Each carries the three states the storyboard puts
	 * it in, all of them real Figma coordinates:
	 *
	 *   dot   frame 02 — the typing dot inside the bubble
	 *   head  the circle it becomes
	 *
	 * Frames 03 and 04 also park a leftover dot at x=21.5 / x=82.5, on the way
	 * to the head. Those are not here: parking is a stop, and the motion runs
	 * the two states together instead — see the note in chorus.js.
	 */
	const tokens = [
		{
			id: 'left',
			figma: 'Ellipse 16 → Path_2 (37:786)',
			dot: {x: 40.5, y: 40}, // 37:822 "Ellipse 16"
			// 37:786 "Path_2": M24.7984 25.8539 … C11.9242 38.7281 …
			head: circleFrom(24.7984, 25.8539, 11.9242, 38.7281), // 18.3613, 32.291, r 9.1034
			// 37:786 "Path_3" — the small shoulder, tucked behind the big body.
			body:
				'M2 68.5013V63.5693C2 57.3548 7.0355 52.3193 13.25 52.3193H16.8545',
			bodyDraw: '100% 100%', // grows backwards, out from under the big body
		},
		{
			id: 'centre',
			figma: 'Ellipse 17 → Path (37:771)',
			dot: {x: 51.5, y: 40}, // 37:822 "Ellipse 17"
			// 37:771 "Path": M61.4216 9.60562 … C41.5978 29.4294 …
			head: circleFrom(61.4216, 9.60562, 41.5978, 29.4294), // 51.5097, 19.5175, r 14.0175
			// 37:771 "Path_2" — the big shoulders.
			body:
				'M75.5242 68.5014V61.2969C75.5242 52.5984 68.4727 45.5469 59.7742 ' +
				'45.5469H43.2188C34.5203 45.5469 27.4688 52.5984 27.4688 ' +
				'61.2969V68.5014',
			bodyDraw: '50% 50%', // symmetric shape: opens from under the chin outwards
		},
		{
			id: 'right',
			figma: 'Ellipse 18 → Path (37:797)',
			dot: {x: 62.5, y: 40}, // 37:822 "Ellipse 18"
			// 37:797 "Path", lifted into icon space by GROUP_OFFSET (below):
			// M90.0719 21.3539 … C77.1976 34.2281 …
			head: circleFrom(
				90.0719 + 1,
				21.3539 + 4.5,
				77.1976 + 1,
				34.2281 + 4.5,
			), // 84.6348, 32.291, r 9.1035
			// 37:797 "Path_4", same offset applied.
			body:
				'M101.003 68.5013V63.5693C101.003 57.3548 95.9674 52.3193 89.7529 ' +
				'52.3193H86.1484',
			bodyDraw: '100% 100%',
		},
	];

	/**
	 * GROUP_OFFSET — why frame 05's numbers carry a +1 / +4.5.
	 *
	 * 37:797 wraps its vectors in a "Group" (37:798) sized 99.003x63.001 and
	 * placed at (2, 5.5) in the 103x83 icon, with the stroke bleeding 1px past
	 * it on every side. So the exported SVG's own origin sits at (1, 4.5) in
	 * icon space. The check is that frames 04 and 05 must agree on the parts
	 * they share, and with this offset they do, to the last decimal:
	 *
	 *   big head    37:771 (51.5097, 19.5175) == 37:797 (50.5097, 15.0175)+off
	 *   big body    37:771 M75.5242 68.5014   == 37:797 M74.5242 64.0014 +off
	 *   left body   37:786 M2 68.5013         == 37:797 M1 64.0013       +off
	 */
	const GROUP_OFFSET = {x: 1, y: 4.5};

	/* ------------------------------------------------------------ the words */

	// 37:821 / 37:826, and 37:757 / 37:758 for the joined arrangement. Where
	// each word actually sits is worked out in chorus.js, because the brief's
	// 20px gap is measured from the ink and the ink depends on the space below.
	//
	// The right word really does begin with a space in Figma (" recognition"),
	// and that space is what separates the two words in frame 01 — so unlike
	// Luna's trailing space it is load-bearing and is kept. Its rendered width
	// is measured at build time, because the 20px gap is to the ink, and the
	// ink starts a space in from the box.
	const words = [
		{id: 'w-left', chars: 'Speaker', x: 0, width: 73},
		{id: 'w-right', chars: ' recognition', x: 246, width: 105},
	];

	const type = {
		family: 'Stack Sans Text',
		size: 18,
		lineHeight: 22.154529571533203,
		// The text box is y=30, 23 tall; the baseline sits an ascender down.
		baseline: 30 + 17.6,
	};

	return {
		STAGE,
		ICON,
		COLOR,
		STROKE,
		DOT_R,
		GROUP_OFFSET,
		bubble,
		tokens,
		words,
		type,
		circleFrom,
	};
})();

export default ChorusFigma;
