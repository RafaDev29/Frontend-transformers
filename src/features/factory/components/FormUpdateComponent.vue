<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]" @click.self="$emit('close')">
    <div class="mt-10 bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Actualizar Fábrica
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Usuario -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Usuario *
            </label>
            <input id="username" v-model="form.username" type="text" 
              class="w-full px-3 py-2 border rounded-md bg-green-50/70 dark:bg-green-900/20 backdrop-blur-sm border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color1 transition-all duration-200" />
          </div>

          <!-- Contraseña -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contraseña *
            </label>
            <div class="relative">
              <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"  
                :class="[
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm',
                  errors.password ? 'border-red-500 focus:ring-red-500 bg-red-50/70 dark:bg-red-900/20' : 'border-gray-300 dark:border-slate-600 focus:ring-color1 bg-green-50/70 dark:bg-green-900/20',
                  'text-gray-900 dark:text-white'
                ]" placeholder="" />

              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-color3 transition-colors">
                <svg class="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                  <path v-if="showPassword" :d="$icons.hidden" />
                  <path v-else :d="$icons.eye" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <!-- RUC -->
          <div>
            <label for="ruc" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              RUC *
            </label>
            <input id="ruc" v-model="form.ruc" type="text" 
              class="w-full px-3 py-2 border rounded-md bg-green-50/70 dark:bg-green-900/20 backdrop-blur-sm border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color1 transition-all duration-200" />
          </div>

          <!-- Razón Social -->
          <div>
            <label for="businessName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Razón Social *
            </label>
            <input id="businessName" v-model="form.businessName" type="text"
              class="w-full px-3 py-2 border rounded-md bg-green-50/70 dark:bg-green-900/20 backdrop-blur-sm border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color1 transition-all duration-200" />
          </div>

          <!-- Dirección -->
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dirección *
            </label>
            <input id="address" v-model="form.address" type="text" 
              class="w-full px-3 py-2 border rounded-md bg-green-50/70 dark:bg-green-900/20 backdrop-blur-sm border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color1 transition-all duration-200" />
          </div>

          <!-- Distrito -->
          <div>
            <label for="distric" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Distrito *
            </label>
            <input id="distric" v-model="form.distric" type="text" 
              class="w-full px-3 py-2 border rounded-md bg-green-50/70 dark:bg-green-900/20 backdrop-blur-sm border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color1 transition-all duration-200" />
          </div>

          <!-- Checkbox Activo -->
          <div class="flex items-center mb-6">
            <input id="isActive" v-model="form.isActive" type="checkbox"
              class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded bg-green-50/70 dark:bg-green-900/20 backdrop-blur-sm" />
            <label for="isActive" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Activo
            </label>
          </div>

        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-slate-600">
          <button type="button" @click="$emit('close')"
            class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600 transition-all duration-200">
            Cancelar
          </button>
          <button type="submit"
            class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 rounded-md transition-all duration-200">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  factory: { type: Object, default: null }
})

const emit = defineEmits(['close', 'save'])
const errors = reactive({})

const isLoading = ref(false)
const form = reactive({
  username: '',
  password: '',
  ruc: '',
  businessName: '',
  address: '',
  distric: '',
  isActive: true
})
const showPassword = ref(false)
watch(() => props.factory, (newVal) => {
  if (newVal) {
    form.username = newVal.username || ''
    form.password = ''
    form.ruc = newVal.ruc || ''
    form.businessName = newVal.businessName || ''
    form.address = newVal.address || ''
    form.distric = newVal.distric || ''
    form.isActive = newVal.isActive === 'Activo' || newVal.isActive === true
  }
}, { immediate: true })

const handleSubmit = () => {
  isLoading.value = true

  const payload = {
    uid: props.factory?.uid,
    username: form.username,
    ruc: form.ruc,
    businessName: form.businessName,
    address: form.address,
    distric: form.distric,
    isActive: form.isActive
  }


  if (form.password && form.password.trim() !== '') {
    payload.password = form.password
  }

  emit('save', payload)
  isLoading.value = false
}
</script>
