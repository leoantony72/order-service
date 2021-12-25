# Dockerfile

FROM node:latest

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 4100

CMD npm run dev
