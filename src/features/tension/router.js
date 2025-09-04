
const Tension = () => import('./views/TensionView.vue')

export default [
  {
    path: 'tension',              
    name: 'tension',
    component: Tension,
    meta: { requiresAuth: true, roles: ['FACTORY', 'ROOT'] }
  },

 

]
