<template>
  <div class="p-4">
    <div class="relative group">
      <div
        class="absolute -inset-2 bg-gradient-to-r from-accent-primary via-accent-secondary to-color2 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500">
      </div>
      
      <div>
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
                Tensiones en tiempo real en cada fase
              </p>
            </div>

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
  },
  dateRange: {
    type: Object,
    required: true,
    default: () => ({ startDate: '', endDate: '' })
  }
})

// Series con TODOS los datos reales
const series = computed(() => [
  { 
    name: "Fase 1", 
    data: props.chartData.map(d => ({ x: d.datetime, y: d.ch1 })),
    color: '#059669'
  },
  { 
    name: "Fase 2", 
    data: props.chartData.map(d => ({ x: d.datetime, y: d.ch2 })),
    color: '#dc2626'
  },
  { 
    name: "Fase 3", 
    data: props.chartData.map(d => ({ x: d.datetime, y: d.ch3 })),
    color: '#0891b2'
  }
])

const chartOptions = computed(() => {
  if (!props.dateRange.startDate || !props.dateRange.endDate) {
    return {}
  }
  
  const start = new Date(props.dateRange.startDate + 'T00:00:00')
  const end = new Date(props.dateRange.endDate + 'T23:59:59')

 const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1

  
  let xAxisTitle = "Tiempo"
  if (diffDays <= 1) xAxisTitle = "Hora del Día"
  else if (diffDays <= 7) xAxisTitle = "Día de la Semana"
  else if (diffDays <= 365) xAxisTitle = "Fecha"
  else xAxisTitle = "Mes"
  
  // Generar ticks personalizados según el rango
  let customTicks = []
  
  // 1 día: generar cada hora desde 00:00 hasta 23:00
 if (diffDays <= 1) {
  for (let hour = 0; hour < 24; hour++) { // de 0 a 24
    const tickDate = new Date(start)
    tickDate.setHours(hour, 0, 0, 0)
    customTicks.push(tickDate.getTime())
  }
}

  // 2-7 días: generar cada día desde el lunes (o primer día) hasta el domingo (o último día)
  else if (diffDays <= 7) {
  for (let i = 0; i < diffDays; i++) { // 👈 aquí el cambio
    const tickDate = new Date(start)
    tickDate.setDate(start.getDate() + i)
    tickDate.setHours(12, 0, 0, 0)
    customTicks.push(tickDate.getTime())
  }
}


  else if (diffDays <= 365) {
    const interval = Math.ceil(diffDays / 15)
    for (let i = 0; i <= diffDays; i += interval) {
      const tickDate = new Date(start)
      tickDate.setDate(start.getDate() + i)
      tickDate.setHours(12, 0, 0, 0)
      customTicks.push(tickDate.getTime())
    }

    const lastTick = new Date(end)
    lastTick.setHours(12, 0, 0, 0)
    if (customTicks[customTicks.length - 1] !== lastTick.getTime()) {
      customTicks.push(lastTick.getTime())
    }
  }
  // Más de 365 días: generar el primer día de cada mes
else {
  const startMonth = start.getMonth()
  const startYear = start.getFullYear()
  const endMonth = end.getMonth()
  const endYear = end.getFullYear()
  
  let currentMonth = start.getDate() === 1 ? startMonth : startMonth + 1
  let currentYear = startYear

  while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
    const tickDate = new Date(currentYear, currentMonth, 1, 12, 0, 0, 0)
    customTicks.push(tickDate.getTime())

    currentMonth++
    if (currentMonth > 11) {
      currentMonth = 0
      currentYear++
    }
  }

  // Garantiza incluir el último mes si no cayó exacto
  const lastTick = new Date(end.getFullYear(), end.getMonth(), 1, 12, 0, 0, 0)
  if (customTicks[customTicks.length - 1] !== lastTick.getTime()) {
    customTicks.push(lastTick.getTime())
  }
}


  
  return {
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
      type: "datetime",
      min: start.getTime(),
      max: end.getTime(),
      tickAmount: customTicks.length - 1,
      labels: {
        rotate: diffDays > 30 ? -45 : 0,
        rotateAlways: false,
        datetimeUTC: false,
        style: { colors: '#64748b', fontSize: '12px', fontWeight: '500' },
        formatter: (val, timestamp) => {
          if (!timestamp) return ''
          
          const date = new Date(timestamp)
          const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
          const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
          
          // 1 día: mostrar horas (00:00 - 23:00)
          if (diffDays <= 1) {
            const hours = String(date.getHours()).padStart(2, '0')
            return `${hours}:00`
          } 
          // 2-7 días: mostrar cada día
          else if (diffDays <= 7) {
            const dayName = days[date.getDay()]
            const day = date.getDate()
            return `${dayName} ${day}`
          } 
          // 8-365 días: mostrar fechas
          else if (diffDays <= 365) {
            const day = date.getDate()
            const month = months[date.getMonth()]
            return `${day} ${month}`
          } 
          // Más de 365: mostrar meses
          else {
            return months[date.getMonth()]
          }
        }
      },
      title: {
        text: xAxisTitle,
        style: { color: "#475569", fontSize: "12px", fontWeight: "600" }
      },
      axisBorder: {
        show: true,
        color: '#475569',
        height: 2
      },
      axisTicks: {
        show: true
      },
    },
    yaxis: {
      title: {
        text: "Tensión (V)",
        style: { color: "#475569", fontSize: "14px", fontWeight: "600" }
      },
      min: 210,
      max: 250,
      labels: {
        style: { colors: '#64748b', fontSize: '12px', fontWeight: '500' },
        formatter: (val) => val ? `${val.toFixed(1)}V` : ''
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
      width: 2.5,
      lineCap: 'round'
    },
    colors: ["#1e7f14", "#ef4444", "#3b82f6"],
    legend: { show: false },
    tooltip: {
      theme: 'light',
      style: { fontSize: '12px' },
      marker: { show: true },
      x: {
        format: 'dd MMM yyyy HH:mm:ss',
        formatter: (val) => {
          const date = new Date(val)
          const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
          const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
          
          const dayName = days[date.getDay()]
          const day = String(date.getDate()).padStart(2, '0')
          const month = months[date.getMonth()]
          const year = date.getFullYear()
          const hours = String(date.getHours()).padStart(2, '0')
          const minutes = String(date.getMinutes()).padStart(2, '0')
          const seconds = String(date.getSeconds()).padStart(2, '0')
          
          return `${dayName} ${day} ${month} ${year} - ${hours}:${minutes}:${seconds}`
        }
      }
    },
    markers: {
      size: 0,
      hover: { size: 6, sizeOffset: 3 }
    }
  }
})
</script>