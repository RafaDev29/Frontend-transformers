
const Alert = () => import('./views/AlertMaintenanceView.vue')

export default [
  {
    path: 'malert',
    name: 'malert',
    component: Alert,
    meta: { requiresAuth: true, roles: ['ROOT', 'FACTORY', 'CUSTOMER'] }
  },

]
