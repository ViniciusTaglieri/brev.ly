import { getUrls } from "@/app/functions/get-urls";
import { unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getUrlsRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/",
    {
      schema: {
        summary: "Get urls",
        tags: ["urls"],
        querystring: z.object({
          searchQuery: z.string().optional(),
          sortBy: z.enum(["createdAt"]).optional(),
          sortDirection: z.enum(["asc", "desc"]).optional(),
          page: z.coerce.number().optional().default(1),
          pageSize: z.coerce.number().optional().default(20),
        }),
        response: {
          200: z.object({
            urls: z.array(
              z.object({
                id: z.number(),
                originalUrl: z.string(),
                shortUrl: z.string(),
                accessCount: z.number(),
                createdAt: z.date(),
              }),
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, pageSize, searchQuery, sortBy, sortDirection } =
        request.query;

      const result = await getUrls({
        page,
        pageSize,
        searchQuery,
        sortBy,
        sortDirection,
      });

      const { total, urls } = unwrapEither(result);

      return reply.status(200).send({ total, urls: urls });
    },
  );
};
