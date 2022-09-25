import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import { useCookies } from "vue3-cookies"

const { cookies } = useCookies()

// View components
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
      component: () => import('../views/AboutView.vue')
    }
  ]
})


router.beforeEach((to, from) => {

  const  jwt = cookies.get('jwt')

  const userIsAuthenticated = !!jwt
  if (!userIsAuthenticated && to.name !== 'login') return { name: 'login' }

  axios.defaults.headers.common.Authorization = `Bearer ${jwt}`



})

export default router
