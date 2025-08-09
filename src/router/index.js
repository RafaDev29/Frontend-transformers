// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import PublicLayout from '@/layouts/PublicLayout.vue'

// Vistas públicas
import Home from '@/views/HomeView.vue'
import Solution from '@/views/SolutionView.vue'
import Plan from '@/views/PlanView.vue'


// Rutas principales 
const routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: 'start', component: Home },
      { path: 'solution', component: Solution },
      {path : 'plans', component : Plan}
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    //component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
