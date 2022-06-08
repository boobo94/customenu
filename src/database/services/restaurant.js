import { Op } from 'sequelize';
// eslint-disable-next-line import/named, camelcase
import { restaurant, restaurant_i18n } from '../models';

/**
 * Find by id
 * @param {number} id
 */
export async function findById(id, language) {
  return restaurant.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    include: [{
      model: restaurant_i18n,
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
export async function findByIdWithI18n(id) {
  return restaurant.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    include: [{
      model: restaurant_i18n,
    }],
  });
}

/**
 * Find app by id
 * @param {number} shortUrl The url of restaurant
 */
export async function findByRestaurantAndToken(shortUrl) {
  return restaurant.findOne({
    where: {
      shortUrl: {
        [Op.eq]: shortUrl,
      },
    },
  });
}

export async function findByCustomer(customerReference) {
  return restaurant.findOne({
    where: {
      customerReference: {
        [Op.eq]: customerReference,
      },
    },
  });
}

/**
 * Get languages of restaurant
 * @param {number} id
 */
export async function getLanguages(id) {
  return restaurant.findOne({
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
export async function create(restaurantObj, transaction) {
  return restaurant.create(restaurantObj, {
    include: [{
      model: restaurant_i18n,
    }],
    transaction,
  });
}

/**
 * Create
 * @param {object} entry
 * @param {*} transaction
 */
export async function createI18n(entry, transaction) {
  return restaurant_i18n.create(entry, {
    transaction,
  });
}

export async function updateI18n(entry18n, transaction) {
  return restaurant_i18n.update(entry18n, {
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
export async function update(restaurantObj, id, transaction) {
  if (restaurantObj.restaurant_i18ns) {
    for (let index = 0; index < restaurantObj.restaurant_i18ns.length; index++) {
      const restaurantI18n = restaurantObj.restaurant_i18ns[index];

      if (restaurantI18n.id) {
        // eslint-disable-next-line no-await-in-loop
        await updateI18n(restaurantI18n, transaction);
      } else {
        restaurantI18n.restaurantId = id;
        // eslint-disable-next-line no-await-in-loop
        await createI18n(restaurantI18n, transaction);
      }
    }
  }

  return restaurant.update(restaurantObj, {
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
  return restaurant.destroy({
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
export async function getMinimal(id) {
  return restaurant.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
    attributes: ['id', 'logo', 'shortUrl', 'languages'],
  });
}
