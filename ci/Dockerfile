FROM node:20.14.0-slim AS builder

WORKDIR /usr/src/app

COPY . .

RUN corepack enable pnpm \
    && pnpm i --frozen-lockfile \
    && pnpm run build \
    && rm -rf .next/cache

FROM node:20.14.0-slim AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/src/app/next.config.mjs ./next.config.mjs
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

RUN corepack enable \
    && pnpm i --frozen-lockfile --prod \
    && du -sh */ \
    && ls -ahl

EXPOSE 3000

CMD ["pnpm", "start"]