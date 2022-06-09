/* eslint-disable import/named */
import { Op } from 'sequelize';
import {
  payment,
  restaurant,
  subscription,
  subscriptionPlan,
} from '../models';
import { PAYMENT_STATUS } from '../models/payment';

export async function findOneByRestaurant(id, restaurantId) {
  return payment.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
      restaurantId: {
        [Op.eq]: restaurantId,
      },
    },
    include: [
      {
        model: restaurant,
      },
      {
        model: subscription,
        include: [{
          model: subscriptionPlan,
        }],
      },
    ],
  });
}

export async function findeByReference(referenceId) {
  return payment.findOne({
    where: {
      referenceId: {
        [Op.eq]: referenceId,
      },
    },
  });
}

export async function findLastInvoice(transaction) {
  return payment.findOne({
    where: {
      status: {
        [Op.eq]: PAYMENT_STATUS.paid,
      },
      invoiceNumber: {
        [Op.not]: null,
      },
    },
    order: [
      ['invoiceNumber', 'DESC'],
    ],
  }, {
    transaction,
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
