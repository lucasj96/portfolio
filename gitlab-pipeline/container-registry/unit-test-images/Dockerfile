FROM ubuntu:20.04
# PHP package in apt uses tzdata and requires input during installation
# Setting these env variables, and creating a link eliminates need for manual input
ENV TZ=Europe/Stockholm
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update
RUN apt-get install php7.4 -y
RUN apt-get install phpunit -y