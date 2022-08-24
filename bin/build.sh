#!/bin/bash

# git pull
git pull

# build docker
docker-compose --env-file .env -p customenu -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up --build -d --remove-orphans
