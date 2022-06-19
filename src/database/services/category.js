import { Op } from 'sequelize';
// eslint-disable-next-line import/named, camelcase
import { category, category_i18n } from '../models';

/**
 * Find by id with i18n
 * @param {number} id
 */
export async function findByIdWithI18n(id) {
  return category.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    include: [{
      model: category_i18n,
    }],
  });
}

/**
 * Find by id
 * @param {number} id
 * @param {string} language
 */
export async function findById(id, language) {
  return category.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    include: [{
      model: category_i18n,
      where: {
        lang_code: {
          [Op.eq]: language,
        },
      },
    }],
  });
}

export async function findByIdSimple(id) {
  return category.findOne({
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
export async function findByIdAndRestaurantId(id, restaurantId) {
  return category.findOne({
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

export async function countCategoriesOfRestaurant(restaurantId) {
  return category.count({
    where: {
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
export async function findAll(restaurantId, language) {
  return category.findAll({
    where: {
      restaurantId: {
        [Op.eq]: restaurantId,
      },
    },
    include: [{
      model: category_i18n,
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

/**
 * Create
 * @param {object} category
 * @param {*} transaction
 */
export async function create(categoryObj, transaction) {
  return category.create(categoryObj, {
    include: [{
      model: category_i18n,
    }],
    transaction,
  });
}

/**
 * Create
 * @param {object} category
 * @param {*} transaction
 */
export async function createI18n(categoryObj, transaction) {
  return category_i18n.create(categoryObj, {
    transaction,
  });
}

export async function updateI18n(categoryI18n, transaction) {
  return category_i18n.update(categoryI18n, {
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
export async function update(categoryObj, id, transaction) {
  if (categoryObj.category_i18ns) {
    for (let index = 0; index < categoryObj.category_i18ns.length; index++) {
      const categoryI18n = categoryObj.category_i18ns[index];

      if (categoryI18n.id) {
        // eslint-disable-next-line no-await-in-loop
        await updateI18n(categoryI18n, transaction);
      } else {
        categoryI18n.categoryId = id;
        // eslint-disable-next-line no-await-in-loop
        await createI18n(categoryI18n, transaction);
      }
    }
  }

  return category.update(categoryObj, {
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
export async function remove(id, transaction) {
  return category.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    transaction,
  });
}
