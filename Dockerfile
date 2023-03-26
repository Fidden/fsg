FROM php:8.1-fpm

WORKDIR /var/www/html

COPY ./apps/backend .

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

RUN composer install --no-interaction --no-plugins --no-scripts

RUN chown -R www-data:www-data /var/www/html/storage

EXPOSE 9000
CMD ["php-fpm"]