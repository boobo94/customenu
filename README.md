

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