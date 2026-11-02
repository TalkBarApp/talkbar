import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const root = cwd();
const sourceRoots = ["src/components", "src/pages", "src/layouts", "src/content", "src/i18n"];
const sourceFiles = sourceRoots.flatMap((dir) => {
  const files: string[] = [];
  const walk = (path: string) => {
    for (const entry of readdirSync(path)) {
      const full = resolve(path, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (/\.(astro|tsx?|md)$/.test(full) && !/\.test\.tsx?$/.test(full)) {
        files.push(full);
      }
    }
  };

  walk(resolve(root, dir));
  return files;
});

const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const readAllSource = () =>
  sourceFiles
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");

describe("commercial pricing is hidden from public pages", () => {
  test("does not render the pricing section on any page", () => {
    [
      "src/components/HomePage.astro",
      "src/pages/b2b-sales.astro",
      "src/pages/venture-private-equity.astro",
      "src/pages/executive-leadership.astro",
      "src/pages/legal-counsel.astro",
      "src/pages/product-research.astro",
      "src/pages/consulting.astro",
    ].forEach((path) => {
      const source = read(path);

      expect(source).not.toContain("PricingSection");
    });
  });

  test("does not link navigation or CTAs to the hidden pricing anchor", () => {
    const source = readAllSource();

    expect(source).not.toContain("#pricing");
    expect(source).not.toContain("nav.pricing");
  });

  test("links pricing only to the live license portal for each language", () => {
    const footer = read("src/components/Footer.astro");
    const domains = read("src/i18n/domains.ts");

    expect(footer).toContain("href: `${LICENSE_PORTAL_URLS[lang]}/pricing`, external: true");
    expect(footer).toContain("href: LICENSE_PORTAL_URLS[lang], external: true");
    expect(domains).toContain("en: 'https://license.talkbar.app'");
    expect(domains).toContain("ru: 'https://license.talkbar.ru'");
    expect(domains).not.toContain("license.preview");
  });

  test("removes public commercial pricing and subscription positioning", () => {
    const source = readAllSource();

    [
      "No subscription",
      "No subscriptions",
      "one-time purchase",
      "One-time purchase",
      "recurring subscriptions",
      "Subscription',",
      "pay once",
      "Pay once",
      "Download Free",
      "Free Download",
      "$49.00",
      "$99.99",
      "$72/year",
      '"price": "49.00"',
      '"price": "99.99"',
    ].forEach((phrase) => {
      expect(source).not.toContain(phrase);
    });
  });
});
