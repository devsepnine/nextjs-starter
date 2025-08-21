# ==================================
# Builder Stage
# ==================================
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# --- 파일을 복사하는 단계에서 바로 소유자를 'node'로 지정합니다 ---
COPY --chown=node:node . .

# --- 이제부터 모든 명령어는 'node' 유저로 실행합니다 ---
USER node

# --- 'node' 유저 권한으로 pnpm 설치 및 빌드 ---
RUN npm install -g --ignore-scripts pnpm \
    && pnpm i --frozen-lockfile --ignore-scripts \
    && pnpm build \
    && rm -rf .next/cache \
    && echo "Build completed"


# ==================================
# Runner Stage
# ==================================
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# --- 빌드 결과물 복사 (소유자도 함께 지정) ---
COPY --from=builder --chown=node:node /usr/src/app/package.json ./package.json
COPY --from=builder --chown=node:node /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=node:node /usr/src/app/next.config.js ./next.config.js
COPY --from=builder --chown=node:node /usr/src/app/.next ./.next
COPY --from=builder --chown=node:node /usr/src/app/public ./public

# --- 'node' 유저로 전환 후 pnpm 설치 및 의존성 설치 ---
# Runner 스테이지에서는 root로 설치해도 큰 문제는 없지만 일관성을 위해 node로 실행
USER node

RUN npm install -g --ignore-scripts pnpm \
    && pnpm i --frozen-lockfile --prod

EXPOSE 3000

CMD ["pnpm", "start"]