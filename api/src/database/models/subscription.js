import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const model = sequelize.define('subscription', {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    canceled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  model.associate = (models) => {
    model.belongsTo(models.subscriptionPlan);
    model.belongsTo(models.restaurant);
  };

  return model;
};
