import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RestaurantView from '../views/RestaurantView.vue'
import Categories from '../views/Categories.vue'
import Subcategories from '../views/Subcategories.vue'
import ProductView from '../views/ProductView.vue'
import Products from '../views/Products.vue'
import Product from '../views/Product.vue'

const routes = [
  {
    path: '/:restaurantUrl',
    component: RestaurantView,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'categories',
        name: 'Categories',
        component: Categories
      },
      {
        path: 'subcategories',
        name: 'Subcategories',
        component: Subcategories
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
          }
        ]
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
