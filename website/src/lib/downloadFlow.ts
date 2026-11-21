import {
  ANALYTICS_SITE,
  detectDownloadTarget,
  detectFromUserAgent,
  directDownloadUrl,
} from "./download";

/**
 * What the download dialog shows: `started` thanks the visitor for a download
 * that has just begun, `startedMac` does the same for the Mac file and says
 * which Macs it runs on, and `choose` lists every file.
 */
export type DownloadDialogMode = "started" | "startedMac" | "choose";

export const OPEN_DOWNLOAD_EVENT = "talkbar:open-download";

type DownloadWindow = Window & {
  __talkbarPendingDownload?: DownloadDialogMode | null;
  __talkbarPendingModal?: string | null;
  plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
};

/** Opens the dialog, or leaves the request for the dialog's island if it has not loaded yet. */
export function openDownloadDialog(mode: DownloadDialogMode, win: DownloadWindow = window) {
  // Only the latest request opens once the island loads.
  win.__talkbarPendingModal = null;
  win.__talkbarPendingDownload = mode;
  win.dispatchEvent(new CustomEvent<DownloadDialogMode>(OPEN_DOWNLOAD_EVENT, { detail: mode }));
}

/** Starts a file download without leaving the page; the click keeps the browser's user gesture. */
export function startDownload(url: string, doc: Document = document) {
  const link = doc.createElement("a");
  link.href = url;
  link.hidden = true;
  doc.body.appendChild(link);
  link.click();
  link.remove();
}

/**
 * Wires every `[data-download-link]` on the page: a known system downloads at
 * once and the dialog thanks the visitor; an unknown or unsupported system
 * opens the dialog to choose. `?download` in the address opens the dialog on load.
 * The system is also set as `data-download-os` on the page, so the buttons show
 * its logo. Returns a function that removes the click handling.
 */
export function initDownloadButtons(win: DownloadWindow = window): () => void {
  const doc = win.document;
  // The User-Agent answer is ready at once; the processor hint refines it.
  let target = detectFromUserAgent(
    win.navigator.userAgent,
    (win.navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform,
    win.navigator.maxTouchPoints,
  );
  doc.documentElement.dataset.downloadOs = target.os;
  void detectDownloadTarget(win.navigator as Parameters<typeof detectDownloadTarget>[0]).then(
    (detected) => {
      target = detected;
    },
  );

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const element = event.target instanceof Element ? event.target : null;
    const link = element?.closest("[data-download-link]");
    if (!link) return;
    event.preventDefault();
    const url = directDownloadUrl(target);
    if (url) {
      startDownload(url, doc);
      win.plausible?.("Download Started", {
        props: { os: target.os, arch: target.arch ?? "unknown", site: ANALYTICS_SITE },
      });
      // A Mac whose processor is unknown (Safari, Firefox) gets the Apple
      // silicon file; the thanks says what it needs.
      openDownloadDialog(target.os === "mac" ? "startedMac" : "started", win);
    } else {
      openDownloadDialog("choose", win);
    }
  };
  doc.addEventListener("click", onClick);

  const address = new URL(win.location.href);
  if (address.searchParams.has("download")) {
    address.searchParams.delete("download");
    win.history.replaceState(win.history.state, "", `${address.pathname}${address.search}${address.hash}`);
    openDownloadDialog("choose", win);
  }
  return () => doc.removeEventListener("click", onClick);
}
