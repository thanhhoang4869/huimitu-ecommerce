# syntax=docker/dockerfile:1
FROM node:16
WORKDIR /app
COPY . .
RUN npm i --force
CMD ["npm", "start"]
EXPOSE 3001