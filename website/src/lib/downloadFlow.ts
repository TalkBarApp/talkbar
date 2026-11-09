import {
  detectDownloadTarget,
  detectFromUserAgent,
  directDownloadUrl,
  type DownloadTarget,
} from "./download";

/**
 * What the download dialog shows: `started` thanks the visitor for a download
 * that has just begun, `choose` lists every file, and `mac` explains that the
 * Mac version is not out yet.
 */
export type DownloadDialogMode = "started" | "choose" | "mac";

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

/** The dialog that answers a download click for this system when nothing can download at once. */
export function dialogModeFor(target: DownloadTarget): DownloadDialogMode {
  return target.os === "mac" ? "mac" : "choose";
}

/**
 * Wires every `[data-download-link]` on the page: a known system downloads at
 * once and the dialog thanks the visitor; a Mac or an unknown system opens the
 * dialog to choose. `?download` in the address opens the dialog on load.
 * Returns a function that removes the click handling.
 */
export function initDownloadButtons(win: DownloadWindow = window): () => void {
  const doc = win.document;
  // The User-Agent answer is ready at once; the processor hint refines it.
  let target = detectFromUserAgent(
    win.navigator.userAgent,
    (win.navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform,
    win.navigator.maxTouchPoints,
  );
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
        props: { os: target.os, arch: target.arch ?? "unknown" },
      });
      openDownloadDialog("started", win);
    } else {
      openDownloadDialog(dialogModeFor(target), win);
    }
  };
  doc.addEventListener("click", onClick);

  const address = new URL(win.location.href);
  if (address.searchParams.has("download")) {
    address.searchParams.delete("download");
    win.history.replaceState(win.history.state, "", `${address.pathname}${address.search}${address.hash}`);
    openDownloadDialog(dialogModeFor(target), win);
  }
  return () => doc.removeEventListener("click", onClick);
}
