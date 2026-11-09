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

async function openDownload(mode: "started" | "choose" | "mac") {
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
    expect(fileLinks(modal)).toEqual([
      ["Intel or AMD (x64)", "https://updater.talkbar.app/get/windows/x64"],
      ["Arm (arm64)", "https://updater.talkbar.app/get/windows/arm"],
    ]);
    expect(modal.textContent).toContain("Coming soon");
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

  test("lets an unknown system choose, and thanks the visitor after a file link", async () => {
    const modal = await openDownload("choose");
    expect(modal.textContent).toContain("Choose the version for your computer.");
    const arm = modal.querySelector<HTMLAnchorElement>('a[href$="/get/windows/arm"]');
    await act(async () => {
      arm?.addEventListener("click", (event) => event.preventDefault(), { once: true });
      arm?.click();
    });
    expect(modal.textContent).toContain("Thanks for downloading TalkBar!");
  });

  test("tells Mac visitors the Mac version is coming and offers the Windows files", async () => {
    const modal = await openDownload("mac");
    expect(modal.textContent).toContain("TalkBar for Mac is coming soon");
    expect(modal.querySelector('input[type="email"]')).toBeTruthy();
    expect(modal.textContent).not.toContain("Coming soon");
    expect(fileLinks(modal).map(([, href]) => href)).toEqual([
      "https://updater.talkbar.app/get/windows/x64",
      "https://updater.talkbar.app/get/windows/arm",
    ]);
  });

  test("switches from the file list to the Mac form", async () => {
    const modal = await openDownload("choose");
    const notify = Array.from(modal.querySelectorAll("button")).find(
      (button) => button.textContent === "Tell me when it’s ready",
    );
    await act(async () => notify?.click());
    expect(modal.textContent).toContain("TalkBar for Mac is coming soon");
  });
});

describe("SiteModals keyboard access", () => {
  test("moves focus to the email field when the chooser switches to the Mac form", async () => {
    const modal = await openDownload("choose");
    const notify = Array.from(modal.querySelectorAll("button")).find(
      (button) => button.textContent === "Tell me when it’s ready",
    );
    await act(async () => notify?.click());
    expect(document.activeElement).toBe(modal.querySelector('input[type="email"]'));
  });

  test("moves focus to the confirmation after a Mac signup", async () => {
    const modal = await openDownload("mac");
    const input = modal.querySelector<HTMLInputElement>('input[type="email"]')!;
    const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
    await act(async () => {
      setValue.call(input, "mac@example.com");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
      input.form?.requestSubmit();
    });
    const status = modal.querySelector('[role="status"]');
    expect(status?.textContent).toContain("We’ll email you when TalkBar for Mac is ready.");
    expect(document.activeElement).toBe(status);
  });

  test("keeps closed dialogs out of keyboard focus", async () => {
    const modal = await openDownload("choose");
    expect(modal.closest("[inert]")).toBeNull();
    const contact = container?.querySelector('[aria-labelledby="contact-title"]');
    expect(contact?.closest("[inert]")).toBeTruthy();
  });
});