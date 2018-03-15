# Setup

```docker-compose up```

## Seed DB

First, list docker processes `docker ps` and pick up the postgres docker id

Secundly, you can use this ID to access postgres container bash commands :

```shell

docker exec -ti <Postgres DOCKER_ID>

```

Thirdly and last, execute setup.sql

```shell

psql -U username -d myDataBase -a -f setup.sql

```

## install

```shell

cd app
npm install

```

## start

(in app folder)

`npm start`