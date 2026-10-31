import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

describe("TalkBar preview deployment", () => {
  test("has npm scripts for building and deploying the English preview site", () => {
    const pkg = JSON.parse(read("package.json"));

    expect(pkg.scripts["build:preview"]).toBe("cross-env BUILD_DOMAIN=preview astro build");
    expect(pkg.scripts["deploy:preview"]).toBe(
      "npm run build:preview && npx --yes wrangler pages deploy dist-preview --project-name talkbar-preview --branch preview",
    );
  });

  test("configures preview.talkbar.app as its own build domain", () => {
    const domains = read("src/i18n/domains.ts");
    const astroConfig = read("astro.config.mjs");

    expect(domains).toContain("preview: {");
    expect(domains).toContain("site: 'https://preview.talkbar.app'");
    expect(astroConfig).toContain('process.env.BUILD_DOMAIN === "preview"');
    expect(astroConfig).toContain("https://preview.talkbar.app");
    expect(astroConfig).toContain("dist-${buildDomain}");
    expect(domains).not.toContain("pagesignal");
    expect(astroConfig).not.toContain("pagesignal");
  });

  test("keeps noindex directives on preview builds", () => {
    const baseLayout = read("src/layouts/BaseLayout.astro");

    expect(baseLayout).toContain("BUILD_DOMAIN");
    expect(baseLayout).toContain("isPreviewBuild");
    expect(baseLayout).toContain('<meta name="robots"');
    expect(baseLayout).toContain("noindex");
    expect(baseLayout).toContain("nofollow");
  });
});
