FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
EXPOSE 5000
CMD [ "npm", "run", "dev" ]