# syntax = docker/dockerfile:1

ARG NODE_VERSION=22.7

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

COPY --link package.json package-lock.json ./
RUN npm install

COPY --link . .

RUN npm run build

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
COPY --from=build /src/node_modules /src/node_modules
COPY --from=build /src/package.json /src/package.json
COPY --from=build /src/drizzle.config.ts /src/drizzle.config.ts
COPY --from=build /src/server/database /src/server/database
COPY --from=build /src/scripts/run.sh /src/scripts/run.sh

RUN chmod +x /src/scripts/run.sh
CMD [ "sh", "/src/scripts/run.sh" ]
