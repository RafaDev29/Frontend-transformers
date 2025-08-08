<template>
  <section class="w-full py-16 bg-gray-100 flex justify-center items-center">
    <div class="container mx-auto px-6 flex flex-col md:flex-row items-center md:space-x-10">
      
      <!-- Imagen principal -->
      <div 
        class="relative w-full md:w-[500px] lg:w-[650px] shadow-2xl rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
        <img :src="dashboardImage" alt="Dashboard" class="w-full h-auto">
      </div>
 
      <div class="mt-6 md:mt-0 max-w-lg text-gray-700 text-left animate-fade-in">
        <h2 class="text-2xl md:text-4xl font-bold text-blue-900 mb-4">
          Monitorea y gestiona el consumo eléctrico en tiempo real ⚡
        </h2>

        <p class="text-sm md:text-base leading-relaxed">
          Nuestro sistema de distribución de energía proporciona datos en tiempo real, gráficos intuitivos y reportes automáticos para un mejor control y transparencia en la facturación.
        </p>

        <ul class="mt-4 space-y-2 text-sm text-gray-600">
          <li>✅ Control preciso del consumo</li>
          <li>✅ Reportes automáticos</li>
          <li>✅ Integración con sistemas de facturación</li>
        </ul>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  props: {
    dashboardImage: {
      type: String,
      required: false,
      default: "/home/billing.png", 
    }
  }
};
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