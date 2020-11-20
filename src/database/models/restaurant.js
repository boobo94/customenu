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
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    instagramUrl: {
      type: DataTypes.STRING,
    },
    facebookUrl: {
      type: DataTypes.STRING,
    },
    youtubeUrl: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
    },
    languages: {
      type: DataTypes.ARRAY(DataTypes.STRING(2)),
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
