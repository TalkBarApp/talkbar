import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

const enValue = (translations: string, key: string) => {
  const match = translations.match(new RegExp(`"${key.replace(/\./g, "\\.")}":\\s*"([^"]*)"`));
  return match?.[1];
};

describe("new homepage sections", () => {
  test("mounts knowledge, ask, features, screenshots, and templates in order", () => {
    const homepage = read("src/components/HomePage.astro");
    const knowledge = homepage.indexOf("<Knowledge");
    const ask = homepage.indexOf("<AskTalkBar");
    const features = homepage.indexOf("<FeaturesGrid");
    const screenshots = homepage.indexOf("<ScreenshotStrip");
    const templates = homepage.indexOf("<TemplatesSkills");

    expect(knowledge).toBeGreaterThan(-1);
    expect(ask).toBeGreaterThan(knowledge);
    expect(features).toBeGreaterThan(ask);
    expect(screenshots).toBeGreaterThan(features);
    expect(templates).toBeGreaterThan(screenshots);
  });

  test("names the new section parts", () => {
    const knowledge = read("src/components/Knowledge.astro");
    const ask = read("src/components/AskTalkBar.astro");
    const templates = read("src/components/TemplatesSkills.astro");
    const translations = read("src/i18n/en.ts");

    expect(knowledge).toContain("knowledge.part.cards.title");
    expect(knowledge).toContain("knowledge.part.companies.title");
    expect(knowledge).toContain("knowledge.scan.step1.title");
    expect(ask).toContain("ask.mode.session.title");
    expect(ask).toContain("ask.mode.knowledge.title");
    expect(ask).toContain("ask.mode.session.example");
    expect(templates).toContain("templates.part.session.title");
    expect(templates).toContain("templates.part.skills.title");
    expect(templates).toContain("templates.picker.card");
    expect(translations).toContain("Knowledge that keeps working");
    expect(translations).toContain("Ask your meetings,");
    expect(translations).toContain("Shape every session and note");
    expect(translations).toContain("What did Sarah say about the SLA draft?");
  });

  test("numbers only real sequences", () => {
    // Templates & Skills lists parallel features, not steps.
    expect(read("src/components/TemplatesSkills.astro")).not.toContain("howitworks.stepLabel");
  });
});

describe("screenshots", () => {
  const registry = read("src/lib/screenshots.ts");
  const translations = read("src/i18n/en.ts");
  const ids = [...registry.matchAll(/entry\('([a-z-]+)'/g)].map((m) => m[1]);

  test("every registry screenshot exists and has a caption and alt text", () => {
    expect(ids.length).toBeGreaterThan(0);
    for (const match of registry.matchAll(/from '(\.\.\/assets\/[^']+)'/g)) {
      expect(existsSync(resolve(dirname(resolve(cwd(), "src/lib/screenshots.ts")), match[1])), match[1]).toBe(true);
    }
    for (const id of ids) {
      expect(enValue(translations, `shot.${id}.caption`), id).toBeTruthy();
      expect(enValue(translations, `shot.${id}.alt`), id).toBeTruthy();
    }
  });

  test("every screenshot opens full-screen", () => {
    expect(read("src/components/ui/Screenshot.astro")).toContain("<HeroImageZoom");
    expect(read("src/components/ScreenshotGallery.tsx")).toContain("<ControlledZoom");
  });

  test("the slideshow runs on the use-case pages too", () => {
    for (const page of ["interviews", "b2b-sales"]) {
      expect(read(`src/pages/${page}.astro`), page).toContain("<ScreenshotStrip");
    }
  });
});

describe("homepage search metadata", () => {
  const translations = read("src/i18n/en.ts");
  const layout = read("src/layouts/BaseLayout.astro");

  test("fits the title and description in search results", () => {
    expect((enValue(translations, "meta.title") ?? "").length).toBeLessThanOrEqual(60);
    expect((enValue(translations, "meta.description") ?? "").length).toBeLessThanOrEqual(155);
    expect(enValue(translations, "meta.ogTitle")).toBeTruthy();
    expect(enValue(translations, "meta.jsonLdDescription")).toBeTruthy();
  });

  test("shares a social image and names both desktop platforms", () => {
    expect(layout).toContain('property="og:image"');
    expect(layout).toContain('name="twitter:image"');
    expect(existsSync(resolve(cwd(), "public/og/talkbar-og.png"))).toBe(true);
    expect(layout).toContain("operatingSystem: 'Windows, macOS'");
  });
});
