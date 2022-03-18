FROM node:latest

WORKDIR /mymoney/

COPY package.json package-lock.json /mymoney/

RUN npm ci --silent

COPY . .

USER node

CMD npm run dev
