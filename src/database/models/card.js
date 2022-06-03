import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const model = sequelize.define('card', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mask: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenExpirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    orderId: { // the initial transaction id
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  model.associate = (models) => {
    model.belongsTo(models.admin);
  };

  return model;
};
