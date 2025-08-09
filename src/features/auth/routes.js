
const Login    = () => import('./views/LoginView.vue')
const Register = () => import('./views/RegisterView.vue')
const AuthLayout = () => import('@/layouts/AuthLayout.vue')

export default [
  {
    path: '/auth',
    component: AuthLayout,    
    children: [
      { path: '', redirect: { name: 'auth.login' } },
      { path: 'login',    name: 'auth.login',    component: Login,    meta: { requiresGuest: true } },
      { path: 'register', name: 'auth.register', component: Register, meta: { requiresGuest: true } },
    ],
  },
]
