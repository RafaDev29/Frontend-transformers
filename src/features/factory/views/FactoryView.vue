<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class=" py-1">
      <NavigationComponent
        :breadcrumbs="[
          { label: 'Panel de Fábricas', path: '/app/factory' },

        ]"
      />
    </div>
    <headRoot />

   
    <div class=" pb-1">
      <TableComponent :items="dataItem" />
    </div>
  </div>
</template>

<script setup>
import headRoot from '@/components/ui/head/headRoot.vue';
import TableComponent from '@/features/factory/components/TableComponent.vue'
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
import { listFactory } from '../services/factoryService'
import {  onMounted ,getCurrentInstance , ref} from 'vue'

const bus = getCurrentInstance()?.appContext.config.globalProperties.$bus
const dataItem = ref()
const isLoading = ref(false)
const errorMsg = ref('')
const listItems = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const response = await listFactory()

    if (response) {
      dataItem.value = response.data
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'error al cargar las fábricas'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  listItems()
})

</script>