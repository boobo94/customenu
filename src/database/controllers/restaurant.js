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
   * Find by id with i18n
   * @param {number} id
   */
  async findByIdWithI18n(id) {
    return this.model.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      include: [{
        model: this.modelI18n,
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
   * Get languages of restaurant
   * @param {number} id
   */
  async getLanguages(id) {
    return this.model.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      attributes: ['languages'],
    });
  }

  /**
   * Create
   * @param {object} restaurant
   * @param {*} transaction
   */
  async create(restaurant, transaction) {
    return this.model.create(restaurant, {
      include: [{
        model: this.modelI18n,
      }],
      transaction,
    });
  }

  /**
   * Create
   * @param {object} entry
   * @param {*} transaction
   */
  async createI18n(entry, transaction) {
    return this.modelI18n.create(entry, {
      transaction,
    });
  }

  async updateI18n(entry18n, transaction) {
    return this.modelI18n.update(entry18n, {
      where: {
        id: {
          [Op.eq]: entry18n.id,
        },
      },
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
    if (restaurant.restaurant_i18ns) {
      for (let index = 0; index < restaurant.restaurant_i18ns.length; index++) {
        const restaurantI18n = restaurant.restaurant_i18ns[index];

        if (restaurantI18n.id) {
          await this.updateI18n(restaurantI18n, transaction);
        } else {
          restaurantI18n.restaurantId = id;
          await this.createI18n(restaurantI18n, transaction);
        }
      }
    }

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
