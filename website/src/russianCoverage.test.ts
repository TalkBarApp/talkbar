import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");
const keyRe = /\n {2}"([^"]+)":/g;
const keysOf = (source: string) => new Set([...source.matchAll(keyRe)].map((m) => m[1]));

// Components whose strings are not rendered on any current page.
const unmounted = ["LanguageSupport", "SocialProof", "TrustStrip", "Spotlights", "UseCaseCardsMock", "UseCaseMemoryMock", "UseCaseHeroMock"];

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return walk(path);
    if (!/\.(astro|tsx)$/.test(path) || path.includes(".test.")) return [];
    return unmounted.some((name) => path.includes(name)) ? [] : [path];
  });

const renderedKeys = () => {
  const files = [
    ...walk(resolve(cwd(), "src/components")),
    resolve(cwd(), "src/pages/privacy.astro"),
    resolve(cwd(), "src/pages/404.astro"),
    resolve(cwd(), "src/layouts/BaseLayout.astro"),
    resolve(cwd(), "src/layouts/UseCaseLayout.astro"),
  ];
  const used = new Set<string>();
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    for (const m of source.matchAll(/t\(lang,\s*'([^'`]+)'/g)) used.add(m[1]);
    for (const m of source.matchAll(/['"]((?:knowledge|ask|templates|gallery|shot|faq|privacy|privacyFlow|privacyPage|featuresGrid|followup|liveDemo|workflows|priceMonitoring|howitworks|cta|footer|nav|hero|stickyBar|notfound|meta|usecases|industries|earlyAccess|contact)\.[A-Za-z0-9_.-]+)['"]/g)) used.add(m[1]);
  }
  return used;
};

describe("Russian translation coverage", () => {
  const en = keysOf(read("src/i18n/en.ts"));
  const ru = keysOf(read("src/i18n/ru.ts"));

  test("every rendered English key has a Russian value, so nothing falls back to English", () => {
    const missing = [...renderedKeys()].filter((key) => en.has(key) && !ru.has(key)).sort();
    expect(missing).toEqual([]);
  });

  test("ru.ts holds no keys that en.ts dropped", () => {
    const orphans = [...ru].filter((key) => !en.has(key)).sort();
    expect(orphans).toEqual([]);
  });

  test("retired claims stay out of the rendered Russian copy", () => {
    // Unrendered legacy keys in ru.ts wait for a separate cleanup; check only what pages show.
    const ruSource = read("src/i18n/ru.ts");
    const rendered = renderedKeys();
    const values = [...ruSource.matchAll(/\n {2}"([^"]+)":\s*\n?\s*"((?:[^"\\]|\\.)*)"/g)]
      .filter((m) => rendered.has(m[1]))
      .map((m) => m[2])
      .join("\n");
    const ruSourceRendered = values + read("src/i18n/ru-use-cases.ts");
    for (const banned of ["бесплатно", "Mac и Windows", "macOS скоро", "60 секунд", "Word, PDF", "контекстные карточки", "Уверенность", "не покидает", "оценочные листы", "карта участников", "MEDDPICC", "Telegram"]) {
      expect(ruSourceRendered, banned).not.toContain(banned);
    }
  });
});
