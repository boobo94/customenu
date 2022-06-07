import { Op } from 'sequelize';
// eslint-disable-next-line import/named
import { payment } from '../models';

/**
 * Find by id
 * @param {number} id
 */
export async function findOne(id) {
  return payment.findOne({
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
export async function findAll(restaurantId) {
  return payment.findAll({
    where: {
      restaurantId: {
        [Op.eq]: restaurantId,
      },
    },
  });
}

/**
 * Create
 * @param {object} object
 * @param {Sequelize.Transaction} transaction
 */
export async function create(object, transaction) {
  return payment.create(object, {
    transaction,
  });
}

/**
 * Update
 * @param {object} object
 * @param {number} id
 * @param {Sequelize.Transaction} transaction

 */
export async function update(object, id, transaction) {
  return payment.update(object, {
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
  return payment.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    transaction,
  });
}
