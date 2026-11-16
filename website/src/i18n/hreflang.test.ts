import { afterEach, describe, expect, test, vi } from "vitest";

// domains.ts reads BUILD_DOMAIN when it loads, so each case imports a fresh copy.
async function linksFor(buildDomain: string, canonical: string, translated = true) {
  vi.stubEnv("BUILD_DOMAIN", buildDomain);
  vi.resetModules();
  const { getHreflangLinks } = await import("./domains");
  return getHreflangLinks(canonical, translated);
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("hreflang alternates", () => {
  const productionSet = [
    { hreflang: "en", href: "https://www.talkbar.app/b2b-sales/" },
    { hreflang: "ru", href: "https://www.talkbar.ru/b2b-sales/" },
    { hreflang: "x-default", href: "https://www.talkbar.app/b2b-sales/" },
  ];

  test("both production builds list the same reciprocal set at the same path", async () => {
    expect(await linksFor("prod", "https://www.talkbar.app/b2b-sales/")).toEqual(productionSet);
    expect(await linksFor("prod-ru", "https://www.talkbar.ru/b2b-sales/")).toEqual(productionSet);
  });

  test("preview builds point at the preview domains", async () => {
    const previewSet = [
      { hreflang: "en", href: "https://preview.talkbar.app/" },
      { hreflang: "ru", href: "https://preview.talkbar.ru/" },
      { hreflang: "x-default", href: "https://preview.talkbar.app/" },
    ];
    expect(await linksFor("preview", "https://preview.talkbar.app/")).toEqual(previewSet);
    expect(await linksFor("preview-ru", "https://preview.talkbar.ru/")).toEqual(previewSet);
  });

  test("a page without a counterpart lists only itself", async () => {
    expect(await linksFor("prod", "https://www.talkbar.app/only-en/", false)).toEqual([
      { hreflang: "en", href: "https://www.talkbar.app/only-en/" },
      { hreflang: "x-default", href: "https://www.talkbar.app/only-en/" },
    ]);
    expect(await linksFor("prod-ru", "https://www.talkbar.ru/only-ru/", false)).toEqual([
      { hreflang: "ru", href: "https://www.talkbar.ru/only-ru/" },
    ]);
  });
});
