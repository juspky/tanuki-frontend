FROM node:15
EXPOSE 3000

COPY . /app
WORKDIR /app
RUN yarn

CMD yarn build && yarn start