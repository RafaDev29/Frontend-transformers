<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
    <!-- Navigation -->
    <div class="mb-6">
      <NavigationComponent :breadcrumbs="[
        { label: 'Mantenimiento de Cargas', path: '/app/mUpload' },
      ]" />
    </div>

    <!-- Botón centrado -->
    <div class="flex items-center justify-center min-h-[60vh]">
      <createButton @click="openCreateModal" />
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
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
import FormCreateComponent from '../components/FormCreateComponent.vue'
import createButton from '@/components/ui/button/createButton.vue'
import { ref, getCurrentInstance } from 'vue'
import { createUpload } from '../services/uploadService'
import { useAuthStore } from '@/features/auth/stores/authStore'
import eventBus from '@/plugins/eventBus'

const auth = useAuthStore()
const role = auth.user?.role
const errorMsg = ref('')
const showCreateModal = ref(false)
const bus = getCurrentInstance()?.appContext.config.globalProperties.$bus

const openCreateModal = () => {
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const handleCreate = async (formData, serialNumber) => {
  errorMsg.value = ''
  
  // Activar loading alert
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
    // Desactivar loading alert
    eventBus.emit('loading', false)
  }
}
</script>