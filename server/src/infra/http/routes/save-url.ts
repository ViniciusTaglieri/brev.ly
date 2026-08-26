import { saveUrl } from "@/app/functions/save-url";
import { isRight, unwrapEither } from "@/infra/shared/either";
import { shortUrlPattern } from "@/infra/shared/normalizeUrls";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const saveUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/",
    {
      schema: {
        summary: "Save a short URL",
        tags: ["urls"],
        body: z.object({
          originalUrl: z.url().describe("Original URL to be shortened"),
          shortUrl: z
            .string()
            .trim()
            .toLowerCase()
            .min(3)
            .max(50)
            .regex(shortUrlPattern)
            .describe("Short URL to be saved"),
        }),
        response: {
          201: z.null().describe("Url saved successfully"),
          400: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body;

      const result = await saveUrl({
        originalUrl,
        shortUrl,
      });

      if (isRight(result)) {
        return reply.status(201).send(null);
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "InvalidShortUrlFormat":
          return reply.status(400).send({ message: error.message });
        case "ShortUrlAlreadyExists":
          return reply.status(409).send({ message: error.message });
      }
    },
  );
};
