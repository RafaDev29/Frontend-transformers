
const Thdi = () => import('./views/ThdiView.vue')

export default [
  {
    path: 'thdi',              
    name: 'thdi',
    component: Thdi,
    meta: { requiresAuth: true, roles: ['FACTORY', 'ROOT'] }
  },

]
