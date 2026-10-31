#!/usr/bin/env node
// Builds public/og/talkbar-og.png, the 1200×630 social preview image:
// the warm logo over the page background, with the hero session screenshot.
// No rendered text, so the result does not depend on installed fonts.
//
//   npm run image:og
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public/og/talkbar-og.png');
const logoPath = path.join(root, 'design/TalkBar-logo-text-final-warm.svg');
const shotPath = path.join(root, 'src/assets/screenshots/en/1-session-view/session-en.png');

const W = 1200;
const H = 630;
const BG = '#FAF9F5';
const SHOT_W = 1000;
const SHOT_LEFT = 150;
const SHOT_TOP = 150;
const RADIUS = 18;

const logo = await sharp(await readFile(logoPath), { density: 300 })
  .resize({ width: 300 })
  .png()
  .toBuffer();

// Only the part of the screenshot above the bottom edge is used; its lower
// edge runs off the card, so only the top corners are rounded.
const visibleH = H - SHOT_TOP;
const shotResized = await sharp(shotPath)
  .resize({ width: SHOT_W })
  .extract({ left: 0, top: 0, width: SHOT_W, height: visibleH })
  .png()
  .toBuffer();
const roundMask = Buffer.from(
  `<svg width="${SHOT_W}" height="${visibleH}"><rect width="${SHOT_W}" height="${visibleH + RADIUS * 2}" rx="${RADIUS}" ry="${RADIUS}"/></svg>`,
);
const shot = await sharp(shotResized)
  .composite([{ input: roundMask, blend: 'dest-in' }])
  .png()
  .toBuffer();

const shadow = await sharp(
  Buffer.from(
    `<svg width="${W}" height="${H}"><rect x="${SHOT_LEFT}" y="${SHOT_TOP + 10}" width="${SHOT_W}" height="${visibleH + 40}" rx="${RADIUS}" fill="rgba(30,40,70,0.2)"/></svg>`,
  ),
)
  .blur(22)
  .png()
  .toBuffer();

await mkdir(path.dirname(out), { recursive: true });
await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
  .composite([
    { input: logo, left: 72, top: 56 },
    { input: shadow, left: 0, top: 0 },
    { input: shot, left: SHOT_LEFT, top: SHOT_TOP },
  ])
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`Wrote ${path.relative(root, out)}`);
