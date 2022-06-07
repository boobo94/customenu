import { Op } from 'sequelize';
// eslint-disable-next-line import/named
import { admin, subscription, restaurant } from '../models';

/**
 * Find by id
 * @param {number} id
 */
export async function findOne(id) {
  return subscription.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
}

export async function findOneWithDetails(id) {
  return subscription.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    include: [{
      model: admin,
      include: [{
        model: restaurant,
      }],
    }],
  });
}

/**
 * Find all
 */
export async function findAll() {
  return subscription.findAll();
}

/**
 * Create
 * @param {object} subscription
 * @param {Sequelize.Transaction} transaction
 */
export async function create(obj, transaction) {
  return subscription.create(obj, {
    transaction,
  });
}

/**
 * Update
 * @param {object} subscription
 * @param {number} id
 * @param {Sequelize.Transaction} transaction

 */
export async function update(obj, id, transaction) {
  return subscription.update(obj, {
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
  return subscription.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    transaction,
  });
}
