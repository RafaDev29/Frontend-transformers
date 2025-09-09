<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
    <div class="group relative">
      <div
        class="absolute -inset-1 rounded-[10px] bg-gradient-to-r from-green-400 via-green-500 to-green-600 blur-sm opacity-20 transition duration-500 group-hover:opacity-40">
      </div>
      <div
        class="relative flex items-center justify-between px-3 py-2 rounded-[10px] border border-white/20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-300">

        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
          <h3 class="text-sm font-semibold text-green-800 dark:text-green-200">Fase 1</h3>
        </div>

        <div class="text-right">
          <p class="text-lg font-bold text-green-900 dark:text-green-100 leading-tight">
            {{ currentVoltages.ch1 }}V
          </p>
          <p class="text-xs text-green-600 dark:text-green-300">Voltaje actual</p>
        </div>
      </div>
    </div>
    <div class="group relative">
      <div
        class="absolute -inset-1 rounded-[10px] bg-gradient-to-r from-red-400 via-red-500 to-red-600 blur-sm opacity-20 transition duration-500 group-hover:opacity-40">
      </div>
      <div
        class="relative flex items-center justify-between px-3 py-2 rounded-[10px] border border-white/20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-300">

        <!-- Izquierda -->
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
          <h3 class="text-sm font-semibold text-red-800 dark:text-red-200">Fase 2</h3>
        </div>

        <!-- Derecha -->
        <div class="text-right">
          <p class="text-lg font-bold text-red-900 dark:text-red-100 leading-tight">
            {{ currentVoltages.ch2 }}V
          </p>
          <p class="text-xs text-red-600 dark:text-red-300">Voltaje actual</p>
        </div>
      </div>
    </div>

    <div class="group relative">
      <div
        class="absolute -inset-1 rounded-[10px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 blur-sm opacity-20 transition duration-500 group-hover:opacity-40">
      </div>
      <div
        class="relative flex items-center justify-between px-3 py-2 rounded-[10px] border border-white/20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-300">

        <!-- Izquierda -->
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
          <h3 class="text-sm font-semibold text-blue-800 dark:text-blue-200">Fase 3</h3>
        </div>

        <!-- Derecha -->
        <div class="text-right">
          <p class="text-lg font-bold text-blue-900 dark:text-blue-100 leading-tight">
            {{ currentVoltages.ch3 }}V
          </p>
          <p class="text-xs text-blue-600 dark:text-blue-300">Voltaje actual</p>
        </div>
      </div>
    </div>

  </div>
</template>



<script setup>
import { computed, defineProps } from "vue"


const props = defineProps({
    chartData: {
        type: Array,
        required: true,
        default: () => []
    }
})



const currentVoltages = computed(() => {
    if (props.chartData && props.chartData.length > 0) {
        const lastData = props.chartData[props.chartData.length - 1];
        return {
            ch1: lastData.ch1?.toFixed(1) || '--',
            ch2: lastData.ch2?.toFixed(1) || '--',
            ch3: lastData.ch3?.toFixed(1) || '--'
        };
    }
    return { ch1: '--', ch2: '--', ch3: '--' };
});
</script>