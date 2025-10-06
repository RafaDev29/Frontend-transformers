<template>
  <header
    class="relative w-full min-h-[14rem] md:min-h-[18rem] flex flex-col items-center justify-center 
           text-center bg-gradient-to-r from-color1 via-color2 to-color3 overflow-hidden px-3 sm:px-6 md:px-8">

    <!-- Imagen de fondo -->
    <img
      src="@/assets/plan/plans.jpg"
      alt="Planes de monitoreo de transformadores"
      class="absolute inset-0 w-full h-full object-cover opacity-30"
    />

    <!-- Contenido -->
    <div class="relative z-10 text-white max-w-3xl mx-auto">
      <h1
        class="text-lg sm:text-xl md:text-3xl font-semibold tracking-wide drop-shadow-lg leading-snug sm:leading-normal"
      >
        NUESTROS PLANES
      </h1>

      <p
        class="mt-3 text-xs sm:text-sm md:text-lg font-light tracking-wide opacity-90 max-w-2xl mx-auto px-2"
      >
        Te ayudamos a elegir la mejor combinación para el 
        <span class="font-semibold">monitoreo de transformadores</span>:
        telemetría en tiempo real, alertas tempranas, análisis histórico y reportes ejecutivos. 
        Selecciona el plan que mejor se adapte a la operación y tamaño de tu empresa.
      </p>

      <div class="mt-5 flex justify-center">
        <button
          class="bg-colorDark1 text-white px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-lg shadow-md 
                 hover:bg-color2 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          @click="showQuoteForm = true"
        >
          Cotizar
        </button>
      </div>
    </div>


    <QuoteForm v-model="showQuoteForm" class="backdrop-blur-md" />
  </header>
</template>
<script setup>
import { ref } from 'vue'
import QuoteForm from '@/components/ui/forms/QuotationForm.vue'

const showQuoteForm = ref(false)
</script>
