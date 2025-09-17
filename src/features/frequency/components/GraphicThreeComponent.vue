<template>
  <div class="p-4 space-y-2">
    <div class="relative group">
      <!-- Fondo con gradiente -->
      <div
        class="absolute -inset-2 bg-gradient-to-r from-accent-primary via-accent-secondary to-color2 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500">
      </div>

      <!-- Contenedor -->
      <div
        class="relative bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/40 overflow-hidden">

        <!-- Header -->
        <div class="p-6 pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
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

        <!-- Estadísticas superiores -->
        <div class="p-3 pb-2">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-1 mb-1">
            <div class="text-center p-1 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200/60 dark:border-green-700/60">
              <div class="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">ESTABLE</div>
              <div class="text-xs font-bold text-green-700 dark:text-green-300">{{ stablePercentage }}%</div>
              <div class="text-xs text-green-600 dark:text-green-400">49.5-50.5Hz</div>
            </div>
            <div class="text-center p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200/60 dark:border-yellow-700/60">
              <div class="text-xs font-semibold text-yellow-600 dark:text-yellow-400 mb-1">DESVIACIÓN</div>
              <div class="text-xs font-bold text-yellow-700 dark:text-yellow-300">{{ deviationPercentage }}%</div>
              <div class="text-xs text-yellow-600 dark:text-yellow-400">±0.5-1.0Hz</div>
            </div>
            <div class="text-center p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200/60 dark:border-orange-700/60">
              <div class="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">ALERTA</div>
              <div class="text-xs font-bold text-orange-700 dark:text-orange-300">{{ alertPercentage }}%</div>
              <div class="text-xs text-orange-600 dark:text-orange-400">±1.0-2.0Hz</div>
            </div>
            <div class="text-center p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200/60 dark:border-red-700/60">
              <div class="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">CRÍTICO</div>
              <div class="text-xs font-bold text-red-700 dark:text-red-300">{{ criticalPercentage }}%</div>
              <div class="text-xs text-red-600 dark:text-red-400">>±2.0Hz</div>
            </div>
          </div>
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

// Porcentajes para las tarjetas superiores
const stablePercentage = computed(() => {
  const total = props.chartData.length
  return total > 0 ? Math.round((frequencyAnalysis.value.stable / total) * 100) : 0
})

const deviationPercentage = computed(() => {
  const total = props.chartData.length
  return total > 0 ? Math.round((frequencyAnalysis.value.deviation / total) * 100) : 0
})

const alertPercentage = computed(() => {
  const total = props.chartData.length
  return total > 0 ? Math.round((frequencyAnalysis.value.alert / total) * 100) : 0
})

const criticalPercentage = computed(() => {
  const total = props.chartData.length
  return total > 0 ? Math.round((frequencyAnalysis.value.critical / total) * 100) : 0
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
      horizontal: false,
      columnWidth: "60%",
      borderRadius: 8,
      dataLabels: { position: 'top' }
    }
  },
  colors: ["#10b981", "#f59e0b", "#f97316", "#ef4444"],
  dataLabels: {
    enabled: true,
    formatter: function(val, opts) {
      // Primera serie muestra cantidad, segunda serie muestra valores con Hz
      if (opts.seriesIndex === 0) {
        return val > 0 ? val : ''
      } else {
        // const labels = ['Min', 'Max', 'Prom', 'σ']
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
    axisBorder: { color: '#e2e8f0' }
  },
  yaxis: [
    {
      title: {
        text: "Número de Mediciones",
        style: { color: "#475569", fontSize: "14px", fontWeight: "600" }
      },
      labels: {
        style: { colors: "#64748b", fontSize: "12px" }
      }
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