<template>
  <v-app>
    <Navbar v-if="shouldShowNavbar" />

    <router-view />

    <SuccessAlert />
    <ErrorAlert />
    <WarningAlert />
    <LoadingAlert />
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


const route = useRoute()
const router = useRouter()
const auth = useAuthStore()


const shouldShowNavbar = computed(() => route.path !== '/auth/login')

const IDLE_TIMEOUT = 10 * 60 * 1000 
const WARNING_DISPLAY_TIME = 30 * 1000 

let idleTimer = null
let warningTimer = null

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


const logout = () => {
  auth.clearSession() 
  localStorage.clear()
  router.push('/auth/login').then(() => {
    location.reload()
  })
}

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


eventBus.on('keep-alive', () => {
  if (auth.isAuthenticated) resetTimer()
})

eventBus.on('force-logout', logout)

watch(() => auth.isAuthenticated, (isAuth) => {
  if (isAuth) startTracking()
  else stopTracking()
})

onMounted(() => {
  if (auth.isAuthenticated) startTracking()
})

onUnmounted(stopTracking)
</script>

<style></style>
