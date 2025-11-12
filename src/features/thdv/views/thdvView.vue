<template>
  <div class="min-h-screen  dark:bg-slate-900  flex flex-col">

    <div class="py-1">
      <NavigationComponent :breadcrumbs="[
        { label: 'Panel de Fábricas', path: '/app/factory' },
        { label: 'Panel de Transformadores', path: '/app/factoryTransformer' },
        { label: 'Panel  Detalle Transformador', path: '/app/factoryTransformerDetail' },
        { label: 'Panel de THDV', path: '/app/thdv' },
      ]" />
    </div>
     <div class="grid grid-cols-1 md:grid-cols-10 gap-4">
      <DateComponent class="md:col-span-5" @update-range="handleRangeUpdate" />
      <CardComponent :chart-data="temperatureData" class="md:col-span-5" />

    </div>



    <div class="flex-1">
      <Swiper :modules="[Navigation, Pagination]" navigation pagination :spaceBetween="20" :slides-per-view="1"
        class="h-full">
        <SwiperSlide>
          <GraphicOneComponent :chart-data="temperatureData" :date-range="dateRange"/>
        </SwiperSlide>
        <SwiperSlide>
          <GraphicTwoComponent :chart-data="temperatureData" />
        </SwiperSlide>
        <SwiperSlide>
          <GraphicThreeComponent :chart-data="temperatureData" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import GraphicOneComponent from '../components/GraphicOneComponent.vue'
import GraphicTwoComponent from '../components/GraphicTwoComponent.vue'
import GraphicThreeComponent from '../components/GraphicThreeComponent.vue'
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
import CardComponent from '../components/CardComponent.vue'
import DateComponent from '../components/DateComponent.vue'

import { allThdv } from '@/features/thdv/service/thdvService'
import { useTransformerStore } from '@/features/transformer/store/transformerStore'

const temperatureData = ref([])
const loading = ref(false)
const dateRange = ref({ startDate: '', endDate: '' })

const transformerStore = useTransformerStore()
const serialNumber = transformerStore.selectedTransformer?.serialNumber

async function handleRangeUpdate({ startDate, endDate }) {
  // Guardar el rango
  dateRange.value = { startDate, endDate }
  
  // Fetch data
  await fetchStrain({ startDate, endDate })
}

async function fetchStrain({ startDate, endDate }) {
  if (!serialNumber) {
    console.warn('No hay transformador seleccionado')
    return
  }

  try {
    loading.value = true
    const response = await allThdv(serialNumber, startDate, endDate)

    if (response?.status && Array.isArray(response.data)) {
      temperatureData.value = response.data
    } else {
      temperatureData.value = []
      console.warn('No se encontraron datos válidos para el rango seleccionado')
    }
  } catch (error) {
    console.error('Error al obtener datos de tensión:', error)
    temperatureData.value = []
  } finally {
    loading.value = false
  }
}
</script>