// src/services/util/routeByRole.js
export function routeByRole(role) {
  const home = '/app/factory'  
  const transformer = '/app/transformer'
  const transformer2 = '/app/transformer'
  const map = {
    FACTORY: transformer,
    CUSTOMER: transformer2,
    ROOT: home,
  }
  return map[role] || '/start'
}
