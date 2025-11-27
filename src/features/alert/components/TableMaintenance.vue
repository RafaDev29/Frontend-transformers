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
                                Destinatarios
                            </th>
                            <th
                                class="px-4 py-3 text-center text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                                Intentos
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

                            <td class="px-4 py-4 text-slate-700 dark:text-slate-200 whitespace-nowrap max-w-48">
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
                                    <svg v-if="row.type === 'WHATSAPP'" class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.451 3.147"/>
                                    </svg>
                                    <svg v-else-if="row.type === 'EMAIL'" class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                    <svg v-else class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
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

                            <td class="px-4 py-4 whitespace-nowrap text-center">
                                <div class="flex flex-col gap-1">
                                    <span v-if="row.contactsCount > 0" 
                                          class="text-xs text-slate-500 dark:text-slate-400">
                                        +{{ row.contactsCount }} contactos
                                    </span>
                                </div>
                            </td>

                            <td class="px-4 py-4 text-center whitespace-nowrap">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                                           bg-orange-100 text-orange-700 border border-orange-200
                                           dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700/30">
                                    {{ row.attempts }}x
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
                                           hover:bg-color1/10 dark:hover:bg-color3/20 rounded-md transition-all duration-200">
                                        <svg viewBox="0 0 24 24" class="h-4 w-4">
                                            <path
                                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                                                fill="currentColor" />
                                        </svg>
                                    </button>
                                    <button @click="deleteRow(row)"
                                        class="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300
                                           hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all duration-200">
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
                        d="M15 17h5l-5 5-5-5h5v-12h5v12z" />
                </svg>
                <p class="text-sm font-medium">No hay alertas para mostrar</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue'
import { useAuthStore } from '@/features/auth/stores/authStore'

const emit = defineEmits(['edit', 'delete'])
const authStore = useAuthStore()

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
})

const rows = computed(() => {
    const user = authStore.user
    const userRole = user?.role
    const factoryUid = user?.factory?.uid
    const customerUid = user?.customer?.uid

    return props.items.map(item => {
        let contactsCount = 0
        
        if (userRole === 'ROOT') {
            // ROOT ve todos los contactos
            contactsCount = item.contacts ? item.contacts.length : 0
        } else if (userRole === 'FACTORY' && factoryUid) {
            // FACTORY solo cuenta contactos con su factoryUid
            contactsCount = item.contacts 
                ? item.contacts.filter(contact => contact.factory?.uid === factoryUid).length 
                : 0
        } else if (userRole === 'CUSTOMER' && customerUid) {
            // CUSTOMER solo cuenta contactos con su customerUid
            contactsCount = item.contacts 
                ? item.contacts.filter(contact => contact.customer?.uid === customerUid).length 
                : 0
        }

        return {
            uid: item.uid,
            code: item.code,
            name: item.name,
            type: item.type,
            description: item.description,
            isActive: item.isActive ? 'Activo' : 'Inactivo',
            attempts: item.attempts,
            contactsCount: contactsCount,
            contacts: item.contacts || [],
            createdByUser: item.createdByUser,
            userRoleLabel: getUserRoleLabel(item.createdByUser?.role),
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }
    })
})

const filteredRows = computed(() => {
    const user = authStore.user
    
    // Si no hay usuario autenticado, no mostrar nada
    if (!user) return []
    
    const userRole = user.role
    const userUid = user.uid
    
    // ROOT ve todas las alertas
    if (userRole === 'ROOT') {
        return rows.value
    }
    
    // FACTORY: ve alertas que creó + alertas donde su factory.uid aparece en contacts
    if (userRole === 'FACTORY') {
        const factoryUid = user.factory?.uid
        
        return rows.value.filter(alert => {
            // Alertas creadas por el usuario
            const isCreatedByUser = alert.createdByUser?.uid === userUid
            
            // Alertas donde el factory.uid aparece en algún contacto
            const hasFactoryInContacts = alert.contacts?.some(contact => 
                contact.factory?.uid === factoryUid
            )
            
            return isCreatedByUser || hasFactoryInContacts
        })
    }
    
    // CUSTOMER: ve alertas que creó + alertas donde su customer.uid aparece en contacts
    if (userRole === 'CUSTOMER') {
        const customerUid = user.customer?.uid
        
        return rows.value.filter(alert => {
            // Alertas creadas por el usuario
            const isCreatedByUser = alert.createdByUser?.uid === userUid
            
            // Alertas donde el customer.uid aparece en algún contacto
            const hasCustomerInContacts = alert.contacts?.some(contact => 
                contact.customer?.uid === customerUid
            )
            
            return isCreatedByUser || hasCustomerInContacts
        })
    }
    
    // Si el rol no es reconocido, no mostrar nada
    return []
})

function getUserRoleLabel(role) {
    switch(role) {
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