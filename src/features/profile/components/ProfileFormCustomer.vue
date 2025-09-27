<template>
  <div class="h-auto  bg-gradient-to-br from-slate-50 to-color5 py-2 px-2">
    <div class=" max-w-5xl mx-auto p-2 overflow-hidden">


      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 h-[650px] overflow-hidden">
        <form @submit.prevent="handleSubmit" class="p-8 overflow-y-auto h-full">

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <!-- Left Column - Photo Upload -->
            <div class="lg:col-span-1">
              <div class="sticky top-8">
                <h3 class="text-lg font-semibold text-colorDark1 mb-4">Logo del Cliente</h3>

                <div class="text-center">
                  <div class="relative inline-block">
                    <div
                      class="w-32 h-32 rounded-2xl bg-gradient-to-r from-color1 to-color2 flex items-center justify-center shadow-lg overflow-hidden">
                      <img v-if="photoPreview" :src="photoPreview" alt="Logo Preview"
                        class="w-full h-full object-cover">
                      <svg v-else class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                      </svg>
                    </div>

                    <!-- Upload Button -->
                    <label
                      class="absolute -bottom-3 -right-3 w-10 h-10 bg-accent-primary hover:bg-color1 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                      </svg>
                      <input ref="fileInput" type="file" accept="image/*" @change="handleFileSelect" class="hidden">
                    </label>
                  </div>
                  <p class="text-sm text-neutral-medium mt-3">Haz clic para subir el logo</p>
                  <p class="text-xs text-neutral-medium mt-1">Máximo 5MB</p>
                </div>
              </div>
            </div>

            <!-- Right Column - Form Fields -->
            <div class="lg:col-span-2 space-y-6">

              <!-- Business Name -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-colorDark1">
                  Nombre de la Empresa *
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-neutral-medium" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12,7V3H2V21H22V7H12M6,19H4V17H6V19M6,15H4V13H6V15M6,11H4V9H6V11M6,7H4V5H6V7M10,19H8V17H10V19M10,15H8V13H10V15M10,11H8V9H10V11M10,7H8V5H10V7M20,19H12V17H20V19M20,15H12V13H20V15M20,11H12V9H20V11Z" />
                    </svg>
                  </div>
                  <input v-model="form.businessname" type="text"
                    class="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                    placeholder="Ej: Minera Antamina S.A." required>
                </div>
              </div>

              <!-- RUC and Username Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-colorDark1">
                    RUC *
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-neutral-medium" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                    <input v-model="form.ruc" type="text" maxlength="11" pattern="[0-9]{11}"
                      class="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                      placeholder="20123456710" required>
                  </div>
                  <p class="text-xs text-neutral-medium">11 dígitos numéricos</p>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-colorDark1">
                    Usuario *
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-neutral-medium" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <input v-model="form.username" type="text"
                      class="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                      placeholder="antamina" required>
                  </div>
                </div>
              </div>

              <!-- Password -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-colorDark1">
                  Contraseña
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-neutral-medium" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z M15.1,8H8.9V6c0-1.71,1.39-3.1,3.1-3.1c1.71,0,3.1,1.39,3.1,3.1V8z" />
                    </svg>
                  </div>
                  <input v-model="form.password" :type="showPassword ? 'text' : 'password'"
                    class="block w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                    placeholder="Dejar en blanco para no cambiar">
                  <button type="button" @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-medium hover:text-colorDark1 transition-colors">
                    <svg v-if="showPassword" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                      </svg>
                      <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.09L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.76,7.13 11.37,7 12,7Z" />
                      </svg>
                    </button>
                </div>
                <p class="text-xs text-neutral-medium">Deja en blanco si no deseas cambiar la contraseña</p>
              </div>

              <!-- Address Section -->
              <div class="border-t border-slate-200 pt-6">
                <h3 class="text-lg font-semibold text-colorDark1 mb-4">Información de Ubicación</h3>

                <!-- Address -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-colorDark1 mb-2">
                    Dirección *
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-neutral-medium" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                      </svg>
                    </div>
                    <input v-model="form.address" type="text"
                      class="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                      placeholder="Av. Principal 123, Lima" required>
                  </div>
                </div>

                <!-- District -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-colorDark1 mb-2">
                    Distrito *
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-neutral-medium" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V7H9V9H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V9H21Z" />
                      </svg>
                    </div>
                    <input v-model="form.distric" type="text"
                      class="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                      placeholder="San Isidro" required>
                  </div>
                </div>
              </div>

              <!-- Loading/Error Messages -->
              <div v-if="loading || error || successMessage" class="space-y-2">
                <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  <div class="flex">
                    <svg class="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd" />
                    </svg>
                    {{ error }}
                  </div>
                </div>
                <div v-if="successMessage"
                  class="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-700">
                  <div class="flex">
                    <svg class="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                    </svg>
                    {{ successMessage }}
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 pt-4">
                <button type="button" @click="$emit('close')"
                  class="flex-1 pr-2 mr-2 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 text-slate-700 py-2.5 px-4 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200">
                  Cerrar
                </button>
                <button type="submit" :disabled="loading"
                  class="flex-1 bg-gradient-to-r from-color1 to-color2 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                  <div v-if="loading" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Actualizando...
                  </div>
                  <span v-else>Actualizar</span>
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { updateCustomer } from '@/features/customer/services/customerService'
import { uploadLogo } from '../services/profileService'
const authStore = useAuthStore()

// Reactive data
const form = ref({
  businessname: '',
  ruc: '',
  address: '',
  distric: '',
  username: '',
  password: ''
})

const selectedFile = ref(null)
const photoPreview = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const successMessage = ref('')
const fileInput = ref(null)

onMounted(() => {
  if (authStore.user) {
    // Precargar datos del usuario
    form.value.username = authStore.user.username || ''
    
    // Precargar datos del cliente desde el store
    if (authStore.user.customer) {
      form.value.businessname = authStore.user.customer.businessname || ''
      form.value.ruc = authStore.user.customer.ruc || ''
      form.value.address = authStore.user.customer.address || ''
      form.value.distric = authStore.user.customer.distric || ''
    }
    
    // Precargar foto si existe
    if (authStore.user.images && authStore.user.images.length > 0) {
      photoPreview.value = authStore.user.images[0].url
    }
  }
})

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {

    if (!file.type.startsWith('image/')) {
      error.value = 'Por favor selecciona un archivo de imagen válido'
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      error.value = 'La imagen debe ser menor a 5MB'
      return
    }

    selectedFile.value = file

    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)

    error.value = ''
  }
}

const updateClientProfile = async (clientData, clientUid) => {
  try {
    const response = await updateCustomer(clientData, clientUid)
    
    if (response && response.status) {
      return response.data // Ya es un objeto JavaScript, no necesita .json()
    } else {
      throw new Error(response?.message || 'Error al actualizar el perfil del cliente')
    }
  } catch (error) {
    console.error("Error al actualizar el cliente:", error)
    throw error
  }
}

const uploadClientLogo = async (formData) => {
  try {
    const response = await uploadLogo(formData, authStore.user.uid)
    if (response) {
      console.log("se cargo correctamente")
      return response
    }
  } catch (error) {
    console.error("error al cargar el logo", error)
    throw error
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  successMessage.value = ''

  try {
    // Preparar payload - solo incluir contraseña si no está vacía
    const clientData = {
      username: form.value.username,
      businessname: form.value.businessname,
      ruc: form.value.ruc,
      address: form.value.address,
      distric: form.value.distric
    }

    // Solo agregar contraseña si no está vacía
    if (form.value.password && form.value.password.trim()) {
      clientData.password = form.value.password
    }

    const clientUid = authStore.user?.customer?.uid
    const uid = authStore.user?.uid

    if (!uid) {
      throw new Error('No se encontró el UID del usuario')
    }

    // Actualizar perfil del cliente
    const updatedClientData = await updateClientProfile(clientData, clientUid)
    
    // Actualizar el store con los nuevos datos usando la respuesta del servidor
    if (updatedClientData && updatedClientData.user) {
      // Usar los datos completos del usuario que vienen del servidor
      authStore.updateUser(updatedClientData.user)
    }

    // Subir logo si se seleccionó uno nuevo
    if (selectedFile.value) {
      const formData = new FormData()
      formData.append('file', selectedFile.value)

      const logoResponse = await uploadClientLogo(formData)
      
      // Actualizar el store con la nueva imagen
      if (logoResponse && logoResponse.data) {
        const newImageUrl = logoResponse.data.url
        
        const newImage = {
          uid: logoResponse.data.uid,
          url: newImageUrl,
          key: logoResponse.data.key
        }
        
        const updatedUser = {
          ...authStore.user,
          images: [newImage] // Reemplazar con la nueva imagen
        }
        
        authStore.updateUser(updatedUser)
        photoPreview.value = newImageUrl
      }
    }

    successMessage.value = 'Perfil de cliente actualizado correctamente'
    form.value.password = '' // Limpiar contraseña después del éxito

  } catch (err) {
    console.error('Error updating client profile:', err)
    error.value = err.message || 'Error al actualizar el perfil del cliente'
  } finally {
    loading.value = false
  }
}
</script>