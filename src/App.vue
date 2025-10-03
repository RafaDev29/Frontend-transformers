<template>
  <v-app>
    <!-- Navbar visible en todas las rutas excepto /login -->
    <Navbar v-if="shouldShowNavbar" />

    <!-- Rutas -->
    <router-view />

    <!-- Alertas globales -->
    <SuccessAlert />
    <ErrorAlert />
    <WarningAlert />
    <LoadingAlert />

    <!-- Alerta de sesión expirada -->
    <SessionAlert />
  </v-app>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/authStore'
import eventBus from '@/plugins/eventBus'

import SessionAlert from './components/ui/alert/SessionAlert.vue'

import SuccessAlert from '@/components/ui/alert/SuccessAlert.vue'
import ErrorAlert from '@/components/ui/alert/ErrorAlert.vue'
import WarningAlert from '@/components/ui/alert/WarningAlert.vue'
import LoadingAlert from '@/components/ui/alert/LoadingAlert.vue'

// Router y store
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

// Mostrar navbar en todas menos /login
const shouldShowNavbar = computed(() => route.path !== 'auth/login')

// Constantes para tiempo de inactividad
const IDLE_TIMEOUT = 1 * 60 * 1000 // 10 min
const WARNING_DISPLAY_TIME = 10 * 1000 // 30 seg

let idleTimer = null
let warningTimer = null

// Resetear contadores de tiempo
const resetTimer = () => {
  clearTimeout(idleTimer)
  clearTimeout(warningTimer)

  if (!auth.isAuthenticated) return

  idleTimer = setTimeout(() => {
    if (auth.isAuthenticated) {
      eventBus.emit('session-timeout-warning')

      warningTimer = setTimeout(() => {
        if (auth.isAuthenticated) {
          logout()
        }
      }, WARNING_DISPLAY_TIME)
    }
  }, IDLE_TIMEOUT - WARNING_DISPLAY_TIME)
}

// Cerrar sesión
const logout = () => {
  auth.clearSession() // 🔥 Método que deberías tener en tu Pinia store para limpiar token
  localStorage.clear()
  router.push('/login').then(() => {
    location.reload()
  })
}

// Eventos que reinician el temporizador
const startTracking = () => {
  const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'touchmove']
  events.forEach(event => window.addEventListener(event, resetTimer))
  resetTimer()
}

const stopTracking = () => {
  const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'touchmove']
  events.forEach(event => window.removeEventListener(event, resetTimer))
  clearTimeout(idleTimer)
  clearTimeout(warningTimer)
}

// Escuchar eventos externos
eventBus.on('keep-alive', () => {
  if (auth.isAuthenticated) resetTimer()
})

eventBus.on('force-logout', logout)

// Reactividad al login/logout
watch(() => auth.isAuthenticated, (isAuth) => {
  if (isAuth) startTracking()
  else stopTracking()
})

// Al montar componente
onMounted(() => {
  if (auth.isAuthenticated) startTracking()
})

// Limpiar al desmontar
onUnmounted(stopTracking)
</script>

<style></style>
