import { UrlNotFound } from "@/app/functions/errors/url-not-found";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

const getOriginalUrlInput = z.object({
  shortUrl: z.string(),
});

type GetOriginalUrlInput = z.input<typeof getOriginalUrlInput>;

export async function getOriginalUrl(
  input: GetOriginalUrlInput,
): Promise<Either<UrlNotFound, { originalUrl: string }>> {
  const { shortUrl } = getOriginalUrlInput.parse(input);

  const [row] = await db
    .update(schema.urls)
    .set({
      accessCount: sql`${schema.urls.accessCount} + 1`,
    })
    .where(eq(schema.urls.shortUrl, shortUrl))
    .returning({
      originalUrl: schema.urls.originalUrl,
    });

  if (!row) {
    return makeLeft(new UrlNotFound());
  }

  return makeRight({ originalUrl: row.originalUrl });
}
