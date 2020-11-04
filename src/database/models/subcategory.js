// eslint-disable-next-line no-unused-vars
export default (sequelize, DataTypes) => {
  const subcategory = sequelize.define('subcategory', { }, {});
  subcategory.associate = (models) => {
    // associations can be defined here
    subcategory.belongsTo(models.category);
    subcategory.hasMany(models.subcategory_i18n, {
      onDelete: 'CASCADE',
    });
  };
  return subcategory;
};
