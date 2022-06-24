import { DataTypes } from 'sequelize';

export default (sequelize) => sequelize.define('category_i18n', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lang_code: {
    type: DataTypes.STRING(2),
    defaultValue: 'en',
  },
}, {});
