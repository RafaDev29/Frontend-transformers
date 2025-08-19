
const Transformer = () => import('./views/TransformerView.vue')


export default [
  {
    path: 'transformer',              
    name: 'transformer',
    component: Transformer,
    meta: { requiresAuth: true, roles: ['MASTER', 'ROOT'] }
  },

]
