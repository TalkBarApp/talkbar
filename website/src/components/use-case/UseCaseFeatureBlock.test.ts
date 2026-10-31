import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const readSource = (path: string) =>
  readFileSync(resolve(cwd(), path), "utf8");

describe("TalkBar use-case content", () => {
  test("defines the twelve converted TalkBar page topics", () => {
    const source = readSource("src/i18n/use-cases.ts");
    const index = readSource("src/content/use-cases/index.ts");

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
    ].forEach((phrase) => expect(source).toContain(phrase));

    [
      "one-on-one-meetings",
      "coaching-sessions",
      "interviews",
      "podcasts",
      "voice-notes",
      "client-calls",
    ].forEach((slug) => expect(index).toContain(slug));
  });

  test("uses TalkBar workflow outputs instead of alert-channel positioning", () => {
    const source = readSource("src/i18n/use-cases.ts");

    expect(source).toContain("Knowledge Cards");
    expect(source).toContain("Searchable memory");
    expect(source).toContain("Follow-ups");
    expect(source).toContain("Exports you choose");
    expect(source).not.toContain("emphasize");
    expect(source).not.toContain("deliveryNote");
  });

  test("uses zoomable registry screenshots, keeping translated fallbacks", () => {
    const content = readSource("src/content/use-cases/talkbar-content.ts");
    const translations = readSource("src/i18n/use-cases.ts");
    const hero = readSource("src/components/use-case/UseCaseHero.astro");
    const featureBlock = readSource("src/components/use-case/UseCaseFeatureBlock.astro");
    const zoom = readSource("src/components/HeroImageZoom.tsx");
    const sharedTranslations = readSource("src/i18n/en.ts");

    expect(content).not.toContain("../../assets/");
    expect(content).not.toContain("mediaImage:");
    expect(content).not.toContain("screenshot placeholder");
    expect(content).not.toContain("mediaPlaceholder:");
    expect(hero).toContain("<Screenshot");
    expect(hero).toContain("<HeroImageZoom");
    expect(hero).toContain("media.zoom.expand");
    expect(hero).not.toContain("Expand ${");
    expect(hero).not.toContain("Close ${");
    expect(hero).not.toContain("screenshot placeholder`");
    expect(featureBlock).toContain("border-dashed");
    expect(featureBlock).toContain("<HeroImageZoom");
    expect(featureBlock.indexOf("<HeroImageZoom")).toBeLessThan(featureBlock.indexOf("border-dashed"));
    expect(featureBlock).toContain("mediaImage || mediaMock || mediaLabel || mediaPlaceholder");
    expect(featureBlock).toContain("<UseCaseCardsMock");
    expect(featureBlock).toContain("<UseCaseMemoryMock");
    expect(featureBlock).toContain("media.zoom.expand");
    expect(featureBlock).toContain("media.placeholder.default");
    expect(featureBlock).not.toContain("Expand ${");
    expect(featureBlock).not.toContain("Close ${");
    expect(featureBlock).not.toContain("screenshot placeholder`");
    expect(zoom).not.toContain("Expand dashboard screenshot");
    expect(translations).toContain("getUseCaseTranslationContent");
    expect(sharedTranslations).toContain('"media.placeholder.default": "{label} screenshot placeholder"');
    expect(sharedTranslations).toContain('"media.zoom.expand": "Expand {label} screenshot"');
  });

  test("shows screenshots on use-case pages, keeping the dashed fallback treatment", () => {
    const hero = readSource("src/components/use-case/UseCaseHero.astro");
    const featureBlock = readSource("src/components/use-case/UseCaseFeatureBlock.astro");
    const css = readSource("src/styles/global.css");

    expect(hero).toContain("<Screenshot");
    expect(hero).toContain("uc-hero-shot");
    expect(featureBlock).toContain("<Screenshot");

    expect(featureBlock).toContain("<UseCaseCardsMock");
    expect(featureBlock).toContain("<UseCaseMemoryMock");
    expect(featureBlock).toContain("screenshot-placeholder-pro");
    expect(featureBlock).toContain("screenshot-placeholder-label");
    expect(featureBlock).toContain("lucide:image-plus");
    expect(featureBlock).toContain("border-dashed");

    expect(css).toContain(".screenshot-placeholder-pro");
    expect(css).toContain(".screenshot-placeholder-label");
  });

  test("does not hide deep-page hero content before JavaScript runs", () => {
    const hero = readSource("src/components/use-case/UseCaseHero.astro");

    expect(hero).not.toContain("opacity-0");
  });
});
