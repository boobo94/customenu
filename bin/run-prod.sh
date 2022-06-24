#!/bin/bash

# Load .env
if [ -f .env ]; then
    # Load Environment Variables
    source .env
fi

# create id_rsa file
if [ "$SSH_KEY" ]; then
echo "$SSH_KEY" > id_rsa_customenu
fi

# git clone
git clone git@github.com:boobo94/customenu.git --config core.sshCommand="ssh -i id_rsa_customenu"

# build docker
docker-compose --env-file .env -p customenu -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up --build -d --remove-orphans
