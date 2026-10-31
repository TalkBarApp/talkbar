export type SubmitResult = {
  // True on an HTTP 2xx response, OR when no endpoint is configured (local
  // placeholder mode). Use `placeholder` to distinguish a real success from the
  // "nothing was sent" case.
  ok: boolean;
  // True when no URL was configured, so no request was actually sent.
  placeholder: boolean;
  status?: number;
};

// POST `payload` as JSON to `url`. When no URL is configured we stay in local
// placeholder mode and report success WITHOUT sending a request (so the homepage
// modals are testable before the license-server endpoints are wired). In dev we
// surface both cases on the console so a local "success" is never mistaken for a
// real submission, and so real failures (CORS, 400 validation, 404 disabled
// list, 429 rate-limit) are visible while testing the integration.
export async function submitJson(
  url: string,
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  if (!url) {
    if (import.meta.env.DEV) {
      console.warn(
        "[talkbar] submission endpoint not configured — reporting placeholder success without sending a request.",
        payload,
      );
    }
    return { ok: true, placeholder: true };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok && import.meta.env.DEV) {
      const body = await res.text().catch(() => "");
      console.error(`[talkbar] submission failed: POST ${url} -> ${res.status}`, body);
    }
    return { ok: res.ok, placeholder: false, status: res.status };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error(`[talkbar] submission error: POST ${url}`, err);
    }
    return { ok: false, placeholder: false };
  }
}
