import { exportUrls } from "@/app/functions/export-urls";
import { unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportUrlsRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/exports",
    {
      schema: {
        summary: "Export urls",
        tags: ["urls"],
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await exportUrls();
      const { reportUrl } = unwrapEither(result);
      return reply.status(200).send({ reportUrl });
    },
  );
};
