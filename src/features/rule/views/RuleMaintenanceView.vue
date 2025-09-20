<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">
    <div class="px-2 py-1 flex items-center justify-between">
      <div class="flex-grow">
        <NavigationComponent :breadcrumbs="[
          { label: 'Mantenimiento de Reglas', path: '/app/mRule' },
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
      @save="handleCreate"   :alerts="dataAlert" />

    <FormUpdateComponent 
     :alerts="dataAlert"
      v-if="showUpdateModal"
      :show="showUpdateModal" 
      :ruleData="selectedCustomer"
      @close="closeUpdateModal"
      @update="handleUpdate"  />
  </div>
</template>

<script setup>
import TableMaintenance from '@/features/rule/components/TableMaintenance.vue'
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
import FormCreateComponent from '../components/FormCreateComponent.vue'
import FormUpdateComponent from '../components/FormUpdateComponent.vue'
import createButton from '@/components/ui/button/createButton.vue'
import { ref, getCurrentInstance, onMounted } from 'vue'
import {  allRule , deleteRule , createRule, updateRule } from '../services/ruleService'
import{allAlerts} from '@/features/alert/services/alertService'


const dataItem = ref()
const isLoading = ref(false)
const errorMsg = ref('')
const selectedCustomer = ref({})
const showCreateModal = ref(false)
const showUpdateModal = ref(false)
const bus = getCurrentInstance()?.appContext.config.globalProperties.$bus
const dataAlert = ref()



const listAlert = async () => {
  errorMsg.value = ''
  try {
    const  response = await allAlerts();

    if (response) {
      dataAlert.value = response.data
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Error al cargar alertas'
    bus?.emit?.('error', errorMsg.value)
  }
}
const listItems = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const  response = await allRule();

    if (response) {
      dataItem.value = response.data
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Error al cargar alertas'
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
    const response = await createRule(formData)

    if (response) {
      bus?.emit?.('success', 'Regla creada correctamente')
      closeCreateModal()
      listItems()
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Error al crear regla'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}


const openUpdateModal = (ruleData) => {
  selectedCustomer.value = { ...ruleData }
  showUpdateModal.value = true
}

const closeUpdateModal = () => {
  showUpdateModal.value = false
  selectedCustomer.value = {}
}



const handleUpdate = async (updateData) => {

  isLoading.value = true
  errorMsg.value = ''

  try {

    const response = await updateRule(updateData.data , updateData.uid)

    if (response) {
      bus?.emit?.('success', 'Regla actualizado correctamente')
      closeUpdateModal()
      listItems() 
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Error al actualizar Regla'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}


const handleEdit = (rule) => {
  openUpdateModal(rule)
}


const handleDelete = async (payload) => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const response = await deleteRule(payload.uid)

    if (response) {
      bus?.emit?.('success', 'Se eliminó correctamente')
      listItems()
    }
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'error al eliminar regla'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  listItems()
  listAlert()
})
</script>