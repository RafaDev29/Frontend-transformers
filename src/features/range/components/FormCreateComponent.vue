<template>
    <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]">
        <div
            class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Crear Nuevo Rango
                </h2>
                <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>


            <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
                
                <div>
                    <label for="code" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Código *
                    </label>
                    <input id="code" v-model="form.code" type="text" 
                        :class="inputClass(errors.code)" required />
                    <p v-if="errors.code" class="mt-1 text-sm text-red-600">{{ errors.code }}</p>
                </div>

                <div>
                    <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tipo *
                    </label>
                    <input id="type" v-model="form.type" type="text" 
                        :class="inputClass(errors.type)" required />
                    <p v-if="errors.type" class="mt-1 text-sm text-red-600">{{ errors.type }}</p>
                </div>

                <!-- Voltajes -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Voltajes *
                    </label>
                    <div v-for="(voltage, index) in form.voltageValue" :key="index" class="flex items-center gap-2 mb-2">
                        <input v-model="form.voltageValue[index]" type="text" 
                            class="w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-gray-300 dark:border-slate-600 focus:ring-color1 focus:outline-none" />
                        <button type="button" @click="removeVoltage(index)"
                            class="px-2 py-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                            ✕
                        </button>
                    </div>
                    <button type="button" @click="addVoltage"
                        class="px-3 py-1 text-sm text-color1 hover:text-color2 dark:text-color3 dark:hover:text-color4 border border-dashed border-color1/50 rounded-md">
                        + Agregar voltaje
                    </button>
                    <p v-if="errors.voltageValue" class="mt-1 text-sm text-red-600">{{ errors.voltageValue }}</p>
                </div>

                <!-- Activo -->
                <div class="flex items-center">
                    <input id="isActive" type="checkbox" v-model="form.isActive"
                        class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded dark:bg-slate-700 dark:border-slate-600">
                    <label for="isActive" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Activo
                    </label>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-slate-600">
                    <button type="button" @click="$emit('close')"
                        class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500 rounded-md border border-gray-300 dark:border-slate-500">
                        Cancelar
                    </button>
                    <button type="submit" 
                        class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
                        Crear Rango
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
    show: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'save'])

const errors = ref({})

const form = reactive({
    code: '',
    type: '',
    voltageValue: [''],
    isActive: true
})

const resetForm = () => {
    form.code = ''
    form.type = ''
    form.voltageValue = ['']
    form.isActive = true
    errors.value = {}
}

const validateForm = () => {
    errors.value = {}
    if (!form.code) errors.value.code = 'El código es requerido'
    if (!form.type) errors.value.type = 'El tipo es requerido'
    if (!form.voltageValue.length || form.voltageValue.some(v => !v)) {
        errors.value.voltageValue = 'Debe agregar al menos un voltaje válido'
    }
    return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
    if (validateForm()) {
        emit('save', { 
            code: form.code,
            type: form.type,
            voltageValue: [...form.voltageValue],
            isActive: form.isActive
        })
    }
}

const addVoltage = () => {
    form.voltageValue.push('')
}

const removeVoltage = (index) => {
    form.voltageValue.splice(index, 1)
}

watch(() => props.show, (newVal) => {
    if (newVal) resetForm()
})

const inputClass = (hasError) => [
    'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
    hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
    'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
]
</script>
