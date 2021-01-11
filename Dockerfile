ARG UBUNTU_VERSION=18.04
FROM ubuntu:${UBUNTU_VERSION}
ENV GIN_MODE release

RUN apt update && apt install ca-certificates -y

COPY ./deploy/dependencies/sources.list /etc/apt/sources.list

RUN cat /etc/apt/sources.list
RUN rm -rf /var/lib/apt/lists/*

RUN apt-get update

RUN apt-get install nginx -y


RUN mkdir -p /app

COPY ./deploy/app /app/

COPY ./deploy/dependencies/nginx/nginx.conf /etc/nginx/nginx.conf
COPY deploy/dependencies/nginx/sites-enabled/app.conf /etc/nginx/sites-enabled/app.conf

ARG ldc=pancake
ENV ldc=$ldc


RUN ls -l /app
WORKDIR /app

RUN chmod 755 server/app

CMD ["sh","-c", "service nginx restart && server/app --conf=server/conf/${ldc}.toml"]

