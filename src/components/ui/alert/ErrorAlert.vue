<template>
  <v-dialog v-model="visible" max-width="400px" persistent transition="dialog-bottom-transition">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center relative">
      <!-- Icono y Título de Error -->
      <div class="flex items-center justify-center mb-4">
        <v-icon color="red" class="mr-2 text-3xl">mdi-alert-circle</v-icon>
        <span class="text-2xl font-bold text-red-600">¡Error!</span>
      </div>

      <!-- Mensaje de error -->
      <div class="text-gray-700 mb-4">
        <span>{{ message }}</span>
      </div>

      <!-- Barra de Cierre Automático (Animación) -->
      <div class="absolute bottom-0 left-0 w-full h-1 bg-red-500 rounded-b-lg" :class="{'animate-fadeout': visible}"></div>
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

    // Escuchar el evento global para mostrar la alerta de error
    eventBus.on('error', (msg) => {
      message.value = msg;
      visible.value = true;
      setTimeout(() => (visible.value = false), 3000); // Cerrar automáticamente después de 3 segundos
    });

    return {
      visible,
      message,
    };
  },
};
</script>

<style scoped>
/* Efecto de transición personalizada */
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dialog-bottom-transition-enter-from,
.dialog-bottom-transition-leave-to {
  opacity: 0;
  transform: translateY(20px); /* Efecto de aparición desde abajo */
}

/* Barra de cierre automático */
.animate-fadeout {
  animation: fadeout 3s linear forwards; /* Duración debe coincidir con el timeout */
}

@keyframes fadeout {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}
</style>