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
                                Número de Serie
                            </th>
                            <th
                                class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                                Fábrica
                            </th>
                            <th
                                class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                                Tipo
                            </th>
                            <th
                                class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                                Año Fabricación
                            </th>
                            <th
                                class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
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
                        <tr v-for="row in rows" :key="row.serialNumber"
                            class="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200">

                            <td
                                class="px-4 py-4 font-mono font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                {{ row.code }}
                            </td>

                            <td
                                class="px-4 py-4 font-mono font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                {{ row.serialNumber }}
                            </td>

                            <td class="px-4 py-4 text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                {{ row.factoryName }}
                            </td>

                            <td class="px-4 py-4 whitespace-nowrap">
                                <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold
                           bg-gradient-to-r from-color1/10 via-color2/10 to-color1/5
                           dark:from-colorDark3/20 dark:via-colorDark4/15 dark:to-colorDark3/10
                           text-color1 dark:text-color3 border border-color1/20 dark:border-colorDark3/30
                           transition-all duration-300 group-hover:shadow-sm">
                                    <span class="w-1.5 h-1.5 rounded-full bg-color2 dark:bg-color3 
                                       shadow-[0_0_6px] shadow-color2/50 dark:shadow-color3/50"></span>
                                    {{ row.type }}
                                </span>
                            </td>

                            <td class="px-4 py-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                {{ row.yearManufacture }}
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
        <div v-if="!rows.length" class="text-center py-12">
            <div class="text-slate-400 dark:text-slate-500">
                <svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p class="text-sm font-medium">No hay elementos para mostrar</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue'
const emit = defineEmits(['edit', 'delete'])
const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
})

const rows = computed(() => {
    return props.items.map(item => ({
        primaryVoltage: item.primaryVoltage,
        secondaryVoltage: item.secondaryVoltage,
        regulatedVoltage: item.regulatedVoltage,
        oilTemperature: item.oilTemperature,
        copperTemperature: item.copperTemperature,
        ambientTemperature: item.ambientTemperature,
        primaryCurrent: item.primaryCurrent,
        secondaryCurrent: item.secondaryCurrent,
        phases: item.phases,
        nominalVoltage: item.nominalVoltage,
        altitude: item.altitude,
        frequency: item.frequency,
        saleDate: item.saleDate,
        apparentPowerKVA: item.apparentPowerKVA,
        uid: item.uid,
        serialNumber: item.serialNumber,
        factoryName: item.factory.businessName,
        uidFactory: item.factory.uid,
        brand: item.brand,
        type: item.type,
        zone: item.zone,
        customer: item.customer,
        yearManufacture: item.yearManufacture,
        code: item.code,
        factory: item.factory,
        isActive: item.isActive ? 'Activo' : 'Inactivo'
    }))
})

function editRow(row) {
    emit('edit', row)
}

function deleteRow(row) {
    emit('delete', row)
}
</script>