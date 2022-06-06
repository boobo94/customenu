import { Op } from 'sequelize';
// eslint-disable-next-line import/named
import { admin } from '../models';

/**
 * Find by id
 * @param {number} id
 */
export async function findOne(id) {
  return admin.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
}

/**
 * Find all
 */
export async function findAll() {
  return admin.findAll();
}

/**
 * Create
 * @param {object} subscription
 * @param {Sequelize.Transaction} transaction
 */
export async function create(subscription, transaction) {
  return admin.create(subscription, {
    transaction,
  });
}

/**
 * Update
 * @param {object} subscription
 * @param {number} id
 * @param {Sequelize.Transaction} transaction

 */
export async function update(subscription, id, transaction) {
  return admin.update(subscription, {
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    transaction,
  });
}

/**
  * Delete
  * @param {number} id
  * @param {Sequelize.Transaction} transaction
  */
export async function remove(id, transaction) {
  return admin.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    transaction,
  });
}
