

# Inital SETUP of server

Modify & Move new `.pgpass` file in the root folder

```sh
$ vi .pgpass
```

Move file to `/root/pg_backup.sh` and paste the content and Change permissions

```sh
$ chmod 700 /root/pg_backup.sh
```

Add new cron

```sh
$ crontab -e
```

Add at the end of the file the content:

```sh
0 0 * * * /root/pg_backup.sh
```

# Database

## Seeders

Example

```sh
cd src/database
DB_USERNAME='customenu_user' \
DB_PASSWORD='pass' \
DB_DATABASE='customenu_db' \
DB_HOST='127.0.0.1' \
DB_DIALECT='postgres' \
npx sequelize db:seed:all
```


## Stripe

Integrate subscriptions: https://stripe.com/docs/billing/quickstart

Testing cards: https://stripe.com/docs/testing#cards
