<template>
  <div class="bg-gradient-to-r from-color5/20 to-color4/10 rounded-xl p-1 border border-color4/20">
    <!-- Header usuario + botón Ver/Ocultar -->
    <div class="flex items-center gap-2">
      <div class="w-10 h-9 bg-gradient-to-br from-color3 to-color1 rounded-full flex items-center justify-center shadow-sm">
        <span class="text-white font-bold text-sm">
          {{ user?.username?.charAt(0).toUpperCase() }}
        </span>
      </div>
      <div class="flex-1">
        <div class="text-sm font-medium text-slate-700">{{ user?.username }}</div>
        <div class="text-xs text-slate-500">{{ user?.role }}</div>
      </div>

      <!-- Botón VER: único disparador -->
      <button
        class="text-xs px-3 py-3 rounded-md text-color1 hover:bg-color5/50 transition-colors"
        @click="open = !open"
      >
        {{ open ? 'Ocultar' : 'Ver' }}
      </button>
    </div>

    <!-- Acciones: colapsables -->
    <v-expand-transition>
      <div v-show="open" class="mt-3 space-y-2">
        <button
          @click="$emit('profile')"
          class="w-full flex items-center gap-2 p-2 text-left text-sm text-slate-600 hover:text-color1 hover:bg-color5/20 rounded-lg transition-all"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4">
            <path :d="$icons.cog" fill="currentColor" />
          </svg>
          Mi Perfil
        </button>

        <button
          @click="$emit('settings')"
          class="w-full flex items-center gap-2 p-2 text-left text-sm text-slate-600 hover:text-color1 hover:bg-color5/20 rounded-lg transition-all"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4">
            <path :d="$icons.shield" fill="currentColor" />
          </svg>
          Configuración
        </button>

        <button
          @click="$emit('logout')"
          class="w-full flex items-center gap-2 p-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4">
            <path :d="$icons.login" fill="currentColor" />
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps({
  user: { type: Object, default: null },
  defaultOpen: { type: Boolean, default: false }, // por si algún día quieres abrirlo por props
})

defineEmits(['profile', 'settings', 'logout'])

const open = ref(false)
</script>
