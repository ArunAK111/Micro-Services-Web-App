FROM node:18-alpine
WORKDIR /uc1 
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
EXPOSE 5001
COPY index.js index.js
CMD [ "node","index.js" ]