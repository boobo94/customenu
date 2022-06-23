// eslint-disable-next-line import/prefer-default-export
export const adaptAll = (elements) => elements.map((element) => {
  const response = {
    id: element.id,
    categoryId: element.categoryId,
    image: element.image,
    weight: element.weight,
    price: element.price,
    cookingTime: element.cookingTime,
  };

  if (element.product_i18ns) {
    response.name = element.product_i18ns[0].name;
    response.description = element.product_i18ns[0].description;
    response.allergens = element.product_i18ns[0].allergens;
  }

  return response;
});
