import { describe, expect, test } from "vitest";
import { resolveSubmissionEndpoints } from "./submissionEndpoints.js";

describe("submission endpoint resolution", () => {
  test("derives production and preview .app license-server endpoints", () => {
    expect(resolveSubmissionEndpoints({ buildDomain: "prod" })).toMatchObject({
      earlyAccessSubscribeUrl: "https://license.talkbar.app/api/early-access",
      contactFormUrl: "https://license.talkbar.app/api/contact",
      productUpdatesSubscribeUrl:
        "https://license.talkbar.app/api/subscriptions/product-updates",
    });

    expect(resolveSubmissionEndpoints({ buildDomain: "preview" })).toMatchObject({
      earlyAccessSubscribeUrl: "https://license.preview.talkbar.app/api/early-access",
      contactFormUrl: "https://license.preview.talkbar.app/api/contact",
      productUpdatesSubscribeUrl:
        "https://license.preview.talkbar.app/api/subscriptions/product-updates",
    });
  });

  test("derives Russian preview endpoints on the .ru license server", () => {
    expect(resolveSubmissionEndpoints({ buildDomain: "preview-ru" })).toMatchObject({
      earlyAccessSubscribeUrl: "https://license.preview.talkbar.ru/api/early-access",
      contactFormUrl: "https://license.preview.talkbar.ru/api/contact",
      productUpdatesSubscribeUrl:
        "https://license.preview.talkbar.ru/api/subscriptions/product-updates",
    });
  });

  test("derives future live Russian endpoints on the .ru license server", () => {
    expect(resolveSubmissionEndpoints({ buildDomain: "prod-ru" })).toMatchObject({
      earlyAccessSubscribeUrl: "https://license.talkbar.ru/api/early-access",
      contactFormUrl: "https://license.talkbar.ru/api/contact",
      productUpdatesSubscribeUrl:
        "https://license.talkbar.ru/api/subscriptions/product-updates",
    });
  });

  test("keeps local dev in placeholder mode unless endpoints are explicitly configured", () => {
    expect(resolveSubmissionEndpoints({ buildDomain: "preview-ru", isDev: true })).toMatchObject({
      earlyAccessSubscribeUrl: "",
      contactFormUrl: "",
      productUpdatesSubscribeUrl: "",
    });

    expect(
      resolveSubmissionEndpoints({
        buildDomain: "preview-ru",
        isDev: true,
        contactFormUrl: "http://localhost:8787/api/contact",
      }).contactFormUrl,
    ).toBe("http://localhost:8787/api/contact");
  });

  test("rejects talkbar.app submission endpoints for Russian builds", () => {
    expect(() =>
      resolveSubmissionEndpoints({
        buildDomain: "preview-ru",
        earlyAccessSubscribeUrl: "https://license.preview.talkbar.app/api/early-access",
      }),
    ).toThrow(/preview-ru.*talkbar\.ru/);

    expect(() =>
      resolveSubmissionEndpoints({
        buildDomain: "prod-ru",
        contactFormUrl: "https://license.talkbar.app/api/contact",
      }),
    ).toThrow(/prod-ru.*talkbar\.ru/);
  });

  test("rejects talkbar.ru submission endpoints for English builds", () => {
    expect(() =>
      resolveSubmissionEndpoints({
        buildDomain: "preview",
        contactFormUrl: "https://license.preview.talkbar.ru/api/contact",
      }),
    ).toThrow(/preview.*talkbar\.app/);
  });
});
