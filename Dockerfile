FROM node:20.12.2-alpine

RUN npm insatll -g pnpm

WORKDIR /usr/src/app

COPY package.json ./
RUN pnpm i

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]