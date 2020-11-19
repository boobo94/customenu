import { Op } from 'sequelize';

export default class Subcategory {
  constructor(connection) {
    this.model = connection.subcategory;
    this.modelI18n = connection.subcategory_i18n;
    this.categoryModel = connection.category;
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

  async findByIdAndCategory(id, categoryId, language) {
    return this.model.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
        categoryId: {
          [Op.eq]: categoryId,
        },
      },
      include: [
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

  async findByIdAndCategorySimple(id, categoryId) {
    return this.model.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
        categoryId: {
          [Op.eq]: categoryId,
        },
      },
    });
  }

  /**
   * Find all
   * @param {number} categoryId
   * @param {string} language
   */
  async findAll(categoryId, language) {
    return this.model.findAll({
      where: {
        categoryId: {
          [Op.eq]: categoryId,
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
      order: [
        ['id', 'ASC'],
      ],
    });
  }

  async findByIdWithCategoryAndRestaurant(id, categoryId, language) {
    return this.model.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      include: [
        {
          model: this.modelI18n,
          where: {
            lang_code: {
              [Op.eq]: language,
            },
          },
        },
        {
          model: this.categoryModel,
          where: {
            id: {
              [Op.eq]: categoryId,
            },
          },
        },
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
   * @param {object} subcategory
   * @param {number} id
   * @param {Sequelize.Transaction} transaction
   */
  async update(subcategory, id, transaction) {
    if (subcategory.subcategory_i18ns) {
      for (let index = 0; index < subcategory.subcategory_i18ns.length; index++) {
        const subcategoryI18n = subcategory.subcategory_i18ns[index];

        if (subcategoryI18n.id) {
          await this.updateI18n(subcategoryI18n, transaction);
        } else {
          subcategoryI18n.subcategoryId = id;
          await this.createI18n(subcategoryI18n, transaction);
        }
      }
    }

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
