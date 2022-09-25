import { createRouter, createWebHistory } from 'vue-router'
import Medicines from '../views/Medicines.vue'
import Medicine from '../views/Medicine.vue'
import NewMedicine from '../views/NewMedicine.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/medicines',
      alias: '/',
      name: 'medicines',
      component: Medicines
    },
    {
      path: '/medicines/new',
      name: 'newMedicine',
      component: NewMedicine
    },
    {
      path: '/medicines/:_id',
      name: 'medicine',
      component: Medicine
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
