<template>


  <v-app>
    <SidebarComponent v-model="drawer" :rail="!sidebarOpen" :items="allMenuItems" :user="auth.user"
      @toggle="toggleSidebar" @logout="onLogout" @settings="onSettings" app :width="280" :rail-width="96" />

    <v-main class="min-h-screen overflow-hidden">
      <div :class="[$route.meta.fullScreen ? 'content-bleed' : 'content-shell']">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SidebarComponent from '@/components/layout/SidebarComponent.vue'
import { useAuthStore } from '@/features/auth/stores/authStore'

const router = useRouter()
const auth = useAuthStore()
const drawer = ref(true)
const sidebarOpen = ref(true)


const monitoringItems = computed(() => {
  const role = auth.user?.role
  const items = [
    { title: 'Tensión', icon: 'tension', to: '/tension', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'Corriente', icon: 'corriente', to: '/Corriente', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'Frecuencia', icon: 'frecuencia', to: '/Frecuencia', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'Potencia', icon: 'flash', to: '/Potencia', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'THDV', icon: 'mdiWaveform', to: '/THDV', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'THDI', icon: 'mdiWaveform', to: '/THDI', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'Temperatura', icon: 'thermometer', to: '/Temperatura', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
  ]
  return items.filter(i => !i.roles || i.roles.includes(role))
})


const maintenanceItems = computed(() => {
  const role = auth.user?.role
  const items = [
    {
      title: 'Fábricas',
      icon: 'factory',
      to: '/app/mfactory',
      roles: ['ROOT'],
      category: 'maintenance'
    },

    { 
      title: 'Transformadores',
      icon: 'transformer',
      to: '/app/mtransformer',
      roles: ['ROOT'],
      category: 'maintenance'
    },

    {
      title: 'Clientes',
      icon: 'customer',
      to: '/app/mcustomer',
      roles: ['ROOT', 'FACTORY'],
      category: 'maintenance'
    },

     {
      title: 'Rangos',
      icon: 'range',
      to: '/app/mrange',
      roles: ['ROOT'],
      category: 'maintenance'
    },
    {
      title: 'Reglas',
      icon: 'rule',
      to: '/app/mrules',
      roles: ['ROOT'],
      category: 'maintenance'
    },
    
    {
      title: 'Alertas',
      icon: 'Bell',
      to: '/mantenimiento/usuarios',
      roles: ['ROOT'],
      category: 'maintenance'
    },

   

    


  ]
  return items.filter(i => !i.roles || i.roles.includes(role))
})

const allMenuItems = computed(() => {
  return [...monitoringItems.value, ...maintenanceItems.value]
})

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function onLogout() {
  auth.clearSession()
  router.push({ name: 'auth.login' })
}

function onSettings() {
  router.push({ name: 'settings' })
}
</script>

<style scoped>
.content-shell {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 16px;
  margin: 2px;
  overflow: auto;
}

@media (min-width: 960px) {
  .content-shell {
    padding: 24px;
    @apply dark:bg-slate-900/100;
  }
}

.content-bleed {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0;
  overflow: hidden;
}
</style>