<template>
  <v-dialog
    v-model="visible"
    max-width="400px"
    persistent
    transition="fade-scale"
    class="z-[9000]"
  >
    <div
      class="bg-white border border-green-200 rounded-2xl shadow-2xl 
             p-6 max-w-md mx-auto text-center relative animate-toast"
    >
      <!-- Header -->
      <div class="flex items-center justify-center mb-4">
        <v-icon class="mr-2 text-4xl text-accent-success">mdi-check-circle</v-icon>
        <span class="text-2xl font-bold text-accent-success">¡Éxito!</span>
      </div>

      <!-- Mensaje -->
      <div class="text-slate-700 mb-6">
        <span>{{ message }}</span>
      </div>

      <!-- Barra inferior con animación -->
      <div
        class="absolute bottom-0 left-0 w-full h-1 bg-accent-success rounded-b-2xl"
        :class="{ 'animate-fadeout': visible }"
      ></div>
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

    eventBus.on('success', (msg) => {
      message.value = msg;
      visible.value = true;
      setTimeout(() => (visible.value = false), 3000); // 3 segundos como en ErrorAlert
    });

    return {
      visible,
      message,
    };
  },
};
</script>

<style scoped>
/* Animación aparición tipo toast */
@keyframes toast-slide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Barra inferior "descargándose" */
@keyframes fadeout {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}

.animate-toast {
  animation: toast-slide 0.3s ease forwards;
}

.animate-fadeout {
  animation: fadeout 3s linear forwards;
}

/* Transición fade-scale */
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
