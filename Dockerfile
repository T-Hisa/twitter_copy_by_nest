FROM node:12.16.1

COPY . /twitter_like_app
WORKDIR /twitter_like_app
RUN yarn install && npm rebuild node-sass
CMD yarn start:dev