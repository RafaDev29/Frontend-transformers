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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Monitoreo de Temperatura
                </h2>
              </div>
              <p class="text-slate-600 dark:text-slate-400 font-medium">
               Temperatura en tiempo real 
              </p>
            </div>


          </div>
        </div>


        <div class="p-6">
          <ApexChart type="line" height="350" :options="chartOptions" :series="series" />
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
    name: "Temperatura", 
    data: props.chartData.map(d => d.ch1),
    color: '#1e7f14'
  }
])



const globalMin = computed(() => {
  if (!props.chartData.length) return 0
  const allValues = props.chartData.map(d => d.ch1).filter(val => val != null && !isNaN(val))
  return allValues.length ? Math.min(...allValues).toFixed(2) : 0
})

const globalMax = computed(() => {
  if (!props.chartData.length) return 0
  const allValues = props.chartData.map(d => d.ch1).filter(val => val != null && !isNaN(val))
  return allValues.length ? Math.max(...allValues).toFixed(2) : 0
})

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
      text: "Temperatura (°C)",
      style: { color: "#475569", fontSize: "14px", fontWeight: "600" }
    },
    min: Math.max(45, parseFloat(globalMin.value) - 2), 
    max: Math.min(65, parseFloat(globalMax.value) + 2), 
    labels: {
      style: { colors: '#64748b', fontSize: '12px', fontWeight: '500' },
      formatter: (val) => `${val}°C`
    }
  },
  stroke: {
    curve: "smooth",
    width: 3,
    lineCap: 'round'
  },
  colors: ["#1e7f14"],
  legend: { show: false },
  tooltip: {
    theme: 'light',
    style: { fontSize: '12px' },
    marker: { show: true },
    y: {
      formatter: (val) => `${val}°C`
    }
  },
  markers: {
    size: 0,
    hover: { size: 8, sizeOffset: 3 }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.1,
      gradientToColors: ['#10b981'],
      inverseColors: false,
      opacityFrom: 0.8,
      opacityTo: 0.1,
      stops: [0, 100]
    }
  },
  

  annotations: {
    yaxis: [
      {
        y: 50,
        borderColor: '#3b82f6',
        borderWidth: 2,
        strokeDashArray: 4,
        opacity: 0.6,
        label: {
          text: 'Nominal: 50°C',
          position: 'left',
          offsetX: 0,
          style: {
            color: '#fff',
            background: '#3b82f6',
            fontSize: '11px',
            fontWeight: '600',
            padding: {
              left: 8,
              right: 8,
              top: 4,
              bottom: 4
            }
          }
        }
      },
      {
        y: parseFloat(globalMin.value),
        borderColor: '#ef4444',
        borderWidth: 2,
        strokeDashArray: 8,
        opacity: 0.8,
        label: {
          text: `Mínimo: ${globalMin.value}°C`,
          position: 'right',
          offsetX: 0,
          style: {
            color: '#fff',
            background: '#ef4444',
            fontSize: '11px',
            fontWeight: '600',
            padding: {
              left: 8,
              right: 8,
              top: 4,
              bottom: 4
            }
          }
        }
      },
      {
        y: parseFloat(globalMax.value),
        borderColor: '#10b981',
        borderWidth: 2,
        strokeDashArray: 8,
        opacity: 0.8,
        label: {
          text: `Máximo: ${globalMax.value}°C`,
          position: 'right',
          offsetX: 0,
          style: {
            color: '#fff',
            background: '#10b981',
            fontSize: '11px',
            fontWeight: '600',
            padding: {
              left: 8,
              right: 8,
              top: 4,
              bottom: 4
            }
          }
        }
      }
    ]
  }
}))
</script>\