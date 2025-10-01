<template>
  <div
    class="p-2 rounded-2xl shadow-md flex items-center gap-6 w-full overflow-x-auto
           dark:text-slate-200 dark:hover:bg-slate-600 text-slate-800 
           transition-colors border"
  >
    <!-- Botones rápidos -->
    <div class="flex gap-2 mt-2 pt-3">
      <button
        v-for="btn in quickRanges"
        :key="btn.label"
        @click="setQuickRange(btn.value)"
        class="px-2 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors duration-200 whitespace-nowrap"
        :class="[
          isActive(btn.value)
            ? 'bg-accent-primary text-white'
            : 'bg-color3 text-slate-800 hover:bg-color2 hover:text-white dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
        ]"
      >
        {{ btn.label }}
      </button>
    </div>

    <!-- Rango de Fechas -->
    <div class="flex items-center gap-2">
      <div class="flex flex-col">
        <label class="text-xs text-slate-500 dark:text-slate-400 mb-1">Desde</label>
        <input 
          type="date" 
          v-model="from" 
          class="w-36 rounded-lg border p-2 text-sm focus:ring-2 focus:ring-accent-primary 
                 bg-neutral-light border-slate-300 text-slate-700
                 dark:bg-slate-900 dark:border-slate-600 dark:text-slate-200"
        />
      </div>

      <span class="text-slate-500 dark:text-slate-400 text-sm mt-6">—</span>

      <div class="flex flex-col">
        <label class="text-xs text-slate-500 dark:text-slate-400 mb-1">Hasta</label>
        <input 
          type="date" 
          v-model="to" 
          class="w-36 rounded-lg border p-2 text-sm focus:ring-2 focus:ring-accent-primary 
                 bg-neutral-light border-slate-300 text-slate-700
                 dark:bg-slate-900 dark:border-slate-600 dark:text-slate-200"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import dayjs from "dayjs"

const from = ref(dayjs().format("YYYY-MM-DD"))
const to = ref(dayjs().format("YYYY-MM-DD"))
const active = ref("hoy")

const quickRanges = [
  { label: "Hoy", value: "hoy" },
  { label: "Semana", value: "semana" },
  { label: "Mes", value: "mes" },
  { label: "Año", value: "año" },
]

function setQuickRange(type) {
  active.value = type
  const today = dayjs()

  switch (type) {
    case "hoy":
      from.value = today.format("YYYY-MM-DD")
      to.value = today.format("YYYY-MM-DD")
      break
    case "semana":
      from.value = today.startOf("week").format("YYYY-MM-DD")
      to.value = today.endOf("week").format("YYYY-MM-DD")
      break
    case "mes":
      from.value = today.startOf("month").format("YYYY-MM-DD")
      to.value = today.endOf("month").format("YYYY-MM-DD")
      break
    case "año":
      from.value = today.startOf("year").format("YYYY-MM-DD")
      to.value = today.endOf("year").format("YYYY-MM-DD")
      break
  }
}

function isActive(type) {
  return active.value === type
}
</script>
