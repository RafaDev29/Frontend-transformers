<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-1 flex flex-col">

    <!-- Navigation arriba (NO se mueve) -->
    <div class="py-1">
      <NavigationComponent :breadcrumbs="[
        { label: 'Panel de Fábrica', path: '/app/factory' },
        { label: 'Panel de transformadores', path: '/app/factoryTransformer' },
        { label: 'Panel detalle transformador', path: '/app/factoryTransformerDetailTwo' },
      ]" />
    </div>

    <!-- Imagen que ocupa todo el resto -->
    <div class="flex-1 transformer-layer" :style="bgStyle">
      <div class="relative z-10 h-full w-full p-1">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-15 pt-8 ml-8 pl-8">
          <CardDetailTwoComponent />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import CardDetailTwoComponent from '@/features/transformer/components/CardDetailTwoComponent.vue'
import NavigationComponent from '@/features/transformer/components/NavigationComponent.vue'
import bg from '@/assets/transformer/transformerOil.jpeg'

const bgStyle = { backgroundImage: `url(${bg})` }
</script>

<style scoped>
.transformer-layer {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
</style>
