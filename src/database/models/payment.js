import { DataTypes } from 'sequelize';

export const PAYMENT_STATUS = {
  paid: 'paid',
  pending: 'pending',
  failed: 'failed',
};

export default (sequelize) => {
  const model = sequelize.define('payment', {
    referenceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: PAYMENT_STATUS.pending,
    },
    invoiceNumber: {
      type: DataTypes.INTEGER,
    },

  });

  model.associate = (models) => {
    model.belongsTo(models.subscription);
    model.belongsTo(models.restaurant);
  };

  return model;
};
