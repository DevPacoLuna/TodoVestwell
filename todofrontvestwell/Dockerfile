FROM node:18.17.0

WORKDIR /src/app

COPY package*.json ./

COPY ./todofrontvestwell .

EXPOSE 4200

RUN yarn install

RUN yarn build

CMD yarn start