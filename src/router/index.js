// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import PublicLayout from '@/layouts/PublicLayout.vue'

// Vistas públicas
import Home from '@/views/HomeView.vue'
//import About from '@/views/About.vue'
//import NotFound from '@/views/NotFound.vue'

// Rutas principales 
const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', component: Home },
     // { path: 'about', component: About },
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
