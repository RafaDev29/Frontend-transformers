<template>
  <nav 
    class="bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 border-b border-slate-200/60 dark:border-slate-700/60 px-4 py-1.5 mb-1 shadow-sm backdrop-blur-sm transition-all duration-300"
    aria-label="Breadcrumb"
  >
    <ol class="flex items-center space-x-2 text-sm font-medium">
      <template v-for="(item, index) in filteredBreadcrumbs" :key="index">
        <li class="flex items-center">
          <template v-if="index !== breadcrumbs.length - 1">
            <router-link 
              :to="item.path" 
              class="relative px-2 py-1 rounded-md text-slate-600 dark:text-slate-300 hover:text-color1 dark:hover:text-color3 transition-all duration-300 hover:bg-gradient-to-r hover:from-color1/5 hover:via-color2/3 hover:to-transparent dark:hover:from-color3/8 dark:hover:via-color4/5 dark:hover:to-transparent hover:shadow-sm group"
            >
              <span class="relative z-10">{{ item.label }}</span>
              <span class="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-color1 to-color2 dark:from-color3 dark:to-color4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </router-link>
            <div class="mx-2 flex items-center justify-center">
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
              class="relative px-3 py-1.5 font-semibold text-color1 dark:text-color3 bg-gradient-to-r from-color1/8 via-color2/5 to-transparent dark:from-color3/12 dark:via-color4/8 dark:to-transparent border border-color1/15 dark:border-color3/20 rounded-lg shadow-sm backdrop-blur-sm"
              aria-current="page"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-color1/10 via-color2/6 to-transparent dark:from-color3/15 dark:via-color4/10 dark:to-transparent rounded-lg opacity-50"></div>
              <span class="relative z-10">{{ item.label }}</span>
            </span>
          </template>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup>
import { defineProps, computed } from 'vue'
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

const auth = useAuthStore()

// Filtrar según role
const filteredBreadcrumbs = computed(() => {
  if (!auth.user) return props.breadcrumbs

  const role = auth.user.role // 👈 asumiendo que tu user tiene la propiedad "role"

  if (role === 'FACTORY' || role === 'CUSTOMER') {
    return props.breadcrumbs.filter(b => b.label !== 'Panel de Fábrica')
  }

  return props.breadcrumbs
})
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
</style>