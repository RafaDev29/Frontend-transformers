<template>
  <div class="p-4 mb-10">
    <div class="relative group">
      <div
        class="absolute -inset-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500">
      </div>

      <div>
        <div class="p-6 pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2
                  class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Monitoreo de Corrientes
                </h2>
              </div>
              <p class="text-slate-600 dark:text-slate-400 font-medium">
                Corriente en tiempo real de cada fase
              </p>
            </div>

            <div class="flex flex-wrap items-center justify-end gap-6">
              <div
                class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div class="w-3 h-3 rounded-full bg-gradient-to-r from-green-600 to-teal-500 shadow-md"></div>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Fase 1</span>
              </div>
              <div
                class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div class="w-3 h-3 rounded-full bg-gradient-to-r from-red-600 to-red-500 shadow-md"></div>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Fase 2</span>
              </div>
              <div
                class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div class="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 shadow-md"></div>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Fase 3</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div ref="chartContainer" class="w-full h-[360px]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, defineProps } from 'vue'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'

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

const chartContainer = ref(null)
let chart = null
let tooltipEl = null

// Preparar datos para uPlot
const prepareData = () => {
  if (!props.chartData.length) return [[], [], [], []]

  const timestamps = props.chartData.map(d => new Date(d.datetime).getTime() / 1000)
  const ch1 = props.chartData.map(d => d.ch1)
  const ch2 = props.chartData.map(d => d.ch2)
  const ch3 = props.chartData.map(d => d.ch3)

  return [timestamps, ch1, ch2, ch3]
}

// Configurar opciones del gráfico
const getChartOptions = () => {
  if (!props.dateRange.startDate || !props.dateRange.endDate) return null

  const start = new Date(props.dateRange.startDate + 'T00:00:00')
  const end = new Date(props.dateRange.endDate + 'T23:59:59')
  const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1



  // Título del eje X
  let xAxisTitle = 'Tiempo'
  if (diffDays === 1) xAxisTitle = 'Hora del Día'
  else if (diffDays <= 7) xAxisTitle = 'Día de la Semana'
  else if (diffDays <= 30) xAxisTitle = 'Fecha'
  else if (diffDays <= 365) xAxisTitle = 'Mes'
  else xAxisTitle = 'Mes del Año'

  return {
    width: chartContainer.value?.offsetWidth || 800,
    height: 360,
    title: '',
    padding: [16, 16, 0, 0],
    series: [
      {},
      {
        label: 'Fase 1',
        stroke: '#16a34a',
        width: 2.5,
        points: { show: false }
      },
      {
        label: 'Fase 2',
        stroke: '#ef4444',
        width: 2.5,
        points: { show: false }
      },
      {
        label: 'Fase 3',
        stroke: '#0891b2',
        width: 2.5,
        points: { show: false }
      }
    ],
    scales: {
      x: {
        time: true,
        min: diffDays === 1
          ? new Date(start).setHours(0, 0, 0, 0) / 1000
          : start.getTime() / 1000,
        max: diffDays === 1
          ? new Date(end).setHours(23, 59, 59, 999) / 1000
          : end.getTime() / 1000,
      }
    },
    axes: [
      {
        label: xAxisTitle,
        side: 2,
        labelSize: 24,
        labelFont: '600 12px Inter, system-ui, sans-serif',
        stroke: '#475569',
        grid: {
          show: true,
          stroke: 'rgba(148,163,184,0.15)',
          width: 1,
        },
        ticks: { show: true, stroke: '#475569', width: 1, size: 6 },

        border: {
          show: true,
          stroke: '#475569',
          width: 2,
        },
        splits: (() => {
          if (diffDays === 1) {
            // 1️⃣ un día → cada hora hasta las 23:00
            return () => {
              const ticks = []
              const base = new Date(props.dateRange.startDate + 'T00:00:00').getTime() / 1000
              for (let h = 0; h < 24; h++) ticks.push(base + h * 3600)
              return ticks
            }
          }


          if (diffDays > 1 && diffDays <= 7) {
            // 2️⃣ menos de 1 semana → cada día hasta el último día incluido
            return () => {
              const ticks = []
              const base = new Date(props.dateRange.startDate + 'T00:00:00').getTime() / 1000
              for (let d = 0; d < diffDays; d++) ticks.push(base + d * 86400)
              return ticks
            }
          }


          if (diffDays > 7 && diffDays <= 60) {
            // 3️⃣ de 1 semana a 2 meses → cada 2 días (hasta el último día incluido)
            return () => {
              const ticks = []
              const base = new Date(props.dateRange.startDate + 'T00:00:00').getTime() / 1000
              for (let d = 0; d < diffDays; d += 2) ticks.push(base + d * 86400)
              return ticks
            }
          }


          if (diffDays > 60 && diffDays <= 180) {
            // 4️⃣ de 2 a 6 meses → cada 15 días
            return () => {
              const ticks = []
              const base = new Date(props.dateRange.startDate + 'T00:00:00').getTime() / 1000
              for (let d = 0; d <= diffDays; d += 15) ticks.push(base + d * 86400)
              return ticks
            }
          }

          // 5️⃣ más de 6 meses → dejar automático
          return null
        })(),

        // --- Etiquetas del eje X ---
        values: (self, ticks) => {
          const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
          const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

          if (diffDays === 1) {
            // Horas
            return ticks.map(v => {
              const d = new Date(v * 1000)
              return d.getHours().toString().padStart(2, '0') + ':00'
            })
          }

          if (diffDays <= 7) {
            // Días con nombre corto
            return ticks.map(v => {
              const d = new Date(v * 1000)
              return `${days[d.getDay()]} ${d.getDate()}`
            })
          }

          if (diffDays > 7 && diffDays <= 60) {
            // Días abreviados con mes
            return ticks.map(v => {
              const d = new Date(v * 1000)
              return `${d.getDate()} ${months[d.getMonth()]}`
            })
          }

          if (diffDays > 60 && diffDays <= 180) {
            // Saltos de 15 días → mostrar día y mes
            return ticks.map(v => {
              const d = new Date(v * 1000)
              return `${d.getDate()} ${months[d.getMonth()]}`
            })
          }

          if (diffDays > 180 && diffDays <= 365) {
            // Meses con año
            return ticks.map(v => {
              const d = new Date(v * 1000)
              return `${months[d.getMonth()]} ${d.getFullYear()}`
            })
          }

          // Años
          return ticks.map(v => new Date(v * 1000).getFullYear())
        },

        font: '500 12px Inter, system-ui, sans-serif',
        size: diffDays > 30 ? 80 : 60,
      },

      // --- Eje Y ---
      {
        label: 'Corriente (A)',
        labelSize: 30,
        labelFont: '600 14px Inter, system-ui, sans-serif',
        stroke: '#475569',
        grid: { stroke: '#e2e8f0', width: 1 },
        ticks: { show: true, stroke: '#475569', width: 1, size: 6 },
        values: (self, ticks) => ticks.map(v => v.toFixed(1) + 'A'),
        font: '500 12px Inter, system-ui, sans-serif',
        size: 60,
          border: {
          show: true,
          stroke: '#475569',
          width: 2,
        },

      },
    ]
    ,

    legend: {
      show: false
    },
    cursor: {
      lock: false,
      focus: {
        prox: 16
      },
      sync: {
        key: 'voltage',
        setSeries: true
      },
      drag: {
        x: true,
        y: false
      },
      points: {
        size: (u, seriesIdx) => seriesIdx > 0 ? 8 : 0,
        width: (u, seriesIdx, size) => size / 4,
        stroke: (u, seriesIdx) => {
          const colors = ['', '#16a34a', '#ef4444', '#0891b2']
          return colors[seriesIdx]
        },
        fill: () => '#ffffff'
      }
    },
    hooks: {
      setCursor: [
        (u) => {
          const idx = u.cursor.idx

          if (idx == null) {
            tooltipEl.style.display = 'none'
            return
          }

          const data = u.data
          const timestamp = data[0][idx]
          const ch1Val = data[1][idx]
          const ch2Val = data[2][idx]
          const ch3Val = data[3][idx]

          const date = new Date(timestamp * 1000)
          const dateStr = date.toLocaleDateString('es-PE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
          const timeStr = date.toLocaleTimeString('es-PE', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })

          let html = `
            <div style="font-weight: 600; margin-bottom: 8px; color: #1e293b; font-size: 13px;">
              ${dateStr} ${timeStr}
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
          `

          if (ch1Val != null) {
            html += `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: #16a34a;"></div>
                <span style="color: #64748b; min-width: 50px;">Fase 1:</span>
                <span style="font-weight: 600; color: #16a34a;">${ch1Val.toFixed(2)}A</span>
              </div>
            `
          }

          if (ch2Val != null) {
            html += `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444;"></div>
                <span style="color: #64748b; min-width: 50px;">Fase 2:</span>
                <span style="font-weight: 600; color: #ef4444;">${ch2Val.toFixed(2)}A</span>
              </div>
            `
          }

          if (ch3Val != null) {
            html += `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: #0891b2;"></div>
                <span style="color: #64748b; min-width: 50px;">Fase 3:</span>
                <span style="font-weight: 600; color: #0891b2;">${ch3Val.toFixed(2)}A</span>
              </div>
            `
          }

          html += `</div>`

          tooltipEl.innerHTML = html
          tooltipEl.style.display = 'block'


          const left = u.cursor.left
          const top = u.cursor.top

          const tooltipRect = tooltipEl.getBoundingClientRect()
          const chartRect = u.root.getBoundingClientRect()

          let tooltipLeft = chartRect.left + left + 110
          let tooltipTop = chartRect.top + top - tooltipRect.height / 2

          // Ajustar si se sale por la derecha
          if (tooltipLeft + tooltipRect.width > window.innerWidth - 10) {
            tooltipLeft = chartRect.left + left - tooltipRect.width - 15
          }

          // Ajustar si se sale por arriba
          if (tooltipTop < 10) {
            tooltipTop = 10
          }

          // Ajustar si se sale por abajo
          if (tooltipTop + tooltipRect.height > window.innerHeight - 10) {
            tooltipTop = window.innerHeight - tooltipRect.height - 10
          }

          tooltipEl.style.left = tooltipLeft + window.scrollX + 'px'
          tooltipEl.style.top = tooltipTop + window.scrollY + 'px'
        }
      ],
      setSelect: [
        (self) => {
          const min = self.select.left
          const max = self.select.left + self.select.width

          if (min !== max) {
            const minX = self.posToVal(min, 'x')
            const maxX = self.posToVal(max, 'x')

            self.setScale('x', { min: minX, max: maxX })
          }
        }
      ]
    }
  }
}

// Crear o actualizar gráfico
const updateChart = () => {
  if (!chartContainer.value) return

  const data = prepareData()
  const opts = getChartOptions()

  if (!opts || !data[0].length) return

  if (chart) {
    chart.destroy()
  }

  chart = new uPlot(opts, data, chartContainer.value)
}

// Observar cambios
watch(() => [props.chartData, props.dateRange], () => {
  updateChart()
}, { deep: true })

// Handle resize
let resizeObserver = null

onMounted(() => {
  // Crear tooltip
  tooltipEl = document.createElement('div')
  tooltipEl.style.cssText = `
    position: absolute;
    display: none;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 10px 14px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    font-size: 13px;
    pointer-events: none;
    z-index: 10000;
    font-family: Inter, system-ui, sans-serif;
  `
  document.body.appendChild(tooltipEl)

  updateChart()

  resizeObserver = new ResizeObserver(() => {
    if (chart && chartContainer.value) {
      chart.setSize({
        width: chartContainer.value.offsetWidth,
        height: 360
      })
    }
  })

  if (chartContainer.value) {
    resizeObserver.observe(chartContainer.value)
  }
})

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy()
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (tooltipEl && tooltipEl.parentNode) {
    tooltipEl.parentNode.removeChild(tooltipEl)
    tooltipEl = null
  }
})
</script>
