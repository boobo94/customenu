import { Op } from 'sequelize';
// eslint-disable-next-line import/named
import { subscriptionPlan } from '../models';

/**
 * Find by id
 * @param {number} id
 */
export async function findOne(id) {
  return subscriptionPlan.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
}

export async function findeByreference(referenceId) {
  return subscriptionPlan.findOne({
    where: {
      referenceId: {
        [Op.eq]: referenceId,
      },
    },
  });
}

/**
 * Find all
 */
export async function findAll() {
  return subscriptionPlan.findAll();
}

/**
 * Create
 * @param {object} subscription
 * @param {Sequelize.Transaction} transaction
 */
export async function create(subscription, transaction) {
  return subscriptionPlan.create(subscription, {
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
  return subscriptionPlan.update(subscription, {
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
  return subscriptionPlan.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    transaction,
  });
}
