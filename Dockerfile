FROM node:10.13-alpine

ENV NODE_ENV production
ENV PORT 8080

WORKDIR /home/user/roundtableai/dicomviewer
COPY ["package.json", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install pm2 -g

COPY . .
COPY dockersupport/app.json .
EXPOSE 8080

CMD ["pm2-runtime", "app.json"]
