#!/bin/bash

# verify ssh agent
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa

# get last updates
cd /root/digital-menu-ws
git reset --hard origin/master
git pull origin master

npm i

pm2 delete Digital-Menu-WS
pm2 start --env production
