FROM node:20-bookworm-slim as builder

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
# RUN npm run test
RUN npm run build \
  && npm prune --omit=dev


# ---

FROM node:20-bookworm-slim

ARG NODE_ENV
ARG MYSQL_HOST
ARG MYSQL_PORT
ARG MYSQL_USER_ID
ARG MYSQL_PASSWORD
ARG MYSQL_DATABASE

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/
COPY --from=builder /home/node/.env /home/node/

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["node", "dist/main.js"]