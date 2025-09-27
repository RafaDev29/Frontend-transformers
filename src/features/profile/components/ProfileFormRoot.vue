<template>
  <div class="bg-gradient-to-br from-slate-50 to-color5 rounded-lg">
    <div class="max-w-md mx-auto p-4">
      <!-- Header with Close Button -->
      <div class="flex items-center justify-between mb-6">
        <div class="text-center flex-1">
          <h1 class="text-2xl font-bold text-colorDark1 mb-1">Mi Perfil</h1>
          <p class="text-neutral-medium text-sm">Actualiza tu información personal</p>
        </div>
        <button @click="$emit('close')"
          class="ml-4 w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 hover:from-red-100 hover:to-red-200 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-md">
          <svg class="w-4 h-4 text-slate-600 hover:text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <form @submit.prevent="handleSubmit" class="p-6 space-y-5">

          <!-- Photo Upload Section -->
          <div class="text-center mb-6">
            <div class="relative inline-block">
              <div
                class="w-20 h-20 rounded-full bg-gradient-to-r from-color1 to-color2 flex items-center justify-center shadow-lg overflow-hidden">
                <img v-if="photoPreview" :src="photoPreview" alt="Preview" class="w-full h-full object-cover">
                <svg v-else class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              <!-- Upload Button -->
              <label
                class="absolute -bottom-1 -right-1 w-7 h-7 bg-accent-primary hover:bg-color1 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                </svg>
                <input ref="fileInput" type="file" accept="image/*" @change="handleFileSelect" class="hidden">
              </label>
            </div>
            <p class="text-xs text-neutral-medium mt-2">Haz clic para cambiar tu foto</p>
          </div>

          <!-- Usuario Field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-colorDark1">
              Usuario
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-neutral-medium" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <input v-model="form.usuario" type="text"
                class="block w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white text-sm"
                placeholder="Ingresa tu usuario" required>
            </div>
          </div>

          <!-- Contraseña Field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-colorDark1">
              Contraseña
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-neutral-medium" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z M15.1,8H8.9V6c0-1.71,1.39-3.1,3.1-3.1c1.71,0,3.1,1.39,3.1,3.1V8z" />
                </svg>
              </div>
              <input v-model="form.password" :type="showPassword ? 'text' : 'password'"
                class="block w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white text-sm"
                placeholder="Ingresa tu contraseña" required>
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-medium hover:text-colorDark1 transition-colors">
                <svg v-if="showPassword" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                </svg>
                <svg v-else class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.09L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.76,7.13 11.37,7 12,7Z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Loading/Error Messages -->
          <div v-if="loading || error || successMessage" class="space-y-2">
            <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {{ error }}
            </div>
            <div v-if="successMessage"
              class="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
              {{ successMessage }}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 pt-2">
            <button type="button" @click="$emit('close')"
              class="flex-1 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 text-slate-700 py-2.5 px-4 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200">
              Cancelar
            </button>

            <button type="submit" :disabled="loading"
              class="flex-1 bg-gradient-to-r from-color1 to-color2 text-white py-2.5 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
              <div v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Actualizando...
              </div>
              <span v-else>Actualizar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { uploadLogo } from '../services/profileService'


const emit = defineEmits(['close', 'success'])

const authStore = useAuthStore()

const form = ref({
  usuario: '',
  password: ''
})

const selectedFile = ref(null)
const photoPreview = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const successMessage = ref('')
const fileInput = ref(null)

// Initialize form with user data
onMounted(() => {
  if (authStore.user) {
    form.value.usuario = authStore.user.usuario || authStore.user.username || ''
    // No cargar la contraseña por seguridad
  }
})

// Handle file selection
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      error.value = 'Por favor selecciona un archivo de imagen válido'
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      error.value = 'La imagen debe ser menor a 5MB'
      return
    }

    selectedFile.value = file

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)

    error.value = ''
  }
}

// Update user profile
const updateUserProfile = async (userData) => {
  // Aquí implementa la llamada a tu API para actualizar usuario y contraseña
  // Ejemplo:
  const response = await fetch('/api/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authStore.token}`
    },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
    throw new Error('Error al actualizar el perfil')
  }

  return response.json()
}

// Upload user photo
const uploadUserPhoto = async (formData) => {

  try {
    const response = await uploadLogo(formData, authStore.user.uid)
    if (response) {
      console.log("se cargo correctamente")
    }

  } catch {
    console.error("error al cargar el logo")
  }
}

// Handle form submission
const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  successMessage.value = ''

  try {
    // Update user data (usuario y contraseña)
    await updateUserProfile({
      usuario: form.value.usuario,
      password: form.value.password
    })

    if (selectedFile.value && authStore.user?.uid) {
      const formData = new FormData()
      formData.append('file', selectedFile.value)

      await uploadUserPhoto(formData)
    }

    successMessage.value = 'Perfil actualizado correctamente'

    // Clear password field for security
    form.value.password = ''

    // Emit success event with message
    emit('success', 'Perfil actualizado correctamente')



  } catch (err) {
    console.error('Error updating profile:', err)
    error.value = err.message || 'Error al actualizar el perfil'
  } finally {
    loading.value = false
  }
}
</script>