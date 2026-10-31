import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const root = resolve(cwd(), "src");
const scannedDirs = ["components", "content/use-cases", "pages"];
const extensions = new Set([".astro", ".ts", ".tsx"]);
const ignoredFileParts = [".test."];
const retiredTerms = [
  ["Media", "Placeholder"].join(""),
  ["Gallery", "Placeholder"].join(""),
];

const extensionOf = (path: string) => {
  const dot = path.lastIndexOf(".");
  return dot === -1 ? "" : path.slice(dot);
};

const collectFiles = (dir: string): string[] => {
  const entries = readdirSync(dir);

  return entries.flatMap((entry) => {
    const path = join(dir, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      return collectFiles(path);
    }

    if (!extensions.has(extensionOf(path))) {
      return [];
    }

    if (ignoredFileParts.some((part) => path.includes(part))) {
      return [];
    }

    return [path];
  });
};

describe("screenshot placeholders", () => {
  test("are not used by page-rendering source files", () => {
    const files = scannedDirs.flatMap((dir) => collectFiles(resolve(root, dir)));
    const matches = files.flatMap((file) => {
      const source = readFileSync(file, "utf8");

      return retiredTerms
        .filter((term) => source.includes(term))
        .map((term) => `${relative(cwd(), file)} contains ${term}`);
    });

    expect(matches).toEqual([]);
  });
});
