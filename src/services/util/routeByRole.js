export function routeByRole(role) {
  const map = {
    ADMIN: '/admin',
    CUSTOMER: '/power',
    OPERATOR: '/monitor',
    ROOT: '/power',
  }
  return map[role] || '/start'
}
