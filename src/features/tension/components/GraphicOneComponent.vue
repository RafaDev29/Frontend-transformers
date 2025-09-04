<template>
  <div class="p-3 space-y-2">
    
    <!-- Tarjetas de estado -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <!-- CH1 -->
      <div class="group relative">
        <div class="absolute -inset-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-2xl blur-sm opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div class="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <h3 class="font-bold text-blue-800 dark:text-blue-200">Canal 1</h3>
            </div>
          </div>
          <p class="text-xl font-black text-blue-900 dark:text-blue-100 mb-1">
            {{ currentVoltages.ch1 }}V
          </p>
          <p class="text-blue-600 dark:text-blue-300 text-sm">Voltaje actual</p>
        </div>
      </div>

      <!-- CH2 -->
      <div class="group relative">
        <div class="absolute -inset-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-2xl blur-sm opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div class="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h3 class="font-bold text-red-800 dark:text-red-200">Canal 2</h3>
            </div>
            <div class="text-red-500 text-xl">🔋</div>
          </div>
          <p class="text-xl font-black text-red-900 dark:text-red-100 mb-1">
            {{ currentVoltages.ch2 }}V
          </p>
          <p class="text-red-600 dark:text-red-300 text-sm">Voltaje actual</p>
        </div>
      </div>

      <!-- CH3 -->
      <div class="group relative">
        <div class="absolute -inset-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-2xl blur-sm opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div class="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h3 class="font-bold text-green-800 dark:text-green-200">Canal 3</h3>
            </div>
            <div class="text-green-500 text-xl">🔋</div>
          </div>
          <p class="text-xl font-black text-green-900 dark:text-green-100 mb-1">
            {{ currentVoltages.ch3 }}V
          </p>
          <p class="text-green-600 dark:text-green-300 text-sm">Voltaje actual</p>
        </div>
      </div>
    </div>

    <!-- Gráfico -->
    <div class="relative">
      <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-10"></div>
      <div class="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
        
        <!-- Header del gráfico -->
        <div class="p-8 pb-4">
          <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Monitoreo de Voltajes (CH1, CH2, CH3)
          </h2>
          <p class="text-slate-600 dark:text-slate-400 mb-6">
            Voltajes en tiempo real de los 3 canales principales
          </p>

          <!-- Leyenda personalizada -->
          <div class="flex items-center gap-6 mb-4">
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

        <!-- Gráfico ApexCharts -->
        <div class="px-8 pb-8">
          <ApexChart
            type="line"
            height="500"
            :options="chartOptions"
            :series="series"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import rawData from "@/features/tension/data/data.json"

const series = ref([
  { name: "CH1", data: [] },
  { name: "CH2", data: [] },
  { name: "CH3", data: [] }
])

const chartOptions = ref({
  chart: { 
    type: "line", 
    zoom: { enabled: false }, 
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
    type: "datetime",
    labels: { 
      datetimeFormatter: { hour: "HH:mm" },
      style: { colors: '#64748b', fontSize: '12px', fontWeight: '500' }
    },
    title: { 
      text: "Hora", 
      style: { color: "#475569", fontSize: "14px", fontWeight: "600" }
    },
    min: new Date("2024-10-24 00:00:00").getTime(),
    max: new Date("2024-10-24 23:59:59").getTime(),
    axisBorder: { color: '#e2e8f0' },
    axisTicks: { color: '#e2e8f0' }
  },
  yaxis: { 
    title: { 
      text: "Voltaje (V)", 
      style: { color: "#475569", fontSize: "14px", fontWeight: "600" }
    }, 
    min: 210, 
    max: 240,
    labels: {
      style: { colors: '#64748b', fontSize: '12px', fontWeight: '500' },
      formatter: (val) => `${val}V`
    }
  },
  stroke: { 
    curve: "smooth", 
    width: 3,
    lineCap: 'round'
  },
  colors: ["#3b82f6", "#ef4444", "#22c55e"],
  legend: { 
    show: false
  },
  tooltip: { 
    x: { format: "dd/MM HH:mm" },
    theme: 'light',
    style: { fontSize: '12px' },
    marker: { show: true }
  },
  markers: {
    size: 0,
    hover: { size: 8, sizeOffset: 3 }
  }
})

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
  // Mapear los datos tal como vienen, sin modificar fechas
  series.value[0].data = rawData.map(d => [new Date(d.datetime).getTime(), d.ch1])
  series.value[1].data = rawData.map(d => [new Date(d.datetime).getTime(), d.ch2])
  series.value[2].data = rawData.map(d => [new Date(d.datetime).getTime(), d.ch3])
})
</script>