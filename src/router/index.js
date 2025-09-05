import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import Home from '@/views/HomeView.vue'
import Solution from '@/views/SolutionView.vue'
import Plan from '@/views/PlanView.vue'
import authRoutes from '@/features/auth/routes'
import welcomeRoutes from '@/features/welcome/routes'
import transformerRoutes from '@/features/transformer/route'
import factoryRoutes from '@/features/factory/router'
import customerRoutes from '@/features/customer/router'
import rangeRoutes from '@/features/range/router'
import strainRoute from '@/features/strain/router'
import { authGuard } from './guards/auth'


const routes = [
  // Público
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

  // Auth (login/register con AuthLayout)
  ...authRoutes,

  // Privado (todo lo de /app requiere sesión)
  {
    path: '/app',
    component: PrivateLayout,
    meta: { requiresAuth: true },
    children: [
     
      ...welcomeRoutes,
      ...transformerRoutes,
      ...factoryRoutes,
      ...customerRoutes,
      ...rangeRoutes,
      ...strainRoute,
      { path: '', redirect: '/app/welcome' },
    ],
  },

  // 404
  { path: '/:pathMatch(.*)*', redirect: '/start' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => authGuard(to))
export default router
