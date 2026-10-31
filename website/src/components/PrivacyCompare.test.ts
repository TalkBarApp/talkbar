import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

describe("TalkBar privacy comparison", () => {
  test("compares TalkBar with cloud meeting bots and browser-only tools", () => {
    const source = read("src/components/PrivacyCompare.astro");
    const translations = read("src/i18n/en.ts");

    expect(source).toContain("privacy.compare.talkbar");
    expect(source).toContain("privacy.compare.cloudMeetingBots");
    expect(source).toContain("privacy.compare.browserTools");
    expect(source).toContain("privacy.compare.visibleBot");
    expect(translations).toContain("Cloud meeting bots");
    expect(translations).toContain("Browser-only tools");
    expect(translations).not.toContain("PageSignal");
  });

  test("supports a compact deep-page privacy proof", () => {
    const source = read("src/components/PrivacyCompare.astro");
    const homepage = read("src/components/HomePage.astro");

    expect(source).toContain("compact?: boolean");
    expect(homepage).toContain("<PrivacyCompare lang={lang} />");
  });
});
