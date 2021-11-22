# Dockerfile

FROM node:latest

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 4100

CMD npm run dev
