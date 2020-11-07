ARG UBUNTU_VERSION=20.04
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

WORKDIR /app

RUN chmod 755 server/pancake

CMD ["sh","-c", "service nginx restart && server/pancake --conf=server/conf/pancake.toml --port=8080"]

