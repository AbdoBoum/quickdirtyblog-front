# base image
FROM node:12.2.0-alpine

WORKDIR /app

COPY package.json /app/package.json
COPY . .
RUN yarn install --silent
RUN yarn add react-scripts@3.0.1 --silent

# start app
CMD ["yarn", "start"]
