import { Op } from 'sequelize';

export default class Subcategory {
  constructor(connection) {
    this.model = connection.subcategory;
    this.modelI18n = connection.subcategory_i18n;
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
   * @param {number} categoryId
   */
  async findAll(categoryId) {
    return this.model.findAll({
      where: {
        categoryId: {
          [Op.eq]: categoryId,
        },
      },
      order: [
        ['id', 'ASC'],
      ],
    });
  }

  /**
   * Create
   * @param {object} subcategory
   * @param {*} transaction
   */
  async create(subcategory, transaction) {
    return this.model.create(subcategory, {
      transaction,
    });
  }

  /**
   * Update
   * @param {object} subcategory
   * @param {number} id
   * @param {Sequelize.Transaction} transaction
   */
  async update(subcategory, id, transaction) {
    return this.model.update(subcategory, {
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
