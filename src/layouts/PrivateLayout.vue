<template>
  <v-app>
    <!-- App bar superior con botón para abrir/cerrar el sidebar en móviles -->
    <v-app-bar app flat color="white">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-lg-none" />
      <v-toolbar-title class="font-semibold text-slate-700">
        Panel
      </v-toolbar-title>
      <v-spacer />
      <!-- Info de usuario + logout -->
      <div class="flex items-center gap-3 mr-2">
        <v-chip v-if="auth.user" size="small" color="primary" variant="flat">
          {{ auth.user.username }} • {{ auth.user.role }}
        </v-chip>
        <v-btn size="small" variant="text" color="red" @click="onLogout">
          Cerrar sesión
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Sidebar -->
    <SidebarComponent
      v-model="drawer"
      :items="menuItems"
      class="hidden-lg-and-down:block"
    />

    <!-- Contenido -->
    <v-main class="bg-gray-100 min-h-screen">
      <div class="p-4 md:p-6">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SidebarComponent from '@/components/layout/SidebarComponent.vue'
import { useAuthStore } from '@/features/auth/stores/authStore'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

// drawer visible en desktop por defecto
const drawer = ref(true)

// Menú según rol (ajusta rutas a tus features reales)
const menuItems = computed(() => {
  const role = auth.user?.role
  const base = [
    { title: 'Inicio',      icon: 'mdi-home',        to: '/start',       roles: ['ADMIN','CUSTOMER','OPERATOR','ROOT'] },
    { title: 'Power',       icon: 'mdi-flash',       to: '/power',       roles: ['CUSTOMER','ROOT'] },
    { title: 'Monitoreo',   icon: 'mdi-monitor-eye', to: '/monitor',     roles: ['OPERATOR','ADMIN','ROOT'] },
    { title: 'Administrar', icon: 'mdi-shield-key',  to: '/admin',       roles: ['ADMIN'] },
    { title: 'Perfil',      icon: 'mdi-account',     to: '/profile',     roles: ['ADMIN','CUSTOMER','OPERATOR','ROOT'] },
  ]
  return base.filter(i => !i.roles || i.roles.includes(role))
})

function onLogout() {
  auth.clearSession()
  router.push({ name: 'auth.login' })
}
</script>
