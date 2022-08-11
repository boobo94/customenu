module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('subscriptionPlans', [
    {
      id: 1,
      name: 'Free',
      amount: 0,
      vatAmount: 0,
      currency: 'RON',
      interval: 'year',
      recurrence: 100,
      referenceId: 'free',
      maxProducts: 30,
      maxCategories: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Standard',
      amount: 491,
      vatAmount: 93.29,
      currency: 'RON',
      interval: 'month',
      recurrence: 1,
      referenceId: 'price_1L98Z2EOKZqFShVgY9I4WYQj',
      maxProducts: 200,
      maxCategories: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'PRO',
      amount: 733,
      vatAmount: 139.27,
      currency: 'RON',
      interval: 'year',
      recurrence: 1,
      referenceId: 'price_1L98a8EOKZqFShVgWcCImo6B',
      maxProducts: 10000,
      maxCategories: 1000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('subscriptionPlans', {
    id: {
      [Sequelize.Op.in]: [1, 2, 3],
    },
  }, {}),

};
