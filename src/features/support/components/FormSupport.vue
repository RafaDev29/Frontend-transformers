<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-color5 py-8 px-4">
    <div class="max-w-3xl mx-auto">
      
      <!-- Header Section -->
      <div class="text-center mb-8">
        <!-- SIMTRA Logo -->
        <div class="z-10 text-center">
          <h1 class="text-3xl mt-1 font-extrabold tracking-wider">
            <span class="text-color1 dark:text-colorDark1">S</span>
            <span class="text-color2 dark:text-colorDark2">I</span>
            <span class="text-color3 dark:text-colorDark3">M</span>
            <span class="text-color4 dark:text-colorDark4">T</span>
            <span class="text-color5 dark:text-color1">R</span>
            <span class="text-accent-primary dark:text-accent-success">A</span>
          </h1>
        </div>
        <div class="text-center m-2 text-sm md:text-base whitespace-normal break-words leading-snug text-neutral-medium">
          SISTEMA INTELIGENTE DE MONITOREO DE TRANSFORMADORES EN TIEMPO REAL
        </div>
      </div>

      <!-- Support Info Card -->
      <div class="bg-gradient-to-r from-color1 to-color2 text-white rounded-2xl p-6 mb-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-3">¿Necesitas Soporte?</h2>
        <p class="text-color5 leading-relaxed">
          Si tienes un problema con la aplicación o necesitas ayuda, por favor contáctanos a través de este formulario y te responderemos lo antes posible.
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
          
          <!-- Name Field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-colorDark1">
              Nombre Completo *
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-neutral-medium" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <input
                v-model="form.name"
                type="text"
                class="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                placeholder="Ingresa tu nombre completo"
                required
              >
            </div>
          </div>

          <!-- Email and Phone Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-colorDark1">
                Correo Electrónico *
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-neutral-medium" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                  </svg>
                </div>
                <input
                  v-model="form.email"
                  type="email"
                  class="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                  placeholder="tu@email.com"
                  required
                >
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-colorDark1">
                Teléfono de Contacto *
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-neutral-medium" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                </div>
                <input
                  v-model="form.telefono"
                  type="tel"
                  class="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                  placeholder="+34 696 576 114"
                  required
                >
              </div>
            </div>
          </div>

          <!-- Message Field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-colorDark1">
              Mensaje *
            </label>
            <div class="relative">
              <div class="absolute top-3 left-3 pointer-events-none">
                <svg class="h-5 w-5 text-neutral-medium" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z"/>
                </svg>
              </div>
              <textarea
                v-model="form.mensaje"
                rows="5"
                class="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white resize-none"
                placeholder="Describe tu problema o consulta en detalle..."
                required
              ></textarea>
            </div>
            <p class="text-xs text-neutral-medium">Mínimo 10 caracteres</p>
          </div>

          <!-- File Upload Field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-colorDark1">
              Adjuntar Archivo
            </label>
            <div class="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-color1 transition-colors duration-200">
              <div v-if="!selectedFile" class="space-y-3">
                <div class="mx-auto w-12 h-12 bg-gradient-to-r from-color1 to-color2 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                </div>
                <div>
                  <label class="cursor-pointer">
                    <span class="text-color1 hover:text-color2 font-medium">Haz clic para subir un archivo</span>
                    <span class="text-neutral-medium"> o arrastra y suelta</span>
                    <input
                      ref="fileInput"
                      type="file"
                      @change="handleFileSelect"
                      class="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt,.zip,.rar"
                    >
                  </label>
                </div>
                <p class="text-xs text-neutral-medium">
                  PDF, DOC, IMG, TXT, ZIP (Máx. 10MB)
                </p>
              </div>
              
              <!-- File Selected -->
              <div v-else class="flex items-center justify-between bg-color5 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gradient-to-r from-color1 to-color2 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                  </div>
                  <div class="text-left">
                    <p class="text-sm font-medium text-colorDark1 truncate max-w-xs">
                      {{ selectedFile.name }}
                    </p>
                    <p class="text-xs text-neutral-medium">
                      {{ formatFileSize(selectedFile.size) }}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  @click="removeFile"
                  class="text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Loading/Error Messages -->
          <div v-if="loading || error || successMessage" class="space-y-2">
            <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              <div class="flex">
                <svg class="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                {{ error }}
              </div>
            </div>
            <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-700">
              <div class="flex">
                <svg class="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                {{ successMessage }}
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="loading || !isFormValid"
              class="w-full bg-gradient-to-r from-color1 to-color2 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Enviando...
              </div>
              <div v-else class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                </svg>
                Enviar Solicitud de Soporte
              </div>
            </button>
          </div>
        </form>
      </div>

      <!-- WhatsApp Contact Info -->
      <div class="bg-green-50 border border-green-200 rounded-2xl p-6 mt-8">
        <div class="text-center">
          <div class="flex justify-center mb-3">
            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-green-800 mb-2">Soporte en Línea via WhatsApp</h3>
          <p class="text-green-700 mb-4">
            Si necesitas soporte inmediato, contactar por WhatsApp a los siguientes números:
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="https://wa.me/34696576114" 
              target="_blank"
              class="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
              +34 696 576 114
            </a>
            <a 
              href="https://wa.me/34687050685" 
              target="_blank"
              class="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
              +34 687 050 685
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth' // Ajusta la ruta según tu estructura

const authStore = useAuthStore()

// Reactive data
const form = ref({
  name: '',
  email: '',
  telefono: '',
  mensaje: ''
})

const selectedFile = ref(null)
const loading = ref(false)
const error = ref('')
const successMessage = ref('')
const fileInput = ref(null)

// Computed
const isFormValid = computed(() => {
  return form.value.name.trim() &&
         form.value.email.trim() &&
         form.value.telefono.trim() &&
         form.value.mensaje.trim().length >= 10
})

// Handle file selection
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      error.value = 'El archivo debe ser menor a 10MB'
      return
    }
    
    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'text/plain',
      'application/zip',
      'application/x-rar-compressed'
    ]
    
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|jpg|jpeg|png|gif|txt|zip|rar)$/i)) {
      error.value = 'Tipo de archivo no permitido. Solo se permiten: PDF, DOC, DOCX, JPG, PNG, GIF, TXT, ZIP, RAR'
      return
    }
    
    selectedFile.value = file
    error.value = ''
  }
}

// Remove selected file
const removeFile = () => {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Send support request
const sendSupportRequest = async (formData) => {
  // Aquí implementa la llamada a tu API para enviar la solicitud de soporte
  // Ejemplo:
  const response = await fetch('/api/support/request', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    },
    body: formData
  })
  
  if (!response.ok) {
    throw new Error('Error al enviar la solicitud de soporte')
  }
  
  return response.json()
}

// Reset form
const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    telefono: '',
    mensaje: ''
  }
  selectedFile.value = null
  error.value = ''
  successMessage.value = ''
  
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (!isFormValid.value) {
    error.value = 'Por favor completa todos los campos requeridos'
    return
  }

  if (form.value.mensaje.trim().length < 10) {
    error.value = 'El mensaje debe tener al menos 10 caracteres'
    return
  }

  loading.value = true
  error.value = ''
  successMessage.value = ''
  
  try {
    // Prepare FormData
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('email', form.value.email)
    formData.append('telefono', form.value.telefono)
    formData.append('mensaje', form.value.mensaje)
    
    // Add file if selected
    if (selectedFile.value) {
      formData.append('archivo', selectedFile.value)
    }
    
    // Send support request
    await sendSupportRequest(formData)
    
    successMessage.value = '¡Solicitud enviada correctamente! Te responderemos lo antes posible.'
    
    // Reset form after successful submission
    setTimeout(() => {
      resetForm()
    }, 3000)
    
  } catch (err) {
    console.error('Error sending support request:', err)
    error.value = err.message || 'Error al enviar la solicitud de soporte'
  } finally {
    loading.value = false
  }
}
</script>