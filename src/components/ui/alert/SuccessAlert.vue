<template>
  <v-dialog v-model="visible" max-width="400px" persistent transition="fade-scale">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center relative animate-toast">
      <!-- Icono y Título de Éxito -->
      <div class="flex items-center justify-center mb-4">
        <v-icon color="green" class="mr-2 text-3xl">mdi-check-circle</v-icon>
        <span class="text-2xl font-bold text-green-600">¡Éxito!</span>
      </div>

      <!-- Mensaje de Éxito -->
      <div class="text-gray-700 mb-4">
        <span>{{ message }}</span>
      </div>

      <!-- Barra de Cierre Automático (Animación) -->
      <div class="absolute bottom-0 left-0 w-full h-1 bg-green-500 rounded-b-lg" :class="{'animate-fadeout': visible}"></div>
    </div>
  </v-dialog>
</template>

<script>
import { ref } from 'vue';
import eventBus from '@/plugins/eventBus';

export default {
  name: 'SuccessAlert',
  setup() {
    const visible = ref(false);
    const message = ref('');

    // Escuchar el evento global para mostrar la alerta de éxito
    eventBus.on('success', (msg) => {
      message.value = msg;
      visible.value = true;
      setTimeout(() => (visible.value = false), 1000); // Cerrar automáticamente después de 3 segundos
    });

    return {
      visible,
      message,
    };
  },
};
</script>

<style scoped>
/* Estilo de animación para aparecer/desaparecer */
@keyframes toast-slide {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeout {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}

.animate-toast {
  animation: toast-slide 0.3s ease forwards;
}

.animate-fadeout {
  animation: fadeout 1s linear forwards; 
}

/* Transición fade-scale personalizada */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>