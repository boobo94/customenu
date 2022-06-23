Customenu

# Setup or release the project

## Run localhost

```sh
docker-compose -p customenu -f docker/docker-compose.yml -f docker/docker-compose.dev.yml --env-file .env up 
```



# Setup production

Execute

```sh
docker-compose -p customenu -f docker/docker-compose.yml -f docker/docker-compose.prod.yml --env-file .env up 
```

1. Setup portainer

Open localhost:9000 and pickup the username and password then press Create User.

2. Setup Nginx proxy manager

Open http://localhost:81 and login using the default credentials:
Email:    `admin@example.com``
Password: `changeme`

Then you have to enter the old password and set a new email and password.

For more instructions check the [official documentation](https://nginxproxymanager.com/setup/#running-the-app)

3. Run the seeds

```sh
cd api/src/database
npx sequelize db:seed:all --config=config/config.js
```
