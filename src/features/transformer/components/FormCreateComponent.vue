<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div
      class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Crear Nuevo Transformador
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Tipo -->
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tipo *
            </label>
            <select id="type" v-model="form.type" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.type ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" required>
              <option value="">Seleccionar tipo</option>
              <option value="SECO">SECO</option>
              <option value="ACEITE">ACEITE</option>
            </select>
            <p v-if="errors.type" class="mt-1 text-sm text-red-600">{{ errors.type }}</p>
          </div>

          <!-- Potencia Aparente -->
          <div>
            <label for="apparentPowerKVA" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Potencia Aparente (KVA) *
            </label>
            <input id="apparentPowerKVA" v-model.number="form.apparentPowerKVA" type="number" min="1" step="0.01"
              :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.apparentPowerKVA ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" placeholder="750" required />
            <p v-if="errors.apparentPowerKVA" class="mt-1 text-sm text-red-600">{{ errors.apparentPowerKVA }}</p>
          </div>

          <!-- Voltaje Primario -->
          <div>
            <label for="voltagePrimary" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Voltaje Primario (kV) *
            </label>
            <input id="voltagePrimary" v-model="form.voltagePrimary" type="text" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.voltagePrimary ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="22.94" required />
            <p v-if="errors.voltagePrimary" class="mt-1 text-sm text-red-600">{{ errors.voltagePrimary }}</p>
          </div>

          <!-- Voltaje Secundario -->
          <div>
            <label for="voltageSecondary" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Voltaje Secundario (kV) *
            </label>
            <input id="voltageSecondary" v-model="form.voltageSecondary" type="text" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.voltageSecondary ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="0.24" required />
            <p v-if="errors.voltageSecondary" class="mt-1 text-sm text-red-600">{{ errors.voltageSecondary }}</p>
          </div>

          <!-- Número de Serie -->
          <div>
            <label for="serialNumber" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Número de Serie *
            </label>
            <input id="serialNumber" v-model="form.serialNumber" type="text" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.serialNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="TRF-2025-ROOT-01" required />
            <p v-if="errors.serialNumber" class="mt-1 text-sm text-red-600">{{ errors.serialNumber }}</p>
          </div>

          <!-- Año de Fabricación -->
          <div>
            <label for="yearManufacture" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Año de Fabricación *
            </label>
            <input id="yearManufacture" v-model.number="form.yearManufacture" type="number" :min="1900"
              :max="new Date().getFullYear()" :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.yearManufacture ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" placeholder="2024" required />
            <p v-if="errors.yearManufacture" class="mt-1 text-sm text-red-600">{{ errors.yearManufacture }}</p>
          </div>

          <!-- Factory UID -->
          <div class="md:col-span-2">
            <label for="factoryUid" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Factory UID *
            </label>
            <input id="factoryUid" v-model="form.factoryUid" type="text" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.factoryUid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="729f2fc8-f40e-4eac-ae65-292c6f0e23ea" required />
            <p v-if="errors.factoryUid" class="mt-1 text-sm text-red-600">{{ errors.factoryUid }}</p>
          </div>

          <!-- Estado Activo -->
          <div class="flex items-center md:col-span-2">
            <input id="isActive" v-model="form.isActive" type="checkbox"
              class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded" />
            <label for="isActive" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Activo
            </label>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-slate-600">
          <button type="button" @click="$emit('close')"
            class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500 rounded-md transition-colors border border-gray-300 dark:border-slate-500">
            Cancelar
          </button>
          <button type="submit" :disabled="isLoading"
            class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
            <span v-if="!isLoading" class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Crear Transformador
            </span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Creando...
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

const form = reactive({
  type: '',
  apparentPowerKVA: null,
  voltagePrimary: '',
  voltageSecondary: '',
  serialNumber: '',
  yearManufacture: new Date().getFullYear(),
  isActive: true,
  factoryUid: ''
})

// Resetear formulario
const resetForm = () => {
  form.type = ''
  form.apparentPowerKVA = null
  form.voltagePrimary = ''
  form.voltageSecondary = ''
  form.serialNumber = ''
  form.yearManufacture = new Date().getFullYear()
  form.isActive = true
  form.factoryUid = ''
  errors.value = {}
}

// Validar formulario
const validateForm = () => {
  errors.value = {}

  if (!form.type) {
    errors.value.type = 'El tipo es requerido'
  }

  if (!form.apparentPowerKVA || form.apparentPowerKVA <= 0) {
    errors.value.apparentPowerKVA = 'La potencia aparente debe ser mayor a 0'
  }

  if (!form.voltagePrimary) {
    errors.value.voltagePrimary = 'El voltaje primario es requerido'
  }

  if (!form.voltageSecondary) {
    errors.value.voltageSecondary = 'El voltaje secundario es requerido'
  }

  if (!form.serialNumber) {
    errors.value.serialNumber = 'El número de serie es requerido'
  }

  if (!form.yearManufacture || form.yearManufacture < 1900 || form.yearManufacture > new Date().getFullYear()) {
    errors.value.yearManufacture = 'Año de fabricación inválido'
  }

  if (!form.factoryUid) {
    errors.value.factoryUid = 'El Factory UID es requerido'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    isLoading.value = true
    emit('save', { ...form })

  }
}

// Resetear formulario cuando se abra el modal
watch(() => props.show, (newVal) => {
  if (newVal) {
    resetForm()
  } else {
    isLoading.value = false
  }
})
</script>