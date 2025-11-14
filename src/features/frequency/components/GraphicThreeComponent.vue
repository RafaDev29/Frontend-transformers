<template>
  <div class="p-4 space-y-2">
    <div class="relative group">
      <!-- Fondo con gradiente -->
      <div
        class="absolute -inset-2 bg-gradient-to-r from-accent-primary via-accent-secondary to-color2 rounded-3xl  opacity-20 group-hover:opacity-30 transition-opacity duration-500">
      </div>

      <!-- Contenedor -->
      <div
        class="">

        <!-- Header -->
        <div class="p-6 pb-10 border-b border-slate-200/60 dark:border-slate-700/60">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-primary to-blue-500 flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h2
              class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Análisis de Estabilidad de Frecuencia
            </h2>
          </div>
          <p class="text-slate-600 dark:text-slate-400 font-medium">
            Distribución de frecuencia por rangos de operación y desviaciones
          </p>
        </div>

      

        <!-- Gráfico -->
        <div class="px-6 pb-6">
          <ApexChart type="bar" height="350" :options="chartOptions" :series="series" />
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

// Análisis de distribución de frecuencia
const frequencyAnalysis = computed(() => {
  if (!props.chartData.length) return {
    stable: 0, deviation: 0, alert: 0, critical: 0,
    min: 50, max: 50, avg: 50, stdDev: 0
  }

  const frequencies = props.chartData.map(d => Number(d.ch1) || 50).filter(f => f > 0)
  const total = frequencies.length

  if (total === 0) return {
    stable: 0, deviation: 0, alert: 0, critical: 0,
    min: 50, max: 50, avg: 50, stdDev: 0
  }

  // Clasificar frecuencias por rangos
  let stable = 0, deviation = 0, alert = 0, critical = 0

  frequencies.forEach(freq => {
    const deviation_from_50 = Math.abs(freq - 50)
    
    if (deviation_from_50 <= 0.5) stable++
    else if (deviation_from_50 <= 1.0) deviation++
    else if (deviation_from_50 <= 2.0) alert++
    else critical++
  })

  // Estadísticas básicas
  const min = Math.min(...frequencies)
  const max = Math.max(...frequencies)
  const avg = frequencies.reduce((a, b) => a + b, 0) / total
  
  // Desviación estándar
  const variance = frequencies.reduce((acc, freq) => acc + Math.pow(freq - avg, 2), 0) / total
  const stdDev = Math.sqrt(variance)

  return {
    stable, deviation, alert, critical,
    min, max, avg, stdDev
  }
})





// Series para el gráfico de barras
const series = computed(() => [
  {
    name: "Cantidad de Mediciones",
    data: [
      frequencyAnalysis.value.stable,
      frequencyAnalysis.value.deviation,
      frequencyAnalysis.value.alert,
      frequencyAnalysis.value.critical
    ]
  },
  {
    name: "Estadísticas",
    data: [
      frequencyAnalysis.value.min.toFixed(2),
      frequencyAnalysis.value.max.toFixed(2),
      frequencyAnalysis.value.avg.toFixed(2),
      frequencyAnalysis.value.stdDev.toFixed(3)
    ]
  }
])

const chartOptions = computed(() => ({
  chart: {
    type: "bar",
    background: "transparent",
    toolbar: { show: true },
    animations: { enabled: true, easing: "easeinout", speed: 800 }
  },
  plotOptions: {
  bar: {
    distributed: true,
    horizontal: false,
    columnWidth: "60%",
    borderRadius: 8,
    dataLabels: { position: 'top' }
  }
},

colors: ["#22c55e", "#15803d", "#f59e0b", "#ef4444"],

  dataLabels: {
    enabled: true,
    formatter: function(val, opts) {
      if (opts.seriesIndex === 0) {
        return val > 0 ? val : ''
      } else {
        return val + (opts.dataPointIndex < 3 ? 'Hz' : '')
      }
    },
    style: { 
      colors: ["#fff"], 
      fontWeight: "600",
      fontSize: '11px'
    },
    offsetY: -5
  },
  xaxis: {
    categories: ["Estable\n(49.5-50.5Hz)", "Desviación\n(±0.5-1.0Hz)", "Alerta\n(±1.0-2.0Hz)", "Crítico\n(>±2.0Hz)"],
    labels: { 
      style: { 
        colors: "#64748b", 
        fontSize: "12px", 
        fontWeight: "500" 
      },
      rotate: 0
    },
    title: {
      text: "Rangos de Operación",
      style: { color: "#475569", fontSize: "14px", fontWeight: "600" }
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
  yaxis: [
    {
      title: {
        text: "Número de Mediciones",
        style: { color: "#475569", fontSize: "14px", fontWeight: "600" }
      },
      labels: {
        style: { colors: "#64748b", fontSize: "12px" }
      },
        axisBorder: {
      show: true,
      color: '#475569'
    },
    axisTicks: {
      show: true,
      color: '#475569'
    },
    }
  ],
  grid: {
    borderColor: "#e2e8f0",
    strokeDashArray: 3,
    xaxis: { lines: { show: false } }
  },
  legend: {
    show: false
  },
  tooltip: {
    theme: "light",
    y: {
      formatter: function(val, opts) {
        if (opts.seriesIndex === 0) {
          return val + " mediciones"
        } else {
          const labels = ['Mínimo: ', 'Máximo: ', 'Promedio: ', 'Desv. Std: ']
          return labels[opts.dataPointIndex] + val + (opts.dataPointIndex < 3 ? 'Hz' : '')
        }
      }
    }
  },
  annotations: {
    yaxis: [{
      y: frequencyAnalysis.value.avg,
      borderColor: '#3b82f6',
      borderWidth: 2,
      strokeDashArray: 4,
      opacity: 0.7,
      label: {
        text: `Promedio: ${frequencyAnalysis.value.avg.toFixed(2)}Hz`,
        position: 'right',
        style: {
          color: '#fff',
          background: '#3b82f6',
          fontSize: '10px'
        }
      }
    }]
  }
}))
</script>