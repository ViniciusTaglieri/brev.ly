import { getOriginalUrl } from "@/app/functions/get-original-url";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/:shortUrl",
    {
      schema: {
        summary: "Get original URL",
        tags: ["urls"],
        params: z.object({
          shortUrl: z.string().describe("Short URL to resolve"),
        }),
        response: {
          200: z.object({
            originalUrl: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params;
      const result = await getOriginalUrl({ shortUrl });

      if (isRight(result)) {
        const { originalUrl } = unwrapEither(result);
        return reply.status(200).send({ originalUrl });
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "UrlNotFound":
          return reply.status(404).send({ message: error.message });
      }
    },
  );
};
