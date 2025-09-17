<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]">
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

          <!-- Zona -->
          <div>
            <label for="zone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Zona *
            </label>
            <select id="zone" v-model="form.zone" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.zone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" required>
              <option value="">Seleccionar zona</option>
              <option value="7.5">Rural</option>
              <option value="5">Urbano</option>
            </select>
            <p v-if="errors.zone" class="mt-1 text-sm text-red-600">{{ errors.zone }}</p>
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

          <!-- Voltaje Primario -->
          <div>
            <label for="primaryVoltage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Voltaje Primario *
            </label>
            <input id="primaryVoltage" v-model="form.primaryVoltage" type="text" maxlength="20" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.primaryVoltage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="13800V" required />
            <p v-if="errors.primaryVoltage" class="mt-1 text-sm text-red-600">{{ errors.primaryVoltage }}</p>
          </div>

          <!-- Voltaje Secundario -->
          <div>
            <label for="secondaryVoltage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Voltaje Secundario *
            </label>
            <input id="secondaryVoltage" v-model="form.secondaryVoltage" type="text" maxlength="20" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.secondaryVoltage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="440V" required />
            <p v-if="errors.secondaryVoltage" class="mt-1 text-sm text-red-600">{{ errors.secondaryVoltage }}</p>
          </div>

          <!-- Voltaje Regulado -->
          <div>
            <label for="regulatedVoltage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Voltaje Regulado *
            </label>
            <input id="regulatedVoltage" v-model="form.regulatedVoltage" type="text" maxlength="20" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.regulatedVoltage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="220V" required />
            <p v-if="errors.regulatedVoltage" class="mt-1 text-sm text-red-600">{{ errors.regulatedVoltage }}</p>
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

          <!-- Fábrica -->
          <div class="md:col-span-2">
            <label for="factoryUid" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fábrica *
            </label>
            <select id="factoryUid" v-model="form.factoryUid" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.factoryUid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" required>
              <option value="">Seleccionar fábrica</option>
              <option v-for="factory in dataFactory" :key="factory.uid" :value="factory.uid">
                {{ factory.businessName }}
              </option>
            </select>
            <p v-if="errors.factoryUid" class="mt-1 text-sm text-red-600">{{ errors.factoryUid }}</p>
          </div>

          <!-- Campos opcionales -->
          <div class="md:col-span-2 border-t border-gray-200 dark:border-slate-600 pt-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Campos Opcionales</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Cliente -->
              <div>
                <label for="customerUid" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cliente
                </label>
                <select id="customerUid" v-model="form.customerUid" :class="[
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                  'border-gray-300 dark:border-slate-600 focus:ring-color1',
                  'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                ]">
                  <option value="">Seleccionar cliente</option>
                  <option v-for="customer in dataCustomer" :key="customer.uid" :value="customer.uid">
                    {{ customer.businessname }}
                  </option>
                </select>
              </div>

              <!-- Fecha de Venta -->
              <div>
                <label for="saleDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fecha de Venta
                </label>
                <input id="saleDate" v-model="form.saleDate" type="date" :class="[
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                  'border-gray-300 dark:border-slate-600 focus:ring-color1',
                  'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                ]" />
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
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-slate-600">
          <button type="button" @click="$emit('close')"
            class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500 rounded-md transition-colors border border-gray-300 dark:border-slate-500">
            Cancelar
          </button>
          <button type="submit"
            class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Crear Transformador
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, defineProps, defineEmits, onMounted } from 'vue'
import { listFactory } from '@/features/factory/services/factoryService'
import { allCustomer } from '@/features/customer/services/customerService'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const dataFactory = ref([])
const dataCustomer = ref([])
const isLoading = ref(false)
const errors = ref({})

const form = reactive({
  // Campos obligatorios
  type: '',
  apparentPowerKVA: null,
  zone: '',
  primaryVoltage: '',
  secondaryVoltage: '',
  regulatedVoltage: '',
  serialNumber: '',
  yearManufacture: new Date().getFullYear(),
  factoryUid: '',
  
  // Campos opcionales
  customerUid: '',
  saleDate: '',
  isActive: true
})

const getFactory = async () => {
  try {
    const response = await listFactory()
    if (response) {
      console.log(response.data, "factories")
      dataFactory.value = response.data
    }
  } catch {
    console.error("error al listar fabricas")
  }
}

const getCustomer = async () => {
  try {
    const response = await allCustomer()
    if (response) {
      console.log(response.data, "customer")
      dataCustomer.value = response.data
    }
  } catch {
    console.error("error al listar clientes")
  }
}

const resetForm = () => {
  // Campos obligatorios
  form.type = ''
  form.apparentPowerKVA = null
  form.zone = ''
  form.primaryVoltage = ''
  form.secondaryVoltage = ''
  form.regulatedVoltage = ''
  form.serialNumber = ''
  form.yearManufacture = new Date().getFullYear()
  form.factoryUid = ''
  
  // Campos opcionales
  form.customerUid = ''
  form.saleDate = ''
  form.isActive = true
  
  errors.value = {}
}

// Validar formulario
const validateForm = () => {
  errors.value = {}

  // Validaciones de campos obligatorios
  if (!form.type) {
    errors.value.type = 'El tipo es requerido'
  }

  if (!form.zone) {
    errors.value.zone = 'La zona es requerida'
  }

  if (!form.apparentPowerKVA || form.apparentPowerKVA < 1) {
    errors.value.apparentPowerKVA = 'La potencia aparente debe ser mayor o igual a 1'
  }

  if (!form.primaryVoltage || form.primaryVoltage.length > 20) {
    errors.value.primaryVoltage = 'El voltaje primario es requerido (máx. 20 caracteres)'
  }

  if (!form.secondaryVoltage || form.secondaryVoltage.length > 20) {
    errors.value.secondaryVoltage = 'El voltaje secundario es requerido (máx. 20 caracteres)'
  }

  if (!form.regulatedVoltage || form.regulatedVoltage.length > 20) {
    errors.value.regulatedVoltage = 'El voltaje regulado es requerido (máx. 20 caracteres)'
  }

  if (!form.serialNumber) {
    errors.value.serialNumber = 'El número de serie es requerido'
  }

  if (!form.yearManufacture || form.yearManufacture < 1900 || form.yearManufacture > new Date().getFullYear()) {
    errors.value.yearManufacture = 'Año de fabricación inválido'
  }

  if (!form.factoryUid) {
    errors.value.factoryUid = 'La fábrica es requerida'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    isLoading.value = true

    // Crear objeto solo con campos obligatorios
    const dataToSend = {
      type: form.type,
      apparentPowerKVA: form.apparentPowerKVA,
      zone: form.zone,
      primaryVoltage: form.primaryVoltage,
      secondaryVoltage: form.secondaryVoltage,
      regulatedVoltage: form.regulatedVoltage,
      serialNumber: form.serialNumber,
      yearManufacture: form.yearManufacture,
      factoryUid: form.factoryUid
    }

    // Solo agregar campos opcionales si tienen valor
    if (form.customerUid) {
      dataToSend.customerUid = form.customerUid
    }

    if (form.saleDate) {
      dataToSend.saleDate = form.saleDate
    }

    // isActive siempre se incluye ya que tiene un valor por defecto
    if (form.isActive !== null && form.isActive !== undefined) {
      dataToSend.isActive = form.isActive
    }

    console.log('Datos a enviar:', dataToSend)
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

onMounted(() => {
  getFactory()
  getCustomer()
})
</script>