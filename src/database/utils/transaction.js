import { sequelize } from '../models/index';

/**
 * Creates a transaction
 * @param {Sequelize} connection Squelize connection
 * @returns promise
 */
// eslint-disable-next-line import/prefer-default-export
export async function transaction() {
  return sequelize.transaction({
    autocommit: false,
  });
}
