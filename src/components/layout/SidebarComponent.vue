<!-- SidebarComponent.vue -->
<template>
  <v-navigation-drawer v-model="model" app permanent :width="rail ? 120 : 280" :rail="rail"
    class="sidebar-light border-r border-slate-200">

    <div class="relative p-4 bg-gradient-to-r from-color5/30 to-color4/20 border-b border-color4/30">
      <div v-if="!rail" class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-gradient-to-br from-color2 to-color1 rounded-xl flex items-center justify-center shadow-sm">
          <svg viewBox="0 0 24 24" class="h-5 w-5 text-white">
            <path :d="$icons.transmissionTower" fill="currentColor" />
          </svg>
        </div>
        <div>
          <div class="text-lg font-bold tracking-wider">
            <span class="text-color1">S</span>
            <span class="text-color2">E</span>
            <span class="text-color3">M</span>
            <span class="text-color4">T</span>
          </div>
          <div class="text-xs text-slate-600 font-medium">
            Sistema de Monitoreo
          </div>
        </div>
      </div>

      <!-- Solo icono cuando está minimizado -->
      <div v-else class="flex justify-center">
        <div
          class="w-10 h-10 bg-gradient-to-br from-color2 to-color1 rounded-xl flex items-center justify-center shadow-sm">
          <svg viewBox="0 0 24 24" class="h-5 w-5 text-white">
            <path :d="$icons.transmissionTower" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Navegación -->
    <div class="px-2 space-y-1 mt-2">
      <div v-for="(item, i) in items" :key="i" class="group">
        <v-tooltip :disabled="!rail" :text="item.title" location="end">
          <template #activator="{ props: tooltipProps }">
            <router-link v-bind="rail ? tooltipProps : {}" :to="item.to"
              class="flex items-center p-3 rounded-xl transition-all duration-300 relative overflow-hidden" :class="[
                rail ? 'justify-center' : 'gap-4',
                {
                  'bg-gradient-to-r from-color2/20 to-color1/10 text-color1 shadow-md border border-color2/30': $route.path === item.to,
                  'text-slate-600 hover:text-color1 hover:bg-color5/20 hover:shadow-sm': $route.path !== item.to
                }
              ]">
              <!-- Icono -->
              <div class="p-2 rounded-lg transition-all duration-300 flex-shrink-0" :class="{
                'bg-gradient-to-br from-color2 to-color1 text-white shadow-md': $route.path === item.to,
                'bg-slate-100 text-slate-500 group-hover:bg-color4/30 group-hover:text-color1': $route.path !== item.to
              }">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons[item.icon]" fill="currentColor" />
                </svg>
              </div>

              <!-- Texto (solo si no está minimizado) -->
              <div v-if="!rail" class="flex-1 min-w-0">
                <span class="font-medium truncate block">{{ item.title }}</span>
              </div>

              <!-- Indicador activo -->
              <div v-if="$route.path === item.to && !rail"
                class="w-2 h-2 bg-color2 rounded-full animate-pulse shadow-sm flex-shrink-0"></div>
            </router-link>
          </template>
        </v-tooltip>
      </div>
    </div>

    <!-- Footer con UserMenu -->
    <template #append>
      <div class="border-t border-slate-200">
        <!-- Toggle rail -->
        <div class="flex justify-center py-2 bg-slate-50">
          <div @click="$emit('toggle')"
            class="group w-8 h-8 bg-gradient-to-br from-color2 to-color1 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
            :class="{ 'from-color1 to-color2': rail }">
            <svg viewBox="0 0 24 24" class="h-4 w-4 text-white transition-transform duration-300"
              :class="{ 'rotate-180': !rail }">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" fill="currentColor" />
            </svg>
            <div
              class="absolute inset-0 bg-gradient-to-br from-color3/30 to-color2/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
          </div>
        </div>

        <!-- Card de usuario separada (sin Online) -->
        <div v-if="!rail" class="p-4">
          <UserActionsCard :user="user" @profile="goToProfile" @settings="$emit('settings')"
            @logout="$emit('logout')" />
        </div>

        <!-- Solo avatar cuando está minimizado -->
        <div v-else class="p-4 flex justify-center">
          <div
            class="w-10 h-10 bg-gradient-to-br from-color3 to-color1 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition-all"
            @click="$emit('toggle')">
            <span class="text-white font-bold text-sm">
              {{ user?.username?.charAt(0).toUpperCase() }}
            </span>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center pb-4">
          <div class="text-xs text-slate-500 font-medium">© 2025 SEMT</div>
          <div class="text-xs text-slate-400">v1.2.3</div>
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

function goToProfile() {
  router.push({ name: 'profile' })
}
</script>

<style scoped>
.sidebar-light {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
}

/* Efectos hover suaves */
.group:hover .group-hover\:bg-color4\/30 {
  transform: scale(1.05);
}

.router-link-active {
  transform: translateX(2px);
}

/* Transiciones suaves para el rail mode */
.v-navigation-drawer {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efecto para el botón toggle */
.group:hover .animate-pulse {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1
  }

  50% {
    opacity: .8
  }
}
</style>
