<template>
  <v-dialog v-model="visible" max-width="280px" persistent transition="dialog-bottom-transition">
    <div class="bg-[#F2F2F2] backdrop-blur-md rounded-2xl shadow-2xl p-6 mx-auto text-center relative border border-[#C4D8F2]">
      <!-- Ícono de Cargando -->
      <div class="flex items-center justify-center">
        <v-icon :color="'#66A3F2'" class="text-6xl animate-spin">mdi-loading</v-icon>
      </div>
      <div class="mt-4 font-semibold text-lg text-[#263173]">Cargando...</div>
    </div>
  </v-dialog>
</template>

<script>
import { ref } from 'vue';
import eventBus from '@/plugins/eventBus';

export default {
  name: 'LoadingAlert',
  setup() {
    const visible = ref(false);

    // Escuchar el evento global para mostrar/ocultar la alerta de carga
    eventBus.on('loading', (isLoading) => {
      visible.value = isLoading;
    });

    return {
      visible,
    };
  },
};
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dialog-bottom-transition-enter-from,
.dialog-bottom-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>