<template>
  <v-navigation-drawer v-model="model" app permanent :width="rail ? 80 : 320" :rail="rail"
    class="bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r border-slate-200 dark:border-gray-700 transition-all duration-300 ease-out"
    elevation="0">
    <!-- Header con mejor diseño -->
    <!-- Header con mejor diseño - STICKY -->
<div
  class="sticky top-0 z-50 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-gray-800 dark:to-gray-900 border-b border-slate-300 dark:border-gray-600 relative overflow-hidden backdrop-blur-sm">
  <!-- Overlay decorativo -->
  <div
    class="absolute inset-0 bg-gradient-to-br from-color1/5 via-transparent to-transparent dark:from-color3/10 pointer-events-none">
  </div>

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
    <div @click="$emit('toggle')"
      class="w-8 h-8 bg-gradient-to-br from-color1 to-colorDark1 dark:from-color2 dark:to-color3 border border-color1/20 dark:border-color3/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:from-colorDark1 hover:to-colorDark2 dark:hover:from-color3 dark:hover:to-color4 hover:-translate-y-0.5 shadow-lg hover:shadow-color1/25 dark:hover:shadow-color3/25">
      <svg viewBox="0 0 24 24" class="h-4 w-4 text-white">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
      </svg>
    </div>
  </div>

  <!-- Modo cerrado -->
  <div v-else class="p-5 flex justify-center relative z-10">
    <div @click="$emit('toggle')"
      class="w-9 h-9 bg-gradient-to-br from-color1 via-colorDark1 to-accent-primary dark:from-color2 dark:via-color3 dark:to-accent-success rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-xl hover:shadow-color1/30 dark:hover:shadow-color3/30 border-2 border-white/90 dark:border-gray-200/20">
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
            <router-link v-bind="rail ? tooltipProps : {}" :to="item.to"
              class="flex items-center rounded-xl transition-all duration-300 relative overflow-hidden border backdrop-blur-sm"
              :class="[
                rail ? 'p-2 justify-center mx-2' : 'p-2 gap-2',
                $route.path === item.to
                  ? 'bg-gradient-to-r from-color1/10 via-color2/8 to-accent-primary/10 dark:from-color3/15 dark:via-color4/12 dark:to-accent-success/15 border-color1/15 dark:border-color3/20 shadow-lg shadow-color1/10 dark:shadow-color3/10'
                  : 'bg-gradient-to-r from-slate-50/70 to-slate-100/50 dark:from-gray-800/50 dark:to-gray-700/30 border-color1/5 dark:border-gray-600/30 hover:from-color1/8 hover:to-accent-primary/5 dark:hover:from-color3/10 dark:hover:to-accent-success/8 hover:border-color2/20 dark:hover:border-color3/30 hover:translate-x-1 hover:shadow-lg hover:shadow-color1/10 dark:hover:shadow-color3/10'
              ]">

              <div v-if="$route.path === item.to"
                class="absolute left-0 top-1/5 bottom-1/5 w-1 bg-gradient-to-b from-color1 to-colorDark1 dark:from-color3 dark:to-color2 rounded-r shadow-sm shadow-color1/30 dark:shadow-color3/30" />

              <!-- Icono mejorado -->
              <div
                class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 relative z-10"
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
                <span class="text-sm font-semibold tracking-wide transition-colors duration-300" :class="$route.path === item.to
                  ? 'text-colorDark1 dark:text-color4'
                  : 'text-slate-600 dark:text-gray-300'
                  ">
                  {{ item.title }}
                </span>
              </div>

              <!-- Efecto hover -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-color2/5 to-transparent dark:via-color3/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </router-link>
          </template>
        </v-tooltip>
      </div>

      <!-- MENÚ DE MANTENIMIENTO CON APERTURA HACIA ARRIBA -->
      <div v-if="maintenanceItems.length > 0" class="mt-6 relative">
        <!-- Contenido colapsible que aparece ARRIBA del header -->
        <div 
          class="absolute bottom-full left-0 right-0 mb-2 transition-all duration-500 ease-out overflow-hidden z-20"
          :class="isMaintenanceExpanded ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'">
          
          <!-- Items de mantenimiento -->
          <div class="bg-gradient-to-br from-emerald-50/95 via-green-50/90 to-teal-50/85 dark:from-emerald-900/30 dark:via-green-900/25 dark:to-teal-900/20 border border-emerald-200/60 dark:border-emerald-700/50 rounded-2xl shadow-xl shadow-emerald-200/40 dark:shadow-emerald-800/40 backdrop-blur-sm p-3 space-y-1">
            <div v-for="(item, i) in maintenanceItems" :key="`maintenance-${i}`"
              class="transform transition-all duration-300 hover:scale-[1.02]"
              :style="{ transitionDelay: `${i * 50}ms` }">

              <v-tooltip :disabled="!rail" :text="item.title" location="end">
                <template #activator="{ props: tooltipProps }">
                  <router-link v-bind="rail ? tooltipProps : {}" :to="item.to"
                    class="flex items-center rounded-xl transition-all duration-300 relative overflow-hidden border backdrop-blur-sm group"
                    :class="[
                      rail ? 'p-2 justify-center mx-1' : 'px-3 py-2.5 gap-3',
                      $route.path === item.to
                        ? 'bg-gradient-to-r from-emerald-200/70 to-green-200/50 dark:from-emerald-700/50 dark:to-green-700/40 border-emerald-300/60 dark:border-emerald-600/50 shadow-lg shadow-emerald-200/30 dark:shadow-emerald-700/30'
                        : 'bg-gradient-to-r from-white/80 to-emerald-50/60 dark:from-gray-800/60 dark:to-emerald-900/30 border-emerald-200/40 dark:border-emerald-700/30 hover:from-emerald-100/80 hover:to-green-100/60 dark:hover:from-emerald-800/50 dark:hover:to-green-800/40 hover:border-emerald-300/60 dark:hover:border-emerald-600/50 hover:shadow-lg hover:shadow-emerald-200/25 dark:hover:shadow-emerald-800/25 hover:translate-x-1'
                    ]">

                    <!-- Indicador lateral activo mejorado -->
                    <div v-if="$route.path === item.to"
                      class="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-emerald-500 to-green-600 dark:from-emerald-400 dark:to-green-500 rounded-r shadow-sm" />

                    <!-- Icono mejorado con animación -->
                    <div
                      class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 relative z-10 group-hover:scale-110"
                      :class="$route.path === item.to
                        ? 'bg-gradient-to-br from-emerald-500 to-green-600 dark:from-emerald-400 dark:to-green-500 text-white shadow-lg shadow-emerald-500/30 dark:shadow-emerald-400/30'
                        : 'bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-800/60 dark:to-green-800/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/40 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-green-600 dark:group-hover:from-emerald-400 dark:group-hover:to-green-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/30 dark:group-hover:shadow-emerald-400/30 group-hover:border-transparent'
                        ">
                      <svg viewBox="0 0 24 24"
                        class="h-5 w-5 transition-transform duration-300 group-hover:rotate-12">
                        <path :d="$icons[item.icon]" fill="currentColor" />
                      </svg>
                    </div>

                    <!-- Texto mejorado -->
                    <div v-if="!rail" class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-0.5">
                        <span class="text-sm font-semibold tracking-wide transition-colors duration-300" :class="$route.path === item.to
                          ? 'text-emerald-800 dark:text-emerald-100'
                          : 'text-emerald-700 dark:text-emerald-300 group-hover:text-emerald-800 dark:group-hover:text-emerald-100'
                          ">
                          {{ item.title }}
                        </span>
                      </div>

                      <!-- Descripción opcional -->
                      <p class="text-xs text-emerald-600 dark:text-emerald-400 opacity-80">
                        Gestión y configuración
                      </p>
                    </div>

                    <!-- Efecto hover mejorado -->
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/10 to-transparent dark:via-emerald-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

                    <!-- Brillo sutil -->
                    <div
                      class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />
                  </router-link>
                </template>
              </v-tooltip>
            </div>
          </div>
        </div>

        <!-- Header clickeable (ahora abajo) -->
        <div @click="toggleMaintenance"
          class="bg-gradient-to-br from-emerald-50/90 via-green-50/80 to-teal-50/70 dark:from-emerald-900/25 dark:via-green-900/20 dark:to-teal-900/15 border border-emerald-200/50 dark:border-emerald-700/40 rounded-2xl overflow-hidden shadow-lg shadow-emerald-100/60 dark:shadow-emerald-900/30 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-emerald-200/40 dark:hover:shadow-emerald-800/40 cursor-pointer group relative z-10">

          <div class="px-4 py-3 bg-gradient-to-r from-emerald-100/80 to-green-100/60 dark:from-emerald-800/40 dark:to-green-800/30 transition-all duration-300 hover:from-emerald-200/80 hover:to-green-200/60 dark:hover:from-emerald-700/50 dark:hover:to-green-700/40 rounded-2xl">

            <!-- Fondo animado -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/10 to-transparent dark:via-emerald-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
            </div>

            <div class="flex items-center justify-between relative z-10">
              <div class="flex items-center gap-3">
                <!-- Icono principal animado -->
                <div
                  class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 dark:from-emerald-400 dark:to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 dark:shadow-emerald-400/25 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <svg viewBox="0 0 24 24" class="h-4 w-4 text-white">
                    <path
                      d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"
                      fill="currentColor" />
                  </svg>
                </div>

                <div v-if="!rail">
                  <h3 class="text-sm font-bold text-emerald-800 dark:text-emerald-200 tracking-wide mb-0.5">
                    Mantenimiento
                  </h3>
                  <p class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {{ maintenanceItems.length }} herramienta{{ maintenanceItems.length !== 1 ? 's' : '' }}
                  </p>
                </div>
              </div>

              <!-- Indicadores y flecha -->
              <div class="flex items-center gap-2">
                <!-- Flecha animada (apunta hacia arriba cuando está expandido) -->
                <div v-if="!rail" class="transition-transform duration-300 ease-out"
                  :class="{ 'rotate-180': !isMaintenanceExpanded }">
                  <svg viewBox="0 0 24 24" class="h-5 w-5 text-emerald-600 dark:text-emerald-300">
                    <path d="M7 14l5-5 5 5z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer mejorado -->
    <template #append>
      <div
        class="border-t border-slate-200 dark:border-gray-700 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">
        <!-- Card de usuario mejorado -->
        <div v-if="!rail" class="p-2.5">
          <UserActionsCard :user="user" @profile="goToProfile" @settings="$emit('settings')"
            @logout="$emit('logout')" />
        </div>

        <!-- Avatar minimalista -->
        <div v-else class="flex justify-center py-3">
          <div
            class="w-11 h-11 bg-gradient-to-br from-color1 via-colorDark1 to-accent-primary dark:from-color2 dark:via-color3 dark:to-accent-success rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-xl hover:shadow-color1/30 dark:hover:shadow-color3/30 border-2 border-white/90 dark:border-gray-200/20"
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
            <div class="w-1 h-1 bg-color2 dark:bg-color4 rounded-full animate-pulse" style="animation-delay: 0.3s;">
            </div>
            <div class="w-1 h-1 bg-accent-primary dark:bg-accent-success rounded-full animate-pulse"
              style="animation-delay: 0.6s;"></div>
          </div>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref } from 'vue'
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

// Estado para el colapso del mantenimiento
const isMaintenanceExpanded = ref(false) // Cambié a false por defecto para que inicie cerrado

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

function toggleMaintenance() {
  if (!props.rail) {
    isMaintenanceExpanded.value = !isMaintenanceExpanded.value
  }
}

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

/* Animación para el contenido colapsible hacia arriba */
.max-h-96 {
  max-height: 24rem;
}

.max-h-0 {
  max-height: 0;
}

/* Efectos adicionales para animación hacia arriba */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.maintenance-item-enter-active {
  animation: slideInDown 0.3s ease-out forwards;
}

/* Asegurar que el contenido expandido tenga z-index apropiado */
.relative {
  position: relative;
}

/* Mejora la transición del contenido expandido */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>