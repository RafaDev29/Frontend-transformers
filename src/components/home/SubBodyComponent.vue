<template>
  <section class="w-full py-16 bg-color5/40 flex justify-center items-center">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl md:text-5xl font-bold text-colorDark1 text-center mb-10">
        Beneficios clave
      </h2>

      <!-- Beneficios -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center animate-fade-in hover:scale-105 transition-all duration-300">
          <img src="@/assets/home/billing-error.png" alt="Evita fallas" class="w-16 h-16 mb-4" />
          <h3 class="text-lg font-semibold text-colorDark1">Reduce fallas y paradas</h3>
          <p class="text-sm text-petroleum/80">
            Monitoreo continuo y alertas tempranas para prevenir incidentes antes de que afecten la operación.
          </p>
        </div>

        <div
          class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center animate-fade-in delay-200 hover:scale-105 transition-all duration-300">
          <img src="@/assets/home/automation.png" alt="Automatiza alertas" class="w-16 h-16 mb-4" />
          <h3 class="text-lg font-semibold text-colorDark1">Alertas y tareas automáticas</h3>
          <p class="text-sm text-petroleum/80">
            Umbrales configurables y workflows para escalar incidentes y planificar mantenimiento.
          </p>
        </div>

        <div
          class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center animate-fade-in delay-400 hover:scale-105 transition-all duration-300">
          <img src="@/assets/home/time-saving.png" alt="Ahorra tiempo" class="w-16 h-16 mb-4" />
          <h3 class="text-lg font-semibold text-colorDark1">Ahorro de tiempo y costos</h3>
          <p class="text-sm text-petroleum/80">
            Optimiza inspecciones y reduce visitas no planificadas con datos confiables en tiempo real.
          </p>
        </div>

        <div
          class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center animate-fade-in delay-600 hover:scale-105 transition-all duration-300">
          <img src="@/assets/home/reports.png" alt="Reportes ejecutivos" class="w-16 h-16 mb-4" />
          <h3 class="text-lg font-semibold text-colorDark1">Reportes ejecutivos</h3>
          <p class="text-sm text-petroleum/80">
            KPIs, tendencias y análisis histórico para decisiones técnicas y gerenciales.
          </p>
        </div>
      </div>

  
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Antes -->
        <div class="bg-slate-50 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-accent-danger mb-4">Antes (operación reactiva)</h3>
          <ul class="text-sm text-petroleum/90 space-y-3">
            <li class="flex items-start gap-3">
              <span
                class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-danger/10 text-accent-danger">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons.alert" fill="currentColor" />
                </svg>
              </span>
              <span>Fallas detectadas tarde y diagnósticos fuera de tiempo.</span>
            </li>
            <li class="flex items-start gap-3">
              <span
                class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-warning/10 text-accent-warning">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons.timer" fill="currentColor" />
                </svg>
              </span>
              <span>Paradas imprevistas y sobrecostos por atención de emergencia.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons.hidden" fill="currentColor" />
                </svg>
              </span>
              <span>Baja visibilidad de variables críticas del transformador.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons.document" fill="currentColor" />
                </svg>
              </span>


              <span>Reportes manuales, dispersos y poco accionables.</span>
            </li>
          </ul>
        </div>
        <div class="bg-color5 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-colorDark1 mb-4">Con SEMT (operación proactiva)</h3>
          <ul class="text-sm text-petroleum/90 space-y-3">
            <li class="flex items-start gap-3">
              <span
                class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-warning/10 text-accent-warning">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons.bell" fill="currentColor" />
                </svg>
              </span>
              <span>Alertas tempranas por sobrecarga, temperatura y desequilibrios.</span>
            </li>
            <li class="flex items-start gap-3">
              <span
                class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-secondary/10 text-accent-secondary">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons.timeline" fill="currentColor" />
                </svg>
              </span>
              <span>Tendencias e histórico para mantenimiento predictivo.</span>
            </li>
            <li class="flex items-start gap-3">
              <span
                class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-success/10 text-accent-success">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons.chart" fill="currentColor" />
                </svg>
              </span>
              <span>Mayor disponibilidad y vida útil del equipo.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-color3/20 text-colorDark2">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons.shield" fill="currentColor" />
                </svg>
              </span>
              <span>Reportes automáticos y KPIs claros para decidir rápido.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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

.delay-600 {
  animation-delay: 0.6s;
}
</style>
