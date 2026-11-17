import { afterEach, describe, expect, test, vi } from "vitest";

// robots.txt.ts reads BUILD_DOMAIN when it loads, so each case imports a fresh copy.
async function robotsFor(buildDomain: string) {
  vi.stubEnv("BUILD_DOMAIN", buildDomain);
  vi.resetModules();
  const { GET } = await import("./pages/robots.txt");
  const response = await GET({} as Parameters<typeof GET>[0]);
  return response.text();
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("robots.txt per build", () => {
  test.each([
    ["prod", "https://www.talkbar.app"],
    ["prod-ru", "https://www.talkbar.ru"],
  ])("%s allows crawling and names its own sitemap", async (domain, site) => {
    const body = await robotsFor(domain);
    expect(body).toContain("User-agent: *\nAllow: /");
    expect(body).toContain(`Sitemap: ${site}/sitemap-index.xml`);
    expect(body).not.toContain("Disallow");
  });

  test.each(["preview", "preview-ru"])(
    "%s lets search crawlers see noindex but blocks AI crawlers",
    async (domain) => {
      const body = await robotsFor(domain);
      expect(body).toMatch(/^User-agent: \*\nAllow: \//);
      expect(body).toContain("User-agent: GPTBot\nDisallow: /");
      expect(body).not.toContain("Sitemap:");
    },
  );
});
