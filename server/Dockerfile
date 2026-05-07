FROM node:alpine
WORKDIR /usr/src/api
COPY package*.json ./
RUN yarn install
COPY . .
RUN npm run build
CMD ["npm", "start"]
