#!/usr/bin/env node
// Builds the 1200×630 social preview images, one per language:
// the warm logo over the page background, with a session overview screenshot
// in that language. Each image is written to public/og/ here and to
// docs/public/og/ for the documentation sites.
// No rendered text, so the result does not depend on installed fonts.
//
//   npm run image:og
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsOgDir = path.join(root, '../docs/public/og');
const logoPath = path.join(root, 'design/TalkBar-logo-text-final-warm.svg');
const shots = path.join(root, 'src/assets/screenshots/temporary/talkbar-new');
const images = [
  { name: 'talkbar-og-en.png', shotPath: path.join(shots, 'session-overview-en.png') },
  { name: 'talkbar-og-ru.png', shotPath: path.join(shots, 'session-overview-ru-v2.png') },
];

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
const roundMask = Buffer.from(
  `<svg width="${SHOT_W}" height="${visibleH}"><rect width="${SHOT_W}" height="${visibleH + RADIUS * 2}" rx="${RADIUS}" ry="${RADIUS}"/></svg>`,
);

const shadow = await sharp(
  Buffer.from(
    `<svg width="${W}" height="${H}"><rect x="${SHOT_LEFT}" y="${SHOT_TOP + 10}" width="${SHOT_W}" height="${visibleH + 40}" rx="${RADIUS}" fill="rgba(30,40,70,0.2)"/></svg>`,
  ),
)
  .blur(22)
  .png()
  .toBuffer();

for (const { name, shotPath } of images) {
  const shotResized = await sharp(shotPath)
    .resize({ width: SHOT_W })
    .extract({ left: 0, top: 0, width: SHOT_W, height: visibleH })
    .png()
    .toBuffer();
  const shot = await sharp(shotResized)
    .composite([{ input: roundMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const card = await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
    .composite([
      { input: logo, left: 72, top: 56 },
      { input: shadow, left: 0, top: 0 },
      { input: shot, left: SHOT_LEFT, top: SHOT_TOP },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  for (const dir of [path.join(root, 'public/og'), docsOgDir]) {
    await mkdir(dir, { recursive: true });
    const out = path.join(dir, name);
    await writeFile(out, card);
    console.log(`Wrote ${path.relative(root, out)}`);
  }
}
