
const Strain = () => import('./views/CurrentView.vue')

export default [
  {
    path: 'current',              
    name: 'current',
    component: Strain,
    meta: { requiresAuth: true, roles: ['FACTORY', 'ROOT'] }
  },

]
