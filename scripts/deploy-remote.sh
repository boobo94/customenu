#!/bin/bash

# verify ssh agent
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa

# get last updates
cd /root/digital-menu-app
git pull origin master

# install dependencies
npm i

# create build
npm run build:prod
# copy build in www folder
cp -r ./dist/* /var/www/digital-menu-app
