import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const table = sequelize.define('table', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  table.associate = (models) => {
    // associations can be defined here
    table.belongsTo(models.restaurant);
  };

  return table;
};
