import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

describe("TalkBar pre-meeting briefing section", () => {
  test("uses a native TalkBar briefing mock instead of old app screenshots", () => {
    const source = read("src/components/PriceMonitoring.astro");
    const translations = read("src/i18n/en.ts");

    expect(source).not.toContain("import { Picture } from 'astro:assets'");
    expect(source).toContain('<Screenshot lang={lang} id="session-setup"');
    expect(source).not.toContain("HeroImageZoom");
    expect(source).not.toContain("dashboard-monitors-cards-desktop-notifications.png");
    expect(source).not.toContain("dashboard-monitors-cards-personal-dark.png");
    expect(source).toContain("priceMonitoring.delivered");
    expect(source).not.toContain("Relationship map");
    expect(translations).toContain("Preparation workspace");
    expect(source).not.toContain("PageSignal");
    expect(source).not.toContain("pagesignal");
  });

  test("uses a delivery side panel instead of a long stacked feature list", () => {
    const source = read("src/components/PriceMonitoring.astro");
    const translations = read("src/i18n/en.ts");

    expect(source).toContain("briefing-delivery-panel");
    expect(source).toContain("lg:grid-cols-[1.18fr_0.82fr]");
    expect(source).toContain("sm:grid-cols-2 lg:grid-cols-1");
    expect(source).toContain("priceMonitoring.deliveredDesc");
    expect(source).not.toContain("lg:grid-cols-5");
    expect(source).not.toContain("lg:col-span-3");
    expect(source).not.toContain("lg:col-span-2");
    expect(translations).toContain('"priceMonitoring.deliveredDesc":');
    expect(translations).toContain("Everything on one page");
  });

  test("shows the screenshot at every width instead of a phone-only duplicate", () => {
    const source = read("src/components/PriceMonitoring.astro");

    expect(source).not.toContain("mobileBriefItems");
    expect(source).not.toContain("sm:hidden panel-pro");
    expect(source).not.toContain("hidden sm:block");
    expect(source).not.toContain("Everything you need before the call");
    expect(source).not.toContain("Last context");
    expect(source).not.toContain("Open item");
    expect(source).not.toContain("Suggested agenda");
  });
});
