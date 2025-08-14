<template>
  <v-navigation-drawer
    v-model="model"
    app
    permanent
    :width="rail ? 120 : 280"
    :rail="rail"
    class="sidebar-light border-r border-slate-200"
  >
    <!-- Header -->
    <div class="relative p-4 bg-gradient-to-r from-color5/50 to-color4/30 border-b border-color4/40">
      <div v-if="!rail" class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-accent-success to-color1 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-color3/30">
          <svg viewBox="0 0 24 24" class="h-5 w-5 text-white">
            <path :d="$icons.transmissionTower" fill="currentColor" />
          </svg>
        </div>
        <div>
          <div class="text-lg font-bold tracking-wider">
            <span class="text-color1">S</span>
            <span class="text-accent-success">I</span>
            <span class="text-color2">M</span>
            <span class="text-color3">T</span>
            <span class="text-color4">R</span>
            <span class="text-accent-primary">A</span>
          </div>
          <div class="text-xs text-colorDark2 font-semibold">
            Sistema Inteligente de Monitoreo de Transformadores en Tiempo Real
          </div>
        </div>
      </div>

      <div v-else class="flex justify-center">
        <div class="w-10 h-10 bg-gradient-to-br from-accent-success to-color1 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-color3/30">
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
            <router-link
              v-bind="rail ? tooltipProps : {}"
              :to="item.to"
              class="flex items-center py-2.5 px-3 rounded-lg transition-all duration-150 relative overflow-hidden border-2"
              :class="[
                rail ? 'justify-center' : 'gap-3',
                $route.path === item.to
                  ? 'bg-gradient-to-r from-accent-success/25 to-color2/20 text-colorDark2 shadow-sm border-accent-success/40 ring-1 ring-accent-success/20'
                  : 'text-slate-600 bg-gradient-to-r from-slate-50/80 to-slate-100/60 border-color4/50 hover:text-colorDark2 hover:bg-gradient-to-r hover:from-color5/30 hover:to-color4/25 hover:border-color3/60'
              ]"
            >
              <!-- Icono -->
              <div
                class="p-2.5 rounded-xl transition-all duration-300 flex-shrink-0 shadow-sm"
                :class="$route.path === item.to
                  ? 'bg-gradient-to-br from-accent-success via-color2 to-color1 text-white shadow-md ring-2 ring-white/30'
                  : 'bg-gradient-to-br from-color4/70 to-color3/80 text-white shadow-sm group-hover:from-accent-success group-hover:to-color2 group-hover:shadow-md group-hover:ring-2 group-hover:ring-color3/40'">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons[item.icon]" fill="currentColor" />
                </svg>
              </div>

              <!-- Texto (solo si no está minimizado) -->
              <div v-if="!rail" class="flex-1 min-w-0">
                <span
                  class="font-medium truncate block text-sm"
                  :class="$route.path === item.to ? 'text-colorDark2' : 'text-slate-700'"
                >
                  {{ item.title }}
                </span>
              </div>

              <!-- Indicador activo -->
              <div
                v-if="$route.path === item.to && !rail"
                class="w-2 h-2 bg-accent-success rounded-full shadow-sm flex-shrink-0"
              />
            </router-link>
          </template>
        </v-tooltip>
      </div>
    </div>


    <template #append>
      <div class="border-t border-slate-200">
        <!-- Toggle rail -->
        <div class="flex justify-center py-1 bg-gradient-to-b from-slate-50 to-slate-100/50">
          <div
            @click="$emit('toggle')"
            class="w-10 h-10 bg-gradient-to-br from-accent-success via-color2 to-color1 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-white/50 hover:border-color3/60 hover:scale-105"
            :class="{ 'from-color1 via-color2 to-accent-success': rail }"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5 text-white transition-transform duration-200"
                 :class="{ 'rotate-180': !rail }">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <!-- Card de usuario -->
        <div v-if="!rail" class="">
          <UserActionsCard
            :user="user"
            @profile="goToProfile"
            @settings="$emit('settings')"
            @logout="$emit('logout')"
          />
        </div>

        <!-- Solo avatar cuando está minimizado -->
        <div v-else class="p-4 flex justify-center">
          <div
            class="w-9 h-9 bg-gradient-to-br from-color3 via-accent-success to-color1 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-all duration-200 border-2 border-white/50 hover:border-color3/60"
            @click="$emit('toggle')"
          >
            <span class="text-white font-bold text-xs">
              {{ user?.username?.charAt(0).toUpperCase() }}
            </span>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center pb-4">
          <div class="text-xs text-slate-500 font-medium">© 2025 SIMTRA</div>
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

/* Efectos hover suaves sin parpadeo */
.group:hover .transition-all {
  transition: all 0.15s ease-out;
}

.router-link-active {
  transform: translateX(1px);
}

/* Transiciones suaves para el rail mode */
.v-navigation-drawer {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Prevenir parpadeo en hover */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Estabilizar elementos durante hover */
.flex {
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>