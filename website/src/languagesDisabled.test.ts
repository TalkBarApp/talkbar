import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

describe("English-default TalkBar homepage with a dedicated Russian preview", () => {
  test("keeps the prod/preview builds English while Russian is its own build domain", () => {
    const types = read("src/i18n/types.ts");
    const domains = read("src/i18n/domains.ts");
    const astroConfig = read("astro.config.mjs");

    expect(types).toContain("export const LANGUAGES: Language[] = ['en'];");
    // The English prod/preview build domains stay scoped to English…
    expect(domains).toContain("languages: ['en']");
    expect(domains).toContain("defaultLocale: 'en'");
    // …and Russian only appears under separate .ru build domains.
    expect(domains).toContain("'preview-ru': {");
    expect(domains).toContain("'prod-ru': {");
    expect(domains).toContain("languages: ['ru']");
    expect(astroConfig).toContain('const ALL_LOCALES = ["en", "ru"];');
  });

  test("removes visible language switchers from shared homepage chrome", () => {
    const navbar = read("src/components/Navbar.tsx");
    const footer = read("src/components/Footer.astro");
    const homePage = read("src/components/HomePage.astro");

    expect(navbar).not.toContain("APP_LANGUAGE_OPTIONS");
    expect(navbar).not.toContain("localeUrls");
    expect(footer).not.toContain("APP_LANGUAGE_OPTIONS");
    expect(footer).not.toContain("localeUrls");
    expect(homePage).not.toContain("LanguageSupport");
  });
});
