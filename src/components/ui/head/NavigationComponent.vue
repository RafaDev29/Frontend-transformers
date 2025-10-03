<template>
  <nav 
    class="bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 border-b border-slate-200/60 dark:border-slate-700/60 px-2 sm:px-4 py-1.5 mb-1 shadow-sm backdrop-blur-sm transition-all duration-300"
    aria-label="Breadcrumb"
  >
    <!-- Vista móvil: Solo último item con botón de volver -->
    <div class="flex items-center justify-between sm:hidden">
      <button
        v-if="filteredBreadcrumbs.length > 1"
        @click="goBack"
        class="flex items-center gap-1.5 px-2 py-1 rounded-md text-slate-600 dark:text-slate-300 hover:text-color1 dark:hover:text-color3 transition-all duration-300 hover:bg-gradient-to-r hover:from-color1/5 hover:to-transparent dark:hover:from-color3/8"
        aria-label="Volver"
      >
        <svg 
          class="h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
        <span class="text-xs font-medium">Volver</span>
      </button>
      
      <span 
        class="px-2 py-1 text-xs font-semibold text-color1 dark:text-color3 bg-gradient-to-r from-color1/8 to-transparent dark:from-color3/12 border border-color1/15 dark:border-color3/20 rounded-lg truncate max-w-[200px]"
      >
        {{ filteredBreadcrumbs[filteredBreadcrumbs.length - 1]?.label }}
      </span>
    </div>

    <!-- Vista tablet/desktop: Breadcrumb completo con scroll horizontal -->
    <div class="hidden sm:block overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
      <ol class="flex items-center space-x-2 text-sm font-medium min-w-max">
        <template v-for="(item, index) in filteredBreadcrumbs" :key="index">
          <li class="flex items-center flex-shrink-0">
            <template v-if="index !== filteredBreadcrumbs.length - 1">
              <router-link 
                :to="item.path" 
                class="relative px-2 py-1 rounded-md text-slate-600 dark:text-slate-300 hover:text-color1 dark:hover:text-color3 transition-all duration-300 hover:bg-gradient-to-r hover:from-color1/5 hover:via-color2/3 hover:to-transparent dark:hover:from-color3/8 dark:hover:via-color4/5 dark:hover:to-transparent hover:shadow-sm group whitespace-nowrap"
              >
                <span class="relative z-10">{{ item.label }}</span>
                <span class="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-color1 to-color2 dark:from-color3 dark:to-color4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </router-link>
              <div class="mx-2 flex items-center justify-center flex-shrink-0">
                <svg 
                  class="h-4 w-4 text-slate-400/70 dark:text-slate-500/70 transition-colors duration-300" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path 
                    fill-rule="evenodd" 
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" 
                    clip-rule="evenodd" 
                  />
                </svg>
              </div>
            </template>
            <template v-else>
              <span 
                class="relative px-3 py-1.5 font-semibold text-color1 dark:text-color3 bg-gradient-to-r from-color1/8 via-color2/5 to-transparent dark:from-color3/12 dark:via-color4/8 dark:to-transparent border border-color1/15 dark:border-color3/20 rounded-lg shadow-sm backdrop-blur-sm whitespace-nowrap"
                aria-current="page"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-color1/10 via-color2/6 to-transparent dark:from-color3/15 dark:via-color4/10 dark:to-transparent rounded-lg opacity-50"></div>
                <span class="relative z-10">{{ item.label }}</span>
              </span>
            </template>
          </li>
        </template>
      </ol>
    </div>
  </nav>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/authStore'

const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(item => 
        item && 
        typeof item.label === 'string' && 
        typeof item.path === 'string'
      )
    }
  }
})

const router = useRouter()
const auth = useAuthStore()

// Filtrar según role
const filteredBreadcrumbs = computed(() => {
  if (!auth.user) return props.breadcrumbs

  const role = auth.user.role

  if (role === 'FACTORY' || role === 'CUSTOMER') {
    return props.breadcrumbs.filter(b => b.label !== 'Panel de Fábrica')
  }

  return props.breadcrumbs
})

// Función para volver atrás
const goBack = () => {
  if (filteredBreadcrumbs.value.length > 1) {
    const previousItem = filteredBreadcrumbs.value[filteredBreadcrumbs.value.length - 2]
    router.push(previousItem.path)
  }
}
</script>

<style scoped>
/* Mejoras de rendimiento */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
}

/* Transiciones suaves */
.group:hover .transform {
  transform-origin: left;
}

/* Scroll suave */
html {
  scroll-behavior: smooth;
}

/* Estilos personalizados para scrollbar (opcional) */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-slate-300::-webkit-scrollbar-thumb {
  background-color: rgb(203 213 225);
  border-radius: 9999px;
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
  background-color: transparent;
}

.dark .scrollbar-thumb-slate-600::-webkit-scrollbar-thumb {
  background-color: rgb(71 85 105);
}

::-webkit-scrollbar {
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(203 213 225);
  border-radius: 9999px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

.dark ::-webkit-scrollbar-thumb {
  background-color: rgb(71 85 105);
}
</style>