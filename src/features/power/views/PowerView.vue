<template>
  <div class="min-h-screen  dark:bg-slate-900  flex flex-col">

    <div class="py-1">
      <NavigationComponent :breadcrumbs="[
        { label: 'Panel de Fábricas', path: '/app/factory' },
        { label: 'Panel de transformadores', path: '/app/factoryTransformer' },
        { label: 'Panel  Detalle Transformador', path: '/app/factoryTransformerDetail' },
        { label: 'Panel de Potencia', path: '/app/power' },
      ]" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-10 gap-4">
      <DateComponent class="md:col-span-5" />
      <CardComponent :chart-data="rawData" class="md:col-span-5" />

    </div>


    <!-- Carrusel -->
    <div class="flex-1">
      <Swiper :modules="[Navigation, Pagination]" navigation pagination :spaceBetween="20" :slides-per-view="1"
        class="h-full">

        <SwiperSlide>
          <GraphicOneComponent :chart-data="rawData" />
        </SwiperSlide>
        <SwiperSlide>
          <GraphicTwoComponent :chart-data="rawData" />
        </SwiperSlide>
        <SwiperSlide>
          <GraphicThreeComponent :chart-data="rawData" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
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
import rawData from '@/features/power/data/data.json'
</script>
