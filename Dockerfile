FROM python:alpine3.7
MAINTAINER Miguel Montañez <cmiguelmg@gmail.com>

RUN apk update && apk add ca-certificates && update-ca-certificates
RUN apk add --no-cache nodejs tzdata
RUN apk add --no-cache mariadb-dev g++

RUN cp /usr/share/zoneinfo/America/Bogota /etc/localtime
RUN echo "America/Bogota" > /etc/timezone

WORKDIR /app/frontend

ADD frontend/ /app/frontend/

RUN npm install
RUN npm run build

ADD backend/ /app/backend/

WORKDIR /app/backend
RUN pip install --no-cache-dir -r requirements.txt

RUN apk del nodejs g++ mariadb-dev && \
    apk add --no-cache mariadb-client-libs

EXPOSE 8080
CMD sh start_app.sh
