#!/bin/bash

docker-compose --env-file .env -p customenu -f docker/docker-compose.yml -f docker/docker-compose.prod.yml --build --no-cache
docker-compose --env-file .env -p customenu -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up --remove-orphans