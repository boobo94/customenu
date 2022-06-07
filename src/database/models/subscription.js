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
    refferenceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    canceled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    underscored: true,
  });

  model.associate = (models) => {
    model.belongsTo(models.subscriptionPlan);
    model.belongsTo(models.admin);
  };

  return model;
};
