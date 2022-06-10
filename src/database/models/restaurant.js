import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const restaurant = sequelize.define('restaurant', {
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qr_code: {
      type: DataTypes.STRING,
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
    customerReference: {
      type: DataTypes.STRING,
    },
    billingCompanyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billingTaxId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billingAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  restaurant.associate = (models) => {
    // associations can be defined here
    restaurant.hasMany(models.restaurant_i18n, {
      onDelete: 'CASCADE',
    });
    restaurant.belongsTo(models.country);
  };

  return restaurant;
};
