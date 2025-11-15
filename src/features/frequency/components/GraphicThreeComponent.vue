<template>
  <div class="p-4 mb-10">
    <div class="relative group">
      <!-- Fondo con gradiente -->
      <div
        class="absolute -inset-2 bg-gradient-to-r from-accent-primary via-accent-secondary to-color2 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500">
      </div>

      <!-- Contenedor -->
      <div class="">

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
        <div>
          <ApexChart type="bar" height="340" :options="chartOptions" :series="series" />
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
      columnWidth: "55%",
      borderRadius: 8,
      dataLabels: { 
        position: 'top',
        orientation: 'vertical'
      }
    }
  },
  colors: ["#22c55e", "#f59e0b", "#fb923c", "#ef4444"],
  dataLabels: {
    enabled: true,
    formatter: function(val) {
      return val > 0 ? val : ''
    },
    style: { 
      colors: ["#1e293b"], 
      fontWeight: "700",
      fontSize: '12px'
    },
    offsetY: -25,
    background: {
      enabled: true,
      foreColor: '#fff',
      padding: 6,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#e2e8f0',
      opacity: 0.95
    }
  },
  xaxis: {
    categories: [
      "Estable\n(49.5-50.5Hz)", 
      "Desviación\n(±0.5-1.0Hz)", 
      "Alerta\n(±1.0-2.0Hz)", 
      "Crítico\n(>±2.0Hz)"
    ],
    labels: { 
      style: { 
        colors: "#64748b", 
        fontSize: "11px", 
        fontWeight: "600"
      },
      rotate: 0,
      offsetY: 0,
      trim: false
    },
    title: {
      text: "Rangos de Operación",
      offsetY: 10,
      style: { 
        color: "#475569", 
        fontSize: "13px", 
        fontWeight: "700" 
      }
    },
    axisBorder: {
      show: true,
      color: '#cbd5e1',
      height: 1,
      offsetY: 0
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    title: {
      text: "Número de Mediciones",
      style: { 
        color: "#475569", 
        fontSize: "13px", 
        fontWeight: "700" 
      }
    },
    labels: {
      style: { 
        colors: "#64748b", 
        fontSize: "11px",
        fontWeight: "500"
      },
      formatter: function(val) {
        return Math.round(val)
      }
    },
    axisBorder: {
      show: true,
      color: '#cbd5e1'
    },
    axisTicks: {
      show: true,
      color: '#cbd5e1'
    }
  },
  grid: {
    borderColor: "#e2e8f0",
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
    padding: {
      top: 20,
      right: 20,
      bottom: 10,
      left: 10
    }
  },
  legend: {
    show: false
  },
  tooltip: {
    theme: "light",
    style: {
      fontSize: '12px',
      fontWeight: '500'
    },
    y: {
      formatter: function(val) {
        return val + " mediciones"
      },
      title: {
        formatter: function() {
          return "Total:"
        }
      }
    },
    marker: {
      show: true
    }
  },
  annotations: {
    yaxis: [{
      y: frequencyAnalysis.value.avg,
      borderColor: '#3b82f6',
      borderWidth: 2,
      strokeDashArray: 5,
      opacity: 0.6,
      label: {
        text: `Promedio: ${frequencyAnalysis.value.avg.toFixed(2)}Hz`,
        position: 'left',
        offsetX: 5,
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
    }]
  }
}))
</script>