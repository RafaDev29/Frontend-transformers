
const ProfileR = () => import('./views/ProfileRootView.vue')
const ProfileF = () => import('./views/ProfileFactoryView.vue')
const ProfileC = () => import('./views/ProfileCustomerView.vue')
export default [
  {
    path: 'profileR',              
    name: 'profileR',
    component: ProfileR,
    meta: { requiresAuth: true, roles: [ 'ROOT'] }
  },

    {
    path: 'profileF',              
    name: 'profileF',
    component: ProfileF,
    meta: { requiresAuth: true, roles: [  'FACTORY' ] }
  },

    {
    path: 'profileC',              
    name: 'profileC',
    component: ProfileC,
    meta: { requiresAuth: true, roles: [  'CUSTOMER'] }
  },

]
