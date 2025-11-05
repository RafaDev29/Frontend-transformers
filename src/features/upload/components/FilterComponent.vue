<template>
  <div
    class="p-3 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-4 w-full
           dark:text-slate-200 text-slate-800 transition-colors border"
  >
    <!-- Transformador -->
    <div class="flex items-center gap-2 w-full md:w-2/3">
      <label class="text-sm font-semibold whitespace-nowrap">Transformador:</label>
      <select
        v-model="selectedTransformer"
        class="flex-1 px-3 py-2 rounded-lg border text-sm
               bg-white dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600
               focus:ring-2 focus:ring-accent-primary focus:outline-none"
      >
        <option disabled value="">Seleccione un transformador</option>
        <option v-for="item in transformers" :key="item.serialNumber" :value="item.serialNumber">
          {{ item.serialNumber }} - {{ item.code }}
        </option>
      </select>
    </div>

    <!-- Botón Buscar -->
    <div class="flex justify-center w-full md:w-auto">
      <button
        @click="emitSearch"
        :disabled="!selectedTransformer"
        class="px-5 py-2 rounded-lg text-sm font-semibold 
               bg-accent-primary text-white shadow hover:opacity-90
               disabled:opacity-50 disabled:cursor-not-allowed
               transition-all"
      >
        Buscar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue"
import { listTransformerRoot } from "@/features/transformer/services/transformerService"
import { listFactory } from "@/features/factory/services/factoryService"
const emit = defineEmits(["onSearch"])
const transformers = ref([])
const selectedTransformer = ref("")

async function listTransformers() {
  try {
    const { data } = await listTransformerRoot()
    transformers.value = data
  } catch (e) {
    console.error("Error al listar transformadores", e)
  }
}

function emitSearch() {
  emit("onSearch", { transformerUid: selectedTransformer.value })
}

onMounted(listTransformers)
</script>
