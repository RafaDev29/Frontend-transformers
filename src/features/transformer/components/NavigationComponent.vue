<template>
  <!-- Breadcrumb Navigation con diseño profesional -->
  <nav 
    class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 mb-1 shadow-sm p-5"
    aria-label="Breadcrumb"
  >
    <ol class="flex items-center space-x-2 text-sm font-medium">
      <template v-for="(item, index) in breadcrumbs" :key="index">
        <li class="flex items-center">
          <!-- Enlaces navegables -->
          <template v-if="index !== breadcrumbs.length - 1">
            <router-link 
              :to="item.path" 
              class="text-slate-600 dark:text-slate-400 hover:text-color1 dark:hover:text-color3 transition-colors duration-200 hover:underline"
            >
              {{ item.label }}
            </router-link>
            
            <!-- Separador -->
            <svg 
              class="mx-2 h-4 w-4 text-slate-400 dark:text-slate-500" 
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
          </template>

          <!-- Página actual (no navegable) -->
          <template v-else>
            <span 
              class="font-semibold text-color1 dark:text-color3"
              aria-current="page"
            >
              {{ item.label }}
            </span>
          </template>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
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
</script>