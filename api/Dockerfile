FROM php:8.1-fpm-alpine

#COPY composer*.json /var/www/api/

COPY . /var/www/api/

WORKDIR /var/www/api/

RUN apk update && apk upgrade

RUN apk add --update --no-cache \ 
    git \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    python3 \
    py3-pip \
    curl \
    libmemcached-dev \
    zlib-dev \
    autoconf \
    g++ \
    make


#COPY ./package*.json /var/www/api
#COPY ./composer*.json /var/www/api

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql zip exif pcntl gd
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

RUN composer install --no-ansi --no-interaction --no-progress --optimize-autoloader --no-scripts

#COPY . .

RUN php artisan config:cache

EXPOSE 9000