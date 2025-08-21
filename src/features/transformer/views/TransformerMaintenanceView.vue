<template>

  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1">


    <div class="px-2 py-1">
      <NavigationComponent
        :breadcrumbs="[
          { label: 'Mantenimiento de transformadores', path: '/app/mtransformer' },

        ]"
      />
    </div>

    <div class="px-2 pb-1">
      <TableComponent />
    </div>
  </div>
</template>



<script setup>
import TableComponent from '@/features/transformer/components/TableComponent.vue'
import NavigationComponent from '@/features/transformer/components/NavigationComponent.vue'
import { ref, getCurrentInstance, onMounted } from 'vue'
import { login as apiLogin } from '../services/transformerService'
import { useAuthStore } from '@/features/auth/stores/authStore'


const auth = useAuthStore()
const isLoading = ref(false)
const errorMsg = ref('')
const bus = getCurrentInstance()?.appContext.config.globalProperties.$bus

const listTranformer = async (credentials) => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const { access_token, user } = await apiLogin(credentials)

    auth.setSession({ access_token, user })

    bus?.emit?.('success', 'Sesión iniciada correctamente')
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'Credenciales inválidas'
    bus?.emit?.('error', errorMsg.value)
  } finally {
    isLoading.value = false
  }
}

onMounted(()=>{
  listTranformer();
})
</script>