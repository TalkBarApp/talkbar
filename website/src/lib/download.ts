export const DOWNLOAD_LINK_WINDOWS = import.meta.env.DOWNLOAD_LINK_WINDOWS || "https://cdn.talkbar.app/TalkBar_x64-setup.exe";
export const DOWNLOAD_LINK_MAC = import.meta.env.DOWNLOAD_LINK_MAC || "";

export function getDownloadLink(): string {
  if (typeof window !== "undefined" && window.navigator) {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes("mac") && DOWNLOAD_LINK_MAC) {
      return DOWNLOAD_LINK_MAC;
    }
  }
  return DOWNLOAD_LINK_WINDOWS;
}
