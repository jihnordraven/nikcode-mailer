FROM node:latest

WORKDIR /app

RUN npm install yarn

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]