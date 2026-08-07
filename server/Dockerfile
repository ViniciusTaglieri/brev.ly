FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS dependencies
COPY package.json bun.lock ./
RUN bun install

FROM base AS build
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN bun run build

FROM oven/bun:1-alpine AS deploy
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

USER bun
EXPOSE 3333

CMD ["bun", "dist/infra/http/server.js"]