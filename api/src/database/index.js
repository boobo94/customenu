import { sequelize } from './models/index';

// eslint-disable-next-line import/prefer-default-export
export const InitDB = async () => {
  try {
    // sync database models

    await sequelize
      .sync({
        force: false,
      });

    // eslint-disable-next-line no-console
    console.log('Database Connection has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
};
