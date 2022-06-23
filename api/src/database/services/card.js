import { Op } from 'sequelize';
// eslint-disable-next-line import/named
import { card } from '../models';

/**
 * Find by id
 * @param {number} id
 */
export async function findOne(id) {
  return card.findOne({
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
  return card.findAll();
}

/**
 * Create
 * @param {object} object
 * @param {Sequelize.Transaction} transaction
 */
export async function create(object, transaction) {
  return card.create(object, {
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
  return card.update(object, {
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
  return card.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    transaction,
  });
}
