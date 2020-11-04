// eslint-disable-next-line no-unused-vars
export default (sequelize, DataTypes) => {
  const category = sequelize.define('category', { }, {});
  category.associate = (models) => {
    // associations can be defined here
    category.belongsTo(models.restaurant);
    category.hasMany(models.category_i18n, {
      onDelete: 'CASCADE',
    });
  };
  return category;
};
