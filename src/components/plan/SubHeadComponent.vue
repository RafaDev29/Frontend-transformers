<template>
  <section class="w-auto pl-10 pr-10 py-12 pb-10  md:py-20 bg-gray-100">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        <div v-for="(plan, index) in planes" :key="index"
          class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col border border-gray-200">
          <!-- Header del Plan -->
          <div class="p-6 text-white text-center" :style="{ backgroundColor: plan.color }">
            <h3 class="text-2xl font-bold">{{ plan.nombre }}</h3>
            <p class="text-sm mt-1 opacity-90">{{ plan.descripcion }}</p>
          </div>

          <!-- Lista de módulos -->
          <div class="p-6 flex-grow">
            <h4 class="text-xl font-bold text-center mb-4" style="color: #263173;">Módulos</h4>
            <ul class="space-y-4 mb-6">
              <li v-for="(modulo, i) in plan.modulos" :key="i"
                class="flex items-center justify-between text-gray-700 w-full">
                <div class="flex items-center">
                  <i class="mdi mdi-check-circle text-2xl mr-2" style="color: #66A3F2;"></i>
                  <span>{{ modulo }}</span>
                </div>
                <i :class="{
                  'mdi mdi-power-plug text-3xl': modulo === 'Medición y Análisis Energético',
                  'mdi mdi-file-document-outline text-3xl': modulo === 'Facturación y Reportes',
                  'mdi mdi-power-plug-off text-3xl': modulo === 'Medición y Análisis Energético Cliente No Regulado',
                  'mdi mdi-calculator text-3xl': modulo === 'Totalizador de Energía',
                  'mdi mdi-lightning-bolt text-3xl': modulo === 'Administración Máxima Demanda AMD',
                  'mdi mdi-chart-line text-3xl': modulo === 'Eficiencia Energética Eléctrica'
                }"></i>
              </li>


            </ul>
          </div>

          <!-- Botón de Cotización -->
          <div class="p-6 text-center">
            <span v-if="index === 1 || index === 2" class="mb-2 pb-2 block italic text-start">
              <i class="mdi mdi-check-circle text-xs mr-2" style="color: #11e81b;"></i>
              Aplicación disponible para iOS y Android
            </span>
            <button
              class="w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-300 hover:opacity-85"
              :style="{ backgroundColor: plan.color }">
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
          descripcion: 'Ideal para pequeñas empresas',
          modulos: ['Medición y Análisis Energético', 'Facturación y Reportes'],
          color: '#4465A6',
          icono: 'mdi-security'
        },
        {
          nombre: 'Intermedio',
          descripcion: 'Para medianas empresas',
          modulos: ['Medición y Análisis Energético', 'Facturación y Reportes', 'Medición y Análisis Energético Cliente No Regulado', 'Totalizador de Energía'],
          color: '#66A3F2',
          icono: 'mdi-chart-line-variant'
        },
        {
          nombre: 'Avanzado',
          descripcion: 'Solución completa',
          modulos: [
            'Medición y Análisis Energético', 'Facturación y Reportes', 'Medición y Análisis Energético Cliente No Regulado', 'Totalizador de Energía',
            'Administración Máxima Demanda AMD', 'Eficiencia Energética Eléctrica'
          ],
          color: '#263173',
          icono: 'mdi-flash'
        }
      ]
    }
  }
}
</script>

<style scoped>
button:hover {
  opacity: 0.85;
}
</style>