import { createRouter, createWebHistory } from 'vue-router';

import RouterView from '@/components/RouterView.vue';
import CategoriesPage from '@/views/CategoriesPage.vue';
import ProductsPage from '@/views/ProductsPage.vue';
import ProductPage from '@/views/ProductPage.vue';
import CartPage from '@/views/CartPage.vue';
import ContactPage from '@/views/ContactPage.vue';

const routes = [

  {
    path: '/:restaurantUrl',
    component: RouterView,
    name: 'Restaurant Router',
    children: [
      {
        path: '',
        name: 'Home',
        component: CategoriesPage,
      },

      {
        path: ':categoryId/products',
        component: RouterView,
        children: [
          {
            path: '',
            name: 'Products',
            component: ProductsPage,
          },
          {
            path: ':productId',
            name: 'Product',
            component: ProductPage,
          },
        ],
      },
      {
        path: 'contact',
        name: 'Contact',
        component: ContactPage,
      },
      {
        path: 'cart',
        name: 'Cart',
        component: CartPage,
      },
    ],
  },

  // {
  //   path: '/about',
  //   name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
