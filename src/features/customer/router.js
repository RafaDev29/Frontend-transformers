
const Customer = () => import('./views/CustomerView.vue')
const Mcustomer = () => import('./views/CustomerMaintenanceView.vue')
export default [
  {
    path: 'customer',              
    name: 'customer',
    component: Customer,
    meta: { requiresAuth: true, roles: ['ROOT'] }
  },

  {
    path: 'mcustomer',              
    name: 'mcustomer',
    component: Mcustomer,
    meta: { requiresAuth: true, roles: [ 'ROOT', 'FACTORY'] }
  },

]
