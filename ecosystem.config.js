module.exports = {
  apps: [{
    name: 'Customenu-WS',
    script: 'src/server.js',
    exec_interpreter: './node_modules/.bin/babel-node',
    node_args : '-r dotenv/config',
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: '',
    // instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    ignore_watch: [
      'node_modules',
      '.git',
    ],
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',

    },
  }],
};
