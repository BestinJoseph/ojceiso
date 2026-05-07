FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
COPY ../public .
RUN yarn run build

#Step 2: Serve the app using nginx
FROM nginx:alpine as prod

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/public /usr/share/nginx/html

EXPOSE 80/tcp

CMD [ "/usr/sbin/nginx", "-g", "daemon off;" ]
