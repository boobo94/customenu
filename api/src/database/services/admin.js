import { Op } from 'sequelize';
// eslint-disable-next-line import/named
import { admin } from '../models';

/**
 * Find by id
 * @param {number} id
 */
export async function findOne(id) {
  return admin.findOne({
    attributes: ['id', 'email', 'restaurantId', 'type', 'createdAt', 'updatedAt'],
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
}

export async function findActiveByEmail(email) {
  return admin.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
      isActive: {
        [Op.eq]: true,
      },
    },
  });
}

/**
 * Find by email
 * @param {string} email
 */
export async function findByEmail(email) {
  return admin.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });
}

/**
 * Find by refresh token
 * @param {string} refreshToken
 */
export async function findOneByRefreshToken(refreshToken) {
  return admin.findOne({
    where: {
      refreshToken: {
        [Op.eq]: refreshToken,
      },
    },
  });
}

/**
 * Find all
 */
export async function findAll() {
  return admin.findAll({
    attributes: ['id', 'email', 'createdAt', 'updatedAt'],
  });
}

/**
 * Create
 * @param {object} user
 * @param {Sequelize.Transaction} transaction
 */
export async function create(user, transaction) {
  return admin.create(user, {
    transaction,
  });
}

/**
 * Update
 * @param {object} user
 * @param {number} id
 * @param {Sequelize.Transaction} transaction

 */
export async function update(user, id, transaction) {
  return admin.update(user, {
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
