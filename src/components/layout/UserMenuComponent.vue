<template>
  <div v-if="open" class="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-40 transition-all duration-300"
    @click="closeMenu">
  </div>

  <div
    class="bg-gradient-to-br from-color5/15 via-color4/8 to-transparent dark:from-color3/20 dark:via-color2/15 dark:to-transparent border border-color4/20 dark:border-color3/30 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-color3/30 dark:hover:border-color4/40 hover:shadow-lg hover:shadow-color1/8 dark:hover:shadow-color3/10 relative z-50 overflow-hidden"
    :class="{
      'glass-effect-spotlight': open,
      'rail-mode': rail
    }">

    <!-- Header completo para modo normal -->
    <div v-if="!rail"
      class="relative bg-gradient-to-r from-slate-50/80 via-white/60 to-slate-50/80 dark:from-slate-800/60 dark:via-slate-700/40 dark:to-slate-800/60 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-600/40 p-3 rounded-t-2xl">

      <div
        class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-color1/20 dark:via-color3/30 to-transparent">
      </div>

      <div class="flex items-center gap-1">
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
          <div
            class="text-xs text-slate-600 dark:text-slate-300 font-semibold uppercase tracking-wider bg-slate-200/70 dark:bg-slate-600/50 px-2 py-0.5 rounded-full inline-block">
            {{ user?.role }}
          </div>
        </div>

        <button @click="toggleMenu"
          class="w-8 h-8 bg-gradient-to-br from-slate-200/80 via-white/90 to-slate-100/80 dark:from-slate-600/60 dark:via-slate-500/40 dark:to-slate-600/60 border border-slate-300/70 dark:border-slate-500/50 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-slate-300/80 hover:via-slate-100/90 hover:to-slate-200/80 dark:hover:from-slate-500/60 dark:hover:via-slate-400/40 dark:hover:to-slate-500/60 hover:border-slate-400/80 dark:hover:border-slate-400/60 hover:scale-110 hover:shadow-lg shadow-slate-400/20 dark:shadow-slate-600/30 flex-shrink-0">
          <svg viewBox="0 0 24 24"
            class="w-4 h-4 text-slate-600 dark:text-slate-300 transition-transform duration-300 ease-out"
            :class="{ 'rotate-180': open }">
            <path :d="$icons.arrow" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Versión minimizada para rail mode -->
    <div v-if="rail && !open" @click.stop="toggleMenu"
      class="relative bg-gradient-to-r from-slate-50/80 via-white/60 to-slate-50/80 dark:from-slate-800/60 dark:via-slate-700/40 dark:to-slate-800/60 backdrop-blur-md p-2 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300">
      <div
        class="relative w-11 h-11 bg-gradient-to-br from-color3 to-color1 dark:from-color4 dark:to-color2 rounded-xl flex items-center justify-center shadow-xl shadow-color1/30 dark:shadow-color3/40 border-2 border-white/95 dark:border-slate-200/25">
        <span class="text-white font-bold text-lg drop-shadow-md">
          {{ user?.username?.charAt(0).toUpperCase() }}
        </span>
        <div
          class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-gradient-to-br from-accent-success to-green-500 dark:from-green-400 dark:to-green-300 border-2 border-white dark:border-slate-800 rounded-full shadow-lg animate-pulse">
        </div>
      </div>
    </div>

    <div v-if="!rail && open" class="px-3 py-1">
      <div class="relative flex items-center">
        <div
          class="flex-grow h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-600/60 to-transparent">
        </div>
        <div class="px-3">
          <div
            class="w-2 h-2 bg-gradient-to-br from-color1/40 to-color2/40 dark:from-color3/40 dark:to-color4/40 rounded-full">
          </div>
        </div>
        <div
          class="flex-grow h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-600/60 to-transparent">
        </div>
      </div>
    </div>

    <v-expand-transition>
      <div v-show="open" class="px-3 pb-3 space-y-1 animate-fade-in" :class="{ 'rail-menu': rail }">

        <!-- Versión compacta para rail mode -->
        <template v-if="rail">
          <v-tooltip :disabled="isTouchDevice" text="Mi Perfil" location="end">
            <template #activator="{ props: tooltipProps }">
              <button v-bind="tooltipProps" @click="$emit('profile')"
                class="w-full flex items-center justify-center p-2.5 border border-color1/10 dark:border-color3/20 rounded-xl cursor-pointer transition-all duration-300 bg-gradient-to-r from-color1/8 to-transparent dark:from-color3/12 dark:to-transparent hover:from-color1/12 dark:hover:from-color3/15 hover:scale-110">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-color1 to-colorDark1 dark:from-color2 dark:to-color3 rounded-lg flex items-center justify-center shadow-md">
                  <svg viewBox="0 0 24 24" class="w-4 h-4 text-white">
                    <path :d="$icons.account" fill="currentColor" />
                  </svg>
                </div>
              </button>
            </template>
          </v-tooltip>

          <v-tooltip :disabled="isTouchDevice" text="Soporte" location="end">
            <template #activator="{ props: tooltipProps }">
              <button v-bind="tooltipProps" @click="$emit('support')"
                class="w-full flex items-center justify-center p-2.5 border border-color1/10 dark:border-color3/20 rounded-xl cursor-pointer transition-all duration-300 bg-gradient-to-r from-color1/8 to-transparent dark:from-color3/12 dark:to-transparent hover:from-color1/12 dark:hover:from-color3/15 hover:scale-110">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-color1 to-colorDark1 dark:from-color2 dark:to-color3 rounded-lg flex items-center justify-center shadow-md">
                  <svg viewBox="0 0 24 24" class="w-4 h-4 text-white">
                    <path :d="$icons.support" fill="currentColor" />
                  </svg>
                </div>
              </button>
            </template>
          </v-tooltip>

          <v-tooltip :disabled="isTouchDevice" :text="isDarkMode ? 'Modo Claro' : 'Modo Oscuro'" location="end">
            <template #activator="{ props: tooltipProps }">
              <button v-bind="tooltipProps" @click="toggleTheme"
                class="w-full flex items-center justify-center p-2.5 border border-color3/15 dark:border-color4/25 rounded-xl cursor-pointer transition-all duration-300 bg-gradient-to-r from-color3/8 to-transparent dark:from-color4/12 dark:to-transparent hover:from-color3/12 dark:hover:from-color4/15 hover:scale-110">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-color3 to-color4 dark:from-color4 dark:to-color5 rounded-lg flex items-center justify-center shadow-md">
                  <svg v-if="!isDarkMode" viewBox="0 0 24 24" class="w-4 h-4 text-white">
                    <path :d="$icons.dark" fill="currentColor" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" class="w-4 h-4 text-white">
                    <path :d="$icons.sun" fill="currentColor" />
                  </svg>
                </div>
              </button>
            </template>
          </v-tooltip>

          <div class="flex items-center justify-center py-2">
            <div class="w-8 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-gray-600 to-transparent">
            </div>
          </div>

          <v-tooltip text="Cerrar Sesión" location="end">
            <template #activator="{ props: tooltipProps }">
              <button v-bind="tooltipProps" @click="$emit('logout')"
                class="w-full flex items-center justify-center p-2.5 border border-accent-danger/15 dark:border-red-400/25 rounded-xl cursor-pointer transition-all duration-300 bg-gradient-to-r from-accent-danger/8 to-transparent dark:from-red-400/12 dark:to-transparent hover:from-accent-danger/12 dark:hover:from-red-400/15 hover:scale-110">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-accent-danger to-red-600 dark:from-red-500 dark:to-red-400 rounded-lg flex items-center justify-center shadow-md">
                  <svg viewBox="0 0 24 24" class="w-4 h-4 text-white">
                    <path :d="$icons.off" fill="currentColor" />
                  </svg>
                </div>
              </button>
            </template>
          </v-tooltip>
        </template>

        <!-- Versión completa para modo normal -->
        <template v-else>
          <button @click="$emit('profile')"
            class="w-full flex items-center gap-2.5 p-2.5 border border-color1/10 dark:border-color3/20 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-color1/8 via-color2/5 to-transparent dark:from-color3/12 dark:via-color4/8 dark:to-transparent text-color1 dark:text-color3 hover:from-color1/12 hover:via-color2/8 hover:to-transparent dark:hover:from-color3/15 dark:hover:via-color4/12 dark:hover:to-transparent hover:border-color1/20 dark:hover:border-color3/30 hover:translate-x-1 group">
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out">
            </div>

            <div
              class="w-8 h-8 bg-gradient-to-br from-color1 to-colorDark1 dark:from-color2 dark:to-color3 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md shadow-color1/25 dark:shadow-color3/25 relative z-10">
              <svg viewBox="0 0 24 24" class="w-4 h-4 text-white">
                <path :d="$icons.account" fill="currentColor" />
              </svg>
            </div>
            <span class="text-sm font-semibold flex-1 text-left relative z-10">Mi Perfil</span>
          </button>

          <button @click="$emit('support')"
            class="w-full flex items-center gap-2.5 p-2.5 border border-color1/10 dark:border-color3/20 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-color1/8 via-color2/5 to-transparent dark:from-color3/12 dark:via-color4/8 dark:to-transparent text-color1 dark:text-color3 hover:from-color1/12 hover:via-color2/8 hover:to-transparent dark:hover:from-color3/15 dark:hover:via-color4/12 dark:hover:to-transparent hover:border-color1/20 dark:hover:border-color3/30 hover:translate-x-1 group">

            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out">
            </div>

            <div
              class="w-8 h-8 bg-gradient-to-br from-color1 to-colorDark1 dark:from-color2 dark:to-color3 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md shadow-color1/25 dark:shadow-color3/25 relative z-10">
              <svg viewBox="0 0 24 24" class="w-4 h-4 text-white">
                <path :d="$icons.support" fill="currentColor" />
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
                <path :d="$icons.dark" fill="currentColor" />
              </svg>

              <svg v-else viewBox="0 0 24 24" class="w-4 h-4 text-white">
                <path :d="$icons.sun" fill="currentColor" />
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
                <path :d="$icons.off" fill="currentColor" />
              </svg>
            </div>
            <span class="text-sm font-semibold flex-1 text-left relative z-10">Cerrar Sesión</span>
          </button>
        </template>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted, watch, computed } from 'vue'

defineProps({
  user: { type: Object, default: null },
  rail: { type: Boolean, default: false }
})
const isTouchDevice = computed(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0)
const emit = defineEmits(['profile', 'logout', 'theme-toggle', 'support', 'menu-toggle'])

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
  htmlEl.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}


onMounted(() => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDarkMode.value = prefersDark
  }
  document.documentElement.classList.toggle('dark', isDarkMode.value)

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const updateTheme = e => {
    if (!localStorage.getItem('theme')) {
      isDarkMode.value = e.matches
      document.documentElement.classList.toggle('dark', e.matches)
    }
  }
  mediaQuery.addEventListener('change', updateTheme)
})

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

.rail-mode {
  width: fit-content !important;
  min-width: 60px;
}

.rail-menu {
  padding: 0.5rem !important;
  min-width: 60px;
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