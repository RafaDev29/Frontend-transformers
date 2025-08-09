<template>
  <section class="w-full py-16 bg-white flex justify-center items-center">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-3xl md:text-5xl font-bold text-colorDark1 mb-10">
        ¿Cómo funciona?
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="flex flex-col items-center text-center animate-fade-in">
          <div class="bg-color5 p-4 rounded-full shadow-lg">
            <img src="@/assets/home/datos.png" alt="Adquisición de datos" class="w-16 h-16" />
          </div>
          <h3 class="mt-4 text-xl font-semibold text-colorDark1">Adquisición de datos</h3>
          <p class="text-sm text-petroleum/80 max-w-xs">
            Sensores e IoT capturan tensión, corriente, temperatura y carga del transformador en tiempo real.
          </p>
        </div>

        <div class="flex flex-col items-center text-center animate-fade-in delay-200">
          <div class="bg-color5 p-4 rounded-full shadow-lg">
            <img src="@/assets/home/analytics.png" alt="Análisis inteligente" class="w-16 h-16" />
          </div>
          <h3 class="mt-4 text-xl font-semibold text-colorDark1">Análisis inteligente</h3>
          <p class="text-sm text-petroleum/80 max-w-xs">
            El motor analítico detecta anomalías, estima vida útil y genera insights operativos y de mantenimiento.
          </p>
        </div>

        <div class="flex flex-col items-center text-center animate-fade-in delay-400">
          <div class="bg-color5 p-4 rounded-full shadow-lg">
            <img src="@/assets/home/analytics.png" alt="Alertas y reportes" class="w-16 h-16" />
          </div>
          <h3 class="mt-4 text-xl font-semibold text-colorDark1">Alertas y reportes</h3>
          <p class="text-sm text-petroleum/80 max-w-xs">
            Alertas tempranas por sobrecarga/temperatura y reportes ejecutivos para decisiones rápidas y seguras.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// sin props: las imágenes se referencian directo desde /src/assets/...
</script>

<style>
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
