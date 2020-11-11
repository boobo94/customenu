import Vue from 'vue';
import VueRouter from 'vue-router';

import About from '../views/About.vue';
import RestaurantView from '../views/RestaurantView.vue';
import Categories from '../views/Categories.vue';
import Subcategories from '../views/Subcategories.vue';
import ProductView from '../views/ProductView.vue';
import Products from '../views/Products.vue';
import Product from '../views/Product.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/:restaurantUrl',
    component: RestaurantView,
    children: [
      {
        path: '',
        name: 'Home',
        component: Categories,
      },
      {
        path: ':categoryId/subcategories',
        name: 'Subcategories',
        component: Subcategories,
      },
      {
        path: 'products',
        component: ProductView,
        children: [
          {
            path: '',
            name: 'Products',
            component: Products,
          },
          {
            path: ':id',
            name: 'Product',
            component: Product,
          },
        ],
      },
    ],
  },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
