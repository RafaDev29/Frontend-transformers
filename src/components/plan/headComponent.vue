<template>
  <header class="relative w-full h-56 md:h-72 flex flex-col items-center justify-center bg-gradient-to-r from-color1 via-color2 to-color3">
    <!-- Imagen de fondo -->
    <img
      src="@/assets/plan/plans.jpg"
      alt="Planes de monitoreo de transformadores"
      class="absolute inset-0 w-full h-full object-cover opacity-30"
    />

    <!-- Contenido -->
    <div class="relative z-10 text-center text-white px-4">
      <h1 class="text-xl md:text-3xl font-semibold tracking-wide drop-shadow-lg">
        NUESTROS PLANES
      </h1>

      <p class="mt-2 text-sm md:text-lg font-light tracking-wide opacity-90 max-w-3xl mx-auto">
        Te ayudamos a elegir la mejor combinación para el <span class="font-semibold">monitoreo de transformadores</span>:
        telemetría en tiempo real, alertas tempranas, análisis histórico y reportes ejecutivos. 
        Selecciona el plan que mejor se adapte a la operación y tamaño de tu empresa.
      </p>

      <button
        class="mt-4 bg-colorDark1 text-white px-5 py-2 font-bold rounded-lg shadow-lg hover:bg-color2 transform transition-all duration-500"
        @click="showQuoteForm = true">
        Cotizar
      </button>
    </div>

    <!-- Formulario de cotización -->
    <QuoteForm v-model="showQuoteForm" />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import QuoteForm from '@/components/ui/forms/QuotationForm.vue'

const showQuoteForm = ref(false)
</script>
