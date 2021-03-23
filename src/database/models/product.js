export default (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    weight: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    image: {
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
