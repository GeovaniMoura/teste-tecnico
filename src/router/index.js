import { createRouter, createWebHashHistory } from 'vue-router'
import FormSobreProfissional from '../components/FormSobreProfissional.vue'

const routes = [
  {
    path: '/',
    name: 'FormSobreProfissional',
    component: FormSobreProfissional,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
