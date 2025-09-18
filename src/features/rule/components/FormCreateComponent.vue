<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]">
    <div class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
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
                   placeholder="Ej: Tensión Alta Crítica" 
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
                   placeholder="R001" 
                   required />
            <p v-if="errors.ruleCode" class="mt-1 text-sm text-red-600">{{ errors.ruleCode }}</p>
          </div>
        </div>

        <!-- Información sobre Tolerancias -->
        <div class="mb-8 p-4 bg-accent-primary/5 dark:bg-colorDark1/20 border border-accent-primary/20 dark:border-colorDark2/30 rounded-lg">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5 text-accent-primary dark:text-color2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Tolerancias de Tensión por Zona</h4>
              <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <p><strong class="text-accent-primary dark:text-color2">RURAL:</strong> ±5% de la tensión nominal</p>
                <p><strong class="text-accent-primary dark:text-color2">URBANO:</strong> ±7.5% de la tensión nominal</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tipo de Tensión Base -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            <span class="inline-flex items-center">
              ⚡ Configuración de Tensión
            </span>
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="tensionBase" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo de Tensión Base *
              </label>
              <select id="tensionBase" 
                      v-model="form.tensionBase" 
                      :class="inputClasses('tensionBase')" 
                      required>
                <option value="">Seleccionar tipo de tensión</option>
                <option value="regulada">Tensión Regulada</option>
                <option value="nominal">Tensión Nominal</option>
              </select>
              <p v-if="errors.tensionBase" class="mt-1 text-sm text-red-600">{{ errors.tensionBase }}</p>
            </div>

          
          </div>

          <!-- Configuración de Alertas -->
          <div class="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 dark:text-white mb-4">Configuración de Alertas</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label for="alertType" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Alerta *
                </label>
                <select id="alertType" 
                        v-model="form.alertType" 
                        :class="inputClasses('alertType')" 
                        required>
                  <option value="">Seleccionar tipo de alerta</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                </select>
                <p v-if="errors.alertType" class="mt-1 text-sm text-red-600">{{ errors.alertType }}</p>
              </div>

             
            </div>

          
          </div>
        </div>

        <!-- Estado -->
        <div class="flex items-center mb-6">
          <input id="isActive" 
                 v-model="form.isActive" 
                 type="checkbox"
                 class="h-4 w-4 text-accent-primary focus:ring-accent-primary border-gray-300 rounded" />
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
                  class="px-6 py-2 text-sm font-medium text-white bg-accent-primary hover:bg-color1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 dark:focus:ring-offset-slate-800">
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
  }
})

const emit = defineEmits(['close', 'save'])

const isLoading = ref(false)
const errors = ref({})

// Tipos de reglas disponibles
const ruleTypes = ref([
  { value: 'tension', label: 'Tensión', icon: '⚡', unit: 'Voltios (V)' },
  { value: 'corriente', label: 'Corriente', icon: '🔌', unit: 'Amperios (A)' },
  { value: 'frecuencia', label: 'Frecuencia', icon: '📊', unit: 'Hertz (Hz)' },
  { value: 'potencia', label: 'Potencia', icon: '💪', unit: 'Watts (W)' },
  { value: 'thdv', label: 'THDV', icon: '📈', unit: 'Porcentaje (%)' },
  { value: 'thdi', label: 'THDI', icon: '📉', unit: 'Porcentaje (%)' },
  { value: 'temperatura', label: 'Temperatura', icon: '🌡️', unit: 'Celsius (°C)' }
])

const form = reactive({
  ruleType: '',
  ruleName: '',
  ruleCode: '',
  tensionBase: '',
  alertType: '',
  isActive: true
})

// Función para generar clases CSS dinámicas para inputs
const inputClasses = (fieldName) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
  const errorClasses = 'border-red-500 focus:ring-red-500'
  const normalClasses = 'border-gray-300 dark:border-slate-600 focus:ring-accent-primary'
  
  return `${baseClasses} ${errors.value[fieldName] ? errorClasses : normalClasses}`
}

const resetForm = () => {
  form.ruleType = ''
  form.ruleName = ''
  form.ruleCode = ''
  form.tensionBase = ''
  form.zona = ''
  form.alertType = ''
  form.contactNumber = ''
  form.contactName = ''
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

  if (!form.tensionBase) {
    errors.value.tensionBase = 'El tipo de tensión base es requerido'
  }

  if (!form.zona) {
    errors.value.zona = 'La zona es requerida'
  }

  if (!form.alertType) {
    errors.value.alertType = 'El tipo de alerta es requerido'
  }

 

  // Validación específica para email
  if (form.alertType === 'email' && form.contactNumber) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.contactNumber)) {
      errors.value.contactNumber = 'Ingrese un email válido'
    }
  }

  // Validación específica para WhatsApp
  if (form.alertType === 'whatsapp' && form.contactNumber) {
    const phoneRegex = /^\+?[\d\s-()]+$/
    if (!phoneRegex.test(form.contactNumber)) {
      errors.value.contactNumber = 'Ingrese un número de teléfono válido'
    }
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    isLoading.value = true

    const dataToSend = {
      ruleType: form.ruleType,
      ruleName: form.ruleName,
      ruleCode: form.ruleCode,
      tensionBase: form.tensionBase,
      zona: form.zona,
      alertType: form.alertType,
      contactNumber: form.contactNumber,
      contactName: form.contactName,
      isActive: form.isActive
    }

    // Simular delay para mostrar loading
    setTimeout(() => {
      emit('save', dataToSend)
      isLoading.value = false
    }, 1000)
  }
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    resetForm()
  } else {
    isLoading.value = false
  }
})


</script>