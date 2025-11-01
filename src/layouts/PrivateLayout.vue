<template>
  <v-app :theme="vuetifyTheme">
    <SidebarComponent v-model="drawer" :rail="!sidebarOpen" :items="allMenuItems" :user="auth.user"
      @toggle="toggleSidebar" @logout="onLogout" @settings="onSettings" app :width="280" :rail-width="90" />

    <v-main class="main-layout">
      <div :class="[$route.meta.fullScreen ? 'content-bleed' : 'content-shell']">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import SidebarComponent from '@/components/layout/SidebarComponent.vue'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { useFactoryStore } from '@/features/factory/store/factoryStore'
import { useTransformerStore } from '@/features/transformer/store/transformerStore'

const router = useRouter()
const transformer = useTransformerStore()
const factory = useFactoryStore()
const auth = useAuthStore()
const drawer = ref(true)
const sidebarOpen = ref(true)

// 👇 Manejo del tema
const theme = useTheme()
const vuetifyTheme = ref('dark')

// Inicializar tema al montar
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
  vuetifyTheme.value = initialTheme
  
  // Aplicar clase dark a html (para Tailwind)
  document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  
  // Sincronizar con Vuetify
  theme.global.name.value = initialTheme
})

// Observar cambios en el tema de Vuetify (cuando se cambia desde UserMenuComponent)
watch(() => theme.global.name.value, (newTheme) => {
  vuetifyTheme.value = newTheme
  document.documentElement.classList.toggle('dark', newTheme === 'dark')
})

const monitoringItems = computed(() => {
  const role = auth.user?.role
  const items = [
    { title: 'Tensión', icon: 'strain', to: '/app/strain', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'Corriente', icon: 'corriente', to: '/app/current', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'Frecuencia', icon: 'frecuencia', to: '/app/frequency', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'Potencia', icon: 'flash', to: '/app/power', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'THDV', icon: 'thdv', to: '/app/thdv', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'THDI', icon: 'thdi', to: '/app/thdi', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
    { title: 'Temperatura', icon: 'thermometer', to: '/app/temperature', roles: ['CUSTOMER', 'FACTORY', 'ROOT'], category: 'monitoring' },
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
      roles: ['ROOT', 'FACTORY'],
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
      title: 'Alertas',
      icon: 'Bell',
      to: '/app/malert',
      roles: ['ROOT', 'CUSTOMER', 'FACTORY'],
      category: 'maintenance'
    },
    {
      title: 'Reglas',
      icon: 'rule',
      to: '/app/mrule',
      roles: ['ROOT', 'CUSTOMER', 'FACTORY'],
      category: 'maintenance'
    },
      {
      title: 'Carga',
      icon: 'upload',
      to: '/app/mupload',
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
  factory.clearFactory()
  transformer.clearTransformer()
  router.push({ name: 'auth.login' })
}

function onSettings() {
  router.push({ name: 'settings' })
}
</script>

<style>
.main-layout {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content-shell {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 2px;
  margin: 2px;
}

@media (min-width: 960px) {
  .content-shell {
  }
}

@supports (height: 100dvh) {
  .main-layout {
    height: 100dvh;
  }
}

.content-shell,
.content-bleed {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 2px;
  margin: 2px;
}
</style>