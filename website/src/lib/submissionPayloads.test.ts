import { describe, expect, test } from "vitest";
import {
  buildContactPayload,
  buildEarlyAccessPayload,
  buildSubscriptionPayload,
} from "./submissionPayloads";

describe("submission payload builders", () => {
  test("adds language and page metadata to early-access submissions", () => {
    expect(
      buildEarlyAccessPayload(" User@Example.COM ", {
        lang: "ru",
        referrer: "https://preview.talkbar.ru/?utm=hero",
      }),
    ).toEqual({
      email: "User@Example.COM",
      source: "preview.talkbar.ru",
      locale: "ru",
      referrer: "https://preview.talkbar.ru/?utm=hero",
    });
  });

  test("builds the named-list subscription body used by product-updates", () => {
    expect(
      buildSubscriptionPayload(" product@example.com ", {
        lang: "en",
        referrer: "https://preview.talkbar.app/#product-updates",
      }),
    ).toEqual({
      email: "product@example.com",
      source: "preview.talkbar.app",
      locale: "en",
      referrer: "https://preview.talkbar.app/#product-updates",
    });
  });

  test("adds license-server contact defaults and visible product-update opt-in", () => {
    expect(
      buildContactPayload(
        {
          name: " Jane ",
          email: " jane@example.com ",
          message: " Hi there ",
          category: "billing",
          subscribeUpdates: true,
        },
        {
          lang: "en",
          referrer: "https://www.talkbar.app/#footer",
        },
      ),
    ).toEqual({
      name: "Jane",
      email: "jane@example.com",
      subject: "Website contact form",
      message: "Hi there",
      category: "billing",
      source: "www.talkbar.app",
      appLanguage: "en",
      subscribeUpdates: true,
    });
  });

  test("preserves contact opt-out when the checkbox is unchecked", () => {
    expect(
      buildContactPayload(
        {
          name: "",
          email: "person@example.com",
          message: "No updates please",
          category: "question",
          subscribeUpdates: false,
        },
        {
          lang: "ru",
          referrer: "https://preview.talkbar.ru/",
        },
      ).subscribeUpdates,
    ).toBe(false);
  });
});
