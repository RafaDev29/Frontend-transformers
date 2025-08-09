<template>
  <section class="w-auto pl-10 pr-10 py-12 md:py-20 bg-color5/5">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        <div
          v-for="(plan, index) in planes"
          :key="index"
          class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col border border-color4/60"
        >
          <!-- Header del Plan -->
          <div :class="['p-6 text-white text-center', plan.bgClass]">
            <h3 class="text-2xl font-bold">{{ plan.nombre }}</h3>
            <p class="text-sm mt-1 opacity-90">{{ plan.descripcion }}</p>
          </div>

          <!-- Lista de módulos -->
          <div class="p-6 flex-grow">
            <h4 class="text-xl font-bold text-center mb-4 text-colorDark1">Módulos</h4>
            <ul class="space-y-4 mb-6">
              <li
                v-for="(mod, i) in plan.modulos"
                :key="i"
                class="flex items-center justify-between text-petroleum/90 w-full"
              >
                <div class="flex items-center gap-2">
                  <!-- check -->
                  <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-success/10 text-accent-success">
                    <svg viewBox="0 0 24 24" class="h-4 w-4">
                      <path :d="$icons.checkCircle" fill="currentColor" />
                    </svg>
                  </span>
                  <span class="text-sm">{{ mod.titulo }}</span>
                </div>

                <!-- icono del módulo -->
                <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-color5/60 text-colorDark2">
                  <svg viewBox="0 0 24 24" class="h-5 w-5">
                    <path :d="$icons[mod.icon]" fill="currentColor" />
                  </svg>
                </span>
              </li>
            </ul>
          </div>

          <!-- Botón de Cotización -->
          <div class="p-6 text-center">
            <span v-if="index === 1 || index === 2" class="mb-2 pb-2 block italic text-start text-petroleum/90">
              <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-color3/20 text-colorDark2 mr-2">
                <svg viewBox="0 0 24 24" class="h-4 w-4">
                  <path :d="$icons.cellphone" fill="currentColor" />
                </svg>
              </span>
              Aplicación disponible para iOS y Android
            </span>

            <button
              class="w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-300 hover:opacity-90"
              :class="plan.bgClass"
            >
              Cotizar Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PlanesComponent',
  data() {
    return {
      planes: [
        {
          nombre: 'Básico',
          descripcion: 'Monitoreo esencial para iniciar',
          bgClass: 'bg-color1',
          modulos: [
            { titulo: 'Telemetría en tiempo real', icon: 'gauge' },
            { titulo: 'Alertas por sobrecarga/temperatura', icon: 'bell' },
            { titulo: 'Reportes básicos', icon: 'document' },
          ],
        },
        {
          nombre: 'Intermedio',
          descripcion: 'Optimización operativa',
          bgClass: 'bg-color2',
          modulos: [
            { titulo: 'Telemetría avanzada', icon: 'gauge' },
            { titulo: 'Tendencias e histórico', icon: 'timeline' },
            { titulo: 'Totalizador de energía', icon: 'calculator' },
            { titulo: 'Reportes ejecutivos', icon: 'chart' },
          ],
        },
        {
          nombre: 'Avanzado',
          descripcion: 'Gestión integral y predictiva',
          bgClass: 'bg-colorDark1',
          modulos: [
            { titulo: 'Mantenimiento predictivo', icon: 'shield' },
            { titulo: 'Gestión máx. demanda (AMD)', icon: 'flash' },
            { titulo: 'Eficiencia energética', icon: 'chart' },
            { titulo: 'Visibilidad multi-sitio', icon: 'transmissionTower' },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped>
button:hover { opacity: 0.9; }
</style>
