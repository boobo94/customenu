import { Op } from 'sequelize';

export default class Restaurant {
  constructor(connection) {
    this.model = connection.restaurant;
    this.modelI18n = connection.restaurant_i18n;
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
   * Find app by id
   * @param {number} shortUrl The url of restaurant
   */
  async findByRestaurantAndToken(shortUrl) {
    return this.model.findOne({
      where: {
        shortUrl: {
          [Op.eq]: shortUrl,
        },
      },
    });
  }

  /**
   * Create
   * @param {object} restaurant
   * @param {*} transaction
   */
  async create(restaurant, transaction) {
    return this.model.create(restaurant, {
      transaction,
    });
  }

  /**
   * Update
   * @param {object} restaurant
   * @param {number} id
   * @param {Sequelize.Transaction} transaction
   */
  async update(restaurant, id, transaction) {
    return this.model.update(restaurant, {
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

  /**
   * Find logo
   * @param {number} id
   */
  async getMinimal(id) {
    return this.model.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      attributes: ['id', 'logo', 'shortUrl'],
    });
  }
}
