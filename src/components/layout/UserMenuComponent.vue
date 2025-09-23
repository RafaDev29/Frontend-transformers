<template>
  <!-- Overlay transparente cuando está abierto -->
  <div v-if="open" class="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-40 transition-all duration-300"
    @click="closeMenu">
  </div>

  <div
    class="bg-gradient-to-br from-color5/15 via-color4/8 to-transparent dark:from-color3/20 dark:via-color2/15 dark:to-transparent border border-color4/20 dark:border-color3/30 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-color3/30 dark:hover:border-color4/40 hover:shadow-lg hover:shadow-color1/8 dark:hover:shadow-color3/10 relative z-50 overflow-hidden"
    :class="{
      'glass-effect-spotlight': open
    }">
    
    <!-- Header del usuario con diseño distintivo -->
    <div class="relative bg-gradient-to-r from-slate-50/80 via-white/60 to-slate-50/80 dark:from-slate-800/60 dark:via-slate-700/40 dark:to-slate-800/60 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-600/40 p-3 rounded-t-2xl">
      <!-- Decoración superior sutil -->
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-color1/20 dark:via-color3/30 to-transparent"></div>
      
      <div class="flex items-center gap-3">
        <div
          class="relative w-11 h-11 bg-gradient-to-br from-color3 to-color1 dark:from-color4 dark:to-color2 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-color1/30 dark:shadow-color3/40 border-2 border-white/95 dark:border-slate-200/25 ring-2 ring-color1/20 dark:ring-color3/30">
          <span class="text-white font-bold text-lg drop-shadow-md">
            {{ user?.username?.charAt(0).toUpperCase() }}
          </span>

          <div
            class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-gradient-to-br from-accent-success to-green-500 dark:from-green-400 dark:to-green-300 border-2 border-white dark:border-slate-800 rounded-full shadow-lg animate-pulse">
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <div class="text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-1 mb-1 tracking-wide">
            {{ user?.username }}
          </div>
          <div class="text-xs text-slate-600 dark:text-slate-300 font-semibold uppercase tracking-wider bg-slate-200/70 dark:bg-slate-600/50 px-2 py-0.5 rounded-full inline-block">
            {{ user?.role }}
          </div>
        </div>

        <!-- Botón toggle con diseño más elegante -->
        <button @click="toggleMenu"
          class="w-8 h-8 bg-gradient-to-br from-slate-200/80 via-white/90 to-slate-100/80 dark:from-slate-600/60 dark:via-slate-500/40 dark:to-slate-600/60 border border-slate-300/70 dark:border-slate-500/50 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-slate-300/80 hover:via-slate-100/90 hover:to-slate-200/80 dark:hover:from-slate-500/60 dark:hover:via-slate-400/40 dark:hover:to-slate-500/60 hover:border-slate-400/80 dark:hover:border-slate-400/60 hover:scale-110 hover:shadow-lg shadow-slate-400/20 dark:shadow-slate-600/30 flex-shrink-0">
          <svg viewBox="0 0 24 24" class="w-4 h-4 text-slate-600 dark:text-slate-300 transition-transform duration-300 ease-out"
            :class="{ 'rotate-180': open }">
            <path d="M7 14l5-5 5 5z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Separador decorativo -->
    <div v-if="open" class="px-3 py-1">
      <div class="relative flex items-center">
        <div class="flex-grow h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-600/60 to-transparent"></div>
        <div class="px-3">
          <div class="w-2 h-2 bg-gradient-to-br from-color1/40 to-color2/40 dark:from-color3/40 dark:to-color4/40 rounded-full"></div>
        </div>
        <div class="flex-grow h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-600/60 to-transparent"></div>
      </div>
    </div>

    <!-- Menú de opciones -->
    <v-expand-transition>
      <div v-show="open" class="px-3 pb-3 space-y-1 animate-fade-in">

        <button @click="$emit('profile')"
          class="w-full flex items-center gap-2.5 p-2.5 border border-color1/10 dark:border-color3/20 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-color1/8 via-color2/5 to-transparent dark:from-color3/12 dark:via-color4/8 dark:to-transparent text-color1 dark:text-color3 hover:from-color1/12 hover:via-color2/8 hover:to-transparent dark:hover:from-color3/15 dark:hover:via-color4/12 dark:hover:to-transparent hover:border-color1/20 dark:hover:border-color3/30 hover:translate-x-1 group">
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out">
          </div>

          <div
            class="w-8 h-8 bg-gradient-to-br from-color1 to-colorDark1 dark:from-color2 dark:to-color3 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md shadow-color1/25 dark:shadow-color3/25 relative z-10">
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-white">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="currentColor" />
            </svg>
          </div>
          <span class="text-sm font-semibold flex-1 text-left relative z-10">Mi Perfil</span>
        </button>

        <button @click="$emit('soporte')"
          class="w-full flex items-center gap-2.5 p-2.5 border border-color1/10 dark:border-color3/20 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-color1/8 via-color2/5 to-transparent dark:from-color3/12 dark:via-color4/8 dark:to-transparent text-color1 dark:text-color3 hover:from-color1/12 hover:via-color2/8 hover:to-transparent dark:hover:from-color3/15 dark:hover:via-color4/12 dark:hover:to-transparent hover:border-color1/20 dark:hover:border-color3/30 hover:translate-x-1 group">

          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out">
          </div>

          <div
            class="w-8 h-8 bg-gradient-to-br from-color1 to-colorDark1 dark:from-color2 dark:to-color3 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md shadow-color1/25 dark:shadow-color3/25 relative z-10">
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-white">
              <path fill="currentColor"
                d="M12 1a9 9 0 0 0-9 9v6a3 3 0 0 0 3 3h1v-7H6V10a6 6 0 0 1 12 0v2h-1v7h1a3 3 0 0 0 3-3v-6a9 9 0 0 0-9-9Zm-3 12h6v5H9v-5Z" />
            </svg>
          </div>

          <span class="text-sm font-semibold flex-1 text-left relative z-10">Soporte</span>
        </button>

        <button @click="toggleTheme"
          class="w-full flex items-center gap-2.5 p-2.5 border border-color3/15 dark:border-color4/25 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-color3/8 via-color4/5 to-transparent dark:from-color4/12 dark:via-color5/8 dark:to-transparent text-color2 dark:text-color4 hover:from-color3/12 hover:via-color4/8 hover:to-transparent dark:hover:from-color4/15 dark:hover:via-color5/12 dark:hover:to-transparent hover:border-color3/25 dark:hover:border-color4/35 hover:translate-x-1 group">
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out">
          </div>

          <div
            class="w-8 h-8 bg-gradient-to-br from-color3 to-color4 dark:from-color4 dark:to-color5 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md shadow-color3/25 dark:shadow-color4/25 relative z-10">

            <svg v-if="!isDarkMode" viewBox="0 0 24 24" class="w-4 h-4 text-white">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
            </svg>

            <svg v-else viewBox="0 0 24 24" class="w-4 h-4 text-white">
              <path
                d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
                fill="currentColor" />
            </svg>
          </div>
          <span class="text-sm font-semibold flex-1 text-left relative z-10">
            {{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}
          </span>
          <!-- Toggle Switch -->
          <div
            class="w-5 h-3 bg-slate-300 dark:bg-gray-600 rounded-full relative transition-colors duration-300 flex-shrink-0 relative z-10"
            :class="{ 'bg-color2 dark:bg-color3': isDarkMode }">
            <div
              class="absolute top-0.5 left-0.5 w-2 h-2 bg-white rounded-full shadow-sm transition-transform duration-300 transform"
              :class="{ 'translate-x-2': isDarkMode }"></div>
          </div>
        </button>

        <!-- Separador antes del logout -->
        <div class="flex items-center justify-center py-2">
          <div class="w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-gray-600 to-transparent">
          </div>
        </div>

        <button @click="$emit('logout')"
          class="w-full flex items-center gap-2.5 p-2.5 border border-accent-danger/15 dark:border-red-400/25 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-accent-danger/8 via-red-500/5 to-transparent dark:from-red-400/12 dark:via-red-300/8 dark:to-transparent text-accent-danger dark:text-red-400 hover:from-accent-danger/12 hover:via-red-500/8 hover:to-transparent dark:hover:from-red-400/15 dark:hover:via-red-300/12 dark:hover:to-transparent hover:border-accent-danger/25 dark:hover:border-red-400/35 hover:translate-x-1 group">

          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out">
          </div>

          <div
            class="w-8 h-8 bg-gradient-to-br from-accent-danger to-red-600 dark:from-red-500 dark:to-red-400 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md shadow-accent-danger/25 dark:shadow-red-400/25 relative z-10">
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-white">
              <path
                d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                fill="currentColor" />
            </svg>
          </div>
          <span class="text-sm font-semibold flex-1 text-left relative z-10">Cerrar Sesión</span>
        </button>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted, watch } from 'vue'

defineProps({
  user: { type: Object, default: null },
})

const emit = defineEmits(['profile', 'logout', 'theme-toggle', 'soporte', 'menu-toggle'])

const open = ref(false)
const isDarkMode = ref(false)

onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
})

watch(open, (newValue) => {
  emit('menu-toggle', newValue)
})

function toggleMenu() {
  open.value = !open.value
}

function closeMenu() {
  open.value = false
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
  const htmlEl = document.documentElement
  if (isDarkMode.value) {
    htmlEl.classList.add('dark')
  } else {
    htmlEl.classList.remove('dark')
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.glass-effect-spotlight {
  position: relative;
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 30px rgba(255, 255, 255, 0.2) !important;
  z-index: 60 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.dark .glass-effect-spotlight {
  background: rgba(30, 41, 59, 0.95) !important;
  border: 2px solid rgba(148, 163, 184, 0.2) !important;
  box-shadow:
    0 0 0 1px rgba(148, 163, 184, 0.1),
    0 25px 50px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(148, 163, 184, 0.15) !important;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
}

.rotate-180 {
  transform: rotate(180deg);
}

html {
  scroll-behavior: smooth;
}
</style>