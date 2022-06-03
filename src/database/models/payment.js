import { DataTypes } from 'sequelize';

export const PAYMENT_STATUS = {
  paid: 'paid',
  pending: 'pending',
  failed: 'failed',
};

export default (sequelize) => {
  const model = sequelize.define('payment', {
    orderId: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: PAYMENT_STATUS.pending,
    },

  });

  model.associate = (models) => {
    model.belongsTo(models.admin);
    model.belongsTo(models.card);
    model.belongsTo(models.subscription);
  };

  return model;
};
