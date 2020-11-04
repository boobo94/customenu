import Category from './category';
import Subcategory from './subcategory';
import Restaurant from './restaurant';
import Product from './product';

export default (databaseConnection) => ({
  restaurant: new Restaurant(databaseConnection),
  category: new Category(databaseConnection),
  subcategory: new Subcategory(databaseConnection),
  product: new Product(databaseConnection),
});
