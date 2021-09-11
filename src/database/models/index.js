import Sequelize from 'sequelize';
import path from 'path';
import fs from 'fs';
import config from '../config/config';

const db = {};

const sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  config,
);

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file)).default(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
