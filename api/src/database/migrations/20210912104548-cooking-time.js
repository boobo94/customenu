module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('products', 'cookingTime', {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  }),

  down: (queryInterface, Sequelize) => queryInterface.addColumn('products', 'cookingTime', {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  })
  ,
};
