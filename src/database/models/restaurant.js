export default (sequelize, DataTypes) => {
  const restaurant = sequelize.define('restaurant', {
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  restaurant.associate = (models) => {
    // associations can be defined here
    restaurant.hasMany(models.restaurant_i18n, {
      onDelete: 'CASCADE',
    });
  };
  return restaurant;
};
