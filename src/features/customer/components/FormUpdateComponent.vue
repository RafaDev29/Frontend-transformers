<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]">
    <div
      class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Editar Cliente
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

          <div>
            <label for="businessname" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Razón social *
            </label>
            <input id="businessname" v-model="form.businessname" type="text" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.businessname ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" required />
            <p v-if="errors.businessname" class="mt-1 text-sm text-red-600">{{ errors.businessname }}</p>
          </div>

          <div>
            <label for="code" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Código *
            </label>
            <input id="code" v-model="form.code" type="text" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.code ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="C001" required />
            <p v-if="errors.code" class="mt-1 text-sm text-red-600">{{ errors.code }}</p>
          </div>

          <div>
            <label for="ruc" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ruc *
            </label>
            <input id="ruc" v-model="form.ruc" type="text" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.ruc ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="" required />
            <p v-if="errors.ruc" class="mt-1 text-sm text-red-600">{{ errors.ruc }}</p>
          </div>

          <div>
            <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dirección *
            </label>
            <input id="address" v-model="form.address" type="text" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="" required />
            <p v-if="errors.address" class="mt-1 text-sm text-red-600">{{ errors.address }}</p>
          </div>

          <div>
            <label for="distric" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Distrito *
            </label>
            <input id="distric" v-model="form.distric" type="text" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.distric ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="" required />
            <p v-if="errors.distric" class="mt-1 text-sm text-red-600">{{ errors.distric }}</p>
          </div>

          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Usuario *
            </label>
            <input id="username" v-model="form.username" type="text" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="" required />
            <p v-if="errors.username" class="mt-1 text-sm text-red-600">{{ errors.username }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contraseña *
            </label>
            <input id="password" v-model="form.password" type="text" :class="[
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
              'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
            ]" placeholder="" required />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <div>
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
              Actualizar Cliente
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

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  clientData: {
    type: Object,
    default: () => ({})
  }
})

console.log(props.clientData, "datos del cliente")

const emit = defineEmits(['close', 'update'])

const dataFactory = ref([])
const isLoading = ref(false)
const errors = ref({})
const dataLoaded = ref(false) // Nueva variable para controlar cuando los datos están cargados

const form = reactive({
  businessname: '',
  code: '',
  ruc: '',
  address: '',
  distric: '',
  username: '',
  password: '',
  isActive: true,
  factoryUid: ''
})

const getFactory = async () => {
  try {
    const response = await listFactory()
    if (response) {
      console.log(response.data, "factories")
      dataFactory.value = response.data
      dataLoaded.value = true // Marcar que los datos están cargados
    }
  } catch {
    console.error("error al listar fabricas")
  }
}

// Llenar formulario con datos del cliente
const fillForm = (data) => {
  if (!data || Object.keys(data).length === 0) return

  console.log('Llenando formulario con:', data)

  form.businessname = data.businessName || data.businessname || ''
  form.code = data.code || ''
  form.ruc = data.ruc || ''
  form.address = data.address || ''
  form.distric = data.distric || ''
  form.username = data.username || ''
  form.password = data.password || ''
  form.isActive = data.isActive === 'Activo' || data.isActive === true
  form.factoryUid = data.uidFactory || data.factory?.uid || ''
}

const resetForm = () => {
  form.businessname = ''
  form.code = ''
  form.ruc = ''
  form.address = ''
  form.distric = ''
  form.username = ''
  form.password = ''
  form.isActive = true
  form.factoryUid = ''
  errors.value = {}
}

// Validar formulario
const validateForm = () => {
  errors.value = {}

  if (!form.businessname) {
    errors.value.businessname = 'La razón social es requerida'
  }

  if (!form.code) {
    errors.value.code = 'El código es requerido'
  }

  if (!form.ruc) {
    errors.value.ruc = 'El RUC es requerido'
  }

  if (!form.address) {
    errors.value.address = 'La dirección es requerida'
  }

  if (!form.distric) {
    errors.value.distric = 'El distrito es requerido'
  }

  if (!form.username) {
    errors.value.username = 'El usuario es requerido'
  }

  if (!form.password) {
    errors.value.password = 'La contraseña es requerida'
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
      uid: props.clientData.uid, // UID del cliente
      data: {
        businessname: form.businessname,
        code: form.code,
        ruc: form.ruc,
        address: form.address,
        distric: form.distric,
        username: form.username,
        password: form.password,
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
    if (Object.keys(props.clientData).length > 0) {
      fillForm(props.clientData)
    }
  } else {
    isLoading.value = false
  }
})

// Watcher para cuando lleguen los datos del cliente
watch(() => props.clientData, (newData) => {
  if (newData && Object.keys(newData).length > 0 && props.show) {
    fillForm(newData)
  }
}, { deep: true })

onMounted(() => {
  getFactory()
})
</script>