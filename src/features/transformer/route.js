
const Transformer = () => import('./views/TransformerView.vue')
const Mtransformer = () => import('./views/TransformerMaintenanceView.vue')

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

]
