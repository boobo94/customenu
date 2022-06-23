Customenu

# Setup or release the project

## Run localhost

```sh
docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml --env-file .env up 
```



# Setup production

Execute

```sh
docker-compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml --env-file .env up 
```

1. Setup portainer

Open localhost:9000 and pickup the username and password then press Create User.