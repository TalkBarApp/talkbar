import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, test } from "vitest";
import SiteModals from "./SiteModals";
import en from "../i18n/en";

let root: Root | null = null;
let container: HTMLDivElement | null = null;

async function renderModal() {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => {
    root?.render(<SiteModals lang="en" translations={en} />);
  });
  await act(async () => {
    window.dispatchEvent(new CustomEvent("talkbar:open-contact"));
  });
  return container;
}

afterEach(() => {
  root?.unmount();
  root = null;
  container?.remove();
  container = null;
});

describe("SiteModals contact updates opt-in", () => {
  test("shows the product updates checkbox checked by default", async () => {
    const modal = await renderModal();

    const checkbox = modal.querySelector<HTMLInputElement>('input[name="subscribeUpdates"]');

    expect(checkbox).toBeTruthy();
    expect(checkbox?.type).toBe("checkbox");
    expect(checkbox?.checked).toBe(true);
    expect(modal.textContent).toContain("Keep me posted on product updates");
  });
});


async function openDownload(mode: "started" | "startedMac" | "choose") {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => {
    root?.render(<SiteModals lang="en" translations={en} />);
  });
  await act(async () => {
    window.dispatchEvent(new CustomEvent("talkbar:open-download", { detail: mode }));
  });
  // Every modal stays mounted; the download dialog is the one named by its title.
  return container.querySelector<HTMLElement>('[aria-labelledby="download-title"]')!;
}

const fileLinks = (modal: HTMLElement) =>
  Array.from(modal.querySelectorAll<HTMLAnchorElement>("a[href]")).map((link) => [
    link.textContent,
    link.getAttribute("href"),
  ]);

const EVERY_FILE = [
  ["Windows (Intel or AMD)", "https://updater.talkbar.app/get/windows/x64"],
  ["Windows on Arm", "https://updater.talkbar.app/get/windows/arm"],
  ["Mac with Apple silicon", "https://updater.talkbar.app/get/mac"],
];

async function clickFile(modal: HTMLElement, hrefEnd: string) {
  const link = modal.querySelector<HTMLAnchorElement>(`a[href$="${hrefEnd}"]`);
  await act(async () => {
    link?.addEventListener("click", (event) => event.preventDefault(), { once: true });
    link?.click();
  });
}

const pressKey = async (key: string, shiftKey = false) => {
  await act(async () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key, shiftKey, bubbles: true, cancelable: true }));
  });
};

describe("SiteModals download dialog", () => {
  test("thanks the visitor and lists every file in case the download did not start", async () => {
    const modal = await openDownload("started");
    expect(modal.textContent).toContain("Thanks for downloading TalkBar!");
    const brand = modal.querySelector("h2 [data-brand-name]");
    expect(brand?.className).toContain("font-semibold");
    expect(brand?.querySelector(".text-logo-accent")?.textContent).toBe("Bar");
    expect(
      Array.from(modal.querySelectorAll("h2 .zoom-word")).map((word) => word.textContent),
    ).toEqual(["Thanks", "for", "downloading", "TalkBar!"]);
    const okay = modal.querySelector("button[data-autofocus]");
    expect(okay?.textContent).toBe("Okay");
    expect(okay?.className).not.toContain("btn-primary");
    expect(modal.textContent).toContain("Download didn’t start?");
    expect(fileLinks(modal)).toEqual(EVERY_FILE);
    expect(modal.textContent).not.toMatch(/soon/i);
  });

  test("replays the title's zoom each time the thanks opens", async () => {
    const modal = await openDownload("started");
    const first = modal.querySelector("#download-title");
    await act(async () => {
      window.dispatchEvent(new CustomEvent("talkbar:open-download", { detail: "started" }));
    });
    const second = modal.querySelector("#download-title");
    expect(second).toBeTruthy();
    expect(second).not.toBe(first);
  });

  test("lists the Windows and Mac files with what each needs", async () => {
    const modal = await openDownload("choose");
    expect(modal.textContent).toContain("Choose the version for your computer.");
    expect(fileLinks(modal)).toEqual(EVERY_FILE);
    expect(modal.textContent).toContain("Windows 10 or 11, 64-bit");
    expect(modal.textContent).toContain("Windows 11 on Arm");
    expect(modal.textContent).toContain("Mac with Apple silicon, macOS 13.4 or later");
    expect(modal.querySelector('input[type="email"]')).toBeNull();
  });

  test.each(["/get/windows/arm", "/get/mac"])(
    "thanks the visitor after the %s file link",
    async (hrefEnd) => {
      const modal = await openDownload("choose");
      await clickFile(modal, hrefEnd);
      expect(modal.textContent).toContain("Thanks for downloading TalkBar!");
    },
  );

  test("tells a Mac visitor which Macs the started download runs on", async () => {
    const modal = await openDownload("startedMac");
    expect(modal.textContent).toContain("Thanks for downloading TalkBar!");
    expect(modal.querySelector("[data-mac-requirement]")?.textContent).toBe(
      "Mac with Apple silicon, macOS 13.4 or later. Intel Macs aren’t supported.",
    );
  });

  test("states the Mac requirement after the Mac file link, and not after a Windows file", async () => {
    const mac = await openDownload("choose");
    await clickFile(mac, "/get/mac");
    expect(mac.querySelector("[data-mac-requirement]")).toBeTruthy();
    root?.unmount();
    container?.remove();
    const windows = await openDownload("choose");
    await clickFile(windows, "/get/windows/x64");
    expect(windows.querySelector("[data-mac-requirement]")).toBeNull();
  });
});

describe("SiteModals keyboard access", () => {
  test("keeps closed dialogs out of keyboard focus", async () => {
    const modal = await openDownload("choose");
    expect(modal.closest("[inert]")).toBeNull();
    const contact = container?.querySelector('[aria-labelledby="contact-title"]');
    expect(contact?.closest("[inert]")).toBeTruthy();
  });

  test("keeps Tab and Shift+Tab inside the open dialog", async () => {
    const modal = await openDownload("choose");
    const close = modal.querySelector<HTMLButtonElement>("button[data-modal-close]")!;
    const mac = modal.querySelector<HTMLAnchorElement>('a[href$="/get/mac"]')!;
    mac.focus();
    await pressKey("Tab");
    expect(document.activeElement).toBe(close);
    await pressKey("Tab", true);
    expect(document.activeElement).toBe(mac);
  });

  test("returns focus to the button that opened the dialog when it closes", async () => {
    const opener = document.createElement("button");
    document.body.appendChild(opener);
    opener.focus();
    const modal = await openDownload("choose");
    modal.querySelector<HTMLAnchorElement>("a[href]")?.focus();
    await pressKey("Escape");
    expect(document.activeElement).toBe(opener);
    opener.remove();
  });

  test("returns focus to a clicked trigger that the browser did not focus (Safari)", async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    await act(async () => {
      root?.render(<SiteModals lang="en" translations={en} />);
    });
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.click();
    expect(document.activeElement).toBe(document.body);
    await act(async () => {
      window.dispatchEvent(new CustomEvent("talkbar:open-download", { detail: "choose" }));
    });
    await pressKey("Escape");
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  async function renderModals() {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    await act(async () => {
      root?.render(<SiteModals lang="en" translations={en} />);
    });
  }

  const openChooser = () =>
    act(async () => {
      window.dispatchEvent(new CustomEvent("talkbar:open-download", { detail: "choose" }));
    });

  test("returns focus to the clicked trigger, not to another control that kept focus", async () => {
    await renderModals();
    const focused = document.createElement("button");
    const trigger = document.createElement("button");
    document.body.append(focused, trigger);
    focused.focus();
    trigger.click();
    expect(document.activeElement).toBe(focused);
    await openChooser();
    await pressKey("Escape");
    expect(document.activeElement).toBe(trigger);
    focused.remove();
    trigger.remove();
  });

  test("returns focus to the menu button when the trigger sits in a menu that has closed", async () => {
    await renderModals();
    const toggle = document.createElement("button");
    toggle.setAttribute("aria-controls", "test-drawer");
    const drawer = document.createElement("div");
    drawer.id = "test-drawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    const link = document.createElement("button");
    drawer.append(link);
    document.body.append(toggle, drawer);
    link.click();
    drawer.setAttribute("aria-modal", "false");
    await openChooser();
    await pressKey("Escape");
    expect(document.activeElement).toBe(toggle);
    toggle.remove();
    drawer.remove();
  });
});