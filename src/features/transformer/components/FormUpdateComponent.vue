<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]">
    <div
      class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Editar Transformador
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

          <!-- Rango Primario -->
          <div>
            <label for="primaryRange" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rango Primario *
            </label>
            <select id="primaryRange" v-model="form.primaryRangeUid" @change="resetPrimaryVoltage" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.primaryRangeUid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" required>
              <option value="">Seleccionar rango</option>
              <option v-for="range in dataRange" :key="range.uid" :value="range.uid">
                {{ range.type }}
              </option>
            </select>
            <p v-if="errors.primaryRangeUid" class="mt-1 text-sm text-red-600">{{ errors.primaryRangeUid }}</p>
          </div>

          <!-- Voltaje Primario -->
          <div>
            <label for="voltagePrimary" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Voltaje Primario (kV) *
            </label>
            <select id="voltagePrimary" v-model="form.voltagePrimary" :disabled="!form.primaryRangeUid" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.voltagePrimary ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white',
              !form.primaryRangeUid ? 'opacity-50 cursor-not-allowed' : ''
            ]" required>
              <option value="">Seleccionar voltaje</option>
              <option v-for="voltage in getPrimaryVoltageValues()" :key="voltage" :value="voltage">
                {{ voltage }} kV
              </option>
            </select>
            <p v-if="errors.voltagePrimary" class="mt-1 text-sm text-red-600">{{ errors.voltagePrimary }}</p>
          </div>

          <!-- Rango Secundario -->
          <div>
            <label for="secondaryRange" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rango Secundario *
            </label>
            <select id="secondaryRange" v-model="form.secondaryRangeUid" @change="resetSecondaryVoltage" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.secondaryRangeUid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" required>
              <option value="">Seleccionar rango</option>
              <option v-for="range in dataRange" :key="range.uid" :value="range.uid">
                {{ range.type }}
              </option>
            </select>
            <p v-if="errors.secondaryRangeUid" class="mt-1 text-sm text-red-600">{{ errors.secondaryRangeUid }}</p>
          </div>

          <!-- Voltaje Secundario -->
          <div>
            <label for="voltageSecondary" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Voltaje Secundario (kV) *
            </label>
            <select id="voltageSecondary" v-model="form.voltageSecondary" :disabled="!form.secondaryRangeUid" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.voltageSecondary ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white',
              !form.secondaryRangeUid ? 'opacity-50 cursor-not-allowed' : ''
            ]" required>
              <option value="">Seleccionar voltaje</option>
              <option v-for="voltage in getSecondaryVoltageValues()" :key="voltage" :value="voltage">
                {{ voltage }} kV
              </option>
            </select>
            <p v-if="errors.voltageSecondary" class="mt-1 text-sm text-red-600">{{ errors.voltageSecondary }}</p>
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


          <div>
            <label for="saleDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fecha de venta *
            </label>
            <input id="saleDate" v-model="form.saleDate" type="date" 
              :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.saleDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" />
            <p v-if="errors.saleDate" class="mt-1 text-sm text-red-600">{{ errors.saleDate }}</p>
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
          <button type="submit"
            class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4 4 8-8"></path>
              </svg>
              Actualizar
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
import { listRange } from '@/features/range/services/rangeService'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  transformerData: {
    type: Object,
    default: () => ({})
  }
})


const emit = defineEmits(['close', 'update'])

const dataFactory = ref([])
const dataRange = ref([])
const isLoading = ref(false)
const errors = ref({})
const dataLoaded = ref(false)

const form = reactive({
  type: '',
  zone: '',
  apparentPowerKVA: null,
  primaryRangeUid: '',
  voltagePrimary: '',
  secondaryRangeUid: '',
  voltageSecondary: '',
  serialNumber: '',
  yearManufacture: new Date().getFullYear(),
  saleDate : '' ,
  isActive: true,
  factoryUid: ''
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

const getRange = async () => {
  try {
    const response = await listRange()
    if (response) {
      console.log(response.data, "ranges")
      dataRange.value = response.data
      dataLoaded.value = true
    }
  } catch {
    console.error("error al listar rangos")
  }
}

const getPrimaryVoltageValues = () => {
  if (!form.primaryRangeUid) return []
  const selectedRange = dataRange.value.find(range => range.uid === form.primaryRangeUid)
  return selectedRange ? selectedRange.voltageValue : []
}

const getSecondaryVoltageValues = () => {
  if (!form.secondaryRangeUid) return []
  const selectedRange = dataRange.value.find(range => range.uid === form.secondaryRangeUid)
  return selectedRange ? selectedRange.voltageValue : []
}

const resetPrimaryVoltage = () => {
  form.voltagePrimary = ''
}

const resetSecondaryVoltage = () => {
  form.voltageSecondary = ''
}

const findRangeByVoltage = (voltage) => {
  const voltageNumber = parseFloat(voltage)
  for (const range of dataRange.value) {
    if (range.voltageValue && range.voltageValue.some(v => parseFloat(v) === voltageNumber)) {
      return range.uid
    }
  }
  return ''
}

// Llenar formulario con datos del transformador
const fillForm = (data) => {
  if (!data || Object.keys(data).length === 0) return

  console.log('Llenando formulario con:', data)


  form.type = data.type || ''
  form.zone = String(data.zone) || ''
  form.apparentPowerKVA = parseFloat(data.apparentPowerKVA) || null
  form.serialNumber = data.serialNumber || ''
  form.saleDate = data.saleDate || ''
  form.yearManufacture = parseInt(data.yearManufacture) || new Date().getFullYear()
  form.isActive = data.isActive === 'Activo' || data.isActive === true
  form.factoryUid = data.uidFactory || data.factory?.uid || ''


  const primaryVoltage = String(data.voltagePrimary)
  const secondaryVoltage = String(data.voltageSecondary)


  if (dataRange.value.length > 0) {

    const primaryRangeUid = findRangeByVoltage(primaryVoltage)
    const secondaryRangeUid = findRangeByVoltage(secondaryVoltage)

    console.log('Rangos encontrados:', {
      primaryRangeUid,
      secondaryRangeUid,
      primaryVoltage,
      secondaryVoltage,
      dataRange: dataRange.value
    })

    // Asignar rangos primero
    form.primaryRangeUid = primaryRangeUid
    form.secondaryRangeUid = secondaryRangeUid

    // Luego asignar los voltajes (estos deben mantenerse como los valores originales)
    // Usar setTimeout para asegurar que los selects de rango se actualicen primero
    setTimeout(() => {
      form.voltagePrimary = primaryVoltage
      form.voltageSecondary = secondaryVoltage
      console.log('Voltajes asignados:', {
        voltagePrimary: form.voltagePrimary,
        voltageSecondary: form.voltageSecondary
      })
    }, 100)
  }
}

const resetForm = () => {
  form.type = ''
  form.zone = ''
  form.apparentPowerKVA = null
  form.primaryRangeUid = ''
  form.voltagePrimary = ''
  form.secondaryRangeUid = ''
  form.voltageSecondary = ''
  form.serialNumber = ''
  form.yearManufacture = new Date().getFullYear()
  form.saleDate = ''
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

  if (!form.zone) {
    errors.value.zone = 'La zona es requerida'
  }

  if (!form.apparentPowerKVA || form.apparentPowerKVA <= 0) {
    errors.value.apparentPowerKVA = 'La potencia aparente debe ser mayor a 0'
  }

  if (!form.primaryRangeUid) {
    errors.value.primaryRangeUid = 'El rango primario es requerido'
  }

  if (!form.voltagePrimary) {
    errors.value.voltagePrimary = 'El voltaje primario es requerido'
  }

  if (!form.secondaryRangeUid) {
    errors.value.secondaryRangeUid = 'El rango secundario es requerido'
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
    errors.value.factoryUid = 'La fábrica es requerida'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    isLoading.value = true

    const updateData = {
      uid: props.transformerData.uid, // UID del transformador
      data: {
        type: form.type,
        zone: form.zone,
        apparentPowerKVA: form.apparentPowerKVA,
        voltagePrimary: form.voltagePrimary,
        voltageSecondary: form.voltageSecondary,
        serialNumber: form.serialNumber,
        yearManufacture: form.yearManufacture,
        saleDate : form.saleDate ,
        isActive: form.isActive,
        factoryUid: form.factoryUid
      }
    }

    emit('update', updateData)
  }
}

// Watcher para cuando se abra el modal
watch(() => props.show, (newVal) => {
  if (newVal) {
    resetForm()
    // Esperar a que los datos estén cargados antes de llenar el formulario
    if (dataLoaded.value && Object.keys(props.transformerData).length > 0) {
      fillForm(props.transformerData)
    }
  } else {
    isLoading.value = false
  }
})

// Watcher para cuando lleguen los datos del transformador
watch(() => props.transformerData, (newData) => {
  if (newData && Object.keys(newData).length > 0 && dataLoaded.value && props.show) {
    fillForm(newData)
  }
}, { deep: true })

// Watcher para cuando se carguen los datos de rango
watch(dataLoaded, (loaded) => {
  if (loaded && props.show && Object.keys(props.transformerData).length > 0) {
    fillForm(props.transformerData)
  }
})

onMounted(async () => {
  await Promise.all([getRange(), getFactory()])
})
</script>