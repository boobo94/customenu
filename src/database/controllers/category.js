import { Op } from 'sequelize';

export default class Category {
  constructor(connection) {
    this.model = connection.category;
    this.modelI18n = connection.category_i18n;
  }

  /**
   * Find by id
   * @param {number} id
   * @param {string} language
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
   * Find by id and restaurant
   * @param {number} id
   * @param {number} restaurantId
   */
  async findByIdAndRestaurantId(id, restaurantId) {
    return this.model.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
        restaurantId: {
          [Op.eq]: restaurantId,
        },
      },
    });
  }

  /**
   * Find all
   * @param {number} restaurantId
   * @param {string} language
   */
  async findAll(restaurantId, language) {
    return this.model.findAll({
      where: {
        restaurantId: {
          [Op.eq]: restaurantId,
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
