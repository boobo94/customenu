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

  async findByIdSimple(id) {
    return this.model.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
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
      include: [{
        model: this.modelI18n,
      }],
      transaction,
    });
  }

  /**
   * Create
   * @param {object} category
   * @param {*} transaction
   */
  async createI18n(category, transaction) {
    return this.modelI18n.create(category, {
      transaction,
    });
  }

  async updateI18n(categoryI18n, transaction) {
    return this.modelI18n.update(categoryI18n, {
      where: {
        id: {
          [Op.eq]: categoryI18n.id,
        },
      },
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
    if (category.category_i18ns) {
      for (let index = 0; index < category.category_i18ns.length; index++) {
        const categoryI18n = category.category_i18ns[index];

        if (categoryI18n.id) {
          await this.updateI18n(categoryI18n, transaction);
        } else {
          categoryI18n.categoryId = id;
          await this.createI18n(categoryI18n, transaction);
        }
      }
    }

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
