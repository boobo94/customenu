import { DataTypes } from 'sequelize';

export default (sequelize) => sequelize.define('restaurant_i18n', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  lang_code: {
    type: DataTypes.STRING(2),
    defaultValue: 'en',
  },
}, {});
