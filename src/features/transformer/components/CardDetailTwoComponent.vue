<!-- src/components/TransformerStaticDataCard.vue -->
<template>
  <section
    class="w-[400px] h-[450px] flex flex-col justify-between
           rounded-2xl overflow-hidden
           border border-slate-200/70 dark:border-slate-700/60
           bg-gradient-to-br from-white via-slate-50 to-white
           dark:from-slate-800 dark:via-slate-850 dark:to-slate-800
           shadow-md transition-colors duration-300"
  >
    <!-- Header -->
    <div
      class="px-4 py-3 border-b border-slate-200/70 dark:border-slate-700/60
             bg-gradient-to-r from-color1/10 via-color2/10 to-transparent
             dark:from-color3/12 dark:via-color4/10 dark:to-transparent
             flex items-center justify-between"
    >
      <h2 class="text-sm font-bold tracking-wider text-color1 dark:text-color3 uppercase">
        Datos del Transformador
      </h2>

      <span
        class="inline-flex items-center gap-2 text-[11px] font-semibold px-2 py-0.5 rounded-md
               border border-color1/20 dark:border-color3/25
               text-color1 dark:text-color3 bg-white/70 dark:bg-slate-800/60"
      >
        <span
          class="w-1.5 h-1.5 rounded-full"
          :class="data.isActive ? 'bg-accent-success' : 'bg-accent-danger'"
        />
        {{ data.isActive ? 'Activo' : 'Inactivo' }}
      </span>
    </div>

    <!-- Body (ocupa la parte central, con más espacio vertical) -->
    <div class="flex-1 p-5 grid grid-cols-1 gap-4 text-[13px] overflow-y-auto">
      <div class="flex flex-col">
        <span class="text-slate-500 dark:text-slate-400">Tipo</span>
        <span class="font-semibold text-slate-800 dark:text-slate-100">
          {{ data.type }}
        </span>
      </div>

      <div class="flex flex-col">
        <span class="text-slate-500 dark:text-slate-400">Potencia Aparente</span>
        <span class="font-semibold text-slate-800 dark:text-slate-100">
          {{ data.apparentPowerKVA.toLocaleString() }} KVA
        </span>
      </div>

      <div class="flex flex-col">
        <span class="text-slate-500 dark:text-slate-400">Voltaje Primario</span>
        <span class="font-semibold text-slate-800 dark:text-slate-100">
          {{ data.primaryVoltageKV }} kV
        </span>
      </div>

      <div class="flex flex-col">
        <span class="text-slate-500 dark:text-slate-400">Voltaje Secundario</span>
        <span class="font-semibold text-slate-800 dark:text-slate-100">
          {{ data.secondaryVoltageKV }} kV
        </span>
      </div>

      <div class="flex flex-col">
        <span class="text-slate-500 dark:text-slate-400">N° de Serie</span>
        <span class="font-semibold font-mono text-slate-800 dark:text-slate-100">
          {{ data.serialNumber }}
        </span>
      </div>

      <div class="flex flex-col">
        <span class="text-slate-500 dark:text-slate-400">Año de Fábricación</span>
        <span class="font-semibold text-slate-800 dark:text-slate-100">
          {{ data.yearManufacture }}
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="px-4 py-3 border-t border-slate-200/70 dark:border-slate-700/60
             bg-gradient-to-r from-transparent via-color2/5 to-transparent
             dark:via-color3/8 text-[12px] text-slate-600 dark:text-slate-300"
    >
      Relación Vp/Vs:
      <span class="font-semibold text-slate-800 dark:text-slate-100">
        {{ ratioVpVs }}
      </span>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const data = {
  type: 'EN ACEITE',
  apparentPowerKVA: 630,
  primaryVoltageKV: 33,
  secondaryVoltageKV: 6.6,
  serialNumber: 'TA22666',
  yearManufacture: 2024,
  isActive: true,
}

const ratioVpVs = computed(() => {
  const vp = data.primaryVoltageKV || 0
  const vs = data.secondaryVoltageKV || 1
  if (!vp || !vs) return '—'
  const r = vp / vs
  return Number.isInteger(r) ? `${r}:1` : `${r.toFixed(2)}:1`
})
</script>

<style scoped>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
