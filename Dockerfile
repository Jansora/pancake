ARG  UBUNTU_VERSION=18.04
FROM ubuntu:${UBUNTU_VERSION}

WORKDIR /app
#CMD ["apt", "update"]
RUN apt update && apt install postgresql -y && apt install vim -y



