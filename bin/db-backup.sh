#!/bin/bash

# Read .env file

ENV_FILE=$HOME/customenu/.env
if [ -f $ENV_FILE ]; then
    export $(cat $ENV_FILE | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi

# Create the backup file

FILENAME="./dump_$(date +"%Y-%m-%d_%H_%M_%S").gz"
docker exec -t customenu-database pg_dumpall -c -U $DB_USERNAME | gzip > $FILENAME

# Upload backup file

linode-cli obj put $FILENAME $LINODE_OBJECT_BUCKET --cluster=$LINODE_OBJECT_STORAGE_REGION

# Delete backup file

rm -rf $FILENAME