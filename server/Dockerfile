FROM node:16-alpine

WORKDIR /usr/src/chat-app-api

COPY package.json .

RUN npm install 

COPY . .

CMD ["/bin/bash"]