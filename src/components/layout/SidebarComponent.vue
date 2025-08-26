<template>
  <v-navigation-drawer
    v-model="model"
    app
    permanent
    :width="rail ? 80 : 320"
    :rail="rail"
    class="bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r border-slate-200 dark:border-gray-700 transition-all duration-300 ease-out"
    elevation="0"
  >
    <!-- Header con mejor diseño -->
    <div class="bg-gradient-to-br from-slate-50 to-slate-200 dark:from-gray-800 dark:to-gray-900 border-b border-slate-300 dark:border-gray-600 relative overflow-hidden">
      <!-- Overlay decorativo -->
      <div class="absolute inset-0 bg-gradient-to-br from-color1/5 via-transparent to-transparent dark:from-color3/10 pointer-events-none"></div>
      
      <!-- Modo abierto -->
      <div v-if="!rail" class="p-6 flex items-center justify-between relative z-10">
        <div class="flex-1">
          <div class="text-3xl font-extrabold tracking-widest mb-1 drop-shadow-sm">
            <span class="text-color1 dark:text-color3">S</span>
            <span class="text-accent-success dark:text-color4">I</span>
            <span class="text-color2 dark:text-color5">M</span>
            <span class="text-color3 dark:text-color2">T</span>
            <span class="text-color4 dark:text-color1">R</span>
            <span class="text-accent-primary dark:text-accent-success">A</span>
          </div>
          <div class="text-xs text-slate-500 dark:text-gray-400 font-medium tracking-wider uppercase">
            Panel de Parámetros
          </div>
        </div>

        <!-- Botón toggle mejorado -->
        <div @click="$emit('toggle')" class="w-8 h-8 bg-gradient-to-br from-color1 to-colorDark1 dark:from-color2 dark:to-color3 border border-color1/20 dark:border-color3/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:from-colorDark1 hover:to-colorDark2 dark:hover:from-color3 dark:hover:to-color4 hover:-translate-y-0.5 shadow-lg hover:shadow-color1/25 dark:hover:shadow-color3/25">
          <svg viewBox="0 0 24 24" class="h-4 w-4 text-white">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
          </svg>
        </div>
      </div>

      <!-- Modo cerrado -->
      <div v-else class="p-5 flex justify-center relative z-10">
        <div @click="$emit('toggle')" class="w-9 h-9 bg-gradient-to-br from-color1 via-colorDark1 to-accent-primary dark:from-color2 dark:via-color3 dark:to-accent-success rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-xl hover:shadow-color1/30 dark:hover:shadow-color3/30 border-2 border-white/90 dark:border-gray-200/20">
          <span class="text-white font-bold text-lg drop-shadow-sm">S</span>
        </div>
      </div>
    </div>

    <!-- Navegación mejorada -->
    <div class="p-3 flex-1 overflow-y-auto">
      <!-- Items de monitoreo (sin título) -->
      <div v-for="(item, i) in monitoringItems" :key="`monitoring-${i}`" class="mb-0.5">
        <v-tooltip :disabled="!rail" :text="item.title" location="end">
          <template #activator="{ props: tooltipProps }">
            <router-link
              v-bind="rail ? tooltipProps : {}"
              :to="item.to"
              class="flex items-center rounded-xl transition-all duration-300 relative overflow-hidden border backdrop-blur-sm"
              :class="[
                rail ? 'p-2 justify-center mx-2' : 'p-2 gap-2',
                $route.path === item.to 
                  ? 'bg-gradient-to-r from-color1/10 via-color2/8 to-accent-primary/10 dark:from-color3/15 dark:via-color4/12 dark:to-accent-success/15 border-color1/15 dark:border-color3/20 shadow-lg shadow-color1/10 dark:shadow-color3/10' 
                  : 'bg-gradient-to-r from-slate-50/70 to-slate-100/50 dark:from-gray-800/50 dark:to-gray-700/30 border-color1/5 dark:border-gray-600/30 hover:from-color1/8 hover:to-accent-primary/5 dark:hover:from-color3/10 dark:hover:to-accent-success/8 hover:border-color2/20 dark:hover:border-color3/30 hover:translate-x-1 hover:shadow-lg hover:shadow-color1/10 dark:hover:shadow-color3/10'
              ]"
            >
              <!-- Indicador lateral activo -->
              <div 
                v-if="$route.path === item.to" 
                class="absolute left-0 top-1/5 bottom-1/5 w-1 bg-gradient-to-b from-color1 to-colorDark1 dark:from-color3 dark:to-color2 rounded-r shadow-sm shadow-color1/30 dark:shadow-color3/30"
              />

              <!-- Icono mejorado -->
              <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 relative z-10"
                   :class="$route.path === item.to 
                     ? 'bg-gradient-to-br from-color1 to-colorDark1 dark:from-color2 dark:to-color3 text-white shadow-lg shadow-color1/25 dark:shadow-color3/25' 
                     : 'bg-gradient-to-br from-color1/10 to-accent-primary/8 dark:from-color3/15 dark:to-accent-success/12 text-color1 dark:text-color3 border border-color1/10 dark:border-color3/20 hover:bg-gradient-to-br hover:from-color2 hover:to-accent-primary dark:hover:from-color3 dark:hover:to-accent-success hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-color2/30 dark:hover:shadow-color3/30 hover:border-transparent'
                   ">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons[item.icon]" fill="currentColor" />
                </svg>
              </div>

              <!-- Texto con mejor tipografía -->
              <div v-if="!rail" class="flex-1 min-w-0">
                <span class="text-sm font-semibold tracking-wide transition-colors duration-300"
                      :class="$route.path === item.to 
                        ? 'text-colorDark1 dark:text-color4' 
                        : 'text-slate-600 dark:text-gray-300'
                      ">
                  {{ item.title }}
                </span>
              </div>

              <!-- Efecto hover -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-color2/5 to-transparent dark:via-color3/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </router-link>
          </template>
        </v-tooltip>
      </div>

      <!-- CONTENEDOR PARA MANTENIMIENTO -->
      <div v-if="maintenanceItems.length > 0" class="mt-6">
        <!-- Contenedor rectangular para mantenimiento -->
        <div class="bg-gradient-to-br from-green-50/80 to-emerald-50/60 dark:from-green-900/20 dark:to-emerald-900/15 border border-green-200/40 dark:border-green-700/30 rounded-2xl p-3 shadow-lg shadow-green-100/50 dark:shadow-green-900/20 backdrop-blur-sm">
          
          <!-- Título de mantenimiento -->
          <div v-if="!rail" class="mb-3 px-1">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-gradient-to-r from-color2 to-accent-success rounded-full animate-pulse"></div>
              <h3 class="text-xs font-bold text-color1 dark:text-color3 tracking-wider uppercase">
                Mantenimiento
              </h3>
              <div class="flex-1 h-px bg-gradient-to-r from-color2/50 to-transparent dark:from-color3/30"></div>
            </div>
          </div>

          <!-- Items de mantenimiento más delgados -->
          <div v-for="(item, i) in maintenanceItems" :key="`maintenance-${i}`" class="mb-1">
            <v-tooltip :disabled="!rail" :text="item.title" location="end">
              <template #activator="{ props: tooltipProps }">
                <router-link
                  v-bind="rail ? tooltipProps : {}"
                  :to="item.to"
                  class="flex items-center rounded-lg transition-all duration-300 relative overflow-hidden border backdrop-blur-sm"
                  :class="[
                    rail ? 'p-1.5 justify-center mx-1' : 'px-2 py-1.5 gap-2',
                    $route.path === item.to 
                      ? 'bg-gradient-to-r from-color2/15 to-accent-success/10 dark:from-color3/20 dark:to-color4/15 border-color2/25 dark:border-color3/30 shadow-md shadow-color2/15 dark:shadow-color3/15' 
                      : 'bg-gradient-to-r from-white/60 to-green-50/40 dark:from-gray-800/40 dark:to-green-900/20 border-color2/20 dark:border-color3/20 hover:from-green-100/60 hover:to-emerald-100/40 dark:hover:from-green-800/30 dark:hover:to-emerald-800/20 hover:border-color2/30 dark:hover:border-color3/40 hover:shadow-md hover:shadow-green-200/20 dark:hover:shadow-green-800/20'
                  ]"
                >
                  <!-- Indicador lateral activo más sutil -->
                  <div 
                    v-if="$route.path === item.to" 
                    class="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-color2 to-accent-success dark:from-color3 dark:to-color4 rounded-r"
                  />

                  <!-- Icono más pequeño -->
                  <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 relative z-10"
                       :class="$route.path === item.to 
                         ? 'bg-gradient-to-br from-color2 to-accent-success dark:from-color3 dark:to-color4 text-white shadow-md shadow-color2/25 dark:shadow-color3/25' 
                         : 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-800/50 dark:to-emerald-800/40 text-color1 dark:text-color3 border border-color2/30 dark:border-color3/30 hover:bg-gradient-to-br hover:from-color2 hover:to-accent-success dark:hover:from-color3 dark:hover:to-color4 hover:text-white hover:scale-105 hover:shadow-md hover:shadow-color2/30 dark:hover:shadow-color3/30 hover:border-transparent'
                       ">
                    <svg viewBox="0 0 24 24" class="h-4 w-4">
                      <path :d="$icons[item.icon]" fill="currentColor" />
                    </svg>
                  </div>

                  <!-- Texto más compacto -->
                  <div v-if="!rail" class="flex-1 min-w-0">
                    <span class="text-xs font-medium tracking-wide transition-colors duration-300"
                          :class="$route.path === item.to 
                            ? 'text-colorDark1 dark:text-color4' 
                            : 'text-color1 dark:text-color3'
                          ">
                      {{ item.title }}
                    </span>
                  </div>

                  <!-- Efecto hover sutil -->
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-color2/8 to-transparent dark:via-color3/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
                </router-link>
              </template>
            </v-tooltip>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer mejorado -->
    <template #append>
      <div class="border-t border-slate-200 dark:border-gray-700 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">
        <!-- Card de usuario mejorado -->
        <div v-if="!rail" class="p-2.5">
          <UserActionsCard
            :user="user"
            @profile="goToProfile"
            @settings="$emit('settings')"
            @logout="$emit('logout')"
          />
        </div>

        <!-- Avatar minimalista -->
        <div v-else class="flex justify-center py-3">
          <div class="w-11 h-11 bg-gradient-to-br from-color1 via-colorDark1 to-accent-primary dark:from-color2 dark:via-color3 dark:to-accent-success rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-xl hover:shadow-color1/30 dark:hover:shadow-color3/30 border-2 border-white/90 dark:border-gray-200/20" 
               @click="$emit('toggle')">
            <span class="text-white font-bold text-base drop-shadow-sm">
              {{ user?.username?.charAt(0).toUpperCase() }}
            </span>
          </div>
        </div>

        <!-- Copyright con mejor diseño -->
        <div class="p-2.5 text-center relative">
          <div class="text-xs text-slate-400 dark:text-gray-500 font-medium tracking-wider mb-1">
            © 2025 SIMTRA
          </div>
          <div class="flex justify-center gap-1">
            <div class="w-1 h-1 bg-color1 dark:bg-color3 rounded-full animate-pulse" style="animation-delay: 0s;"></div>
            <div class="w-1 h-1 bg-color2 dark:bg-color4 rounded-full animate-pulse" style="animation-delay: 0.3s;"></div>
            <div class="w-1 h-1 bg-accent-primary dark:bg-accent-success rounded-full animate-pulse" style="animation-delay: 0.6s;"></div>
          </div>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import UserActionsCard from './UserMenuComponent.vue'

const router = useRouter()

const props = defineProps({
  modelValue: { type: Boolean, default: true },
  rail: { type: Boolean, default: false },
  items: { type: Array, default: () => [] },
  user: { type: Object, default: null },
})

const emit = defineEmits(['update:modelValue', 'toggle', 'logout', 'settings'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})


const monitoringItems = computed(() => {
  return props.items.filter(item => item.category === 'monitoring' || !item.category)
})

const maintenanceItems = computed(() => {
  return props.items.filter(item => item.category === 'maintenance')
})

function goToProfile() {
  router.push({ name: 'profile' })
}
</script>

<style scoped>
/* Scroll personalizado */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-color2/30 dark:bg-color3/30 rounded-sm;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  @apply bg-color2/50 dark:bg-color3/50;
}

/* Mejoras de rendimiento */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
}

/* Transición suave para el drawer */
:deep(.v-navigation-drawer) {
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Animación personalizada para los puntos */
@keyframes pulse {
  0%, 100% { 
    opacity: 0.4; 
    transform: scale(1); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2); 
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>