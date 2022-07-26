FROM node:18.6.0

WORKDIR /usr/app

COPY package*json ./
RUN npm install

COPY . .

EXPOSE 8099

CMD ["npm", "start"]

