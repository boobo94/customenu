import Vue from 'vue';
import VueRouter from 'vue-router';

import RouterView from '@/components/RouterView.vue';
import ListCategories from '@/views/categories/List.vue';

Vue.use(VueRouter);

const routes = [

  {
    path: '/categories',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'List Categories',
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
