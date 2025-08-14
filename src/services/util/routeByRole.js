// src/services/util/routeByRole.js
export function routeByRole(role) {
  const home = '/app/welcome'        // ← ruta REAL bajo el PrivateLayout
  const map = {
    ADMIN: home,
    CUSTOMER: home,
    OPERATOR: home,
    ROOT: home,
  }
  return map[role] || '/start'
}
