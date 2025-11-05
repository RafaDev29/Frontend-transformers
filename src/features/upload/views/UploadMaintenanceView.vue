<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class="px-2 py-1 flex items-center justify-between">
      <div class="flex-grow">
        <NavigationComponent :breadcrumbs="[
          { label: 'Mantenimiento de Cargas', path: '/app/mUpload' },
        ]" />

      </div>

      <div class="w-[5%] flex ml-4  justify-end">
        <createButton @click="openCreateModal" />
      </div>

    </div>

    <div class="px-2 pb-1">
      <TableMaintenance :items="dataItem" @edit="handleEdit" @delete="handleDelete" />
    </div>

    <FormCreateComponent class="backdrop-blur-md" v-if="showCreateModal" :show="showCreateModal"
      @close="closeCreateModal" @save="handleCreate" />
  </div>
</template>

<script setup>
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
import FormCreateComponent from '../components/FormCreateComponent.vue'
import createButton from '@/components/ui/button/createButton.vue'
import { ref, getCurrentInstance, onMounted } from 'vue'
import { createUpload , listUpload , deleteUpload} from '../services/uploadService'
import { useAuthStore } from '@/features/auth/stores/authStore'
import eventBus from '@/plugins/eventBus'
import TableMaintenance from '@/features/upload/components/TableMaintenance.vue'
const auth = useAuthStore()
const role = auth.user?.role
const errorMsg = ref('')
const showCreateModal = ref(false)
const bus = getCurrentInstance()?.appContext.config.globalProperties.$bus
const dataItem = ref()


const listBatch = async () => {
  try {
    let response

    if (role === 'ROOT') {
      response = await listUpload()
    } else if (role === 'FACTORY') {
      response = await listUpload()
    } else {
      throw new Error('Rol no autorizado')
    }

    if (response) {
      dataItem.value = response.data
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Error al cargar clientes'
    bus?.emit?.('error', errorMsg.value)
  } 
}


const openCreateModal = () => {
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const handleCreate = async (formData, serialNumber) => {
  errorMsg.value = ''

  eventBus.emit('loading', true)

  try {
    let response

    if (role === 'ROOT' || role === 'FACTORY') {
      response = await createUpload(formData, serialNumber)
    } else {
      throw new Error('Rol no autorizado')
    }

    if (response) {
      bus?.emit?.('success', response?.message)
      closeCreateModal()
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Error al cargar data'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    eventBus.emit('loading', false)
  }
}


const handleDelete = async (payload) => {

  try {
    const response = await deleteUpload(payload.uid)

    if (response) {
      bus?.emit?.('success', 'Se eliminó correctamente')
      listBatch()
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'error al eliminar transformadores'
    bus?.emit?.('error', errorMsg.value)
  } 
}


onMounted(() => {
  listBatch()
})
</script>