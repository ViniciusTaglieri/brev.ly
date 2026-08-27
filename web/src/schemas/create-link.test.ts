import { describe, expect, test } from "bun:test";
import { createLinkSchema } from "./create-link";

describe("createLinkSchema", () => {
  test("accepts valid payload and normalizes", () => {
    const result = createLinkSchema.parse({
      originalUrl: "example.com/path",
      shortUrl: "My-Link",
    });
    expect(result.shortUrl).toBe("my-link");
    expect(result.originalUrl.startsWith("https://")).toBe(true);
  });

  test("rejects short url too short", () => {
    const result = createLinkSchema.safeParse({
      originalUrl: "https://example.com",
      shortUrl: "ab",
    });
    expect(result.success).toBe(false);
  });

  test("rejects invalid short format", () => {
    const result = createLinkSchema.safeParse({
      originalUrl: "https://example.com",
      shortUrl: "foo_bar",
    });
    expect(result.success).toBe(false);
  });

  test("rejects reserved short urls", () => {
    const result = createLinkSchema.safeParse({
      originalUrl: "https://example.com",
      shortUrl: "docs",
    });
    expect(result.success).toBe(false);
  });

  test("rejects invalid original url", () => {
    const result = createLinkSchema.safeParse({
      originalUrl: "not a url",
      shortUrl: "valid-slug",
    });
    expect(result.success).toBe(false);
  });
});
