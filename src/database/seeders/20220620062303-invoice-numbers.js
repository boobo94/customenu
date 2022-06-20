module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('payments', [
    {
      id: 1,
      referenceId: 'blank',
      amount: 1,
      vatAmount: 0,
      status: 'paid',
      invoiceNumber: 0,
      currency: 'RON',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      referenceId: 'blank',
      amount: 1,
      vatAmount: 1,
      status: 'paid',
      invoiceNumber: 0,
      currency: 'RON',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('payments', {
    id: {
      [Sequelize.Op.in]: [1, 2],
    },
  }, {}),
};
