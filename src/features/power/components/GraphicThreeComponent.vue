<template>
  <div class="p-4 space-y-2">
    <div class="relative group">
      <div
        class="absolute -inset-2 bg-gradient-to-r from-accent-primary via-accent-secondary to-color2 rounded-3xl  opacity-20 group-hover:opacity-30 transition-opacity duration-500">
      </div>

      <div
        class="">
        <!-- Header -->
        <div class="p-6 pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h2
              class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Análisis de Potencias Eléctricas
            </h2>
          </div>
          <p class="text-slate-600 dark:text-slate-400 font-medium">
            Comparación de potencia activa, reactiva y aparente
          </p>
        </div>

        <!-- Gráfico -->
        <div class="pl-6 pr-6">
          <ApexChart type="bar" height="410" :options="chartOptions" :series="series" />
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

const ranges = computed(() => {
  if (!props.chartData.length) return { kW: { min: 0, max: 0 }, kvar: { min: 0, max: 0 }, kVA: { min: 0, max: 0 } }

  const values = { kW: [], kvar: [], kVA: [] }
  props.chartData.forEach(d => {
    values.kW.push(Number(d.kW) || 0)
    values.kvar.push(Number(d.kvar) || 0)
    values.kVA.push(Number(d.kVA) || 0)
  })

  return {
    kW: { min: Math.min(...values.kW), max: Math.max(...values.kW) },
    kvar: { min: Math.min(...values.kvar), max: Math.max(...values.kvar) },
    kVA: { min: Math.min(...values.kVA), max: Math.max(...values.kVA) }
  }
})


const series = computed(() => [
  {
    name: "Valor Mínimo",
    data: [ranges.value.kW.min, ranges.value.kvar.min, ranges.value.kVA.min]
  },
  {
    name: "Valor Máximo",
    data: [ranges.value.kW.max, ranges.value.kvar.max, ranges.value.kVA.max]
  }
])

const chartOptions = computed(() => ({
  chart: {
    type: "bar",
    background: "transparent",
    toolbar: { show: false },
    animations: { 
      enabled: true, 
      easing: "easeinout", 
      speed: 800,
      animateGradually: { enabled: true, delay: 150 }
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      borderRadius: 8,
      dataLabels: { position: "top" }
    }
  },
  colors: ["#3b82f6", "#10b981"], // azul para mínimo, verde para máximo
  dataLabels: {
    enabled: true,
    formatter: (val, opts) => {
      const categories = ["kW", "kvar", "kVA"];
      const unit = categories[opts.dataPointIndex];
      return `${val} ${unit}`;
    },
    style: { 
      colors: ["#ffffff"], 
      fontWeight: "600",
      fontSize: "11px"
    },
    background: {
      enabled: true,
      foreColor: "#000",
      borderRadius: 4,
      padding: 4,
      opacity: 0.8
    }
  },
  xaxis: {
    categories: ["Potencia Activa", "Potencia Reactiva", "Potencia Aparente"],
    labels: { 
      style: { 
        colors: "#64748b", 
        fontSize: "13px", 
        fontWeight: "500" 
      },
      rotate: -15
    },
    title: {
      text: "Tipos de Potencia",
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
  min: ranges.value.kW.min < ranges.value.kvar.min && ranges.value.kW.min < ranges.value.kVA.min 
    ? ranges.value.kW.min 
    : Math.min(ranges.value.kW.min, ranges.value.kvar.min, ranges.value.kVA.min),
  max: Math.max(ranges.value.kW.max, ranges.value.kvar.max, ranges.value.kVA.max),
  title: {
    text: "Potencia (kW / kvar / kVA)",
    style: { color: "#475569", fontSize: "14px", fontWeight: "600" }
  },
  labels: {
    style: { colors: "#64748b", fontSize: "12px" },
    formatter: (val) => `${val}`
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
    strokeDashArray: 3,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    fontSize: "13px",
    labels: { colors: "#475569" },
    markers: { radius: 6 }
  },
  tooltip: {
    theme: "light",
    y: {
      formatter: (val, opts) => {
        const categories = ["kW", "kvar", "kVA"];
        const unit = categories[opts.dataPointIndex];
        return `${val} ${unit}`;
      }
    },
    style: { fontSize: "12px" }
  },
  responsive: [{
    breakpoint: 768,
    options: {
      plotOptions: { bar: { columnWidth: "70%" } },
      xaxis: { labels: { rotate: -45 } }
    }
  }]
}))
</script>