FROM node:18 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage  /app/dist /usr/share/nginx/html
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]