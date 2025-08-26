
const Transformer = () => import('./views/TransformerView.vue')


export default [
  {
    path: 'strain',              
    name: 'strain',
    component: Transformer,
    meta: { requiresAuth: true, roles: ['FACTORY', 'ROOT'] }
  },

]
