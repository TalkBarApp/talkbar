import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const readSource = (path: string) =>
  readFileSync(resolve(cwd(), path), "utf8");

const industryPages = [
  "legal-counsel",
  "venture-private-equity",
  "executive-leadership",
  "b2b-sales",
  "product-research",
  "consulting",
];

const conversationPages = [
  "one-on-one-meetings",
  "coaching-sessions",
  "interviews",
  "podcasts",
  "voice-notes",
  "client-calls",
];

const allTalkBarPages = [...industryPages, ...conversationPages];

describe("use-case page sections", () => {
  test("keeps the Live Context Cards section on the homepage only", () => {
    const homepage = readSource("src/components/HomePage.astro");

    expect(homepage).toContain("import LiveDemo from './LiveDemo.astro'");
    expect(homepage).toContain("<LiveDemo lang={lang} />");

    for (const page of allTalkBarPages) {
      const source = readSource(`src/pages/${page}.astro`);

      expect(source).not.toContain("LiveDemo");
      expect(source).not.toContain("<LiveDemo");
    }

    const b2bSales = readSource("src/pages/b2b-sales.astro");

    expect(b2bSales).not.toContain("PriceMonitoring");
    expect(b2bSales).not.toContain("<PriceMonitoring");
  });

  test("all TalkBar deep pages use the workflow output section", () => {
    for (const page of allTalkBarPages) {
      const source = readSource(`src/pages/${page}.astro`);

      expect(source).toContain("UseCaseWorkflow");
      expect(source).toContain("c.workflow");
      expect(source).not.toContain("UseCaseChannels");
      expect(source).not.toContain("c.channels");
    }
  });
});
