<template>
  <v-navigation-drawer
    v-model="model"
    app
    color="white"
    width="260"
  >
    <!-- Logo / Marca -->
    <div class="px-4 py-5">
      <div class="text-xl font-bold tracking-wider">
        <span class="text-color5">S</span>
        <span class="text-color4">E</span>
        <span class="text-color3">M</span>
        <span class="text-color2">T</span>
      </div>
      <div class="text-xs text-slate-500 mt-1">
        Panel de control
      </div>
    </div>

    <v-divider />

    <!-- Navegación -->
    <v-list density="comfortable" nav>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        :title="item.title"
        :prepend-icon="item.icon"
        rounded="lg"
      />
    </v-list>

    <template #append>
      <div class="px-4 pb-4">
        <v-divider class="mb-3" />
        <div class="text-xxs text-slate-500">© 2025 SEMT</div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'

// v-model soporte
const props = defineProps({
  modelValue: { type: Boolean, default: true },
  items: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>

<style scoped>
.text-xxs { font-size: 0.65rem; }
</style>
