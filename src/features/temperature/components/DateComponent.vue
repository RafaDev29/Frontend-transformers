<template>
  <div
    class="p-2 justify-center rounded-xl shadow-md flex flex-col md:flex-row flex-wrap items-start md:items-center gap-2 w-full
           dark:text-slate-200 dark:hover:bg-slate-600 text-slate-800 
           transition-colors border"
  >

    <div class="flex gap-1 flex-wrap w-full md:w-auto">
      <button
        v-for="btn in quickRanges"
        :key="btn.value"
        @click="setQuickRange(btn.value)"
        class="px-3 py-1.5 text-sm font-medium rounded-lg shadow-sm transition-colors duration-200 whitespace-nowrap"
        :class="[
          isActive(btn.value)
            ? 'bg-accent-primary text-white'
            : 'bg-color3 text-slate-800 hover:bg-color2 hover:text-white dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
        ]"
      >
        {{ btn.label }}
      </button>
    </div>

    <!-- DatePicker -->
    <div class="w-full md:w-auto md:mt-0">
      <VueDatePicker
        v-model="range"
        range
        format="yyyy-MM-dd"
        :enable-time-picker="false"
        placeholder="Seleccionar rango"
        class="w-full md:w-64 text-xs"
        :dark="isDark"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch , defineEmits } from "vue"
import dayjs from "dayjs"
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

const emit = defineEmits(["update-range"])

const isDark = computed(() =>
  document.documentElement.classList.contains("dark")
)

const range = ref([dayjs().format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")])
const active = ref("hoy")

const quickRanges = [
  { label: "Hoy", value: "hoy" },
  { label: "Semana", value: "semana" },
  { label: "Mes", value: "mes" },
  { label: "Año", value: "año" },
]

function emitRange() {
  if (range.value && range.value.length === 2) {
    const [start, end] = range.value
    emit("update-range", {
      startDate: dayjs(start).format("YYYY-MM-DD"),
      endDate: dayjs(end).format("YYYY-MM-DD"),
    })
  }
}

function setQuickRange(type) {
  active.value = type
  const today = dayjs()

  switch (type) {
    case "hoy":
      range.value = [today.format("YYYY-MM-DD"), today.format("YYYY-MM-DD")]
      break
    case "semana":
      range.value = [
        today.startOf("week").format("YYYY-MM-DD"),
        today.endOf("week").format("YYYY-MM-DD"),
      ]
      break
    case "mes":
      range.value = [
        today.startOf("month").format("YYYY-MM-DD"),
        today.endOf("month").format("YYYY-MM-DD"),
      ]
      break
    case "año":
      range.value = [
        today.startOf("year").format("YYYY-MM-DD"),
        today.endOf("year").format("YYYY-MM-DD"),
      ]
      break
  }

  emitRange() 
}


watch(range, emitRange)

function isActive(type) {
  return active.value === type
}
</script>

<style>
.dp__input {
  @apply dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600;
}
.dp__menu {
  @apply dark:bg-slate-800 dark:text-slate-200;
}
.dp__range_start,
.dp__range_end {
  @apply bg-accent-primary text-white;
}
</style>
