
const Support = () => import('./views/SupportView.vue')

export default [
  {
    path: 'support',              
    name: 'support',
    component: Support,
    meta: { requiresAuth: true, roles: [ 'ROOT' , 'FACTORY' , 'CUSTOMER'] }
  },


]
