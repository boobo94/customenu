import { v4 as uuid } from 'uuid';

export default (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
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
    type: {
      type: DataTypes.STRING,
      defaultValue: 'default', // values: default, root
    },
  });

  admin.associate = (models) => {
    // associations can be defined here
    admin.belongsTo(models.restaurant);
  };

  return admin;
};
