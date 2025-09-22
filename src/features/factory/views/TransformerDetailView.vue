<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1 flex flex-col">

        <!-- Navigation arriba (NO se mueve) -->
        <div class="py-1">
            <NavigationComponent :breadcrumbs="[
                { label: 'Panel de Fábrica', path: '/app/factory' },
                { label: 'Panel de transformadores', path: '/app/factoryTransformer' },
                { label: 'Panel detalle transformador', path: '/app/factoryTransformerDetail' },
            ]" />
        </div>

        <!-- Imagen que ocupa todo el resto -->
        <div class="flex-1 transformer-layer" :style="bgStyle">
  <div class="relative z-10 h-full w-full p-1 flex items-center justify-center">
    <div class="grid grid-cols-1 md:grid-cols-1 mt-5">
      <CardDetailComponent />
    </div>
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
  const backgroundImage = transformerType === 'aceite' 
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
    overflow: hidden;
}
</style>