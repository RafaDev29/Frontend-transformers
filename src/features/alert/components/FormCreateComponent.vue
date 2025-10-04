<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]"
    @click.self="$emit('close')">
    <div
      class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Crear Nueva Alerta
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">

        <div class="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">


          <div>
            <label for="alertName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre de la Alerta *
            </label>
            <input id="alertName" v-model="form.alertName" type="text" :class="inputClasses('alertName')"
              placeholder="Ej: Alerta de temperatura crítica" required />
            <p v-if="errors.alertName" class="mt-1 text-sm text-red-600">{{ errors.alertName }}</p>
          </div>
        </div>

        <!-- Tipo de Alerta -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Tipo de Alerta</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="alertType in alertTypes" :key="alertType.value" class="relative">
              <input :id="alertType.value" v-model="form.alertType" :value="alertType.value" type="radio"
                name="alertType" class="sr-only peer" required />
              <label :for="alertType.value"
                class="flex items-center justify-center p-6 text-sm font-medium text-center text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-color1 peer-checked:border-color1 peer-checked:text-color1 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div class="flex flex-col items-center">
                  <div class="text-3xl mb-2">{{ alertType.icon }}</div>
                  <span class="font-semibold">{{ alertType.label }}</span>
                  <span class="text-xs text-gray-400 mt-1">{{ alertType.description }}</span>
                </div>
              </label>
            </div>
          </div>
          <p v-if="errors.alertType" class="mt-2 text-sm text-red-600">{{ errors.alertType }}</p>
        </div>



        <!-- Destinatarios -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Destinatarios</h3>



          <div v-if="form.alertType" class="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 dark:text-white mb-4">
              {{ form.alertType === 'whatsapp' ? 'Números' : 'Emails' }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Agregue {{ form.alertType === 'whatsapp' ? 'números de WhatsApp' : 'direcciones de email' }}

            </p>

            <div class="space-y-3">
              <div v-for="(contact, index) in form.additionalContacts" :key="index" class="flex gap-3 items-start">
                <div class="flex-1">
                  <input v-model="contact.value" :type="form.alertType === 'whatsapp' ? 'tel' : 'email'"
                    :class="inputClasses('additionalContact')"
                    :placeholder="form.alertType === 'whatsapp' ? '+51 999 999 999' : 'correo@ejemplo.com'" />
                  <p v-if="errors[`additionalContact${index}`]" class="mt-1 text-sm text-red-600">{{
                    errors[`additionalContact${index}`] }}</p>
                </div>
                <div class="flex-1">
                  <input v-model="contact.name" type="text" :class="inputClasses('contactName')"
                    placeholder="Nombre del contacto" />
                </div>
                <button type="button" @click="removeAdditionalContact(index)"
                  :disabled="form.additionalContacts.length === 1" :class="[
                    'px-3 py-2 rounded-md transition-colors',
                    form.additionalContacts.length === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20'
                  ]">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                    </path>
                  </svg>
                </button>
              </div>
            </div>

            <button type="button" @click="addAdditionalContact"
              class="mt-3 flex items-center text-sm text-accent-primary hover:text-color1 dark:text-color2 dark:hover:text-color1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Agregar {{ form.alertType === 'whatsapp' ? 'número' : 'email' }}
            </button>
          </div>
        </div>

        <div class="mb-8 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Configuración</h3>

          <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <label for="retryAttempts" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Intentos de Reenvío
              </label>
              <select id="retryAttempts" v-model.number="form.retryAttempts" :class="inputClasses('retryAttempts')">
                <option :value="0">Sin reenvío</option>
                <option :value="1">1 intento</option>
                <option :value="2">2 intentos</option>
                <option :value="3">3 intentos</option>
              </select>
            </div>
          </div>

          <!-- Estado activo -->
          <div class="flex items-center mt-6">
            <input id="isActive" v-model="form.isActive" type="checkbox"
              class="h-4 w-4 text-accent-primary focus:ring-accent-primary border-gray-300 rounded" />
            <label for="isActive" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Alerta activa
            </label>
          </div>
        </div>

        <div v-if="form.alertType && (form.sendToFactory || form.sendToClient || hasAdditionalContacts)"
          class="mb-8 p-4 bg-accent-primary/5 dark:bg-colorDark1/20 border border-accent-primary/20 dark:border-colorDark2/30 rounded-lg">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
              </path>
            </svg>
            Vista Previa de Destinatarios
          </h3>
          <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <p v-if="hasAdditionalContacts">✅ {{form.additionalContacts.filter(c => c.value).length}} contacto(s)
            </p>
          </div>
        </div>


        <div class="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-slate-600">
          <button type="button" @click="$emit('close')"
            class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500 rounded-md transition-colors border border-gray-300 dark:border-slate-500">
            Cancelar
          </button>
          <button type="submit" :disabled="isLoading"
            class="px-6 py-2 text-sm font-medium text-white bg-accent-primary hover:bg-color1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 dark:focus:ring-offset-slate-800">
            <span class="flex items-center">
              <svg v-if="!isLoading" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ isLoading ? 'Creando...' : 'Crear Alerta' }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const isLoading = ref(false)
const errors = ref({})

// Tipos de alertas disponibles
const alertTypes = ref([
  {
    value: 'whatsapp',
    label: 'WhatsApp',
    icon: '📱',
    description: 'Mensajes instantáneos'
  },
  {
    value: 'email',
    label: 'Email',
    icon: '📧',
    description: 'Correo electrónico'
  }
])

const form = reactive({
  alertName: '',
  alertType: '',
  additionalContacts: [{ value: '', name: '' }],
  retryAttempts: 0,
  isActive: true
})

const hasAdditionalContacts = computed(() => {
  return form.additionalContacts.some(contact => contact.value.trim() !== '')
})

const inputClasses = (fieldName) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors'
  const errorClasses = 'border-red-500 focus:ring-red-500'
  const normalClasses = 'border-gray-300 dark:border-slate-600 focus:ring-accent-primary'

  return `${baseClasses} ${errors.value[fieldName] ? errorClasses : normalClasses}`
}


const addAdditionalContact = () => {
  form.additionalContacts.push({ value: '', name: '' })
}

const removeAdditionalContact = (index) => {
  if (form.additionalContacts.length > 1) {
    form.additionalContacts.splice(index, 1)
  }
}

const resetForm = () => {
  form.alertName = ''
  form.alertType = ''
  form.additionalContacts = [{ value: '', name: '' }]
  form.retryAttempts = 0
  form.isActive = true
  errors.value = {}
}

const validateForm = () => {
  errors.value = {}


  if (!form.alertName) {
    errors.value.alertName = 'El nombre de la alerta es requerido'
  }

  if (!form.alertType) {
    errors.value.alertType = 'El tipo de alerta es requerido'
  }



  form.additionalContacts.forEach((contact, index) => {
    if (contact.value) {
      if (form.alertType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(contact.value)) {
          errors.value[`additionalContact${index}`] = 'Email inválido'
        }
      } else if (form.alertType === 'whatsapp') {
        const phoneRegex = /^\+?[\d\s-()]+$/
        if (!phoneRegex.test(contact.value)) {
          errors.value[`additionalContact${index}`] = 'Número inválido'
        }
      }
    }
  })

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    isLoading.value = true

    const dataToSend = {
      name: form.alertName,
      type: form.alertType.toUpperCase(),
      isActive: form.isActive,
      attempts: form.retryAttempts,
      contacts: form.additionalContacts
        .filter(contact => contact.value.trim() !== '')
        .map(contact => ({
          name: contact.name || 'Sin nombre',
          addressee: contact.value
        }))

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
  } else {
    isLoading.value = false
  }
})

watch(() => form.alertType, () => {
  form.additionalContacts = [{ value: '', name: '' }]
})
</script>