import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const sourceExtensions = new Set([".astro", ".ts", ".tsx"]);

const collectSourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      return collectSourceFiles(path);
    }

    return sourceExtensions.has(extname(path)) ? [path] : [];
  });

describe("site copy", () => {
  test("does not mention the retired chat brand in active source pages", () => {
    const retiredChatBrand = ["Sla", "ck"].join("");
    const filesWithRetiredBrand = collectSourceFiles(join(cwd(), "src"))
      .filter((path) => new RegExp(retiredChatBrand, "i").test(readFileSync(path, "utf8")))
      .map((path) => relative(cwd(), path));

    expect(filesWithRetiredBrand).toEqual([]);
  });
});
