
<template>
  <v-dialog v-model="dialog" max-width="500" @click:outside="resetForm">
    <v-card color="white">
      <v-card-title class="text-center text-white bg-[#4465A6]">
        <div class="z-10 text-center">
          <h1 class="text-3xl mt-1 font-extrabold tracking-wider">
            <span class="text-[#66A3F2]">S</span>
            <span class="text-[#66A3F2]">A</span>
            <span class="text-[#C4D8F2]">E</span>
            <span class="text-[#F2F2F2]">E</span>
          </h1>
        </div>
        <div class="text-subtitle-2">SISTEMA DE ADMINISTRACIÓN EFICIENTE DE ENERGÍA</div>
      </v-card-title>

      <v-card-text class="pt-2">
        <h2 class="text-h5 text-center text-indigo-darken-1 mb-2">¿Necesitas Cotizar?</h2>
        <p class="text-center text-xs mb-1">
          Si estás interesado en conocer la potencialidad de nuestra aplicación
          y saber más de nuestros planes, por favor déjanos tus datos
          y te contactaremos lo antes posible.
        </p>

        <v-form @submit.prevent="submitForm">
          <v-text-field 
            v-model="formData.nombre" 
            label="Nombre*" 
            variant="outlined" 
            density="compact">
          </v-text-field>

          <div class="d-flex gap-1">
            <v-text-field 
              v-model="formData.email" 
              label="Email*" 
              variant="outlined" 
              density="compact" 
              style="flex: 1"
              class="mb-1" 
              @blur="touched.email = true" 
              :error="touched.email && !emailRegex.test(formData.email)"
              :error-messages="touched.email && !emailRegex.test(formData.email) ? 'Correo inválido' : ''" />

            <v-text-field 
              v-model="formData.telefono" 
              label="Teléfono de contacto*" 
              variant="outlined"
              density="compact" 
              style="flex: 1" 
              @blur="touched.telefono = true"
              :error="touched.telefono && !phoneRegex.test(formData.telefono)"
              :error-messages="touched.telefono && !phoneRegex.test(formData.telefono) ? 'Debe tener 9 dígitos' : ''" />
          </div>

          <v-textarea 
            v-model="formData.mensaje" 
            label="Mensaje*" 
            variant="outlined" 
            density="compact" 
            rows="4"
            class="">
          </v-textarea>

          <div class="text-center">
            <button 
              type="submit" 
              :disabled="!isFormValid" 
              :class="[
                'px-5 py-2 text-sm md:text-base font-bold rounded-lg shadow-lg transform transition-all duration-500',
                isFormValid
                  ? 'bg-[#4465A6] text-white hover:bg-[#66A3F2]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]">
              ENVIAR
            </button>
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="resetForm">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import eventBus from '@/plugins/eventBus'

// Props y emits
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

// Reactive data
const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const touched = ref({
  email: false,
  telefono: false
})

const formData = ref({
  nombre: '',
  email: '',
  telefono: '',
  mensaje: ''
})

// Validation regexes
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[0-9]{9}$/

// Computed properties
const isFormValid = computed(() => {
  return (
    formData.value.nombre.trim() &&
    emailRegex.test(formData.value.email.trim()) &&
    phoneRegex.test(formData.value.telefono.trim()) &&
    formData.value.mensaje.trim()
  )
})

// Methods
const resetForm = () => {
  formData.value = {
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  }
  touched.value = {
    email: false,
    telefono: false
  }
  emit('update:modelValue', false)
}

const submitForm = async () => {
  eventBus.emit('loading', true)

  const form = new FormData()

  const htmlCotizacion = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Solicitud de Cotización - SAEE</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #F2F2F2;
    }
    .email-container {
      border: 1px solid #C4D8F2;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 3px 12px rgba(38, 49, 115, 0.1);
    }
    .header {
      background-color: #263173;
      color: white;
      padding: 18px 20px;
      text-align: center;
    }
    .content {
      padding: 30px 25px;
      background-color: #fff;
    }
    .footer {
      background-color: #C4D8F2;
      padding: 15px 20px;
      text-align: center;
      font-size: 14px;
      color: #263173;
      border-top: 1px solid #66A3F2;
    }
    .field-label {
      font-weight: bold;
      color: #4465A6;
      display: block;
      margin-bottom: 3px;
    }
    .field-value {
      margin-bottom: 15px;
      padding: 8px;
      background-color: #f9f9f9;
      border-radius: 4px;
      border-left: 3px solid #66A3F2;
    }
    .logo {
      font-size: 22px;
      font-weight: bold;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">
        <span style="color:#66A3F2;">S</span>
        <span style="color:#66A3F2;">A</span>
        <span style="color:#C4D8F2;">E</span>
        <span style="color:#F2F2F2;">E</span>
      </div>
      <div>SISTEMA DE ADMINISTRACIÓN EFICIENTE DE ENERGÍA</div>
    </div>
    <div class="content">
      <h2 style="color: #263173; text-align: center;">Nueva Solicitud de Cotización</h2>

      <div class="field-label">Nombre:</div>
      <div class="field-value">{{nombre}}</div>

      <div class="field-label">Correo Electrónico:</div>
      <div class="field-value">{{email}}</div>

      <div class="field-label">Teléfono:</div>
      <div class="field-value">{{telefono}}</div>

      <div class="field-label">Mensaje:</div>
      <div class="field-value">{{mensaje}}</div>
    </div>
    <div class="footer">
      &copy; 2025 SAEE D&amp;A - Todos los derechos reservados
    </div>
  </div>
</body>
</html>
`
    .replace('{{nombre}}', formData.value.nombre)
    .replace('{{email}}', formData.value.email)
    .replace('{{telefono}}', formData.value.telefono)
    .replace('{{mensaje}}', formData.value.mensaje.replace(/\n/g, '<br>'))

  form.append('correo', 'contacto@email.dyasolutions.es')
  form.append('texto', htmlCotizacion)
  form.append('asunto', ' Nueva Solicitud de Cotización')
  form.append('formatoHtml', 'true')

  try {
    const response = await fetch('https://api.saee.dyasolutions.es/api/v1/emails/upload', {
      method: 'POST',
      body: form,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNCIsInVzZXJJZCI6MTQsInJvbGUiOiJCVVNJTkVTUyIsInJvbGVJZCI6NSwiaWF0IjoxNzQ0ODUyMDU4LCJleHAiOjE3NDQ5Mzg0NTh9.1yBYoXuaok2JopSDfIPob1lZdZbds5o78DhUgmhriL0'
      }
    })

    if (!response.ok) {
      eventBus.emit('loading', false)
      eventBus.emit('error', 'Hubo un problema al enviar el formulario.')
      return
    }

    eventBus.emit('loading', false)
    eventBus.emit('success', 'Formulario enviado correctamente')
    resetForm()

  } catch (err) {
    eventBus.emit('loading', false)
    eventBus.emit('error', 'Hubo un problema al enviar el formulario.')
    console.error(err)
  }
}
</script>