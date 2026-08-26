import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight } from "@/infra/shared/either";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { stringify } from "csv-stringify";

type ExportUrlsOutput = {
  reportUrl: string;
};

export async function exportUrls(): Promise<
  Either<never, ExportUrlsOutput>
> {
  const { sql, params } = db
    .select({
      original_url: schema.urls.originalUrl,
      short_url: schema.urls.shortUrl,
      access_count: schema.urls.accessCount,
      created_at: schema.urls.createdAt,
    })
    .from(schema.urls)
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(50);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "original_url", header: "URL original" },
      { key: "short_url", header: "URL encurtada" },
      { key: "access_count", header: "contagem de acessos" },
      { key: "created_at", header: "data de criação" },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], _encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }
        callback();
      },
    }),
    csv,
    uploadToStorageStream,
  );

  const uploadToStorage = uploadFileToStorage({
    contentType: "text/csv",
    folder: "downloads",
    fileName: "links.csv",
    contentStream: uploadToStorageStream,
  });

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

  return makeRight({ reportUrl: url });
}
