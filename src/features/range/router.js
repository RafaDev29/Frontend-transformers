

const Mrange = () => import('./views/RangeMaintenanceView.vue')
export default [


  {
    path: 'mrange',
    name: 'mrange',
    component: Mrange,
    meta: { requiresAuth: true, roles: ['ROOT'] }
  },

]
