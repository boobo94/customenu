Customenu

![meniu-digital-customenu-thumb](https://github.com/boobo94/customenu/assets/16722674/a76d73cd-432f-42ad-bf2e-b6a4fe3fab73)


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

# Setup and release the project

## Run the localhost orchestration

Start databse within docker, don't worry data is persistent.

```sh
docker-compose --env-file .env -p customenu -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up --build
```

Start api

```sh
cd api
npm i
npm start
```

Start app

```sh
cd app
npm i
npm run serve
```

Start admin

```sh
cd admin
npm i
npm run serve
```


## Deploy

```sh
ssh root@api.customenu.net<<'EOL'
cd customenu/ && \
sh bin/build.sh
exit
EOL
```

## Initial setup the production server

### 1. Be sure you have an .env file.

```sh
cp .env.example .env
```

Now modify the env file content.

Once you finished with .env file, execute

```sh
sh bin/run-prod.sh
```

### 2. Setup portainer

Open localhost:9000 and pickup the username and password then press Create User.

### 3. Setup Nginx proxy manager

Open http://localhost:81 and login using the default credentials:

Email:    `admin@example.com`

Password: `changeme`

Then you have to enter the old password and set a new email and password.

For more instructions check the [official documentation](https://nginxproxymanager.com/setup/#running-the-app)

### 4. Run the seeds

```sh
cd api/src/database
npx sequelize db:seed:all --config=config/config.js
```

If you encounter issues with the current docker compose, I prepared a script to force rebuild with no cache

```sh
sh bin/force-rebuild-docker.sh
```

### 5. Configure the backup scripts

Install [linodecli](https://www.linode.com/docs/products/storage/object-storage/guides/linode-cli#install-and-configure-the-cli) and configure the server.

Setup the cronjob

```sh
crontab -e
```

by adding at the end of the file this:

```sh
0 2 * * * /bin/bash /root/customenu/bin/db-backup.sh
```

This will run the script every day at 02:00 UTC.

## Utils

### Clean docker containers, images etc

Remove all stopped containers, networks not used by at least one container, dangling images, dangling build cache

```sh
docker system prune
```

![1-meniu-home-473x1024](https://github.com/boobo94/customenu/assets/16722674/f1d203d5-aebc-4f1b-a13c-ec9730a81920)
![2-menu-change-the-language-473x1024](https://github.com/boobo94/customenu/assets/16722674/59d014b5-881b-443d-86d7-a3dc52464bd0)
![3-menu-about-restaurant-473x1024](https://github.com/boobo94/customenu/assets/16722674/3eebdc72-c602-4593-9afd-6bb88439d479)
![4-products-of-menu-473x1024](https://github.com/boobo94/customenu/assets/16722674/056a1583-fc6d-4349-b187-ba6b8ca04159)
![5-menu-search-product-473x1024](https://github.com/boobo94/customenu/assets/16722674/7c61cab2-589c-4860-bbf2-1a4a7c563724)
![6-menu-shopping-cart-473x1024](https://github.com/boobo94/customenu/assets/16722674/74b61d73-5d1e-49f9-8de6-d5c87eed1a0f)
