# Use a specific version of node that includes the latest npm
FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json ./

# Optionally update npm to ensure compatibility with newer package formats
RUN npm install

RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npx", "serve", "build"]
