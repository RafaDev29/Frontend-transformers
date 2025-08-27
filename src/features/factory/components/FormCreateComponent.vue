<template>
    <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div
            class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Crear Nueva Fábrica
                </h2>
                <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>


            <form @submit.prevent="handleSubmit" class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">


                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Usuario *
                        </label>
                        <input id="username" v-model="form.username" type="text" :class="[
                            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                            errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                            'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                        ]" required />
                        <p v-if="errors.username" class="mt-1 text-sm text-red-600">{{ errors.username }}</p>
                    </div>


                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Contraseña *
                        </label>
                        <input id="password" v-model="form.password" type="text" :class="[
                            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                            errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                            'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                        ]" required />
                        <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
                    </div>


                    <div>
                        <label for="ruc" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Ruc *
                        </label>
                        <input id="ruc" v-model="form.ruc" type="text" :class="[
                            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                            errors.ruc ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                            'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                        ]" required />
                        <p v-if="errors.ruc" class="mt-1 text-sm text-red-600">{{ errors.ruc }}</p>
                    </div>

                    <div>
                        <label for="businessName"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Razón social *
                        </label>
                        <input id="ruc" v-model="form.businessName" type="text" :class="[
                            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                            errors.businessName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                            'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                        ]" required />
                        <p v-if="errors.businessName" class="mt-1 text-sm text-red-600">{{ errors.businessName }}</p>
                    </div>

                </div>

                <!-- Buttons -->
                <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-slate-600">
                    <button type="button" @click="$emit('close')"
                        class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500 rounded-md transition-colors border border-gray-300 dark:border-slate-500">
                        Cancelar
                    </button>
                    <button type="submit" :disabled="isLoading"
                        class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
                        <span v-if="!isLoading" class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4"></path>
                            </svg>
                            Crear Fábrica
                        </span>
                        <span v-else class="flex items-center">
                            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Creando...
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'save'])

const isLoading = ref(false)
const errors = ref({})

const form = reactive({
    username: '',
    password: '',
    ruc: '',
    businessName: '',
})

const resetForm = () => {


    form.username = ''
    form.password = ''
    form.ruc = ''
    form.businessName = ''
    errors.value = {}
}

const validateForm = () => {
    errors.value = {}


    if (!form.username) {
        errors.value.username = 'El usuario es requerido'
    }

    if (!form.password) {
        errors.value.password = 'La contraseña es requerido'
    }

    if (!form.ruc) {
        errors.value.ruc = 'El ruc es requerido'
    }

     if (!form.businessName) {
        errors.value.businessName = 'La razón social es requerido'
    }




    return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
    if (validateForm()) {
        isLoading.value = true
        emit('save', { ...form })

    }
}

watch(() => props.show, (newVal) => {
    if (newVal) {
        resetForm()
    } else {
        isLoading.value = false
    }
})
</script>