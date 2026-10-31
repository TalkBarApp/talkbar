import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

describe("English-only use-case pages", () => {
  test("routes use the current build locale instead of hardcoded English", () => {
    [
      "src/pages/b2b-sales.astro",
      "src/pages/venture-private-equity.astro",
      "src/pages/legal-counsel.astro",
      "src/pages/executive-leadership.astro",
      "src/pages/consulting.astro",
      "src/pages/product-research.astro",
      "src/pages/one-on-one-meetings.astro",
      "src/pages/coaching-sessions.astro",
      "src/pages/interviews.astro",
      "src/pages/podcasts.astro",
      "src/pages/voice-notes.astro",
      "src/pages/client-calls.astro",
    ].forEach((path) => {
      const source = read(path);

      expect(source).toContain("CURRENT_CONFIG.defaultLocale");
      expect(source).toContain("getUseCaseContent");
      expect(source).not.toContain("const lang = 'en' as const");
    });
  });

  test("keeps converted deep-page content English-only for this pass", () => {
    const index = read("src/content/use-cases/index.ts");
    const content = read("src/i18n/use-cases.ts");

    expect(index).toContain("getUseCaseContent");
    expect(index).toContain("enUseCases");
    expect(index).not.toContain("ruUseCases");
    expect(index).toContain("getTalkBarUseCases(lang)");

    [
      "Venture & Private Equity",
      "Legal Counsel & M&A",
      "Executive Leadership & Chiefs of Staff",
      "B2B Sales & Customer Success",
      "Consultants & Advisors",
      "Product Research & Recruiting",
      "One-on-one Meetings",
      "Coaching Sessions",
      "Interviews",
      "Podcasts",
      "Voice Notes",
      "Client Calls",
    ].forEach((phrase) => {
      expect(content).toContain(phrase);
    });
  });
});
