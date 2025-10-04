
const Power = () => import('./views/PowerView.vue')

export default [
  {
    path: 'power',              
    name: 'power',
    component: Power,
    meta: { requiresAuth: true, roles: ['FACTORY', 'ROOT' , 'CUSTOMER'] }
  },

]
