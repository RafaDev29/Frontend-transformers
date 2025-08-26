<template>


  <v-app >
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


// Items de monitoreo (existentes)
const monitoringItems = computed(() => {
  const role = auth.user?.role
  const items = [
    { title: 'Tensión', icon: 'gauge', to: '/tension', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'Corriente', icon: 'flash', to: '/Corriente', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'Frecuencia', icon: 'timer', to: '/Frecuencia', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'Potencia', icon: 'light', to: '/Potencia', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'THDV', icon: 'cog', to: '/THDV', roles: ['CUSTOMER', 'FACTORY' , 'ROOT'], category: 'monitoring' },
    { title: 'THDI', icon: 'cog', to: '/THDI', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'Temperatura', icon: 'shield', to: '/Temperatura', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
  ]
  return items.filter(i => !i.roles || i.roles.includes(role))
})


const maintenanceItems = computed(() => {
  const role = auth.user?.role
  const items = [
    {
      title: 'Transformadores',
      icon: 'gauge',
      to: '/app/mtransformer',
      roles: [ 'ROOT'],
      category: 'maintenance'
    },

    {
      title: 'Empresas',
       icon: 'gauge',
      to: '/mantenimiento/usuarios',
      roles: ['ROOT'],
      category: 'maintenance'
    },
     {
      title: 'Fabricas',
         icon: 'gauge',
      to: '/mantenimiento/usuarios',
      roles: ['ROOT'],
      category: 'maintenance'
    },
    {
      title: 'Alertas',
      icon: 'gauge',
      to: '/mantenimiento/usuarios',
      roles: ['ROOT'],
      category: 'maintenance'
    },
   

  ]
  return items.filter(i => !i.roles || i.roles.includes(role))
})

// Combinamos todos los items
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
/* Vistas normales: padding + scroll local si hace falta */
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

/* Full-bleed (fondos o lienzos) */
.content-bleed {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0;
  overflow: hidden;
}
</style>