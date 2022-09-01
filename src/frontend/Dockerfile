# syntax=docker/dockerfile:1
FROM node:16
WORKDIR /huimitu/front
COPY . .
RUN npm i --force
CMD ["npm", "start"]
EXPOSE 3000