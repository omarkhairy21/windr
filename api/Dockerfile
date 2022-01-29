FROM strapi/base:alpine

WORKDIR /strapi-windr-api

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./ ./

ENV NODE_ENV production

RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]