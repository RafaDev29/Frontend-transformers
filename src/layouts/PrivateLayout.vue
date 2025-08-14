<!-- src/layouts/PrivateLayout.vue -->
<template>
  <v-app>
    <SidebarComponent v-model="drawer" :rail="!sidebarOpen" :items="menuItems" :user="auth.user" @toggle="toggleSidebar"
      @logout="onLogout" @settings="onSettings" app :width="280" :rail-width="96" />

    <!-- Dejamos que Vuetify calcule ancho/alto; ocultamos overflow global para full-bleed -->
    <v-main class="min-h-screen overflow-hidden">
      <!-- contenedor base relativo para que las vistas full-bleed posicionen absolute -->
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

const menuItems = computed(() => {
  const role = auth.user?.role
  const base = [
    { title: 'Tensión', icon: 'gauge', to: '/tension', roles: ['CUSTOMER'] },
    { title: 'Corriente', icon: 'flash', to: '/Corriente', roles: ['CUSTOMER'] },
    { title: 'Frecuencia', icon: 'timer', to: '/Frecuencia', roles: ['CUSTOMER'] },
    { title: 'Potencia', icon: 'light', to: '/Potencia', roles: ['CUSTOMER'] },
    { title: 'THDV', icon: 'cog', to: '/THDV', roles: ['CUSTOMER'] },
    { title: 'THDI', icon: 'cog', to: '/THDI', roles: ['CUSTOMER'] },
    { title: 'Temperatura', icon: 'shield', to: '/Temperatura', roles: ['CUSTOMER'] },
  ]
  return base.filter(i => !i.roles || i.roles.includes(role))
})

function toggleSidebar() { sidebarOpen.value = !sidebarOpen.value }
function onLogout() { auth.clearSession(); router.push({ name: 'auth.login' }) }
function onSettings() { router.push({ name: 'settings' }) }
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
  margin-left: 5px;
  overflow: auto;
 
}

@media (min-width: 960px) {
  .content-shell {
    padding: 24px;
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
