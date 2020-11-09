#!/bin/bash

USER=root
HOST=DNS_OR_IP

/usr/bin/ssh  $USER@$HOST bash /root/digital-menu-app/scripts/deploy-remote.sh
