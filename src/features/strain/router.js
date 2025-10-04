
const Strain = () => import('./views/StrainView.vue')

export default [
  {
    path: 'strain',              
    name: 'strain',
    component: Strain,
    meta: { requiresAuth: true, roles: ['FACTORY', 'ROOT', 'CUSTOMER'] }
  },

]
