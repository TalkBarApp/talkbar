import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

describe("TalkBar setup steps", () => {
  test("uses five translated setup steps", () => {
    const source = read("src/components/HowItWorks.astro");
    const translations = read("src/i18n/en.ts");

    expect(source).toContain("howitworks.step1.title");
    expect(source).toContain("howitworks.step5.title");
    expect(translations).toContain("Set up TalkBar");
    expect(translations).toContain("before your next conversation");
    expect(translations).toContain("Review and carry forward");
  });

  test("supports a compact deep-page setup walkthrough", () => {
    const source = read("src/components/HowItWorks.astro");
    const homepage = read("src/components/HomePage.astro");

    expect(source).toContain("compact?: boolean");
    expect(homepage).toContain("<HowItWorks lang={lang} />");
  });
});
