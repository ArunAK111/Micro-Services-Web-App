FROM node:18-alpine
WORKDIR /uc3
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
EXPOSE 5003
COPY index.js index.js
CMD [ "node","index.js" ]