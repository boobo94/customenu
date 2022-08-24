#!/bin/bash

# git pull
git pull

# remove all stopped containers, networks not used by at least one container, dangling images, dangling build cache
docker system prune -f

# build docker
docker-compose --env-file .env -p customenu -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up --build -d --remove-orphans
