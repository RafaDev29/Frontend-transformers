<template>
  <!-- Contenedor principal -->
  <div class="overflow-x-auto md:overflow-x-visible">
    <!-- Grid -->
    <div class="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-3 min-w-[300px] md:min-w-0 items-stretch">
      <div v-for="(phase, i) in phases" :key="i" class="group relative min-w-0">
        <!-- Fondo gradiente -->
        <div
          class="absolute inset-1 rounded-xl blur opacity-10"
          :class="phase.bg"
        ></div>

        <!-- Card -->
        <div
          class="relative flex flex-col justify-between px-2 py-1 md:px-3 md:py-2 rounded-xl border border-white/20 
                 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-sm hover:shadow-md transition-all h-full text-xs md:text-base"
        >
          <div class="flex items-center gap-1 md:gap-2">
            <!-- aquí podrías poner icono o algo -->
          </div>

          <!-- Derecha -->
          <div class="text-right mt-auto">
            <p class="font-bold leading-tight" :class="phase.value">
              {{ currentPowers[phase.key] }}
            </p>
            <p class="text-[10px] md:text-xs ml-1" :class="phase.sub">
              Potencia {{ phase.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { computed, defineProps } from "vue"

const props = defineProps({
  chartData: { type: Array, required: true, default: () => [] }
})

const currentPowers = computed(() => {
  if (props.chartData?.length) {
    const last = props.chartData[props.chartData.length - 1]
    return {
      kW: last.kW ? `${last.kW.toFixed(1)} kW` : "--",
      kvar: last.kvar ? `${last.kvar.toFixed(1)} kvar` : "--",
      kVA: last.kVA ? `${last.kVA.toFixed(1)} kVA` : "--",
    }
  }
  return { kW: "--", kvar: "--", kVA: "--" }
})

const phases = [
  {
    key: "kW",
    label: "Activa",
    bg: "bg-gradient-to-r from-green-400 via-green-500 to-green-600",
    value: "text-green-900 dark:text-green-100",
    sub: "text-green-600 dark:text-green-300",
  },
  {
    key: "kvar",
    label: "Reactiva",
    bg: "bg-gradient-to-r from-red-400 via-red-500 to-red-600",
    value: "text-red-900 dark:text-red-100",
    sub: "text-red-600 dark:text-red-300",
  },
  {
    key: "kVA",
    label: "Aparente",
    bg: "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600",
    value: "text-blue-900 dark:text-blue-100",
    sub: "text-blue-600 dark:text-blue-300",
  },
]
</script>
