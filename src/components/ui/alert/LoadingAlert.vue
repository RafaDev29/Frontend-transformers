<template>
  <v-dialog
    v-model="visible"
    max-width="280px"
    persistent
    transition="dialog-bottom-transition"
  >
    <div
      class="bg-slate-50 border border-color3 backdrop-blur-md 
             rounded-2xl shadow-2xl p-6 mx-auto text-center relative"
    >
      <!-- Spinner Tailwind -->
      <div class="flex items-center justify-center">
        <div
          class="w-12 h-12 border-4 border-color2 border-t-transparent rounded-full animate-spin"
        ></div>
      </div>

      <!-- Texto -->
      <div class="mt-4 font-semibold text-lg text-petroleum">
        Cargando...
      </div>
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
</style>
