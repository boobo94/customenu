import { Op } from 'sequelize';

export default class Admin {
  constructor(connection) {
    this.model = connection.admin;
  }

  /**
   * Find by id
   * @param {number} id
   */
  async findOne(id) {
    return this.model.findOne({
      attributes: ['id', 'email', 'restaurantId', 'type', 'createdAt', 'updatedAt'],
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
  }

  /**
   * Find by email
   * @param {string} email
   */
  async findByEmail(email) {
    return this.model.findOne({
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
   * Find by refresh token
   * @param {string} refreshToken
   */
  findOneByRefreshToken(refreshToken) {
    return this.model.findOne({
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
  async findAll() {
    return this.model.findAll({
      attributes: ['id', 'email', 'createdAt', 'updatedAt'],
    });
  }

  /**
   * Create
   * @param {object} user
   * @param {Sequelize.Transaction} transaction
   */
  create(user, transaction) {
    return this.model.create(user, {
      transaction,
    });
  }

  /**
   * Update
   * @param {object} user
   * @param {number} id
   * @param {Sequelize.Transaction} transaction

   */
  async update(user, id, transaction) {
    return this.model.update(user, {
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
  delete(id, transaction) {
    return this.model.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      transaction,
    });
  }
}
