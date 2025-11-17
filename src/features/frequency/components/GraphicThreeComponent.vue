<template>
  <div class="p-4 pb-10 mb-6">
    <div class="relative group">
      <div
        class="absolute -inset-2 bg-gradient-to-r from-accent-primary via-accent-secondary to-color2 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500">
      </div>

      <div class="p-6 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
        <!-- Header Simple -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-color1 to-color2 bg-clip-text text-transparent mb-2">
            Frecuencia Actual del Sistema
          </h1>
          <p class="text-slate-600 dark:text-slate-400">
            Medidor en tiempo real
          </p>
        </div>

        <div class="relative flex items-center justify-center">
          <div class="relative">
            <svg width="300" height="180" viewBox="0 0 300 200" class="drop-shadow-lg">
              <!-- Background arc -->
              <path d="M 50 150 A 100 100 0 0 1 250 150" fill="none" :stroke="darkMode ? '#334155' : '#e2e8f0'"
                stroke-width="20" stroke-linecap="round" />

              <!-- Progress arc -->
              <path :d="progressPath" fill="none" :stroke="gaugeColor" stroke-width="20" stroke-linecap="round"
                class="transition-all duration-1000 ease-out" :stroke-dasharray="circumference"
                :stroke-dashoffset="offset" />

              <!-- Center Circle -->
              <circle cx="150" cy="150" r="15" :fill="gaugeColor" class="drop-shadow-md" />

              <!-- Frequency Markers -->
              <g v-for="(marker, index) in markers" :key="index">
                <line :x1="marker.x1" :y1="marker.y1" :x2="marker.x2" :y2="marker.y2"
                  :stroke="darkMode ? '#64748b' : '#94a3b8'" stroke-width="2" />
                <text :x="marker.textX" :y="marker.textY" text-anchor="middle" :fill="darkMode ? '#cbd5e1' : '#64748b'"
                  font-size="12" font-weight="600">
                  {{ marker.value }}Hz
                </text>
              </g>
            </svg>

            <!-- Center Frequency Display -->
            <div class="absolute inset-0 flex flex-col items-center justify-center" style="top: 45px;">
              <div class="text-center">
                <div class="text-5xl font-bold mb-1" :class="frequencyTextColor">
                  {{ currentFreq }}
                </div>
                <div class="text-lg font-medium text-slate-600 dark:text-slate-400">
                  Hz
                </div>
                <div class="px-3 py-1 rounded-full text-xs font-bold text-white mt-2" :class="statusBadgeColor">
                  {{ statusText }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Status Indicators -->
        <div class="flex justify-center gap-6 mt-8">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-color1"></div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">  Estable (49.5-50.5Hz)</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-accent-warning"></div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Precaución (±0.5–1.0 Hz)</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-accent-danger"></div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Crítico (>±1.0 Hz)</span>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-3 gap-4 mt-8">
          <!-- Min -->
          <div class="text-center p-4 rounded-xl border border-color3 dark:border-colorDark3 bg-gradient-to-br"
            :class="minCardColor">
            <div class="text-2xl font-bold text-white mb-1">{{ minFreq }}Hz</div>
            <div class="text-xs font-medium text-white/90">Mínima Hoy</div>
          </div>

          <!-- Avg -->
          <div class="text-center p-4 rounded-xl border border-color3 dark:border-colorDark3 bg-gradient-to-br"
            :class="avgCardColor">
            <div class="text-2xl font-bold text-white mb-1">{{ avgFreq }}Hz</div>
            <div class="text-xs font-medium text-white/90">Promedio</div>
          </div>

          <!-- Max -->
          <div class="text-center p-4 rounded-xl border border-color3 dark:border-colorDark3 bg-gradient-to-br"
            :class="maxCardColor">
            <div class="text-2xl font-bold text-white mb-1">{{ maxFreq }}Hz</div>
            <div class="text-xs font-medium text-white/90">Máxima Hoy</div>
          </div>
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
  darkMode: {
    type: Boolean,
    default: false
  }
})


const currentFreq = computed(() => {
  if (props.chartData.length > 0) {
    return props.chartData[props.chartData.length - 1].ch1?.toFixed(2) || '50.00'
  }
  return '50.00' // Default value for demo
})

const minFreq = computed(() => {
  if (props.chartData.length > 0) {
    return Math.min(...props.chartData.map(d => d.ch1)).toFixed(2)
  }
  return '49.50'
})

const maxFreq = computed(() => {
  if (props.chartData.length > 0) {
    return Math.max(...props.chartData.map(d => d.ch1)).toFixed(2)
  }
  return '50.50'
})

const avgFreq = computed(() => {
  if (props.chartData.length > 0) {
    const sum = props.chartData.reduce((acc, d) => acc + d.ch1, 0)
    return (sum / props.chartData.length).toFixed(2)
  }
  return '50.00'
})

// Gauge calculations
const minGaugeFreq = 57
const maxGaugeFreq = 63

const circumference = Math.PI * 100 // Half circle circumference

const frequencyPercentage = computed(() => {
  const freq = parseFloat(currentFreq.value)
  const normalized = (freq - minGaugeFreq) / (maxGaugeFreq - minGaugeFreq)
  return Math.max(0, Math.min(normalized, 1))
})

const offset = computed(() => {
  return circumference * (1 - frequencyPercentage.value)
})

const progressPath = "M 50 150 A 100 100 0 0 1 250 150"

// Color logic based on frequency deviation from 50Hz
const gaugeColor = computed(() => {
  const freq = parseFloat(currentFreq.value)
  const deviation = Math.abs(freq - 60)
  if (deviation <= 0.5) return '#1e7f14' // color1 - green
  if (deviation <= 1.0) return '#d97706' // accent-warning - yellow
  return '#dc2626' // accent-danger - red
})

const frequencyTextColor = computed(() => {
  const freq = parseFloat(currentFreq.value)
  const deviation = Math.abs(freq - 60)
  if (deviation <= 0.5) return 'text-color1 dark:text-color3'
  if (deviation <= 1.0) return 'text-accent-warning'
  return 'text-accent-danger'
})

const statusBadgeColor = computed(() => {
  const freq = parseFloat(currentFreq.value)
  const deviation = Math.abs(freq - 60)
  if (deviation <= 0.5) return 'bg-color1'
  if (deviation <= 1.0) return 'bg-accent-warning'
  return 'bg-accent-danger'
})

const statusText = computed(() => {
  const freq = parseFloat(currentFreq.value)
  const deviation = Math.abs(freq - 60)
  if (deviation <= 0.5) return 'ESTABLE'
  if (deviation <= 1.0) return 'PRECAUCIÓN'
  return 'CRÍTICO'
})

const minCardColor = computed(() => {
  const f = parseFloat(minFreq.value)
  const deviation = Math.abs(f - 60)
  if (deviation <= 0.5) return 'from-green-700 to-green-800'
  if (deviation <= 1.0) return 'from-yellow-500 to-yellow-600 dark:from-yellow-700 dark:to-yellow-800'
  return 'from-red-500 to-red-600 dark:from-red-700 dark:to-red-800'
})

const avgCardColor = computed(() => {
  const f = parseFloat(avgFreq.value)
  const deviation = Math.abs(f - 60)
  if (deviation <= 0.5) return 'from-green-700 to-green-800'
  if (deviation <= 1.0) return 'from-yellow-500 to-yellow-600 dark:from-yellow-700 dark:to-yellow-800'
  return 'from-red-500 to-red-600 dark:from-red-700 dark:to-red-800'
})

const maxCardColor = computed(() => {
  const f = parseFloat(maxFreq.value)
  const deviation = Math.abs(f - 60)
  if (deviation <= 0.5) return 'from-green-700 to-green-800'
  if (deviation <= 1.0) return 'from-yellow-500 to-yellow-600 dark:from-yellow-700 dark:to-yellow-800'
  return 'from-red-500 to-red-600 dark:from-red-700 dark:to-red-800'
})

const markers = computed(() => {
  const freqs = [57, 58, 59, 60, 61, 62, 63]
  return freqs.map(freq => {
    const normalized = (freq - minGaugeFreq) / (maxGaugeFreq - minGaugeFreq)
    const angle = normalized * Math.PI
    const innerRadius = 80
    const outerRadius = 95
    const textRadius = 110

    const x1 = 150 - innerRadius * Math.cos(angle)
    const y1 = 150 - innerRadius * Math.sin(angle)
    const x2 = 150 - outerRadius * Math.cos(angle)
    const y2 = 150 - outerRadius * Math.sin(angle)
    const textX = 150 - textRadius * Math.cos(angle)
    const textY = 150 - textRadius * Math.sin(angle) + 4

    return {
      x1, y1, x2, y2, textX, textY, value: freq
    }
  })
})
</script>