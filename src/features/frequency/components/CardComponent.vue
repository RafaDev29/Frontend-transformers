<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
    <div v-for="(phase, i) in phases" :key="i" class="group relative">
      <!-- Fondo gradiente -->
      <div
        class="absolute -inset-0 rounded-xl blur-sm opacity-10"
        :class="phase.bg"
      ></div>
      <div
        class="relative flex items-center justify-between px-3 py-2 rounded-xl border border-white/20 
               bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-md hover:shadow-lg transition-all"
      >

        <div class="flex items-center gap-2">

        </div>


        <div class="text-right">
          <p class=" font-bold leading-tight" :class="phase.value">
            {{ currentVoltages[phase.key] }}Hz
          </p>
          <p class="text-xs" :class="phase.sub">Frecuencia  actual de {{ phase.label }} </p>
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

]
</script>
