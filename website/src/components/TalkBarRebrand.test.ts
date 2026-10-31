import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

describe("TalkBar homepage rebrand surface", () => {
  test("does not keep visible PageSignal branding in converted homepage/shared files", () => {
    const convertedFiles = [
      "src/components/HomePage.astro",
      "src/components/Navbar.tsx",
      "src/components/Footer.astro",
      "src/components/Hero.astro",
      "src/components/LiveDemo.astro",
      "src/components/PriceMonitoring.astro",
      "src/components/Spotlights.astro",
      "src/components/Workflows.astro",
      "src/components/UseCases.astro",
      "src/components/HowItWorks.astro",
      "src/components/FeaturesGrid.astro",
      "src/components/PrivacyCompare.astro",
      "src/components/FAQ.astro",
      "src/components/CTASection.astro",
      "src/layouts/BaseLayout.astro",
      "src/i18n/en.ts",
    ];

    const matches = convertedFiles
      .map((path) => [path, read(path)] as const)
      .filter(([, source]) => /PageSignal|pagesignal/i.test(source))
      .map(([path]) => path);

    expect(matches).toEqual([]);
  });

  test("keeps root project guidance and scripts aligned with TalkBar", () => {
    const rootDocs = ["README.md", "CONTENT.md", "AGENTS.md"];
    const docsWithLegacyBranding = rootDocs
      .map((path) => [path, read(path)] as const)
      .filter(([, source]) => /PageSignal|pagesignal|pastebar/i.test(source))
      .map(([path]) => path);
    const pkg = JSON.parse(read("package.json"));
    const readme = read("README.md");
    const agents = read("AGENTS.md");

    expect(docsWithLegacyBranding).toEqual([]);
    expect(readme).toContain("# TalkBar Website");
    expect(readme).toContain("www.talkbar.app");
    expect(readme).toContain("preview.talkbar.app");
    expect(readme).not.toContain("PricingSection");
    expect(agents).toContain("TalkBar");
    expect(pkg.scripts.test).toBe("vitest run");
    // The ambiguous `build:ru` name stays retired; the Russian preview uses the
    // explicit `*:preview:ru` names, with `dev:ru` as a pure alias for the
    // preview-ru dev server.
    expect(pkg.scripts["dev:ru"]).toBe("npm run dev:preview:ru");
    expect(pkg.scripts["build:ru"]).toBeUndefined();
  });

  test("keeps inactive localized and language-support surfaces from carrying PageSignal copy", () => {
    const inactiveSurfaces = [
      "src/i18n/es.ts",
      "src/i18n/uk.ts",
      "src/i18n/ru.ts",
      "src/components/LanguageSupport.astro",
    ];
    const matches = inactiveSurfaces
      .map((path) => [path, read(path)] as const)
      .filter(([, source]) => /PageSignal|pagesignal|website monitoring|Telegram|Discord|webhook/i.test(source))
      .map(([path]) => path);

    expect(matches).toEqual([]);
  });

  test("does not expose retired PageSignal concepts in converted deep pages", () => {
    const convertedDeepFiles = [
      "src/content/use-cases/index.ts",
      "src/content/use-cases/types.ts",
      "src/components/use-case/UseCaseHero.astro",
      "src/components/use-case/UseCaseProblem.astro",
      "src/components/use-case/UseCaseFeatureBlock.astro",
      "src/components/use-case/UseCaseExamples.astro",
      "src/components/use-case/UseCaseWorkflow.astro",
      "src/components/use-case/UseCaseFAQ.astro",
      "src/components/use-case/UseCaseCTA.astro",
      "src/pages/legal-counsel.astro",
      "src/pages/venture-private-equity.astro",
      "src/pages/executive-leadership.astro",
      "src/pages/b2b-sales.astro",
      "src/pages/product-research.astro",
      "src/pages/consulting.astro",
      "src/pages/one-on-one-meetings.astro",
      "src/pages/coaching-sessions.astro",
      "src/pages/interviews.astro",
      "src/pages/podcasts.astro",
      "src/pages/voice-notes.astro",
      "src/pages/client-calls.astro",
    ];
    const forbidden = /PageSignal|pagesignal|website monitoring|price detection|SEO detection|CSS selector|Telegram|Discord|webhook|Cloudflare|notification channel|monitor count/i;
    const matches = convertedDeepFiles
      .map((path) => [path, read(path)] as const)
      .filter(([, source]) => forbidden.test(source))
      .map(([path]) => path);

    expect(matches).toEqual([]);
  });

  test("does not ship placeholder footer social links", () => {
    const footer = read("src/components/Footer.astro");

    expect(footer).not.toContain('href="#"');
    expect(footer).not.toContain("footer.social.github");
    expect(footer).not.toContain("footer.social.twitter");
    expect(footer).not.toContain("footer.social.rss");
    expect(footer).toContain("SITE_CONFIG.contactEmail");
    expect(footer).toContain("data-download-link");
  });
});
