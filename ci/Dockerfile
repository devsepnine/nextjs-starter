# ==================================
# Builder Stage: 소스 코드를 빌드하는 단계
# ==================================
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY . .

# --- pnpm 설치 ---
RUN npm install -g --ignore-scripts pnpm

# --- 파일 소유권을 'node' 유저에게 넘겨주고 유저 전환 (보안 강화) ---
RUN chown -R node:node /usr/src/app
USER node

# --- 'node' 유저 권한으로 패키지 설치 및 빌드 ---
RUN pnpm i --frozen-lockfile --ignore-scripts \
    && pnpm build \
    && rm -rf .next/cache \
    && echo "Build completed"


# ==================================
# Runner Stage: 실제 애플리케이션을 실행하는 단계
# ==================================
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# --- 빌드 결과물만 깔끔하게 복사 ---
COPY --from=builder --chown=node:node /usr/src/app/package.json ./package.json
COPY --from=builder --chown=node:node /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=node:node /usr/src/app/next.config.js ./next.config.js
COPY --from=builder --chown=node:node /usr/src/app/.next ./.next
COPY --from=builder --chown=node:node /usr/src/app/public ./public

# --- pnpm 설치 ---
RUN npm install -g --ignore-scripts pnpm

# --- 이제부터 모든 명령어는 'node' 유저로 실행됩니다 ---
USER node

# --- 'node' 유저 권한으로 프로덕션 의존성만 설치 ---
RUN pnpm i --frozen-lockfile --prod

EXPOSE 3000

CMD ["pnpm", "start"]