import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

describe("Russian preview build (preview.talkbar.ru)", () => {
  test("exposes the preview-ru build and deploy scripts", () => {
    const pkg = JSON.parse(read("package.json"));

    expect(pkg.scripts["build:preview:ru"]).toBe("cross-env BUILD_DOMAIN=preview-ru astro build");
    expect(pkg.scripts["deploy:preview:ru"]).toBe(
      "npm run build:preview:ru && npx --yes wrangler pages deploy dist-preview-ru --project-name talkbar-preview-ru --branch preview",
    );
  });

  test("configures preview-ru as a Russian-default build domain", () => {
    const domains = read("src/i18n/domains.ts");
    const astroConfig = read("astro.config.mjs");

    expect(domains).toContain("preview-ru");
    expect(domains).toContain("site: 'https://preview.talkbar.ru'");
    expect(domains).toContain("defaultLocale: 'ru'");
    expect(astroConfig).toContain("https://preview.talkbar.ru");
    expect(astroConfig).toContain('process.env.BUILD_DOMAIN === "preview-ru"');
    expect(astroConfig).toContain('process.env.BUILD_DOMAIN === "prod-ru"');

    // The retired draft used a different brand domain; it must not return.
    expect(domains).not.toContain("pagesignal.ru");
    expect(astroConfig).not.toContain("pagesignal");
  });

  test("ships a fully translated Russian locale, not an English passthrough", () => {
    const ru = read("src/i18n/ru.ts");
    const ruUseCases = read("src/i18n/ru-use-cases.ts");
    const useCases = read("src/i18n/use-cases.ts");

    // ru.ts must hold real Russian copy rather than re-exporting English.
    expect(ru).not.toContain('export default en');
    expect(ru).toContain("Скачать для Windows");
    expect(ru).toContain("Карточки знаний");

    // The deep use-case pages must be wired to Russian content.
    expect(ruUseCases).toContain("ruUseCaseContent");
    expect(useCases).toContain("ru: ruUseCaseContent");
  });

  test("does not add a stray locale switcher to the shared chrome", () => {
    const navbar = read("src/components/Navbar.tsx");
    const footer = read("src/components/Footer.astro");

    expect(navbar).not.toContain("localeUrls");
    expect(footer).not.toContain("localeUrls");
  });
});
