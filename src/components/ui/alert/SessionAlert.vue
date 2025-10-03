<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import eventBus from '@/plugins/eventBus'
import { useAuthStore } from '@/features/auth/stores/authStore'

const auth = useAuthStore()

const show = ref(false)
const countdown = ref(0)
let countdownInterval = null

// Mostrar alerta con countdown
const showWarning = () => {
  if (auth.isAuthenticated) {
    countdown.value = 30 // segundos hasta logout
    show.value = true

    clearInterval(countdownInterval)
    countdownInterval = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--
      } else {
        clearInterval(countdownInterval)
        show.value = false
        eventBus.emit('force-logout') // logout automático
      }
    }, 1000)
  }
}

// Ocultar manualmente
const hide = () => {
  show.value = false
  clearInterval(countdownInterval)
}

onMounted(() => {
  eventBus.on('session-timeout-warning', showWarning)
  eventBus.on('keep-alive', hide)
})

onUnmounted(() => {
  eventBus.off('session-timeout-warning', showWarning)
  eventBus.off('keep-alive', hide)
  clearInterval(countdownInterval)
})
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50"
  >
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full p-6 animate-fade-in"
    >
      <!-- Header -->
      <div class="flex items-center gap-2 text-accent-primary">
        <svg viewBox="0 0 24 24" class="h-6 w-6">
          <path :d="$icons.alert" fill="currentColor" />
        </svg>
        <h2 class="text-lg font-semibold">Sesión por expirar</h2>
      </div>

      <!-- Content -->
      <p class="mt-3 text-slate-600 dark:text-slate-300">
        Tu sesión está a punto de expirar por inactividad.
      </p>
      <p class="mt-2 flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
        <svg viewBox="0 0 24 24" class="h-5 w-5 text-accent-primary">
          <path :d="$icons.timer" fill="currentColor" />
        </svg>
        Cierre automático en 
        <span class="text-accent-success font-bold">{{ countdown }}</span> segundos.
      </p>

      <!-- Actions -->
      <div class="mt-6 flex justify-end gap-3">
        <button
          @click="eventBus.emit('keep-alive'); hide()"
          class="px-4 py-2 rounded-xl bg-accent-success text-white hover:opacity-90 transition"
        >
          Mantener sesión
        </button>
        <button
          @click="eventBus.emit('force-logout')"
          class="px-4 py-2 rounded-xl bg-accent-danger text-white hover:opacity-90 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
