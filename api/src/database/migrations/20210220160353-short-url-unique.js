module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('restaurants', 'shortUrl', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn('restaurants', 'shortUrl', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  })
  ,
};
