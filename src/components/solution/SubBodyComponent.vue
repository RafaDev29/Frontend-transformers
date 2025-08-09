<template>
  <section class="bg-color5/5 text-colorDark1  py-16 px-6">
    <div class="max-w-6xl mx-auto text-center">

      <h1 class="text-3xl md:text-5xl font-extrabold tracking-wide mb-4">
        Nuestra Solución
      </h1>
      <p class="text-base md:text-lg text-petroleum/90 mb-10 max-w-3xl mx-auto">
        Plataforma centralizada que monitorea el estado y rendimiento de cada transformador, detectando anomalías y optimizando su operación en tiempo real.
      </p>

      
      <div class="grid md:grid-cols-2 gap-8">

        <div class="sol-card">
          <div class="chip chip-primary">
            <svg viewBox="0 0 24 24" class="w-5 h-5">
              <path :d="$icons.chart" fill="currentColor" />
            </svg>
          </div>
          <h3 class="card-title">Monitoreo en tiempo real</h3>
          <p class="card-text">
            Sensores registran tensión, corriente, temperatura y carga con precisión milimétrica.
          </p>
        </div>

        <div class="sol-card">
          <div class="chip chip-warning">
            <svg viewBox="0 0 24 24" class="w-5 h-5">
              <path :d="$icons.alert" fill="currentColor" />
            </svg>
          </div>
          <h3 class="card-title">Alertas inteligentes</h3>
          <p class="card-text">
            Notificaciones automáticas ante sobrecargas, sobrecalentamientos o fallas críticas.
          </p>
        </div>


        <div class="sol-card">
          <div class="chip chip-success">
            <svg viewBox="0 0 24 24" class="w-5 h-5">
              <path :d="$icons.document" fill="currentColor" />
            </svg>
          </div>
          <h3 class="card-title">Reportes automáticos</h3>
          <p class="card-text">
            Informes listos para auditoría, mantenimiento y análisis de desempeño.
          </p>
        </div>


        <div class="sol-card">
          <div class="chip chip-accent">
            <svg viewBox="0 0 24 24" class="w-5 h-5">
              <path :d="$icons.cog" fill="currentColor" />
            </svg>
          </div>
          <h3 class="card-title">Panel de control</h3>
          <p class="card-text">
            Visualización completa del estado y parámetros de cada transformador desde un solo lugar.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>
.sol-card {
  @apply bg-color5/40 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105;
}
.card-title {
  @apply mt-3 text-lg font-semibold text-colorDark1;
}
.card-text {
  @apply text-petroleum/80 mt-1;
}

/* Chips */
.chip {
  @apply inline-flex h-9 w-9 items-center justify-center rounded-full;
}
.chip-primary { @apply bg-color3/10 text-color3; }
.chip-warning { @apply bg-accent-warning/10 text-accent-warning; }
.chip-success { @apply bg-accent-success/10 text-accent-success; }
.chip-accent  { @apply bg-petroleum/10 text-petroleum; }
</style>
