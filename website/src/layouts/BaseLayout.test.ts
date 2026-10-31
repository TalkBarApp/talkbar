import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, test } from "vitest";

const read = (path: string) => readFileSync(resolve(cwd(), path), "utf8");

describe("BaseLayout favicon assets", () => {
  test("defines TalkBar favicon assets for light and dark system themes", () => {
    const layout = read("src/layouts/BaseLayout.astro");
    const darkManifest = JSON.parse(read("public/dark/site.webmanifest"));

    expect(layout).toContain('href="/favicon.svg"');
    expect(layout).toContain("'/dark/favicon.svg'");
    expect(layout).toContain('href="/favicon-96x96.png"');
    expect(layout).toContain("'/dark/favicon-96x96.png'");
    expect(layout).toContain('href="/favicon.ico"');
    expect(layout).toContain("'/dark/favicon.ico'");
    expect(layout).toContain('href="/apple-touch-icon.png"');
    expect(layout).toContain("'/dark/apple-touch-icon.png'");
    expect(layout).toContain('href="/site.webmanifest"');
    expect(layout).toContain("'/dark/site.webmanifest'");

    expect(darkManifest.name).toBe("TalkBar");
    expect(darkManifest.short_name).toBe("TalkBar");
    expect(darkManifest.icons.every((icon: { src: string }) => icon.src.startsWith("/dark/"))).toBe(true);
  });

  test("updates the active favicon folder when the system theme changes", () => {
    const layout = read("src/layouts/BaseLayout.astro");

    expect(layout).toContain("data-active-favicon");
    expect(layout).toContain("data-active-favicon-png");
    expect(layout).toContain("data-active-favicon-ico");
    expect(layout).toContain("data-active-apple-touch-icon");
    expect(layout).toContain("data-active-manifest");
    expect(layout).toContain("updateSystemThemeIcons");
    expect(layout).toContain("applySystemAsset");
    expect(layout).toContain("prefers-color-scheme: dark");
    expect(layout).toContain("systemThemeQuery.addEventListener('change', updateSystemThemeIcons)");
    expect(layout).toContain("link.replaceWith(nextLink)");
    expect(layout).toContain("theme=dark");
    expect(layout).toContain("theme=light");
  });
});
