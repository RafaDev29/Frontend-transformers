
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

  if (requiresAuth && !isAuth) {
    return { name: 'auth.login', query: { redirect: to.fullPath } }
  }


  if (isAuth) {
    if (isGuestOnly || !requiresAuth) {
      if (to.path !== home) return { path: home }
      return true
    }
    if (declaresRoles && (!role || !to.meta.roles.includes(role))) {
      if (to.path !== home) return { path: home }
      return true
    }
  }


  if (isAuth && (to.path === '/' || to.path === '/auth')) {
    if (to.path !== home) return { path: home }
    return true
  }

  return true
}
