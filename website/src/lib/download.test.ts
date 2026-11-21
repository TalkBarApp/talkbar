import { describe, expect, test } from "vitest";
import {
  ANALYTICS_SITE,
  DEFAULT_DOWNLOAD_URL,
  DOWNLOAD_PAGE_URL,
  DOWNLOAD_URLS,
  detectDownloadTarget,
  detectFromUserAgent,
  directDownloadUrl,
} from "./download";

const WINDOWS =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";
const MAC =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";
const IPHONE =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";
const ANDROID = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/140.0 Mobile";
const LINUX = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/140.0 Safari/537.36";

describe("download links", () => {
  test("point at the updater's direct links for each system", () => {
    expect(DOWNLOAD_URLS.windowsX64).toBe("https://updater.talkbar.app/get/windows/x64");
    expect(DOWNLOAD_URLS.windowsArm64).toBe("https://updater.talkbar.app/get/windows/arm");
    expect(DOWNLOAD_URLS.mac).toBe("https://updater.talkbar.app/get/mac");
  });

  test("send a click without JavaScript to the English download page", () => {
    expect(DOWNLOAD_PAGE_URL).toBe("https://download.talkbar.app");
    expect(DEFAULT_DOWNLOAD_URL).toBe(DOWNLOAD_PAGE_URL);
  });

  test("names the English site for Plausible download events", () => {
    expect(ANALYTICS_SITE).toBe("app");
  });
});

describe("detectFromUserAgent", () => {
  test("knows Windows and the Mac, and treats phones and Linux as other", () => {
    expect(detectFromUserAgent(WINDOWS)).toEqual({ os: "windows", arch: null });
    expect(detectFromUserAgent(MAC)).toEqual({ os: "mac", arch: null });
    expect(detectFromUserAgent(IPHONE).os).toBe("other");
    expect(detectFromUserAgent(ANDROID).os).toBe("other");
    expect(detectFromUserAgent(LINUX).os).toBe("other");
    expect(detectFromUserAgent("").os).toBe("other");
  });

  test("lets the Chromium platform hint win over the User-Agent", () => {
    expect(detectFromUserAgent(MAC, "Windows").os).toBe("windows");
    expect(detectFromUserAgent(WINDOWS, "macOS").os).toBe("mac");
    expect(detectFromUserAgent(WINDOWS, "Linux").os).toBe("other");
  });

  test("sends 32-bit Windows to the chooser instead of an installer it cannot run", () => {
    expect(detectFromUserAgent("Mozilla/5.0 (Windows NT 10.0; rv:128.0) Gecko/20100101 Firefox/128.0").os).toBe(
      "other",
    );
    expect(
      detectFromUserAgent("Mozilla/5.0 (Windows NT 10.0; WOW64; rv:128.0) Gecko/20100101 Firefox/128.0").os,
    ).toBe("windows");
  });

  test("tells an iPad in desktop mode from a Mac by its touch screen", async () => {
    expect(detectFromUserAgent(MAC, "", 5).os).toBe("other");
    expect(detectFromUserAgent(MAC, "", 0).os).toBe("mac");
    expect((await detectDownloadTarget({ userAgent: MAC, maxTouchPoints: 5 })).os).toBe("other");
  });

  test("reads Arm from a Windows User-Agent that names it", () => {
    expect(detectFromUserAgent("Mozilla/5.0 (Windows NT 10.0; ARM64) Firefox/140.0").arch).toBe(
      "arm64",
    );
  });
});

describe("detectDownloadTarget", () => {
  test("asks Chromium for the processor on Windows", async () => {
    const arm = await detectDownloadTarget({
      userAgent: WINDOWS,
      userAgentData: {
        platform: "Windows",
        getHighEntropyValues: async () => ({ architecture: "arm" }),
      },
    });
    expect(arm).toEqual({ os: "windows", arch: "arm64" });
    const x64 = await detectDownloadTarget({
      userAgent: WINDOWS,
      userAgentData: {
        platform: "Windows",
        getHighEntropyValues: async () => ({ architecture: "x86" }),
      },
    });
    expect(x64).toEqual({ os: "windows", arch: "x64" });
  });

  test("asks Chromium for the processor on a Mac", async () => {
    const appleSilicon = await detectDownloadTarget({
      userAgent: MAC,
      userAgentData: {
        platform: "macOS",
        getHighEntropyValues: async () => ({ architecture: "arm" }),
      },
    });
    expect(appleSilicon).toEqual({ os: "mac", arch: "arm64" });
    const intel = await detectDownloadTarget({
      userAgent: MAC,
      userAgentData: {
        platform: "macOS",
        getHighEntropyValues: async () => ({ architecture: "x86" }),
      },
    });
    expect(intel).toEqual({ os: "mac", arch: "x64" });
    expect(await detectDownloadTarget({ userAgent: MAC })).toEqual({ os: "mac", arch: null });
  });

  test("sends 32-bit Windows reported by Chromium to the chooser", async () => {
    const target = await detectDownloadTarget({
      userAgent: WINDOWS,
      userAgentData: {
        platform: "Windows",
        getHighEntropyValues: async () => ({ architecture: "x86", bitness: "32" }),
      },
    });
    expect(target.os).toBe("other");
  });

  test("keeps the User-Agent answer when the hint is unavailable or refused", async () => {
    expect(await detectDownloadTarget({ userAgent: WINDOWS })).toEqual({
      os: "windows",
      arch: null,
    });
    expect(
      await detectDownloadTarget({
        userAgent: WINDOWS,
        userAgentData: {
          platform: "Windows",
          getHighEntropyValues: () => Promise.reject(new Error("denied")),
        },
      }),
    ).toEqual({ os: "windows", arch: null });
  });
});

describe("directDownloadUrl", () => {
  test("downloads at once for Windows and Macs with Apple silicon", () => {
    expect(directDownloadUrl({ os: "windows", arch: null })).toBe(DOWNLOAD_URLS.windowsX64);
    expect(directDownloadUrl({ os: "windows", arch: "x64" })).toBe(DOWNLOAD_URLS.windowsX64);
    expect(directDownloadUrl({ os: "windows", arch: "arm64" })).toBe(DOWNLOAD_URLS.windowsArm64);
    expect(directDownloadUrl({ os: "mac", arch: null })).toBe(DOWNLOAD_URLS.mac);
    expect(directDownloadUrl({ os: "mac", arch: "arm64" })).toBe(DOWNLOAD_URLS.mac);
  });

  test("lets an Intel Mac or an unknown system choose", () => {
    expect(directDownloadUrl({ os: "mac", arch: "x64" })).toBeNull();
    expect(directDownloadUrl({ os: "other", arch: null })).toBeNull();
  });
});
