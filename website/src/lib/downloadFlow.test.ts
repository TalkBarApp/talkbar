import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { DOWNLOAD_URLS } from "./download";
import { OPEN_DOWNLOAD_EVENT, initDownloadButtons, openDownloadDialog } from "./downloadFlow";

const WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0";
const MAC = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 Version/17.5";
const LINUX = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/140.0";

let cleanup: (() => void) | null = null;
let downloads: string[] = [];

type Stub = ReturnType<typeof stubWindow>;

function stubWindow(
  userAgent: string,
  href = "https://www.talkbar.app/",
  userAgentData?: { platform?: string; getHighEntropyValues?: () => Promise<{ architecture?: string }> },
) {
  return {
    document,
    navigator: { userAgent, userAgentData },
    location: { href },
    history: { state: null, replaceState: vi.fn() },
    dispatchEvent: vi.fn(),
    plausible: vi.fn(),
  };
}

const start = (win: Stub) => {
  cleanup = initDownloadButtons(win as unknown as Window);
};

const opened = (win: Stub) =>
  win.dispatchEvent.mock.calls
    .map(([event]) => event as CustomEvent)
    .filter((event) => event.type === OPEN_DOWNLOAD_EVENT)
    .map((event) => event.detail);

function clickButton(init: MouseEventInit = {}) {
  const button = document.createElement("a");
  button.href = DOWNLOAD_URLS.windowsX64;
  button.setAttribute("data-download-link", "");
  button.innerHTML = "<span>Download</span>";
  document.body.appendChild(button);
  const event = new MouseEvent("click", { bubbles: true, cancelable: true, button: 0, ...init });
  button.querySelector("span")?.dispatchEvent(event);
  button.remove();
  return event;
}

beforeEach(() => {
  downloads = [];
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
    downloads.push(this.href);
  });
});

afterEach(() => {
  cleanup?.();
  cleanup = null;
  delete document.documentElement.dataset.downloadOs;
  vi.restoreAllMocks();
});

describe("download buttons", () => {
  test("download at once on Windows and thank the visitor", () => {
    const win = stubWindow(WINDOWS);
    start(win);
    const event = clickButton();
    expect(event.defaultPrevented).toBe(true);
    expect(downloads).toEqual([DOWNLOAD_URLS.windowsX64]);
    expect(opened(win)).toEqual(["started"]);
    expect(win.plausible).toHaveBeenCalledWith("Download Started", {
      props: { os: "windows", arch: "unknown", site: "app" },
    });
  });

  test("download the Arm link once Chromium reports an Arm processor", async () => {
    const win = stubWindow(WINDOWS, undefined, {
      platform: "Windows",
      getHighEntropyValues: async () => ({ architecture: "arm" }),
    });
    start(win);
    await Promise.resolve();
    await Promise.resolve();
    clickButton();
    expect(downloads).toEqual([DOWNLOAD_URLS.windowsArm64]);
  });

  test("download the Mac file at once on a Mac and thank the visitor", () => {
    const mac = stubWindow(MAC);
    start(mac);
    expect(clickButton().defaultPrevented).toBe(true);
    expect(downloads).toEqual([DOWNLOAD_URLS.mac]);
    expect(opened(mac)).toEqual(["startedMac"]);
    expect(mac.plausible).toHaveBeenCalledWith("Download Started", {
      props: { os: "mac", arch: "unknown", site: "app" },
    });
  });

  test("mark the page with the visitor's system so the buttons show its logo", () => {
    start(stubWindow(MAC));
    expect(document.documentElement.dataset.downloadOs).toBe("mac");
    cleanup?.();
    start(stubWindow(WINDOWS));
    expect(document.documentElement.dataset.downloadOs).toBe("windows");
  });

  test("open the chooser for an Intel Mac reported by Chromium", async () => {
    const intel = stubWindow(MAC, undefined, {
      platform: "macOS",
      getHighEntropyValues: async () => ({ architecture: "x86" }),
    });
    start(intel);
    await Promise.resolve();
    await Promise.resolve();
    clickButton();
    expect(opened(intel)).toEqual(["choose"]);
    expect(downloads).toEqual([]);
  });

  test("open the chooser on other systems, without downloading", () => {
    const linux = stubWindow(LINUX);
    start(linux);
    clickButton();
    expect(opened(linux)).toEqual(["choose"]);
    expect(downloads).toEqual([]);
  });

  test("leave modified clicks to the browser", () => {
    const win = stubWindow(WINDOWS);
    start(win);
    const event = clickButton({ ctrlKey: true });
    expect(event.defaultPrevented).toBe(false);
    expect(downloads).toEqual([]);
    expect(opened(win)).toEqual([]);
  });

  test("open the dialog for ?download and drop it from the address", () => {
    const win = stubWindow(LINUX, "https://www.talkbar.app/pricing?download&ref=mail#faq");
    start(win);
    expect(win.history.replaceState).toHaveBeenCalledWith(null, "", "/pricing?ref=mail#faq");
    expect(opened(win)).toEqual(["choose"]);
  });

  test("let only the latest request open once the dialogs load", () => {
    const win = { dispatchEvent: vi.fn(), __talkbarPendingModal: "contact" } as unknown as Window & {
      __talkbarPendingModal?: string | null;
      __talkbarPendingDownload?: "started" | "startedMac" | "choose" | null;
    };
    openDownloadDialog("choose", win);
    expect(win.__talkbarPendingModal).toBeNull();
    expect(win.__talkbarPendingDownload).toBe("choose");
  });
});