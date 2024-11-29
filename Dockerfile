FROM node:20-alpine

MAINTAINER Anton M.

RUN mkdir /app
WORKDIR /app

COPY ./backend/package.json /app

RUN npm i

