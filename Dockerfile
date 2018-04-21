FROM python:alpine3.7
MAINTAINER Miguel Montañez <cmiguelmg@gmail.com>

RUN apk update && apk add ca-certificates && update-ca-certificates
RUN apk add --no-cache nodejs
RUN apk add mariadb-dev build-base mariadb-client-libs

WORKDIR /app/frontend

ADD frontend/ /app/frontend/
RUN npm install

ADD backend/ /app/backend/

RUN npm run build

WORKDIR /app/backend
RUN pip install -r requirements.txt

EXPOSE 8080
CMD sh start_app.sh
