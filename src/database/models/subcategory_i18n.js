export default (sequelize, DataTypes) => sequelize.define('subcategory_i18n', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lang_code: {
    type: DataTypes.STRING(2),
    defaultValue: 'en',
  },
}, {});
