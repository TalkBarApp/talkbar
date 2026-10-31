#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

export async function trimImageBorder(filePath, options = {}) {
  const px = options.px ?? 2;

  if (!Number.isInteger(px) || px < 1) {
    throw new Error('--px must be a positive integer');
  }

  const absolutePath = path.resolve(filePath);
  const extension = path.extname(absolutePath).toLowerCase();

  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    throw new Error(`Unsupported image type: ${extension || 'missing extension'}`);
  }

  const stat = await fs.stat(absolutePath);
  if (!stat.isFile()) {
    throw new Error(`Not a file: ${filePath}`);
  }

  const metadata = await sharp(absolutePath).metadata();
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;

  if (width <= px * 2 || height <= px * 2) {
    throw new Error(
      `Image is too small to crop ${px}px from each edge: ${width}x${height}`,
    );
  }

  const tempPath = path.join(
    path.dirname(absolutePath),
    `.${path.basename(absolutePath)}.${process.pid}.${Date.now()}.tmp${extension}`,
  );

  try {
    await sharp(absolutePath)
      .extract({
        left: px,
        top: px,
        width: width - px * 2,
        height: height - px * 2,
      })
      .toFile(tempPath);

    await fs.rename(tempPath, absolutePath);
  } catch (error) {
    await fs.rm(tempPath, { force: true });
    throw error;
  }

  return {
    filePath: absolutePath,
    original: { width, height },
    cropped: { width: width - px * 2, height: height - px * 2 },
    px,
  };
}

function printUsage() {
  console.error('Usage: npm run tool.cli -- [--px 2] <image>');
}

function parseArgs(argv) {
  const files = [];
  let px = 2;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--px') {
      const value = argv[i + 1];
      if (!value) {
        throw new Error('Missing value for --px');
      }
      px = Number(value);
      i += 1;
      continue;
    }

    if (arg.startsWith('--px=')) {
      px = Number(arg.slice('--px='.length));
      continue;
    }

    if (arg === '-h' || arg === '--help') {
      return { help: true, files, px };
    }

    if (arg.startsWith('-')) {
      throw new Error(`Unknown option: ${arg}`);
    }

    files.push(arg);
  }

  return { help: false, files, px };
}

function assertSingleExplicitFile(files) {
  if (files.length !== 1) {
    throw new Error('Pass exactly one image path');
  }

  if (/[*?[\]{}]/.test(files[0])) {
    throw new Error('Wildcards are not supported. Pass one image path at a time.');
  }
}

export async function runCli(argv = process.argv.slice(2)) {
  const { help, files, px } = parseArgs(argv);

  if (help) {
    printUsage();
    return 0;
  }

  if (files.length === 0) {
    printUsage();
    throw new Error('At least one image path is required');
  }

  assertSingleExplicitFile(files);

  const result = await trimImageBorder(files[0], { px });
  console.log(
    `trimmed ${path.relative(process.cwd(), result.filePath)}: ` +
      `${result.original.width}x${result.original.height} -> ` +
      `${result.cropped.width}x${result.cropped.height}`,
  );

  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCli().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
