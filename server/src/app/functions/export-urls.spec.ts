import { randomUUID } from "node:crypto";
import { exportUrls } from "@/app/functions/export-urls";
import { isRight, unwrapEither } from "@/infra/shared/either";
import * as upload from "@/infra/storage/upload-file-to-storage";
import { makeUrl } from "@/test/factories/make-url";
import { describe, expect, it, vi } from "vitest";

describe("export urls", () => {
  it("should be able to export urls", async () => {
    const uploadStub = vi
      .spyOn(upload, "uploadFileToStorage")
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: "http://example.com/file.csv",
        };
      });

    const pattern = randomUUID().replaceAll("-", "").slice(0, 12);

    const url1 = await makeUrl({
      shortUrl: `${pattern}1`,
      originalUrl: "https://one.example/",
      accessCount: 1,
    });
    const url2 = await makeUrl({
      shortUrl: `${pattern}2`,
      originalUrl: "https://two.example/",
      accessCount: 2,
    });

    const sut = await exportUrls();

    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream;
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = [];

      generatedCSVStream.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      generatedCSVStream.on("end", () => {
        resolve(Buffer.concat(chunks).toString("utf-8"));
      });

      generatedCSVStream.on("error", (err) => {
        reject(err);
      });
    });

    const csvAsArray = csvAsString
      .trim()
      .split("\n")
      .map((row) => row.split(","));

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut).reportUrl).toBe("http://example.com/file.csv");
    expect(csvAsArray[0]).toEqual([
      "URL original",
      "URL encurtada",
      "contagem de acessos",
      "data de criação",
    ]);
    expect(csvAsArray).toEqual(
      expect.arrayContaining([
        [
          url1.originalUrl,
          url1.shortUrl,
          String(url1.accessCount),
          expect.any(String),
        ],
        [
          url2.originalUrl,
          url2.shortUrl,
          String(url2.accessCount),
          expect.any(String),
        ],
      ]),
    );
  });
});
