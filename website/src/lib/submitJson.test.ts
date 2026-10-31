import { afterEach, describe, expect, test, vi } from "vitest";
import { submitJson } from "./submitJson";

const ENDPOINT = "https://license.preview.talkbar.app/api/contact";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("submitJson", () => {
  test("reports placeholder success without sending a request, and warns in dev", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const result = await submitJson("", { email: "a@b.com" });

    expect(result).toEqual({ ok: true, placeholder: true });
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledOnce();
  });

  test("returns a real success for a 2xx response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );

    const result = await submitJson(ENDPOINT, { email: "a@b.com" });

    expect(result).toEqual({ ok: true, placeholder: false, status: 200 });
  });

  test("returns not-ok and logs the failure for a 4xx response", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("Invalid contact submission", { status: 400 })),
    );

    const result = await submitJson(ENDPOINT, { email: "bad" });

    expect(result).toEqual({ ok: false, placeholder: false, status: 400 });
    expect(error).toHaveBeenCalledOnce();
  });

  test("returns not-ok and logs when the request throws", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      }),
    );

    const result = await submitJson(ENDPOINT, { email: "a@b.com" });

    expect(result).toEqual({ ok: false, placeholder: false });
    expect(error).toHaveBeenCalledOnce();
  });
});
