<template>
  <div class="w-full">
    <div
      class="overflow-hidden border border-slate-200/70 dark:border-slate-700/60
      bg-gradient-to-br from-white via-slate-50 to-white
      dark:from-slate-800 dark:via-slate-850 dark:to-slate-800
      shadow-sm backdrop-blur-sm transition-all duration-300"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead
            class="bg-gradient-to-r from-color1/95 via-color2/85 to-color1/95
            dark:from-color3/90 dark:via-color4/80 dark:to-color3/90 text-white"
          >
            <tr>
              <th class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                Archivo
              </th>
              <th class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                Tipo de Carga
              </th>
              <th class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                Cliente
              </th>
              <th class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                Fábrica
              </th>
              <th class="px-4 py-3 text-left text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                Fecha 
              </th>
              <th class="px-4 py-3 text-center text-xs tracking-wider font-bold uppercase whitespace-nowrap">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody
            class="divide-y divide-slate-200/70 dark:divide-slate-700/60
            text-[13px] bg-white/90 dark:bg-slate-800/70 transition-colors duration-300"
          >
            <tr
              v-for="row in rows"
              :key="row.uid"
              class="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200"
            >
              <td class="px-4 py-4 font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                {{ row.fileName }}
              </td>

              <td class="px-4 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                {{ row.uploadType }}
              </td>

              <td class="px-4 py-4 text-slate-700 dark:text-slate-200 whitespace-nowrap">
                {{ row.customerName }}
              </td>

              <td class="px-4 py-4 text-slate-700 dark:text-slate-200 whitespace-nowrap">
                {{ row.factoryName }}
              </td>

              <td class="px-4 py-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                {{ formatDate(row.startDate) }}
              </td>

              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex justify-center gap-2">
                  <button
                    @click="deleteRow(row)"
                    class="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300
                    hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all duration-200"
                    title="Eliminar carga"
                  >
                    <svg viewBox="0 0 24 24" class="h-4 w-4">
                      <path
                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                        fill="currentColor"
                      />
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
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p class="text-sm font-medium">No hay elementos para mostrar</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const emit = defineEmits(['delete'])
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const rows = computed(() => {
  return props.items.map(item => ({
    uid: item.uid,
    fileName: item.fileName,
    uploadType: item.uploadType,
    startDate: item.startDate,
    customerName: item.transformer?.customer?.businessname || '—',
    factoryName: item.transformer?.factory?.businessName || '—'
  }))
})

function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

function deleteRow(row) {
  emit('delete', row)
}
</script>
