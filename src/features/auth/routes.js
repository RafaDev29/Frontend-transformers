// ✅ OBLIGATORIO: path absoluto en el nivel raíz
const Login = () => import('./views/LoginView.vue')
const Register = () => import('./views/RegisterView.vue')
const AuthLayout = () => import('@/layouts/AuthLayout.vue')

export default [
  {
    path: '/auth',                 // <<--- con slash
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: Login,
        meta: { requiresGuest: true }
      },
      {
        path: 'register',
        name: 'auth.register',
        component: Register,
        meta: { requiresGuest: true }
      },
    ],
  },
]
