<template>
  <header class="relative w-full h-56 md:h-72 flex flex-col items-center justify-center bg-gradient-to-r from-color1 via-color2 to-color3">
    <img
      src="@/assets/home/transformes.png"
      alt="Transformes energía"
      class="absolute inset-0 w-full h-full object-cover opacity-30"
    />

    <div class="relative z-10 text-center text-white px-4">
  <h1 class="text-xl md:text-3xl font-semibold tracking-wide drop-shadow-lg">
     SISTEMA EFICIENTE DE MONITOREO DE TRANSFORMADORES
  </h1>

  <p class="mt-2 text-sm md:text-lg font-light tracking-wide opacity-90 max-w-xl mx-auto">
    Plataforma centralizada que permite supervisar en tiempo real el estado y rendimiento de los transformadores,
    detectando anomalías, optimizando su operación y prolongando su vida útil en entornos industriales,
    comerciales e institucionales.
  </p>

  <button
    class="mt-4 bg-colorDark1 text-white px-5 py-2 font-bold rounded-lg shadow-lg hover:bg-color2 transform transition-all duration-500"
    @click="showQuoteForm = true">
    Cotizar
  </button>
</div>


    <!-- Componente del formulario de cotización -->
    <QuoteForm v-model="showQuoteForm" />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import QuoteForm from '@/components/ui/forms/QuotationForm.vue'

const showQuoteForm = ref(false)
</script>
