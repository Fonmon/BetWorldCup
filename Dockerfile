FROM python:alpine3.7
MAINTAINER Miguel Montañez <cmiguelmg@gmail.com>

RUN apk update
RUN apk add nodejs
RUN apk add nginx mariadb-dev build-base mariadb-client-libs

WORKDIR /app

ADD frontend/ /app/frontend/
ADD backend/ /app/backend/
ADD nginx.conf /etc/nginx/nginx.con

WORKDIR /app/backend
RUN mkdir -p assets/bundles

WORKDIR /app/frontend
RUN npm install && npm run build

WORKDIR /app/backend
RUN pip install -r requirements.txt

ADD start_app.sh /app/backend/start_app.sh

EXPOSE 80 443
CMD sh start_app.sh ; nginx -g 'daemon off;'