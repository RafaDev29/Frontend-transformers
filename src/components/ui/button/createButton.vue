<template>
    <button
        @click="$emit('click')"
        class="flex items-center justify-center rounded-full w-10 h-10 bg-accent-primary text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary dark:focus:ring-offset-slate-800"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }" 
        :disabled="disabled">
        <slot>
            <!-- Icono por defecto -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
        </slot>
    </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    disabled: {
        type: Boolean,
        default: false
    }
})

// Definir el emit para el evento click
defineEmits(['click'])
</script>