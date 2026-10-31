import { execFile } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { cwd } from 'node:process';
import { promisify } from 'node:util';
import sharp from 'sharp';
import { afterEach, describe, expect, test } from 'vitest';
import { runCli, trimImageBorder } from '../../tools/trim-image-border.mjs';

const execFileAsync = promisify(execFile);
const tempDirs: string[] = [];

async function createTempDir() {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'pagesignal-trim-border-'));
  tempDirs.push(tempDir);
  return tempDir;
}

async function createImage(filePath: string, width = 10, height = 8) {
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: '#111827',
    },
  })
    .png()
    .toFile(filePath);
}

async function readSize(filePath: string) {
  const metadata = await sharp(filePath).metadata();
  return { width: metadata.width, height: metadata.height };
}

afterEach(async () => {
  await Promise.all(
    tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })),
  );
});

describe('trim-image-border CLI', () => {
  test('overwrites one image by cropping 2px from each edge by default', async () => {
    const tempDir = await createTempDir();
    const imagePath = path.join(tempDir, 'screenshot.png');
    await createImage(imagePath);

    const result = await trimImageBorder(imagePath);

    expect(result.original).toEqual({ width: 10, height: 8 });
    expect(result.cropped).toEqual({ width: 6, height: 4 });
    expect(await readSize(imagePath)).toEqual({ width: 6, height: 4 });
  });

  test('rejects multiple image paths before modifying anything', async () => {
    const tempDir = await createTempDir();
    const firstPath = path.join(tempDir, 'first.png');
    const secondPath = path.join(tempDir, 'second.png');
    await createImage(firstPath);
    await createImage(secondPath);

    await expect(runCli([firstPath, secondPath])).rejects.toThrow(
      'Pass exactly one image path',
    );

    expect(await readSize(firstPath)).toEqual({ width: 10, height: 8 });
    expect(await readSize(secondPath)).toEqual({ width: 10, height: 8 });
  });

  test('rejects wildcard paths before reading files', async () => {
    await expect(runCli(['src/assets/*.png'])).rejects.toThrow(
      'Wildcards are not supported',
    );
  });

  test('runs as a direct node CLI command', async () => {
    const tempDir = await createTempDir();
    const imagePath = path.join(tempDir, 'direct-cli.png');
    const scriptPath = path.resolve(cwd(), 'tools/trim-image-border.mjs');
    await createImage(imagePath);

    const { stdout } = await execFileAsync(process.execPath, [scriptPath, imagePath]);

    expect(stdout).toContain('trimmed');
    expect(await readSize(imagePath)).toEqual({ width: 6, height: 4 });
  });
});
