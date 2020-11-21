import Vue from 'vue';
import VueRouter from 'vue-router';

import RouterView from '@/components/RouterView.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/auth/Login.vue';
import EditAdmin from '@/views/auth/EditAdmin.vue';

import EditRestaurant from '@/views/restaurant/Edit.vue';

import ListCategories from '@/views/categories/List.vue';
import CreateCategory from '@/views/categories/Create.vue';
import EditCategory from '@/views/categories/Edit.vue';

import ListSubcategories from '@/views/subcategories/List.vue';
import CreateSubcategory from '@/views/subcategories/Create.vue';
import EditSubcategory from '@/views/subcategories/Edit.vue';

import ListProducts from '@/views/products/List.vue';
import CreateProduct from '@/views/products/Create.vue';
import EditProduct from '@/views/products/Edit.vue';

import middlewareIsLoggedIn from './middlewareIsLogged';

Vue.use(VueRouter);

const routes = [

  {
    path: '',
    name: 'Home',
    component: Home,
    beforeEnter: middlewareIsLoggedIn,
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  {
    path: '/profile',
    name: 'Edit Admin',
    component: EditAdmin,
  },

  {
    path: '/restaurant',
    name: 'Edit Restaurant',
    component: EditRestaurant,
    beforeEnter: middlewareIsLoggedIn,
  },

  {
    path: '/categories/:categoryId/subcategories',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'List Subcategories',
        component: ListSubcategories,
        beforeEnter: middlewareIsLoggedIn,
      },
      {
        path: 'create',
        name: 'Create Subcategory',
        component: CreateSubcategory,
        beforeEnter: middlewareIsLoggedIn,
      },
      {
        path: ':subcategoryId/edit',
        name: 'Edit Subcategory',
        component: EditSubcategory,
        beforeEnter: middlewareIsLoggedIn,
      },
    ],
  },

  {
    path: '/categories',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'List Categories',
        component: ListCategories,
        beforeEnter: middlewareIsLoggedIn,
      },
      {
        path: 'create',
        name: 'Create Category',
        component: CreateCategory,
        beforeEnter: middlewareIsLoggedIn,
      },
      {
        path: ':categoryId/edit',
        name: 'Edit Category',
        component: EditCategory,
        beforeEnter: middlewareIsLoggedIn,
      },
    ],
  },

  {
    path: '/products',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'List Products',
        component: ListProducts,
        beforeEnter: middlewareIsLoggedIn,
      },
      {
        path: 'create',
        name: 'Add Product',
        component: CreateProduct,
        beforeEnter: middlewareIsLoggedIn,
      },
      {
        path: ':productId/edit',
        name: 'Edit create',
        component: EditProduct,
        beforeEnter: middlewareIsLoggedIn,
      },
    ],
  },

];

export default new VueRouter({
  mode: 'history',
  routes,
});
