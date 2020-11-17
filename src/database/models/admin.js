import { v4 as uuid } from 'uuid';

export default (sequelize, DataTypes) => sequelize.define('admin', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    defaultValue: uuid(),
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
