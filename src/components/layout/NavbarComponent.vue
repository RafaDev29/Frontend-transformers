<template>
  <nav class="bg-gradient-to-r from-petroleum to-colorDark1 text-white shadow-2xl relative z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <router-link to="/start" class="flex items-center space-x-4 hover:opacity-90 transition-opacity">
          <div class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/20">
            <div class="w-8 h-8 bg-gradient-to-br from-color3 to-color1 rounded-lg"></div>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center space-x-1 text-2xl font-bold tracking-wider">
              <span class="text-color5 drop-shadow-sm">S</span>
              <span class="text-color4 drop-shadow-sm">E</span>
              <span class="text-color3 drop-shadow-sm">M</span>
              <span class="text-color2 drop-shadow-sm">T</span>
            </div>
            <div class="text-color5/80 text-sm font-medium leading-tight -mt-1">
              Sistema Eficiente de Monitoreo de Transformadores
            </div>
          </div>
        </router-link>

        <div class="hidden lg:flex space-x-2 items-center">
          <router-link 
            to="/start" 
            class="text-white/90 hover:text-color4 hover:bg-white/10 transition-all duration-200 font-medium px-4 py-2 rounded-lg backdrop-blur-sm"
          >
            Inicio
          </router-link>
          <router-link 
            to="/solution" 
            class="text-white/90 hover:text-color4 hover:bg-white/10 transition-all duration-200 font-medium px-4 py-2 rounded-lg backdrop-blur-sm"
          >
            Soluciones
          </router-link>
          <router-link 
            to="/plans" 
            class="text-white/90 hover:text-color4 hover:bg-white/10 transition-all duration-200 font-medium px-4 py-2 rounded-lg backdrop-blur-sm"
          >
            Planes
          </router-link>
          <router-link
            to="/auth/login"
            class="bg-gradient-to-r from-color2 to-color1 hover:from-color3 hover:to-color2 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-white/20 backdrop-blur-sm"
          >
            Iniciar Sesión
          </router-link>
        </div>


        <button 
          class="lg:hidden focus:outline-none p-3 rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm border border-white/20" 
          @click="toggleMenu"
        >
          <svg class="h-6 w-6 transition-transform duration-300" 
               :class="{ 'rotate-180': isOpen }"
               fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path v-if="!isOpen" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>


    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
      @click="closeMenu"
    ></div>

    <div 
      class="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-petroleum via-colorDark1 to-colorDark2 shadow-2xl z-50 transform transition-all duration-300 ease-out lg:hidden backdrop-blur-lg border-l border-white/10"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
    >
      <div class="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/20">
            <div class="w-6 h-6 bg-gradient-to-br from-color3 to-color1 rounded-lg"></div>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center space-x-1 text-lg font-bold">
              <span class="text-color5 drop-shadow-sm">S</span>
              <span class="text-color4 drop-shadow-sm">E</span>
              <span class="text-color3 drop-shadow-sm">M</span>
              <span class="text-color2 drop-shadow-sm">T</span>
            </div>
            <div class="text-color5/70 text-xs font-medium -mt-1">
              Sistema de Monitoreo
            </div>
          </div>
        </div>
        <button 
          @click="closeMenu"
          class="p-2 rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm border border-white/20"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

  
      <div class="py-6 space-y-1">
        <router-link 
          to="/start" 
          class="flex items-center space-x-4 mx-4 px-4 py-4 text-white/90 hover:bg-white/10 hover:text-color4 transition-all duration-200 rounded-xl border-l-4 border-transparent hover:border-color4 backdrop-blur-sm group"
          @click="closeMenu"
        >
          <div class="p-2 rounded-lg bg-white/5 group-hover:bg-color4/20 transition-all duration-200">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span class="font-medium">Inicio</span>
        </router-link>

        <router-link 
          to="/solution" 
          class="flex items-center space-x-4 mx-4 px-4 py-4 text-white/90 hover:bg-white/10 hover:text-color4 transition-all duration-200 rounded-xl border-l-4 border-transparent hover:border-color4 backdrop-blur-sm group"
          @click="closeMenu"
        >
          <div class="p-2 rounded-lg bg-white/5 group-hover:bg-color4/20 transition-all duration-200">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span class="font-medium">Soluciones</span>
        </router-link>

        <router-link 
          to="/plans" 
          class="flex items-center space-x-4 mx-4 px-4 py-4 text-white/90 hover:bg-white/10 hover:text-color4 transition-all duration-200 rounded-xl border-l-4 border-transparent hover:border-color4 backdrop-blur-sm group"
          @click="closeMenu"
        >
          <div class="p-2 rounded-lg bg-white/5 group-hover:bg-color4/20 transition-all duration-200">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span class="font-medium">Planes</span>
        </router-link>

        <div class="px-4 pt-6">
          <router-link
            to="/auth/login"
            class="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-color2/80 to-color1/80 hover:from-color3 hover:to-color2 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 backdrop-blur-sm border border-white/20"
            @click="closeMenu"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
            </svg>
            <span>Iniciar Sesión</span>
          </router-link>
        </div>
      </div>


      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div class="text-center text-color5/80">
          <p class="font-medium text-lg">SEMT</p>
          <p class="text-sm opacity-70">Monitoreo Inteligente</p>
          <div class="mt-2 flex justify-center space-x-1">
            <div class="w-2 h-2 bg-color4 rounded-full opacity-50"></div>
            <div class="w-2 h-2 bg-color3 rounded-full opacity-70"></div>
            <div class="w-2 h-2 bg-color2 rounded-full opacity-50"></div>
          </div>
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
  // Prevenir scroll del body cuando el menú está abierto
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }
}

const closeMenu = () => {
  isOpen.value = false
  document.body.style.overflow = 'unset'
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
  document.body.style.overflow = 'unset'
})
</script>