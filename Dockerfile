FROM python:alpine3.7
MAINTAINER Miguel Montañez <cmiguelmg@gmail.com>

RUN apk update
RUN apk add nodejs
RUN apk add mariadb-dev build-base mariadb-client-libs

WORKDIR /app

ADD frontend/ /app/frontend/
ADD backend/ /app/backend/

WORKDIR /app/frontend
RUN npm install && npm run build

WORKDIR /app/backend
RUN pip install -r requirements.txt

ADD start_app.sh /app/backend/start_app.sh

EXPOSE 8080
CMD sh start_app.sh