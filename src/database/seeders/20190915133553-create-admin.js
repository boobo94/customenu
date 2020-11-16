module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('admins', [{
      id: 1,
      email: 'admin@cmevo.com',
      password: '$2b$09$6pBsKzz/GpDU4JmM090kxu3bt/IYY8/yhDeaGdkD8pXi0HidqMz2i', // admin
      refreshToken: '61178d18-09c5-400d-8cc9-446ecbb0bc8d',
      createdAt: new Date(),
      updatedAt: new Date(),

    }]),

  ]),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('admins', {
    id: 1,
  }),
};
