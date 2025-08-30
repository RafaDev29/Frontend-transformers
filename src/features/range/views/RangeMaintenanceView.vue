<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class="px-2 py-1 flex items-center justify-between">
      <div class="flex-grow">
        <NavigationComponent :breadcrumbs="[
          { label: 'Mantenimiento de Fábricas', path: '/app/mRange' },
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

    <FormUpdateComponent v-if="showUpdateModal" :show="showUpdateModal" :Range="selectedRange"
      @close="closeUpdateModal" @save="handleUpdate" />

  </div>
</template>

<script setup>
import TableMaintenance from '@/features/range/components/TableMaintenance.vue'
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
import FormCreateComponent from '../components/FormCreateComponent.vue'
import FormUpdateComponent from '../components/FormUpdateComponent.vue'
import createButton from '@/components/ui/button/createButton.vue'
import { ref, getCurrentInstance, onMounted } from 'vue'
import { listRange, deleteRange, createRange, updateRange } from '../services/rangeService'

const showUpdateModal = ref(false)
const selectedRange = ref(null)
const dataItem = ref()
const isLoading = ref(false)
const errorMsg = ref('')
const showCreateModal = ref(false)
const bus = getCurrentInstance()?.appContext.config.globalProperties.$bus


const handleEdit = (Range) => {
  selectedRange.value = Range
  showUpdateModal.value = true
}

const closeUpdateModal = () => {
  showUpdateModal.value = false
  selectedRange.value = null
}

const listTranformer = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const response = await listRange()

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
    const response = await createRange(formData)

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




const handleUpdate = async (payload) => {
  isLoading.value = true
  errorMsg.value = ''
  try {

    const response = await updateRange(payload, payload.uid)
    if (response.status) {
      bus?.emit?.('success', 'Fábrica actualizada correctamente')
      closeUpdateModal()
      listTranformer()
    }

  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Error al actualizar fábrica'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}



const handleDelete = async (payload) => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const response = await deleteRange(payload.uid)

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