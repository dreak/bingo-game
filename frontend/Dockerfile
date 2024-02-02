FROM node:20 as builder

WORKDIR /home/node

COPY package*.json ./
RUN npm ci

COPY . .
# RUN npm run test
RUN npm run build \
  && npm prune --omit=dev


# ---

FROM nginx:bookworm

WORKDIR /home/node

COPY --from=builder /home/node/dist/bingo-game-frontend-client /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
