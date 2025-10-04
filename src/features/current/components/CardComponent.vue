<template>
  <!-- Contenedor principal -->
  <div class="overflow-x-auto md:overflow-x-visible">
    <!-- Grid -->
    <div 
      class="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-3 min-w-[300px] md:min-w-0"
    >
      <div 
        v-for="(phase, i) in phases" 
        :key="i" 
        class="group relative min-w-0"
      >
        <!-- Fondo gradiente -->
        <div
          class="absolute inset-1 rounded-xl blur opacity-10"
          :class="phase.bg"
        ></div>

        <!-- Card -->
        <div
          class="relative flex items-center justify-between px-2 py-1 md:px-3 md:py-2 rounded-xl border border-white/20 
                 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-sm hover:shadow-md transition-all text-xs md:text-base"
        >
          <!-- Izquierda -->
          <div class="flex items-center gap-1 md:gap-2">
            <!-- contenido izquierdo -->
          </div>

          <!-- Derecha -->
          <div class="text-right">
            <p class="font-bold leading-tight" :class="phase.value">
              {{ currentVoltages[phase.key] }}A
            </p>
            <p class="text-[10px] md:text-xs" :class="phase.sub">
              Corriente actual de {{ phase.label }}
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

const currentVoltages = computed(() => {
  if (props.chartData?.length) {
    const last = props.chartData[props.chartData.length - 1]
    return {
      amp1: last.amp1?.toFixed(1) || "--",
      amp2: last.amp2?.toFixed(1) || "--",
      amp3: last.amp3?.toFixed(1) || "--",
    }
  }
  return { amp1: "--", amp2: "--", amp3: "--" }
})

const phases = [
  {
    key: "amp1",
    label: "F. 1",
    bg: "bg-gradient-to-r from-green-400 via-green-500 to-green-600",
    dot: "bg-green-500",
    title: "text-green-800 dark:text-green-200",
    value: "text-green-900 dark:text-green-100",
    sub: "text-green-600 dark:text-green-300",
  },
  {
    key: "amp2",
    label: "F. 2",
    bg: "bg-gradient-to-r from-red-400 via-red-500 to-red-600",
    dot: "bg-red-500",
    title: "text-red-800 dark:text-red-200",
    value: "text-red-900 dark:text-red-100",
    sub: "text-red-600 dark:text-red-300",
  },
  {
    key: "amp3",
    label: "F. 3",
    bg: "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600",
    dot: "bg-blue-500",
    title: "text-blue-800 dark:text-blue-200",
    value: "text-blue-900 dark:text-blue-100",
    sub: "text-blue-600 dark:text-blue-300",
  },
]
</script>
