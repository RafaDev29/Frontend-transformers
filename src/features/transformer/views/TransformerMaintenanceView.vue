<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class="px-2 py-1">
      <NavigationComponent :breadcrumbs="[
        { label: 'Mantenimiento de transformadores', path: '/app/mtransformer' },

      ]" />
    </div>
    <div class="px-2 pb-1">
   <TableMaintenance :items="dataItem"  />

    </div>
  </div>
</template>


<script setup>
import TableMaintenance from '@/features/transformer/components/TableMaintenance.vue'
import NavigationComponent from '@/features/transformer/components/NavigationComponent.vue'
import { ref, getCurrentInstance, onMounted } from 'vue'
import { listTransformerRoot  } from '../services/transformerService'

const dataItem = ref()
const isLoading = ref(false)
const errorMsg = ref('')
const bus = getCurrentInstance()?.appContext.config.globalProperties.$bus

const listTranformer = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const response = await listTransformerRoot()

    if(response){
      dataItem.value = response.data
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'error al cargar transformadores'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  listTranformer();
})
</script>