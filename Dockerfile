FROM node:24.12.0-alpine3.23

WORKDIR /app

RUN apk update \
  && apk add make g++ git \
  && apk add curl bash binutils gettext

COPY package*.json ./
RUN npm install --ignore-scripts

COPY . .

RUN npm i --ignore-scripts -g @nestjs/cli

EXPOSE 7001

# Define o comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
