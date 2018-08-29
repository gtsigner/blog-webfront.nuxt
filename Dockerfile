FROM node:9.10-alpine
COPY . /app

WORKDIR /app
RUN npm install  --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ --registry=https://registry.npm.taobao.org
RUN npm install pm2 -g  --registry=https://registry.npm.taobao.org
RUN echo 'prod' > /config/env & npm run build
CMD pm2 start server/index.js --no-daemon
EXPOSE 3000
