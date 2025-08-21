// src/services/util/routeByRole.js
export function routeByRole(role) {
  const home = '/app/welcome'  
  const transformer = '/app/transformer'
  const map = {
    MASTER: transformer,
    CUSTOMER: home,
    ROOT: home,
  }
  return map[role] || '/start'
}
