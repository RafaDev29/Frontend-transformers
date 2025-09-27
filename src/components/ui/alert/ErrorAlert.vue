<template>
  <v-dialog
    v-model="visible"
    max-width="400px"
    persistent
    transition="dialog-bottom-transition"
    class="z-[9000]"
  >
    <div
      class="bg-white border border-red-200 rounded-2xl shadow-2xl 
             p-6 max-w-md mx-auto text-center relative z-[9000]"
    >
      <!-- Header -->
      <div class="flex items-center justify-center mb-4">
        <v-icon class="mr-2 text-4xl text-accent-danger">mdi-alert-circle</v-icon>
        <span class="text-2xl font-bold text-accent-danger">¡Error!</span>
      </div>

      <!-- Mensaje -->
      <div class="text-slate-700 mb-6">
        <span>{{ message }}</span>
      </div>

      <!-- Barra inferior con animación -->
      <div
        class="absolute bottom-0 left-0 w-full h-1 bg-accent-danger rounded-b-2xl"
        :class="{ 'animate-fadeout': visible }"
      ></div>
    </div>
  </v-dialog>
</template>

<script>
import { ref } from 'vue';
import eventBus from '@/plugins/eventBus';

export default {
  name: 'ErrorAlert',
  setup() {
    const visible = ref(false);
    const message = ref('');

    eventBus.on('error', (msg) => {
      message.value = msg;
      visible.value = true;

      // Ocultar después de 3 segundos
      setTimeout(() => (visible.value = false), 3000);
    });

    return {
      visible,
      message,
    };
  },
};
</script>

<style scoped>
/* Animación del diálogo */
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dialog-bottom-transition-enter-from,
.dialog-bottom-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Barra de progreso inferior */
.animate-fadeout {
  animation: fadeout 3s linear forwards;
}

@keyframes fadeout {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
</style>
