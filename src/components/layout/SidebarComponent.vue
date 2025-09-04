<template>
  <v-navigation-drawer 
    v-model="model" 
    app 
    permanent 
    :width="rail ? 80 : 320" 
    :rail="rail"
    class="bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 
           border-r border-slate-200 dark:border-gray-700 transition-all duration-300"
    elevation="0"
  >
    <!-- Header -->
    <div class="sticky top-0 z-50 bg-gradient-to-r from-slate-50 to-slate-100 
                dark:from-gray-800 dark:to-gray-900 border-b border-slate-200 
                dark:border-gray-600 backdrop-blur-sm">
      
      <!-- Modo abierto -->
      <div v-if="!rail" class="p-6 flex items-center justify-between">
        <div class="flex-1">
          <div class="text-2xl font-extrabold tracking-wider mb-1">
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

        <div @click="$emit('toggle')"
          class="w-8 h-8 bg-gradient-to-br from-color1 to-color2 dark:from-color2 dark:to-color3 
                 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 
                 hover:scale-105 shadow-lg">
          <svg viewBox="0 0 24 24" class="h-4 w-4 text-white">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
          </svg>
        </div>
      </div>

      <!-- Modo cerrado -->
      <div v-else class="p-5 flex justify-center">
        <div @click="$emit('toggle')"
          class="w-9 h-9 bg-gradient-to-br from-color1 to-color2 dark:from-color2 dark:to-color3 
                 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 
                 hover:scale-105 shadow-xl border-2 border-white/90 dark:border-gray-200/20">
          <span class="text-white font-bold text-lg">S</span>
        </div>
      </div>
    </div>

    <!-- Navegación -->
    <div class="p-3 flex-1 overflow-y-auto">
      <!-- Items de monitoreo -->
      <div v-for="(item, i) in monitoringItems" :key="`monitoring-${i}`" class="mb-1">
        <v-tooltip :disabled="!rail" :text="item.title" location="end">
          <template #activator="{ props: tooltipProps }">
            <component 
              :is="isItemDisabled(item) ? 'div' : 'router-link'" 
              v-bind="rail ? tooltipProps : {}" 
              :to="!isItemDisabled(item) ? item.to : undefined"
              class="flex items-center rounded-xl transition-all duration-300 relative overflow-hidden border backdrop-blur-sm"
              :class="[
                rail ? 'p-2 justify-center mx-2' : 'p-2 gap-2',
                isItemDisabled(item) 
                  ? 'opacity-40 cursor-not-allowed bg-slate-100/50 dark:bg-gray-800/30 border-slate-200/30 dark:border-gray-700/20'
                  : $route.path === item.to
                    ? 'bg-gradient-to-r from-color1/10 via-color2/8 to-color1/5 dark:from-color3/15 dark:via-color4/12 dark:to-color3/8 border-color1/15 dark:border-color3/20 shadow-lg'
                    : 'bg-gradient-to-r from-slate-50/70 to-slate-100/50 dark:from-gray-800/50 dark:to-gray-700/30 border-color1/5 dark:border-gray-600/30 hover:from-color1/8 hover:to-color2/5 dark:hover:from-color3/10 dark:hover:to-color4/8 hover:border-color2/20 dark:hover:border-color3/30 hover:translate-x-1 hover:shadow-lg cursor-pointer'
              ]"
              @click="handleItemClick(item, $event)"

            >
              <!-- Indicador lateral activo -->
              <div v-if="!isItemDisabled(item) && $route.path === item.to"
                class="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-color1 to-color2 dark:from-color3 dark:to-color2 rounded-r shadow-sm" />

              <!-- Icono -->
              <div
                class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                :class="isItemDisabled(item)
                  ? 'bg-slate-200/50 dark:bg-gray-700/30 text-slate-400 dark:text-gray-500'
                  : $route.path === item.to
                    ? 'bg-gradient-to-br from-color1 to-color2 dark:from-color2 dark:to-color3 text-white shadow-lg'
                    : 'bg-gradient-to-br from-color1/10 to-color2/8 dark:from-color3/15 dark:to-color4/12 text-color1 dark:text-color3 border border-color1/10 dark:border-color3/20 hover:bg-gradient-to-br hover:from-color2 hover:to-color1 dark:hover:from-color3 dark:hover:to-color4 hover:text-white hover:scale-105 hover:shadow-lg hover:border-transparent'
                ">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons[item.icon]" fill="currentColor" />
                </svg>
              </div>

              <!-- Texto -->
              <div v-if="!rail" class="flex-1 min-w-0">
                <span 
                  class="text-sm font-semibold tracking-wide transition-colors duration-300" 
                  :class="isItemDisabled(item)
                    ? 'text-slate-400 dark:text-gray-500'
                    : $route.path === item.to
                      ? 'text-color1 dark:text-color4'
                      : 'text-slate-600 dark:text-gray-300'
                  "
                >
                  {{ item.title }}
                </span>
                
                <!-- Indicador de deshabilitado -->
                <div v-if="isItemDisabled(item)" class="text-xs text-slate-400 dark:text-gray-500 mt-0.5">
                  Sin datos de transformador
                </div>
              </div>

              <!-- Overlay para items deshabilitados -->
              <div v-if="isItemDisabled(item)" 
                class="absolute inset-0 bg-slate-200/20 dark:bg-gray-800/30 rounded-xl pointer-events-none" />
            </component>
          </template>
        </v-tooltip>
      </div>

      <!-- Sección de mantenimiento -->
      <div v-if="maintenanceItems.length > 0" class="mt-4 relative">
        <!-- Items expandidos -->
        <div class="absolute bottom-full left-0 right-0 mb-1 transition-all duration-500 overflow-hidden z-20"
          :class="isMaintenanceExpanded ? 'opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'">
          
          <div class="bg-gradient-to-br from-emerald-50/95 to-emerald-100/80 dark:from-emerald-900/30 dark:to-emerald-800/20 
                      border border-emerald-200/60 dark:border-emerald-700/50 rounded-2xl shadow-xl backdrop-blur-sm p-3 space-y-1">
            <div v-for="(item, i) in maintenanceItems" :key="`maintenance-${i}`" class="transform transition-all duration-300">
              <v-tooltip :disabled="!rail" :text="item.title" location="end">
                <template #activator="{ props: tooltipProps }">
                  <router-link v-bind="rail ? tooltipProps : {}" :to="item.to"
                    class="flex items-center rounded-xl transition-all duration-300 relative overflow-hidden border backdrop-blur-sm group"
                    :class="[
                      rail ? 'p-2 justify-center mx-1' : 'px-3 py-2 gap-3',
                      $route.path === item.to
                        ? 'bg-gradient-to-r from-emerald-200/70 to-emerald-300/50 dark:from-emerald-700/50 dark:to-emerald-600/40 border-emerald-300/60 dark:border-emerald-600/50 shadow-lg'
                        : 'bg-gradient-to-r from-white/80 to-emerald-50/60 dark:from-gray-800/60 dark:to-emerald-900/30 border-emerald-200/40 dark:border-emerald-700/30 hover:from-emerald-100/80 hover:to-emerald-200/60 dark:hover:from-emerald-800/50 dark:hover:to-emerald-700/40 hover:border-emerald-300/60 hover:shadow-lg hover:translate-x-1'
                    ]">

                    <div v-if="$route.path === item.to"
                      class="absolute left-0 top-1 bottom-1 w-1 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-r shadow-sm" />

                    <div
                      class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      :class="$route.path === item.to
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg'
                        : 'bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-800/60 dark:to-emerald-700/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/40 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:text-white group-hover:shadow-lg group-hover:border-transparent'
                        ">
                      <svg viewBox="0 0 24 24" class="h-5 w-5">
                        <path :d="$icons[item.icon]" fill="currentColor" />
                      </svg>
                    </div>

                    <div v-if="!rail" class="flex-1 min-w-0">
                      <span class="text-sm font-semibold tracking-wide transition-colors duration-300" :class="$route.path === item.to
                        ? 'text-emerald-800 dark:text-emerald-100'
                        : 'text-emerald-700 dark:text-emerald-300 group-hover:text-emerald-800 dark:group-hover:text-emerald-100'
                        ">
                        {{ item.title }}
                      </span>
                    </div>
                  </router-link>
                </template>
              </v-tooltip>
            </div>
          </div>
        </div>

        <!-- Header clickeable -->
        <div @click="toggleMaintenance"
          class="bg-gradient-to-br from-emerald-50/90 to-emerald-100/70 dark:from-emerald-900/25 dark:to-emerald-800/15 
                 border border-emerald-200/50 dark:border-emerald-700/40 rounded-2xl overflow-hidden shadow-lg 
                 backdrop-blur-sm transition-all duration-500 hover:shadow-xl cursor-pointer group">
          
          <div class="px-4 py-2 bg-gradient-to-r from-emerald-100/80 to-emerald-200/60 dark:from-emerald-800/40 dark:to-emerald-700/30 
                      transition-all duration-300 hover:from-emerald-200/80 hover:to-emerald-300/60 rounded-2xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center 
                           shadow-lg transition-all duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" class="h-4 w-4 text-white">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" fill="currentColor" />
                  </svg>
                </div>

                <div v-if="!rail">
                  <h3 class="text-sm font-bold text-emerald-800 dark:text-emerald-200 tracking-wide mb-0.5">
                    Mantenimientos
                  </h3>
                  <p class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {{ maintenanceItems.length }} herramienta{{ maintenanceItems.length !== 1 ? 's' : '' }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <div v-if="!rail" class="transition-transform duration-300"
                  :class="{ 'rotate-180': !isMaintenanceExpanded }">
                  <svg viewBox="0 0 24 24" class="h-5 w-5 text-emerald-600 dark:text-emerald-300">
                    <path d="M7 10l5 5 5-5z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <template #append>
      <div class="border-t border-slate-200 dark:border-gray-700 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">
        <div v-if="!rail" class="p-2.5">
          <UserActionsCard :user="user" @profile="goToProfile" @settings="$emit('settings')" @logout="$emit('logout')" />
        </div>

        <div v-else class="flex justify-center py-3">
          <div
            class="w-11 h-11 bg-gradient-to-br from-color1 to-color2 dark:from-color2 dark:to-color3 rounded-xl 
                   flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 
                   shadow-xl border-2 border-white/90 dark:border-gray-200/20"
            @click="$emit('toggle')">
            <span class="text-white font-bold text-base">
              {{ user?.username?.charAt(0).toUpperCase() }}
            </span>
          </div>
        </div>

        <div class="p-2.5 text-center">
          <div class="text-xs text-slate-400 dark:text-gray-500 font-medium tracking-wider">
            © 2025 SIMTRA
          </div>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTransformerStore } from '@/features/transformer/store/transformerStore'
import UserActionsCard from './UserMenuComponent.vue'

const router = useRouter()
const transformerStore = useTransformerStore()

const props = defineProps({
  modelValue: { type: Boolean, default: true },
  rail: { type: Boolean, default: false },
  items: { type: Array, default: () => [] },
  user: { type: Object, default: null },
})

const emit = defineEmits(['update:modelValue', 'toggle', 'logout', 'settings'])

const isMaintenanceExpanded = ref(false)

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

function handleItemClick(item, event) {
  if (isItemDisabled(item)) {
    event.preventDefault() // evitar navegación normal
    router.push('/app/factory') 
  }
}


// Función para determinar si un item de monitoreo debe estar deshabilitado
function isItemDisabled(item) {
  // Solo deshabilitar items de monitoreo si no hay transformer seleccionado
  if (item.category === 'monitoring' || !item.category) {
    return !transformerStore.hasTransformer
  }
  return false
}

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

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
}

:deep(.v-navigation-drawer) {
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.max-h-0 {
  max-height: 0;
}
</style>