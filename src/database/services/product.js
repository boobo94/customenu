import { Op } from 'sequelize';
import {
  // eslint-disable-next-line import/named, camelcase
  product, product_i18n, category, subcategory,
} from '../models';

/**
   * Find by id with i18n
   * @param {number} id
   */
export async function findByIdWithI18nAndSubcategory(id) {
  return product.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    include: [
      {
        model: subcategory,
        attributes: ['categoryId'],
      },
      {
        model: product_i18n,
      }],
  });
}

/**
   * Find by id
   * @param {number} id
   */
export async function findById(id, language) {
  return product.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    include: [{
      model: product_i18n,
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
export async function findAll(subcategoryId, language) {
  return product.findAll({
    where: {
      subcategoryId: {
        [Op.eq]: subcategoryId,
      },
    },
    include: [{
      model: product_i18n,
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
   * Find all
   * @param {number} restaurantId
   * @param {string} language
   */
export async function findAllOfRestaurants(restaurantId, language) {
  return product.findAll({
    include: [
      {
        model: subcategory,
        include: [{
          model: category,
          where: {
            restaurantId: {
              [Op.eq]: restaurantId,
            },
          },
        }],
        required: true, // use inner join
      },
      {
        model: product_i18n,
        where: {
          lang_code: {
            [Op.eq]: language,
          },
        },
      },
    ],
    order: [
      ['id', 'ASC'],
    ],
  });
}

/**
   * Find one by id and restaurant id
   * @param {number} id
   * @param {number} restaurantId
   * @param {string} language
   */
export async function findOneOfRestaurantsById(id, restaurantId, language) {
  return product.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    include: [
      {
        model: subcategory,
        include: [{
          model: category,
          where: {
            restaurantId: {
              [Op.eq]: restaurantId,
            },
          },
        }],
      },
      {
        model: product_i18n,
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
export async function findOneOfRestaurantsByIdSimple(id, restaurantId) {
  return product.findOne({
    attributes: ['id'],
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    include: [
      {
        model: subcategory,
        include: [{
          model: category,
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
   * @param {object} productObj
   * @param {*} transaction
   */
export async function create(productObj, transaction) {
  return product.create(productObj, {
    include: [{
      model: product_i18n,
    }],
    transaction,
  });
}

/**
   * Create
   * @param {object} productObj
   * @param {*} transaction
   */
export async function createI18n(productObj, transaction) {
  return product_i18n.create(productObj, {
    transaction,
  });
}

export async function updateI18n(subcategoryI18n, transaction) {
  return product_i18n.update(subcategoryI18n, {
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
   * @param {object} productObj
   * @param {number} id
   * @param {Sequelize.Transaction} transaction
   */
export async function update(productObj, id, transaction) {
  if (productObj.product_i18ns) {
    for (let index = 0; index < productObj.product_i18ns.length; index++) {
      const productI18n = productObj.product_i18ns[index];

      if (productI18n.id) {
        // eslint-disable-next-line no-await-in-loop
        await updateI18n(productI18n, transaction);
      } else {
        productI18n.productId = id;
        // eslint-disable-next-line no-await-in-loop
        await createI18n(productI18n, transaction);
      }
    }
  }

  return product.update(productObj, {
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
  return product.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    transaction,
  });
}
