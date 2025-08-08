<!-- src/components/layout/PublicLayout.vue -->
<template>
  <v-app>
    <Navbar />
    <v-main class="bg-gray-100 min-h-screen">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from '@/components/layout/NavbarComponent.vue'
</script>
