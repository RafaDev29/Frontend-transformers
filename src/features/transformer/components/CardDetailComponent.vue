<!-- src/features/transformer/components/CardDetailComponent.vue -->
<template>
  <section class="w-[800px] h-[600px] flex flex-col
             rounded-lg overflow-hidden
             border border-slate-200/70 dark:border-slate-700/60
             bg-gradient-to-br from-white via-slate-50 to-white
             dark:from-slate-800 dark:via-slate-850 dark:to-slate-800
             shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
    
    <!-- Header Compacto -->
    <div class="px-4 py-3 border-b border-slate-200/70 dark:border-slate-700/60
               bg-gradient-to-r from-color1/95 via-color2/85 to-color1/95
               dark:from-color3/90 dark:via-color4/80 dark:to-color3/90
               text-white relative overflow-hidden">
      
      <div class="relative flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm
                        flex items-center justify-center shadow-sm">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 class="text-sm font-bold text-white">
              Transformador {{ transformer?.serialNumber }}
            </h2>
            <p class="text-xs text-white/80">
              {{ transformer?.type }} - {{ transformer?.brand }}
            </p>
          </div>
        </div>

        <span class="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full
                   border backdrop-blur-sm shadow-sm bg-white/20 border-white/30 text-white"
              :class="transformer?.isActive
                ? 'bg-white/20 border-white/30'
                : 'bg-white/10 border-white/20'">
          <span class="w-1.5 h-1.5 rounded-full animate-pulse"
                :class="transformer?.isActive ? 'bg-green-400' : 'bg-red-400'"></span>
          {{ transformer?.isActive ? 'Activo' : 'Inactivo' }}
        </span>
      </div>
    </div>

    <!-- Body con Grid 2 columnas x 2 filas -->
    <div class="flex-1 p-4 overflow-y-auto bg-white/90 dark:bg-slate-800/70 transition-colors duration-300">
      <div class="grid grid-cols-2 grid-rows-2 gap-3 h-full">

        <!-- PRIMERA FILA, PRIMERA COLUMNA: Información del Producto -->
        <div class="row-span-1 col-span-1 flex flex-col">
          <div class="bg-gradient-to-br from-slate-50/80 to-slate-100/50 
                     dark:from-slate-900/50 dark:to-slate-800/30
                     rounded-lg p-3 border border-slate-200/70 
                     dark:border-slate-700/60 flex-1">

            <h3 class="text-xs font-bold text-slate-700 dark:text-slate-200 mb-3 
                     flex items-center gap-1 uppercase tracking-wider">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Producto
            </h3>

            <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
              <div class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">N° de Serie</span>
                <span class="font-bold font-mono text-slate-800 dark:text-slate-100">
                  {{ transformer?.serialNumber || '—' }}
                </span>
              </div>

              <div class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">Tipo</span>
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
                           bg-gradient-to-r from-color1/10 via-color2/10 to-color1/5
                           dark:from-colorDark3/20 dark:via-colorDark4/15 dark:to-colorDark3/10
                           text-color1 dark:text-color3 border border-color1/20 dark:border-colorDark3/30">
                  <span class="w-1.5 h-1.5 rounded-full bg-color2 dark:bg-color3"></span>
                  {{ transformer?.type || '—' }}
                </span>
              </div>

              <div class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">Marca</span>
                <span class="font-semibold text-slate-800 dark:text-slate-100">
                  {{ transformer?.brand || '—' }}
                </span>
              </div>

              <div class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">Año de Fabricación</span>
                <span class="font-bold text-slate-800 dark:text-slate-100">
                  {{ transformer?.yearManufacture || '—' }}
                </span>
              </div>

              <div class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">Zona</span>
                <span class="font-bold text-slate-800 dark:text-slate-100">
                  {{ transformer?.zone || '—' }}
                </span>
              </div>

              <div class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">Altitud</span>
                <span class="font-bold text-slate-800 dark:text-slate-100">
                  {{ transformer?.altitude || '—' }} m
                </span>
              </div>

            </div>
          </div>
        </div>

      

        <!-- SEGUNDA FILA, PRIMERA COLUMNA: Fabricante -->
        <div class="row-span-1 col-span-1 flex flex-col">
          <div class="bg-gradient-to-br from-color5/50 to-color4/30 dark:from-colorDark3/30 dark:to-colorDark4/20 
                     rounded-lg p-3 border border-color3/30 dark:border-colorDark3/40 flex-1">
            <h3 class="text-xs font-bold text-color1 dark:text-color4 mb-3 flex items-center gap-1 uppercase tracking-wider">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6" />
              </svg>
              Fabricante
            </h3>

            <div class="space-y-2 text-xs">
              <div class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">Empresa</span>
                <span class="font-bold text-color1 dark:text-color4">
                  {{ transformer?.factory?.businessName || '—' }}
                </span>
              </div>

              <div class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">RUC</span>
                <span class="font-mono font-semibold text-slate-800 dark:text-slate-100">
                  {{ transformer?.factory?.ruc || '—' }}
                </span>
              </div>

              <div class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">Dirección</span>
                <span class="font-semibold text-slate-800 dark:text-slate-100 text-[10px] leading-tight">
                  {{ transformer?.factory?.address || '—' }}
                  <span v-if="transformer?.factory?.distric">
                    , {{ transformer.factory.distric }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

          <!-- PRIMERA FILA, SEGUNDA COLUMNA: Especificaciones Técnicas -->
        <div class="row-span-1 col-span-1 flex flex-col">
          <div class="bg-gradient-to-br from-color5/30 to-color4/20 dark:from-colorDark2/30 dark:to-colorDark3/20 
                     rounded-lg p-3 border border-color3/20 dark:border-colorDark3/30 flex-1">
            <h3 class="text-xs font-bold text-color1 dark:text-color4 mb-3 flex items-center gap-1 uppercase tracking-wider">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Técnicas
            </h3>

            <div class="space-y-1 text-xs">
              <div class="flex justify-between items-center py-1 border-b border-color3/20 dark:border-colorDark3/30">
                <span class="text-slate-600 dark:text-slate-300">Potencia</span>
                <span class="font-bold text-color1 dark:text-color4">
                  {{ transformer?.apparentPowerKVA || '—' }} KVA
                </span>
              </div>

              <div class="flex justify-between items-center py-1 border-b border-color3/20 dark:border-colorDark3/30">
                <span class="text-slate-600 dark:text-slate-300">V. Primario</span>
                <span class="font-bold text-slate-800 dark:text-slate-100">
                  {{ transformer?.primaryVoltage || '—' }} V
                </span>
              </div>

              <div class="flex justify-between items-center py-1 border-b border-color3/20 dark:border-colorDark3/30">
                <span class="text-slate-600 dark:text-slate-300">V. Secundario</span>
                <span class="font-bold text-slate-800 dark:text-slate-100">
                  {{ formatVoltage(transformer?.secondaryVoltage) }}
                </span>
              </div>

              <div class="flex justify-between items-center py-1 border-b border-color3/20 dark:border-colorDark3/30">
                <span class="text-slate-600 dark:text-slate-300">V. Nominal</span>
                <span class="font-bold text-slate-800 dark:text-slate-100">
                  {{ transformer?.nominalVoltage || '—' }} V
                </span>
              </div>

              <div class="flex justify-between items-center py-1 border-b border-color3/20 dark:border-colorDark3/30">
                <span class="text-slate-600 dark:text-slate-300">V. Regulado</span>
                <span class="font-bold text-slate-800 dark:text-slate-100">
                  {{ transformer?.regulatedVoltage || '—' }} V
                </span>
              </div>

              <div class="flex justify-between items-center py-1 border-b border-color3/20 dark:border-colorDark3/30">
                <span class="text-slate-600 dark:text-slate-300">Frecuencia</span>
                <span class="font-bold text-slate-800 dark:text-slate-100">
                  {{ transformer?.frequency || '—' }} Hz
                </span>
              </div>

              <div class="flex justify-between items-center py-1 border-b border-amber-200 dark:border-amber-800/30">
                <span class="text-slate-600 dark:text-slate-300">I. Primaria</span>
                <span class="font-bold text-amber-600 dark:text-amber-300">
                  {{ transformer?.primaryCurrent || '—' }} A
                </span>
              </div>

              <div class="flex justify-between items-center py-1 border-b border-amber-200 dark:border-amber-800/30">
                <span class="text-slate-600 dark:text-slate-300">I. Secundaria</span>
                <span class="font-bold text-amber-600 dark:text-amber-300">
                  {{ transformer?.secondaryCurrent || '—' }} A
                </span>
              </div>

              <div class="flex justify-between items-center py-1 border-b border-red-200 dark:border-red-800/30">
                <span class="text-slate-600 dark:text-slate-300">T. Aceite</span>
                <span class="font-bold text-red-600 dark:text-red-400">
                  {{ transformer?.oilTemperature || '—' }}°C
                </span>
              </div>

              <div class="flex justify-between items-center py-1 border-b border-orange-200 dark:border-orange-800/30">
                <span class="text-slate-600 dark:text-slate-300">T. Cobre</span>
                <span class="font-bold text-orange-600 dark:text-orange-400">
                  {{ transformer?.copperTemperature || '—' }}°C
                </span>
              </div>

              <div class="flex justify-between items-center py-1">
                <span class="text-slate-600 dark:text-slate-300">T. Ambiente</span>
                <span class="font-bold text-green-600 dark:text-green-400">
                  {{ transformer?.ambientTemperature || '—' }}°C
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- SEGUNDA FILA, SEGUNDA COLUMNA: Cliente -->
        <div class="row-span-1 col-span-1 flex flex-col">
          <div v-if="transformer?.customer" 
               class="bg-gradient-to-br from-purple-50/80 to-pink-50/60 dark:from-purple-900/30 dark:to-pink-900/20 
                      rounded-lg p-3 border border-purple-200/50 dark:border-purple-800/30 flex-1">
            <h3 class="text-xs font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-1 uppercase tracking-wider">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Cliente
            </h3>

            <div class="space-y-2 text-xs">
              <div class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">Empresa</span>
                <span class="font-bold text-purple-700 dark:text-purple-300">
                  {{ transformer.customer.businessname || '—' }}
                </span>
              </div>

              <div class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">RUC</span>
                <span class="font-mono font-semibold text-slate-800 dark:text-slate-100">
                  {{ transformer.customer.ruc || '—' }}
                </span>
              </div>

              <div class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">Dirección</span>
                <span class="font-semibold text-slate-800 dark:text-slate-100 text-[10px] leading-tight">
                  {{ transformer.customer.address || '—' }}
                  <span v-if="transformer.customer.distric">
                    , {{ transformer.customer.distric }}
                  </span>
                </span>
              </div>

              <div v-if="transformer?.saleDate" class="flex flex-col gap-0.5">
                <span class="text-slate-600 dark:text-slate-300">Fecha de Venta</span>
                <span class="font-bold text-purple-700 dark:text-purple-300">
                  {{ formatDate(transformer.saleDate) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Estado cuando no hay cliente -->
          <div v-else class="bg-gradient-to-br from-slate-50/50 to-slate-100/30 dark:from-slate-900/30 dark:to-slate-800/20
                           rounded-lg p-3 border border-slate-200/50 dark:border-slate-700/40 flex-1">
            <div class="text-center py-6">
              <svg class="mx-auto h-8 w-8 mb-2 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Disponible</p>
              <p class="text-[10px] text-slate-400 dark:text-slate-500">Sin cliente asignado</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Footer Compacto -->
    <div class="px-4 py-2 border-t border-slate-200/70 dark:border-slate-700/60
               bg-gradient-to-r from-slate-50/80 via-slate-100/50 to-slate-50/80
               dark:bg-gradient-to-r dark:from-slate-800/50 dark:via-slate-750/30 dark:to-slate-800/50
               backdrop-blur-sm flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-300">
      <div>
        Creado: {{ formatDate(transformer?.createdAt) }}
      </div>
      <div>
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
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>