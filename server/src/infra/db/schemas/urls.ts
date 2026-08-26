import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
  id: serial("id").primaryKey(),
  originalUrl: text("original_url").notNull(),
  shortUrl: varchar("short_url", { length: 100 }).unique().notNull(),
  accessCount: integer("access_count").default(0).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
