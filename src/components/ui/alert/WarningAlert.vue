<template>
  <v-dialog v-model="visible" max-width="400px" persistent transition="dialog-bottom-transition">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center relative">

      <div class="flex items-center justify-center mb-4">
        <v-icon color="blue" class="mr-2 text-3xl">mdi-alert-circle</v-icon>
        <span class="text-2xl font-semibold text-[#263173]">¡Advertencia!</span>
      </div>


      <div class="text-gray-700 mb-4">
        <span>{{ message }}</span>
      </div>


      <div class="flex justify-end space-x-2">
        <v-btn
          @click="closeAlert"
          elevation="1"
          class="rounded-md px-4 py-2"
          style="background-color: #f3f3f3; color: #4a4a4a;"
        >
          Cancelar
        </v-btn>
        <v-btn
          @click="confirmAction"
          elevation="1"
          class="rounded-md px-4 py-2"
          style="background-color: #66A3F2; color: white;"
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