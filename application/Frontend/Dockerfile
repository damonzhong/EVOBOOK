FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts

COPY . .
EXPOSE 80

CMD ["npm", "run", "build"]
CMD [ "node", "server.js" ]