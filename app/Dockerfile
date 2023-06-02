FROM node:18.16.0-alpine

#COPY package*.json /usr/src/front/

WORKDIR /var/www/app/

COPY . /var/www/app/

RUN npm install

#COPY . .

# construir aplicación para producción minificada
#RUN npm run build

EXPOSE 3000