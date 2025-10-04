
const Thdv = () => import('./views/thdvView.vue')

export default [
  {
    path: 'thdv',              
    name: 'thdv',
    component: Thdv,
    meta: { requiresAuth: true, roles: ['FACTORY', 'ROOT', 'CUSTOMER'] }
  },

]
