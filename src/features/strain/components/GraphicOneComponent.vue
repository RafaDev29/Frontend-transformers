<template>
  <div class="p-4 space-y-2">
    <div class="relative group">
      <div
        class="absolute -inset-2 bg-gradient-to-r from-accent-primary via-accent-secondary to-color2 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500">
      </div>
      
      <div
        class="relative bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/40 overflow-hidden">

        <div class="p-6 pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-primary to-color2 flex items-center justify-center shadow-lg">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Monitoreo de Tensiones
                </h2>
              </div>
              <p class="text-slate-600 dark:text-slate-400 font-medium">
                Tensiones en tiempo real de las 3 fases del sistema eléctrico
              </p>
            </div>

            <!-- Leyenda mejorada -->
            <div class="flex flex-wrap items-center justify-end gap-6">
              <div class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div class="w-3 h-3 rounded-full bg-gradient-to-r from-accent-primary to-color2 shadow-md"></div>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Fase 1</span>
              </div>
              <div class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div class="w-3 h-3 rounded-full bg-gradient-to-r from-accent-danger to-red-500 shadow-md"></div>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Fase 2</span>
              </div>
              <div class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div class="w-3 h-3 rounded-full bg-gradient-to-r from-accent-secondary to-cyan-500 shadow-md"></div>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Fase 3</span>
              </div>
            </div>
          </div>

         
        </div>


        <div class="p-6">
          <ApexChart type="line" height="360" :options="chartOptions" :series="series" />
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

const series = computed(() => [
  { 
    name: "Fase 1", 
    data: props.chartData.map(d => d.ch1),
    color: '#059669'
  },
  { 
    name: "Fase 2", 
    data: props.chartData.map(d => d.ch2),
    color: '#dc2626'
  },
  { 
    name: "Fase 3", 
    data: props.chartData.map(d => d.ch3),
    color: '#0891b2'
  }
])



const chartOptions = computed(() => ({
  chart: {
    type: "line",
    zoom: { enabled: true },
    toolbar: { 
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true
      }
    },
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
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  xaxis: {
    type: "category", 
    tickAmount: 24,
    categories: props.chartData.map(d => d.datetime),
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
    width: 2.5,
    lineCap: 'round'
  },
  colors: ["#1e7f14", "#ef4444", "#3b82f6"],
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
</script>