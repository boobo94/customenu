import dbConnection from './models/index';
import controllers from './controllers';

export const InitDB = () => {
  // sync database models
  dbConnection.sequelize
    .sync({
      force: false,
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('synced models');
    });
};

export const Controllers = controllers(dbConnection);
