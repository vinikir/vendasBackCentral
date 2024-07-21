FROM node:18-alpine as builder
WORKDIR /app
COPY nodemon.json ./
COPY package.json ./
COPY apminsightnode-dev.json ./apminsightnode.json
COPY src ./src
RUN ls -a
RUN npm install -g eslint
RUN npm install
RUN npm install winston

EXPOSE 80
EXPOSE 5000

CMD ["npm","run","dev"]
