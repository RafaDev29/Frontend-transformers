
const Factory = () => import('./views/FactoryView.vue')
const Mfactory = () => import('./views/FactoryMaintenanceView.vue')
const factoryTransformer = () => import('./views/TransformerView.vue')
const factoryTransformerDetail = () => import('./views/TransformerDetailView.vue')
const factoryTransformerDetailTwo = () => import('./views/TransformerDetailTwoView.vue')
export default [
  {
    path: 'factory',              
    name: 'factory',
    component: Factory,
    meta: { requiresAuth: true, roles: ['ROOT'] }
  },

  {
    path: 'mfactory',              
    name: 'mfactory',
    component: Mfactory,
    meta: { requiresAuth: true, roles: [ 'ROOT'] }
  },

   {
    path: 'factoryTransformer',              
    name: 'factoryTransformer',
    component: factoryTransformer,
    meta: { requiresAuth: true, roles: [ 'ROOT'] }
  },


   {
    path: 'factoryTransformerDetail',              
    name: 'factoryTransformerDetail',
    component: factoryTransformerDetail,
    meta: { requiresAuth: true, roles: [ 'ROOT'] }
  },

   {
    path: 'factoryTransformerDetailTwo',              
    name: 'factoryTransformerDetailTwo',
    component: factoryTransformerDetailTwo,
    meta: { requiresAuth: true, roles: [ 'ROOT'] }
  },


  

]
