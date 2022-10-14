FROM node:14.17.3
WORKDIR /api-gateway
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]