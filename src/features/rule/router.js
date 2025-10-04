
const Rule = () => import('./views/RuleMaintenanceView.vue')

export default [
  {
    path: 'mrule',              
    name: 'mrule',
    component: Rule,
    meta: { requiresAuth: true, roles: [ 'ROOT' , 'FACTORY' , 'CUSTOMER'] }
  },

]
