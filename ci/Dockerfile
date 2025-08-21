# ==================================
# Builder Stage
# ==================================
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY . .

# --- 파일 소유권을 'node'에게 넘겨주고 바로 유저를 전환합니다 ---
# ★★★ 이 부분을 npm/pnpm 설치보다 먼저 실행하는 것이 핵심입니다 ★★★
RUN chown -R node:node /usr/src/app
USER node

# --- 'node' 유저 권한으로 pnpm 설치 ---
RUN npm install -g --ignore-scripts pnpm

# --- 'node' 유저 권한으로 패키지 설치 및 빌드 ---
RUN pnpm i --frozen-lockfile --ignore-scripts \
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

# --- pnpm 설치 ---
# Runner 스테이지에서는 root 권한으로 설치해도 무방하나,
# 일관성을 위해 node 유저로 전환 후 설치하는 것도 좋은 방법입니다.
RUN npm install -g --ignore-scripts pnpm

# --- 최종 실행 사용자를 'node'로 전환 ---
USER node

# --- 'node' 유저 권한으로 프로덕션 의존성 설치 ---
RUN pnpm i --frozen-lockfile --prod

EXPOSE 3000

CMD ["pnpm", "start"]