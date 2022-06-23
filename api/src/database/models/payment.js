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
    vatAmount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: PAYMENT_STATUS.pending,
    },
    invoiceNumber: {
      type: DataTypes.INTEGER,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  model.associate = (models) => {
    model.belongsTo(models.subscription);
    model.belongsTo(models.restaurant);
  };

  return model;
};
