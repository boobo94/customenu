import Vue from 'vue';
import VueRouter from 'vue-router';

import RouterView from '@/components/RouterView.vue';
import Login from '@/views/auth/Login.vue';
import ListCategories from '@/views/categories/List.vue';

import middlewareIsLoggedIn from './middlewareIsLogged';

Vue.use(VueRouter);

const routes = [

  {
    path: '',
    name: 'Home',
    component: Login, // todo: set a homepage component
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
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
    path: '/subcategories',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'List Subcategories',
        component: ListCategories,
      },
      // {
      //   path: 'add',
      //   name: 'Add Category',
      //   component: AddCategoryComponent,
      // },
      // {
      //   path: ':categoryId/edit',
      //   name: 'Edit Category',
      //   component: EditCategoryComponent,
      // },
    ],
  },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
