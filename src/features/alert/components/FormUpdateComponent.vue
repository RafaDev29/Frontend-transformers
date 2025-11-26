<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]" @click.self="$emit('close')">
    <div class="mt-10 bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ alertData && alertData.uid ? 'Actualizar Alerta' : 'Crear Nueva Alerta' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <!-- Información General -->
        <div class="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <div>
            <label for="alertName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre de la Alerta *
            </label>
            <input id="alertName" 
                   v-model="form.alertName" 
                   type="text" 
                   :class="inputClasses('alertName')"
                   placeholder="Ej: Alerta de temperatura crítica" 
                   required />
            <p v-if="errors.alertName" class="mt-1 text-sm text-red-600">{{ errors.alertName }}</p>
          </div>
        </div>

        <!-- Tipo de Alerta -->
        <div class="mb-8 w-full px-3 py-2 border rounded-md bg-green-50/70 dark:bg-green-900/20 backdrop-blur-sm border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color1 transition-all duration-200">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Tipo de Alerta</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="alertType in alertTypes" :key="alertType.value" class="relative">
              <input :id="alertType.value" 
                     v-model="form.alertType" 
                     :value="alertType.value"
                     type="radio" 
                     name="alertType"
                     class="sr-only peer"
                     required />
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
              <div v-for="(contact, index) in filteredContacts" :key="index" class="flex gap-3 items-start flex-wrap">
                
                <!-- Selector de tipo de contacto - Solo visible para usuarios sin rol específico -->
                <div v-if="!isFactory && !isCustomer" class="flex-1 min-w-[200px]">
                  <select v-model="contact.type" :class="inputClasses('contactType')" @change="onContactTypeChange(index)">
                    <option value="">Seleccionar tipo</option>
                    <option value="customer">Cliente</option>
                    <option value="factory">Fábrica</option>
                  </select>
                  <p v-if="errors[`contactType${index}`]" class="mt-1 text-sm text-red-600">
                    {{ errors[`contactType${index}`] }}
                  </p>
                </div>

                <!-- Selector de Cliente o Fábrica - Solo visible para usuarios sin rol específico -->
                <div v-if="!isFactory && !isCustomer && contact.type" class="flex-1 min-w-[200px]">
                  <select v-if="contact.type === 'customer'" v-model="contact.customerUid"
                    :class="inputClasses('customerUid')" @change="onCustomerChange(index)">
                    <option value="">Seleccionar cliente</option>
                    <option v-for="customer in dataCustomers" :key="customer.uid" :value="customer.uid">
                      {{ customer.businessname }}
                    </option>
                  </select>
                  
                  <select v-else-if="contact.type === 'factory'" v-model="contact.factoryUid"
                    :class="inputClasses('factoryUid')" @change="onFactoryChange(index)">
                    <option value="">Seleccionar fábrica</option>
                    <option v-for="factory in dataFactories" :key="factory.uid" :value="factory.uid">
                      {{ factory.businessName }}
                    </option>
                  </select>
                  <p v-if="errors[`entity${index}`]" class="mt-1 text-sm text-red-600">
                    {{ errors[`entity${index}`] }}
                  </p>
                </div>

                <!-- Campo de entidad (readonly) para FACTORY/CUSTOMER -->
                <div v-if="isFactory || isCustomer" class="flex-1 min-w-[200px]">
                  <input 
                    :value="isFactory ? authStore.user?.factory?.businessName : authStore.user?.customer?.businessname" 
                    type="text" 
                    class="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white cursor-not-allowed"
                    readonly
                  />
                </div>

                <!-- Nombre del contacto -->
                <div class="flex-1 min-w-[200px]">
                  <input v-model="contact.name" type="text" :class="inputClasses('contactName')"
                    placeholder="Nombre del contacto" />
                  <p v-if="errors[`contactName${index}`]" class="mt-1 text-sm text-red-600">
                    {{ errors[`contactName${index}`] }}
                  </p>
                </div>

                <!-- Email o número -->
                <div class="flex-1 min-w-[200px]">
                  <input v-model="contact.value" :type="form.alertType === 'whatsapp' ? 'tel' : 'email'"
                    :class="inputClasses('additionalContact')"
                    :placeholder="form.alertType === 'whatsapp' ? '+51 999 999 999' : 'correo@ejemplo.com'" />
                  <p v-if="errors[`additionalContact${index}`]" class="mt-1 text-sm text-red-600">
                    {{ errors[`additionalContact${index}`] }}
                  </p>
                </div>

                <!-- Botón eliminar -->
                <button type="button" @click="removeAdditionalContact(contact.originalIndex)"
                  :disabled="filteredContacts.length === 1" :class="[
                    'px-3 py-2 rounded-md transition-colors',
                    filteredContacts.length === 1
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
              <select id="retryAttempts" 
                      v-model.number="form.retryAttempts" 
                      :class="inputClasses('retryAttempts')">
                <option :value="0">Sin reenvío</option>
                <option :value="1">1 intento</option>
                <option :value="2">2 intentos</option>
                <option :value="3">3 intentos</option>
              </select>
            </div>
          </div>

          <!-- Estado activo -->
          <div class="flex items-center mt-6">
            <input id="isActive" 
                   v-model="form.isActive" 
                   type="checkbox"
                   class="h-4 w-4 text-accent-primary focus:ring-accent-primary border-gray-300 rounded" />
            <label for="isActive" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Alerta activa
            </label>
          </div>
        </div>

        <!-- Vista Previa -->
        <div v-if="form.alertType && hasAdditionalContacts" 
             class="mb-8 p-4 bg-accent-primary/5 dark:bg-colorDark1/20 border border-accent-primary/20 dark:border-colorDark2/30 rounded-lg">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            Vista Previa de Destinatarios
          </h3>
          <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <p>✅ {{ filteredContacts.filter(c => c.value && (c.customerUid || c.factoryUid)).length }} contacto(s) válido(s)</p>
          </div>
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
              {{ isLoading ? (alertData && alertData.uid ? 'Actualizando...' : 'Creando...') : (alertData && alertData.uid ? 'Actualizar Alerta' : 'Crear Alerta') }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, defineProps, defineEmits, onMounted } from 'vue'
import { allCustomer } from '@/features/customer/services/customerService'
import { listFactory } from '@/features/factory/services/factoryService'
import { useAuthStore } from '@/features/auth/stores/authStore'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  alertData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'save', 'update'])

const authStore = useAuthStore()
const isLoading = ref(false)
const errors = ref({})
const dataCustomers = ref([])
const dataFactories = ref([])
const isLoadingData = ref(false)

// Obtener el rol del usuario actual
const userRole = computed(() => authStore.user?.role)
const isFactory = computed(() => userRole.value === 'FACTORY')
const isCustomer = computed(() => userRole.value === 'CUSTOMER')
const isRoot = computed(() => userRole.value === 'ROOT')
const factoryUid = computed(() => authStore.user?.factory?.uid)
const customerUid = computed(() => authStore.user?.customer?.uid)

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
  additionalContacts: [{ 
    type: '', 
    customerUid: '', 
    factoryUid: '', 
    value: '', 
    name: '' 
  }],
  retryAttempts: 0,
  isActive: true
})

// Computed para filtrar contactos según el rol del usuario
const filteredContacts = computed(() => {
  // Si es ROOT, mostrar todos los contactos
  if (isRoot.value) {
    return form.additionalContacts.map((contact, index) => ({
      ...contact,
      originalIndex: index
    }))
  }

  // Si es FACTORY, solo mostrar contactos que pertenecen a su fábrica
  if (isFactory.value && factoryUid.value) {
    return form.additionalContacts
      .map((contact, index) => ({ ...contact, originalIndex: index }))
      .filter(contact => contact.factoryUid === factoryUid.value)
  }

  // Si es CUSTOMER, solo mostrar contactos que pertenecen a su cliente
  if (isCustomer.value && customerUid.value) {
    return form.additionalContacts
      .map((contact, index) => ({ ...contact, originalIndex: index }))
      .filter(contact => contact.customerUid === customerUid.value)
  }

  // Por defecto, mostrar todos
  return form.additionalContacts.map((contact, index) => ({
    ...contact,
    originalIndex: index
  }))
})

// Inicializar contactos según el rol
const initializeContactsByRole = () => {
  if (isFactory.value && factoryUid.value) {
    form.additionalContacts = [{
      type: 'factory',
      customerUid: '',
      factoryUid: factoryUid.value,
      value: '',
      name: authStore.user?.factory?.businessName || ''
    }]
  } else if (isCustomer.value && customerUid.value) {
    form.additionalContacts = [{
      type: 'customer',
      customerUid: customerUid.value,
      factoryUid: '',
      value: '',
      name: authStore.user?.customer?.businessname || ''
    }]
  } else {
    form.additionalContacts = [{
      type: '',
      customerUid: '',
      factoryUid: '',
      value: '',
      name: ''
    }]
  }
}

// Computed properties
const hasAdditionalContacts = computed(() => {
  return filteredContacts.value.some(contact => 
    contact.value.trim() !== '' && (contact.customerUid || contact.factoryUid)
  )
})

// Función para generar clases CSS dinámicas para inputs
const inputClasses = (fieldName) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md bg-green-50/70 dark:bg-green-900/20 backdrop-blur-sm border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color1 transition-all duration-200'
  const errorClasses = 'border-red-500 focus:ring-red-500'
  const normalClasses = 'border-gray-300 dark:border-slate-600 focus:ring-accent-primary'
  
  return `${baseClasses} ${errors.value[fieldName] ? errorClasses : normalClasses}`
}

// Cargar clientes
const loadCustomers = async () => {
  try {
    isLoadingData.value = true
    const response = await allCustomer()
    if (response) {
      dataCustomers.value = response.data
    }
  } catch (e) {
    console.error('Error al cargar clientes:', e?.response?.data?.message || e.message)
  } finally {
    isLoadingData.value = false
  }
}

// Cargar fábricas
const loadFactories = async () => {
  try {
    isLoadingData.value = true
    const response = await listFactory()
    if (response) {
      dataFactories.value = response.data
    }
  } catch (e) {
    console.error('Error al cargar fábricas:', e)
  } finally {
    isLoadingData.value = false
  }
}

// Cuando cambia el tipo de contacto, limpiar selecciones
const onContactTypeChange = (index) => {
  form.additionalContacts[index].customerUid = ''
  form.additionalContacts[index].factoryUid = ''
  form.additionalContacts[index].name = ''
  form.additionalContacts[index].value = ''
}

// Autocompletar datos cuando selecciona un cliente
const onCustomerChange = (index) => {
  const customer = dataCustomers.value.find(
    c => c.uid === form.additionalContacts[index].customerUid
  )
  if (customer) {
    form.additionalContacts[index].name = customer.name
    if (form.alertType === 'email' && customer.email) {
      form.additionalContacts[index].value = customer.email
    } else if (form.alertType === 'whatsapp' && customer.phone) {
      form.additionalContacts[index].value = customer.phone
    }
  }
}

// Autocompletar datos cuando selecciona una fábrica
const onFactoryChange = (index) => {
  const factory = dataFactories.value.find(
    f => f.uid === form.additionalContacts[index].factoryUid
  )
  if (factory) {
    form.additionalContacts[index].name = factory.name
    if (form.alertType === 'email' && factory.email) {
      form.additionalContacts[index].value = factory.email
    } else if (form.alertType === 'whatsapp' && factory.phone) {
      form.additionalContacts[index].value = factory.phone
    }
  }
}

const addAdditionalContact = () => {
  const newContact = { 
    type: '', 
    customerUid: '', 
    factoryUid: '', 
    value: '', 
    name: '' 
  }
  
  // Si es factory o customer, pre-llenar los datos
  if (isFactory.value && factoryUid.value) {
    newContact.type = 'factory'
    newContact.factoryUid = factoryUid.value
    newContact.name = authStore.user?.factory?.businessName || ''
  } else if (isCustomer.value && customerUid.value) {
    newContact.type = 'customer'
    newContact.customerUid = customerUid.value
    newContact.name = authStore.user?.customer?.businessname || ''
  }
  
  form.additionalContacts.push(newContact)
}

const removeAdditionalContact = (index) => {
  if (form.additionalContacts.length > 1) {
    form.additionalContacts.splice(index, 1)
  }
}

const resetForm = () => {
  form.alertName = ''
  form.alertType = ''
  form.retryAttempts = 0
  form.isActive = true
  errors.value = {}
  initializeContactsByRole()
}

const fillForm = (data) => {
  if (!data || Object.keys(data).length === 0) return

  console.log('Llenando formulario con datos:', data)

  form.alertName = data.name || ''
  form.alertType = data.type ? data.type.toLowerCase() : ''
  form.retryAttempts = data.attempts || 0
  form.isActive = Boolean(data.isActive)

  // Llenar contactos adicionales con la estructura completa
  if (data.contacts && Array.isArray(data.contacts)) {
    form.additionalContacts = data.contacts.map(contact => {
      // Determinar el tipo de contacto basado en si tiene customer o factory
      let type = ''
      let customerUid = ''
      let factoryUid = ''

      if (contact.customer && contact.customer.uid) {
        type = 'customer'
        customerUid = contact.customer.uid
      } else if (contact.factory && contact.factory.uid) {
        type = 'factory'
        factoryUid = contact.factory.uid
      }

      return {
        type: type,
        customerUid: customerUid,
        factoryUid: factoryUid,
        name: contact.name || '',
        value: contact.addressee || ''
      }
    })
  } else {
    // Si no hay contactos, usar inicialización por rol
    initializeContactsByRole()
  }

  // Si no hay contactos adicionales, asegurar inicialización por rol
  if (form.additionalContacts.length === 0) {
    initializeContactsByRole()
  }

  console.log('Formulario después de llenar:', { ...form })
}

const validateForm = () => {
  errors.value = {}

  if (!form.alertName) {
    errors.value.alertName = 'El nombre de la alerta es requerido'
  }

  if (!form.alertType) {
    errors.value.alertType = 'El tipo de alerta es requerido'
  }

  // Solo validar los contactos filtrados que el usuario puede ver
  filteredContacts.value.forEach((contact, index) => {
   // const originalIndex = contact.originalIndex
    
    // Para usuarios sin rol específico, validar que tengan tipo seleccionado
    if (!isFactory.value && !isCustomer.value && !contact.type) {
      errors.value[`contactType${index}`] = 'Debe seleccionar un tipo'
    }

    // Para usuarios sin rol específico, validar que tenga cliente o fábrica seleccionada
    if (!isFactory.value && !isCustomer.value && contact.type && !contact.customerUid && !contact.factoryUid) {
      errors.value[`entity${index}`] = `Debe seleccionar un ${contact.type === 'customer' ? 'cliente' : 'fábrica'}`
    }

    // Validar que tenga nombre
    if (!contact.name || contact.name.trim() === '') {
      errors.value[`contactName${index}`] = 'El nombre es requerido'
    }

    // Validar email o teléfono
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
    } else {
      errors.value[`additionalContact${index}`] = 'Este campo es requerido'
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
        .filter(contact => contact.value.trim() !== '' && (contact.customerUid || contact.factoryUid))
        .map(contact => ({
          name: contact.name,
          addressee: contact.value,
          customerUid: contact.customerUid || undefined,
          factoryUid: contact.factoryUid || undefined
        }))
    }

    // Si estamos editando, incluir el UID y emitir evento update
    if (props.alertData && props.alertData.uid) {
      const updateData = {
        uid: props.alertData.uid,
        data: dataToSend
      }
      
      setTimeout(() => {
        emit('update', updateData)
        isLoading.value = false
      }, 1000)
    } else {
      // Crear nueva alerta
      setTimeout(() => {
        emit('save', dataToSend)
        isLoading.value = false
      }, 1000)
    }
  }
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    console.log('Modal abierto, datos de la alerta:', props.alertData)
    resetForm()
    loadCustomers()
    loadFactories()

    // Llenar el formulario si hay datos para editar
    if (props.alertData && Object.keys(props.alertData).length > 0) {
      // Dar tiempo para que se carguen los datos antes de llenar el formulario
      setTimeout(() => {
        fillForm(props.alertData)
      }, 100)
    }
  } else {
    isLoading.value = false
  }
})


// Watcher para cambios en alertData
watch(() => props.alertData, (newData) => {
  console.log('Datos de la alerta cambiaron:', newData)
  if (newData && Object.keys(newData).length > 0 && props.show) {
    fillForm(newData)
  }
}, {
  deep: true,
  immediate: true
})

watch(() => form.alertType, (newType, oldType) => {

  if (oldType && newType !== oldType && (!props.alertData || Object.keys(props.alertData).length === 0)) {
    form.additionalContacts = [{ 
      type: '', 
      customerUid: '', 
      factoryUid: '', 
      value: '', 
      name: '' 
    }]
  }
})

onMounted(() => {
  loadCustomers()
  loadFactories()
})
</script>