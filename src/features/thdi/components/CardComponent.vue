<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
    <div v-for="(phase, i) in phases" :key="i" class="group relative">
      <!-- Fondo gradiente -->
      <div
        class="absolute inset-3 rounded-xl blur opacity-10"
        :class="phase.bg"
      ></div>

      <!-- Card -->
      <div
        class="relative flex items-center justify-between px-3 py-2 rounded-xl border border-white/20 
               bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-md hover:shadow-lg transition-all"
      >
        <!-- Izquierda -->
        <div class="flex items-center gap-2">
        </div>

        <!-- Derecha -->
        <div class="text-right">
          <p class=" font-bold leading-tight" :class="phase.value">
            {{ currentVoltages[phase.key] }}%
          </p>
          <p class="text-xs" :class="phase.sub">Distorsión armónica de {{ phase.label }} </p>
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

const currentVoltages = computed(() => {
  if (props.chartData?.length) {
    const last = props.chartData[props.chartData.length - 1]
    return {
      ch1: last.ch1?.toFixed(1) || "--",
      ch2: last.ch2?.toFixed(1) || "--",
      ch3: last.ch3?.toFixed(1) || "--",
    }
  }
  return { ch1: "--", ch2: "--", ch3: "--" }
})

const phases = [
  {
    key: "ch1",
    label: "F. 1",
    bg: "bg-gradient-to-r from-green-400 via-green-500 to-green-600",
    dot: "bg-green-500",
    title: "text-green-800 dark:text-green-200",
    value: "text-green-900 dark:text-green-100",
    sub: "text-green-600 dark:text-green-300",
  },
  {
    key: "ch2",
    label: "F. 2",
    bg: "bg-gradient-to-r from-red-400 via-red-500 to-red-600",
    dot: "bg-red-500",
    title: "text-red-800 dark:text-red-200",
    value: "text-red-900 dark:text-red-100",
    sub: "text-red-600 dark:text-red-300",
  },
  {
    key: "ch3",
    label: "F. 3",
    bg: "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600",
    dot: "bg-blue-500",
    title: "text-blue-800 dark:text-blue-200",
    value: "text-blue-900 dark:text-blue-100",
    sub: "text-blue-600 dark:text-blue-300",
  },
]
</script>
