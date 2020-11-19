import { Op } from 'sequelize';

export default class Product {
  constructor(connection) {
    this.model = connection.product;
    this.modelI18n = connection.product_i18n;
    this.modelSubcategory = connection.subcategory;
    this.modelCategory = connection.category;
    this.modelRestaurant = connection.restaurant;
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
   * Find all
   * @param {number} restaurantId
   * @param {string} language
   */
  async findAllOfRestaurants(restaurantId, language) {
    return this.model.findAll({
      include: [
        {
          model: this.modelSubcategory,
          include: [{
            model: this.modelCategory,
            where: {
              restaurantId: {
                [Op.eq]: restaurantId,
              },
            },
          }],
        },
        {
          model: this.modelI18n,
          where: {
            lang_code: {
              [Op.eq]: language,
            },
          },
        },
      ],
    });
  }

  /**
   * Find one by id and restaurant id
   * @param {number} id
   * @param {number} restaurantId
   * @param {string} language
   */
  async findOneOfRestaurantsById(id, restaurantId, language) {
    return this.model.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      include: [
        {
          model: this.modelSubcategory,
          include: [{
            model: this.modelCategory,
            where: {
              restaurantId: {
                [Op.eq]: restaurantId,
              },
            },
          }],
        },
        {
          model: this.modelI18n,
          where: {
            lang_code: {
              [Op.eq]: language,
            },
          },
        },
      ],
    });
  }

  /**
   * Find one by id and restaurant id simple
   * @param {number} id
   * @param {number} restaurantId
   * @param {string} language
   */
  async findOneOfRestaurantsByIdSimple(id, restaurantId) {
    return this.model.findOne({
      attributes: ['id'],
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      include: [
        {
          model: this.modelSubcategory,
          include: [{
            model: this.modelCategory,
            where: {
              restaurantId: {
                [Op.eq]: restaurantId,
              },
            },
          }],
        },
      ],
    });
  }

  /**
   * Create
   * @param {object} product
   * @param {*} transaction
   */
  async create(product, transaction) {
    return this.model.create(product, {
      include: [{
        model: this.modelI18n,
      }],
      transaction,
    });
  }

  /**
   * Create
   * @param {object} subcategory
   * @param {*} transaction
   */
  async createI18n(subcategory, transaction) {
    return this.modelI18n.create(subcategory, {
      transaction,
    });
  }

  async updateI18n(subcategoryI18n, transaction) {
    return this.modelI18n.update(subcategoryI18n, {
      where: {
        id: {
          [Op.eq]: subcategoryI18n.id,
        },
      },
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
    if (product.product_i18ns) {
      for (let index = 0; index < product.product_i18ns.length; index++) {
        const productI18n = product.product_i18ns[index];

        if (productI18n.id) {
          await this.updateI18n(productI18n, transaction);
        } else {
          productI18n.productId = id;
          await this.createI18n(productI18n, transaction);
        }
      }
    }

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
