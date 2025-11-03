<template>
  <div class="min-h-screen dark:bg-slate-900 flex flex-col">
    <!-- Navegación -->
    <div class="py-1">
      <NavigationComponent
        :breadcrumbs="[
          { label: 'Panel de Fábricas', path: '/app/factory' },
          { label: 'Panel de Transformadores', path: '/app/factoryTransformer' },
          { label: 'Panel Detalle Transformador', path: '/app/factoryTransformerDetail' },
          { label: 'Panel de Temperatura', path: '/app/temperature' },
        ]"
      />
    </div> 

    <div class="grid grid-cols-1 md:grid-cols-10 gap-4">
      <DateComponent class="md:col-span-5" @update-range="fetchTemperature" />
      <CardComponent :chart-data="temperatureData" class="md:col-span-5" />
    </div>

    <div class="flex-1">
      <Swiper
        :modules="[Navigation, Pagination]"
        navigation
        pagination
        :spaceBetween="20"
        :slides-per-view="1"
        class="h-full"
      >
        <SwiperSlide>
          <GraphicOneComponent :chart-data="temperatureData" />
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

import { allTemperature } from '@/features/temperature/services/temperatureService'

const temperatureData = ref([])
const loading = ref(false)
const serialNumber = 'TR-2025-0415-5' 

async function fetchTemperature({ startDate, endDate }) {
  try {
    loading.value = true
    const response = await allTemperature(serialNumber, startDate, endDate)

    if (response?.status && Array.isArray(response.data)) {
      temperatureData.value = response.data
    } else {
      temperatureData.value = []
      console.warn('No se encontraron datos válidos para el rango seleccionado')
    }
  } catch (error) {
    console.error('Error al obtener datos de temperatura:', error)
    temperatureData.value = []
  } finally {
    loading.value = false
  }
}
</script>
