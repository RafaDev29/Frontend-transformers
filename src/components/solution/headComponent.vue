<template>
  <header
    class="relative w-full min-h-[14rem] md:min-h-[18rem] flex flex-col items-center justify-center 
           text-center bg-gradient-to-r from-color1 via-color2 to-color3 overflow-hidden px-3 sm:px-6 md:px-8">

    <img
      src="@/assets/solution/solution.jpg"
      alt="Monitoreo de transformadores"
      class="absolute inset-0 w-full h-full object-cover opacity-30"
    />

    <div class="relative z-10 text-white max-w-3xl mx-auto">
      <h1
        class="text-lg sm:text-xl md:text-3xl font-semibold tracking-wide drop-shadow-lg leading-snug sm:leading-normal"
      >
        SOLUCIÓN DE SOFTWARE PARA MONITOREO DE TRANSFORMADORES
      </h1>

      <p
        class="mt-3 text-xs sm:text-sm md:text-lg font-light tracking-wide opacity-90 max-w-2xl mx-auto px-2"
      >
        Nuestra plataforma se integra con sensores y equipos IoT para capturar variables críticas de los transformadores
        (<span class="italic">tensión, corriente, temperatura, carga, aceite</span> y más), analiza su desempeño en tiempo real y genera
        alertas tempranas para prevenir fallas, optimizar la operación y reducir costos de mantenimiento y energía.
      </p>

      <div class="mt-5 flex justify-center">
        <button
          class="mb-5 bg-colorDark1 text-white px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-lg shadow-md 
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
