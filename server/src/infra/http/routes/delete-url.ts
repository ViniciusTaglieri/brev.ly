import { deleteUrl } from "@/app/functions/delete-url";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

export const deleteUrlRoute = (server: FastifyInstance) => {
  server.delete(
    "/:shortUrl",
    {
      schema: {
        summary: "Delete a short URL",
        tags: ["urls"],
        params: z.object({
          shortUrl: z.string().describe("Short URL to be deleted"),
        }),
        response: {
          204: z.null().describe("Url Deleted successfully"),
          404: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params as { shortUrl: string };
      const result = await deleteUrl(shortUrl);

      if (isRight(result)) {
        return reply.status(204).send();
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "UrlNotFound":
          return reply.status(404).send({ message: error.message });
        default:
          return reply.status(500).send({ message: "Internal server error." });
      }
    },
  );
};
