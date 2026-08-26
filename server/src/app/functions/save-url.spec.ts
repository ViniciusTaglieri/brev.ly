import { randomUUID } from "node:crypto";
import { InvalidShortUrlFormat } from "@/app/functions/errors/invalid-short-url-format";
import { ShortUrlAlreadyExists } from "@/app/functions/errors/short-url-already-exists";
import { saveUrl } from "@/app/functions/save-url";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import { makeUrl } from "@/test/factories/make-url";
import { describe, expect, it } from "vitest";

describe("save url", () => {
  it("should be able to save a url", async () => {
    const shortUrl = randomUUID().replaceAll("-", "").slice(0, 12);

    const sut = await saveUrl({
      originalUrl: "https://rocketseat.com.br",
      shortUrl,
    });

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut)).toEqual({ shortUrl });
  });

  it("should not be able to save a malformed short url", async () => {
    const sut = await saveUrl({
      originalUrl: "https://rocketseat.com.br",
      shortUrl: "Meu Link!!",
    });

    expect(isLeft(sut)).toBe(true);
    expect(unwrapEither(sut)).toBeInstanceOf(InvalidShortUrlFormat);
  });

  it("should not be able to save a duplicated short url", async () => {
    const shortUrl = randomUUID().replaceAll("-", "").slice(0, 12);

    await makeUrl({ shortUrl });

    const sut = await saveUrl({
      originalUrl: "https://example.com/other",
      shortUrl,
    });

    expect(isLeft(sut)).toBe(true);
    expect(unwrapEither(sut)).toBeInstanceOf(ShortUrlAlreadyExists);
  });
});
