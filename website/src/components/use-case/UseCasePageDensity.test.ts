import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

const deepPages = [
  "legal-counsel",
  "client-calls",
  "coaching-sessions",
  "venture-private-equity",
  "executive-leadership",
  "b2b-sales",
  "interviews",
  "one-on-one-meetings",
  "product-research",
  "podcasts",
  "consulting",
  "voice-notes",
];

describe("deep-page scanability", () => {
  test("uses a compact feature stack on deep pages while keeping the full homepage feature section", () => {
    const spotlights = read("src/components/Spotlights.astro");

    expect(spotlights).toContain("compact?: boolean");
    expect(spotlights).toContain("feat-col");
    expect(spotlights).toContain("compact ? undefined :");
    expect(spotlights).toContain("compact ? 'section-pad-sm' : 'section-pad'");

    deepPages.forEach((slug) => {
      const page = read(`src/pages/${slug}.astro`);
      expect(page).toContain("<Spotlights lang={lang} compact />");
      expect(page).not.toContain("<Spotlights lang={lang} />");
    });
  });

  test("uses compact privacy proof on deep pages while keeping the full homepage comparison", () => {
    const homepage = read("src/components/HomePage.astro");

    expect(homepage).toContain("<PrivacyCompare lang={lang} />");

    deepPages.forEach((slug) => {
      const page = read(`src/pages/${slug}.astro`);
      expect(page).toContain("<PrivacyCompare lang={lang} compact />");
      expect(page).not.toContain("<PrivacyCompare lang={lang} />");
    });
  });

  test("uses compact setup walkthrough on deep pages while keeping the full homepage walkthrough", () => {
    const homepage = read("src/components/HomePage.astro");

    expect(homepage).toContain("<HowItWorks lang={lang} />");

    deepPages.forEach((slug) => {
      const page = read(`src/pages/${slug}.astro`);
      expect(page).toContain("<HowItWorks lang={lang} compact />");
      expect(page).not.toContain("<HowItWorks lang={lang} />");
    });
  });
});
