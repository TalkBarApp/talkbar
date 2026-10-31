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
