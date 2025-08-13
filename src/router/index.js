import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import Home from '@/views/HomeView.vue'
import Solution from '@/views/SolutionView.vue'
import Plan from '@/views/PlanView.vue'
import authRoutes from '@/features/auth/routes'
import { authGuard } from './guards/auth'

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: 'start', component: Home },
      { path: 'solution', component: Solution },
      { path: 'plans', component: Plan },
      { path: '', redirect: '/start' },
    ],
  },

  // Rutas del feature auth
  ...authRoutes,

  // Rutas protegidas de ejemplo (marca las tuyas con meta según rol)
  { path: '/power', component: () => import('@/features/power/views/PowerHome.vue'),
    meta: { requiresAuth: true, roles: ['CUSTOMER'] } },
 

  // 404
  { path: '/:pathMatch(.*)*', redirect: '/start' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Registro del guard
router.beforeEach((to) => authGuard(to))

export default router
