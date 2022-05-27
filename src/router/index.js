import { createRouter, createWebHashHistory } from 'vue-router'
import FormSobreProfissional from '../components/FormSobreProfissional.vue'

const routes = [
  {
    path: '/',
    name: 'FormSobreProfissional',
    component: FormSobreProfissional,
  },
  {
    path: '/sobreatendimento',
    name: 'FormSobreAtendimento',
    component: () => import('../components/FormSobreAtendimento.vue')
  },
  {
    path: '/detalhesdocadastro',
    name: 'DetalhesDoCadastro',
    component: () => import('../components/DetalhesDoCadastro.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
