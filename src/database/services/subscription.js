/* eslint-disable import/named */
import { Op } from 'sequelize';
import {
  admin,
  subscription,
  restaurant,
  subscriptionPlan,
} from '../models';

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

export async function findActiveByRestaurant(restaurantId) {
  return subscription.findOne({
    where: {
      restaurantId: {
        [Op.eq]: restaurantId,
      },
      startDate: {
        [Op.lte]: new Date(),
      },
      endDate: {
        [Op.gte]: new Date(),
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
      model: restaurant,
    }],
  });
}

export async function findeByReference(referenceId) {
  return subscription.findOne({
    where: {
      referenceId: {
        [Op.eq]: referenceId,
      },
    },
    include: [{
      model: subscriptionPlan,
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
 * Update
 * @param {object} subscription
 * @param {number} id
 * @param {Sequelize.Transaction} transaction

 */
export async function updateByreference(obj, referenceId, transaction) {
  return subscription.update(obj, {
    where: {
      referenceId: {
        [Op.eq]: referenceId,
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
