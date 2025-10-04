
const Temperature = () => import('./views/TemperatureView.vue')

export default [
  {
    path: 'temperature',              
    name: 'temperature',
    component: Temperature,
    meta: { requiresAuth: true, roles: ['FACTORY', 'ROOT', 'CUSTOMER'] }
  },

]
