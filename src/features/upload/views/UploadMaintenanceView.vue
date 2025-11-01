<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class="px-2 py-1 flex items-center justify-between">
      <div class="flex-grow">
        <NavigationComponent :breadcrumbs="[
          { label: 'Mantenimiento de Clientes', path: '/app/mUpload' },
        ]" />
      </div>
      <div class="w-[5%] flex ml-4 justify-end">
        <createButton @click="openCreateModal" />
      </div>
    </div>


    <FilterComponent class="mb-2 pb-2" @onSearch="handleFilter" />

    <div class="px-2 pb-1">
      <TableMaintenance :items="dataItem" @edit="handleEdit" @delete="handleDelete" />
    </div>

    <FormCreateComponent
      class="backdrop-blur-md"
      v-if="showCreateModal"
      :show="showCreateModal"
      @close="closeCreateModal"
      @save="handleCreate"
    />
  </div>
</template>

<script setup>
import TableMaintenance from '@/features/upload/components/TableMaintenance.vue'
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
import FormCreateComponent from '../components/FormCreateComponent.vue'
import createButton from '@/components/ui/button/createButton.vue'
import FilterComponent from '../components/FilterComponent.vue'
import { ref, getCurrentInstance, onMounted } from 'vue'
import { listUpload, createUpload } from '../services/uploadService'
import { useAuthStore } from '@/features/auth/stores/authStore'

const auth = useAuthStore()
const role = auth.user?.role
const dataItem = ref([])
const isLoading = ref(false)
const errorMsg = ref('')
const selectedUpload = ref({})
const showCreateModal = ref(false)
const showUpdateModal = ref(false)
const selectedTransformerUid = ref(null)
const bus = getCurrentInstance()?.appContext.config.globalProperties.$bus

// 🔹 Lista usando el UID en la URL
const listTranformer = async (transformerUid = null) => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    let response

    if (role === 'ROOT' || role === 'FACTORY') {
      response = transformerUid
        ? await listUpload(transformerUid)
        : await listUpload()
    } else {
      throw new Error('Rol no autorizado')
    }

    if (response) dataItem.value = response.data
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Error al cargar clientes'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}

// 🔹 Maneja el filtro (recibe el UID del transformador)
const handleFilter = (payload) => {
  selectedTransformerUid.value = payload.transformerUid
  listTranformer(selectedTransformerUid.value)
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
    let response

    if (role === 'ROOT' || role === 'FACTORY') {
      response = await createUpload(formData)
    } else {
      throw new Error('Rol no autorizado')
    }

    if (response) {
      bus?.emit?.('success', 'Transformador creado correctamente')
      closeCreateModal()
      listTranformer(selectedTransformerUid.value) // ✅ refresca usando el filtro actual
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Error al crear transformador'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}

const openUpdateModal = (clientData) => {
  selectedUpload.value = { ...clientData }
  showUpdateModal.value = true
}

const handleEdit = (transformer) => {
  openUpdateModal(transformer)
}

onMounted(() => {
  listTranformer()
})
</script>
