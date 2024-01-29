FROM node:18-bullseye as builder

WORKDIR /home/node

COPY . /home/node

RUN npm ci
# RUN npm run test
RUN npm run build

# ---

FROM node:18-bullseye

WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/
COPY --from=builder /home/node/.env /home/node/

# delete husky in production mode
RUN npm pkg delete scripts.prepare

RUN npm ci --production

USER node

CMD ["node", "dist/main.js"]