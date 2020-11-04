#!/bin/bash

USER=root
HOST=000.000.000.0000

/usr/bin/ssh  $USER@$HOST bash /root/digital-menu-ws/scripts/deploy-remote.sh
