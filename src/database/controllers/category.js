import { Op } from 'sequelize';

export default class Category {
  constructor(connection) {
    this.model = connection.category;
    this.modelI18n = connection.category_i18n;
  }

  /**
   * Find by id
   * @param {number} id
   */
  async findById(id) {
    return this.model.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
  }

  /**
   * Find all
   * @param {number} restaurantId
   */
  async findAll(restaurantId) {
    return this.model.findAll({
      where: {
        restaurantId: {
          [Op.eq]: restaurantId,
        },
      },
      order: [
        ['id', 'ASC'],
      ],
    });
  }

  /**
   * Create
   * @param {object} category
   * @param {*} transaction
   */
  async create(category, transaction) {
    return this.model.create(category, {
      transaction,
    });
  }

  /**
   * Update
   * @param {object} category
   * @param {number} id
   * @param {Sequelize.Transaction} transaction
   */
  async update(category, id, transaction) {
    return this.model.update(category, {
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
  async delete(id, transaction) {
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
