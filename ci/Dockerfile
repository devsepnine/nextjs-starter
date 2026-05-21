FROM node:24.14.0-slim AS builder

WORKDIR /usr/src/app

COPY . .

# --- install pnpm & change user ---------------------------------
RUN npm install -g --ignore-scripts pnpm  \
    && pnpm -v \
    && (id node || adduser --disabled-password --gecos "" node) \
    && chown -R node:node /usr/src/app
USER node

# --- install package & build ------------------------------------
# Next.js standalone 모드: .next/standalone에 server.js + 필요한 node_modules만 자동 트레이싱
RUN pnpm i --frozen-lockfile --ignore-scripts \
    && pnpm build \
    && rm -rf .next/cache \
    && echo "Build completed"


FROM node:24.14.0-slim AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Next.js standalone 산출물만 복사 (pnpm install 불필요)
# public, .next/static은 standalone에 자동 포함되지 않으므로 명시적 복사 필요
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/public ./public

RUN (id node || adduser --disabled-password --gecos "" node) \
    && chown -R node:node /usr/src/app
USER node

EXPOSE 3000

CMD ["node", "server.js"]
