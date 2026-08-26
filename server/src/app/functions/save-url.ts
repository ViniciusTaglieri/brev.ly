import { InvalidShortUrlFormat } from "@/app/functions/errors/invalid-short-url-format";
import { ShortUrlAlreadyExists } from "@/app/functions/errors/short-url-already-exists";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import {
  isReservedShortUrl,
  isValidShortUrl,
  normalizeOriginalUrl,
  normalizeShortUrl,
} from "@/infra/shared/normalizeUrls";
import { isUniqueViolation } from "@/infra/shared/postgres-error";
import { z } from "zod";

const saveUrlInput = z.object({
  originalUrl: z
    .string()
    .trim()
    .transform(normalizeOriginalUrl)
    .pipe(z.httpUrl()),
  shortUrl: z.string().trim().transform(normalizeShortUrl),
});

type SaveUrlInput = z.input<typeof saveUrlInput>;

type SaveUrlOutput = {
  shortUrl: string;
};

export async function saveUrl(
  input: SaveUrlInput,
): Promise<
  Either<InvalidShortUrlFormat | ShortUrlAlreadyExists, SaveUrlOutput>
> {
  const { originalUrl, shortUrl } = saveUrlInput.parse(input);

  if (!isValidShortUrl(shortUrl) || isReservedShortUrl(shortUrl)) {
    return makeLeft(new InvalidShortUrlFormat());
  }

  try {
    await db.insert(schema.urls).values({
      originalUrl,
      shortUrl,
    });

    return makeRight({ shortUrl });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return makeLeft(new ShortUrlAlreadyExists());
    }

    throw error;
  }
}
