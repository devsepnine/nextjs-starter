FROM node:22.15.0-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install -g --ignore-scripts pnpm \
    && pnpm i --frozen-lockfile \
    && pnpm run build \
    && rm -rf .next/cache

FROM node:20.15.0-alpine AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/src/app/next.config.mjs ./next.config.mjs
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

RUN npm install -g --ignore-scripts pnpm \
    && pnpm i --frozen-lockfile --prod \
    && du -sh ./*/ \
    && ls -ahl

EXPOSE 3000

CMD ["pnpm", "start"]