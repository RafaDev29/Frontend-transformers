<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]" @click.self="$emit('close')">
    <div
      class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
      
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Subir Archivo</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        
        <!-- Selección de Fábrica -->
        <div>
          <label for="factory" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fábrica *
          </label>
          <select id="factory" v-model="selectedFactoryUid" @change="filterTransformers" 
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
                   border-gray-300 dark:border-slate-600 focus:ring-color1
                   bg-green-50/70 dark:bg-green-900/20 text-gray-900 dark:text-white"
            required>
            <option value="">Seleccionar fábrica</option>
            <option v-for="f in factories" :key="f.uid" :value="f.uid">
              {{ f.businessName }} ({{ f.code }})
            </option>
          </select>
          <p v-if="errors.factory" class="mt-1 text-sm text-red-600">{{ errors.factory }}</p>
        </div>

        <!-- Selector de Transformador -->
        <div>
          <label for="transformerSerialNumber" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Transformador *
          </label>
          <select id="transformerSerialNumber" v-model="selectedTransformerSerialNumber" 
            :disabled="!filteredTransformers.length"
            :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.transformerSerialNumber ? 
                'border-red-500 focus:ring-red-500 bg-red-50/70 dark:bg-red-900/20' : 
                'border-gray-300 dark:border-slate-600 focus:ring-color1 bg-green-50/70 dark:bg-green-900/20',
              'text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed'
            ]" required>
            <option value="">Seleccionar transformador</option>
            <option v-for="t in filteredTransformers" :key="t.uid" :value="t.serialNumber">
              {{ t.serialNumber }} ({{ t.code }} )
            </option>
          </select>
          <p v-if="errors.transformerSerialNumber" class="mt-1 text-sm text-red-600">{{ errors.transformerSerialNumber }}</p>
        </div>

        <!-- Campo de Archivo -->
        <div>
          <label for="file" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Archivo Excel *
          </label>
          <input id="file" ref="fileInput" type="file" accept=".xlsx,.xls" @change="handleFileChange"
            :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-color1 file:text-white hover:file:bg-colorDark1 file:cursor-pointer',
              errors.file ? 
                'border-red-500 focus:ring-red-500 bg-red-50/70 dark:bg-red-900/20' : 
                'border-gray-300 dark:border-slate-600 focus:ring-color1 bg-green-50/70 dark:bg-green-900/20',
              'text-gray-900 dark:text-white'
            ]" required />
          <p v-if="selectedFileName" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Archivo seleccionado: {{ selectedFileName }}
          </p>
          <p v-if="errors.file" class="mt-1 text-sm text-red-600">{{ errors.file }}</p>
        </div>

        <!-- Botones -->
        <div class="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-slate-600">
          <button type="button" @click="$emit('close')"
            class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500 rounded-md border border-gray-300 dark:border-slate-500">
            Cancelar
          </button>
          <button type="submit" :disabled="isLoading"
            class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
              </svg>
              {{ isLoading ? 'Subiendo...' : 'Subir Archivo' }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps, defineEmits } from 'vue'
import { listTransformerRoot } from '@/features/transformer/services/transformerService'
import { listFactory } from '@/features/factory/services/factoryService'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close', 'save'])

const factories = ref([])
const allTransformers = ref([])
const filteredTransformers = ref([])
const selectedFactoryUid = ref('')
const selectedTransformerSerialNumber = ref('')

const isLoading = ref(false)
const errors = ref({})
const fileInput = ref(null)
const selectedFileName = ref('')
const selectedFile = ref(null)

async function loadFactories() {
  try {
    const { data } = await listFactory()
    factories.value = data
  } catch {
    console.error('Error al listar fábricas')
  }
}

async function loadTransformers() {
  try {
    const { data } = await listTransformerRoot()
    allTransformers.value = data
  } catch {
    console.error('Error al listar transformadores')
  }
}

function filterTransformers() {
  filteredTransformers.value = allTransformers.value.filter(
    t => t.factory?.uid === selectedFactoryUid.value
  )
  selectedTransformerSerialNumber.value = ''
}

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
    selectedFileName.value = file.name
    errors.value.file = ''
  } else {
    selectedFile.value = null
    selectedFileName.value = ''
  }
}

function resetForm() {
  selectedFactoryUid.value = ''
  selectedTransformerSerialNumber.value = ''
  selectedFile.value = null
  selectedFileName.value = ''
  filteredTransformers.value = []
  if (fileInput.value) fileInput.value.value = ''
  errors.value = {}
}

function validateForm() {
  errors.value = {}
  if (!selectedFactoryUid.value) errors.value.factory = 'La fábrica es requerida'
  if (!selectedTransformerSerialNumber.value) errors.value.transformerSerialNumber = 'El transformador es requerido'
  if (!selectedFile.value) errors.value.file = 'El archivo es requerido'
  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (!validateForm()) return
  isLoading.value = true
  const formData = new FormData()
  formData.append('file', selectedFile.value)
  emit('save', formData, selectedTransformerSerialNumber.value)
}

watch(() => props.show, (newVal) => {
  if (newVal) resetForm()
  else isLoading.value = false
})

onMounted(async () => {
  await Promise.all([loadFactories(), loadTransformers()])
})
</script>
