<template>
  <section class="w-full py-16 bg-color5/10 flex justify-center items-center">
    <div class="container mx-auto px-6 flex flex-col md:flex-row items-center md:space-x-10">
      <div
        class="relative w-full md:w-[500px] lg:w-[500px] shadow-2xl rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-500"
      >
        <img
          src="@/assets/home/monitoring.png"
          alt="Dashboard de monitoreo de transformadores"
          class="w-auto h-auto"
        />
      </div>

      <!-- Texto -->
      <div class="mt-6 md:mt-0 max-w-lg text-petroleum text-left animate-fade-in">
        <h2 class="text-2xl md:text-4xl font-bold text-colorDark1 mb-4">
          Monitorea y gestiona tus transformadores en tiempo real ⚡
        </h2>

        <p class="text-sm md:text-base leading-relaxed text-petroleum/90">
          Visualiza variables críticas (tensión, corriente, temperatura, carga y aceite) con gráficos claros y reportes
          automáticos. Detecta anomalías a tiempo, reduce riesgos de falla y prolonga la vida útil de tus equipos.
        </p>

        <ul class="mt-4 space-y-2 text-sm text-petroleum/80">
          <li>- Alertas tempranas por sobrecarga, sobretemperatura y desequilibrios</li>
          <li>- Análisis histórico y tendencias para mantenimiento predictivo</li>
          <li>- Integración con sistemas existentes y reportes ejecutivos</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
// sin props: la imagen se importa vía etiqueta <img> desde /src/assets/...
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
</style>
