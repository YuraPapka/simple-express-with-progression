FROM node:16

WORKDIR /app

COPY ./package.json .
RUN yarn cache clean --all
RUN yarn
COPY . .

RUN yarn prisma:gen
RUN yarn build

EXPOSE 3000

# CMD npm start
CMD [ "yarn", "start:prod" ]