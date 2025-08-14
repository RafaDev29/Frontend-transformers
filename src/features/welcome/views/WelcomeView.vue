<!-- src/features/welcome/views/WelcomeView.vue -->
<template>
  <div class="welcome-layer" :style="bgStyle">
    <!-- Overlay verde oscuro translúcido -->
    <div class="absolute inset-0 bg-colorDark3/10"></div>

    <!-- Contenido centrado -->
    <div class="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-4">
      <h1
        class="font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-[0.25em]
               drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] select-none"
      >
        <span class="text-color5">S</span>
        <span class="text-color4">I</span>
        <span class="text-color3">M</span>
        <span class="text-color2">T</span>
        <span class="text-color5">R</span>
        <span class="text-color4">A</span>
      </h1>

      <p
        class="mt-4 text-color5 text-sm sm:text-base md:text-lg font-medium
               drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
      >
        Sistema Inteligente de Monitoreo de Transformadores en Tiempo Real
      </p>
    </div>
  </div>
</template>

<script setup>
import bg from '@/assets/welcome/welcome.jpeg'
const bgStyle = { backgroundImage: `url(${bg})` }
</script>

<style scoped>
.welcome-layer {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
</style>
