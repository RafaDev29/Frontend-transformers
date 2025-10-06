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

      <div class="flex items-center justify-center mb-4">

        <span class="text-2xl font-bold text-accent-danger">¡Error!</span>
      </div>

      <div class="text-slate-700 mb-6">
        <span>{{ message }}</span>
      </div>

      <v-btn
        color="accent-danger"
        variant="elevated"
        class="px-8"
        @click="closeDialog"
      >
        Cerrar
      </v-btn>
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
    });

    const closeDialog = () => {
      visible.value = false;
    };

    return {
      visible,
      message,
      closeDialog,
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
</style>