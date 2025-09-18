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
                     class="flex flex-col items-center justify-center p-4 text-sm font-medium text-center text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
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

        <!-- Configuración de Tensión (solo se muestra si ruleType === 'tension') -->
        <div v-if="form.ruleType === 'tension'" class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            <span class="inline-flex items-center">
              ⚡ Configuración de Tensión
            </span>
          </h3>
          
          <!-- Fases -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div v-for="fase in fases" :key="fase" class="space-y-4">
              <h4 class="font-medium text-gray-900 dark:text-white">{{ fase }}</h4>
              
              <div>
                <label :for="`voltajeMin${fase}`" class="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Voltaje Mínimo (V)
                </label>
                <input :id="`voltajeMin${fase}`"
                       v-model.number="form.tensionConfig[fase].voltajeMin"
                       type="number"
                       step="0.1"
                       :class="inputClasses(`voltajeMin${fase}`)"
                       placeholder="200.0" />
              </div>
              
              <div>
                <label :for="`voltajeMax${fase}`" class="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Voltaje Máximo (V)
                </label>
                <input :id="`voltajeMax${fase}`"
                       v-model.number="form.tensionConfig[fase].voltajeMax"
                       type="number"
                       step="0.1"
                       :class="inputClasses(`voltajeMax${fase}`)"
                       placeholder="240.0" />
              </div>
            </div>
          </div>

          <!-- Configuración de Alertas -->
          <div class="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 dark:text-white mb-4">Configuración de Alertas</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <option value="sms">SMS</option>
                  <option value="dashboard">Dashboard</option>
                </select>
                <p v-if="errors.alertType" class="mt-1 text-sm text-red-600">{{ errors.alertType }}</p>
              </div>

              <div>
                <label for="priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prioridad *
                </label>
                <select id="priority" 
                        v-model="form.priority" 
                        :class="inputClasses('priority')" 
                        required>
                  <option value="">Seleccionar prioridad</option>
                  <option value="baja">🟢 Baja</option>
                  <option value="media">🟡 Media</option>
                  <option value="alta">🔴 Alta</option>
                  <option value="critica">🚨 Crítica</option>
                </select>
                <p v-if="errors.priority" class="mt-1 text-sm text-red-600">{{ errors.priority }}</p>
              </div>
            </div>

            <!-- Contactos de WhatsApp (solo si alertType === 'whatsapp') -->
            <div v-if="form.alertType === 'whatsapp'" class="mt-4">
              <label for="whatsappContacts" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contactos de WhatsApp
              </label>
              <div class="space-y-2">
                <div v-for="(contact, index) in form.whatsappContacts" :key="index" class="flex gap-2">
                  <input v-model="contact.number" 
                         type="tel" 
                         :class="inputClasses('whatsappContact')"
                         placeholder="+51 999 999 999" />
                  <input v-model="contact.name" 
                         type="text" 
                         :class="inputClasses('whatsappName')"
                         placeholder="Nombre del contacto" />
                  <button type="button" 
                          @click="removeWhatsappContact(index)"
                          class="px-3 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
                <button type="button" 
                        @click="addWhatsappContact"
                        class="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Agregar contacto
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Estado -->
        <div class="flex items-center mb-6">
          <input id="isActive" 
                 v-model="form.isActive" 
                 type="checkbox"
                 class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
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
                  class="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Crear Regla
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

const fases = ['Fase L1', 'Fase L2', 'Fase L3']

const form = reactive({
  ruleType: '',
  ruleName: '',
  ruleCode: '',
  alertType: '',
  priority: '',
  isActive: true,
  whatsappContacts: [{ number: '', name: '' }],
  tensionConfig: {
    'Fase L1': { voltajeMin: null, voltajeMax: null },
    'Fase L2': { voltajeMin: null, voltajeMax: null },
    'Fase L3': { voltajeMin: null, voltajeMax: null }
  }
})

// Función para generar clases CSS dinámicas para inputs
const inputClasses = (fieldName) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
  const errorClasses = 'border-red-500 focus:ring-red-500'
  const normalClasses = 'border-gray-300 dark:border-slate-600 focus:ring-blue-500'
  
  return `${baseClasses} ${errors.value[fieldName] ? errorClasses : normalClasses}`
}

const addWhatsappContact = () => {
  form.whatsappContacts.push({ number: '', name: '' })
}

const removeWhatsappContact = (index) => {
  if (form.whatsappContacts.length > 1) {
    form.whatsappContacts.splice(index, 1)
  }
}

const resetForm = () => {
  form.ruleType = ''
  form.ruleName = ''
  form.ruleCode = ''
  form.alertType = ''
  form.priority = ''
  form.isActive = true
  form.whatsappContacts = [{ number: '', name: '' }]
  form.tensionConfig = {
    'Fase L1': { voltajeMin: null, voltajeMax: null },
    'Fase L2': { voltajeMin: null, voltajeMax: null },
    'Fase L3': { voltajeMin: null, voltajeMax: null }
  }
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

  if (!form.alertType) {
    errors.value.alertType = 'El tipo de alerta es requerido'
  }

  if (!form.priority) {
    errors.value.priority = 'La prioridad es requerida'
  }

  // Validaciones específicas para tensión
  if (form.ruleType === 'tension') {
    fases.forEach(fase => {
      const config = form.tensionConfig[fase]
      if (config.voltajeMin !== null && config.voltajeMax !== null && config.voltajeMin >= config.voltajeMax) {
        errors.value[`voltaje${fase}`] = `En ${fase}: el voltaje mínimo debe ser menor al máximo`
      }
    })
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
      alertType: form.alertType,
      priority: form.priority,
      isActive: form.isActive,
      whatsappContacts: form.alertType === 'whatsapp' ? form.whatsappContacts.filter(c => c.number) : [],
      tensionConfig: form.ruleType === 'tension' ? form.tensionConfig : null
    }

    emit('save', dataToSend)
  }
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    resetForm()
  } else {
    isLoading.value = false
  }
})

// Reset whatsapp contacts when alert type changes
watch(() => form.alertType, (newVal) => {
  if (newVal !== 'whatsapp') {
    form.whatsappContacts = [{ number: '', name: '' }]
  }
})
</script>