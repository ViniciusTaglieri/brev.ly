import { randomUUID } from "node:crypto";
import { UrlNotFound } from "@/app/functions/errors/url-not-found";
import { deleteUrl } from "@/app/functions/delete-url";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import { makeUrl } from "@/test/factories/make-url";
import { describe, expect, it } from "vitest";

describe("delete url", () => {
  it("should be able to delete a url", async () => {
    const shortUrl = randomUUID().replaceAll("-", "").slice(0, 12);
    await makeUrl({ shortUrl });

    const sut = await deleteUrl(shortUrl);

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut)).toEqual({ shortUrl });
  });

  it("should not be able to delete a missing url", async () => {
    const sut = await deleteUrl(
      randomUUID().replaceAll("-", "").slice(0, 12),
    );

    expect(isLeft(sut)).toBe(true);
    expect(unwrapEither(sut)).toBeInstanceOf(UrlNotFound);
  });
});
