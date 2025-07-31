FROM node:22.17.1-alpine AS builder

WORKDIR /usr/src/app

COPY . .

# --- install pnpm & change user ---------------------------------
RUN npm install -g --ignore-scripts pnpm  \
    && pnpm -v \
    && (id node || adduser --disabled-password --gecos "" node) \
    && chown -R node:node /usr/src/app
USER node

# --- install package & build ------------------------------------
RUN pnpm i --frozen-lockfile --ignore-scripts \
    && pnpm build \
    && rm -rf .next/cache \
    && echo "Build completed"


FROM node:20.17.1-alpine AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/src/app/next.config.js ./next.config.js
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

# --- install pnpm & change user ---------------------------------
RUN npm install -g --ignore-scripts pnpm  \
    && pnpm -v \
    && pnpm i --frozen-lockfile --prod \
    && (id node || adduser --disabled-password --gecos "" node) \
    && chown -R node:node /usr/src/app
USER node

EXPOSE 3000

CMD ["pnpm", "start"]