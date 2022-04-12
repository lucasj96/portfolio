FROM php:7.4-apache

ENV APACHE_DOCUMENT_ROOT /var/www/dokuwiki

WORKDIR /var/www/

ADD dokuwiki.tar.gz .

RUN apt-get update && apt-get install -y sendmail sudo && \
    sudo chown -R www-data:www-data ${APACHE_DOCUMENT_ROOT} && \
    sudo chmod -R 755 /var/www && \
    sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

EXPOSE 80/tcp
 