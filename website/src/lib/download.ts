// Download links and system detection for the website's download buttons.
//
// Files come from the updater's direct links, which redirect to the signed
// installer for first installs. The visitor stays on the website: a known
// system downloads at once, anything else opens the download dialog.

export type DownloadOs = "windows" | "mac" | "other";
export type DownloadArch = "x64" | "arm64";

export interface DownloadTarget {
  os: DownloadOs;
  /** Known only where the browser reports it (Chromium on Windows and macOS). */
  arch: DownloadArch | null;
}

export const DOWNLOAD_HOST = (
  import.meta.env.DOWNLOAD_HOST || "https://updater.talkbar.app"
).replace(/\/+$/, "");

export const DOWNLOAD_URLS = {
  windowsX64: `${DOWNLOAD_HOST}/get/windows/x64`,
  windowsArm64: `${DOWNLOAD_HOST}/get/windows/arm`,
  // Macs with Apple silicon; Intel Macs are not supported.
  mac: `${DOWNLOAD_HOST}/get/mac`,
} as const;

// Plain comparisons, so each build keeps only its own language's address.
const RUSSIAN_SITE =
  import.meta.env.BUILD_DOMAIN === "prod-ru" || import.meta.env.BUILD_DOMAIN === "preview-ru";

/** Distinguishes talkbar.app and talkbar.ru in Plausible download events. */
export const ANALYTICS_SITE = RUSSIAN_SITE ? "ru" : "app";

/** The download page, in the site's language, that lists every installer. */
export const DOWNLOAD_PAGE_URL = RUSSIAN_SITE
  ? "https://download.talkbar.ru"
  : "https://download.talkbar.app";

/**
 * What a download button links to before the visitor's system is known, and
 * without JavaScript: the download page, so no system is handed another's file.
 */
export const DEFAULT_DOWNLOAD_URL = DOWNLOAD_PAGE_URL;

type UserAgentData = {
  platform?: string;
  getHighEntropyValues?: (
    hints: string[],
  ) => Promise<{ architecture?: string; bitness?: string }>;
};

type NavigatorLike = {
  userAgent: string;
  userAgentData?: UserAgentData;
  maxTouchPoints?: number;
};

/**
 * The system from the User-Agent and the Chromium platform hint, without asking
 * for more. An iPad in desktop mode sends a Mac User-Agent; its touch screen
 * tells it apart.
 */
export function detectFromUserAgent(
  userAgent: string,
  platformHint = "",
  maxTouchPoints = 0,
): DownloadTarget {
  const platform = platformHint.toLowerCase();
  if (platform === "windows") return { os: "windows", arch: null };
  if (platform === "macos") return { os: "mac", arch: null };
  if (platform) return { os: "other", arch: null };
  if (/Windows Phone|iPhone|iPad|iPod|Android/i.test(userAgent)) return { os: "other", arch: null };
  if (/Windows NT/i.test(userAgent)) {
    if (/\b(ARM64|aarch64)\b/i.test(userAgent)) return { os: "windows", arch: "arm64" };
    // A 64-bit Windows names Win64 or WOW64; without either it is 32-bit, which
    // TalkBar does not support, so the visitor chooses instead.
    if (!/\b(Win64|WOW64|x64)\b/i.test(userAgent)) return { os: "other", arch: null };
    return { os: "windows", arch: null };
  }
  if (/Macintosh|Mac OS X/i.test(userAgent)) {
    return { os: maxTouchPoints > 1 ? "other" : "mac", arch: null };
  }
  return { os: "other", arch: null };
}

/**
 * The visitor's system. Chromium browsers report the processor through a
 * client hint; other browsers report Windows on Arm as x64 and every Mac as
 * Intel, so without the hint a Mac is taken to have Apple silicon.
 */
export async function detectDownloadTarget(
  nav: NavigatorLike = navigator as NavigatorLike,
): Promise<DownloadTarget> {
  const target = detectFromUserAgent(
    nav.userAgent,
    nav.userAgentData?.platform,
    nav.maxTouchPoints,
  );
  if (target.os === "other" || target.arch || !nav.userAgentData?.getHighEntropyValues) {
    return target;
  }
  try {
    const { architecture, bitness } = await nav.userAgentData.getHighEntropyValues([
      "architecture",
      "bitness",
    ]);
    if (architecture === "arm") return { os: target.os, arch: "arm64" };
    // 32-bit Windows cannot run TalkBar; let the visitor choose instead.
    if (target.os === "windows" && bitness === "32") return { os: "other", arch: null };
    return { os: target.os, arch: "x64" };
  } catch {
    return target;
  }
}

/** The file for a known system, or null when the visitor has to choose. */
export function directDownloadUrl(target: DownloadTarget): string | null {
  if (target.os === "windows") {
    return target.arch === "arm64" ? DOWNLOAD_URLS.windowsArm64 : DOWNLOAD_URLS.windowsX64;
  }
  // An Intel Mac cannot run TalkBar; the dialog shows what it needs.
  if (target.os === "mac") return target.arch === "x64" ? null : DOWNLOAD_URLS.mac;
  return null;
}
