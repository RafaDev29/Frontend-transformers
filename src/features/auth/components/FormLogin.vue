<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">

    <div>
      <label for="username" class="block text-sm font-medium text-slate-200 mb-2">
        Usuario
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
            <path :d="$icons.account" />
          </svg>
        </div>
        <input id="username" v-model="form.username" type="text" required
          class="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-color3 focus:ring-2 focus:ring-color3/20 transition-all duration-200 backdrop-blur-sm"
          :class="{
            'border-accent-danger focus:border-accent-danger focus:ring-accent-danger/20': errors.username,
            'border-color2 focus:border-color2': form.username && !errors.username
          }" placeholder="usuario" @blur="validateUsername" @input="errors.username = ''" />
      </div>
      <p v-if="errors.username" class="mt-1 text-sm text-accent-danger">{{ errors.username }}</p>
    </div>



    <div>
      <label for="password" class="block text-sm font-medium text-slate-200 mb-2">
        Contraseña
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
            <path :d="$icons.lock" />
          </svg>
        </div> 
        <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required
          autocomplete="current-password"
          class="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-color3 focus:ring-2 focus:ring-color3/20 transition-all duration-200 backdrop-blur-sm"
          :class="{
            'border-accent-danger focus:border-accent-danger focus:ring-accent-danger/20': errors.password,
            'border-color2 focus:border-color2': form.password && !errors.password && form.password.length >= 6
          }" placeholder="••••••••" @blur="validatePassword" @input="errors.password = ''" />
        <button type="button" @click="showPassword = !showPassword"
          class="absolute inset-y-0 right-0 pr-4 flex items-center  hover:text-color3 transition-colors">
          <svg class="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
            <path v-if="showPassword" :d="$icons.hidden" />
            <path v-else :d="$icons.eye" />
          </svg>
        </button>
      </div>
      <p v-if="errors.password" class="mt-1 text-sm text-accent-danger">{{ errors.password }}</p>
    </div>




    <div>
      <button type="submit" :disabled="loading || !isFormValid"
        class="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-color2 to-color1 hover:from-color3 hover:to-color2 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-color3/20 backdrop-blur-sm">
        <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path> 
        </svg>
        <svg v-else class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path :d="$icons.login" />
        </svg>
        <span>{{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}</span>
      </button>
    </div>


    <div class="mt-4 p-3 bg-accent-primary/10 border border-accent-primary/20 rounded-lg backdrop-blur-sm">
      <div class="flex items-start space-x-2">
        <svg class="w-5 h-5 text-accent-primary mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path :d="$icons.checkCircle" />
        </svg>
        <div class="text-sm">
          <p class="text-slate-200 font-medium">Acceso Seguro</p>
          <p class="text-slate-300 text-xs">Tus datos están protegidos con cifrado de extremo a extremo.</p>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, defineEmits, defineProps } from 'vue'

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['submit'])

// Reactive data
const form = ref({
  username: '', // ahora usamos username
  password: ''
})

const errors = ref({
  username: '',
  password: ''
})

const showPassword = ref(false)

// Computed
const isFormValid = computed(() => {
  return form.value.username &&
    form.value.password &&
    !errors.value.username &&
    !errors.value.password &&
    form.value.password.length >= 6
})

// Methods
const validateUsername = () => {
  if (!form.value.username) {
    errors.value.username = 'El usuario es requerido'
  } else {
    errors.value.username = ''
  }
}

const validatePassword = () => {
  if (!form.value.password) {
    errors.value.password = 'La contraseña es requerida'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'La contraseña debe tener al menos 6 caracteres'
  } else {
    errors.value.password = ''
  }
}

const handleSubmit = () => {
  validateUsername()
  validatePassword()

  if (isFormValid.value) {
    emit('submit', {
      username: form.value.username,
      password: form.value.password
    })
  }
}
</script>
