# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD npm start