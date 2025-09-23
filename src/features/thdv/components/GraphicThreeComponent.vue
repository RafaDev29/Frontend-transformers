<template>
  <div class="p-4 space-y-2">
    <div class="relative group">
      <div
        class="absolute -inset-2 bg-gradient-to-r from-accent-primary via-accent-secondary to-color2 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500">
      </div>

      <div
        class="relative bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/40 overflow-hidden">

        <div class="p-6 pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
          <div class="flex items-center gap-3 mb-2">
            <div
              class="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-primary to-color2 flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2
              class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Rango de Distorsión Armónica por Fase
            </h2>
          </div>
          <p class="text-slate-600 dark:text-slate-400 font-medium">
            Valores mínimos y máximos de THD-F registrados en cada fase
          </p>
        </div>

        <!-- Gráfico -->
        <div class="p-6">
          <ApexChart type="bar" height="400" :options="chartOptions" :series="series" />
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

// Calcular min y max por fase
const ranges = computed(() => {
  if (!props.chartData.length) return { ch1: { min: 0, max: 0 }, ch2: { min: 0, max: 0 }, ch3: { min: 0, max: 0 } }

  const values = { ch1: [], ch2: [], ch3: [] }
  props.chartData.forEach(d => {
    values.ch1.push(Number(d.ch1) || 0)
    values.ch2.push(Number(d.ch2) || 0)
    values.ch3.push(Number(d.ch3) || 0)
  })

  return {
    ch1: { min: Math.min(...values.ch1), max: Math.max(...values.ch1) },
    ch2: { min: Math.min(...values.ch2), max: Math.max(...values.ch2) },
    ch3: { min: Math.min(...values.ch3), max: Math.max(...values.ch3) }
  }
})

// Series con dos barras (min y max) por fase
const series = computed(() => [
  {
    name: "Mínimo",
    data: [ranges.value.ch1.min, ranges.value.ch2.min, ranges.value.ch3.min]
  },
  {
    name: "Máximo",
    data: [ranges.value.ch1.max, ranges.value.ch2.max, ranges.value.ch3.max]
  }
])

const chartOptions = computed(() => ({
  chart: {
    type: "bar",
    background: "transparent",
    toolbar: { show: false },
    animations: { enabled: true, easing: "easeinout", speed: 800 }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "45%",
      borderRadius: 8
    }
  },
  colors: ["#ef4444", "#10b981"], 
  dataLabels: {
    enabled: true,
    formatter: (val) => `${val}%`,
    style: { colors: ["#fff"], fontWeight: "600" }
  },
  xaxis: {
    categories: ["Fase 1", "Fase 2", "Fase 3"],
    labels: { style: { colors: "#64748b", fontSize: "13px", fontWeight: "500" } },
    title: {
      text: "Fases",
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
  yaxis: {
    title: {
      text: "Distorsión (%)",
      style: { color: "#475569", fontSize: "14px", fontWeight: "600" }
    },
    labels: {
      style: { colors: "#64748b", fontSize: "12px" },
      formatter: (val) => `${val}%`
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
  grid: {
    borderColor: "#e2e8f0",
    strokeDashArray: 3
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    fontSize: "13px",
    labels: { colors: "#475569" }
  },
  tooltip: {
    theme: "light",
    y: { formatter: (val) => `${val}%` }
  }
}))
</script>
