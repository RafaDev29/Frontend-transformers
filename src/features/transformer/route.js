
const Transformer = () => import('./views/TransformerView.vue')
const Mtransformer = () => import('./views/TransformerMaintenanceView.vue')
const Dtransformer = () => import('./views/TransformerDetailView.vue')  
export default [
  {
    path: 'transformer',              
    name: 'transformer',
    component: Transformer,
    meta: { requiresAuth: true, roles: ['FACTORY', 'ROOT'] }
  },

  {
    path: 'mtransformer',              
    name: 'mtransformer',
    component: Mtransformer,
    meta: { requiresAuth: true, roles: ['FACTORY', 'ROOT'] }
  },

   {
    path: 'transformerDetail',              
    name: 'transformerDetail',
    component: Dtransformer,
    meta: { requiresAuth: true, roles: ['FACTORY', 'ROOT' , 'CUSTOMER'] }
  },

  
]
