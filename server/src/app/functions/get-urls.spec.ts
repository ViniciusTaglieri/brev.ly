import { randomUUID } from "node:crypto";
import { getUrls } from "@/app/functions/get-urls";
import { isRight, unwrapEither } from "@/infra/shared/either";
import { makeUrl } from "@/test/factories/make-url";
import dayjs from "dayjs";
import { describe, expect, it } from "vitest";

describe("get urls", () => {
  it("should be able to get the urls", async () => {
    const pattern = randomUUID();

    const url1 = await makeUrl({ originalUrl: `https://${pattern}.example.com/1` });
    const url2 = await makeUrl({ originalUrl: `https://${pattern}.example.com/2` });
    const url3 = await makeUrl({ originalUrl: `https://${pattern}.example.com/3` });

    const sut = await getUrls({ searchQuery: pattern });

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut).total).toEqual(3);
    expect(unwrapEither(sut).urls).toEqual([
      expect.objectContaining({ id: url3.id }),
      expect.objectContaining({ id: url2.id }),
      expect.objectContaining({ id: url1.id }),
    ]);
  });

  it("should be able to get paginated urls", async () => {
    const pattern = randomUUID();

    const url1 = await makeUrl({ originalUrl: `https://${pattern}.example.com/1` });
    const url2 = await makeUrl({ originalUrl: `https://${pattern}.example.com/2` });
    const url3 = await makeUrl({ originalUrl: `https://${pattern}.example.com/3` });
    const url4 = await makeUrl({ originalUrl: `https://${pattern}.example.com/4` });
    const url5 = await makeUrl({ originalUrl: `https://${pattern}.example.com/5` });

    let sut = await getUrls({
      searchQuery: pattern,
      page: 1,
      pageSize: 3,
    });

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut).total).toEqual(5);
    expect(unwrapEither(sut).urls).toEqual([
      expect.objectContaining({ id: url5.id }),
      expect.objectContaining({ id: url4.id }),
      expect.objectContaining({ id: url3.id }),
    ]);

    sut = await getUrls({
      searchQuery: pattern,
      page: 2,
      pageSize: 3,
    });

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut).urls).toEqual([
      expect.objectContaining({ id: url2.id }),
      expect.objectContaining({ id: url1.id }),
    ]);
  });

  it("should be able to get sorted urls", async () => {
    const pattern = randomUUID();

    const url1 = await makeUrl({
      originalUrl: `https://${pattern}.example.com/1`,
      createdAt: new Date(),
    });
    const url2 = await makeUrl({
      originalUrl: `https://${pattern}.example.com/2`,
      createdAt: dayjs().subtract(1, "day").toDate(),
    });
    const url3 = await makeUrl({
      originalUrl: `https://${pattern}.example.com/3`,
      createdAt: dayjs().subtract(2, "day").toDate(),
    });

    const sut = await getUrls({
      searchQuery: pattern,
      sortBy: "createdAt",
      sortDirection: "asc",
    });

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut).urls).toEqual([
      expect.objectContaining({ id: url3.id }),
      expect.objectContaining({ id: url2.id }),
      expect.objectContaining({ id: url1.id }),
    ]);
  });
});
