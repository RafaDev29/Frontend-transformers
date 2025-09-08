
const Frequency = () => import('./views/FrequencyView.vue')

export default [
  {
    path: 'frequency',              
    name: 'frequency',
    component: Frequency,
    meta: { requiresAuth: true, roles: ['FACTORY', 'ROOT'] }
  },

]
