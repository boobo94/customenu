Customenu

# Production utils URLs

| Title               | URL                                     | Description                                                              |
| ------------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| Website             | https://customenu.net/                  | The main website.                                                        |
| Web App             | https://app.customenu.net/:custom-url   | The customenu mobile app.                                                |
| Admin               | https://admin.customenu.net             | The admin app where the customers manage their menu.                     |
| Proxy Manager Nginx | http://proxymanager.customenu.net/login | Used to manage subdomain, nginx configuration, redirects, 404 page, etc. |
| Portainer           | http://portainer.customenu.net/         | Manage docker containers, statistics, processes and usage.               |
| Linode Cloud        | https://www.linode.com/login            | The server and object storage is handled using Linode.                   |
| Hostico Host+Domain | https://hostico.ro/client/              | The host of the website, domain, email and cPanel.                       |     
| Instagram account   | https://www.instagram.com/customenu_net | The instagram profile.                                                   |
| Facebook account    | https://www.facebook.com/customenu      | The Facebook profile.                                                    |

# Setup or release the project

## Run localhost

```sh
docker-compose --env-file .env -p customenu -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up --build
```

## Deploy

```sh
ssh root@api.customenu.net
cd customenu/
sh bin/build.sh
```

## Setup production

Be sure you have an .env file.

```sh
cp .env.example .env
```

Now modify the env file content.

Once you finished with .env file, execute

```sh
sh bin/run-prod.sh
```

1. Setup portainer

Open localhost:9000 and pickup the username and password then press Create User.

2. Setup Nginx proxy manager

Open http://localhost:81 and login using the default credentials:
Email:    `admin@example.com`
Password: `changeme`

Then you have to enter the old password and set a new email and password.

For more instructions check the [official documentation](https://nginxproxymanager.com/setup/#running-the-app)

3. Run the seeds

```sh
cd api/src/database
npx sequelize db:seed:all --config=config/config.js
```

If you encounter issues with the current docker compose, I prepared a script to force rebuild with no cache

```sh
sh bin/force-rebuild-docker.sh
```

4. Configure the backup scripts

Install [linodecli](https://www.linode.com/docs/products/storage/object-storage/guides/linode-cli#install-and-configure-the-cli) and configure the server.

Setup the cronjob

```sh
crontab -e
```

add at the end of the file

```sh
0 2 * * * /bin/bash /root/customenu/bin/db-backup.sh
```
