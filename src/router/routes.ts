import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/medicines',
    alias: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'medicines', component: () => import('pages/MedicineList.vue') },
      { path: ':_id', name: 'medicine', component: () => import('pages/MedicineDetails.vue') },
    ],
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
