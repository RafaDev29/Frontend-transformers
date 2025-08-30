<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]">
    <div
      class="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
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

          <!-- Código -->
          <div>
            <label for="code" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Código *
            </label>
            <input id="code" v-model="form.code" type="text" class="w-full px-3 py-2 border rounded-md" />
          </div>

          <!-- Usuario -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Usuario *
            </label>
            <input id="username" v-model="form.username" type="text" class="w-full px-3 py-2 border rounded-md" />
          </div>

          <!-- Contraseña -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contraseña 
            </label>
            <input id="password" v-model="form.password" type="text" class="w-full px-3 py-2 border rounded-md" />
          </div>

          <!-- RUC -->
          <div>
            <label for="ruc" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              RUC *
            </label>
            <input id="ruc" v-model="form.ruc" type="text" class="w-full px-3 py-2 border rounded-md" />
          </div>

          <!-- Razón social -->
          <div>
            <label for="businessName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Razón social *
            </label>
            <input id="businessName" v-model="form.businessName" type="text" class="w-full px-3 py-2 border rounded-md" />
          </div>

          <!-- Dirección -->
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dirección *
            </label>
            <input id="address" v-model="form.address" type="text" class="w-full px-3 py-2 border rounded-md" />
          </div>

          <!-- Distrito -->
          <div>
            <label for="distric" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Distrito *
            </label>
            <input id="distric" v-model="form.distric" type="text" class="w-full px-3 py-2 border rounded-md" />
          </div>

        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-slate-600">
          <button type="button" @click="$emit('close')"
            class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
            Cancelar
          </button>
          <button type="submit" :disabled="isLoading"
            class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 rounded-md">
            <span v-if="!isLoading">Actualizar</span>
            <span v-else>Actualizando...</span>
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

const isLoading = ref(false)
const form = reactive({
  code: '',
  username: '',
  password: '',
  ruc: '',
  businessName: '',
  address: '',
  distric: ''
})

watch(() => props.factory, (newVal) => {
  if (newVal) {
    form.code = newVal.code || ''
    form.username = newVal.username || ''
    form.password = '' // vacío por defecto
    form.ruc = newVal.ruc || ''
    form.businessName = newVal.businessName || ''
    form.address = newVal.address || ''
    form.distric = newVal.distric || ''
  }
}, { immediate: true })

const handleSubmit = () => {
  isLoading.value = true

  const payload = {
    uid: props.factory?.uid,
    code: form.code,
    username: form.username,
    ruc: form.ruc,
    businessName: form.businessName,
    address: form.address,
    distric: form.distric
  }


  if (form.password && form.password.trim() !== '') {
    payload.password = form.password
  }

  emit('save', payload)
  isLoading.value = false
}
</script>
