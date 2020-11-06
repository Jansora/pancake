ARG UBUNTU_VERSION=18.04
FROM ubuntu:${UBUNTU_VERSION}

ENV version 1.0.0

RUN apt update && apt install ca-certificates -y

COPY ./deploy/dependencies/sources.list /etc/apt/sources.list

RUN cat /etc/apt/sources.list
RUN rm -rf /var/lib/apt/lists/*

RUN apt-get update

RUN apt-get install nginx openjdk-8-jdk -y


RUN mkdir -p /app

COPY ./backend/target /app/server

COPY ./backend/target/application-${version}.jar /app/server/app-spring-boot-server.jar

COPY ./deploy/dependencies/nginx.conf /etc/nginx/nginx.conf


WORKDIR /app

CMD ["sh","-c", "service nginx restart && java -Dspring.profiles.active=prod -jar server/app-spring-boot-server.jar"]

