FROM node:alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install && npm install typescript -g

COPY . .

RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist /var/www/html/
COPY .docker/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]