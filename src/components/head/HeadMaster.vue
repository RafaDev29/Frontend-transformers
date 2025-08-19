<!-- src/components/Head.vue -->
<template>
  <header class="p-5 relative overflow-hidden bg-gradient-to-r from-petroleum via-colorDark1 to-petroleum text-white shadow-xl mb-1">
    <!-- Patrón decorativo de fondo -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      <div class="absolute -top-10 -right-10 w-40 h-40 bg-color3/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-color2/20 rounded-full blur-2xl"></div>
    </div>

    <div class="relative flex items-center justify-between p-6 lg:px-8">
      <!-- Información de empresa -->
      <div class="flex-1">
        <h1 class="text-3xl lg:text-4xl font-bold mb-2 text-white drop-shadow-sm">
          {{ company.name }}
        </h1>
        <div class="space-y-1 text-slate-100">
          <p class="flex items-center text-sm lg:text-base font-medium">
            <svg class="w-4 h-4 mr-2 text-color4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clip-rule="evenodd"/>
            </svg>
            RUC: {{ company.ruc }}
          </p>
          <p class="flex items-center text-sm lg:text-base">
            <svg class="w-4 h-4 mr-2 text-color4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            {{ company.address }}
          </p>
        </div>
      </div>

      <!-- Logo con diseño mejorado -->
      <div class="flex-shrink-0 ml-6">
        <div class="relative group">
          <!-- Efecto de resplandor -->
          <div class="absolute -inset-2 bg-gradient-to-r from-color3/50 to-color4/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- Contenedor del logo -->
          <div class="relative bg-white rounded-2xl p-3 shadow-2xl border-2 border-white/20 backdrop-blur-sm">
            <img
              :src="company.logo"
              :alt="`Logo de ${company.name}`"
              class="w-24 h-24 lg:w-28 lg:h-28 object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <!-- Indicador de estado (opcional) -->
          <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-accent-success rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Línea decorativa inferior -->
    <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-color3 via-color4 to-color3"></div>
  </header>
</template>

<script setup>
import { reactive } from 'vue'

const company = reactive({
  name: 'EMPRESA SAC',
  ruc: '20601578901',
  address: 'Av. Los Próceres 1250 – Lima, Perú',
  logo: 'https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg'
})
</script>