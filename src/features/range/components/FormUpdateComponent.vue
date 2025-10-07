<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]" @click.self="$emit('close')">
    <div
      class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
      
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Actualizar Rango
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">

        <!-- Código -->
        <div>
          <label for="code" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Código *
          </label>
          <input id="code" v-model="form.code" type="text" 
            class="w-full px-3 py-2 border rounded-md bg-green-50/70 dark:bg-green-900/20 backdrop-blur-sm border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color1 transition-all duration-200" />
        </div>

        <!-- Tipo -->
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo *
          </label>
          <input id="type" v-model="form.type" type="text" 
            class="w-full px-3 py-2 border rounded-md bg-green-50/70 dark:bg-green-900/20 backdrop-blur-sm border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color1 transition-all duration-200" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tensiones *
          </label>
          <div v-for="(voltage, index) in form.voltageValue" :key="index" class="flex items-center gap-2 mb-2">
            <input v-model="form.voltageValue[index]" type="text"
              class="w-full px-3 py-2 border rounded-md bg-green-50/70 dark:bg-green-900/20 backdrop-blur-sm border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color1 transition-all duration-200" />
            <button type="button" @click="removeVoltage(index)"
              class="px-2 py-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
              ✕
            </button>
          </div>
          <button type="button" @click="addVoltage"
            class="px-3 py-1 text-sm text-color1 hover:text-color2 dark:text-color3 dark:hover:text-color4 border border-dashed border-color1/50 rounded-md">
            + Agregar tensión
          </button>
        </div>

        <!-- Activo -->
        <div class="flex items-center">
          <input id="state" type="checkbox" v-model="form.state"
            class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded dark:bg-slate-700 dark:border-slate-600">
          <label for="state" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Activo
          </label>
        </div>


        <div class="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-slate-600">
          <button type="button" @click="$emit('close')"
            class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
            Cancelar
          </button>
          <button type="submit" 
            class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 rounded-md">
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
  Range: { type: Object, default: null }
})
console.log(props.Range , "xs")
const emit = defineEmits(['close', 'save'])

const isLoading = ref(false)
const form = reactive({
  uid: '',
  code: '',
  type: '',
  voltageValue: [''],
  state: true
})

watch(() => props.Range, (newVal) => {
  if (newVal) {
    form.uid = newVal.uid || ''
    form.code = newVal.code || ''
    form.type = newVal.type || ''
    form.voltageValue = newVal.voltageValue?.length ? [...newVal.voltageValue] : ['']
    form.state = newVal.state ?? true
  }
}, { immediate: true })

const handleSubmit = () => {
  isLoading.value = true

  const payload = {
    uid: form.uid,
    code: form.code,
    type: form.type,
    voltageValue: [...form.voltageValue],
    isActive: form.state
  }

  emit('save', payload)
  isLoading.value = false
}

const addVoltage = () => {
  form.voltageValue.push('')
}

const removeVoltage = (index) => {
  form.voltageValue.splice(index, 1)
}
</script>
