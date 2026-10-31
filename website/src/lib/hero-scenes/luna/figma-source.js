/**
 * Luna — geometry exported verbatim from Figma.
 *
 * File:  Talkbar – dev  (3wcZ0kpet62l4hcM7jRhuj)
 * Frame: 33:872 "Frame 18" — the four-step storyboard 01 / 02 / 03 / 04.
 *
 * Nothing here is redrawn by hand: every number below is either an
 * absoluteBoundingBox or a `fillGeometry` path read straight off the nodes
 * via the Figma Plugin API.
 *
 * STAGE COORDINATES
 * -----------------
 * All four storyboard frames share one layout; frame 02 (33:940) is used as
 * the stage. Its origin in the artboard is (369, 122) and its box is 392x76,
 * so   stage = absolute - (369, 122).
 *
 * Frames 02, 03 and 04 place the two words identically (their centres sit at
 * -154.5 and +140.5 from the group centre), so only frame 01 differs — the
 * words are exactly 96.5px closer to the centre there. That single number
 * drives the whole "words move apart" beat.
 */
const LunaFigma = (() => {
	// Frame 02 (33:940) — the stage.
	const ORIGIN = {x: 369, y: 122};
	const STAGE = {w: 392, h: 76};

	const COLOR = {
		wave: '#054df5', // fill of every Line vector + stroke of the Union
		text: '#2b3a5d',
		page: '#ffffff',
	};

	// Every "Line N (Stroke)" vector in frame 02. Figma stores them as filled
	// 2px-wide rects; here each one is the centre line of that rect plus its
	// height, which is what an SVG <line stroke-width="2"> draws pixel-for-pixel.
	// The bars are NOT all centred on the same axis — Figma has them straddling
	// y=38 by up to 2.5px — so each one keeps its own top and its own midpoint.
	const AXIS_Y = 38;
	const BAR_SOURCE = [
		// [figma name, absolute x of the 2px rect, absolute y (top), height]
		['Line 6', 480, 148, 24],
		['Line 7', 485, 153, 13],
		['Line 4', 490, 138, 44],
		['Line 5', 495, 148, 22],
		['Line 2', 500, 149, 22],
		['Line 3', 505, 154, 11],
		['Line 10', 510, 143, 34],
		['Line 13', 515, 150, 18],
		['Line 9', 520, 132.926, 54.148],
		['Line 12', 525, 143, 32],
		['Line 8', 530, 144, 32],
		['Line 11', 535, 151, 16],
		['Line 21', 540, 154, 10],
		['Line 15', 545, 145, 30],
		['Line 23', 550, 141, 34],
		['Line 17', 555, 137, 46],
		['Line 25', 560, 149, 19],
		['Line 19', 565, 141, 38],
		['Line 20', 570, 153, 12],
		['Line 14', 575, 137, 46],
		['Line 22', 580, 134, 47],
		['Line 16', 585, 122, 76], // <- the tall one: becomes the line, then the A
		['Line 24', 590, 153, 12],
		['Line 18', 595, 150, 19],
		['Line 31', 600, 154, 11],
		['Line 30', 605, 143, 34],
		['Line 36', 610, 150, 18],
		['Line 28', 615, 128, 64],
		['Line 34', 620, 143, 32],
		['Line 26', 625, 144, 32],
		['Line 32', 630, 151, 16],
	];

	const bars = BAR_SOURCE.map(([name, x, y, h]) => {
		const top = y - ORIGIN.y;
		return {
			name,
			cx: x - ORIGIN.x + 1, // centre of the 2px rect
			top,
			h,
			cy: top + h / 2, // the bar's own midpoint — its scale origin
		};
	});

	// 33:914 "Line 16 (Stroke)" in frame 02 is the same object as 33:950
	// "Line 16 (Stroke)" in frame 03 — the storyboard just moves it. It is the
	// only bar that survives the collapse, so it is pulled out of the bar list.
	const HERO_INDEX = bars.findIndex((b) => b.name === 'Line 16');
	const hero = bars.splice(HERO_INDEX, 1)[0]; // cx 217, h 76

	// 33:950 — the lone line of frame 03. Absolute box x 1030..1032, y 122..198,
	// i.e. 76 tall and horizontally centred in the gap between the two words.
	const line = {
		cx: 1030 - 849 + 1, // frame 03 origin is x=849 -> stage cx 182
		top: 0,
		h: 76,
		cy: 38,
	};

	// 33:981 "Union" — the letter A in frame 04. Boolean operation, no fill,
	// 2px CENTER stroke, miter joins. `path` is its resolved fillGeometry in the
	// node's own space; `offset` places that space in stage coordinates
	// (node at 1527,127 with frame 04 origin 1369,127 and the words 2px lower
	// in that frame than in frame 02).
	// NOTE — the one deliberate departure from Figma. The Union sits at x=158
	// there, which leaves 75px of air to the left word and 55.5px to the right
	// one. The brief asks for equal gaps, so the letter is centred on the middle
	// of the gap instead: x=148.25. That midpoint is 182, which is exactly where
	// frame 03 already parks the line — so line and letter end up concentric.
	const letter = {
		w: 67.5,
		h: 65.4541015625,
		figmaOffset: {x: 1527 - 1369, y: 2}, // 158 — what Figma actually has
		offset: {x: 182 - 67.5 / 2, y: 2}, // 148.25 — centred in the gap
		strokeWeight: 2,
		path:
			'M67.5 65.4541 L48.3242 65.4541 L44.542 52.9258 L22.958 52.9258 ' +
			'L19.1758 65.4541 L0 65.4541 L21.6055 0 L45.8945 0 L67.5 65.4541 Z ' +
			'M26.9717 39.6309 L40.5283 39.6309 L34.0059 18.0254 L33.4941 18.0254 ' +
			'L26.9717 39.6309 Z',
	};

	// 33:906 / 33:907 — Stack Sans Text ExtraLight 18/22.1545, #2b3a5d.
	// x/width are the Figma boxes in stage space; `join` is how far each word
	// travels to reach the frame-01 arrangement.
	// Figma's left node holds a trailing space ("Real-time "), which is why its
	// box measures 83. The space is dropped here so the ink ends exactly on 83
	// and the gap between the words runs 83..281 — midpoint 182.
	const words = [
		{id: 'w-left', chars: 'Real-time', x: 0, width: 83, join: 96.5},
		{id: 'w-right', chars: 'transcription', x: 281, width: 111, join: -96.5},
	];

	const type = {
		family: 'Stack Sans Text',
		size: 18,
		lineHeight: 22.154529571533203,
		// Box top is stage y=27 (abs 149) and the box is 23 tall; the baseline
		// sits an ascender below the top of the line box.
		baseline: 27 + 17.6,
	};

	return {ORIGIN, STAGE, COLOR, AXIS_Y, bars, hero, line, letter, words, type};
})();

export default LunaFigma;
