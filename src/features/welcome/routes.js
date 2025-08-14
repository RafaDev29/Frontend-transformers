
const WelcomeHome = () => import('./views/WelcomeView.vue')


export default [
  {
    path: 'welcome',              
    name: 'welcome',
    component: WelcomeHome,
    meta: { requiresAuth: true, roles: ['CUSTOMER', 'ROOT'] }
  },

]
