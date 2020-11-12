export default (sequelize, DataTypes) => sequelize.define('restaurant_i18n', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  allergens: {
    type: DataTypes.STRING,
  },
  lang_code: {
    type: DataTypes.STRING(2),
    defaultValue: 'en',
  },
}, {});
