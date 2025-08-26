<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class="px-2 py-1 flex items-center justify-between">
      <div class="flex-grow">
        <NavigationComponent :breadcrumbs="[
          { label: 'Mantenimiento de transformadores', path: '/app/mtransformer' },
        ]" />
      </div>
      <div class="w-[5%] flex justify-end">
        <createButton @click="openCreateModal" />
      </div>
    </div>

    <div class="px-2 pb-1">
      <TableMaintenance :items="dataItem" @edit="handleEdit" @delete="handleDelete" />
    </div>

    <FormCreateComponent v-if="showCreateModal" :show="showCreateModal" @close="closeCreateModal"
      @save="handleCreate" />
  </div>
</template>

<script setup>
import TableMaintenance from '@/features/transformer/components/TableMaintenance.vue'
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
import FormCreateComponent from '../components/FormCreateComponent.vue'
import createButton from '@/components/ui/button/createButton.vue'
import { ref, getCurrentInstance, onMounted } from 'vue'
import { listTransformerRoot, deleteTransformerRoot, createTransformerRoot } from '../services/transformerService'

const dataItem = ref()
const isLoading = ref(false)
const errorMsg = ref('')
const showCreateModal = ref(false)
const bus = getCurrentInstance()?.appContext.config.globalProperties.$bus

const listTranformer = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const response = await listTransformerRoot()

    if (response) {
      dataItem.value = response.data
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'error al cargar transformadores'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}

const openCreateModal = () => {
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const handleCreate = async (formData) => {
  isLoading.value = true
  errorMsg.value = ''

  try {
    const response = await createTransformerRoot(formData)

    if (response) {
      bus?.emit?.('success', 'Transformador creado correctamente')
      closeCreateModal()
      listTranformer() 
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Error al crear transformador'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}

const handleEdit = (transformer) => {
  console.log('Editar transformador:', transformer)
}

const handleDelete = async (payload) => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const response = await deleteTransformerRoot(payload.uid)

    if (response) {
      bus?.emit?.('success', 'Se eliminó correctamente')
      listTranformer()
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'error al eliminar transformadores'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  listTranformer()
})
</script>