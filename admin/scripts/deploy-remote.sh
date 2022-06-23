#!/bin/bash

# verify ssh agent
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa

# get last updates
cd /root/digital-menu-admin
git reset --hard origin/main
git pull origin main

# install dependencies
npm i

# create build
npm run build
# copy build in www folder
cp -r ./dist/* /var/www/digital-menu-admin