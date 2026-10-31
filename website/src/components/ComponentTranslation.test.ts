import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

describe("homepage component translation hygiene", () => {
  test("keeps visible homepage support copy in translation data", () => {
    const socialProof = read("src/components/SocialProof.astro");
    const languageSupport = read("src/components/LanguageSupport.astro");
    const translations = read("src/i18n/en.ts");

    expect(socialProof).toContain("social.term.prepare");
    expect(socialProof).not.toContain("'Prepare'");
    expect(socialProof).not.toContain("'Source-backed'");
    expect(languageSupport).toContain("languageSupport.eyebrow");
    expect(languageSupport).toContain("languageSupport.groups.localizedUi");
    expect(languageSupport).not.toContain("Languages covered");
    expect(languageSupport).not.toContain("TalkBar will support major Western European");
    expect(translations).toContain('"languageSupport.eyebrow": "Languages covered"');
    expect(translations).toContain('"social.term.sourceBacked": "Source-backed"');
  });

  test("keeps shared layout and zoomable media labels translation-backed", () => {
    const footer = read("src/components/Footer.astro");
    const useCaseLayout = read("src/layouts/UseCaseLayout.astro");
    const useCaseHero = read("src/components/use-case/UseCaseHero.astro");
    const useCaseFeatureBlock = read("src/components/use-case/UseCaseFeatureBlock.astro");
    const translations = read("src/i18n/en.ts");

    expect(footer).toContain("footer.homeAria");
    expect(footer).not.toContain("} home`");
    expect(useCaseLayout).toContain("breadcrumb.home");
    expect(useCaseLayout).not.toContain("'Home'");
    expect(useCaseLayout).not.toContain("'Главная'");

    for (const source of [useCaseHero, useCaseFeatureBlock]) {
      expect(source).toContain("<HeroImageZoom");
      expect(source).toContain("media.zoom.expand");
      expect(source).toContain("media.zoom.close");
      expect(source).toContain("media.alt.screenshot");
    }
    expect(useCaseHero).toContain("<Screenshot");
    expect(useCaseFeatureBlock).toContain("media.placeholder.default");

    expect(translations).toContain('"footer.homeAria": "TalkBar home"');
    expect(translations).toContain('"breadcrumb.home": "Home"');
    expect(translations).toContain('"media.placeholder.default": "{label} screenshot placeholder"');
    expect(translations).toContain('"media.zoom.expand": "Expand {label} screenshot"');
    expect(translations).toContain('"media.zoom.close": "Close {label} screenshot"');
    expect(translations).toContain('"media.alt.screenshot": "{label} screenshot"');
  });

  test("keeps deep-page content copy behind translation keys", () => {
    const content = read("src/content/use-cases/talkbar-content.ts");
    const translations = read("src/i18n/use-cases.ts");

    expect(content).toContain("getUseCaseTranslationContent");
    expect(content).not.toContain("'Venture & Private Equity'");
    expect(content).not.toContain("'TalkBar surfaces the right private card while the conversation is happening");
    expect(content).not.toContain("'One-on-one Meetings'");
    expect(content).not.toContain("'Does TalkBar join the meeting as a bot?'");
    expect(translations).toContain("'Venture & Private Equity'");
    expect(translations).toContain("The Knowledge Cards and action items you attached light up when the conversation reaches them.");
    expect(translations).toContain("getUseCaseTranslationContent");
  });

  test("keeps screenshot and mockup surfaces wrapped in HeroImageZoom", () => {
    const mediaComponents = [
      "src/components/use-case/UseCaseHero.astro",
      "src/components/use-case/UseCaseFeatureBlock.astro",
    ];

    mediaComponents.forEach((path) => {
      const source = read(path);
      expect(source, path).toContain("HeroImageZoom");
      expect(source, path).toContain("<HeroImageZoom");
    });
  });
});
