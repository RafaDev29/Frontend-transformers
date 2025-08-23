
const Transformer = () => import('./views/TransformerView.vue')
const Mtransformer = () => import('./views/TransformerMaintenanceView.vue')
const Dtransformer = () => import('./views/TransformerDetailView.vue')
const DTtransformer = () => import('./views/TransformerDetailTwoView.vue')
export default [
  {
    path: 'transformer',              
    name: 'transformer',
    component: Transformer,
    meta: { requiresAuth: true, roles: ['MASTER', 'ROOT'] }
  },

  {
    path: 'mtransformer',              
    name: 'mtransformer',
    component: Mtransformer,
    meta: { requiresAuth: true, roles: ['MASTER', 'ROOT'] }
  },

   {
    path: 'transformerDetail',              
    name: 'transformerDetail',
    component: Dtransformer,
    meta: { requiresAuth: true, roles: ['MASTER', 'ROOT'] }
  },

   {
    path: 'transformerDetailTwo',              
    name: 'transformerDetailTwo',
    component: DTtransformer,
    meta: { requiresAuth: true, roles: ['MASTER', 'ROOT'] }
  },

]
