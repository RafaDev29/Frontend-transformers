<template>
  <div
    class="bg-gradient-to-br from-color5/15 via-color4/8 to-transparent dark:from-color3/20 dark:via-color2/15 dark:to-transparent border border-color4/20 dark:border-color3/30 rounded-2xl p-3 backdrop-blur-sm transition-all duration-300 hover:border-color3/30 dark:hover:border-color4/40 hover:shadow-lg hover:shadow-color1/8 dark:hover:shadow-color3/10">
    <!-- Header compacto -->
    <div class="flex items-center gap-2.5">
      <div
        class="relative w-10 h-10 bg-gradient-to-br from-color3 to-color1 dark:from-color4 dark:to-color2 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-color1/20 dark:shadow-color3/25 border-2 border-white/90 dark:border-gray-200/20">
        <span class="text-white font-bold text-base drop-shadow-sm">
          {{ user?.username?.charAt(0).toUpperCase() }}
        </span>
        <!-- Status indicator -->
        <div
          class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-br from-accent-success to-green-500 dark:from-green-400 dark:to-green-300 border-2 border-white dark:border-gray-800 rounded-full shadow-sm">
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <div class="text-sm font-semibold text-slate-700 dark:text-gray-200 line-clamp-1 mb-0.5">
          {{ user?.username }}
        </div>
        <div class="text-xs text-slate-500 dark:text-gray-400 font-medium">
          {{ user?.role }}
        </div>
      </div>

      <!-- Botón toggle elegante -->
      <button @click="open = !open"
        class="w-7 h-7 bg-gradient-to-br from-color1/10 via-color2/8 to-transparent dark:from-color3/15 dark:via-color4/12 dark:to-transparent border border-color1/15 dark:border-color3/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-color1/15 hover:via-color2/12 hover:to-transparent dark:hover:from-color3/20 dark:hover:via-color4/15 dark:hover:to-transparent hover:border-color1/25 dark:hover:border-color3/30 hover:scale-105 flex-shrink-0">
        <svg viewBox="0 0 24 24" class="w-4 h-4 text-color1 dark:text-color3 transition-transform duration-300 ease-out"
          :class="{ 'rotate-180': open }">
          <path d="M7 14l5-5 5 5z" fill="currentColor" />
        </svg>
      </button>
    </div>

    <!-- Panel de acciones expandible -->
    <v-expand-transition>
      <div v-show="open" class="mt-3 pt-2 space-y-1 animate-fade-in">
        <!-- Perfil -->
        <button @click="$emit('profile')"
          class="w-full flex items-center gap-2.5 p-2.5 border border-color1/10 dark:border-color3/20 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-color1/8 via-color2/5 to-transparent dark:from-color3/12 dark:via-color4/8 dark:to-transparent text-color1 dark:text-color3 hover:from-color1/12 hover:via-color2/8 hover:to-transparent dark:hover:from-color3/15 dark:hover:via-color4/12 dark:hover:to-transparent hover:border-color1/20 dark:hover:border-color3/30 hover:translate-x-1 group">
          <!-- Efecto shimmer -->
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

        <!-- Toggle Modo Oscuro/Claro -->
        <button @click="toggleTheme"
          class="w-full flex items-center gap-2.5 p-2.5 border border-color3/15 dark:border-color4/25 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-color3/8 via-color4/5 to-transparent dark:from-color4/12 dark:via-color5/8 dark:to-transparent text-color2 dark:text-color4 hover:from-color3/12 hover:via-color4/8 hover:to-transparent dark:hover:from-color4/15 dark:hover:via-color5/12 dark:hover:to-transparent hover:border-color3/25 dark:hover:border-color4/35 hover:translate-x-1 group">
          <!-- Efecto shimmer -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out">
          </div>

          <div
            class="w-8 h-8 bg-gradient-to-br from-color3 to-color4 dark:from-color4 dark:to-color5 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md shadow-color3/25 dark:shadow-color4/25 relative z-10">
            <!-- Icono Luna (Modo Oscuro) -->
            <svg v-if="!isDarkMode" viewBox="0 0 24 24" class="w-4 h-4 text-white">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
            </svg>
            <!-- Icono Sol (Modo Claro) -->
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

        <!-- Divisor elegante -->
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
import { ref, defineEmits, defineProps, onMounted } from 'vue'

defineProps({
  user: { type: Object, default: null },
})

defineEmits(['profile', 'logout', 'theme-toggle'])

const open = ref(false)
const isDarkMode = ref(false)


onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
})

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
/* Utilidad para line-clamp */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animación para el panel de acciones */
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

/* Mejoras de rendimiento */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
}

/* Rotación suave para el ícono */
.rotate-180 {
  transform: rotate(180deg);
}

/* Scroll suave */
html {
  scroll-behavior: smooth;
}
</style>