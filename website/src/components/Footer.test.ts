import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

describe("TalkBar footer", () => {
  test("uses TalkBar brand assets and homepage section links", () => {
    const source = read("src/components/Footer.astro");
    const css = read("src/styles/global.css");

    expect(source).toContain("logos.warmDark");
    expect(source).toContain("logos.blueDark");
    expect(source).toContain("footer-logo-warm");
    expect(source).toContain("footer-logo-blue");
    expect(source).toContain("relative block h-8 w-[155px]");
    expect(source).not.toContain("relative block h-9 w-[174px]");
    expect(source).not.toContain("TalkBar-logo-text-final-warm.svg?url");
    expect(source).not.toContain("theme-logo-light");
    expect(css).toContain(".footer-logo-blue");
    expect(css).toContain(".color-theme-blue .footer-logo-warm");
    expect(source).toContain("footer.brand");
    expect(source).toContain("footer.tagline");
    expect(source).toContain("href: '/#knowledge'");
    expect(source).toContain("href: '/#templates'");
    expect(source).toContain("href: '/privacy/'");
    expect(source).toContain("href: '/#faq'");
    expect(source).not.toContain("APP_LANGUAGE_OPTIONS");
    expect(source).not.toContain("localeUrls");
    expect(source).not.toContain("PageSignal");
  });
});
