<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1 pl-1 ml-1">
    <div class="px-2 py-1 flex items-center justify-between">
      <div class="flex-grow">
        <NavigationComponent :breadcrumbs="[
          { label: 'Mantenimiento de Transformadores', path: '/app/mtransformer' },
        ]" />
      </div>
      <div class="w-[5%] ml-4  flex justify-end">
        <createButton @click="openCreateModal" />
      </div>
    </div>

    <div class="px-2 pb-1">
      <TableMaintenance :items="dataItem" @edit="handleEdit" @delete="handleDelete" />
    </div>

    <FormCreateComponent v-if="showCreateModal" :show="showCreateModal" @close="closeCreateModal"
      @save="handleCreate" />

    <FormUpdateComponent v-if="showUpdateModal" :show="showUpdateModal" :transformerData="selectedTransformer"
      @close="closeUpdateModal" @update="handleUpdate" />
  </div>
</template>

<script setup>
import TableMaintenance from '@/features/transformer/components/TableMaintenance.vue'
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
import FormCreateComponent from '../components/FormCreateComponent.vue'
import FormUpdateComponent from '../components/FormUpdateComponent.vue'
import createButton from '@/components/ui/button/createButton.vue'
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useAuthStore } from '@/features/auth/stores/authStore'
import {
  listTransformerRoot,
  deleteTransformerRoot,
  createTransformerRoot,
  updateTransformerRoot,
  listTransformer, createTransformer, deleteTransformer , updateTransformer
} from '../services/transformerService'


const auth = useAuthStore()
const dataItem = ref()
const isLoading = ref(false)
const errorMsg = ref('')
const role = auth.user?.role

const showCreateModal = ref(false)


const showUpdateModal = ref(false)
const selectedTransformer = ref({})

const bus = getCurrentInstance()?.appContext.config.globalProperties.$bus

const listTranformers = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    let response
    if (role === 'ROOT') {
      response = await listTransformerRoot()
    } else if (role === 'FACTORY') {
      response = await listTransformer()
    } else {
      throw new Error('Rol no autorizado')
    }

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
    let response
    if (role === 'ROOT') {
      response = await createTransformerRoot(formData)
    } else if (role === 'FACTORY') {
      response = await createTransformer(formData)
    } else {
      throw new Error('Rol no autorizado')
    }

    if (response) {
      bus?.emit?.('success', 'Transformador creado correctamente')
      closeCreateModal()
      listTranformers()
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Error al crear transformador'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}


const openUpdateModal = (transformerData) => {
  selectedTransformer.value = { ...transformerData }
  showUpdateModal.value = true
}

const closeUpdateModal = () => {
  showUpdateModal.value = false
  selectedTransformer.value = {}
}

const handleUpdate = async (updateData) => {

  isLoading.value = true
  errorMsg.value = ''

  try {

    let response
    if (role === 'ROOT') {
      response = await updateTransformerRoot(updateData.data, updateData.uid)
    } else if (role === 'FACTORY') {
      response = await updateTransformer(updateData.data, updateData.uid)
    } else {
      throw new Error('Rol no autorizado')
    }


    if (response) {
      bus?.emit?.('success', 'Transformador actualizado correctamente')
      closeUpdateModal()
      listTranformers()
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Error al actualizar transformador'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}


const handleEdit = (transformer) => {
  openUpdateModal(transformer)
}


const handleDelete = async (payload) => {
  isLoading.value = true
  errorMsg.value = ''
  try {

    let response
    if (role === 'ROOT') {
      response = await deleteTransformerRoot(payload.uid)
    } else if (role === 'FACTORY') {
      response = await deleteTransformer(payload.uid)
    } else {
      throw new Error('Rol no autorizado')
    }


    if (response) {
      bus?.emit?.('success', 'Se eliminó correctamente')
      listTranformers()
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'error al eliminar transformadores'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  listTranformers()
})
</script>