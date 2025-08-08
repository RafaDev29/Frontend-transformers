<template>
    <div class="w-full py-5 bg-white flex justify-center items-center">
      <div class="mx-auto px-16 text-center">
        <h1 class="text-4xl font-extrabold tracking-wide  text-blue-900">1️⃣ El Problema 📉</h1>
        <p class="text-lg text-blue-700 mb-8">
          Identificamos los principales problemas en la facturación de energía y cómo nuestra solución optimiza cada uno.
        </p>
  
        <div class="grid md:grid-cols-3 gap-8">
          <div class="problema-card">
            <h3 class="text-xl font-semibold text-blue-900">⚡ Cobros inexactos</h3>
            <p class="text-blue-700">El cálculo manual de consumo genera errores y reclamos.</p>
          </div>
          <div class="problema-card">
            <h3 class="text-xl font-semibold text-blue-900">👀 Falta de transparencia</h3>
            <p class="text-blue-700">Los inquilinos no pueden ver su consumo real en tiempo real.</p>
          </div>
          <div class="problema-card">
            <h3 class="text-xl font-semibold text-blue-900">⏳ Pérdida de tiempo</h3>
            <p class="text-blue-700">Los procesos de facturación manual son tediosos y lentos.</p>
          </div>
        </div>
  
       
        <div class="mt-16">
          <h2 class="text-3xl font-bold mb-6 text-blue-900">📌 Facturación Manual vs. Automatizada</h2>
          <div class="grid md:grid-cols-2 gap-10 items-center">
            <div class="comparacion-card bg-blue-100 border-blue-700">
              <h3 class="text-xl font-semibold text-red-600">❌ Facturación Manual</h3>
              <ul class="text-blue-900">
                <li>📌 Cálculos propensos a errores.</li>
                <li>📌 Recibos escritos a mano.</li>
                <li>📌 Retrasos en la entrega de facturas.</li>
                <li>📌 Falta de reportes en tiempo real.</li>
              </ul>
            </div>
            <div class="comparacion-card bg-blue-100 border-green-600">
              <h3 class="text-xl font-semibold text-green-600">✅ Facturación Automatizada</h3>
              <ul class="text-blue-900">
                <li>🚀 Cálculos automáticos y precisos.</li>
                <li>🚀 Recibos digitales generados con un clic.</li>
                <li>🚀 Procesos rápidos y eficientes.</li>
                <li>🚀 Reportes en tiempo real y accesibles.</li>
              </ul>
            </div>
          </div>
        </div>
  
        <!-- Imagen representativa -->
        <div class="mt-12 flex justify-center">
          <img src="/home/solutions.png" alt="Comparación Facturación" class="w-full max-w-3xl rounded-lg shadow-lg border border-blue-300">
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .problema-card {
    @apply bg-blue-100 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105;
  }
  
  .comparacion-card {
    @apply p-6 rounded-lg shadow-lg border-l-4 text-left;
  }
  </style>
  