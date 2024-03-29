import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const model = sequelize.define('subscriptionPlan', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    vatAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interval: { // day, week, month, year
      type: DataTypes.STRING,
      allowNull: false,
    },
    recurrence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxProducts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxCategories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return model;
};
