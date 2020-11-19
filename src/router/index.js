import Vue from 'vue';
import VueRouter from 'vue-router';

import RouterView from '@/components/RouterView.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/auth/Login.vue';
import ListCategories from '@/views/categories/List.vue';
import ListSubcategories from '@/views/subcategories/List.vue';
import ListProducts from '@/views/products/List.vue';

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
    path: '/categories/:categoryId/subcategories',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'List Subcategories',
        component: ListSubcategories,
        beforeEnter: middlewareIsLoggedIn,
      },
      // {
      //   path: 'add',
      //   name: 'Add Category',
      //   component: AddCategoryComponent,
      // beforeEnter: middlewareIsLoggedIn,
      // },
      // {
      //   path: ':categoryId/edit',
      //   name: 'Edit Category',
      //   component: EditCategoryComponent,
      // beforeEnter: middlewareIsLoggedIn,
      // },
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
      // {
      //   path: 'add',
      //   name: 'Add Category',
      //   component: AddCategoryComponent,
      // beforeEnter: middlewareIsLoggedIn,
      // },
      // {
      //   path: ':categoryId/edit',
      //   name: 'Edit Category',
      //   component: EditCategoryComponent,
      // beforeEnter: middlewareIsLoggedIn,
      // },
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
      // {
      //   path: 'add',
      //   name: 'Add Category',
      //   component: AddCategoryComponent,
      // beforeEnter: middlewareIsLoggedIn,
      // },
      // {
      //   path: ':categoryId/edit',
      //   name: 'Edit Category',
      //   component: EditCategoryComponent,
      // beforeEnter: middlewareIsLoggedIn,
      // },
    ],
  },

];

export default new VueRouter({
  mode: 'history',
  routes,
});
