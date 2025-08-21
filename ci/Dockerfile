FROM node:22.18.0-alpine AS builder

WORKDIR /usr/src/app

COPY . .

# --- install pnpm & change user ---------------------------------
RUN npm install -g --ignore-scripts pnpm \
    && pnpm -v

# --- install package & build ------------------------------------
RUN pnpm i --frozen-lockfile --ignore-scripts \
    && pnpm build \
    && rm -rf .next/cache \
    && echo "Build completed"


FROM node:20.18.0-alpine AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/src/app/next.config.js ./next.config.js
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

# --- install pnpm & change user ---------------------------------
RUN npm install -g --ignore-scripts pnpm  \
    && pnpm -v \
    && pnpm i --frozen-lockfile --prod

EXPOSE 3000

CMD ["pnpm", "start"]