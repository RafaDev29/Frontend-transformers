<template>
  <!-- Overlay -->
  <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-[2000]">
    <!-- Form Card -->
    <div class="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-md w-full mx-4">
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
              <svg class="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                <path :d="$icons.account" />
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
              <svg class="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                <path :d="$icons.lock" />
              </svg>
            </div>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'"
              class="block w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white text-sm"
              placeholder="Ingresa tu contraseña" required>
            <button type="button" @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-medium hover:text-colorDark1 transition-colors">
              <svg class="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                <path v-if="showPassword" :d="$icons.hidden" />
                <path v-else :d="$icons.eye" />
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
            Cerrar
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
</template>


<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { uploadLogo, updateUser } from '../services/profileService'

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

onMounted(() => {
  if (authStore.user) {
    form.value.usuario = authStore.user.usuario || authStore.user.username || ''
    if (authStore.user.images && authStore.user.images.length > 0) {
      photoPreview.value = authStore.user.images[0].url
    }
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

const updateUserProfile = async (userData) => {
  try {
    const response = await updateUser(userData, authStore.user.uid)
    if (response) {
      console.log("usuario actualizado")
    }
  } catch (error) {
    console.error("error al actualizar", error)
    throw error
  }
}

const uploadUserPhoto = async (formData) => {
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
    if (form.value.password.trim()) {
      await updateUserProfile({
        usuario: form.value.usuario,
        password: form.value.password
      })
    }

    if (selectedFile.value && authStore.user?.uid) {
      const formData = new FormData()
      formData.append('file', selectedFile.value)

      const response = await uploadUserPhoto(formData)

      if (response) {
        const newImageUrl = response.data.url

        const newImage = {
          uid: response.data.uid,
          url: newImageUrl,
          key: response.data.key
        }

        const updatedUser = {
          ...authStore.user,
          images: [newImage]
        }

        authStore.updateUser(updatedUser)

        photoPreview.value = newImageUrl
      }
    }

    successMessage.value = 'Perfil actualizado correctamente'
    form.value.password = ''
    emit('success', 'Perfil actualizado correctamente')

  } catch (err) {
    console.error('Error updating profile:', err)
    error.value = err.message || 'Error al actualizar el perfil'
  } finally {
    loading.value = false
  }
}
</script>