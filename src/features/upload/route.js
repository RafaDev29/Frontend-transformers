

const Mupload = () => import('./views/UploadMaintenanceView.vue')
export default [
  // {
  //   path: 'upload',              
  //   name: 'upload',
  //   component: Upload,
  //   meta: { requiresAuth: true, roles: ['ROOT'] }
  // },

  {
    path: 'mupload',              
    name: 'mupload',
    component: Mupload,
    meta: { requiresAuth: true, roles: [ 'ROOT'] }
  },

]
