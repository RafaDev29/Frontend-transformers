<template>
    <div class="bg-white text-blue-900 min-h-screen py-16 px-6">
      <div class="max-w-5xl mx-auto text-center">
        <h1 class="text-4xl font-extrabold tracking-wide mb-4 text-blue-900">2️⃣ Nuestra Solución ⚙️</h1>
        <p class="text-lg text-blue-700 mb-8">
          Nuestro sistema optimiza la medición, facturación y administración del consumo energético en edificios.
        </p>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="solucion-card">
            <h3 class="text-xl font-semibold text-blue-900">🔹 Medición en tiempo real</h3>
            <p class="text-blue-700">La electrónica registra el consumo de cada piso con precisión.</p>
          </div>
          <div class="solucion-card">
            <h3 class="text-xl font-semibold text-blue-900">🔹 Tarifas siempre actualizadas</h3>
            <p class="text-blue-700">Validación con Osinergmin para asegurar tarifas correctas.</p>
          </div>
          <div class="solucion-card">
            <h3 class="text-xl font-semibold text-blue-900">🔹 Generación automática de recibos</h3>
            <p class="text-blue-700">Recibos listos para enviar automáticamente a los inquilinos.</p>
          </div>
          <div class="solucion-card">
            <h3 class="text-xl font-semibold text-blue-900">🔹 Panel de administración</h3>
            <p class="text-blue-700">Los clientes tienen control total sobre la facturación y consumos.</p>
          </div>
        </div>
  
     
        <div class="mt-16">
          <h2 class="text-3xl font-bold mb-6 text-blue-900">📌 Proceso de Facturación en Acción</h2>
          <div class="flex justify-center">
            <img src="/images/animacion-recibo.gif" alt="Generación de Recibo" class="w-full max-w-md rounded-lg shadow-lg">
          </div>
        </div>
  
      
      </div>
    </div>
  </template>
  
  <style scoped>
  .solucion-card {
    @apply bg-blue-100 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105;
  }
  
  .screenshot {
    @apply w-full max-w-md rounded-lg shadow-lg border border-blue-300;
  }
  </style>
  