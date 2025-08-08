<template>
  <nav class="bg-color1 text-white shadow-lg relative z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo y Texto -->
        <router-link to="/" class="flex items-center space-x-4 hover:opacity-90 transition-opacity">
          <!-- Espacio para el logo -->
          <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
            <!-- Aquí va tu logo -->
            <div class="w-8 h-8 bg-color1 rounded"></div>
          </div>
          
          <!-- Texto del sistema -->
          <div class="flex flex-col">
            <!-- Iniciales con colores diferentes -->
            <div class="flex items-center space-x-1 text-2xl font-bold tracking-wider">
              <span class="text-color5">S</span>
              <span class="text-color4">E</span>
              <span class="text-color3">M</span>
              <span class="text-color2">T</span>
            </div>
            <!-- Texto completo -->
            <div class="text-color4 text-sm font-medium leading-tight -mt-1">
              Sistema Eficiente de Monitoreo de Transformadores
            </div>
          </div>
        </router-link>

        <!-- Menu Desktop -->
        <div class="hidden lg:flex space-x-8 items-center">
          <router-link 
            to="/" 
            class="text-white hover:text-color4 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-color2/20"
          >
            Inicio
          </router-link>
          <router-link 
            to="/soluciones" 
            class="text-white hover:text-color4 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-color2/20"
          >
            Soluciones
          </router-link>
          <router-link 
            to="/planes" 
            class="text-white hover:text-color4 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-color2/20"
          >
            Planes
          </router-link>
          <router-link
            to="/login"
            class="bg-color3 text-white px-6 py-3 rounded-lg hover:bg-color2 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Iniciar Sesión
          </router-link>
        </div>

        <!-- Botón móvil mejorado -->
        <button 
          class="lg:hidden focus:outline-none p-2 rounded-md hover:bg-color2/20 transition-colors duration-200" 
          @click="toggleMenu"
        >
          <svg class="h-6 w-6 transition-transform duration-200" 
               :class="{ 'rotate-90': isOpen }"
               fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path v-if="!isOpen" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Overlay para móvil -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
      @click="closeMenu"
    ></div>

    <!-- Menú lateral móvil -->
    <div 
      class="fixed top-0 right-0 h-full w-80 bg-color1 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
    >
      <!-- Header del menú -->
      <div class="flex items-center justify-between p-6 border-b border-color2/30">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
            <div class="w-6 h-6 bg-color1 rounded"></div>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center space-x-1 text-lg font-bold">
              <span class="text-color5">S</span>
              <span class="text-color4">E</span>
              <span class="text-color3">M</span>
              <span class="text-color2">T</span>
            </div>
            <div class="text-color4 text-xs font-medium -mt-1">
              Sistema de Monitoreo
            </div>
          </div>
        </div>
        <button 
          @click="closeMenu"
          class="p-2 rounded-full hover:bg-color2/20 transition-colors duration-200"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Enlaces del menú -->
      <div class="py-6 space-y-2">
        <router-link 
          to="/" 
          class="flex items-center space-x-4 px-6 py-4 text-white hover:bg-color2/20 hover:text-color4 transition-all duration-200 border-l-4 border-transparent hover:border-color4"
          @click="closeMenu"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="font-medium">Inicio</span>
        </router-link>

        <router-link 
          to="/soluciones" 
          class="flex items-center space-x-4 px-6 py-4 text-white hover:bg-color2/20 hover:text-color4 transition-all duration-200 border-l-4 border-transparent hover:border-color4"
          @click="closeMenu"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span class="font-medium">Soluciones</span>
        </router-link>

        <router-link 
          to="/planes" 
          class="flex items-center space-x-4 px-6 py-4 text-white hover:bg-color2/20 hover:text-color4 transition-all duration-200 border-l-4 border-transparent hover:border-color4"
          @click="closeMenu"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span class="font-medium">Planes</span>
        </router-link>

        <div class="px-6 pt-6">
          <router-link
            to="/login"
            class="flex items-center justify-center space-x-2 w-full bg-color3 text-white px-6 py-4 rounded-lg hover:bg-color2 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            @click="closeMenu"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Iniciar Sesión</span>
          </router-link>
        </div>
      </div>

      <!-- Footer del menú móvil -->
      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-color2/30">
        <div class="text-center text-color4 text-sm">
          <p class="font-medium">SEMT</p>
          <p class="text-xs opacity-75">Monitoreo Inteligente</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>