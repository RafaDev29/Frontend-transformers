<!-- src/components/TransformerStaticDataCard.vue -->
<template>

    <section
      class="w-[800px] h-[600px] flex flex-col
             rounded-3xl overflow-hidden
             border border-slate-300 dark:border-slate-700
             bg-white dark:bg-slate-800
             shadow-2xl shadow-slate-300/50 dark:shadow-slate-900/50
             transition-all duration-300 hover:shadow-3xl hover:-translate-y-1"
    >
      <!-- Header Mejorado con colores personalizados -->
      <div
        class="px-6 py-4 border-b border-slate-200 dark:border-slate-700
               bg-gradient-to-r from-color1/10 via-color2/10 to-color3/10
               dark:bg-gradient-to-r dark:from-colorDark2/20 dark:via-colorDark3/15 dark:to-colorDark4/20
               relative overflow-hidden"
      >
        <!-- Patrón de fondo decorativo -->
        <div class="absolute inset-0 opacity-5 dark:opacity-10">
          <div class="absolute top-0 left-0 w-32 h-32 bg-color1 rounded-full blur-3xl"></div>
          <div class="absolute top-0 right-0 w-24 h-24 bg-color3 rounded-full blur-2xl"></div>
        </div>
        
        <div class="relative flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-color1 to-color2 
                        flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">
                Transformador {{ transformer?.serialNumber }}
              </h2>
              <p class="text-sm text-slate-600 dark:text-slate-300">
                {{ transformer?.type }} - {{ transformer?.brand }}
              </p>
            </div>
          </div>

          <span
            class="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl
                   border backdrop-blur-sm shadow-md"
            :class="transformer?.isActive 
              ? 'text-accent-success dark:text-color4 border-accent-success/30 dark:border-color3/30 bg-white/90 dark:bg-slate-800/90' 
              : 'text-accent-danger dark:text-red-400 border-accent-danger/30 dark:border-red-700/30 bg-white/90 dark:bg-slate-800/90'"
          >
            <span
              class="w-2 h-2 rounded-full animate-pulse"
              :class="transformer?.isActive ? 'bg-accent-success dark:bg-color4' : 'bg-accent-danger'"
            />
            {{ transformer?.isActive ? 'Activo' : 'Inactivo' }}
          </span>
        </div>
      </div>

      <!-- Body con 2 columnas -->
      <div class="flex-1 p-6 overflow-y-auto bg-white dark:bg-slate-800">
        <div class="grid grid-cols-2 gap-8 h-full">
          
          <!-- Columna Izquierda: Datos Técnicos -->
          <div class="space-y-6">
            <div class="bg-gradient-to-br from-color5/30 to-color4/20 dark:from-colorDark2/30 dark:to-colorDark3/20 
                        rounded-2xl p-5 border border-color3/20 dark:border-colorDark3/30">
              <h3 class="text-base font-bold text-color1 dark:text-color4 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                </svg>
                Especificaciones Técnicas
              </h3>
              
              <div class="grid grid-cols-1 gap-4 text-sm">
                <div class="flex justify-between items-center py-2 border-b border-color3/20 dark:border-colorDark3/30">
                  <span class="text-slate-600 dark:text-slate-300">Potencia Aparente</span>
                  <span class="font-bold text-color1 dark:text-color4">
                    {{ transformer?.apparentPowerKVA || '—' }} KVA
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-color3/20 dark:border-colorDark3/30">
                  <span class="text-slate-600 dark:text-slate-300">Voltaje Primario</span>
                  <span class="font-bold text-slate-800 dark:text-slate-100">
                    {{ transformer?.primaryVoltage || '—' }} V
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-color3/20 dark:border-colorDark3/30">
                  <span class="text-slate-600 dark:text-slate-300">Voltaje Secundario</span>
                  <span class="font-bold text-slate-800 dark:text-slate-100">
                    {{ formatVoltage(transformer?.secondaryVoltage) }}
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-color3/20 dark:border-colorDark3/30">
                  <span class="text-slate-600 dark:text-slate-300">Voltaje Nominal</span>
                  <span class="font-bold text-slate-800 dark:text-slate-100">
                    {{ transformer?.nominalVoltage || '—' }} V
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-color3/20 dark:border-colorDark3/30">
                  <span class="text-slate-600 dark:text-slate-300">Voltaje Regulado</span>
                  <span class="font-bold text-slate-800 dark:text-slate-100">
                    {{ transformer?.regulatedVoltage || '—' }} V
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-color3/20 dark:border-colorDark3/30">
                  <span class="text-slate-600 dark:text-slate-300">Relación Vp/Vs</span>
                  <span class="font-bold text-petroleum dark:text-color3">
                    {{ ratioVpVs }}
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-color3/20 dark:border-colorDark3/30">
                  <span class="text-slate-600 dark:text-slate-300">Fases</span>
                  <span class="font-bold text-slate-800 dark:text-slate-100">
                    {{ transformer?.phases || '—' }}
                  </span>
                </div>

                <div class="flex justify-between items-center py-2">
                  <span class="text-slate-600 dark:text-slate-300">Frecuencia</span>
                  <span class="font-bold text-slate-800 dark:text-slate-100">
                    {{ transformer?.frequency || '—' }} Hz
                  </span>
                </div>
              </div>
            </div>

            <!-- Corrientes y Temperaturas -->
            <div class="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-amber-900/20 dark:to-orange-900/20 
                        rounded-2xl p-5 border border-accent-warning/20 dark:border-amber-800/30">
              <h3 class="text-base font-bold text-accent-warning dark:text-amber-300 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Parámetros Operacionales
              </h3>
              
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div class="flex justify-between items-center py-2 border-b border-accent-warning/20 dark:border-amber-800/30">
                  <span class="text-slate-600 dark:text-slate-300">Corriente Primaria</span>
                  <span class="font-bold text-accent-warning dark:text-amber-300">
                    {{ transformer?.primaryCurrent || '—' }} A
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-accent-warning/20 dark:border-amber-800/30">
                  <span class="text-slate-600 dark:text-slate-300">Corriente Secundaria</span>
                  <span class="font-bold text-accent-warning dark:text-amber-300">
                    {{ transformer?.secondaryCurrent || '—' }} A
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-accent-warning/20 dark:border-amber-800/30">
                  <span class="text-slate-600 dark:text-slate-300">Temp. Aceite</span>
                  <span class="font-bold text-accent-danger dark:text-red-400">
                    {{ transformer?.oilTemperature || '—' }}°C
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-accent-warning/20 dark:border-amber-800/30">
                  <span class="text-slate-600 dark:text-slate-300">Temp. Cobre</span>
                  <span class="font-bold text-orange-600 dark:text-orange-400">
                    {{ transformer?.copperTemperature || '—' }}°C
                  </span>
                </div>

                <div class="flex justify-between items-center py-2">
                  <span class="text-slate-600 dark:text-slate-300">Temp. Ambiente</span>
                  <span class="font-bold text-accent-success dark:text-color4">
                    {{ transformer?.ambientTemperature || '—' }}°C
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Información Comercial y Ubicación -->
          <div class="space-y-6">
            <!-- Información del Producto -->
            <div class="bg-gradient-to-br from-slate-50 to-neutral-light dark:from-slate-900/50 dark:to-colorDark1/50 
                        rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <h3 class="text-base font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
                Información del Producto
              </h3>
              
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div class="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700/50">
                  <span class="text-slate-600 dark:text-slate-300">N° de Serie</span>
                  <span class="font-bold font-mono text-slate-800 dark:text-slate-100">
                    {{ transformer?.serialNumber || '—' }}
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700/50">
                  <span class="text-slate-600 dark:text-slate-300">Año de Fabricación</span>
                  <span class="font-bold text-slate-800 dark:text-slate-100">
                    {{ transformer?.yearManufacture || '—' }}
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700/50">
                  <span class="text-slate-600 dark:text-slate-300">Zona</span>
                  <span class="font-bold text-slate-800 dark:text-slate-100">
                    {{ transformer?.zone || '—' }}
                  </span>
                </div>

                <div class="flex justify-between items-center py-2">
                  <span class="text-slate-600 dark:text-slate-300">Altitud</span>
                  <span class="font-bold text-slate-800 dark:text-slate-100">
                    {{ transformer?.altitude || '—' }} m
                  </span>
                </div>
              </div>
            </div>

            <!-- Fabricante -->
            <div class="bg-gradient-to-br from-color5/50 to-color4/30 dark:from-colorDark3/30 dark:to-colorDark4/20 
                        rounded-2xl p-5 border border-color3/30 dark:border-colorDark3/40">
              <h3 class="text-base font-bold text-color1 dark:text-color4 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6"/>
                </svg>
                Fabricante
              </h3>
              
              <div class="space-y-3 text-sm">
                <div class="flex flex-col gap-1">
                  <span class="text-slate-600 dark:text-slate-300">Empresa</span>
                  <span class="font-bold text-color1 dark:text-color4">
                    {{ transformer?.factory?.businessName || '—' }}
                  </span>
                </div>

                <div class="flex flex-col gap-1">
                  <span class="text-slate-600 dark:text-slate-300">RUC</span>
                  <span class="font-mono font-semibold text-slate-800 dark:text-slate-100">
                    {{ transformer?.factory?.ruc || '—' }}
                  </span>
                </div>

                <div class="flex flex-col gap-1">
                  <span class="text-slate-600 dark:text-slate-300">Dirección</span>
                  <span class="font-semibold text-slate-800 dark:text-slate-100">
                    {{ transformer?.factory?.address || '—' }}, {{ transformer?.factory?.distric || '' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Cliente -->
            <div v-if="transformer?.customer" 
                 class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 
                        rounded-2xl p-5 border border-purple-200/50 dark:border-purple-800/30">
              <h3 class="text-base font-bold text-petroleum dark:text-purple-300 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Cliente (Vendido)
              </h3>
              
              <div class="space-y-3 text-sm">
                <div class="flex flex-col gap-1">
                  <span class="text-slate-600 dark:text-slate-300">Empresa</span>
                  <span class="font-bold text-petroleum dark:text-purple-300">
                    {{ transformer.customer.businessname || '—' }}
                  </span>
                </div>

                <div class="flex flex-col gap-1">
                  <span class="text-slate-600 dark:text-slate-300">RUC</span>
                  <span class="font-mono font-semibold text-slate-800 dark:text-slate-100">
                    {{ transformer.customer.ruc || '—' }}
                  </span>
                </div>

                <div class="flex flex-col gap-1">
                  <span class="text-slate-600 dark:text-slate-300">Dirección</span>
                  <span class="font-semibold text-slate-800 dark:text-slate-100">
                    {{ transformer.customer.address || '—' }}, {{ transformer.customer.distric || '' }}
                  </span>
                </div>

                <div v-if="transformer?.saleDate" class="flex flex-col gap-1">
                  <span class="text-slate-600 dark:text-slate-300">Fecha de Venta</span>
                  <span class="font-bold text-petroleum dark:text-purple-300">
                    {{ formatDate(transformer.saleDate) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer mejorado -->
      <div
        class="px-6 py-4 border-t border-slate-200 dark:border-slate-700
               bg-gradient-to-r from-slate-50 via-color5/10 to-slate-50
               dark:bg-gradient-to-r dark:from-slate-800 dark:via-colorDark2/20 dark:to-slate-800
               flex items-center justify-between text-sm"
      >
        <div class="text-slate-600 dark:text-slate-300">
          Creado: {{ formatDate(transformer?.createdAt) }}
        </div>
        <div class="text-slate-600 dark:text-slate-300">
          Actualizado: {{ formatDate(transformer?.updatedAt) }}
        </div>
      </div>
    </section>

</template>

<script setup>
import { computed } from 'vue'
import { useTransformerStore } from '@/features/transformer/store/transformerStore'

const transformerStore = useTransformerStore()

const transformer = computed(() => transformerStore.selectedTransformer)

const ratioVpVs = computed(() => {
  if (!transformer.value?.primaryVoltage || !transformer.value?.secondaryVoltage) {
    return '—'
  }
  
  const vp = parseFloat(transformer.value.primaryVoltage) || 0
  const vs = parseFloat(transformer.value.secondaryVoltage) || 1
  
  if (!vp || !vs) return '—'
  
  const r = vp / vs
  return Number.isInteger(r) ? `${r}:1` : `${r.toFixed(6)}:1`
})

function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function formatVoltage(voltage) {
  if (!voltage) return '—'
  
  const volts = parseFloat(voltage)
  
  // Si es mayor a 1000, convertir a KV
  if (volts >= 1000) {
    const kv = volts / 1000
    return `${kv.toFixed(kv >= 100 ? 0 : 2)} KV`
  }
  
  return `${volts} V`
}
</script>

<style scoped>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Animaciones sutiles para hover */
.hover\:shadow-3xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>