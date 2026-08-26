import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { fakerPT_BR as faker } from "@faker-js/faker";
import type { InferInsertModel } from "drizzle-orm";

export async function makeUrl(
  overrides?: Partial<InferInsertModel<typeof schema.urls>>,
) {
  const [row] = await db
    .insert(schema.urls)
    .values({
      originalUrl: faker.internet.url(),
      shortUrl: faker.string.alphanumeric({ length: 10 }).toLowerCase(),
      ...overrides,
    })
    .returning();

  return row;
}
