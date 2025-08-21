
const Factory = () => import('./views/FactoryView.vue')
const Mfactory = () => import('./views/FactoryMaintenanceView.vue')
const factoryTransformer = () => import('./views/TransformerView.vue')

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

]
