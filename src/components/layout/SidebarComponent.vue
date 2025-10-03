<template>
  <v-navigation-drawer v-model="model" app permanent :width="rail ? 80 : 320" :rail="rail" class="bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 
           border-r border-slate-200 dark:border-gray-700 transition-all duration-300" elevation="0">
    <div class="sticky top-0 z-50 bg-gradient-to-r from-slate-50 to-slate-100 
                dark:from-gray-800 dark:to-gray-900 border-b border-slate-200 
                dark:border-gray-600 backdrop-blur-sm">

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

        <div @click="$emit('toggle')" class="w-8 h-8 bg-gradient-to-br from-color1 to-color2 dark:from-color2 dark:to-color3 
                 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 
                 hover:scale-105 shadow-lg">
          <svg viewBox="0 0 24 24" class="h-4 w-4 text-white">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div v-else class="p-5 flex justify-center">
        <div @click="$emit('toggle')" class="w-9 h-9 bg-gradient-to-br from-color1 to-color2 dark:from-color2 dark:to-color3 
                 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 
                 hover:scale-105 shadow-xl border-2 border-white/90 dark:border-gray-200/20">
          <span class="text-white font-bold text-lg">S</span>
        </div>
      </div>
    </div>


    <div class="p-3 flex-1 overflow-y-auto">

      <div v-for="(item, i) in monitoringItems" :key="`monitoring-${i}`" class="mb-1">
        <v-tooltip :disabled="!rail" :text="item.title" location="end">
          <template #activator="{ props: tooltipProps }">
            <component :is="isItemDisabled(item) ? 'div' : 'router-link'" v-bind="rail ? tooltipProps : {}"
              :to="!isItemDisabled(item) ? item.to : undefined"
              class="flex items-center rounded-[5px] transition-all duration-300 relative overflow-hidden border backdrop-blur-sm"
              :class="[
                rail ? 'p-2 justify-center mx-2' : 'p-2 gap-1',
                isItemDisabled(item)
                  ? 'opacity-900 cursor-not-allowed bg-slate-100/30 dark:bg-gray-800/20 border-slate-200/20 dark:border-gray-700/10 backdrop-blur-[2px]'
                  : $route.path === item.to
                    ? 'bg-gradient-to-r from-color1/10 via-color2/8 to-color1/5 dark:from-color3/15 dark:via-color4/12 dark:to-color3/8 border-color1/15 dark:border-color3/20 shadow-lg'
                    : 'bg-gradient-to-r from-slate-50/70 to-slate-100/50 dark:from-gray-800/50 dark:to-gray-700/30 border-color1/5 dark:border-gray-600/30 hover:from-color1/8 hover:to-color2/5 dark:hover:from-color3/10 dark:hover:to-color4/8 hover:border-color2/20 dark:hover:border-color3/30 hover:translate-x-1 hover:shadow-lg cursor-pointer'
              ]" @click="handleItemClick(item, $event)">

              <div v-if="!isItemDisabled(item) && $route.path === item.to"
                class="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-color1 to-color2 dark:from-color3 dark:to-color2 rounded-r shadow-sm" />

              <!-- Icono -->
              <div
                class="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-all duration-300"
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
                <span class="text-sm font-semibold tracking-wide transition-colors duration-300" :class="isItemDisabled(item)
                  ? 'text-slate-400 dark:text-gray-500'
                  : $route.path === item.to
                    ? 'text-color1 dark:text-color4'
                    : 'text-slate-600 dark:text-gray-300'
                  ">
                  {{ item.title }}
                </span>

                <div v-if="isItemDisabled(item)" class="text-[8px] text-slate-400 dark:text-gray-500 ">
                  Sin datos de transformador
                </div>
              </div>

            </component>
          </template>
        </v-tooltip>
      </div>

      <div v-if="maintenanceItems.length > 0" class="mt-2 relative">
        <div class="absolute bottom-full left-0 right-0 mb-1 transition-all duration-500 overflow-hidden z-20"
          :class="isMaintenanceExpanded ? 'opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'">

          <div class="bg-gradient-to-br from-slate-50/95 to-slate-100/80 dark:from-slate-800/90 dark:to-slate-700/80 
          border border-slate-200/60 dark:border-slate-600/50 rounded-lg shadow-xl backdrop-blur-sm p-3 space-y-2"
            :class="rail ? '' : ''">

            <div v-for="(item, i) in maintenanceItems" :key="`maintenance-${i}`"
              class="transform transition-all duration-300">
              <v-tooltip :disabled="!rail" :text="item.title" location="end">
                <template #activator="{ props: tooltipProps }">
                  <router-link v-bind="rail ? tooltipProps : {}" :to="item.to"
                    class="flex items-center rounded-lg transition-all duration-300 relative overflow-hidden border backdrop-blur-sm group"
                    :class="[
                      rail ? 'p-2 justify-center mx-1' : 'px-3 py-2 gap-2',
                      $route.path === item.to
                        ? 'bg-gradient-to-r from-color2/20 to-color3/15 dark:from-colorDark4/30 dark:to-colorDark3/25 border-color2/30 dark:border-colorDark4/40 shadow-md'
                        : 'bg-gradient-to-r from-white/90 to-slate-50/80 dark:from-slate-700/60 dark:to-slate-600/40 border-slate-200/40 dark:border-slate-600/30 hover:from-slate-100/90 hover:to-color5/30 dark:hover:from-slate-600/70 dark:hover:to-colorDark3/30 hover:border-color3/40 hover:shadow-md hover:translate-x-0.5'
                    ]">

                    <!-- Indicador activo -->
                    <div v-if="$route.path === item.to"
                      class="absolute left-0 top-1 bottom-1 w-1 bg-gradient-to-b from-color2/80 to-color1/70 rounded-sm shadow-sm" />

                    <!-- Icono -->
                    <div
                      class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                      :class="$route.path === item.to
                        ? 'bg-gradient-to-br from-color2/90 to-color1/80 text-white shadow-md'
                        : 'bg-gradient-to-br from-slate-100 to-slate-200/80 dark:from-slate-600/60 dark:to-slate-500/50 text-color2/90 dark:text-color3/80 border border-slate-200/60 dark:border-slate-500/40 group-hover:bg-gradient-to-br group-hover:from-color2/80 group-hover:to-color1/70 group-hover:text-white group-hover:shadow-md group-hover:border-transparent'
                        ">
                      <svg viewBox="0 0 24 24" class="h-5 w-5">
                        <path :d="$icons[item.icon]" fill="currentColor" />
                      </svg>
                    </div>

                    <!-- Texto -->
                    <div v-if="!rail" class="flex-1 min-w-0">
                      <span class="text-sm font-medium tracking-wide transition-colors duration-300" :class="$route.path === item.to
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200'
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
        <v-tooltip :disabled="!rail" location="end">
          <template #activator="{ props: tooltipProps }">
            <div v-bind="rail ? tooltipProps : {}" @click="toggleMaintenance" class="bg-gradient-to-br from-slate-50/80 to-slate-100/60 dark:from-slate-800/80 dark:to-slate-700/60 
             border border-slate-200/40 dark:border-slate-600/40 rounded-lg overflow-hidden shadow-sm 
             backdrop-blur-sm transition-all duration-300 hover:shadow-md cursor-pointer group
             hover:border-color3/30 dark:hover:border-colorDark4/50">

              <div class="px-3 py-2 bg-color2/20 dark:from-slate-700/60 dark:to-slate-600/40 
                  transition-all duration-300 hover:from-slate-100/70 hover:to-color5/20 
                  dark:hover:from-slate-600/70 dark:hover:to-colorDark3/20 rounded-lg ">
                <div class="flex items-center justify-between pl-1 ">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 bg-gradient-to-br from-color2/85 to-color1/75 dark:from-colorDark4/80 dark:to-color2/70 
                        rounded-lg flex items-center justify-center shadow-sm 
                        transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ">
                      <svg viewBox="0 0 24 24" class="h-4 w-4 text-white">
                        <path
                          d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"
                          fill="currentColor" />
                      </svg>
                    </div>

                    <div v-if="!rail" class="min-w-0 flex-1">
                      <h3 class="text-sm font-medium text-slate-800 dark:text-slate-200 tracking-tight mb-0.5 truncate">
                        Mantenimientos
                      </h3>
                      <p class="text-xs text-slate-600 dark:text-slate-400 font-normal">
                        {{ maintenanceItems.length }} herramienta{{ maintenanceItems.length !== 1 ? 's' : '' }}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-">
                    <div v-if="!rail" class="flex-shrink-0 transition-transform duration-300 "
                      :class="{ 'rotate-180': !isMaintenanceExpanded }">
                      <svg viewBox="0 0 24 24"
                        class="h-4 w-4 text-slate-500 dark:text-slate-400 transition-colors duration-300">
                        <path :d="$icons.arrowtwo" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- SLOT PERSONALIZADO DEL TOOLTIP -->
          <template #default>
            <div class="bg-green-600 text-white px-3 py-1 rounded-md shadow-md text-sm font-medium">
              Mantenimientos
            </div>
          </template>
        </v-tooltip>

      </div>
      <!-- Hasta aquí -->
    </div>


    <template #append>
      <div
        class="border-t border-slate-200 dark:border-gray-700 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">

        <!-- Modo normal: mostrar UserActionsCard completo -->
        <div v-if="!rail" class="p-2.5">
          <UserActionsCard :user="user" :rail="false" @profile="goToProfile" @support="goToSupport"
            @logout="$emit('logout')" />
        </div>

        <!-- Modo rail: mostrar UserActionsCard minimizado -->
        <div v-else class="flex justify-center py-3">
          <UserActionsCard :user="user" :rail="true" @profile="goToProfile" @support="goToSupport"
            @logout="$emit('logout')" />
        </div>

        <div class="text-center">
          <div class="text-xs text-slate-400 dark:text-gray-500 font-medium tracking-wider">
            © 2025 SIMTRA
          </div>
        </div>
      </div>
    </template>


    <v-dialog v-model="showRootProfile" max-width="700px" class="backdrop-blur-md" >
      <ProfileFormRoot @close="closeProfileModal" @success="handleProfileSuccess" />
    </v-dialog>

    <v-dialog v-model="showFactoryProfile" max-width="700px" class="backdrop-blur-md" >
      <ProfileFormFactory @close="closeProfileModal" @success="handleProfileSuccess" />
    </v-dialog>

    <v-dialog v-model="showCustomerProfile" max-width="700px" class="backdrop-blur-md mb-10"  >
      <ProfileFormCustomer @close="closeProfileModal" @success="handleProfileSuccess" />
    </v-dialog>

    <v-dialog v-model="showSupport" max-width="900px" class="backdrop-blur-md"  >
      <FormSupport @close="closeSupportModal" @success="handleProfileSuccess" />
    </v-dialog>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTransformerStore } from '@/features/transformer/store/transformerStore'
import UserActionsCard from './UserMenuComponent.vue'
import ProfileFormFactory from '@/features/profile/components/ProfileFormFactory.vue'
import ProfileFormRoot from '@/features/profile/components/ProfileFormRoot.vue'
import ProfileFormCustomer from '@/features/profile/components/ProfileFormCustomer.vue'
import FormSupport from '@/features/support/components/FormSupport.vue'
import { useAuthStore } from '@/features/auth/stores/authStore'

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

// Profile modal states
const showRootProfile = ref(false)
const showFactoryProfile = ref(false)
const showCustomerProfile = ref(false)
const showSupport = ref(false)

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
    event.preventDefault()
    router.push('/app/factory')
  }
}

import { useRoute } from "vue-router"

const route = useRoute()

function isItemDisabled(item) {
  if (item.category === 'monitoring' || !item.category) {
    const allowedRoutes = ["/app/factoryTransformerDetail", "/app/strain", "/app/current", "/app/frequency", "/app/power", "/app/thdv", "/app/thdi", "/app/temperature", "/app/transformerDetail"]
    const isInAllowedRoute = allowedRoutes.includes(route.path)

    return !(transformerStore.hasTransformer && isInAllowedRoute)
  }
  return false
}

function toggleMaintenance() {
  isMaintenanceExpanded.value = !isMaintenanceExpanded.value
}

function goToProfile() {
  const authStore = useAuthStore()
  const role = authStore.user?.role

  closeAllProfileModals()

  switch (role) {
    case 'ROOT':
      showRootProfile.value = true
      break
    case 'FACTORY':
      showFactoryProfile.value = true
      break
    case 'CUSTOMER':
      showCustomerProfile.value = true
      break
    default:
      showRootProfile.value = true
  }
}

function closeAllProfileModals() {
  showRootProfile.value = false
  showFactoryProfile.value = false
  showCustomerProfile.value = false
}

function closeProfileModal() {
  closeAllProfileModals()
}

function handleProfileSuccess(message) {
  closeAllProfileModals()
  // Aquí puedes mostrar una notificación de éxito si lo deseas
  console.log('Profile updated successfully:', message)
}

function goToSupport() {
  showSupport.value = true
}

function closeAllSupportModals() {
  showSupport.value = false
}

function closeSupportModal() {
  closeAllSupportModals()
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