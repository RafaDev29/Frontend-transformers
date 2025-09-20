<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
    <div v-for="(phase, i) in phases" :key="i" class="group relative">
      <!-- Fondo gradiente -->
      <div
        class="absolute -inset-1 rounded-xl blur-sm opacity-20 transition group-hover:opacity-40"
        :class="phase.bg"
      ></div>

      <!-- Card -->
      <div
        class="relative flex items-center justify-between px-3 py-2 rounded-xl border border-white/20 
               bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-md hover:shadow-lg transition-all"
      >
        <div class="flex items-center gap-2">
        </div>

        <!-- Derecha -->
        <div class="text-right">
          <p class="font-bold leading-tight" :class="phase.value">
            {{ currentPowers[phase.key] }}
          </p>
          <p class="text-xs" :class="phase.sub">
            Potencia {{ phase.label }}
          </p>
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
    label: "Activa (kW)",
    bg: "bg-gradient-to-r from-green-400 via-green-500 to-green-600",
    value: "text-green-900 dark:text-green-100",
    sub: "text-green-600 dark:text-green-300",
  },
  {
    key: "kvar",
    label: "Reactiva (kvar)",
    bg: "bg-gradient-to-r from-red-400 via-red-500 to-red-600",
    value: "text-red-900 dark:text-red-100",
    sub: "text-red-600 dark:text-red-300",
  },
  {
    key: "kVA",
    label: "Aparente (kVA)",
    bg: "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600",
    value: "text-blue-900 dark:text-blue-100",
    sub: "text-blue-600 dark:text-blue-300",
  },
]
</script>
