module.exports = {
  apps: [{
    name: 'Digital-Menu-WS',
    script: 'src/server.js',
    exec_interpreter: './node_modules/.bin/babel-node',
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: '',
    // instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    ignore_watch: [
      'node_modules',
    ],
    env: {
      NODE_ENV: 'development',

      // database
      DB_USERNAME: 'digital_menu_user',
      DB_PASSWORD: 'Hakj5KPs',
      DB_DATABASE: 'digital_menu_db',
      DB_HOST: '127.0.0.1',
      DB_DIALECT: 'postgres',

      APP_PORT: 8000,
      BCRYPT_SALT: 9,
      JWT_SECRET_KEY: 'qKNWpC5h',
    },
    env_production: {
      NODE_ENV: 'production',
      APP_PORT: 8005,

      DB_USERNAME: 'digital_menu_user',
      DB_PASSWORD: 'LqWgzS5L',
      DB_DATABASE: 'digital_menu_db',

      JWT_SECRET_KEY: 'qKNWpC5h',
    },
  }],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
