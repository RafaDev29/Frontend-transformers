<template>
  <section class="w-full py-12 bg-color5/5 flex justify-center items-center">
    <div class="mx-auto px-6 md:px-16 max-w-7xl text-center">
      <h1 class="text-3xl md:text-5xl font-extrabold tracking-wide text-colorDark1">
        Principales desafíos en la operación de transformadores
      </h1>
      <p class="text-base md:text-lg text-petroleum/90 mt-2 max-w-3xl mx-auto">
        Identificamos los riesgos más comunes y cómo nuestra plataforma de monitoreo los mitiga con datos en tiempo real.
      </p>

      <div class="grid md:grid-cols-3 gap-8 mt-10">
        <div class="card">
          <div class="chip chip-danger">
            <svg viewBox="0 0 24 24" class="w-5 h-5">
              <path :d="$icons.alert" fill="currentColor" />
            </svg>
          </div>
          <h3 class="card-title">Fallas detectadas tarde</h3>
          <p class="card-text">Incidencias no visibles a tiempo derivan en paradas imprevistas y sobrecostos.</p>
        </div>

        <div class="card">
          <div class="chip chip-slate">
            <svg viewBox="0 0 24 24" class="w-5 h-5">
              <path :d="$icons.hidden" fill="currentColor" />
            </svg>
          </div>
          <h3 class="card-title">Baja visibilidad operativa</h3>
          <p class="card-text">Sin trazabilidad de tensión, corriente, temperatura, carga y estado del aceite.</p>
        </div>

        <div class="card">
          <div class="chip chip-warning">
            <svg viewBox="0 0 24 24" class="w-5 h-5">
              <path :d="$icons.timer" fill="currentColor" />
            </svg>
          </div>
          <h3 class="card-title">Respuesta reactiva</h3>
          <p class="card-text">Decisiones tardías por falta de alertas, histórico y métricas accionables.</p>
        </div>
      </div>

      <div class="mt-16 grid md:grid-cols-2 gap-10 items-start">
        <div class="cmp-card bg-white border-l-4 border-accent-danger">
          <div class="cmp-header text-accent-danger">
            <svg viewBox="0 0 24 24" class="w-5 h-5">
              <path :d="$icons.document" fill="currentColor" />
            </svg>
            <h3>Operación tradicional (reactiva)</h3>
          </div>
          <ul class="cmp-list">
            <li>
              <span class="dot dot-danger"></span>
              Diagnósticos tardíos y paradas no planificadas.
            </li>
            <li>
              <span class="dot dot-slate"></span>
              Variables críticas sin monitoreo continuo.
            </li>
            <li>
              <span class="dot dot-slate"></span>
              Reportes manuales y poca trazabilidad.
            </li>
            <li>
              <span class="dot dot-warning"></span>
              Mayor costo por mantenimiento correctivo.
            </li>
          </ul>
        </div>

        <!-- Con Transformes -->
        <div class="cmp-card bg-white border-l-4 border-accent-success">
          <div class="cmp-header text-accent-success">
            <svg viewBox="0 0 24 24" class="w-5 h-5">
              <path :d="$icons.chart" fill="currentColor" />
            </svg>
            <h3>Con Transformes (proactiva)</h3>
          </div>
          <ul class="cmp-list">
            <li>
              <span class="dot dot-success"></span>
              Alertas tempranas por sobrecarga y temperatura.
            </li>
            <li>
              <span class="dot dot-success"></span>
              Histórico, tendencias y mantenimiento predictivo.
            </li>
            <li>
              <span class="dot dot-success"></span>
              Telemetría en tiempo real y KPIs ejecutivos.
            </li>
            <li>
              <span class="dot dot-success"></span>
              Menos paradas y mayor vida útil del equipo.
            </li>
          </ul>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
// Usando $icons global desde main.js (no necesitas importar nada aquí)
</script>

<style scoped>
/* Cards básicas */
.card {
  @apply bg-white p-6 rounded-lg shadow-lg text-left transition-transform transform hover:scale-105;
}
.card-title {
  @apply mt-3 text-lg font-semibold text-colorDark1;
}
.card-text {
  @apply text-petroleum/80;
}

/* Chips de icono */
.chip {
  @apply inline-flex h-9 w-9 items-center justify-center rounded-full;
}
.chip-danger { @apply bg-accent-danger/10 text-accent-danger; }
.chip-warning { @apply bg-accent-warning/10 text-accent-warning; }
.chip-slate   { @apply bg-slate-200 text-slate-600; }

/* Comparación */
.cmp-card {
  @apply p-6 rounded-lg shadow-lg;
}
.cmp-header {
  @apply flex items-center gap-2 font-semibold mb-3;
}
.cmp-list {
  @apply text-petroleum/90 space-y-2 text-sm;
}

/* Dots de estado */
.dot {
  @apply inline-block h-2.5 w-2.5 rounded-full mr-2 align-middle;
}
.dot-danger  { @apply bg-accent-danger; }
.dot-warning { @apply bg-accent-warning; }
.dot-slate   { @apply bg-slate-400; }
.dot-success { @apply bg-accent-success; }
</style>
