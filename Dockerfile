FROM python:alpine3.7
MAINTAINER Miguel Montañez <cmiguelmg@gmail.com>

RUN apk update && apk add ca-certificates && update-ca-certificates
RUN apk add --no-cache nodejs
RUN apk add --no-cache mariadb-dev g++

WORKDIR /app/frontend

ADD frontend/ /app/frontend/
ADD backend/ /app/backend/

RUN npm install
RUN npm run build

WORKDIR /app/backend
RUN pip install --no-cache-dir -r requirements.txt

RUN apk del nodejs g++ mariadb-dev && \
    apk add --no-cache mariadb-client-libs

EXPOSE 8080
CMD sh start_app.sh
