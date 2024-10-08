FROM node:18-alpine

WORKDIR /app

COPY nodemon.json ./
COPY package.json ./
COPY src ./src

RUN yarn
RUN npm install -g typescript

EXPOSE 3300
EXPOSE 5000

CMD ["npm","run","dev"]
