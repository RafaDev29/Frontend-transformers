import { useAuthStore } from '@/features/auth/stores/authStore'
import { routeByRole } from '@/services/util/routeByRole'

export function authGuard(to) {
  const auth = useAuthStore()
  const isAuth = auth.isAuthenticated || auth.isLogin
  const role   = auth.user?.role
  const home   = routeByRole(role)

  // Si requiere sesión y no la hay → login con redirect
  if (to.meta?.requiresAuth && !isAuth) {
    return { name: 'auth.login', query: { redirect: to.fullPath } }
  }

  // Si es ruta de invitados y ya hay sesión → manda al home por rol (o redirect si vino)
  if (to.meta?.requiresGuest && isAuth) {
    return { path: to.query.redirect || home }
  }

  // Si la ruta define roles permitidos, verifica
  if (to.meta?.roles && Array.isArray(to.meta.roles)) {
    if (!role || !to.meta.roles.includes(role)) {
      // sin permiso → al home por rol (o 403 si prefieres)
      return { path: home }
    }
  }

  // Si cae a "/" (o a /auth base) y ya está logueado → home por rol
  if ((to.path === '/' || to.path === '/auth') && isAuth) {
    return { path: home }
  }

  return true
}
