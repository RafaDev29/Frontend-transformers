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
      <!-- Modo abierto -->
      <div v-if="!rail" class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="text-lg font-bold tracking-wider">
            <span class="text-color1">S</span>
            <span class="text-accent-success">I</span>
            <span class="text-color2">M</span>
            <span class="text-color3">T</span>
            <span class="text-color4">R</span>
            <span class="text-accent-primary">A</span>
          </div>
        </div>

        <!-- Botón de cerrar -->
        <div
          @click="$emit('toggle')"
          class="w-8 h-8 bg-gradient-to-br from-accent-success via-color2 to-color1 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 border border-white/50 hover:border-color3/60 hover:scale-105"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-4 w-4 text-white transition-transform duration-200"
            :class="{ 'rotate-180': !rail }"
          >
            <path
              d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <!-- Modo cerrado -->
      <div v-else class="flex flex-col items-center gap-2">
        <!-- <div
          class="w-10 h-10 bg-gradient-to-br from-accent-success to-color1 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-color3/30"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5 text-white">
            <path :d="$icons.transmissionTower" fill="currentColor" />
          </svg>
        </div> -->

        <!-- Botón de abrir -->
        <div
          @click="$emit('toggle')"
          class="w-8 h-8 bg-gradient-to-br from-color1 via-color2 to-accent-success rounded-full flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 border border-white/50 hover:border-color3/60 hover:scale-105"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-4 w-4 text-white transition-transform duration-200 rotate-180"
          >
            <path
              d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
              fill="currentColor"
            />
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
                  : 'bg-gradient-to-br from-color4/70 to-color3/80 text-white shadow-sm group-hover:from-accent-success group-hover:to-color2 group-hover:shadow-md group-hover:ring-2 group-hover:ring-color3/40'"
              >
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
        <!-- Card de usuario -->
        <div v-if="!rail">
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
.group:hover .transition-all {
  transition: all 0.15s ease-out;
}
.router-link-active {
  transform: translateX(1px);
}
.v-navigation-drawer {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.flex {
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>
