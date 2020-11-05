import { Op } from 'sequelize';

export default class Product {
  constructor(connection) {
    this.model = connection.product;
    this.modelI18n = connection.product_i18n;
  }

  /**
   * Find by id
   * @param {number} id
   */
  async findById(id, language) {
    return this.model.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      include: [{
        model: this.modelI18n,
        where: {
          lang_code: {
            [Op.eq]: language,
          },
        },
      }],
    });
  }

  /**
   * Find all
   * @param {number} subcategoryId
   * @param {string} language
   */
  async findAll(subcategoryId, language) {
    return this.model.findAll({
      where: {
        subcategoryId: {
          [Op.eq]: subcategoryId,
        },
      },
      include: [{
        model: this.modelI18n,
        where: {
          lang_code: {
            [Op.eq]: language,
          },
        },
      }],
    });
  }

  /**
   * Create
   * @param {object} product
   * @param {*} transaction
   */
  async create(product, transaction) {
    return this.model.create(product, {
      transaction,
    });
  }

  /**
   * Update
   * @param {object} product
   * @param {number} id
   * @param {Sequelize.Transaction} transaction
   */
  async update(product, id, transaction) {
    return this.model.update(product, {
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
