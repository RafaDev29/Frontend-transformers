<template>
  <div class="p-4">
    <div class="relative group">
      <!-- Gradiente de fondo animado -->
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
                  Monitoreo de Potencias con Límites
                </h2>
              </div>
              <p class="text-slate-600 dark:text-slate-400 font-medium">
                Potencias en tiempo real con valores máximos y mínimos alcanzados
              </p>
            </div>

            <!-- Leyenda mejorada -->
            <div class="flex flex-wrap items-center justify-end gap-6">
              <div class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div class="w-3 h-3 rounded-full bg-gradient-to-r from-accent-primary to-color2 shadow-md"></div>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">kW(Activa)</span>
              </div>
              <div class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div class="w-3 h-3 rounded-full bg-gradient-to-r from-accent-danger to-red-500 shadow-md"></div>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">kvar(Reactiva)</span>
              </div>
              <div class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div class="w-3 h-3 rounded-full bg-gradient-to-r from-accent-secondary to-cyan-500 shadow-md"></div>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">kVA(Aparente)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Área del gráfico -->
        <div class="p-6">
          <div ref="chartContainer" class="w-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, defineProps, computed } from 'vue'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'

const props = defineProps({
  chartData: {
    type: Array,
    required: true,
    default: () => []
  }
})

const chartContainer = ref(null)
let chart = null
let tooltipEl = null

// Calcular mínimo y máximo globales
const globalMin = computed(() => {
  if (!props.chartData.length) return 0
  const allValues = props.chartData.flatMap(d => [d.ch1, d.ch2, d.ch3])
  return Math.min(...allValues.filter(val => val != null && !isNaN(val)))
})

const globalMax = computed(() => {
  if (!props.chartData.length) return 0
  const allValues = props.chartData.flatMap(d => [d.ch1, d.ch2, d.ch3])
  return Math.max(...allValues.filter(val => val != null && !isNaN(val)))
})

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
  const data = prepareData()
  if (!data[0].length) return null
  
  const minTime = Math.min(...data[0])
  const maxTime = Math.max(...data[0])
  const diffMs = (maxTime - minTime) * 1000
  const diffHours = diffMs / (1000 * 60 * 60)
  const diffDays = diffHours / 24
  
  // Función para calcular splits inteligentes
  const getSmartSplits = () => {
    const ticks = []
    
    if (diffHours <= 24) {
      // Menos de 24 horas: cada 2-3 horas
      const interval = Math.ceil(diffHours / 8) * 3600
      for (let t = minTime; t <= maxTime; t += interval) {
        ticks.push(t)
      }
    } else if (diffDays <= 7) {
      // Menos de 1 semana: cada día
      const startDay = new Date(minTime * 1000)
      startDay.setHours(0, 0, 0, 0)
      let current = startDay.getTime() / 1000
      
      while (current <= maxTime) {
        ticks.push(current)
        current += 86400
      }
    } else if (diffDays <= 30) {
      // 1 semana a 1 mes: cada 3 días
      const interval = 3 * 86400
      for (let t = minTime; t <= maxTime; t += interval) {
        ticks.push(t)
      }
    } else if (diffDays <= 90) {
      // 1 a 3 meses: cada semana
      const interval = 7 * 86400
      for (let t = minTime; t <= maxTime; t += interval) {
        ticks.push(t)
      }
    } else if (diffDays <= 180) {
      // 3 a 6 meses: cada 2 semanas
      const interval = 14 * 86400
      for (let t = minTime; t <= maxTime; t += interval) {
        ticks.push(t)
      }
    } else if (diffDays <= 365) {
      // 6 meses a 1 año: cada mes
      const interval = 30 * 86400
      for (let t = minTime; t <= maxTime; t += interval) {
        ticks.push(t)
      }
    } else {
      // Más de 1 año: cada 2-3 meses
      const interval = Math.ceil(diffDays / 365 * 60) * 86400
      for (let t = minTime; t <= maxTime; t += interval) {
        ticks.push(t)
      }
    }
    
    return ticks
  }
  
  // Función para formatear etiquetas
  const formatXLabels = (self, ticks) => {
    if (diffHours <= 24) {
      // Menos de 24 horas: DD/MM HH:mm
      return ticks.map(v => {
        const d = new Date(v * 1000)
        const day = d.getDate().toString().padStart(2, '0')
        const month = (d.getMonth() + 1).toString().padStart(2, '0')
        const hour = d.getHours().toString().padStart(2, '0')
        const min = d.getMinutes().toString().padStart(2, '0')
        return `${day}/${month} ${hour}:${min}`
      })
    } else {
      // Más de 24 horas: DD/MM/YYYY HH:mm
      return ticks.map(v => {
        const d = new Date(v * 1000)
        const day = d.getDate().toString().padStart(2, '0')
        const month = (d.getMonth() + 1).toString().padStart(2, '0')
        const year = d.getFullYear()
        const hour = d.getHours().toString().padStart(2, '0')
        const min = d.getMinutes().toString().padStart(2, '0')
        return `${day}/${month}/${year} ${hour}:${min}`
      })
    }
  }
  
  return {
    width: chartContainer.value?.offsetWidth || 800,
    height: 360,
    title: '',
    padding: [16, 16, 0, 0],
    series: [
      {},
      {
        label: 'Fase 1',
        stroke: '#1e7f14',
        width: 2.5,
        points: { show: false }
      },
      {
        label: 'Fase 2',
        stroke: '#dc2626',
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
        time: true
      },
     
    },
    axes: [
      {
        label: 'Tiempo',
        side: 2,
        labelSize: 24,
        labelFont: '600 12px Inter, system-ui, sans-serif',
        stroke: '#475569',
        grid: {
          show: true,
          stroke: 'rgba(148,163,184,0.15)',
          width: 1
        },
        ticks: { 
          show: true, 
          stroke: '#475569', 
          width: 1, 
          size: 6 
        },
        border: {
          show: true,
          stroke: '#475569',
          width: 2
        },
        splits: getSmartSplits,
        values: formatXLabels,
        font: '500 11px Inter, system-ui, sans-serif',
        size: 80
      },
      {
        label: 'Potencia (kW / Kvar /kVA)',
        labelSize: 30,
        labelFont: '600 14px Inter, system-ui, sans-serif',
        stroke: '#475569',
        grid: { 
          stroke: '#e2e8f0', 
          width: 1 
        },
        ticks: { 
          show: true, 
          stroke: '#475569', 
          width: 1, 
          size: 6 
        },
        values: (self, ticks) => ticks.map(v => v.toFixed(1) + ' P'),
        font: '500 12px Inter, system-ui, sans-serif',
        size: 60,
        border: {
          show: true,
          stroke: '#475569',
          width: 2
        }
      }
    ],
    legend: {
      show: false
    },
    cursor: {
      lock: false,
      focus: {
        prox: 16
      },
      drag: {
        x: true,
        y: false
      },
      points: {
        size: (u, seriesIdx) => seriesIdx > 0 ? 8 : 0,
        width: (u, seriesIdx, size) => size / 4,
        stroke: (u, seriesIdx) => {
          const colors = ['', '#1e7f14', '#dc2626', '#0891b2']
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
                <div style="width: 10px; height: 10px; border-radius: 50%; background: #1e7f14;"></div>
                <span style="color: #64748b; min-width: 50px;">Fase 1:</span>
                <span style="font-weight: 600; color: #1e7f14;">${ch1Val.toFixed(2)}kW</span>
              </div>
            `
          }

          if (ch2Val != null) {
            html += `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: #dc2626;"></div>
                <span style="color: #64748b; min-width: 50px;">Fase 2:</span>
                <span style="font-weight: 600; color: #dc2626;">${ch2Val.toFixed(2)}kvar</span>
              </div>
            `
          }

          if (ch3Val != null) {
            html += `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: #0891b2;"></div>
                <span style="color: #64748b; min-width: 50px;">Fase 3:</span>
                <span style="font-weight: 600; color: #0891b2;">${ch3Val.toFixed(2)}kVA</span>
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

          if (tooltipLeft + tooltipRect.width > window.innerWidth - 10) {
            tooltipLeft = chartRect.left + left - tooltipRect.width - 15
          }

          if (tooltipTop < 10) {
            tooltipTop = 10
          }

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
    },
    // Líneas de min/max
    plugins: [
      {
        hooks: {
          draw: [
            (u) => {
              const ctx = u.ctx
              const min = globalMin.value
              const max = globalMax.value
              
              // Línea mínima
              const minY = u.valToPos(min, 'y', true)
              ctx.save()
              ctx.strokeStyle = '#ef4444'
              ctx.lineWidth = 2
              ctx.setLineDash([8, 4])
              ctx.globalAlpha = 0.8
              ctx.beginPath()
              ctx.moveTo(u.bbox.left, minY)
              ctx.lineTo(u.bbox.left + u.bbox.width, minY)
              ctx.stroke()
              
              // Línea máxima
              const maxY = u.valToPos(max, 'y', true)
              ctx.strokeStyle = '#10b981'
              ctx.beginPath()
              ctx.moveTo(u.bbox.left, maxY)
              ctx.lineTo(u.bbox.left + u.bbox.width, maxY)
              ctx.stroke()
              ctx.restore()
              
              // Etiquetas
              ctx.save()
              ctx.font = '600 14px Inter, system-ui, sans-serif'
              ctx.textAlign = 'right'
              
              // Etiqueta mínima
              ctx.fillStyle = '#ef4444'
              ctx.fillRect(u.bbox.left + u.bbox.width - 120, minY - 14, 110, 26)
              ctx.fillStyle = '#ffffff'
              ctx.fillText(`Mínimo: ${min.toFixed(1)}kW`, u.bbox.left + u.bbox.width - 10, minY + 5)
              
              // Etiqueta máxima
              ctx.fillStyle = '#10b981'
              ctx.fillRect(u.bbox.left + u.bbox.width - 120, maxY - 14, 110, 26)
              ctx.fillStyle = '#ffffff'
              ctx.fillText(`Máximo: ${max.toFixed(1)}kVA`, u.bbox.left + u.bbox.width - 10, maxY + 5)
              ctx.restore()
            }
          ]
        }
      }
    ]
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
watch(() => props.chartData, () => {
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