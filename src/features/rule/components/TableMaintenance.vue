<template>
    <div class="w-full">
        <div class="overflow-hidden border border-slate-200/70 dark:border-slate-700/60
             bg-gradient-to-br from-white via-slate-50 to-white
             dark:from-slate-800 dark:via-slate-850 dark:to-slate-800
             shadow-sm backdrop-blur-sm transition-all duration-300">

            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-gradient-to-r from-color1/95 via-color2/85 to-color1/95
                 dark:from-color3/90 dark:via-color4/80 dark:to-color3/90
                 text-white">
                        <tr>
                            <th
                                class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                                Código
                            </th>
                            <th
                                class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                                Nombre
                            </th>
                            <th
                                class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                                Tipo
                            </th>
                            <th
                                class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                                Creado por
                            </th>
                            <th
                                class="px-4 py-3 text-center text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                                Alertas
                            </th>
                            <th
                                class="px-4 py-3 text-center text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                                Estado
                            </th>
                            <th
                                class="px-4 py-3 text-center text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-slate-200/70 dark:divide-slate-700/60
                 text-[13px] bg-white/90 dark:bg-slate-800/70 transition-colors duration-300">
                        <tr v-for="row in filteredRows" :key="row.uid"
                            class="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200">

                            <td
                                class="px-4 py-4 font-mono font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                {{ row.code }}
                            </td>

                            <td class="px-4 py-4 text-slate-700 dark:text-slate-200 whitespace-nowrap max-w-64">
                                <div class="truncate" :title="row.name">
                                    {{ row.name }}
                                </div>
                            </td>

                            <td class="px-4 py-4 whitespace-nowrap">
                                <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold
                           bg-gradient-to-r from-color1/10 via-color2/10 to-color1/5
                           dark:from-colorDark3/20 dark:via-colorDark4/15 dark:to-colorDark3/10
                           text-color1 dark:text-color3 border border-color1/20 dark:border-colorDark3/30
                           transition-all duration-300 group-hover:shadow-sm">
                                    <svg v-if="row.type === 'TEMPERATURA'" class="w-3 h-3" viewBox="0 0 24 24"
                                        fill="currentColor">
                                        <path
                                            d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2V5c0-.55.45-1 1-1s1 .45 1 1v6h-2z" />
                                    </svg>
                                    <svg v-else-if="row.type === 'PRESION'" class="w-3 h-3" viewBox="0 0 24 24"
                                        fill="currentColor">
                                        <path
                                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg v-else-if="row.type === 'HUMEDAD'" class="w-3 h-3" viewBox="0 0 24 24"
                                        fill="currentColor">
                                        <path
                                            d="M12 2c1.1 0 2 .9 2 2 0 .74-.4 1.38-1 1.72v14.78h-2V5.72c-.6-.34-1-.98-1-1.72 0-1.1.9-2 2-2zM21 14v1c0 2.21-1.79 4-4 4s-4-1.79-4-4v-1c0-2.21 1.79-4 4-4s4 1.79 4 4z" />
                                    </svg>
                                    <svg v-else class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    {{ row.type }}
                                </span>
                            </td>

                      <td class="px-4 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-2">
                                    <div class="flex-shrink-0 w-6 h-6">
                                        <img v-if="row.createdByUser?.images?.[0]?.url" 
                                             :src="row.createdByUser.images[0].url" 
                                             :alt="row.createdByUser.username"
                                             class="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-600">
                                        <div v-else class="w-6 h-6 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
                                            <svg class="w-3 h-3 text-slate-500 dark:text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
                                            {{ row.createdByUser?.username || 'N/A' }}
                                        </span>
                                        <span :class="[
                                            'text-xs px-1.5 py-0.5 rounded font-medium',
                                            row.userRoleLabel === 'Fábrica' 
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                                : row.userRoleLabel === 'Cliente' 
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                                : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                        ]">
                                            {{ row.userRoleLabel }}
                                        </span>
                                    </div>
                                </div>
                            </td>

                            <td class="px-4 py-4 text-center whitespace-nowrap">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                                           bg-blue-100 text-blue-700 border border-blue-200
                                           dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/30">
                                    {{ row.alertsCount }} alerta{{ row.alertsCount !== 1 ? 's' : '' }}
                                </span>
                            </td>

                            <td class="px-4 py-4 whitespace-nowrap">
                                <span :class="[
                                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                                    row.isActive === 'Activo'
                                        ? 'bg-color1/10 text-color1 border border-color1/20 dark:bg-color3/20 dark:text-color3 dark:border-color3/30'
                                        : 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                                ]">
                                    <span :class="[
                                        'w-1.5 h-1.5 rounded-full mr-1.5',
                                        row.isActive === 'Activo' ? 'bg-color1 dark:bg-color3' : 'bg-slate-400 dark:bg-slate-500'
                                    ]"></span>
                                    {{ row.isActive }}
                                </span>
                            </td>

                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="flex justify-center gap-2">
                                    <button @click="editRow(row)"
                                        class="p-2 text-color1 hover:text-color2 dark:text-color3 dark:hover:text-color4
                                           hover:bg-color1/10 dark:hover:bg-color3/20 rounded-md transition-all duration-200"
                                        title="Editar regla">
                                        <svg viewBox="0 0 24 24" class="h-4 w-4">
                                            <path
                                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                                                fill="currentColor" />
                                        </svg>
                                    </button>

                                    <button @click="deleteRow(row)"
                                        class="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300
                                           hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all duration-200"
                                        title="Eliminar regla">
                                        <svg viewBox="0 0 24 24" class="h-4 w-4">
                                            <path
                                                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                                                fill="currentColor" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Estado vacío -->
        <div v-if="!filteredRows.length" class="text-center py-12">
            <div class="text-slate-400 dark:text-slate-500">
                <svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p class="text-sm font-medium">No hay reglas para mostrar</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue'
import { useAuthStore } from '@/features/auth/stores/authStore'

const emit = defineEmits(['edit', 'delete'])
const auth = useAuthStore()

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
})

const rows = computed(() => {
    return props.items.map(item => ({
        uid: item.uid,
        code: item.code,
        name: item.name,
        type: item.type,
        config: item.config,
        isActive: item.isActive ? 'Activo' : 'Inactivo',
        alertsCount: item.alerts ? item.alerts.length : 0,
        alerts: item.alerts || [],
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        createdBy: item.createdBy,
        createdByUser: item.createdByUser,
        userRoleLabel: getUserRoleLabel(item.createdByUser?.role),
        factoryIds: item.factoryIds || [],
        customerIds: item.customerIds || []
    }))
})

// Computed para filtrar las reglas según el rol del usuario
const filteredRows = computed(() => {
    const userRole = auth.user?.role
    
    // Si es ROOT, mostrar todas las reglas
    if (userRole === 'ROOT') {
        return rows.value
    }
    
    // Para FACTORY y CUSTOMER, aplicar filtros
    const userId = auth.user?.uid
    let entityId = null
    
    if (userRole === 'FACTORY') {
        entityId = auth.user?.factory?.uid
    } else if (userRole === 'CUSTOMER') {
        entityId = auth.user?.customer?.uid
    }
    
    // Filtrar las reglas
    return rows.value.filter(row => {
        // Si fue creado por el usuario actual
        if (row.createdBy === userId) {
            return true
        }
        
        // Si es FACTORY y su ID está en factoryIds
        if (userRole === 'FACTORY' && entityId && row.factoryIds.includes(entityId)) {
            return true
        }
        
        // Si es CUSTOMER y su ID está en customerIds
        if (userRole === 'CUSTOMER' && entityId && row.customerIds.includes(entityId)) {
            return true
        }
        
        // Si no cumple ninguna condición, no mostrar
        return false
    })
})

function getUserRoleLabel(role) {
    switch (role) {
        case 'FACTORY':
            return 'Fábrica'
        case 'CUSTOMER':
            return 'Cliente'
        case 'ROOT':
            return 'ROOT'
        default:
            return 'N/A'
    }
}

function editRow(row) {
    emit('edit', row)
}

function deleteRow(row) {
    emit('delete', row)
}
</script>