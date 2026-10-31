import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

describe("TalkBar homepage hero and brand identity", () => {
  test("keeps core private conversation intelligence copy", () => {
    const translations = read("src/i18n/en.ts");

    expect(translations).toContain("Private conversation intelligence.");
    expect(translations).toContain("Capture meetings and calls, dictate voice notes, get live context");
    expect(translations).toContain("No account");
    expect(translations).toContain("No cloud");
    expect(translations).toContain("Runs on your machine");
    expect(translations).toContain("Local AI");
    expect(translations).toContain('"hero.cta.primary": "Download for Windows"');
    expect(translations).toContain('"cta.button": "Download for Windows"');
    expect(translations).toContain('"nav.downloadFree": "Download"');
    expect(translations).not.toContain("Download for Mac and Windows");
  });

  test("does not hide above-fold hero content before JavaScript runs", () => {
    const hero = read("src/components/Hero.astro");

    expect(hero).not.toContain("opacity-0");
  });

  test("sets TalkBar metadata with default blue theme and warm alternate variables", () => {
    const translations = read("src/i18n/en.ts");
    const layout = read("src/layouts/BaseLayout.astro");
    const css = read("src/styles/global.css");
    const pkg = read("package.json");

    expect(translations).toContain("TalkBar: Private AI Note Taker for Windows, No Meeting Bot");
    expect(layout).toContain('og:site_name" content="TalkBar"');
    expect(layout).toContain("name: 'TalkBar'");
    expect(layout).toContain('<html lang={lang} class="color-theme-blue">');
    expect(layout).toContain('<meta name="theme-color" content="#054df6" />');
    expect(pkg).toContain('"name": "talkbar-www"');
    expect(css).toContain("--primary: 21 60% 59%");
    expect(css).toContain("--talkbar-blue-primary: 222 96% 49%");
    expect(css).toContain("--talkbar-blue-hex: #054df6");
    expect(css).toContain("#054df6");
  });

  test("keeps the legacy Windows download icon and hover scale treatment", () => {
    // The button markup lives in one shared component now; the guarantees
    // (Windows glyph, hover zoom, lift on hover) are asserted at its source.
    const button = read("src/components/ui/DownloadButton.astro");
    const hero = read("src/components/Hero.astro");
    const cta = read("src/components/CTASection.astro");
    const css = read("src/styles/global.css");

    expect(button).toContain('viewBox="0 0 164.11 144.637"');
    expect(button).toContain("download-icon");
    expect(button).toContain("data-download-link");
    expect(button).toContain("group btn-pill btn-primary");
    expect(hero).toContain("<DownloadButton");
    expect(cta).toContain("<DownloadButton");
    expect(css).toContain(".btn-primary:hover");
    expect(css).toContain("transform: translateY(-1px)");
    expect(css).toContain(".group:hover .download-icon");
    expect(css).toContain("scale(1.12)");
  });
});
