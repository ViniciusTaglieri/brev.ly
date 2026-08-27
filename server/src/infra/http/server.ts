import { env } from "@/env";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { deleteUrlRoute } from "./routes/delete-url";
import { exportUrlsRoute } from "./routes/export-urls";
import { getOriginalUrlRoute } from "./routes/get-original-url";
import { getUrlsRoute } from "./routes/get-urls";
import { saveUrlRoute } from "./routes/save-url";

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: `Validation error: ${error.message}`,
      issues: error.validation,
    });
  }

  console.error(error);

  return reply.status(500).send({ message: "Internal server error." });
});

server.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
});

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "URL Shortener API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(getUrlsRoute);
server.register(saveUrlRoute);
server.register(deleteUrlRoute);
server.register(exportUrlsRoute);
server.register(getOriginalUrlRoute);

server.listen({ port: env.PORT, host: "0.0.0.0" }).then((address) => {
  console.log(`HTTP Server running! ${address}`);
});
