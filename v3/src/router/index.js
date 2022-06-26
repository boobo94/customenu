import { createRouter, createWebHistory } from 'vue-router'

import About from '@/views/About.vue';
import Cart from '@/views/Cart.vue';
import Contact from '@/views/Contact.vue';
import RestaurantView from '@/views/RestaurantView.vue';
import Categories from '@/views/Categories.vue';
import ProductView from '@/views/ProductView.vue';
import Products from '@/views/Products.vue';
import Product from '@/views/Product.vue';

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
        path: ':categoryId/products',
        component: ProductView,
        children: [
          {
            path: '',
            name: 'Products',
            component: Products,
          },
          {
            path: ':productId',
            name: 'Product',
            component: Product,
          },
        ],
      },
      {
        path: 'contact',
        name: 'Contact',
        component: Contact,
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart,
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
