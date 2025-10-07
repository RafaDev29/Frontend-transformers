<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1 flex flex-col">
    <!-- Navigation arriba (NO se mueve) -->
    <div class="py-1">
      <NavigationComponent :breadcrumbs="[
        { label: 'Panel de Transformadores', path: '/app/Transformer' },
        { label: 'Panel Detalle Transformador', path: '/app/TransformerDetail' },
      ]" />
    </div>


   <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0">

      <div class=" flex items-center justify-center  pl-2 pr-2 rounded-3xl ">
        <CardDetailComponent />
      </div>

      <div class="hidden lg:block h-full w-full">
        <div class="transformer-layer h-[600px] w-full rounded-3xl" :style="bgStyle"></div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CardDetailComponent from '@/features/transformer/components/CardDetailComponent.vue'
import NavigationComponent from '@/components/ui/head/NavigationComponent.vue'
import { useTransformerStore } from '@/features/transformer/store/transformerStore'
import transformerDry from '@/assets/transformer/transformerDry.jpeg'
import transformerOil from '@/assets/transformer/transformerOil.jpeg'

const transformerStore = useTransformerStore()

const bgStyle = computed(() => {
  if (!transformerStore.selectedTransformer) {
    return { backgroundImage: `url(${transformerDry})` }
  }

  const transformerType = transformerStore.selectedTransformer.type?.toLowerCase()
  const backgroundImage =
    transformerType === 'aceite'
      ? `url(${transformerOil})`
      : `url(${transformerDry})`

  return { backgroundImage }
})
</script>

<style scoped>
.transformer-layer {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.image {
  display: block;
}
</style>

