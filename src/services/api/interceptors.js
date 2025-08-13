import client from './client'
import { useAuthStore } from '@/features/auth/stores/authStore'

export function installInterceptors() {
  client.interceptors.request.use((config) => {
    const auth = useAuthStore()
    if (auth.token) config.headers.Authorization = `Bearer ${auth.token}`
    return config
  })

  client.interceptors.response.use(
    (r) => r,
    async (error) => {
      const { response } = error
      if (response?.status === 401) {
        const auth = useAuthStore()
        auth.logout(true) // true: silencioso
      }
      return Promise.reject(error)
    }
  )
}
