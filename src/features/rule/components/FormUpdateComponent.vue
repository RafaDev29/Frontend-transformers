<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]">
    <div
      class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Actualizar Regla de Monitoreo
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div>
            <label for="ruleCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Código de Regla *
            </label>
            <input id="ruleCode" v-model="form.ruleCode" type="text" :class="inputClasses('ruleCode')"
              placeholder="TEMP_HIGH" required />
            <p v-if="errors.ruleCode" class="mt-1 text-sm text-red-600">{{ errors.ruleCode }}</p>
          </div>
          <div>
            <label for="ruleName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre de la Regla *
            </label>
            <input id="ruleName" v-model="form.ruleName" type="text" :class="inputClasses('ruleName')"
              placeholder="Ej: Alerta por alta temperatura" required />
            <p v-if="errors.ruleName" class="mt-1 text-sm text-red-600">{{ errors.ruleName }}</p>
          </div>


        </div>

        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Tipo de Regla</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="ruleType in ruleTypes" :key="ruleType.value" class="relative">
              <input :id="ruleType.value" v-model="form.ruleType" :value="ruleType.value" type="radio" name="ruleType"
                class="sr-only peer" required />
              <label :for="ruleType.value"
                class="flex flex-col items-center justify-center p-4 text-sm font-medium text-center text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-color1 peer-checked:border-color1 peer-checked:text-color1 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div class="text-2xl mb-2">{{ ruleType.icon }}</div>
                {{ ruleType.label }}
                <div class="text-xs text-gray-400 mt-1">{{ ruleType.unit }}</div>
              </label>
            </div>
          </div>
          <p v-if="errors.ruleType" class="mt-2 text-sm text-red-600">{{ errors.ruleType }}</p>
        </div>


        <div v-if="form.ruleType" class="mb-8">
          <!-- Configuración de Temperatura -->
          <div v-if="form.ruleType === 'TEMPERATURA'"
            class="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">🌡️</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Configuración de Temperatura</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Define los niveles de temperatura que activarán las alertas en grados Celsius.
                  Las alertas se activarán automáticamente cuando se excedan estos valores establecidos por normativa.
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  🟢 Normal (°C) *
                </label>
                <input :value="form.config.levels.warning || ''" @input="handleTemperatureInput('warning', $event)"
                  type="number" :class="inputClasses('configWarning')" placeholder="80" required />
                <p v-if="errors.configWarning" class="mt-1 text-sm text-red-600">{{ errors.configWarning }}</p>
              </div>
              <div
                class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  🟡 Precaución (°C) *
                </label>
                <input :value="form.config.levels.urgent || ''" @input="handleTemperatureInput('urgent', $event)"
                  type="number" :class="inputClasses('configUrgent')" placeholder="85" required />
                <p v-if="errors.configUrgent" class="mt-1 text-sm text-red-600">{{ errors.configUrgent }}</p>
              </div>
              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  🔴 Crítico (°C) *
                </label>
                <input :value="form.config.levels.critical || ''" @input="handleTemperatureInput('critical', $event)"
                  type="number" :class="inputClasses('configCritical')" placeholder="90" required />
                <p v-if="errors.configCritical" class="mt-1 text-sm text-red-600">{{ errors.configCritical }}</p>
              </div>
            </div>
          </div>

          <div v-else-if="form.ruleType === 'POTENCIA'"
            class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">💪</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Configuración de Potencia</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                   +-% de la potencia nominal
                  Define los niveles de potencia que activarán las alertas en %.
                  Las alertas se activarán automáticamente cuando se excedan estos valores establecidos por normativa.
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  🟢 Normal (%) *
                </label>
                <input :value="form.config.levels.warning || ''" @input="handlePowerInput('warning', $event)"
                  type="number" :class="inputClasses('configWarning')" placeholder="75" min="0" max="100" required />
                <p v-if="errors.configWarning" class="mt-1 text-sm text-red-600">{{ errors.configWarning }}</p>
              </div>
              <div
                class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  🟡 Precaución (%) *
                </label>
                <input :value="form.config.levels.urgent || ''" @input="handlePowerInput('urgent', $event)"
                  type="number" :class="inputClasses('configUrgent')" placeholder="85" min="0" max="100" required />
                <p v-if="errors.configUrgent" class="mt-1 text-sm text-red-600">{{ errors.configUrgent }}</p>
              </div>
              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  🔴 Crítico (%) *
                </label>
                <input :value="form.config.levels.critical || ''" @input="handlePowerInput('critical', $event)"
                  type="number" :class="inputClasses('configCritical')" placeholder="95" min="0" max="100" required />
                <p v-if="errors.configCritical" class="mt-1 text-sm text-red-600">{{ errors.configCritical }}</p>
              </div>
            </div>
          </div>

          <div v-else-if="form.ruleType === 'TENSION'"
            class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="text-2xl">⚡</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Tensión</h4>
               <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-blue-600 dark:text-blue-300">URBANO:</strong> ±5% de la tensión nominal/de
                    operación</p>
                  <p><strong class="text-blue-600 dark:text-blue-300">RURAL:</strong> ±7.5% de la tensión nominal/de
                    operación</p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos
                    valores establecidos por normativa.</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="form.ruleType === 'FRECUENCIA'"
            class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="text-2xl">📊</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Frecuencia</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-blue-600 dark:text-blue-300"></strong> ±0,001% de la frecuencia nominal</p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos
                    valores establecidos por normativa.</p>
                </div>
              </div>
            </div>
          </div>


          <div v-else-if="form.ruleType === 'THDV'"
            class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="text-2xl">📈</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de THDV</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-blue-600 dark:text-blue-300"></strong> ±5% de la tensión nominal</p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos
                    valores establecidos por normativa.</p>
                </div>
              </div>
            </div>
          </div>


          <div v-else-if="form.ruleType === 'THDI'"
            class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="text-2xl">📉</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de THDI</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-blue-600 dark:text-blue-300"></strong> ±15% de la corriente nominal</p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos
                    valores establecidos por normativa.</p>
                </div>
              </div>
            </div>
          </div>


          <div v-else-if="form.ruleType === 'CORRIENTE'"
            class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="text-2xl">🔌</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Corriente</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-blue-600 dark:text-blue-300"></strong> ±5% de la corriente nominal (desbalance
                    por diferencia de fases)</p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos
                    valores establecidos por normativa.
                    Si la corriente de una fase supera la corriente nominal, se activará la ALERTA</p>
                </div>
              </div>
            </div>
          </div>


          <!-- Configuraciones para otros tipos -->
          <div v-else class="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="text-2xl">{{ getRuleTypeIcon(form.ruleType) }}</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Monitoreo de {{ form.ruleType.charAt(0) + form.ruleType.slice(1).toLowerCase() }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ getRuleTypeDescription(form.ruleType) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="form.ruleType" class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Alertas Asociadas</h3>
          <div v-if="availableAlerts.length > 0" class="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Selecciona las alertas que se activarán cuando esta regla se cumpla.
            </p>
            <div class="space-y-3 max-h-60 overflow-y-auto">
              <div v-for="alert in availableAlerts" :key="alert.uid"
                class="flex items-start space-x-3 p-3 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <input :id="`alert-${alert.uid}`" v-model="form.selectedAlerts" :value="alert.uid" type="checkbox"
                  class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded mt-1" />
                <label :for="`alert-${alert.uid}`" class="flex-1 cursor-pointer">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-medium text-gray-900 dark:text-white text-sm">{{ alert.name }}</span>
                    <span
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {{ alert.code }}
                    </span>
                    <span :class="[
                      'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                      alert.type === 'WHATSAPP'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    ]">
                      {{ alert.type }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ alert.description }}</p>
                </label>
              </div>
            </div>
            <p v-if="errors.selectedAlerts" class="mt-2 text-sm text-red-600">{{ errors.selectedAlerts }}</p>
          </div>
          <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
            <svg class="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 17h5l-5 5-5-5h5v-12h5v12z" />
            </svg>
            <p class="text-sm">No hay alertas disponibles. Crea alertas primero para asociarlas a esta regla.</p>
          </div>
        </div>


        <div class="flex items-center mb-6">
          <input id="isActive" v-model="form.isActive" type="checkbox"
            class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded" />
          <label for="isActive" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Regla activa
          </label>
        </div>


        <div class="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-slate-600">
          <button type="button" @click="$emit('close')"
            class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500 rounded-md transition-colors border border-gray-300 dark:border-slate-500">
            Cancelar
          </button>
          <button type="submit" :disabled="isLoading"
            class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
            <span class="flex items-center">
              <svg v-if="!isLoading" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z">
                </path>
              </svg>
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ isLoading ? 'Actualizando...' : 'Actualizar Regla' }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, defineProps, defineEmits, nextTick } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  alerts: {
    type: Array,
    default: () => []
  },
  ruleData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'update'])

const isLoading = ref(false)
const errors = ref({})

const ruleTypes = ref([
  { value: 'TENSION', label: 'Tensión', icon: '⚡', unit: 'Voltios (V)' },
  { value: 'CORRIENTE', label: 'Corriente', icon: '🔌', unit: 'Amperios (A)' },
  { value: 'FRECUENCIA', label: 'Frecuencia', icon: '📊', unit: 'Hertz (Hz)' },
  { value: 'POTENCIA', label: 'Potencia', icon: '💪', unit: 'Porcentaje (%)' },
  { value: 'THDV', label: 'THDV', icon: '📈', unit: 'Porcentaje (%)' },
  { value: 'THDI', label: 'THDI', icon: '📉', unit: 'Porcentaje (%)' },
  { value: 'TEMPERATURA', label: 'Temperatura', icon: '🌡️', unit: 'Celsius (°C)' }
])

const form = reactive({
  ruleType: '',
  ruleName: '',
  ruleCode: '',
  config: {
    levels: {
      warning: null,
      urgent: null,
      critical: null
    }
  },
  selectedAlerts: [],
  isActive: true
})

const availableAlerts = ref([])

const inputClasses = (fieldName) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
  const errorClasses = 'border-red-500 focus:ring-red-500'
  const normalClasses = 'border-gray-300 dark:border-slate-600 focus:ring-accent-primary'

  return `${baseClasses} ${errors.value[fieldName] ? errorClasses : normalClasses}`
}

// Función para manejar inputs de temperatura
const handleTemperatureInput = (type, event) => {
  const value = event.target.value
  const numberValue = value === '' ? null : parseFloat(value)
  form.config.levels[type] = numberValue
}

// Función para manejar inputs de potencia
const handlePowerInput = (type, event) => {
  const value = event.target.value
  const numberValue = value === '' ? null : parseFloat(value)
  form.config.levels[type] = numberValue
}

const getRuleTypeIcon = (type) => {
  const iconMap = {
    'TENSION': '⚡',
    'CORRIENTE': '🔌',
    'FRECUENCIA': '📊',
    'POTENCIA': '💪',
    'THDV': '📈',
    'THDI': '📉',
    'TEMPERATURA': '🌡️'
  }
  return iconMap[type] || '📊'
}

const getRuleTypeDescription = (type) => {
  const descriptions = {
    'CORRIENTE': 'Supervisa los valores de corriente eléctrica para detectar sobrecargas o anomalías.',
    'FRECUENCIA': 'Controla la frecuencia de la red eléctrica manteniendo los estándares de 50/60 Hz.',
    'POTENCIA': 'Monitorea el consumo y generación de potencia eléctrica con umbrales porcentuales.',
    'THDV': 'Mide la distorsión armónica total de tensión para calidad del suministro.',
    'THDI': 'Supervisa la distorsión armónica total de corriente en el sistema.',
    'TEMPERATURA': 'Controla la temperatura de equipos para prevenir sobrecalentamientos.'
  }
  return descriptions[type] || 'Configuración de monitoreo personalizada.'
}

const fillForm = (data) => {
  if (!data || Object.keys(data).length === 0) return
  form.ruleType = data.type || ''
  form.ruleName = data.name || ''
  form.ruleCode = data.code || ''

  if (data.config && data.config.levels) {
    const levels = data.config.levels

    form.config.levels.warning = levels.warning ?? null
    form.config.levels.urgent = levels.urgent ?? null
    form.config.levels.critical = levels.critical ?? null


    nextTick(() => {
      form.config.levels.warning = levels.warning ?? null
      form.config.levels.urgent = levels.urgent ?? null
      form.config.levels.critical = levels.critical ?? null
    })
  } else {
    form.config.levels = {
      warning: null,
      urgent: null,
      critical: null
    }
  }

  // Llenar alertas seleccionadas
  if (data.alerts && Array.isArray(data.alerts)) {
    form.selectedAlerts = data.alerts.map(alert => alert.uid)
  } else {
    form.selectedAlerts = []
  }

  if (typeof data.isActive === 'string') {
    form.isActive = data.isActive === 'Activo'
  } else {
    form.isActive = Boolean(data.isActive)
  }
}

const resetForm = () => {
  form.ruleType = ''
  form.ruleName = ''
  form.ruleCode = ''
  form.config.levels = {
    warning: null,
    urgent: null,
    critical: null
  }
  form.selectedAlerts = []
  form.isActive = true
  errors.value = {}
}

const validateForm = () => {
  errors.value = {}

  if (!form.ruleType) {
    errors.value.ruleType = 'El tipo de regla es requerido'
  }

  if (!form.ruleName) {
    errors.value.ruleName = 'El nombre de la regla es requerido'
  }

  if (!form.ruleCode) {
    errors.value.ruleCode = 'El código de regla es requerido'
  }

  // Validar configuración de temperatura y potencia
  if (form.ruleType === 'TEMPERATURA' || form.ruleType === 'POTENCIA') {
    if (form.config.levels.warning === null || form.config.levels.warning === '') {
      errors.value.configWarning = 'El nivel de advertencia es requerido'
    }
    if (form.config.levels.urgent === null || form.config.levels.urgent === '') {
      errors.value.configUrgent = 'El nivel urgente es requerido'
    }
    if (form.config.levels.critical === null || form.config.levels.critical === '') {
      errors.value.configCritical = 'El nivel crítico es requerido'
    }

    // Validar que los valores estén en orden lógico
    if (form.config.levels.warning && form.config.levels.urgent && form.config.levels.critical) {
      if (form.config.levels.warning >= form.config.levels.urgent ||
        form.config.levels.urgent >= form.config.levels.critical) {
        errors.value.configCritical = 'Los valores deben ser: Advertencia < Urgente < Crítico'
      }
    }

    // Validar rangos para potencia (0-100%)
    if (form.ruleType === 'POTENCIA') {
      if (form.config.levels.warning < 0 || form.config.levels.warning > 100) {
        errors.value.configWarning = 'El valor debe estar entre 0 y 100%'
      }
      if (form.config.levels.urgent < 0 || form.config.levels.urgent > 100) {
        errors.value.configUrgent = 'El valor debe estar entre 0 y 100%'
      }
      if (form.config.levels.critical < 0 || form.config.levels.critical > 100) {
        errors.value.configCritical = 'El valor debe estar entre 0 y 100%'
      }
    }
  }

  if (form.selectedAlerts.length === 0) {
    errors.value.selectedAlerts = 'Debe seleccionar al menos una alerta'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    isLoading.value = true

    let config = {}

    if (form.ruleType === 'TEMPERATURA' || form.ruleType === 'POTENCIA') {
      config = {
        levels: {
          warning: form.config.levels.warning,
          urgent: form.config.levels.urgent,
          critical: form.config.levels.critical
        }
      }
    }

    const updateData = {
      uid: props.ruleData.uid,
      data: {
        type: form.ruleType,
        name: form.ruleName,
        code: form.ruleCode,
        config: config,
        alerts: form.selectedAlerts,
        isActive: form.isActive
      }
    }

    setTimeout(() => {
      emit('update', updateData)
      isLoading.value = false
    }, 1000)
  }
}

watch(() => props.show, async (newVal) => {
  if (newVal) {
    resetForm()
    availableAlerts.value = props.alerts || []

    await nextTick()

    if (props.ruleData && Object.keys(props.ruleData).length > 0) {
      fillForm(props.ruleData)
    }
  } else {
    isLoading.value = false
  }
})

// Watcher para cambios en ruleData
watch(() => props.ruleData, (newData) => {
  if (newData && Object.keys(newData).length > 0 && props.show) {
    fillForm(newData)
  }
}, { deep: true, immediate: true })

// Watcher para cambios en alerts
watch(() => [...props.alerts], (newAlerts) => {
  availableAlerts.value = newAlerts || []
}, { immediate: true })

// Watcher para resetear config cuando cambia el tipo
watch(() => form.ruleType, (newType, oldType) => {
  if (props.show && oldType && newType !== oldType) {
    if ((oldType === 'TEMPERATURA' || oldType === 'POTENCIA') && (newType !== 'TEMPERATURA' && newType !== 'POTENCIA')) {
      form.config.levels = {
        warning: null,
        urgent: null,
        critical: null
      }
    }
    else if ((oldType !== 'TEMPERATURA' && oldType !== 'POTENCIA') && (newType === 'TEMPERATURA' || newType === 'POTENCIA')) {
      form.config.levels = {
        warning: null,
        urgent: null,
        critical: null
      }
    }
  }
})
</script>