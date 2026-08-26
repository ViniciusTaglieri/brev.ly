import { UrlNotFound } from "@/app/functions/errors/url-not-found";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { eq } from "drizzle-orm";

export async function deleteUrl(
  shortUrl: string,
): Promise<Either<UrlNotFound, { shortUrl: string }>> {
  const result = await db
    .delete(schema.urls)
    .where(eq(schema.urls.shortUrl, shortUrl))
    .returning({ shortUrl: schema.urls.shortUrl });

  if (result.length === 0) {
    return makeLeft(new UrlNotFound());
  }

  return makeRight({ shortUrl });
}
