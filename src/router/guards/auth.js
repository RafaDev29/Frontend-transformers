// src/router/guards/auth.js
import { useAuthStore } from '@/features/auth/stores/authStore'
import { routeByRole } from '@/services/util/routeByRole'

export function authGuard(to) {
  const auth = useAuthStore()
  const isAuth = auth.isAuthenticated || auth.isLogin
  const role   = auth.user?.role
  const home   = routeByRole(role)

  const requiresAuth  = !!to.meta?.requiresAuth
  const isGuestOnly   = !!to.meta?.requiresGuest
  const declaresRoles = Array.isArray(to.meta?.roles)

  // 1) privada sin sesión -> login
  if (requiresAuth && !isAuth) {
    return { name: 'auth.login', query: { redirect: to.fullPath } }
  }

  // 2) ya hay sesión
  if (isAuth) {
    // público/guest -> a home por rol (si no estamos ya ahí)
    if (isGuestOnly || !requiresAuth) {
      if (to.path !== home) return { path: home }
      return true
    }
    // roles no permitidos -> a home por rol
    if (declaresRoles && (!role || !to.meta.roles.includes(role))) {
      if (to.path !== home) return { path: home }
      return true
    }
  }

  // 3) si cae a "/" o "/auth" logueado -> home por rol
  if (isAuth && (to.path === '/' || to.path === '/auth')) {
    if (to.path !== home) return { path: home }
    return true
  }

  return true
}
