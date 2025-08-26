// src/services/util/routeByRole.js
export function routeByRole(role) {
  const home = '/app/factory'  
  const transformer = '/app/transformer'
  const map = {
    FACTORY: transformer,
    CUSTOMER: home,
    ROOT: home,
  }
  return map[role] || '/start'
}
