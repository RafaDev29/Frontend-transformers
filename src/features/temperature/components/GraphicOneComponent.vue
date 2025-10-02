<template>
  <div class="p-4 space-y-2">
    <div class="relative group">
      <div
        class="absolute -inset-2 bg-gradient-to-r from-accent-primary via-accent-secondary to-color2 rounded-3xl  opacity-20 group-hover:opacity-30 transition-opacity duration-500">
      </div>
      
      <div
        class="">

        <div class="p-6 pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Monitoreo de Temperatura
                </h2>
              </div>
              <p class="text-slate-600 dark:text-slate-400 font-medium">
                  Temperatura en tiempo real del sistema
              </p>
            </div>

            <div class="flex flex-wrap items-center justify-end gap-6">
              <div class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div class="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-md"></div>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Temperatura</span>
              </div>

            </div>
          </div>

         
        </div>

        <div class="p-6">
          <ApexChart type="area" height="350" :options="chartOptions" :series="series" />
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
    color: '#dc2626'
  }
])



const chartOptions = computed(() => ({
  chart: {
    type: "area",
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
      speed: 1000
    }
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: '#e2e8f0',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
    padding: {
      top: 0,
      right: 30,
      bottom: 0,
      left: 20
    }
  },
  xaxis: {
    type: "category", 
    tickAmount: 24,
    categories: props.chartData.map(d => d.datetime),
    labels: {
      rotate: -45,
      style: { 
        colors: '#64748b', 
        fontSize: '11px', 
        fontWeight: '500' 
      }
    },
    title: {
      text: "Tiempo",
      style: { color: "#475569", fontSize: "13px", fontWeight: "600" }
    },
   axisBorder: {
      show: true,
      color: '#475569',
      height: 2
    },
    axisTicks: {
      show: true,
      color: '#475569',
      height: 6
    },
  },
  yaxis: {
    title: {
      text: "Temperatura (°C)",
      style: { color: "#475569", fontSize: "14px", fontWeight: "600" }
    },
    labels: {
      style: { 
        colors: '#64748b', 
        fontSize: '12px', 
        fontWeight: '500' 
      },
      formatter: (val) => `${val}°C`
    },
      axisBorder: {
      show: true,
      color: '#475569'
    },
    axisTicks: {
      show: true,
      color: '#475569'
    },
  },
  stroke: {
    curve: "smooth",
    width: 3
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: 'light',
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: ['#fbbf24'],
      inverseColors: false,
      opacityFrom: 0.8,
      opacityTo: 0.1,
      stops: [0, 100]
    }
  },
  colors: ["#f59e0b"],
  legend: { 
    show: false 
  },
  tooltip: {
    theme: 'light',
    style: { fontSize: '12px' },
    marker: { show: true },
    x: {
      format: 'dd/MM HH:mm'
    },
    y: {
      formatter: (val) => `${val}°C`
    }
  },
  markers: {
    size: 0,
    hover: { 
      size: 8, 
      sizeOffset: 3 
    }
  },
  annotations: {
    yaxis: [
      {
        y: 80,
        borderColor: '#f97316',
        borderWidth: 2,
        strokeDashArray: 5,
        label: {
          text: 'Límite de Advertencia (80°C)',
          style: {
            color: '#fff',
            background: '#f97316'
          }
        }
      },
      {
        y: 100,
        borderColor: '#dc2626',
        borderWidth: 2,
        strokeDashArray: 5,
        label: {
          text: 'Límite Crítico (100°C)',
          style: {
            color: '#fff',
            background: '#dc2626'
          }
        }
      }
    ]
  }
}))


</script>