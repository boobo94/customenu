#!/bin/bash

# inject a datestamp arg which is treated as an environment variable and
# will break the cache for the RUN command
export DATE_STAMP=$(date +%Y%m%d-%H%M%S)

docker-compose --env-file .env -p customenu -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up --build -d --remove-orphans #--build-arg DATE_STAMP=$DATE_STAMP #--no-cache
# docker-compose --env-file .env -p customenu -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up -d --remove-orphans