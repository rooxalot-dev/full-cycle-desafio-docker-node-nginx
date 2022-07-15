FROM node:16

ENV APP_PORT 3333
ENV DOCKERIZE_VERSION v0.6.1
EXPOSE 3333

RUN mkdir -p /usr/app/node/
COPY . /usr/app/node
WORKDIR /usr/app/node

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

