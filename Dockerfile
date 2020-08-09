FROM ubuntu:18.04

ENV version 2.0.0

RUN apt update && apt install ca-certificates -y

COPY ./sources.list /etc/apt/sources.list

RUN cat /etc/apt/sources.list
RUN rm -rf /var/lib/apt/lists/*

RUN apt-get update

RUN apt-get install nginx openjdk-8-jdk postgresql -y


RUN mkdir -p /app

COPY ./frontend/build/* /app/dist

COPY ./backend/target/pancake-${version}.jar /app/pancake.jar

COPY ./nginx.conf /etc/nginx/nginx.conf


WORKDIR /app

CMD ["sh","-c", "service postgresql restart && service nginx restart && java -jar pancake.jar"]