<template>
  <v-dialog
    v-model="visible"
    max-width="400px"
    persistent
    transition="dialog-bottom-transition"
    class="z-[9000]"
  >
    <div
      class="bg-white border border-accent-warning rounded-2xl shadow-2xl 
             p-6 max-w-md mx-auto text-center relative"
    >
      <div class="flex items-center justify-center mb-4">
        <span class="text-2xl font-semibold text-accent-warning">¡Advertencia!</span>
      </div>

      <!-- Mensaje -->
      <div class="text-slate-700 mb-6">
        <span>{{ message }}</span>
      </div>

      <!-- Botones -->
      <div class="flex justify-end space-x-3">
        <v-btn
          @click="closeAlert"
          elevation="1"
          class="rounded-md px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200"
        >
          Cancelar
        </v-btn>
        <v-btn
          @click="confirmAction"
          elevation="1"
          class="rounded-md px-4 py-2 bg-accent-warning text-white hover:bg-accent-warning/90"
        >
          Aceptar
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { ref } from 'vue';
import eventBus from '@/plugins/eventBus';

export default {
  name: 'WarningAlert',
  setup() {
    const visible = ref(false);
    const message = ref('');
    let actionToConfirm = null;

    eventBus.on('warning', ({ msg, action }) => {
      message.value = msg;
      actionToConfirm = action;
      visible.value = true;
    });

    const confirmAction = () => {
      if (actionToConfirm) {
        actionToConfirm();
      }
      visible.value = false;
    };

    const closeAlert = () => {
      visible.value = false;
    };

    return {
      visible,
      message,
      confirmAction,
      closeAlert,
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
