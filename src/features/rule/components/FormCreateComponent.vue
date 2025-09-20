<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]">
    <div class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Crear Nueva Regla de Monitoreo
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <!-- Información General -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label for="ruleName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre de la Regla *
            </label>
            <input id="ruleName" 
                   v-model="form.ruleName" 
                   type="text" 
                   :class="inputClasses('ruleName')"
                   placeholder="Ej: Alerta por alta temperatura" 
                   required />
            <p v-if="errors.ruleName" class="mt-1 text-sm text-red-600">{{ errors.ruleName }}</p>
          </div>

          <div>
            <label for="ruleCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Código de Regla *
            </label>
            <input id="ruleCode" 
                   v-model="form.ruleCode" 
                   type="text" 
                   :class="inputClasses('ruleCode')"
                   placeholder="TEMP_HIGH" 
                   required />
            <p v-if="errors.ruleCode" class="mt-1 text-sm text-red-600">{{ errors.ruleCode }}</p>
          </div>
        </div>

        <!-- Tipo de Regla -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Tipo de Regla</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="ruleType in ruleTypes" :key="ruleType.value" 
                 class="relative">
              <input :id="ruleType.value" 
                     v-model="form.ruleType" 
                     :value="ruleType.value"
                     type="radio" 
                     name="ruleType"
                     class="sr-only peer"
                     required />
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

        <!-- Configuración específica por tipo -->
        <div v-if="form.ruleType" class="mb-8">
          <!-- Configuración de Temperatura -->
          <div v-if="form.ruleType === 'TEMPERATURA'" class="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">🌡️</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Configuración de Temperatura</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Define los niveles de temperatura que activarán las alertas en grados Celsius.
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">
                  Advertencia (°C) *
                </label>
                <input v-model.number="form.config.warning" 
                       type="number" 
                       :class="inputClasses('configWarning')"
                       placeholder="80" 
                       required />
              </div>
              <div>
                <label class="block text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">
                  Urgente (°C) *
                </label>
                <input v-model.number="form.config.urgent" 
                       type="number" 
                       :class="inputClasses('configUrgent')"
                       placeholder="85" 
                       required />
              </div>
              <div>
                <label class="block text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">
                  Crítico (°C) *
                </label>
                <input v-model.number="form.config.critical" 
                       type="number" 
                       :class="inputClasses('configCritical')"
                       placeholder="90" 
                       required />
              </div>
            </div>
          </div>

          <!-- Configuración de Tensión -->
          <div v-else-if="form.ruleType === 'TENSION'" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="text-2xl">⚡</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Tensión</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-blue-600 dark:text-blue-300">RURAL:</strong> ±5% de la tensión nominal/regulada</p>
                  <p><strong class="text-blue-600 dark:text-blue-300">URBANO:</strong> ±7.5% de la tensión nominal/regulada</p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos valores establecidos por normativa.</p>
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

        <!-- Selección de Alertas -->
        <div v-if="form.ruleType" class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Alertas Asociadas</h3>
          <div v-if="availableAlerts.length > 0" class="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Selecciona las alertas que se activarán cuando esta regla se cumpla.
            </p>
            <div class="space-y-3 max-h-60 overflow-y-auto">
              <div v-for="alert in availableAlerts" :key="alert.uid" class="flex items-start space-x-3 p-3 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <input :id="`alert-${alert.uid}`"
                       v-model="form.selectedAlerts" 
                       :value="alert.uid"
                       type="checkbox"
                       class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded mt-1" />
                <label :for="`alert-${alert.uid}`" class="flex-1 cursor-pointer">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-medium text-gray-900 dark:text-white text-sm">{{ alert.name }}</span>
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
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

        <!-- Estado Activo -->
        <div class="flex items-center mb-6">
          <input id="isActive" 
                 v-model="form.isActive" 
                 type="checkbox"
                 class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded" />
          <label for="isActive" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Regla activa
          </label>
        </div>

        <!-- Botones -->
        <div class="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-slate-600">
          <button type="button" 
                  @click="$emit('close')"
                  class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500 rounded-md transition-colors border border-gray-300 dark:border-slate-500">
            Cancelar
          </button>
          <button type="submit"
                  :disabled="isLoading"
                  class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
            <span class="flex items-center">
              <svg v-if="!isLoading" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Creando...' : 'Crear Regla' }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  alerts: {
    type: Array,
    default: () => []
  }
})




const emit = defineEmits(['close', 'save'])

const isLoading = ref(false)
const errors = ref({})

const ruleTypes = ref([
  { value: 'TENSION', label: 'Tensión', icon: '⚡', unit: 'Voltios (V)' },
  { value: 'CORRIENTE', label: 'Corriente', icon: '🔌', unit: 'Amperios (A)' },
  { value: 'FRECUENCIA', label: 'Frecuencia', icon: '📊', unit: 'Hertz (Hz)' },
  { value: 'POTENCIA', label: 'Potencia', icon: '💪', unit: 'Watts (W)' },
  { value: 'THDV', label: 'THDV', icon: '📈', unit: 'Porcentaje (%)' },
  { value: 'THDI', label: 'THDI', icon: '📉', unit: 'Porcentaje (%)' },
  { value: 'TEMPERATURA', label: 'Temperatura', icon: '🌡️', unit: 'Celsius (°C)' }
])

const form = reactive({
  ruleType: '',
  ruleName: '',
  ruleCode: '',
  config: {
    warning: null,
    urgent: null,
    critical: null
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
    'TENSION': 'Monitorea los niveles de tensión eléctrica según normativas RURAL (±5%) y URBANO (±7.5%).',
    'CORRIENTE': 'Supervisa los valores de corriente eléctrica para detectar sobrecargas o anomalías.',
    'FRECUENCIA': 'Controla la frecuencia de la red eléctrica manteniendo los estándares de 50/60 Hz.',
    'POTENCIA': 'Monitorea el consumo y generación de potencia eléctrica en tiempo real.',
    'THDV': 'Mide la distorsión armónica total de tensión para calidad del suministro.',
    'THDI': 'Supervisa la distorsión armónica total de corriente en el sistema.',
    'TEMPERATURA': 'Controla la temperatura de equipos para prevenir sobrecalentamientos.'
  }
  return descriptions[type] || 'Configuración de monitoreo personalizada.'
}

const resetForm = () => {
  form.ruleType = ''
  form.ruleName = ''
  form.ruleCode = ''
  form.config = {
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

  // Validar configuración de temperatura
  if (form.ruleType === 'TEMPERATURA') {
    if (!form.config.warning) {
      errors.value.configWarning = 'El nivel de advertencia es requerido'
    }
    if (!form.config.urgent) {
      errors.value.configUrgent = 'El nivel urgente es requerido'
    }
    if (!form.config.critical) {
      errors.value.configCritical = 'El nivel crítico es requerido'
    }
    
    // Validar que los valores estén en orden lógico
    if (form.config.warning && form.config.urgent && form.config.critical) {
      if (form.config.warning >= form.config.urgent || 
          form.config.urgent >= form.config.critical) {
        errors.value.configCritical = 'Los valores deben ser: Advertencia < Urgente < Crítico'
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
    
    // Configurar según el tipo de regla
    if (form.ruleType === 'TEMPERATURA') {
      config = {
        levels: {
          warning: form.config.warning,
          urgent: form.config.urgent,
          critical: form.config.critical
        }
      }
    }
    // Para otros tipos como TENSION, config permanece vacío

    const dataToSend = {
      type: form.ruleType,
      name: form.ruleName,
      code: form.ruleCode,
      config: config,
      alerts: form.selectedAlerts,
      isActive: form.isActive
    }

    setTimeout(() => {
      emit('save', dataToSend)
      isLoading.value = false
    }, 1000)
  }
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    resetForm()
    availableAlerts.value = props.alerts || []
  } else {
    isLoading.value = false
  }
})

watch(() => [...props.alerts], (newAlerts) => {
  availableAlerts.value = newAlerts || []
}, { immediate: true })


watch(() => form.ruleType, () => {
  form.config = {
    warning: null,
    urgent: null,
    critical: null
  }
})
</script>