FROM node:18.17.0

WORKDIR /app/nestjs

COPY package*.json ./

COPY ./todo-back-vestwell .

EXPOSE 3000

RUN yarn install

CMD [ "node", "dist/main.js" ]