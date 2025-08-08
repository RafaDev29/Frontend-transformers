<template>
    <section class="w-full py-16 bg-white flex justify-center items-center">
      <div class="container mx-auto px-6 text-center">
        

        <h2 class="text-3xl md:text-5xl font-bold text-blue-900 mb-10">
          ¿Cómo Funciona? ⚙️
        </h2>
  
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
   
          <div class="flex flex-col items-center text-center animate-fade-in">
            <div class="bg-blue-100 p-4 rounded-full shadow-lg">
              <img :src="iconMeasurement" alt="Medición Inteligente" class="w-16 h-16">
            </div>
            <h3 class="mt-4 text-xl font-semibold text-blue-900">Medición Inteligente</h3>
            <p class="text-sm text-gray-600 max-w-xs">
              La electrónica mide el consumo de cada piso en tiempo real.
            </p>
          </div>
  
          <!-- Paso 2 -->
          <div class="flex flex-col items-center text-center animate-fade-in delay-200">
            <div class="bg-blue-100 p-4 rounded-full shadow-lg">
              <img :src="iconCalculation" alt="Cálculo Automático" class="w-16 h-16">
            </div>
            <h3 class="mt-4 text-xl font-semibold text-blue-900">Cálculo Automático</h3>
            <p class="text-sm text-gray-600 max-w-xs">
              Aplicamos las tarifas de Osinergmin y generamos la factura automáticamente.
            </p>
          </div>
  
          <!-- Paso 3 -->
          <div class="flex flex-col items-center text-center animate-fade-in delay-400">
            <div class="bg-blue-100 p-4 rounded-full shadow-lg">
              <img :src="iconPayment" alt="Gestión de Cobros" class="w-16 h-16">
            </div>
            <h3 class="mt-4 text-xl font-semibold text-blue-900">Gestión de Cobros</h3>
            <p class="text-sm text-gray-600 max-w-xs">
              El cliente puede visualizar y sacar reportes de los pagos fácilmente.
            </p>
          </div>
  
        </div>
  
     
  
      </div>
    </section>
  </template>
  
  <script>
  export default {
    props: {
      iconMeasurement: {
        type: String,
        required: false,
        default: "/home/measurement.png" // Ícono de medición inteligente
      },
      iconCalculation: {
        type: String,
        required: false,
        default: "/home/calculation.png" // Ícono de cálculo automático
      },
      iconPayment: {
        type: String,
        required: false,
        default: "/home/payment.png" // Ícono de gestión de cobros
      }
    }
  };
  </script>
  
  <style>
  /* Animación de fade-in */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out;
  }
  .delay-200 {
    animation-delay: 0.2s;
  }
  .delay-400 {
    animation-delay: 0.4s;
  }
  </style>
  