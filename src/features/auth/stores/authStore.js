
import { defineStore } from 'pinia'

const TOKEN_KEY = 'app:token'
const USER_KEY  = 'app:user'
const LOGIN_KEY = 'app:isLogin'  

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token:   localStorage.getItem(TOKEN_KEY) || null,
    user:    JSON.parse(localStorage.getItem(USER_KEY) || 'null'),
    isLogin: JSON.parse(localStorage.getItem(LOGIN_KEY) || 'false'), 
  }),
  getters: {
    isAuthenticated: (s) => !!s.token, 
  },
  actions: {
    setSession({ access_token, user }) {
      this.token   = access_token
      this.user    = user ?? null
      this.isLogin = true                       

      localStorage.setItem(TOKEN_KEY, access_token)
      localStorage.setItem(USER_KEY, JSON.stringify(this.user))
      localStorage.setItem(LOGIN_KEY, JSON.stringify(true)) 
    },
    clearSession() {
      this.token   = null
      this.user    = null
      this.isLogin = false                       

      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      localStorage.setItem(LOGIN_KEY, JSON.stringify(false)) 
    },
    loadSession() {

    },
  },
})
