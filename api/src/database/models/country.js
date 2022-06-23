import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const model = sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });

  return model;
};
