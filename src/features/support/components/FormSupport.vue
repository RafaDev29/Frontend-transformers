<template>
  <div class="bg-gradient-to-br from-petroleum to-color5 overflow-y-auto h-full px-1 " >
    <div class="mx-auto">

      <!-- Header Section -->
      <div class="text-center mb-2">
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

      </div>

      <!-- Support Info Card -->
      <div class="bg-gradient-to-r from-petroleum to-color2 text-white rounded-2xl p-2 mb-2 shadow-lg">
        <h2 class="text-sm font-bold mb-1">¿Necesitas Soporte?</h2>
        <p class="text-color5 text-sm leading-relaxed">
          Si tienes un problema con la aplicación o necesitas ayuda, por favor contáctanos a través de este formulario y
          te responderemos lo antes posible.
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <form @submit.prevent="handleSubmit" class="p-6">

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <!-- Left Column - Personal Info and Message -->
            <div class="space-y-5">
              <!-- Name and Contact Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-colorDark1">
                    Nombre Completo *
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg viewBox="0 0 24 24" class="h-5 w-5">
                        <path :d="$icons.account" fill="currentColor" />
                      </svg>
                    </div>
                    <input v-model="form.name" type="text"
                      class="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white text-sm"
                      placeholder="Tu nombre completo" required>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-colorDark1">
                    Teléfono *
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg viewBox="0 0 24 24" class="h-5 w-5">
                        <path :d="$icons.cellphone" fill="currentColor" />
                      </svg>
                    </div>
                    <input v-model="form.telefono" type="tel"
                      class="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white text-sm"
                      placeholder="+34 696 576 114" required @blur="touched.telefono = true"
                      :class="{ 'border-red-300': touched.telefono && !phoneRegex.test(form.telefono) }">
                  </div>
                  <p v-if="touched.telefono && !phoneRegex.test(form.telefono)" class="text-xs text-red-500">
                    Debe tener 9 dígitos
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-1">
                <label class="block text-sm font-semibold text-colorDark1">
                  Correo Electrónico *
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg viewBox="0 0 24 24" class="h-5 w-5">
                        <path :d="$icons.email" fill="currentColor" />
                      </svg>
                  </div>
                  <input v-model="form.email" type="email"
                    class="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white text-sm"
                    placeholder="tu@email.com" required @blur="touched.email = true"
                    :class="{ 'border-red-300': touched.email && !emailRegex.test(form.email) }">
                </div>
                <p v-if="touched.email && !emailRegex.test(form.email)" class="text-xs text-red-500">
                  Correo inválido
                </p>
              </div>


              <div class="space-y-2">
                <label class="block text-sm font-semibold text-colorDark1">
                  Mensaje *
                </label>
                <div class="relative">
                  <div class="absolute top-3 left-3 pointer-events-none">
                     <svg viewBox="0 0 24 24" class="h-5 w-5">
                        <path :d="$icons.message" fill="currentColor" />
                      </svg>
                  </div>
                  <textarea v-model="form.mensaje" rows="6"
                    class="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-color1 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white resize-none text-sm"
                    placeholder="Describe tu problema o consulta en detalle..." required></textarea>
                </div>
                <p class="text-xs text-neutral-medium">Mínimo 10 caracteres</p>
              </div>
            </div>

            <div class="space-y-5">
              <!-- File Upload Field -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-colorDark1">
                  Adjuntar Archivo
                </label>
                <div
                  class="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-color1 transition-colors duration-200 h-40 flex items-center justify-center">
                  <div v-if="!selectedFile" class="space-y-2">
                    <div
                      class="mx-auto w-10 h-10 bg-gradient-to-r from-color1 to-color2 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" class="h-5 w-5">
                        <path :d="$icons.document" fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <label class="cursor-pointer">
                        <span class="text-color1 hover:text-color2 font-medium text-sm">Haz clic para subir</span>
                        <span class="text-neutral-medium text-sm"> o arrastra y suelta</span>
                        <input ref="fileInput" type="file" @change="handleFileSelect" class="hidden"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt,.zip,.rar">
                      </label>
                    </div>
                    <p class="text-xs text-neutral-medium">
                      PDF, DOC, IMG, TXT, ZIP (Máx. 10MB)
                    </p>
                  </div>

                  <!-- File Selected -->
                  <div v-else class="flex items-center justify-between bg-color5 rounded-lg p-3 w-full">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-8 h-8 bg-gradient-to-r from-color1 to-color2 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                        </svg>
                      </div>
                      <div class="text-left min-w-0">
                        <p class="text-sm font-medium text-colorDark1 truncate">
                          {{ selectedFile.name }}
                        </p>
                        <p class="text-xs text-neutral-medium">
                          {{ formatFileSize(selectedFile.size) }}
                        </p>
                      </div>
                    </div>
                    <button type="button" @click="removeFile"
                      class="text-red-500 hover:text-red-700 transition-colors flex-shrink-0">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Loading/Error Messages -->
              <div v-if="loading || error || successMessage" class="space-y-2">
                <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                  <div class="flex">
                    <svg class="w-4 h-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd" />
                    </svg>
                    {{ error }}
                  </div>
                </div>
                <div v-if="successMessage"
                  class="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
                  <div class="flex">
                    <svg class="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor"
                      viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                    </svg>
                    {{ successMessage }}
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="flex flex-col sm:flex-row gap-4 pt-4">
                <button type="button" @click="$emit('close')"
                  class="flex-1 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 text-slate-700 py-2.5 px-4 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200">
                  Cerrar
                </button>
                <button type="submit" :disabled="loading || !isFormValid"
                  class="w-full bg-gradient-to-r from-color1 to-color2 text-white py-3 px-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                  <div v-if="loading" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-4 w-2 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando...
                  </div>
                  <div v-else class="flex items-center justify-center">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                    </svg>
                    Enviar
                  </div>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- WhatsApp Contact Info -->
      <div class="bg-green-50 border border-green-200 rounded-xl p-4 mt-2">
        <div class="flex flex-col md:flex-row items-center justify-between gap-2">

          <!-- Encabezado -->
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <!-- Icono WhatsApp principal -->
              <svg viewBox="0 0 24 24" class="h-5 w-5">
                <path :d="$icons.whatsapp" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h3 class="text-xs font-semibold text-green-800">Soporte en Línea vía WhatsApp</h3>
              <p class="text-xs text-green-700">Contacta con nosotros a los siguientes números:</p>
            </div>
          </div>

          <!-- Botones con ícono + número -->
          <div class="flex flex-col sm:flex-row gap-1">
            <a href="https://wa.me/34696576114" target="_blank"
              class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition">
              <svg viewBox="0 0 24 24" class="h-5 w-5">
                <path :d="$icons.whatsapp" fill="currentColor" />
              </svg>
              +34 696 576 114
            </a>

            <a href="https://wa.me/34687050685" target="_blank"
              class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition">
              <svg viewBox="0 0 24 24" class="h-5 w-5">
                <path :d="$icons.whatsapp" fill="currentColor" />
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
import eventBus from '@/plugins/eventBus'

// Reactive data
const form = ref({
  name: '',
  email: '',
  telefono: '',
  mensaje: ''
})

const touched = ref({
  email: false,
  telefono: false
})

const selectedFile = ref(null)
const loading = ref(false)
const error = ref('')
const successMessage = ref('')
const fileInput = ref(null)

// Validation regexes
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[0-9]{9}$/

// Computed
const isFormValid = computed(() => {
  return form.value.name.trim() &&
    emailRegex.test(form.value.email.trim()) &&
    phoneRegex.test(form.value.telefono.trim()) &&
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

// Reset form
const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    telefono: '',
    mensaje: ''
  }
  touched.value = {
    email: false,
    telefono: false
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

    // Create HTML template for support request
    const htmlSoporte = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Solicitud de Soporte - SIMTRA</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #0f3d3e; /* petroleum */
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f8fafc; /* slate.50 */
    }
    .email-container {
      border: 1px solid #acdf96; /* color4 */
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 3px 12px rgba(15, 61, 62, 0.1); /* petroleum */
    }
    .header {
      background-color: #0f3d3e; /* petroleum */
      color: white;
      padding: 18px 20px;
      text-align: center;
    }
    .content {
      padding: 30px 25px;
      background-color: #fff;
    }
    .footer {
      background-color: #dcffc2; /* color5 */
      padding: 15px 20px;
      text-align: center;
      font-size: 14px;
      color: #145214; /* colorDark1 */
      border-top: 1px solid #7dbf6b; /* color3 */
    }
    .field-label {
      font-weight: bold;
      color: #1e7f14; /* color1 */
      display: block;
      margin-bottom: 3px;
    }
    .field-value {
      margin-bottom: 15px;
      padding: 8px;
      background-color: #f9f9f9;
      border-radius: 4px;
      border-left: 3px solid #4d9f3f; /* color2 */
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }
    .file-info {
      background-color: #e6f7ff;
      border: 1px solid #91d5ff;
      padding: 10px;
      border-radius: 4px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">
        <span style="color:#1e7f14;">S</span>
        <span style="color:#4d9f3f;">I</span>
        <span style="color:#7dbf6b;">M</span>
        <span style="color:#acdf96;">T</span>
        <span style="color:#dcffc2;">R</span>
        <span style="color:#16a34a;">A</span>
      </div>
      <div>SISTEMA INTELIGENTE DE MONITOREO DE TRANSFORMADORES</div>
    </div>
    <div class="content">
      <h2 style="color: #0f3d3e; text-align: center;">Nueva Solicitud de Soporte</h2>

      <div class="field-label">Nombre:</div>
      <div class="field-value">{{nombre}}</div>

      <div class="field-label">Correo Electrónico:</div>
      <div class="field-value">{{email}}</div>

      <div class="field-label">Teléfono:</div>
      <div class="field-value">{{telefono}}</div>

      <div class="field-label">Mensaje:</div>
      <div class="field-value">{{mensaje}}</div>

      {{archivo_info}}
    </div>
    <div class="footer">
      &copy; 2025 SIMTRA D&amp;A - Todos los derechos reservados
    </div>
  </div>
</body>
</html>
`
      .replace('{{nombre}}', form.value.name)
      .replace('{{email}}', form.value.email)
      .replace('{{telefono}}', form.value.telefono)
      .replace('{{mensaje}}', form.value.mensaje.replace(/\n/g, '<br>'))
      .replace('{{archivo_info}}', selectedFile.value ?
        `<div class="file-info">
          <div class="field-label">Archivo Adjunto:</div>
          <div>📎 ${selectedFile.value.name} (${formatFileSize(selectedFile.value.size)})</div>
        </div>` : '')

    // Append form data
    formData.append('correo', 'soporte.saee@email.dyasolutions.es')
    formData.append('texto', htmlSoporte)
    formData.append('asunto', 'Nueva Solicitud de Soporte')
    formData.append('formatoHtml', 'true')

    // Add file if selected
    if (selectedFile.value) {
      formData.append('archivo', selectedFile.value)
    }

    // Send support request
    const response = await fetch('https://api.saee.dyasolutions.es/api/v1/emails/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNCIsInVzZXJJZCI6MTQsInJvbGUiOiJCVVNJTkVTUyIsInJvbGVJZCI6NSwiaWF0IjoxNzQ0ODUyMDU4LCJleHAiOjE3NDQ5Mzg0NTh9.1yBYoXuaok2JopSDfIPob1lZdZbds5o78DhUgmhriL0'
      }
    })

    if (!response.ok) {
      throw new Error('Error al enviar la solicitud de soporte')
    }

    // Show success message using eventBus if available, otherwise local state
    if (typeof eventBus !== 'undefined') {
      eventBus.emit('success', 'Solicitud de soporte enviada correctamente. Te responderemos lo antes posible.')
    } else {
      successMessage.value = '¡Solicitud enviada correctamente! Te responderemos lo antes posible.'
    }

    // Reset form after successful submission
    setTimeout(() => {
      resetForm()
    }, 3000)

  } catch (err) {
    console.error('Error sending support request:', err)

    // Show error message using eventBus if available, otherwise local state
    if (typeof eventBus !== 'undefined') {
      eventBus.emit('error', 'Hubo un problema al enviar la solicitud de soporte.')
    } else {
      error.value = err.message || 'Error al enviar la solicitud de soporte'
    }
  } finally {
    loading.value = false
  }
}
</script>