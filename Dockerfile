FROM node:9.10-alpine
COPY . /app

WORKDIR /app
RUN npm install --production  --registry=https://registry.npm.taobao.org
RUN npm install pm2 -g  --registry=https://registry.npm.taobao.org
RUN echo 'prod' > /config/env & npm run build
CMD pm2 start server/index.js --no-daemon
EXPOSE 3000
