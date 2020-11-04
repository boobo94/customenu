export default (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    weight: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    photo: {
      type: DataTypes.STRING,
    },
  }, {});
  product.associate = (models) => {
    // associations can be defined here
    product.belongsTo(models.subcategory);
    product.hasMany(models.product_i18n, {
      onDelete: 'CASCADE',
    });
  };
  return product;
};
