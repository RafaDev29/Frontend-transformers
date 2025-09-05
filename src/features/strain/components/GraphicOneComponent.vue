<template>
  <div class="p-3 space-y-2">

    <!-- Tarjetas de estado -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">

      <div class="group relative">
        <div
          class="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 blur-sm opacity-20 transition duration-500 group-hover:opacity-40">
        </div>
        <div
          class="relative flex items-center justify-between px-3 py-2 rounded-xl border border-white/20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-300">

          <!-- Izquierda: fase -->
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
            <h3 class="text-sm font-semibold text-blue-800 dark:text-blue-200">Fase 1</h3>
          </div>

          <!-- Derecha: valores -->
          <div class="text-right">
            <p class="text-lg font-bold text-blue-900 dark:text-blue-100 leading-tight">
              {{ currentVoltages.ch1 }}V
            </p>
            <p class="text-xs text-blue-600 dark:text-blue-300">Voltaje actual</p>
          </div>
        </div>
      </div>

      <div class="group relative">
        <div
          class="absolute -inset-1 rounded-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 blur-sm opacity-20 transition duration-500 group-hover:opacity-40">
        </div>

        <div
          class="relative flex items-center justify-between px-3 py-2 rounded-xl border border-white/20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-300">

          <!-- Izquierda: fase -->
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
            <h3 class="text-sm font-semibold text-red-800 dark:text-red-200">Fase 2</h3>
          </div>

          <!-- Derecha: valores -->
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
          class="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 blur-sm opacity-20 transition duration-500 group-hover:opacity-40">
        </div>

        <div
          class="relative flex items-center justify-between px-3 py-2 rounded-xl border border-white/20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-300">

          <!-- Izquierda: fase -->
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
            <h3 class="text-sm font-semibold text-green-800 dark:text-green-200">Fase 3</h3>
          </div>

          <!-- Derecha: valores -->
          <div class="text-right">
            <p class="text-lg font-bold text-green-900 dark:text-green-100 leading-tight">
              {{ currentVoltages.ch3 }}V
            </p>
            <p class="text-xs text-green-600 dark:text-green-300">Voltaje actual</p>
          </div>

        </div>
      </div>

    </div>

    <div class="relative">
      <div
        class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-10">
      </div>
      <div
        class="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">

        <div class="p-3 pb-1 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <h2 class="text-xl font-bold text-slate-800 dark:text-slate-200 mb-1">
              Monitoreo de Voltajes
            </h2>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
              Voltajes en tiempo real de las 3 fases
            </p>
          </div>


          <div class="flex items-center gap-6 mb-1">
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300">CH1</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full"></div>
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300">CH2</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300">CH3</span>
            </div>
          </div>
        </div>

        <div class="px-5 pb-4">
          <ApexChart type="line" height="400" :options="chartOptions" :series="series" />
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue"
import rawData from "@/features/strain/data/data.json"

const series = ref([
  { name: "CH1", data: [] },
  { name: "CH2", data: [] },
  { name: "CH3", data: [] }
])

// Opciones del gráfico
const chartOptions = computed(() => ({
  chart: {
    type: "line",
    zoom: { enabled: true },
    toolbar: { show: false },
    background: 'transparent',
    fontFamily: 'Inter, system-ui, sans-serif',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    }
  },
  grid: {
    borderColor: '#e2e8f0',
    strokeDashArray: 3,
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: true } }
  },
  xaxis: {
    type: "category", 
    tickAmount: 24,
    categories: rawData.map(d => d.datetime), 
    labels: {
      rotate: -45,
      style: { colors: '#64748b', fontSize: '12px', fontWeight: '500' }
    },
    title: {
      text: "Hora/minuto",
      style: { color: "#475569", fontSize: "12px", fontWeight: "600" }
    },
    axisBorder: { color: '#e2e8f0' },
    axisTicks: { color: '#e2e8f0' }
  },
  yaxis: {
    title: {
      text: "Voltaje (V)",
      style: { color: "#475569", fontSize: "14px", fontWeight: "600" }
    },
    min: 210,
    max: 250,
    labels: {
      style: { colors: '#64748b', fontSize: '12px', fontWeight: '500' },
      formatter: (val) => `${val}V`
    }
  },
  stroke: {
    curve: "smooth",
    width: 1.5,
    lineCap: 'round'
  },
  colors: ["#3b82f6", "#ef4444", "#22c55e"],
  legend: { show: false },
  tooltip: {
    theme: 'light',
    style: { fontSize: '12px' },
    marker: { show: true }
  },
  markers: {
    size: 0,
    hover: { size: 8, sizeOffset: 3 }
  }
}))

// Valores actuales para los cards
const currentVoltages = computed(() => {
  if (rawData && rawData.length > 0) {
    const lastData = rawData[rawData.length - 1];
    return {
      ch1: lastData.ch1?.toFixed(1) || '--',
      ch2: lastData.ch2?.toFixed(1) || '--',
      ch3: lastData.ch3?.toFixed(1) || '--'
    };
  }
  return { ch1: '--', ch2: '--', ch3: '--' };
});

onMounted(() => {
  // Solo pasamos los valores (sin timestamp)
  series.value[0].data = rawData.map(d => d.ch1);
  series.value[1].data = rawData.map(d => d.ch2);
  series.value[2].data = rawData.map(d => d.ch3);
})
</script>
