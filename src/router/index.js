import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import Home from '@/views/HomeView.vue'
import Solution from '@/views/SolutionView.vue'
import Plan from '@/views/PlanView.vue'

// 👇 importa el módulo auth
import authRoutes from '@/features/auth/routes'

const routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: 'start', component: Home },
      { path: 'solution', component: Solution },
      { path: 'plans', component: Plan },
      { path: '', redirect: 'start' },
    ],
  },

  ...authRoutes,

  { path: '/:pathMatch(.*)*' },
]

export default createRouter({ history: createWebHistory(), routes })
