import { randomUUID } from "node:crypto";
import { UrlNotFound } from "@/app/functions/errors/url-not-found";
import { getOriginalUrl } from "@/app/functions/get-original-url";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import { makeUrl } from "@/test/factories/make-url";
import { eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";

describe("get original url", () => {
  it("should increment access count and return the original url", async () => {
    const shortUrl = randomUUID().replaceAll("-", "").slice(0, 12);
    const created = await makeUrl({
      shortUrl,
      originalUrl: "https://rocketseat.com.br/",
      accessCount: 0,
    });

    const sut = await getOriginalUrl({ shortUrl });

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut)).toEqual({
      originalUrl: "https://rocketseat.com.br/",
    });

    const [row] = await db
      .select({ accessCount: schema.urls.accessCount })
      .from(schema.urls)
      .where(eq(schema.urls.id, created.id));

    expect(row?.accessCount).toBe(1);
  });

  it("should not be able to get a missing short url", async () => {
    const sut = await getOriginalUrl({
      shortUrl: randomUUID().replaceAll("-", "").slice(0, 12),
    });

    expect(isLeft(sut)).toBe(true);
    expect(unwrapEither(sut)).toBeInstanceOf(UrlNotFound);
  });
});
