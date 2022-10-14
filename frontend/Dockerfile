FROM node:14.17.3
WORKDIR /front
COPY package.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]